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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lenovo.lps.push.marketing.monitor.dao.FeedbackDao;
import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.param.Param;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/feedback/*")
public class FeedbackController {
	private static Logger logger = Logger.getLogger(FeedbackController.class);
	@Autowired
	private FeedbackDao feedbackDao;

	//private Feedback feedback;

	@RequestMapping(value = "feedbackList", method = RequestMethod.POST)
	public void feedbackList(HttpServletRequest request,
			HttpServletResponse response) {

		logger.info("-------fd list----------------");
		
		// 查询出记录后的时间
		Long startTime = System.currentTimeMillis();

		//feedback = new Feedback();
		//int rowsNum = Integer.parseInt(request.getParameter("rowsNum"));
		//int pageNow = Integer.parseInt(request.getParameter("pageNow"));

		// 获得数据列表
		ArrayList<Feedback> feedbackList = feedbackDao.feedbackList();

		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();

		StringBuffer jsonString = new StringBuffer();
		String jsonString2 = "";
		jsonString.append("{\"pageNow\":" + 1 + ",\"total\":" + 6
				+ ",\"rows\":[");

		if (feedbackList != null) {
			for (int i = 0; i < feedbackList.size(); i++) {
				jsonString.append("{\"date\":\"" + feedbackList.get(i).getDate()
						+ "\",");
				jsonString.append("\"arrived\":\"" + feedbackList.get(i).getArrived()
						+ "\",");
				jsonString.append("\"displayed\":\""
						+ feedbackList.get(i).getDisplayed() + "\",");
				jsonString.append("\"sysmsgclicked\":\""
						+ feedbackList.get(i).getSysmsgclicked() + "\",");
				jsonString.append("\"downloaded\":\""
						+ feedbackList.get(i).getDownloaded()+ "\",");
				jsonString.append("\"installed\":\""
						+ feedbackList.get(i).getInstalled() + "\",");
				jsonString.append("\"activated\":\""
						+ feedbackList.get(i).getActivated() + "\"},");
			}
		} else {
			System.out.println("fb list is null!");
		}
		jsonString2 = jsonString.deleteCharAt(jsonString.length() - 1)
				.toString();
		jsonString2 += "]}";

		Long endTime = System.currentTimeMillis();

		System.out.println(jsonString2);

		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));

		try {
			response.getWriter().write(jsonString2);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
		// multiDimensionAction.do?method=getLocationDim&reportName=MultiDimensionData
		@RequestMapping(value = "multiDimensionAction", method = RequestMethod.POST)
		public void multiDimension(HttpServletRequest request,
				HttpServletResponse response) throws ParseException {

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
		
		
//		private String getLikeValue(List<String> likeValueList) {
//			/*
//			appModel:appModel=%333%
//			appVersionName:appVersionName=%333%
//			*/
//			if (likeValueList!=null) {
//				for (String likeValue : likeValueList){
//					if (likeValue!=null) {
//						int prefixIndex = likeValue.indexOf('=');
//						if (prefixIndex!=-1){
//							return likeValue.substring(prefixIndex);
//						}
//					}
//				}
//			}
//			return null;
//		}


		private String getResult(String method, String reportName,String norm,String dim, String page, String rows,
				String startDate, String endDate, String sortRule,
				String sortOrderBy,String list, String likeValue) throws ParseException {
			String result = null;
			if ("getLocationDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_CITY_NAME,likeValue);
			}
			//multiDimensionAction.do?method=getTrendData&reportName=MultiDimensionData
			if ("getTrendData".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getTrendData(norm,startDate,endDate,list,dim);
			}
			//method=getOSVersionDim&reportName=MultiDimensionData
			if ("getOSVersionDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_OS_VERSION,likeValue);
			}
			//method=getNetWorkDim&reportName=MultiDimensionData
			if ("getNetWorkDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				//result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_OS_VERSION);
				result = "{\"page\":1,\"total\":1, \"rows\":[{\"dimValue\":\"N/A\",\"normValue\":\"1\",\"proportion\":\"100\"}]}"; 
			}
			//method=getOperatorDim&reportName=MultiDimensionData
			if ("getOperatorDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_OPERATION_TYPE,likeValue);
			}
			//method=getEngineVersionDim&reportName=MultiDimensionData
			if ("getEngineVersionDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_PE_VERSION,likeValue);
			}
			// /feedback/multiDimensionAction.do?method=getDeviceModelDim&reportName=MultiDimensionData
			if ("getDeviceModelDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_DEVICE_MODEL,likeValue);
			}
			if ("getLocationCCDim".equals(method) && "MultiDimensionData".equals(reportName)) {
				result = getDimData(norm,page,rows,startDate,endDate,sortRule,sortOrderBy,Param.COLUMNNAME_COUNTRY_CODE,likeValue);
			}
			return result;
		}

		private String getTrendData(String norm, String startDate1,
				String endDate1, String list, String dim) throws ParseException {
			List<String> valueList = getValueList(list);
			logger.debug("city list: " + valueList);
			
			if (valueList!=null){
				String asColumnName = norm;
				String columnName = Param.NAME_MAP.get(asColumnName);
				if (StringUtils.isEmpty(columnName)) {
					logger.error("cannot get columnName from asColumnName: " + asColumnName);
					throw new RuntimeException("columnName is " + columnName);
				}
				
				String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
				String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
				long dayDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
				if (dayDiff + 1 >7) {
					throw new RuntimeException("dayDiff is greater than 7: " + dayDiff);
				}
				String groupByColumnName = getGroupByColumnName(dim);
				if (StringUtils.isEmpty(groupByColumnName)) {
					logger.error("cannot get groupByColumnName from dim: " + dim);
					throw new RuntimeException("groupByColumnName is " + groupByColumnName);
				}
				
				//long offset =7;
				
				// 查询出记录后的时间
				Long startTime = System.currentTimeMillis();
				Map<String,List<Feedback>> map = new HashMap<String,List<Feedback>>();
				for (String cityName : valueList) {
					List<Feedback> feedbackList = feedbackDao.feedbackListForTrendData(groupByColumnName,columnName,asColumnName,startDate,endDate,new Long(Param.TREND_DATA_OFFSET),cityName);
					map.put(cityName, feedbackList);
				}
				// 查询出记录后的时间
				Long midTime = System.currentTimeMillis();
				String jsonString = Feedback.ToTrendDataJsonString(map, asColumnName,startDate, endDate);
				Long endTime = System.currentTimeMillis();

				System.out.println(jsonString);

				System.out.println("查询出数据的时间：" + (midTime - startTime));
				System.out.println("拼合json数据的时间：" + (endTime - midTime));
				return jsonString;
								
			}else {
				return null;
			}
			
		}

	

	private String getGroupByColumnName(String dim) {
			String result = null;
			if ("city".equals(dim)) {
				result = Param.COLUMNNAME_CITY_NAME;
			}
			if ("os_version".equals(dim)){
				result = Param.COLUMNNAME_OS_VERSION;
			}
			if ("operators".equals(dim)){
				result = Param.COLUMNNAME_OPERATION_TYPE;
			}
			if ("network_type".equals(dim)){
				// not supported yet
			}
			if ("device_model".equals(dim)){
				result = Param.COLUMNNAME_DEVICE_MODEL;
			}
			if ("engine_version".equals(dim)){
				result = Param.COLUMNNAME_PE_VERSION;
			}
			if ("country_code".equals(dim)){
				result = Param.COLUMNNAME_COUNTRY_CODE;
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
			String startDate1, String endDate1, String sortRule,
			String sortOrderBy, String groupByColumnName,String likeValue) throws ParseException {
		int pageInt = Integer.parseInt(page);
		int rowsInt = Integer.parseInt(rows);
		int limit = (pageInt - 1) * rowsInt;
		int offset = rowsInt;
		String asColumnName = norm;
		String columnName = Param.NAME_MAP.get(asColumnName);
		if (StringUtils.isEmpty(columnName)) {
			logger.error("cannot get columnName from asColumnName: " + asColumnName);
			throw new RuntimeException("columnName is " + columnName);
		}
		String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
		String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
		//String groupByColumnName = "city_name";

		// 查询出记录后的时间
		Long startTime = System.currentTimeMillis();
		// 获得数据列表
		Page<Feedback> p = new Page<Feedback>();
		p.setPageNo(pageInt);
		p.setPageSize(rowsInt);
		List<Feedback> feedbackList = feedbackDao.feedbackListByMultiDimension(p,groupByColumnName,columnName,asColumnName,startDate,endDate,new Long(limit),new Long(offset),likeValue);
		p.setResults(feedbackList);
		
		//long a = feedbackDao.feedbackRedAll();
		String allStr = feedbackDao.feedbackRedAll(columnName,startDate,endDate);
		if (StringUtils.isEmpty(allStr)){
			throw new RuntimeException("allStr is " + allStr);
		}

		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String jsonString = Feedback.pageToJsonString(p,groupByColumnName,asColumnName,Double.parseDouble(allStr));
		Long endTime = System.currentTimeMillis();

		System.out.println(jsonString);

		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));

		return jsonString;

	}
}
