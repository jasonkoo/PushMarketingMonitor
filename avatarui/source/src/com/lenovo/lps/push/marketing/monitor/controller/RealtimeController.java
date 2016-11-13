package com.lenovo.lps.push.marketing.monitor.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
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
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData6;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData8;
import com.lenovo.lps.push.marketing.monitor.jsonentity.OverviewData;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/realtime/*")
public class RealtimeController {
	private static Logger logger = Logger.getLogger(RealtimeController.class);
	
	@Autowired
	private HitPvUvDao hitPvUvDao;
	
	@RequestMapping(value = "realTimeDataAction", method = RequestMethod.POST)
	public void studentList(HttpServletRequest request, HttpServletResponse response) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		logger.debug("realTimeDataAction");
		String method = request.getParameter("method");
		String reportName = request.getParameter("reportName");
		String norm = request.getParameter("norm");
		logger.debug("method=" + method + ";reportName=" + reportName +";norm=" + norm);
		String hitResult = request.getParameter("hitResult");
		logger.debug("hitResult=" + hitResult);
		handleRequest(response, method, reportName, norm,hitResult);
		
		//method=&reportName=realTimeData
	}



	private void handleRequest(HttpServletResponse response, String method,
			String reportName, String norm,String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		
		//method=getTodayMuniteData&reportName=realTimeData
		if ("getYesterdayMuniteData".equals(method) && "realTimeData".equals(reportName) && "uv".equals(norm)) {
			String yesterday = DateUtil.getYesterday();
			handleUv(response, yesterday, true,hitResult);
		} else if ("getTodayMuniteData".equals(method) && "realTimeData".equals(reportName) && "uv".equals(norm)) {
			String today = DateUtil.getToday();
			handleUv(response, today, false,hitResult);
		} else if ("getYesterdayMuniteData".equals(method) && "realTimeData".equals(reportName) && "hit_pv".equals(norm)) {
			String yesterday = DateUtil.getYesterday();
			handleHitPv(response, yesterday, true,hitResult);
		}else if ("getTodayMuniteData".equals(method) && "realTimeData".equals(reportName) && "hit_pv".equals(norm)) {
			String today = DateUtil.getToday();
			handleHitPv(response, today, false,hitResult);
		}else if ("getYesterdayMuniteData".equals(method) && "realTimeData".equals(reportName) && "pv".equals(norm)) {
			String yesterday = DateUtil.getYesterday();
			handlePv(response, yesterday, true,hitResult);
		}else if ("getTodayMuniteData".equals(method) && "realTimeData".equals(reportName) && "pv".equals(norm)) {
			String today = DateUtil.getToday();
			handlePv(response, today, false,hitResult);
		}else if ("getYesterdayMuniteData".equals(method) && "realTimeData".equals(reportName) && "hit_uv".equals(norm)) {
			String yesterday = DateUtil.getYesterday();
			handleHitUv(response, yesterday, true,hitResult);
		}else if ("getTodayMuniteData".equals(method) && "realTimeData".equals(reportName) && "hit_uv".equals(norm)) {
			String today = DateUtil.getToday();
			handleHitUv(response, today, false,hitResult);
		} else if ("getBaseData".equals(method) && "realTimeData".equals(reportName)) {
			getBaseData(response,hitResult);
		} else if ("getOverViewData".equals(method)) {
			// http://data.lenovomm.com/avatar/productUserVisitOverviewAction.do?method=getBaseOverViewData&reportName=productUserVisitOverview
			getOverviewData(reportName,norm,response,hitResult);
		} 
		
	}
	
	private void getOverviewData(String reportName, String norm, HttpServletResponse response, String hitResult) {
		Long startTime = System.currentTimeMillis();
		String startDate = DateUtil.getNBeforeDate(0);
		String endDate = DateUtil.getToday();
		OverviewData od = new OverviewData();
		ArrayList<HitPvUv> pvUvList = null;
		List<String> resultList = getResultList(hitResult);
		if ("pv".equals(norm)){
			pvUvList = hitPvUvDao.getPvByDateRange(startDate, endDate,null,null,null,resultList);
			od.setupPv(pvUvList);
		} else if ("uv".equals(norm)){
			pvUvList = hitPvUvDao.getUvByDateRange(startDate, endDate,null,null,null,resultList);
			od.setupUv(pvUvList);
		}else if ("hit_pv".equals(norm)){
			pvUvList = hitPvUvDao.getHitPvByDateRange(startDate, endDate,null,null,null,resultList);
			od.setupHitPv(pvUvList,false);
		}else if ("hit_uv".equals(norm)){
			pvUvList = hitPvUvDao.getHitUvByDateRange(startDate, endDate,null,null,null,resultList);
			od.setupHitUv(pvUvList,false);
		} else {
			logger.warn("getBaseOverviewData does not support norm: " + norm);
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String jsonString = od.toJsonString();
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private List<String> getResultList(String hitResult) {
		if (StringUtils.isNotEmpty(hitResult)){
			List<String> list = new ArrayList<String>();
			String[] results = hitResult.split(",");
			if (results!=null) {
				for (String result : results) {
					String s = result.trim();
					if (!list.contains(s)) {
						list.add(s);
					}
				}
			}
			if (!list.isEmpty()) {
				return list;
			}
		}
		return null;
	}

	private void getBaseData(HttpServletResponse response, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		Long startTime = System.currentTimeMillis();
		String startDate = DateUtil.getNBeforeDate(6);
		String endDate = DateUtil.getToday();		
		//BaseData bd = new BaseData();
		
		List<String> resultList = getResultList(hitResult);
		
		
		List<HitPvUv> hitPvList = hitPvUvDao.getHitPvByDateRange(startDate, endDate,null,null,null,resultList);
		List<HitPvUv> hitUvList = hitPvUvDao.getHitUvByDateRange(startDate, endDate,null,null,null,resultList);
		
		List<HitPvUv> pvList = hitPvUvDao.getPvByDateRange(startDate, endDate,null,null,null,resultList);
		List<HitPvUv> uvList = hitPvUvDao.getUvByDateRange(startDate, endDate,null,null,null,resultList);
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		//String jsonString = bd.toJsonString();
		String jsonString = JsonData8.toJsonString(pvList,uvList,hitPvList,hitUvList,endDate);
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	

	private void handlePv(HttpServletResponse response, String dateStr, boolean isYesterday, String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		//String yesterday = dateStr;
		List<String> resultList = getResultList(hitResult);
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.getPvByMinute5(dateStr,resultList);
       
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		//String jsonString = HitPvUv.pvUvList2JsonStringByMinute5(pvUvList, isYesterday);
		String jsonString = JsonData6.pvUvList2JsonStringByMinute5New(pvUvList, isYesterday);
		Long endTime = System.currentTimeMillis();

		System.out.println(jsonString);

		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));

		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	private void handleHitPv(HttpServletResponse response, String dateStr, boolean isYesterday, String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		// gulei2
		Long startTime = System.currentTimeMillis();	
		List<String> resultList = getResultList(hitResult);
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.getHitPvByMinute5(dateStr,resultList);
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		//String jsonString = HitPvUv.pvUvList2JsonStringByMinute5(pvUvList, isYesterday);
		String jsonString = JsonData6.pvUvList2JsonStringByMinute5New(pvUvList, isYesterday);
		Long endTime = System.currentTimeMillis();
		
		System.out.println(jsonString);		
		
		
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		try {
			response.getWriter().write(jsonString.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void handleHitUv(HttpServletResponse response, String dateStr, boolean isYesterday, String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException{
		// gulei2
		Long startTime = System.currentTimeMillis();
		List<String> resultList = getResultList(hitResult);
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.getHitUvByMinute5(dateStr,resultList);
	
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		//String jsonString = HitPvUv.pvUvList2JsonStringByMinute5(pvUvList, isYesterday);
		String jsonString = JsonData6.pvUvList2JsonStringByMinute5New(pvUvList, isYesterday);
		Long endTime = System.currentTimeMillis();
		
		System.out.println(jsonString);		
		
		
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		try {
			response.getWriter().write(jsonString.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	private void handleUv(HttpServletResponse response, String dateStr, boolean isYesterday, String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String yesterday = dateStr;
		List<String> resultList = getResultList(hitResult);
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.getUvByMinute5(yesterday,resultList);
       
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		//String jsonString = HitPvUv.pvUvList2JsonStringByMinute5(pvUvList, isYesterday);
		String jsonString = JsonData6.pvUvList2JsonStringByMinute5New(pvUvList, isYesterday);
		Long endTime = System.currentTimeMillis();

		System.out.println(jsonString);

		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));

		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	

}
