package com.lenovo.lps.push.marketing.monitor.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
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

import com.lenovo.lps.push.marketing.monitor.dao.HitPvUvDao;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/hit/*")
public class HitController {
	private static Logger logger = Logger.getLogger(HitController.class);
	
	@Autowired
	private HitPvUvDao hitPvUvDao;
	
	@RequestMapping(value = "pvuvList", method = RequestMethod.POST)
	public void pvUvList(HttpServletRequest request,
			HttpServletResponse response) {

		logger.info("-------fd list----------------");
		
		// 查询出记录后的时间
		Long startTime = System.currentTimeMillis();

		//feedback = new Feedback();
		//int rowsNum = Integer.parseInt(request.getParameter("rowsNum"));
		//int pageNow = Integer.parseInt(request.getParameter("pageNow"));

		// 获得数据列表
		ArrayList<HitPvUv> pvUvList = hitPvUvDao.pvUvList();

		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();

		StringBuffer jsonString = new StringBuffer();
		String jsonString2 = "";
		jsonString.append("{\"pageNow\":" + 1 + ",\"total\":" + 6
				+ ",\"rows\":[");

		if (pvUvList != null) {
			for (int i = 0; i < pvUvList.size(); i++) {
				jsonString.append("{\"date\":\"" + pvUvList.get(i).getThedate()
						+ "\",");
//				jsonString.append("\"arrived\":\"" + pvUvList.get(i).getHour()
//						+ "\",");
				jsonString.append("\"count\":\""
						+ pvUvList.get(i).getCount() + "\",");
				jsonString.append("\"sum\":\""
						+ pvUvList.get(i).getSum() + "\"},");
			}
		} else {
			System.out.println("pvuv list is null!");
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
	
	// multiDimensionAction.do?method=getOperatorDim&reportName=MultiDimensionData
	@RequestMapping(value = "multiDimensionAction", method = RequestMethod.POST)
	public void multiDimension(HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		logger.info("-------multiDimension----------------");
		String method = request.getParameter("method");
		String reportName = request.getParameter("reportName");
		
		String norm = request.getParameter("norm");		
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		
		System.out.println(request.getParameter("startDate"));
		System.out.println(request.getParameter("startDate"));
		String startDate = DateUtil.avatarDate2MdrillDate(request.getParameter("startDate"));
		String endDate = DateUtil.avatarDate2MdrillDate(request.getParameter("endDate"));
		String keyword = request.getParameter("keywords");
		
		if (keyword!=null) {
			keyword = keyword.replace(' ', '%');
		}
		
		
		// If there is no value for sortOrderBy, sortOrderBy would be ""
		String sortOrderBy = request.getParameter("sortOrderBy");
		
		String sortRule = request.getParameter("sortRule");		
		
		
		logger.debug("method=" + method + ";reportName=" + reportName+";norm=" + norm +";page=" + page+";rows=" + rows+";startDate=" + startDate+";endDate=" + endDate+";sortRule=" + sortRule+";sortOrderBy=" + sortOrderBy);
		
		String hitResult = request.getParameter("hitResult");
		logger.debug("hitResult=" + hitResult);
		
		// method options: getLocationDim getOSVersionDim getNetWorkDim getOperatorDim getTrendData
		// reportName: MultiDimensionData
		if("getLocationDim".equals(method) && "MultiDimensionData".equals(reportName)) {
			String dim = "city_name";		
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);
		} else if ("getOSVersionDim".equals(method) && "MultiDimensionData".equals(reportName)) {
			String dim = "os_version";			
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);
		} else if ("getOperatorDim".equals(method) && "MultiDimensionData".equals(reportName)) {
			String dim = "operation_type";			
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);
		} else if ("getDeviceModelDim".equals(method) && "MultiDimensionData".equals(reportName)) {
			String dim = "device_model";			
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);			
		} else if("getEngineVersionDim".equals(method) && "MultiDimensionData".equals(reportName)) {			
			String dim = "pe_version";
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);
		} else if ("getNetWorkDim".equals(method) && "MultiDimensionData".equals(reportName)) {
			String dim = "network_type";			
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);
		} else if ("getLocationCCDim".equals(method) && "MultiDimensionData".equals(reportName)) {
			String dim = "country_code";			
			getMultiDimension(dim, norm, page, rows, startDate, endDate, keyword, hitResult, sortOrderBy, sortRule, response);
		} else if ("getTrendData".equals(method) && "MultiDimensionData".equals(reportName)) {
			
			// dim options: city, network_type, operators, resolution, os_version
			String dim = request.getParameter("dim");
			String listStr = request.getParameter("list");			
			dim = dimParamToColumnName(dim);
			List<String> dimVals = listStr2StrList(listStr);
			logger.debug("dim=" + dim + ";dimVals=" + dimVals);
			
			int offset = 7;
			if (dimVals != null) {				
				// 查询出记录后的时间
				Long startTime = System.currentTimeMillis();
				Map<String, List<HitPvUv>> map = new HashMap<String, List<HitPvUv>>();
				List<String> resultList = getResultList(hitResult);
				if (norm.equals("pv")) {
					for (String dimVal : dimVals) {
						List<HitPvUv> hitPvUvList = hitPvUvDao.getPvListForTrendData(startDate, endDate, dim, dimVal, resultList, offset);
						// Test to see if hitPvUvList is null
						// System.out.println(hitPvUvList == null); output: false;
						// Test to see if hitPvUvList.size() == 0
						// System.out.println(hitPvUvList.size() == 0); output: true
						
						map.put(dimVal, hitPvUvList);
					}					
				} else if (norm.equals("uv")) {
					for (String dimVal : dimVals) {
						List<HitPvUv> hitPvUvList = hitPvUvDao.getUvListForTrendData(startDate, endDate, dim, dimVal, resultList, offset);
						map.put(dimVal, hitPvUvList);
					}
				} else if (norm.equals("hit_pv")) {
					for (String dimVal : dimVals) {
						List<HitPvUv> hitPvUvList = hitPvUvDao.getHitPvListForTrendData(startDate, endDate, dim, dimVal, offset);
						map.put(dimVal, hitPvUvList);
					}
					
				} else if (norm.equals("hit_uv")) {
					for (String dimVal : dimVals) {
						List<HitPvUv> hitPvUvList = hitPvUvDao.getHitUvListForTrendData(startDate, endDate, dim, dimVal, offset);
						map.put(dimVal, hitPvUvList);
					}
				}
				// 查询出记录后的时间
				Long midTime = System.currentTimeMillis();	
				HitPvUv.makeListEqualLength(map, startDate, endDate);
				String jsonString = HitPvUv.map2JsonStringForTrendData(map);
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
	}
	
	private void getMultiDimension (String dim, String norm, String page, String rows, String startDate, String endDate, 
			String keyword, String hitResult, String sortOrderBy, String sortRule, HttpServletResponse response) throws ParseException {		
		
		int pageInt = Integer.parseInt(page);
		int rowsInt = Integer.parseInt(rows);
		int limit = (pageInt - 1) * rowsInt;
		int offset = rowsInt;
		
		// If there is no "sortOrderBy" coming from front, 
		// Set it to default
		if ( "".equals(sortOrderBy) ) {
			sortOrderBy = "dimSum";
		}
		// If there is no "sortRule" coming from front, 
		// Set it to default
		if ( "".equals(sortRule) ) {
			sortRule = "desc";
		}
		// 查询出记录后的时间
		Long startTime = System.currentTimeMillis();
		// 获得数据列表
		Page<HitPvUv> p = new Page<HitPvUv>();		
		p.setPageNo(pageInt);
		p.setPageSize(rowsInt);
		double total = 0;
		List<String> resultList = getResultList(hitResult);
		if (norm.equals("pv")) {
			List<HitPvUv> hitPvUvList = hitPvUvDao.getPvListInDateRangeByDimension(p, dim, startDate, endDate, keyword, resultList, sortOrderBy, sortRule, limit, offset);
			p.setResults(hitPvUvList);
			total = hitPvUvDao.getPvTotalInDateRange(startDate, endDate, resultList);
			
		} else if (norm.equals("uv")) {
			List<HitPvUv> hitPvUvList = hitPvUvDao.getUvListInDateRangeByDimension(p, dim, startDate, endDate, keyword, resultList, sortOrderBy, sortRule, limit, offset);
			p.setResults(hitPvUvList);
			Double x = hitPvUvDao.getUvTotalInDateRange(startDate, endDate, resultList);
			if (x == null) {				
				total = 0.0;
			} else {
				total = x.doubleValue();
			}
			
		} else if (norm.equals("hit_pv")) {
			List<HitPvUv> hitPvUvList = hitPvUvDao.getHitPvListInDateRangeByDimension(p, dim, startDate, endDate, keyword, sortOrderBy, sortRule, limit, offset);
			p.setResults(hitPvUvList);
			total = hitPvUvDao.getHitPvTotalInDateRange(startDate, endDate);
		} else if (norm.equals("hit_uv")) {
			List<HitPvUv> hitPvUvList = hitPvUvDao.getHitUvListInDateRangeByDimension(p, dim, startDate, endDate, keyword, sortOrderBy, sortRule, limit, offset);
			p.setResults(hitPvUvList);
			Double x = hitPvUvDao.getHitUvTotalInDateRange(startDate, endDate);
			if (x == null) {				
				total = 0.0;
			} else {
				total = x.doubleValue();
			}
			
		}
		// 查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String jsonString = HitPvUv.page2JsonStringForDimensionData(p, total);		
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

	public void dimensionOverviewAction (HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		logger.info("-------dimensionOverview----------------");
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");
		String startDate = DateUtil.avatarDate2MdrillDate(request.getParameter("startDate"));
		String endDate = DateUtil.avatarDate2MdrillDate(request.getParameter("endDate"));
		
		// If there is no value for sortOrderBy, sortOrderBy would be ""
		String sortOrderBy = request.getParameter("sortOrderBy");
				
		String sortRule = request.getParameter("sortRule");
		
		logger.debug("page=" + page+";rows=" + rows+";startDate=" + startDate+";endDate=" + endDate+";sortRule=" + sortRule+";sortOrderBy=" + sortOrderBy);
	}
	
	private String dimParamToColumnName (String dimParam){
		String columnName = null;
		// dim options: city, network_type, operators, resolution, os_version
		if ("city".equals(dimParam)) {
			columnName = "city_name";
		} else if ("operators".equals(dimParam)) {
			columnName = "operation_type";
		} else if ("os_version".equals(dimParam)) {
			columnName = "os_version";
		} else if ("device_model".equals(dimParam)) {
			columnName = "device_model";
		} else if ("engine_version".equals(dimParam)) {
			columnName = "pe_version";
		} else if ("network_type".equals(dimParam)) {
			
		} else if ("country_code".equals(dimParam)) {
			columnName = "country_code";
		}
		
		return columnName;
	}
	
	private List<String> listStr2StrList(String listStr) {
		// Input pattern: ('Lenovo_A850','Lenovo_A820','Lenovo_A369')
		List<String> result = null;
		if (StringUtils.isNotEmpty(listStr)) {
			String regEx="[(')]";
			String str = listStr.replaceAll(regEx, "").trim();
			String[] a = str.split(",");
			if (a!=null && a.length>0) {
			   result = Arrays.asList(a);
			}			
		}
		return result;
	}

}
