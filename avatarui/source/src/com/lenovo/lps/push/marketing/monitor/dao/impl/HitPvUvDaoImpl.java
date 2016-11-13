package com.lenovo.lps.push.marketing.monitor.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lenovo.lps.push.marketing.monitor.dao.HitPvUvDao;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.mapper.HitPvUvMapper;

/**
 * @author Rocky
 */
@Repository
public class HitPvUvDaoImpl extends BaseDaoImpl<HitPvUv, HitPvUvMapper>
		implements HitPvUvDao {
	public HitPvUvDaoImpl() {
		setMapperClass(HitPvUvMapper.class);
	}

	@Override
	public ArrayList<HitPvUv> pvUvList() {
		return this.getMapper().pvuvList();
	}

	@Override
	public ArrayList<HitPvUv> getUvByMinute5(String date, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("date", date);
		params.put("resultList", resultList);
		return this.getMapper().getUvByMinute5(params);
	}
	@Override
	public ArrayList<HitPvUv> getHitPvByMinute5(String date, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("date", date);
		params.put("resultList", resultList);
		return this.getMapper().getHitPvByMinute5(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getHitUvByMinute5(String date, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("date", date);
		params.put("resultList", resultList);
		return this.getMapper().getHitUvByMinute5(params);
	}

	@Override
	public ArrayList<HitPvUv> getPvByMinute5(String date, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("date", date);
		params.put("resultList", resultList);
		return this.getMapper().getPvByMinute5(params);
	}

//	@Override
//	public ArrayList<HitPvUv> getPvByDateRange(String startDate, String endDate,String pid,String adid, List<String> resultList) {
//
//		Map<String, Object> params = new HashMap<String, Object>(2);
//		params.put("startDate", startDate);
//		params.put("endDate", endDate);
//		params.put("pid", pid);
//		params.put("adid", adid);
//		params.put("resultList", resultList);
//		return this.getMapper().getPvByDateRange(params);
//	}
//
//	@Override
//	public ArrayList<HitPvUv> getUvByDateRange(String startDate, String endDate,String pid,String adid, List<String> resultList) {
//		Map<String, Object> params = new HashMap<String, Object>(2);
//		params.put("startDate", startDate);
//		params.put("endDate", endDate);
//		params.put("pid", pid);
//		params.put("adid", adid);
//		params.put("resultList", resultList);
//		return this.getMapper().getUvByDateRange(params);
//	}
//
//	@Override
//	public ArrayList<HitPvUv> getHitUvByDateRange(String startDate,
//			String endDate,String pid,String adid) {
//		Map<String, Object> params = new HashMap<String, Object>(2);
//		params.put("startDate", startDate);
//		params.put("endDate", endDate);
//		params.put("pid", pid);
//		params.put("adid", adid);
//		return this.getMapper().getHitUvByDateRange(params);
//	}
//
//	@Override
//	public ArrayList<HitPvUv> getHitPvByDateRange(String startDate,
//			String endDate,String pid,String adid) {
//		Map<String, Object> params = new HashMap<String, Object>(2);
//		params.put("startDate", startDate);
//		params.put("endDate", endDate);
//		params.put("pid", pid);
//		params.put("adid", adid);
//		return this.getMapper().getHitPvByDateRange(params);
//	}

	@Override
	public ArrayList<HitPvUv> getAllPv() {
		return this.getMapper().getAllPv();
	}

	@Override
	public ArrayList<HitPvUv> getAllUv() {
		return this.getMapper().getAllUv();
	}

	@Override
	public ArrayList<HitPvUv> getAllHitPv(String startDate, String endDate) {
		
		return this.getMapper().getAllHitPv();
	}

	@Override
	public ArrayList<HitPvUv> getAllHitUv(String startDate, String endDate) {
		
		return this.getMapper().getAllHitUv();
	}
	
	
	// pv group by Gu Lei
	@Override
	public ArrayList<HitPvUv> getPvListInDateRangeByDimension(Page<HitPvUv> p,
			String dim, String startDate, String endDate, String keyword, List<String> resultList,
			String sortOrderBy,	String sortRule, int limit, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("dim", dim);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("keyword", keyword);
		//params.put("result", hitResult);
		params.put("resultList", resultList);
		params.put("sortOrderBy", sortOrderBy);
		params.put("sortRule", sortRule);
		params.put("limit", limit);
		params.put("offset", offset);
		return this.getMapper().getPvListInDateRangeByDimension(params);
	}


	@Override
	public ArrayList<HitPvUv> getUvByHourAndDateRange(String startDate,String endDate,String pid,String adid, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>(2);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("resultList", resultList);
		return this.getMapper().getUvByHourAndDateRange(params);
	}

	@Override
	public ArrayList<HitPvUv> getPvByHourAndDateRange(String startDate,String endDate,String pid,String adid, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>(2);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("resultList", resultList);
		return this.getMapper().getPvByHourAndDateRange(params);
	}

	@Override
	public ArrayList<HitPvUv> getHitUvByHourAndDateRange(String startDate,String endDate,String pid,String adid) {
		Map<String, Object> params = new HashMap<String, Object>(2);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		return this.getMapper().getHitUvByHourAndDateRange(params);
	}

	@Override
	public ArrayList<HitPvUv> getHitPvByHourAndDateRange(String startDate,String endDate,String pid,String adid) {
		Map<String, Object> params = new HashMap<String, Object>(2);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		return this.getMapper().getHitPvByHourAndDateRange(params);
	}


	@Override
	public Double getPvTotalInDateRange(String startDate, String endDate, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		//params.put("result", hitResult);
		params.put("resultList", resultList);
		return this.getMapper().getPvTotalInDateRange(params);
	}

	
	@Override
	public ArrayList<HitPvUv> getPvListForTrendData(String startDate,
			String endDate, String dim, String dimVal, List<String> resultList, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("dim", dim);
		params.put("dimVal", dimVal);
		//params.put("result", hitResult);
		params.put("resultList", resultList);
		params.put("offset", offset);
		
		return this.getMapper().getPvListForTrendData(params);
	}

	
	// uv group by Gu Lei
	@Override
	public ArrayList<HitPvUv> getUvListInDateRangeByDimension(Page<HitPvUv> p,
			String dim, String startDate, String endDate, String keyword, List<String> resultList,
			String sortOrderBy,	String sortRule, int limit, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("dim", dim);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("keyword", keyword);
		//params.put("result", hitResult);
		params.put("resultList", resultList);
		params.put("sortOrderBy", sortOrderBy);
		params.put("sortRule", sortRule);
		params.put("limit", limit);
		params.put("offset", offset);
		
		return this.getMapper().getUvListInDateRangeByDimension(params);
	}	
	
	@Override
	public Double getUvTotalInDateRange(String startDate, String endDate, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		//params.put("result", hitResult);
		params.put("resultList", resultList);
		return this.getMapper().getUvTotalInDateRange(params);
	}	
	
	@Override
	public ArrayList<HitPvUv> getUvListForTrendData(String startDate,
			String endDate, String dim, String dimVal, List<String> resultList, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("dim", dim);
		params.put("dimVal", dimVal);
		//params.put("result", hitResult);
		params.put("resultList", resultList);
		params.put("offset", offset);
		
		return this.getMapper().getUvListForTrendData(params);
	}
	
	
	// hit_pv group by Gu Lei
	@Override
	public ArrayList<HitPvUv> getHitPvListInDateRangeByDimension(Page<HitPvUv> p, 
			String dim, String startDate, String endDate, String keyword,
			String sortOrderBy, String sortRule, int limit, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("dim", dim);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("keyword", keyword);
		params.put("sortOrderBy", sortOrderBy);
		params.put("sortRule", sortRule);
		params.put("limit", limit);
		params.put("offset", offset);
		
		return this.getMapper().getHitPvListInDateRangeByDimension(params);
	}

	@Override
	public Double getHitPvTotalInDateRange(String startDate, String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		
		return this.getMapper().getHitPvTotalInDateRange(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getHitPvListForTrendData(String startDate,
			String endDate, String dim, String dimVal, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("dim", dim);
		params.put("dimVal", dimVal);
		params.put("offset", offset);
		
		return this.getMapper().getHitPvListForTrendData(params);
	}
	
	
	// hit_uv group by Gu Lei
	@Override
	public ArrayList<HitPvUv> getHitUvListInDateRangeByDimension(Page<HitPvUv> p,
			String dim, String startDate, String endDate, String keyword,
			String sortOrderBy, String sortRule, int limit, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("dim", dim);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("keyword", keyword);
		params.put("sortOrderBy", sortOrderBy);
		params.put("sortRule", sortRule);
		params.put("limit", limit);
		params.put("offset", offset);
		
		return this.getMapper().getHitUvListInDateRangeByDimension(params);
	}

	@Override
	public Double getHitUvTotalInDateRange(String startDate, String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		
		return this.getMapper().getHitUvTotalInDateRange(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getHitUvListForTrendData(String startDate,
			String endDate, String dim, String dimVal, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("dim", dim);
		params.put("dimVal", dimVal);
		params.put("offset", offset);
		
		return this.getMapper().getHitUvListForTrendData(params);
	}

	@Override
	public ArrayList<HitPvUv> getPvByDateRange(String startDate,
			String endDate, String desc,String pid,String adid, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("desc", desc);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("resultList", resultList);
		return this.getMapper().getPvByDateRange(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getUvByDateRange(String startDate,
			String endDate, String desc,String pid,String adid, List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("desc", desc);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("resultList", resultList);
		return this.getMapper().getUvByDateRange(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getHitPvByDateRange(String startDate,
			String endDate, String desc,String pid,String adid,List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("desc", desc);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("resultList", resultList);
		return this.getMapper().getHitPvByDateRange(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getHitUvByDateRange(String startDate,
			String endDate, String desc,String pid,String adid,List<String> resultList) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("desc", desc);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("resultList", resultList);
		return this.getMapper().getHitUvByDateRange(params);
	}

	@Override
	public ArrayList<HitPvUv> getPvListByResult(Page<HitPvUv> p, String startDate,
			String endDate, Long limit, Long offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("limit", limit);
		params.put("offset", offset);
		
		return this.getMapper().getPvListByResult(params);
	}
	
	@Override
	public ArrayList<HitPvUv> getUvListByResult(Page<HitPvUv> p, String startDate,
			String endDate, Long limit, Long offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("limit", limit);
		params.put("offset", offset);
		
		return this.getMapper().getUvListByResult(params);
	}

	@Override
	public Double getPvTotalInDateRangeTableHit(String startDate, String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		return this.getMapper().getPvTotalInDateRangeTableHit(params);
	}

	@Override
	public Double getUvTotalInDateRangeTableHit(String startDate, String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		return this.getMapper().getUvTotalInDateRangeTableHit(params);
	}

	@Override
	public List<HitPvUv> pvListForTrendData(String startDate, String endDate,
			Long offset,String result) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("offset", offset);
		params.put("result", result);
		return this.getMapper().pvListForTrendData(params);
	}

	@Override
	public List<HitPvUv> uvListForTrendData(String startDate, String endDate,
			Long offset,String result) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("offset", offset);
		params.put("result", result);
		return this.getMapper().uvListForTrendData(params);
	}

	@Override
	public List<HitPvUv> getDisturbanceData(Page<HitPvUv> p, String startDate,
			String endDate, Integer result, Long offset, Long rows) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", p);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("offset", offset);
		params.put("rows", rows);
		params.put("result", result);
		return this.getMapper().getDisturbanceData(params);
	}
	
}
