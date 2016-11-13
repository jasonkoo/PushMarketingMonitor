package com.lenovo.lps.push.marketing.monitor.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

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

import com.lenovo.lps.push.marketing.monitor.dao.HitPvUvDao;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData4;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/analysis/*")
public class AnalysisController {
	private static Logger logger = Logger.getLogger(AnalysisController.class);
	@Autowired
	private HitPvUvDao hitPvUvDao;

	
	
	
		// multiDimensionAction.do?method=getLocationDim&reportName=MultiDimensionData
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
			if ("getLocationDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate);
			}
//			//multiDimensionAction.do?method=getTrendData&reportName=MultiDimensionData
//			if ("getTrendData".equals(method) && "MultiDimensionData".equals(reportName)) {
//				result = getTrendData(norm,startDate,endDate,list,dim);
//			}
//			//method=getOSVersionDim&reportName=MultiDimensionData
//			if ("getOSVersionDim".equals(method) && "MultiDimensionData".equals(reportName)) {
//				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_OS_VERSION,likeValue);
//			}
			return result;
		}

//		private String getTrendData(String norm, String startDate1,
//				String endDate1, String list, String dim) throws ParseException {
//			List<String> valueList = getValueList(list);
//			logger.debug("city list: " + valueList);
//			
//			if (valueList!=null){
//				String asColumnName = norm;
//				String columnName = Param.NAME_MAP.get(asColumnName);
//				if (StringUtils.isEmpty(columnName)) {
//					logger.error("cannot get columnName from asColumnName: " + asColumnName);
//					throw new RuntimeException("columnName is " + columnName);
//				}
//				
//				String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
//				String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
//				long dayDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
//				if (dayDiff + 1 >7) {
//					throw new RuntimeException("dayDiff is greater than 7: " + dayDiff);
//				}
//				String groupByColumnName = getGroupByColumnName(dim);
//				if (StringUtils.isEmpty(groupByColumnName)) {
//					logger.error("cannot get groupByColumnName from dim: " + dim);
//					throw new RuntimeException("groupByColumnName is " + groupByColumnName);
//				}
//				
//				//long offset =7;
//				
//				// 查询出记录后的时间
//				Long startTime = System.currentTimeMillis();
//				Map<String,List<Feedback>> map = new HashMap<String,List<Feedback>>();
//				for (String cityName : valueList) {
//					List<Feedback> feedbackList = feedbackDao.feedbackListForTrendData(groupByColumnName,columnName,asColumnName,startDate,endDate,new Long(Param.TREND_DATA_OFFSET),cityName);
//					map.put(cityName, feedbackList);
//				}
//				// 查询出记录后的时间
//				Long midTime = System.currentTimeMillis();
//				String jsonString = Feedback.ToTrendDataJsonString(map, asColumnName,startDate, endDate);
//				Long endTime = System.currentTimeMillis();
//
//				System.out.println(jsonString);
//
//				System.out.println("查询出数据的时间：" + (midTime - startTime));
//				System.out.println("拼合json数据的时间：" + (endTime - midTime));
//				return jsonString;
//								
//			}else {
//				return null;
//			}
//			
//		}

	

	private String getDimData(String norm, String page, String rows,
			String startDate1, String endDate1) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
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
		Page<HitPvUv> p = new Page<HitPvUv>();
		//p.setPageNo(pageInt);
		//p.setPageSize(rowsInt);
		List<HitPvUv> hitPvUvLit = hitPvUvDao.getPvListByResult(p,startDate,endDate,new Long(limit),new Long(offset));
		//p.setResults(hitPvUvLit);
		
		//long a = feedbackDao.feedbackRedAll();
		Double allDouble = hitPvUvDao.getPvTotalInDateRange(startDate, endDate,null);
		

		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String jsonString = JsonData4.toJsonString(pageInt,p.getTotalRecord(),hitPvUvLit,allDouble.doubleValue());
		Long endTime = System.currentTimeMillis();

		System.out.println(jsonString);

		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));

		return jsonString;

	}
}
