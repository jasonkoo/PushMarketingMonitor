package com.lenovo.lps.push.marketing.monitor.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.jsonentity.DateAttributeData;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData1;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData3;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData5;
import com.lenovo.lps.push.marketing.monitor.param.Param;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;


@Controller
@RequestMapping("/summaryfeedback/*")
public class SummaryFeedbackController {
	private static Logger logger = Logger.getLogger(SummaryFeedbackController.class);

	@Autowired
	private FeedbackDao feedbackDao;
	
	@RequestMapping(value = "productUserVisitOverviewAction", method = RequestMethod.POST)
	public void productUserVisitOverview (HttpServletRequest request, HttpServletResponse response) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		logger.debug("productUserVisitOverviewAction");
		
		String method = request.getParameter("method");
		String reportName = request.getParameter("reportName");
		String norm = request.getParameter("norm");
		String startDate = request.getParameter("startDate");
		if (startDate != null && !startDate.equals("")) {
			startDate = DateUtil.avatarDate2MdrillDate(startDate);
		}
		String endDate = request.getParameter("endDate");
		if (endDate != null && !endDate.equals("")) {
			endDate = DateUtil.avatarDate2MdrillDate(endDate);
		}
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		logger.debug("method=" + method + ";reportName=" + reportName + ";norm=" + norm + ";startDate=" + startDate + ";endDate=" + endDate + ";page=" + page + ";rows=" + rows);
		
		String sd = request.getParameter("sd");
		if (sd != null && !sd.equals("")) {
			sd = DateUtil.avatarDate2MdrillDate(sd, "sd=");
		}
		String ed = request.getParameter("ed");
		if (ed != null && !ed.equals("")) {
			ed = DateUtil.avatarDate2MdrillDate(ed, "ed=");
		}
		String csd = request.getParameter("csd");
		if (csd != null && !csd.equals("")) {
			csd = DateUtil.avatarDate2MdrillDate(csd, "csd=");
		}
		String ced = request.getParameter("ced");
		if (ced != null && !ced.equals("")) {
			ced = DateUtil.avatarDate2MdrillDate(ced, "ced=");
		}
		String norms = request.getParameter("norms");
		logger.debug("sd=" + sd + ";ed=" + ed + ";csd=" + csd + ";ced=" + ced + ";norms=" + norms);
		
		String pid = request.getParameter("pid");
		String adid = request.getParameter("adid");
		logger.debug("pid=" + pid + ";adid=" + adid);
		
		// If there is no value for sortOrderBy, sortOrderBy would be ""
		String sortOrderBy = request.getParameter("sortOrderBy");				
		String sortRule = request.getParameter("sortRule");
		logger.debug("sortOrderBy=" + sortOrderBy + ";sortRule=" + sortRule);
		
		String jsonString = getJsonStringForOverview (method, reportName, norm, startDate, endDate, page, rows, sd, ed, csd, ced, norms, pid, adid, sortOrderBy, sortRule);
		if (StringUtils.isEmpty(jsonString)) {
			logger.warn("result is empty");
			jsonString = "[result is empty]";
		}
		
		response.getWriter().write(jsonString);
	}
	
	private String getJsonStringForOverview (String method, String reportName, String norm, String startDate, String endDate, String page, String rows, String sd, String ed, String csd, String ced, String norms, String pid, String adid, String sortOrderBy, String sortRule) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		// method=getSysmsgClickedLineJsonData&reportName=productUserVisitOverview
		// method name: getArrivedLineJsonData, getDisplayedLineJsonData, getSysmsgClickedLineJsonData, gets2ndDisplayedLineJsonData
		// gets2ndClickedLineJsonData, getDownloadedLineJsonData, getInstalledLineJsonData, getActivatedLineJsonData
		String jsonString = null;
		
		String asColumnName = null;
		String columnName = null;
		
		// method=getFixedJsonData&reportName=productUserVisitOverview
		if ("getFixedJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			jsonString = getFixedJsonData(pid, adid, sortOrderBy, sortRule);
		} else {
			
			method = method.toLowerCase();
			
			if (method.endsWith("linejsondata") && "productUserVisitOverview".equals(reportName)) {
			
				asColumnName = method.substring(3, method.indexOf("linejsondata"));
				if (asColumnName.charAt(1) == '2') {
					asColumnName = asColumnName.substring(1);
				}
				columnName = Param.NAME_MAP.get(asColumnName);
				jsonString = getLineJsonDataForOverview(columnName, asColumnName, pid, adid);
			}
			if (method.endsWith("trendcomparedata") && "productUserVisitOverview".equals(reportName)) {
				asColumnName = method.substring(3, method.indexOf("trendcomparedata"));
				if (asColumnName.charAt(1) == '2') {
					asColumnName = asColumnName.substring(1);
				}
				columnName = Param.NAME_MAP.get(asColumnName);
				
				jsonString = getTrendCompareDataForOverview(columnName, asColumnName, sd, ed, csd, ced, pid, adid);
			}
		}
		
		return jsonString;
	}
	
	private String getLineJsonDataForOverview(String columnName, String asColumnName, String pid, String adid) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String jsonString = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		
		List<Feedback> fbList = feedbackDao.getHourColumnListInDateRange(columnName, asColumnName, startDate, endDate, pid, adid);
		JsonData1.feedbackList2JsonString(list, fbList, asColumnName, JsonData1.OD, false);
		
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		fbList = feedbackDao.getHourColumnListInDateRange(columnName, asColumnName, startDate, endDate, pid, adid);
		
		for (Feedback fb : fbList) {
			double nv = Feedback.getNormValue(fb, asColumnName) / 7;
			Feedback.setNormValue(fb, asColumnName, NumberUtil.round(nv, 0));
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		jsonString =JsonData1.feedbackList2JsonString(list, fbList, asColumnName, JsonData1.SD, true);
		
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		return jsonString;
	}
	
	private String getTrendCompareDataForOverview(String columnName, String asColumnName, String sd, String ed, String csd, String ced, String pid, String adid) throws ParseException, JsonGenerationException, JsonMappingException, IOException{
		String jsonString = null;
		
		boolean cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
		
		Long startTime = System.currentTimeMillis();
		
		long dateDiff = DateUtil.mdrillDateDiffInDays(sd, ed);
		if (dateDiff + 1 > 7) {
			throw new RuntimeException("dateDiff is greater than 7: " + dateDiff);
		}
		
		long dateDiff1 = -1;
		if (cFlag) {
			dateDiff1 = DateUtil.mdrillDateDiffInDays(csd, ced);
			if (dateDiff1 + 1 > 7) {
				throw new RuntimeException("dateDiff1 is greater than 7: "
						+ dateDiff1);
			}
//			if (dateDiff1 != dateDiff) {
//				throw new RuntimeException(
//						"dateDiff1 is not equal to dateDiff1: " + dateDiff1
//								+ "!=" + dateDiff);
//			}
		}
		
		ArrayList<Feedback> fbList = feedbackDao.getHourColumnListInDateRange(columnName, asColumnName, sd, ed, pid, adid);
		for (Feedback fb : fbList) {
			double nv = Feedback.getNormValue(fb, asColumnName) / (dateDiff + 1);
			Feedback.setNormValue(fb, asColumnName, NumberUtil.round(nv, 0));
		}
		
		ArrayList<Feedback> fbList1 = null;
		if (cFlag) {
			fbList1 = feedbackDao.getHourColumnListInDateRange(columnName, asColumnName, csd, ced, pid, adid);
			for (Feedback fb : fbList1) {
				double nv = Feedback.getNormValue(fb, asColumnName) / (dateDiff1 + 1);
				Feedback.setNormValue(fb, asColumnName, NumberUtil.round(nv, 0));
			}
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		jsonString = JsonData3.fbList2JsonString(fbList, fbList1, cFlag, asColumnName);
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		return jsonString;
	}
	
	@RequestMapping(value = "productUserVisitOverviewMultiAction", method = RequestMethod.POST)
	public void productUserVisitOverviewMulti (HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
		logger.debug("productUserVisitOverviewMultiAction");
		
		String method = request.getParameter("method");
		String reportName = request.getParameter("reportName");
		String norm = request.getParameter("norm");
		String startDate = request.getParameter("startDate");
		if (startDate != null && !startDate.equals("")) {
			startDate = DateUtil.avatarDate2MdrillDate(startDate);
		}
		String endDate = request.getParameter("endDate");
		if (endDate != null && !endDate.equals("")) {
			endDate = DateUtil.avatarDate2MdrillDate(endDate);
		}
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		logger.debug("method=" + method + ";reportName=" + reportName + ";norm=" + norm + ";startDate=" + startDate + ";endDate=" + endDate + ";page=" + page + ";rows=" + rows);
		
		String sd = request.getParameter("sd");
		if (sd != null && !sd.equals("")) {
			sd = DateUtil.avatarDate2MdrillDate(sd, "sd=");
		}
		String ed = request.getParameter("ed");
		if (ed != null && !ed.equals("")) {
			ed = DateUtil.avatarDate2MdrillDate(ed, "ed=");
		}
		String csd = request.getParameter("csd");
		if (csd != null && !csd.equals("")) {
			csd = DateUtil.avatarDate2MdrillDate(csd, "csd=");
		}
		String ced = request.getParameter("ced");
		if (ced != null && !ced.equals("")) {
			ced = DateUtil.avatarDate2MdrillDate(ced, "ced=");
		}
		String norms = request.getParameter("norms");
		logger.debug("sd=" + sd + ";ed=" + ed + ";csd=" + csd + ";ced=" + ced + ";norms=" + norms);
		
		String pid = request.getParameter("pid");
		String adid = request.getParameter("adid");
		logger.debug("pid=" + pid + ";adid=" + adid);
		
		// If there is no value for sortOrderBy, sortOrderBy would be ""
		String sortOrderBy = request.getParameter("sortOrderBy");				
		String sortRule = request.getParameter("sortRule");
		logger.debug("sortOrderBy=" + sortOrderBy + ";sortRule=" + sortRule);
		
		String jsonString = getJsonStringForOverviewMulti(method, reportName, norm, startDate, endDate, page, rows, sd, ed, csd, ced, norms, pid, adid, sortOrderBy, sortRule);
		if (StringUtils.isEmpty(jsonString)) {
			logger.warn("result is empty");
			jsonString = "[result is empty]";
		}
		
		response.getWriter().write(jsonString);
		
		
	}
	
	private String getJsonStringForOverviewMulti (String method, String reportName, String norm, String startDate, String endDate, String page, String rows, String sd, String ed, String csd, String ced, String norms, String pid, String adid, String sortOrderBy, String sortRule) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		String jsonString = null;
		// method=getLineJsonData&reportName=productUserVisitOverviewMulti
		if ("getLineJsonData".equals(method) && "productUserVisitOverviewMulti".equals(reportName)) {
			jsonString = getLineJsonDataForOverviewMulti(norm, startDate, endDate, pid, adid);
		
		// method=getNormCompareOrDateCompare&reportName=productUserVisitOverviewMulti
		} else if ("getNormCompareOrDateCompare".equals(method) && "productUserVisitOverviewMulti".equals(reportName)) {
			jsonString = getNormCompareOrDateCompare(norms, sd, ed, csd, ced, pid, adid);		
		
		// method=getGridJsonData&reportName=productUserVisitOverviewMulti
		} else if ("getGridJsonData".equals(method) && "productUserVisitOverviewMulti".equals(reportName)) {
			jsonString = getGridJsonData(startDate, endDate, page, rows, pid, adid, sortOrderBy, sortRule);		
		} 
		return jsonString;
	}
	
	private String getLineJsonDataForOverviewMulti (String norm, String startDate, String endDate, String pid, String adid) throws JsonGenerationException, JsonMappingException, IOException {
		String jsonString = null;
		Long startTime = System.currentTimeMillis();
		List<Feedback> fbList = null;
		String columnName = null;
		String asColumnName = null;
		if ("0".equals(norm)) {
			asColumnName = Param.ARRIVED;
			columnName = Param.NAME_MAP.get(asColumnName);
		} else if ("1".equals(norm)) {
			asColumnName = Param.DISPLAYED;
			columnName = Param.NAME_MAP.get(asColumnName);			
		} else if ("2".equals(norm)) {
			asColumnName = Param.SYSMSGCLICKED;
			columnName = Param.NAME_MAP.get(asColumnName);			
		} else if ("3".equals(norm)) {
			asColumnName = Param.S_2NDDISPLAYED;
			columnName = Param.NAME_MAP.get(asColumnName);
		} else if ("4".equals(norm)) {
			asColumnName = Param.S_2NDCLICKED;
			columnName = Param.NAME_MAP.get(asColumnName);
		} else if ("5".equals(norm)) {
			asColumnName = Param.DOWNLOADED;
			columnName = Param.NAME_MAP.get(asColumnName);
		} else if ("6".equals(norm)) {
			asColumnName = Param.INSTALLED;
			columnName = Param.NAME_MAP.get(asColumnName);
		} else if ("7".equals(norm)) {
			asColumnName = Param.ACTIVATED;
			columnName = Param.NAME_MAP.get(asColumnName);
		}
		fbList = feedbackDao.getDateColumnListInDateRange(columnName, asColumnName, startDate, endDate, pid, adid);
		Collections.reverse(fbList);
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		jsonString = DateAttributeData.feedbackList2JsonString(fbList, asColumnName);
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));	
		
		return jsonString;
	}
	
	private String getNormCompareOrDateCompare(String norms, String sd, String ed, String csd, String ced, String pid, String adid) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		
		boolean cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);	
		
		long dateDiff = DateUtil.mdrillDateDiffInDays(sd, ed);
		if (dateDiff + 1 > 7) {
			throw new RuntimeException("dateDiff is greater than 7: " + dateDiff);
		}
		
		long dateDiff1 = -1;
		if (cFlag) {
			dateDiff1 = DateUtil.mdrillDateDiffInDays(csd, ced);
			if (dateDiff1 + 1 > 7) {
				throw new RuntimeException("dateDiff1 is greater than 7: "
						+ dateDiff1);
			}
			// if (dateDiff1 != dateDiff) {
			// throw new RuntimeException(
			// "dateDiff1 is not equal to dateDiff1: " + dateDiff1
			// + "!=" + dateDiff);
			// }
		}
		
		String asColumnName = null;
		String columnName = null;
		List<Feedback> fbList = null;
		List<String> normList = getNormList(norms);
		
		List<String> result = new ArrayList<String>();
		
		
		if (normList != null && normList.size() > 0) {
			// sd - ed
			for (int i = 0; i < normList.size(); i++) {
				String norm = normList.get(i);
				// Take care of special case
				// s2nddisplayed -> 2nddisplayed
				// s2ndclicked -> 2ndclicked
				if (norm.charAt(1) == '2') {
					norm = norm.substring(1);
				}
				
				asColumnName = norm;
				columnName = Param.NAME_MAP.get(asColumnName);
				
				fbList = feedbackDao.getDateColumnListInDateRange(columnName, asColumnName, sd, ed, pid, adid);
				
				if (i == 0) {
					result.add(getDateListStr(fbList));
				}
				
				result.add(getNormValueListStr(fbList, asColumnName));
			}
			
			if (cFlag) {
				// csd - ced
				for (int i = 0; i < normList.size(); i++) {
					String norm = normList.get(i);
					// Take care of special case
					// s2nddisplayed -> 2nddisplayed
					// s2ndclicked -> 2ndclicked
					if (norm.charAt(1) == '2') {
						norm = norm.substring(1);
					}
					
					asColumnName = norm;
					columnName = Param.NAME_MAP.get(asColumnName);
					
					fbList = feedbackDao.getDateColumnListInDateRange(columnName, asColumnName, csd, ced, pid, adid);
					
					if (i == 0) {
						result.add(getDateListStr(fbList));
					}
					
					result.add(getNormValueListStr(fbList, asColumnName));
				}
			}
			
			
		}
		String tmp = JsonUtil.entity2JsonString(result);
		System.out.println(tmp);
		return JsonUtil.entity2JsonString(result);
	}
	
	private String getGridJsonData(String startDate, String endDate, String page, String rows, String pid, String adid, String sortOrderBy, String sortRule) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		String jsonString = null;
		
		// If there is no "sortOrderBy" coming from front, 
		// Set it to default
		if ( "".equals(sortOrderBy) ) {
			sortOrderBy = "thedate";
		}
		// If there is no "sortRule" coming from front, 
		// Set it to default
		if ( "".equals(sortRule) ) {
			sortRule = "asc";
		}
		
		int pageInt = Integer.parseInt(page);
		int rowsInt = Integer.parseInt(rows);
		int limit = (pageInt - 1) * rowsInt;
		int offset = rowsInt;
		
		Long startTime = System.currentTimeMillis();		

		long dateDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
		if (dateDiff + 1 > 7) {
			throw new RuntimeException("dateDiff is greater than 7: " + dateDiff);
		}		
		
		List<Feedback> fbList = feedbackDao.getFeedbackListInDateRange(startDate, endDate, pid, adid, sortOrderBy, sortRule, limit, offset);
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		jsonString = JsonData5.fbList2JsonString(1, 7, fbList);
		
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return jsonString;
	}
	
	private String getFixedJsonData(String pid, String adid, String sortOrderBy, String sortRule) throws JsonGenerationException, JsonMappingException, IOException {
		String jsonString = null;
		
		// If there is no "sortOrderBy" coming from front, 
		// Set it to default
		if ( "".equals(sortOrderBy) ) {
			sortOrderBy = "thedate";
		}
		// If there is no "sortRule" coming from front, 
		// Set it to default
		if ( "".equals(sortRule) ) {
			sortRule = "asc";
		}
		int limit = 0;
		int offset = 1;
		
		String yesterdayDateStr = DateUtil.getYesterday();
		String todayDateStr = DateUtil.getToday();
		
		Long startTime = System.currentTimeMillis();
		
		List<Feedback> yesterdayFeedbacks = feedbackDao.getFeedbackListInDateRange(yesterdayDateStr, yesterdayDateStr, pid, adid, sortOrderBy, sortRule, limit, offset);
		List<Feedback> todayFeedbacks = feedbackDao.getFeedbackListInDateRange(todayDateStr, todayDateStr, pid, adid, sortOrderBy, sortRule, limit, offset);
		
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		Map<String, List<Feedback>> map = new HashMap<String, List<Feedback>>();
		List<Feedback> fbList = new ArrayList<Feedback>();		
		if (todayFeedbacks != null && todayFeedbacks.size() == 1) {
			fbList.add(todayFeedbacks.get(0));
		} else {
			fbList.add(new Feedback());
		}
		if (yesterdayFeedbacks != null && yesterdayFeedbacks.size() == 1) {
			fbList.add(yesterdayFeedbacks.get(0));
		} else {
			fbList.add(new Feedback());
		}
		
		
		map.put("twoDays", fbList);
		
		jsonString = JsonUtil.entity2JsonString(map);
		
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return jsonString;
	}	
	
	
	
	private String getNormValueListStr (List<Feedback> fbList, String asColumnName) {
		String normValueListStr = "";
		if (fbList != null) {
			for (Feedback fb : fbList) {
				normValueListStr += Feedback.getNormValue(fb, asColumnName) + ",";
			}
			return normValueListStr.substring(0, normValueListStr.length() -1);
		}
		return normValueListStr;
	}
	
	private String getDateListStr (List<Feedback> fbList) throws ParseException {
		String dataListStr = "";
		if (fbList != null) {
			for (Feedback fb : fbList) {
				dataListStr += DateUtil.mdrillDate2AvatarDate(fb.getDate()) + ",";
			}
			return dataListStr.substring(0, dataListStr.length() - 1);
		}
		return dataListStr;		
	}
	
	private List<String> getNormList (String norms) {
		List<String> list = null;
		if (norms!=null){
			list = new ArrayList<String>();
			String[] strs = norms.split(",");
			if (strs!=null && strs.length > 0){
				list = Arrays.asList(strs);
			}
		}
		return list;
	}

}
