package com.lenovo.lps.push.marketing.monitor.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lenovo.lps.push.marketing.monitor.dao.FeedbackDao;
import com.lenovo.lps.push.marketing.monitor.dao.HitPvUvDao;
import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData4;
import com.lenovo.lps.push.marketing.monitor.param.Param;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/feedbackanalysis/*")
public class FeedbackAnalysisController {
	private static Logger logger = Logger.getLogger(FeedbackAnalysisController.class);
	@Autowired
	private FeedbackDao feedbackDao;

	
	
		// http://localhost:8080/Stream/feedbackanalysis/multiDimensionAction.do?method=getErrorDownloadDim&reportName=MultiDimensionData
		@RequestMapping(value = "multiDimensionAction", method = RequestMethod.POST)
		public void multiDimension(HttpServletRequest request,
				HttpServletResponse response) throws ParseException, JsonGenerationException, JsonMappingException, IOException {

			logger.info("-------multiDimension----------------");
			
			
			String method = request.getParameter("method");
			String reportName = request.getParameter("reportName");
			
			String norm = request.getParameter("norm");
			String page = request.getParameter("page");
			String rows = request.getParameter("rows");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");
						
			String sortRule = request.getParameter("sortRule");
			String sortOrderBy = request.getParameter("sortOrderBy");
			String dim = request.getParameter("dim");
			String list = request.getParameter("list");
			
//			String appModel = request.getParameter("appModel");
//			String appVersionName = request.getParameter("appVersionName");
//			List<String> likeValueList = new ArrayList<String>(Arrays.asList(appModel, appVersionName));
//			String likeValue = getLikeValue(likeValueList);
			
			String likeValue = request.getParameter("keywords");
			
			if (likeValue!=null && !likeValue.startsWith("%") && !likeValue.endsWith("%")) {
				throw new RuntimeException("invalid likeValue: " + likeValue);
			}
			
//			if (likeValue!=null && likeValue.contains(" ")) {
//				throw new RuntimeException("invalid likeValue (with blank spaces): " + likeValue);
//			}
			
			if (likeValue!=null) {
				likeValue = likeValue.replace(' ', '%');
			}
			
			logger.debug("method=" + method + ";reportName=" + reportName+";norm=" + norm +";page=" + page+";rows=" + rows+";startDate=" + startDate+";endDate=" + endDate+";sortRule=" + sortRule+";sortOrderBy=" + sortOrderBy+";list=" + list+";likeValue=" + likeValue);
			String result = getResult(method,reportName,norm,dim,page,rows,startDate,endDate,sortRule,sortOrderBy,list,likeValue);
			
			
			if (StringUtils.isNotEmpty(result)) {
				try {
					response.getWriter().write(result);
				} catch (IOException e) {
					e.printStackTrace();
				}
				
			} else {
				logger.warn("result is empty");
			}
			
		}
		
		
		


		private String getResult(String method, String reportName,String norm,String dim, String page, String rows,
				String startDate, String endDate, String sortRule,
				String sortOrderBy,String list, String likeValue) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
			String result = null;
			//http://localhost:8080/Stream/feedbackanalysis/multiDimensionAction.do?method=getErrorDownloadDim&reportName=MultiDimensionData
			//getNullHitDim&reportName=MultiDimensionData
			if ("getErrorDownloadDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,Param.FEEDBACK_ERROR_TYPE_DOWNLOAD);
			}
			//method=getTrendData&reportName=MultiDimensionData
			if ("getTrendData".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getTrendData(norm,startDate,endDate,list,dim);
			}
			//getErrorInstallDim&reportName=MultiDimensionData
			if ("getErrorInstallDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,Param.FEEDBACK_ERROR_TYPE_INSTALL);
			}
			return result;
		}

		private String getTrendData(String norm, String startDate1,
				String endDate1, String list, String dim) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
			List<String> valueList = getValueList(list);
			logger.debug("city list: " + valueList);
			
			if (valueList!=null){
				
				
				String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
				String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
				long dayDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
				if (dayDiff + 1 >7) {
					throw new RuntimeException("dayDiff is greater than 7: " + dayDiff);
				}
				//long offset =7;
				
				String type = null;
				if ("error_download".equals(dim)) {
					type = "0";
				} else if ("error_install".equals(dim)) {
					type = "1";
				} else {
					throw new RuntimeException("illegal dim value: " + dim);
				}
				
				// 查询出记录后的时间
				Long startTime = System.currentTimeMillis();
				Map<String,List<Feedback>> map = new HashMap<String,List<Feedback>>();
				
				if ("error_pv".equals(norm)) {
					for (String result : valueList) {
						List<Feedback> feedbackBackList = feedbackDao.feedbackErrorPvListForTrendData(startDate,endDate,new Long(Param.TREND_DATA_OFFSET),result,type);
						map.put(result, feedbackBackList);
					}		
				} else if ("error_uv".equals(norm)) {
					for (String result : valueList) {
						List<Feedback> feedbackBackList = feedbackDao.feedbackErrorUvListForTrendData(startDate,endDate,new Long(Param.TREND_DATA_OFFSET),result,type);
						map.put(result, feedbackBackList);
					}	
				}  else {
					throw new RuntimeException("invalid norm: " + norm);
				}
				
				// 查询出记录后的时间
				Long midTime = System.currentTimeMillis();
				//String jsonString = Feedback.ToTrendDataJsonString(map, asColumnName,startDate, endDate);
				String jsonString = getTrendJsonString(map,startDate,dayDiff + 1);
				Long endTime = System.currentTimeMillis();

				System.out.println(jsonString);

				System.out.println("查询出数据的时间：" + (midTime - startTime));
				System.out.println("拼合json数据的时间：" + (endTime - midTime));
				return jsonString;
								
			}else {
				return null;
			}
			
		}
		
		private String getTrendJsonString(Map<String, List<Feedback>> map, String startDate, long n) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
			Map<String, List<List<String>>> resultMap = new HashMap<String, List<List<String>>>();
			for (String key:map.keySet()){
				List<List<String>> valueList = new ArrayList<List<String>>();
				List<String> dateList = new ArrayList<String>();
				List<String> sumList = new ArrayList<String>();
				
				List<Feedback> vList = map.get(key);
				for (int i=0;i<n;i++){
					String dateStr = DateUtil.getNAfterDate(startDate, i);
					dateList.add(DateUtil.mdrillDate2AvatarDate(dateStr));
					String sumStr = getSumStr(dateStr,vList);
					sumList.add(sumStr);
				}
				valueList.add(dateList);
				valueList.add(sumList);
				resultMap.put(key,valueList);
			}
			return JsonUtil.entity2JsonString(resultMap);
		}





		private String getSumStr(String dateStr, List<Feedback> vList) {
			String result = "0";
			if (StringUtils.isEmpty(dateStr)) {
				return result;
			}
			if (vList!=null) {
				for (Feedback fb : vList){
					if (fb!=null && dateStr.equals(fb.getDate())) {
						return new Double(fb.getSum()).toString();
					}
				}
			}
			return result;
		}





		private List<String> getValueList(String listStr) {
			List<String> result = null;
			if (StringUtils.isNotEmpty(listStr)) {
				String regEx="[(')]";
				String str = listStr.replaceAll(regEx, "").trim();
				String[] a = str.split(",");
				if (a!=null && a.length>0) {
					result = new ArrayList<String>();
					for (int i = 0; i<a.length;i++){
						String c = a[i].trim();
						if (StringUtils.isNotEmpty(c)){
							result.add(c);	
						}
					}
				}
				
			}
			return result;
		}

	

	private String getDimData(String norm, String page, String rows,
			String startDate1, String endDate1,String type) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		int pageInt = Integer.parseInt(page);
		int rowsInt = Integer.parseInt(rows);
		int limit = (pageInt - 1) * rowsInt;
		int offset = rowsInt;
		//String asColumnName = norm;
		//String columnName = Param.NAME_MAP.get(asColumnName);
		//if (StringUtils.isEmpty(columnName)) {
		//	logger.error("cannot get columnName from asColumnName: " + asColumnName);
		//	throw new RuntimeException("columnName is " + columnName);
		//}
		String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
		String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
		//String groupByColumnName = "city_name";

		// 查询出记录后的时间
		Long startTime = System.currentTimeMillis();
		// 获得数据列表
		Page<Feedback> p = new Page<Feedback>();
		//p.setPageNo(pageInt);
		//p.setPageSize(rowsInt);
		List<Feedback> feedbackList = null;
		double allDouble = 0;
		if ("error_pv".equals(norm)) {
			feedbackList = feedbackDao.getFeedbackErrorPvListByResult(p,startDate,endDate,new Long(limit),new Long(offset), type);
			allDouble = feedbackDao.getFeedbackErrorPvTotalInDateRange(startDate, endDate,type);	
		} else if ("error_uv".equals(norm)) {
			feedbackList = feedbackDao.getFeedbackErrorUvListByResult(p,startDate,endDate,new Long(limit),new Long(offset),type);
			allDouble = feedbackDao.getFeedbackErrorUvTotalInDateRange(startDate, endDate,type);	
		} else if ("disturbance".equals(norm)) {
			// 攻坚骚扰度
			// liuhk2: 下面的方法查询依赖total这个数，而这个数在mdrill里gruop by的结果超过10000的时候是不准确的，目前看的结果都是10010
			// 并且查询速度慢
			// sunlei7: 暂时不支持，考虑其他方案。
			throw new RuntimeException("disturbance: not supported yet");
//			Integer result = new Integer(0);
//			//Integer result = null;
//			DisturbanceResult dr = new DisturbanceResult(hitPvUvDao,pageInt, p,startDate, endDate,result,new Long(limit),new Long(offset));
//			dr.getDisturbanceData();
//			p.setTotalRecord(dr.totalRecord);
//			hitPvUvList = dr.list;
//			allDouble = new Double(dr.all);
		} else {
			throw new RuntimeException("invalid norm: " + norm);
		}
		

		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String jsonString = JsonData4.toJsonStringForFeedback(pageInt,p.getTotalRecord(),feedbackList,allDouble);
		Long endTime = System.currentTimeMillis();

		System.out.println(jsonString);

		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));

		return jsonString;

	}
	
	public class DisturbanceResult {
		long pageNo;
		long totalRecord = Param.RECORD_LOWER_BOUND;
		List<HitPvUv> list;
		double all = 0;
		
		HitPvUvDao hitPvUvDao;
		Page<HitPvUv> p;
		String startDate;
		String endDate;
		Integer result;
		Long offset; 
		Long rows;
		
		public DisturbanceResult(HitPvUvDao hitPvUvDao, long pageNo, Page<HitPvUv> p, String startDate,String endDate,Integer result, Long offset, Long rows) {
			this.hitPvUvDao = hitPvUvDao;
			this.p = p;
			this.startDate = startDate;
			this.endDate = endDate;
			this.result = result;
			this.offset = offset;
			this.rows = rows;
			this.pageNo = pageNo;
		}



		public void getDisturbanceData() {
			
			list = hitPvUvDao.getDisturbanceData(p,startDate, endDate,result,offset,rows);
			long pTR = p.getTotalRecord();
			if (pTR <= totalRecord) {
				totalRecord = pTR;
			} else {
				totalRecord = Param.SAMPLE_NO;
				List<HitPvUv> resultList = new ArrayList<HitPvUv>();
				if (list!=null && list.size()>0) {
					resultList.add(list.get(0));
				}
				List<Long> offsetList = getOffsetList(pTR);
				if (offsetList!=null) {
					for (Long offset1 : offsetList){
						list = hitPvUvDao.getDisturbanceData(null,startDate, endDate,result,offset1,new Long(1));
						if (list!=null && list.size()>0) {
							resultList.add(list.get(0));
						}
					}
				}
				list = resultList;
			}
			
			if (list!=null) {
				for (HitPvUv v : list) {
					if (v!=null && v.getDimSum()!=null) {
						all = all + v.getDimSum();						
					}
				}
			}
			
		}



		private List<Long> getOffsetList(long pTR) {
			if (pTR > Param.MDRILL_GROUP_BY_UPPER_LIMIT){
				pTR = Param.MDRILL_GROUP_BY_UPPER_LIMIT;
//				List<Long> offsetList = new ArrayList<Long>();
//				long offset = Param.MDRILL_GROUP_BY_UPPER_LIMIT / Param.SAMPLE_NO;
//				for (int i=0;i<Param.SAMPLE_NO-1;i++){
//					long index = Param.MDRILL_GROUP_BY_UPPER_LIMIT - i * offset;
//					offsetList.add(new Long(index));
//				}
//				return offsetList;
			}
			if (pTR > Param.RECORD_LOWER_BOUND) {
				List<Long> offsetList = new ArrayList<Long>();
				long offset = pTR / Param.SAMPLE_NO;
				for (int i=0;i<Param.SAMPLE_NO-1;i++){
					long index = (i + 1) * offset;
					offsetList.add(new Long(index));
				}
				return offsetList;
			}
			return null;
		}
	}
}
