package com.lenovo.lps.push.marketing.monitor.dao;

import java.util.ArrayList;
import java.util.List;

import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.mapper.HitPvUvMapper;

public interface HitPvUvDao extends BaseDao<HitPvUv, HitPvUvMapper> {

	ArrayList<HitPvUv> pvUvList();
	
    ArrayList<HitPvUv> getUvByMinute5(String date, List<String> resultList);
    
    ArrayList<HitPvUv> getPvByMinute5(String date, List<String> resultList);
    
    //ArrayList<HitPvUv> getPvByDateRange(String startDate,String endDate,String pid,String adid, List<String> resultList);
    ArrayList<HitPvUv> getPvByDateRange(String startDate,String endDate,String desc,String pid,String adid, List<String> resultList);

	//ArrayList<HitPvUv> getUvByDateRange(String startDate, String endDate,String pid,String adid, List<String> resultList);
	ArrayList<HitPvUv> getUvByDateRange(String startDate, String endDate,String desc,String pid,String adid, List<String> resultList);

	//ArrayList<HitPvUv> getHitUvByDateRange(String startDate, String endDate,String pid,String adid);
	ArrayList<HitPvUv> getHitUvByDateRange(String startDate, String endDate,String desc,String pid,String adid, List<String> resultList);

	//ArrayList<HitPvUv> getHitPvByDateRange(String startDate, String endDate,String pid,String adid);
	ArrayList<HitPvUv> getHitPvByDateRange(String startDate, String endDate,String desc,String pid,String adid, List<String> resultList);

	ArrayList<HitPvUv> getAllPv();

	ArrayList<HitPvUv> getAllUv();

	ArrayList<HitPvUv> getAllHitPv(String startDate, String endDate);

	ArrayList<HitPvUv> getAllHitUv(String startDate, String endDate);
    
    ArrayList<HitPvUv> getHitPvByMinute5(String yesterday, List<String> resultList);
    
    ArrayList<HitPvUv> getHitUvByMinute5(String yesterday, List<String> resultList);

    
    ArrayList<HitPvUv> getUvByHourAndDateRange(String startDate,String endDate,String pid,String adid, List<String> resultList);
	ArrayList<HitPvUv> getPvByHourAndDateRange(String startDate,String endDate,String pid,String adid, List<String> resultList);
	ArrayList<HitPvUv> getHitUvByHourAndDateRange(String startDate,String endDate,String pid,String adid);
	ArrayList<HitPvUv> getHitPvByHourAndDateRange(String startDate,String endDate,String pid,String adid);

    
    ArrayList<HitPvUv> getPvListInDateRangeByDimension (Page<HitPvUv> p, String dim, String startDate, String endDate, String keyword, List<String> resultList, String sortOrderBy, String sortRule, int limit, int offset);
    Double getPvTotalInDateRange (String startDate, String endDate, List<String> resultList);
    ArrayList<HitPvUv> getPvListForTrendData (String startDate, String endDate, String dim, String dimVal, List<String> resultList, int offset);
    
    ArrayList<HitPvUv>  getUvListInDateRangeByDimension (Page<HitPvUv> p, String dim, String startDate, String endDate, String keyword, List<String> resultList, String sortOrderBy, String sortRule, int limit, int offset);
    Double getUvTotalInDateRange (String startDate, String endDate, List<String> resultList);
    ArrayList<HitPvUv> 	getUvListForTrendData (String startDate, String endDate, String dim, String dimVal, List<String> resultList, int offset);
    
    ArrayList<HitPvUv>  getHitPvListInDateRangeByDimension (Page<HitPvUv> p, String dim, String startDate, String endDate, String keyword, String sortOrderBy, String sortRule, int limit, int offset);
    Double getHitPvTotalInDateRange (String startDate, String endDate);
    ArrayList<HitPvUv> 	getHitPvListForTrendData (String startDate, String endDate, String dim, String dimVal, int offset);
    
    ArrayList<HitPvUv>  getHitUvListInDateRangeByDimension (Page<HitPvUv> p, String dim, String startDate, String endDate, String keyword, String sortOrderBy, String sortRule, int limit, int offset);
    Double getHitUvTotalInDateRange (String startDate, String endDate);
    ArrayList<HitPvUv> 	getHitUvListForTrendData (String startDate, String endDate, String dim, String dimVal, int offset);

    ArrayList<HitPvUv> getPvListByResult(Page<HitPvUv> p, String startDate, String endDate, Long limit, Long offset);
    ArrayList<HitPvUv> getUvListByResult(Page<HitPvUv> p, String startDate, String endDate, Long limit, Long offset);

	Double getPvTotalInDateRangeTableHit(String startDate, String endDate);

	Double getUvTotalInDateRangeTableHit(String startDate, String endDate);

	List<HitPvUv> pvListForTrendData(String startDate, String endDate, Long offset,String result);
	List<HitPvUv> uvListForTrendData(String startDate, String endDate, Long offset,String result);

	List<HitPvUv> getDisturbanceData(Page<HitPvUv> p, String startDate,
			String endDate, Integer result, Long offset, Long rows);

}
