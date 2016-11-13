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

import com.lenovo.lps.push.marketing.monitor.dao.HitPvUvDao;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.jsonentity.BaseData;
import com.lenovo.lps.push.marketing.monitor.jsonentity.CBaseData;
import com.lenovo.lps.push.marketing.monitor.jsonentity.DateAttributeData;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData1;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData2;
import com.lenovo.lps.push.marketing.monitor.jsonentity.JsonData3;
import com.lenovo.lps.push.marketing.monitor.jsonentity.OverviewData;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/summary/*")
public class SummaryController {
	private static Logger logger = Logger.getLogger(SummaryController.class);
	
	@Autowired
	private HitPvUvDao hitPvUvDao;
	
	@RequestMapping(value = "productUserVisitOverviewAction", method = RequestMethod.POST)
	public void productUserVisitOverview(HttpServletRequest request, HttpServletResponse response) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		
		//http://data.lenovomm.com/avatar/productUserVisitOverviewAction.do?method=getBaseOverViewData&reportName=productUserVisitOverview
		
		logger.debug("productUserVisitOverview");
		
		String method = request.getParameter("method");
		String reportName = request.getParameter("reportName");
		String norm = request.getParameter("norm");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		logger.debug("method=" + method + ";reportName=" + reportName + ";norm=" + norm + ";startDate=" + startDate + ";endDate=" + endDate + ";page=" + page + ";rows=" + rows);
		
		String sd = request.getParameter("sd");
		String ed = request.getParameter("ed");
		String csd = request.getParameter("csd");
		String ced = request.getParameter("ced");
		String norms = request.getParameter("norms");
		logger.debug("sd=" + sd + ";ed=" + ed + ";csd=" + csd + ";ced=" + ced + ";norms=" + norms);
		
		String pid = request.getParameter("pid");
		if (StringUtils.isEmpty(pid)) {
			pid = null;
		}
		String adid = request.getParameter("adid");
		if (StringUtils.isEmpty(adid)) {
			adid = null;
		}
		logger.debug("pid=" + pid + ";adid=" + adid);
		String hitResult = request.getParameter("hitResult");
		logger.debug("hitResult=" + hitResult );
		
		String jsonString = getJsonString(method,reportName,norm,startDate,endDate,page,rows,sd,ed,csd,ced,norms,pid,adid,hitResult);
		
		if (StringUtils.isNotEmpty(jsonString)) {
			try {
				response.getWriter().write(jsonString);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		} else {
			logger.warn("result is empty");
		}
		
	}
	
	@RequestMapping(value = "productUserVisitOverviewMultiAction", method = RequestMethod.POST)
	public void productUserVisitOverviewMulti(HttpServletRequest request, HttpServletResponse response) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		
		//http://localhost:8080/Stream/summary/productUserVisitOverviewMultiAction.do?method=getLineJsonData&reportName=productUserVisitOverviewMulti
		
		logger.debug("productUserVisitOverviewMulti");
		
		String method = request.getParameter("method");
		String reportName = request.getParameter("reportName");
		String norm = request.getParameter("norm");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		logger.debug("method=" + method + ";reportName=" + reportName + ";norm=" + norm + ";startDate=" + startDate + ";endDate=" + endDate);
		
		String sd = request.getParameter("sd");
		String ed = request.getParameter("ed");
		String csd = request.getParameter("csd");
		String ced = request.getParameter("ced");
		String norms = request.getParameter("norms");
		logger.debug("sd=" + sd + ";ed=" + ed + ";csd=" + csd + ";ced=" + ced + ";norms=" + norms);
		String hitResult = request.getParameter("hitResult");
		logger.debug("hitResult=" + hitResult );
		/*
		 adid:asdfsafd
		 pid:sdafsdfs
		 */
		String pid = request.getParameter("pid");
		String adid = request.getParameter("adid");
		logger.debug("pid=" + pid + ";adid=" + adid);
		
		String jsonString = getJsonString(method,reportName,norm,startDate,endDate,page,rows,sd,ed,csd,ced,norms,pid,adid,hitResult);
		if (StringUtils.isEmpty(jsonString)) {
			logger.warn("result is empty");
			jsonString = "[result is empty]";
		}
		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}



	private String getJsonString(String method, String reportName, String norm,String startDate,String endDate,String page,String rows,String sd,String ed,String csd,String ced,String norms,String pid,String adid,String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		String result = null;
		// productUserVisitOverviewAction.do?method=getFixedJsonData&reportName=productUserVisitOverview
		// 六个数按时间段
		if ("getFixedJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getFixedJsonData(pid,adid,hitResult);
		}
		// method=getLineJsonData&reportName=productUserVisitOverviewMulti
		if ("getLineJsonData".equals(method) && "productUserVisitOverviewMulti".equals(reportName)) {
			return getLineJsonData(norm,startDate,endDate,pid,adid,hitResult);
		}
		// method=getstartTimesLineJsonData&reportName=productUserVisitOverview
		if ("getPVLineJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getPVLineJsonData(pid,adid,hitResult);
		}
		// getUVLineJsonData
		if ("getUVLineJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getUVLineJsonData(pid,adid,hitResult);
		}
		// getHitPVLineJsonData
		if ("getHitPVLineJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitPVLineJsonData(pid,adid,hitResult);
		}
		// getHitUVLineJsonData
		if ("getHitUVLineJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitUVLineJsonData(pid,adid,hitResult);
		}	
		// getHitPVRateLineJsonData
		if ("getHitPVRateLineJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitPVRateLineJsonData(pid,adid,hitResult);
		}
		// getHitUVRateLineJsonData
		if ("getHitUVRateLineJsonData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitUVRateLineJsonData(pid,adid,hitResult);
		}	
		// getUVLineJsonData
		// method=getGridJsonData&reportName=productUserVisitOverviewMulti
		if ("getGridJsonData".equals(method) && "productUserVisitOverviewMulti".equals(reportName)) {
			return getGridJsonData(startDate,endDate,page,rows,pid,adid,hitResult);
		}
		// method=getNormCompareOrDateCompare&reportName=productUserVisitOverview
		if ("getNormCompareOrDateCompare".equals(method) && "productUserVisitOverviewMulti".equals(reportName)) {
			return getNormCompareOrDateCompare(sd,ed,csd,ced,norms,pid,adid,hitResult);
		}
		// method=getSTTrendCompareData&reportName=productUserVisitOverview
		if ("getPVTrendCompareData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getPVTrendCompareData(sd,ed,csd,ced,pid,adid,hitResult);
		}
		if ("getUVTrendCompareData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getUVTrendCompareData(sd,ed,csd,ced,pid,adid,hitResult);
		}
		if ("getHitUVTrendCompareData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitUVTrendCompareData(sd,ed,csd,ced,pid,adid,hitResult);
		}
		if ("getHitPVTrendCompareData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitPVTrendCompareData(sd,ed,csd,ced,pid,adid,hitResult);
		}
		if ("getHitPVRateTrendCompareData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitPVRateTrendCompareData(sd,ed,csd,ced,pid,adid,hitResult);
		}
		if ("getHitUVRateTrendCompareData".equals(method) && "productUserVisitOverview".equals(reportName)) {
			return getHitUVRateTrendCompareData(sd,ed,csd,ced,pid,adid,hitResult);
		}
		return result;
	}
	
private String getHitUVRateTrendCompareData(String sd1,String ed1,String csd1,String ced1,String pid,String adid,String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		/*
		sd:sd=2014-05-03
		ed:ed=2014-05-06
		csd:csd=2014-04-29
		ced:ced=2014-05-02
		norms:su,st
			*/
		
			String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
			String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
			
			boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
			
			String csd = null;
			String ced = null;
			
			if (cFlag) {
				csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
				ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
			}
			
			cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
			
			
			Long startTime = System.currentTimeMillis();
			String result = null;
			
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
//				if (dateDiff1 != dateDiff) {
//					throw new RuntimeException(
//							"dateDiff1 is not equal to dateDiff1: " + dateDiff1
//									+ "!=" + dateDiff);
//				}
			}
			List<String> resultList = getResultList(hitResult);
			ArrayList<HitPvUv> pvUvList = hitPvUvDao.getUvByHourAndDateRange(sd, ed,pid,adid,resultList);
			ArrayList<HitPvUv> pvUvList1 = hitPvUvDao.getHitUvByHourAndDateRange(sd, ed,pid,adid);
			if (pvUvList != null) {
				for (HitPvUv v : pvUvList) {
					String hour = v.getHour();
					String hitV = getHitV(hour,pvUvList1, "hour");
					String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / (Double.parseDouble(v.getSum()) * (dateDiff + 1)));
					v.setSum(sum);
				}
			}
			
			ArrayList<HitPvUv> pvUvListX = null;
			if (cFlag) {
				pvUvListX = hitPvUvDao.getUvByHourAndDateRange(csd, ced,pid,adid,resultList);
				ArrayList<HitPvUv> pvUvListX1 = hitPvUvDao.getHitUvByHourAndDateRange(csd, ced,pid,adid);
				if (pvUvListX != null) {
					for (HitPvUv v : pvUvListX) {
						String hour = v.getHour();
						String hitV = getHitV(hour,pvUvListX1, "hour");
						String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / (Double.parseDouble(v.getSum()) * (dateDiff1 + 1)));
						v.setSum(sum);
					}
				}
			}
			
			// 查询出记录后的时间
			Long midTime = System.currentTimeMillis();
			result = JsonData3.list2JsonString(pvUvList,pvUvListX,cFlag);
			Long endTime = System.currentTimeMillis();
			System.out.println(result);
			System.out.println("查询出数据的时间：" + (midTime - startTime));
			System.out.println("拼合json数据的时间：" + (endTime - midTime));
			
			return result;
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
	
private String getHitPVRateTrendCompareData(String sd1,String ed1,String csd1,String ced1, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		/*
		sd:sd=2014-05-03
		ed:ed=2014-05-06
		csd:csd=2014-04-29
		ced:ced=2014-05-02
		norms:su,st
			*/
		
			String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
			String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
			
			boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
			
			String csd = null;
			String ced = null;
			
			if (cFlag) {
				csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
				ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
			}
			
			cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
			
			
			Long startTime = System.currentTimeMillis();
			String result = null;
			
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
//				if (dateDiff1 != dateDiff) {
//					throw new RuntimeException(
//							"dateDiff1 is not equal to dateDiff1: " + dateDiff1
//									+ "!=" + dateDiff);
//				}
			}
			List<String> resultList = getResultList(hitResult);
			ArrayList<HitPvUv> pvUvList = hitPvUvDao.getPvByHourAndDateRange(sd, ed,pid,adid,resultList);
			ArrayList<HitPvUv> pvUvList1 = hitPvUvDao.getHitPvByHourAndDateRange(sd, ed,pid,adid);
			if (pvUvList != null) {
				for (HitPvUv v : pvUvList) {
					String hour = v.getHour();
					String hitV = getHitV(hour,pvUvList1, "hour");
					String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / (Double.parseDouble(v.getSum()) * (dateDiff + 1)));
					v.setSum(sum);
				}
			}
			
			ArrayList<HitPvUv> pvUvListX = null;
			if (cFlag) {
				pvUvListX = hitPvUvDao.getPvByHourAndDateRange(csd, ced,pid,adid,resultList);
				ArrayList<HitPvUv> pvUvListX1 = hitPvUvDao.getHitPvByHourAndDateRange(csd, ced,pid,adid);
				if (pvUvListX != null) {
					for (HitPvUv v : pvUvListX) {
						String hour = v.getHour();
						String hitV = getHitV(hour,pvUvListX1, "hour");
						String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / (Double.parseDouble(v.getSum()) * (dateDiff1 + 1)));
						v.setSum(sum);
					}
				}
			}
			
			// 查询出记录后的时间
			Long midTime = System.currentTimeMillis();
			result = JsonData3.list2JsonString(pvUvList,pvUvListX,cFlag);
			Long endTime = System.currentTimeMillis();
			System.out.println(result);
			System.out.println("查询出数据的时间：" + (midTime - startTime));
			System.out.println("拼合json数据的时间：" + (endTime - midTime));
			
			return result;
		}
	
	private String getPVTrendCompareData(String sd1,String ed1,String csd1,String ced1, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		/*
		sd:sd=2014-05-03
		ed:ed=2014-05-06
		csd:csd=2014-04-29
		ced:ced=2014-05-02
		norms:su,st
			*/
		
			String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
			String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
			
			boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
			
			String csd = null;
			String ced = null;
			
			if (cFlag) {
				csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
				ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
			}
			
			cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
			
			
			Long startTime = System.currentTimeMillis();
			String result = null;
			
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
//				if (dateDiff1 != dateDiff) {
//					throw new RuntimeException(
//							"dateDiff1 is not equal to dateDiff1: " + dateDiff1
//									+ "!=" + dateDiff);
//				}
			}
			
			List<String> resultList = getResultList(hitResult);
			ArrayList<HitPvUv> pvUvList = hitPvUvDao.getPvByHourAndDateRange(sd, ed,pid,adid,resultList);
			for (HitPvUv v : pvUvList){
				double av7=Double.parseDouble(v.getSum())/ (dateDiff + 1);
				//v.setSum(new Double(av7).toString());
				//String av7Str = new Long(new Double(av7).longValue()).toString();
				String av7Str = "" + NumberUtil.round(av7, 0);
				v.setSum(av7Str);
			}
			
			ArrayList<HitPvUv> pvUvList1 = null;
			if (cFlag) {
				pvUvList1 = hitPvUvDao.getPvByHourAndDateRange(csd, ced,pid,adid,resultList);
				for (HitPvUv v : pvUvList1) {
					double av7 = Double.parseDouble(v.getSum()) / (dateDiff1 + 1);
					// v.setSum(new Double(av7).toString());
					// String av7Str = new Long(new
					// Double(av7).longValue()).toString();
					String av7Str = "" + NumberUtil.round(av7, 0);
					v.setSum(av7Str);
				}
			}
			
			// 查询出记录后的时间
			Long midTime = System.currentTimeMillis();
			result = JsonData3.list2JsonString(pvUvList,pvUvList1,cFlag);
			Long endTime = System.currentTimeMillis();
			System.out.println(result);
			System.out.println("查询出数据的时间：" + (midTime - startTime));
			System.out.println("拼合json数据的时间：" + (endTime - midTime));
			
			return result;
		}
	
	private String getUVTrendCompareData(String sd1,String ed1,String csd1,String ced1, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
		String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
		boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
		String csd = null;
		String ced = null;
		if (cFlag) {
			csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
			ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
		}
		cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
		
		Long startTime = System.currentTimeMillis();
		String result = null;
		
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
		}
		List<String> resultList = getResultList(hitResult);
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.getUvByHourAndDateRange(sd, ed,pid,adid,resultList);
		for (HitPvUv v : pvUvList){
			double av7=Double.parseDouble(v.getSum())/ (dateDiff + 1);
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
		
		ArrayList<HitPvUv> pvUvList1 = null;
		if (cFlag) {
			pvUvList1 = hitPvUvDao.getUvByHourAndDateRange(csd, ced,pid,adid,resultList);
			for (HitPvUv v : pvUvList1) {
				double av7 = Double.parseDouble(v.getSum()) / (dateDiff1 + 1);
				// v.setSum(new Double(av7).toString());
				// String av7Str = new Long(new
				// Double(av7).longValue()).toString();
				String av7Str = "" + NumberUtil.round(av7, 0);
				v.setSum(av7Str);
			}
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result = JsonData3.list2JsonString(pvUvList,pvUvList1,cFlag);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
		}
	
private String getHitUVTrendCompareData(String sd1,String ed1,String csd1,String ced1, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
		String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
		boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
		String csd = null;
		String ced = null;
		if (cFlag) {
			csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
			ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
		}
		cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
		
		Long startTime = System.currentTimeMillis();
		String result = null;
		
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
		}
		
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.getHitUvByHourAndDateRange(sd, ed,pid,adid);
		for (HitPvUv v : pvUvList){
			double av7=Double.parseDouble(v.getSum())/ (dateDiff + 1);
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
		
		ArrayList<HitPvUv> pvUvList1 = null;
		if (cFlag) {
			pvUvList1 = hitPvUvDao.getHitUvByHourAndDateRange(csd, ced,pid,adid);
			for (HitPvUv v : pvUvList1) {
				double av7 = Double.parseDouble(v.getSum()) / (dateDiff1 + 1);
				// v.setSum(new Double(av7).toString());
				// String av7Str = new Long(new
				// Double(av7).longValue()).toString();
				String av7Str = "" + NumberUtil.round(av7, 0);
				v.setSum(av7Str);
			}
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result = JsonData3.list2JsonString(pvUvList,pvUvList1,cFlag);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
		}

private String getHitPVTrendCompareData(String sd1,String ed1,String csd1,String ced1, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
	
	String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
	String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
	boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
	String csd = null;
	String ced = null;
	if (cFlag) {
		csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
		ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
	}
	cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
	
	Long startTime = System.currentTimeMillis();
	String result = null;
	
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
	}
	
	ArrayList<HitPvUv> pvUvList = hitPvUvDao.getHitPvByHourAndDateRange(sd, ed,pid,adid);
	for (HitPvUv v : pvUvList){
		double av7=Double.parseDouble(v.getSum())/ (dateDiff + 1);
		//v.setSum(new Double(av7).toString());
		//String av7Str = new Long(new Double(av7).longValue()).toString();
		String av7Str = "" + NumberUtil.round(av7, 0);
		v.setSum(av7Str);
	}
	
	ArrayList<HitPvUv> pvUvList1 = null;
	if (cFlag) {
		pvUvList1 = hitPvUvDao.getHitPvByHourAndDateRange(csd, ced,pid,adid);
		for (HitPvUv v : pvUvList1) {
			double av7 = Double.parseDouble(v.getSum()) / (dateDiff1 + 1);
			// v.setSum(new Double(av7).toString());
			// String av7Str = new Long(new
			// Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
	}
	
	// 查询出记录后的时间
	Long midTime = System.currentTimeMillis();
	result = JsonData3.list2JsonString(pvUvList,pvUvList1,cFlag);
	Long endTime = System.currentTimeMillis();
	System.out.println(result);
	System.out.println("查询出数据的时间：" + (midTime - startTime));
	System.out.println("拼合json数据的时间：" + (endTime - midTime));
	
	return result;
	}
	
	private String getNormCompareOrDateCompare(String sd1,String ed1,String csd1,String ced1,String norms1, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
	/*
	sd:sd=2014-05-03
	ed:ed=2014-05-06
	csd:csd=2014-04-29
	ced:ced=2014-05-02
	norms:su,st
		*/
	
		String sd = DateUtil.avatarDate2MdrillDate(sd1, "sd=");
		String ed = DateUtil.avatarDate2MdrillDate(ed1, "ed=");
		
		boolean cFlag = StringUtils.isNotEmpty(csd1) &&  StringUtils.isNotEmpty(ced1);
		
		String csd = null;
		String ced = null;
		
		if (cFlag) {
			csd = DateUtil.avatarDate2MdrillDate(csd1, "csd=");
			ced = DateUtil.avatarDate2MdrillDate(ced1, "ced=");	
		}
		
		cFlag = StringUtils.isNotEmpty(csd) &&  StringUtils.isNotEmpty(ced);
		
		Long startTime = System.currentTimeMillis();
		String result = null;
		
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
		
		List<String> norms = getNormList(norms1);
		List<String> resultList = getResultList(hitResult);
		Map<String, ArrayList<CBaseData>> map1 = getMap(norms, sd, ed, dateDiff + 1,pid,adid,resultList);
		Map<String, ArrayList<CBaseData>> map2 = null;
		if (cFlag){
			map2 = getMap(norms, csd, ced, dateDiff1 + 1,pid,adid,resultList);
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =CBaseData.list2JsonData(map1,map2,norms,cFlag);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}
	
	private Map<String, ArrayList<CBaseData>> getMap(List<String> norms, String sd,String ed,long dateDiff,String pid,String adid,List<String> resultList) throws ParseException{
		Map<String, ArrayList<CBaseData>> map = null;
		List<HitPvUv> pvUvList = null;
		if (norms != null) {
			map = new HashMap<String, ArrayList<CBaseData>>();
			for (String norm : norms) {
				if ("pv".equals(norm)) {
					pvUvList = hitPvUvDao.getPvByDateRange(sd, ed, "desc",pid,adid,resultList);
				}
				if ("uv".equals(norm)) {
					pvUvList = hitPvUvDao.getUvByDateRange(sd, ed, "desc",pid,adid,resultList);
				}
				if ("hit_pv".equals(norm)) {
					pvUvList = hitPvUvDao.getHitPvByDateRange(sd, ed, "desc",pid,adid,resultList);
				}
				if ("hit_uv".equals(norm)) {
					pvUvList = hitPvUvDao.getHitUvByDateRange(sd, ed, "desc",pid,adid,resultList);
				}
				// 投放量笔记
				if ("hit_pv_rate".equals(norm)) {
					pvUvList = hitPvUvDao.getPvByDateRange(sd, ed,
							"desc",pid,adid,resultList);
					ArrayList<HitPvUv> pvUvList1 = null;
					pvUvList1 = hitPvUvDao.getHitPvByDateRange(sd, ed, "desc",pid,adid,resultList);
					if (pvUvList != null) {
						for (HitPvUv v : pvUvList) {
							String theDate = v.getThedate();
							String hitV = getHitV(theDate, pvUvList1, "thedate");
							String sum = NumberUtil
									.double2PercentWithoutPercentSign(Double
											.parseDouble(hitV)
											/ Double.parseDouble(v.getSum()));
							v.setSum(sum);
						}
					}
				}
				// 投放用户量比例
				if ("hit_uv_rate".equals(norm)) {
					pvUvList = hitPvUvDao.getUvByDateRange(sd, ed,
							"desc",pid,adid,resultList);
					ArrayList<HitPvUv> pvUvList1 = null;
					pvUvList1 = hitPvUvDao.getHitUvByDateRange(sd, ed, "desc",pid,adid,resultList);
					if (pvUvList != null) {
						for (HitPvUv v : pvUvList) {
							String theDate = v.getThedate();
							String hitV = getHitV(theDate, pvUvList1, "thedate");
							String sum = NumberUtil
									.double2PercentWithoutPercentSign(Double
											.parseDouble(hitV)
											/ Double.parseDouble(v.getSum()));
							v.setSum(sum);
						}
					}
				}
				map.put(norm, getCBaseDataList(pvUvList,norm,sd,dateDiff));
			}
		}
		return map;
	}

	private ArrayList<CBaseData> getCBaseDataList(List<HitPvUv> pvUvList,String norm,
			String sd, long dateDiff) throws ParseException {
		if (StringUtils.isEmpty(sd)) {
			throw new IllegalArgumentException("sd is empty: " + sd);
		}
		if (dateDiff<0) {
			throw new IllegalArgumentException("dateDiff is smaller than 0: " + dateDiff);
		}
		ArrayList<CBaseData> list = new ArrayList<CBaseData>();
		for (int i=0;i<dateDiff;i++){
			CBaseData cBD = new CBaseData();
			String dateStr = DateUtil.getNAfterDate(sd, i);
			cBD.setDate(dateStr);
			list.add(cBD);
		}
			for (CBaseData cBD :  list){
				if ("pv".equals(norm)) {
					cBD.setPv(getHitV(cBD.getDate(), pvUvList, "thedate"));
				} else if ("uv".equals(norm)) {
					cBD.setUv(getHitV(cBD.getDate(), pvUvList, "thedate"));
				} else if ("hit_pv".equals(norm)) {
					cBD.setHitPv(getHitV(cBD.getDate(), pvUvList, "thedate"));
				} else if ("hit_uv".equals(norm)) {
					cBD.setHitUv(getHitV(cBD.getDate(), pvUvList, "thedate"));
				} else if ("hit_pv_rate".equals(norm)) {
					cBD.setHitUvRate(getHitV(cBD.getDate(), pvUvList, "thedate"));
				} else if ("hit_uv_rate".equals(norm)) {
					cBD.setHitUvRate(getHitV(cBD.getDate(), pvUvList, "thedate"));
				} 
		}
		
		return list;
	}

	private List<String> getNormList(String norms) {
		List<String> list = null;
		if (norms!=null){
			list = new ArrayList<String>();
			String[] strs = norms.split(",");
			if (strs!=null){
				for (String s : strs) {
					String n = s.trim();
					if (StringUtils.isNotEmpty(n)){
						list.add(n);
					}
				}
			}
		}
		return list;
	}

	private String getGridJsonData(String startDate1,String endDate1,String page,String rows, String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		
		String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
		String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
		
		Long startTime = System.currentTimeMillis();
		String result = null;
		JsonData2 jd = new JsonData2();
		
		int pageInt = Integer.parseInt(page);
		//int rowsInt = Integer.parseInt(rows);
		
		long dateDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
		if (dateDiff + 1 > 7) {
			throw new RuntimeException("dateDiff is greater than 7: " + dateDiff);
		}
		
		// 获得数据列表
		jd.setPage(pageInt);
		jd.setTotal(7);
		List<String> resultList = getResultList(hitResult);
		List<HitPvUv> pvList = hitPvUvDao.getPvByDateRange(startDate, endDate,null,pid,adid,resultList);
		List<HitPvUv> uvList = hitPvUvDao.getUvByDateRange(startDate, endDate,null,pid,adid,resultList);
		List<HitPvUv> hitPvList = hitPvUvDao.getHitPvByDateRange(startDate, endDate,null,pid,adid,resultList);
		List<HitPvUv> hitUvList = hitPvUvDao.getHitUvByDateRange(startDate, endDate,null,pid,adid,resultList);
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData2.pvUvList2JsonString(1,7,pvList,uvList,hitPvList,hitUvList);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}
	
	private String getHitPVRateLineJsonData(String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);;
		ArrayList<HitPvUv> pvUvList = null;
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		List<String> resultList = getResultList(hitResult);
		pvUvList = hitPvUvDao.getPvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		ArrayList<HitPvUv> pvUvList1 = null;
		pvUvList1 = hitPvUvDao.getHitPvByHourAndDateRange(startDate, endDate,pid,adid);
		if (pvUvList != null) {
			for (HitPvUv v : pvUvList) {
				String hour = v.getHour();
				String hitV = getHitV(hour,pvUvList1, "hour");
				String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v.getSum()));
				v.setSum(sum);
			}
		}
		JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.OD, false);
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		pvUvList1 = hitPvUvDao.getHitPvByHourAndDateRange(startDate, endDate,pid,adid);
		for (HitPvUv v : pvUvList1){
			double av7=Double.parseDouble(v.getSum())/7;
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			//v.setSum(av7Str);
			v.setSum(NumberUtil.double2PercentWithoutPercentSign(av7));
		}
		pvUvList = hitPvUvDao.getPvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		if (pvUvList != null) {
			for (HitPvUv v : pvUvList) {
				String hour = v.getHour();
				String hitV = getHitV(hour,pvUvList1, "hour");
				String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v.getSum()));
				v.setSum(sum);
			}
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.SD, true);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}
	
	private String getHitUVRateLineJsonData(String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);;
		ArrayList<HitPvUv> pvUvList = null;
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		List<String> resultList = getResultList(hitResult);
		pvUvList = hitPvUvDao.getUvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		ArrayList<HitPvUv> pvUvList1 = null;
		pvUvList1 = hitPvUvDao.getHitUvByHourAndDateRange(startDate, endDate,pid,adid);
		if (pvUvList != null) {
			for (HitPvUv v : pvUvList) {
				String hour = v.getHour();
				String hitV = getHitV(hour,pvUvList1, "hour");
				String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v.getSum()));
				v.setSum(sum);
			}
		}
		JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.OD, false);
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		pvUvList1 = hitPvUvDao.getHitUvByHourAndDateRange(startDate, endDate,pid,adid);
		for (HitPvUv v : pvUvList1){
			double av7=Double.parseDouble(v.getSum())/7;
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			//v.setSum(av7Str);
			v.setSum(NumberUtil.double2PercentWithoutPercentSign(av7));
		}
		pvUvList = hitPvUvDao.getUvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		if (pvUvList != null) {
			for (HitPvUv v : pvUvList) {
				String hour = v.getHour();
				String hitV = getHitV(hour,pvUvList1, "hour");
				String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v.getSum()));
				v.setSum(sum);
			}
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.SD, true);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}
	
	private String getHitUVLineJsonData(String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);;
		ArrayList<HitPvUv> pvUvList = null;
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		pvUvList = hitPvUvDao.getHitUvByHourAndDateRange(startDate, endDate,pid,adid);
		JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.OD, false);
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		pvUvList = hitPvUvDao.getHitUvByHourAndDateRange(startDate, endDate,pid,adid);
		for (HitPvUv v : pvUvList){
			double av7=Double.parseDouble(v.getSum())/7;
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.SD, true);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}
	
	private String getHitPVLineJsonData(String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);;
		ArrayList<HitPvUv> pvUvList = null;
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		pvUvList = hitPvUvDao.getHitPvByHourAndDateRange(startDate, endDate,pid,adid);
		JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.OD, false);
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		pvUvList = hitPvUvDao.getHitPvByHourAndDateRange(startDate, endDate,pid,adid);
		for (HitPvUv v : pvUvList){
			double av7=Double.parseDouble(v.getSum())/7;
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.SD, true);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}
	
	private String getUVLineJsonData(String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);;
		ArrayList<HitPvUv> pvUvList = null;
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		List<String> resultList = getResultList(hitResult);
		pvUvList = hitPvUvDao.getUvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.OD, false);
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		pvUvList = hitPvUvDao.getUvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		for (HitPvUv v : pvUvList){
			double av7=Double.parseDouble(v.getSum())/7;
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.SD, true);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}


	private String getPVLineJsonData(String pid, String adid, String hitResult) throws JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		List<JsonData1> list = new ArrayList<JsonData1>(24);;
		ArrayList<HitPvUv> pvUvList = null;
		
		String startDate = DateUtil.getYesterday();
		String endDate = startDate;
		List<String> resultList = getResultList(hitResult);
		pvUvList = hitPvUvDao.getPvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.OD, false);
		startDate = DateUtil.getNBeforeDate(8);
		endDate = DateUtil.getYesterday();
		pvUvList = hitPvUvDao.getPvByHourAndDateRange(startDate, endDate,pid,adid,resultList);
		for (HitPvUv v : pvUvList){
			double av7=Double.parseDouble(v.getSum())/7;
			//v.setSum(new Double(av7).toString());
			//String av7Str = new Long(new Double(av7).longValue()).toString();
			String av7Str = "" + NumberUtil.round(av7, 0);
			v.setSum(av7Str);
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result =JsonData1.pvUvList2JsonString(list, pvUvList, JsonData1.SD, true);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}

	private String getLineJsonData(String norm, String startDate1, String endDate1, String pid, String adid, String hitResult) throws ParseException, JsonGenerationException, JsonMappingException, IOException {
		Long startTime = System.currentTimeMillis();
		String result = null;
		String startDate = DateUtil.avatarDate2MdrillDate(startDate1);
		String endDate = DateUtil.avatarDate2MdrillDate(endDate1);
		ArrayList<HitPvUv> pvUvList = null;
		List<String> resultList = getResultList(hitResult);
		if ("2".equals(norm)) {
			pvUvList = hitPvUvDao.getPvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
		}
		if ("3".equals(norm)) {
			pvUvList = hitPvUvDao.getUvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
		}
		if ("0".equals(norm)) {
			pvUvList = hitPvUvDao.getHitPvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
		}
		if ("1".equals(norm)) {
			pvUvList = hitPvUvDao.getHitUvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
		}
		// 投放量笔记
		if ("4".equals(norm)) {
			pvUvList = hitPvUvDao.getPvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
			ArrayList<HitPvUv> pvUvList1 = null;
			pvUvList1 = hitPvUvDao.getHitPvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
			if (pvUvList != null) {
				for (HitPvUv v : pvUvList) {
					String theDate = v.getThedate();
					String hitV = getHitV(theDate,pvUvList1,"thedate");
					String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v.getSum()));
					v.setSum(sum);
				}
			}
		}
		// 投放用户量比例
		if ("5".equals(norm)) {
			pvUvList = hitPvUvDao.getUvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
			ArrayList<HitPvUv> pvUvList1 = null;
			pvUvList1 = hitPvUvDao.getHitUvByDateRange(startDate, endDate, "desc",pid,adid,resultList);
			if (pvUvList != null) {
				for (HitPvUv v : pvUvList) {
					String theDate = v.getThedate();
					String hitV = getHitV(theDate,pvUvList1,"thedate");
					String sum = NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v.getSum()));
					v.setSum(sum);
				}
			}
		}
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		result = DateAttributeData.pvUvList2JsonString(pvUvList);
		Long endTime = System.currentTimeMillis();
		System.out.println(result);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		return result;
	}



	private String getHitV(String ts, List<HitPvUv> pvUvList, String tsType) {
		String result = "0";
		if (ts != null) {
			if (pvUvList != null) {
				for (HitPvUv v : pvUvList) {
					if ("thedate".equals(tsType)) {
						if (v != null && ts.equals(v.getThedate())) {
							result = v.getSum();
							break;
						}
					} else if ("hour".equals(tsType)) {
						if (v != null && ts.equals(v.getHour())) {
							result = v.getSum();
							break;
						}
					} else {
						throw new RuntimeException("tsType not supported: " + tsType);
					}
				}
			}
		}
		return result;
	}

	private String getFixedJsonData(String pid, String adid, String hitResult) {
		
		Long startTime = System.currentTimeMillis();
		String dateStr = DateUtil.getYesterday();
		OverviewData od = new OverviewData();
		BaseData bdYesterday = new BaseData();
		ArrayList<HitPvUv> pvUvList = null;
		List<String> resultList = getResultList(hitResult);
		pvUvList = hitPvUvDao.getPvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdYesterday.setupPv(pvUvList);
		pvUvList = hitPvUvDao.getUvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdYesterday.setupUv(pvUvList);
		pvUvList = hitPvUvDao.getHitPvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdYesterday.setupHitPv(pvUvList,true);
		pvUvList = hitPvUvDao.getHitUvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdYesterday.setupHitUv(pvUvList,true);
		od.setDay1(bdYesterday);
		
		BaseData bdToday = new BaseData();
		dateStr = DateUtil.getToday();
		pvUvList = hitPvUvDao.getPvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdToday.setupPv(pvUvList);
		pvUvList = hitPvUvDao.getUvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdToday.setupUv(pvUvList);
		pvUvList = hitPvUvDao.getHitPvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdToday.setupHitPv(pvUvList,true);
		pvUvList = hitPvUvDao.getHitUvByDateRange(dateStr, dateStr,null,pid,adid,resultList);
		bdToday.setupHitUv(pvUvList,true);
		od.setDay0(bdToday);
		
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String jsonString = od.toSummaryJsonString();
		Long endTime = System.currentTimeMillis();
		System.out.println(jsonString);
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		return jsonString;
	}



	

}
