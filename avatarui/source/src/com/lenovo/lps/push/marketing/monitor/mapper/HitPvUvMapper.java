package com.lenovo.lps.push.marketing.monitor.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;

/**
 * @author Rocky
 */
public interface HitPvUvMapper extends BaseMapper<HitPvUv> {

	ArrayList<HitPvUv> pvuvList(
	);
	
	ArrayList<HitPvUv> getUvByMinute5(Map<String, Object> params);
	
	ArrayList<HitPvUv> getPvByMinute5(Map<String, Object> params);
	
	ArrayList<HitPvUv> getPvByDateRange(Map<String,Object> params);

	ArrayList<HitPvUv> getUvByDateRange(Map<String, Object> params);
	
	ArrayList<HitPvUv> getHitPvByMinute5(Map<String, Object> params);
	ArrayList<HitPvUv> getHitUvByMinute5(Map<String, Object> params);
	
	ArrayList<HitPvUv> getAllHitPv();
	
	ArrayList<HitPvUv> getAllHitUv();
	
	ArrayList<HitPvUv> getHitPvByDateRange(Map<String,Object> params);
	
	ArrayList<HitPvUv> getHitUvByDateRange(Map<String,Object> params);
	
	ArrayList<HitPvUv> getAllPv();
	
	ArrayList<HitPvUv> getAllUv();

	
	ArrayList<HitPvUv> getUvByHourAndDateRange(Map<String,Object> params);
	ArrayList<HitPvUv> getPvByHourAndDateRange(Map<String,Object> params);
	ArrayList<HitPvUv> getHitUvByHourAndDateRange(Map<String,Object> params);
	ArrayList<HitPvUv> getHitPvByHourAndDateRange(Map<String,Object> params);

	
	
	
	ArrayList<HitPvUv> getPvListInDateRangeByDimension (Map<String, Object> params);
	Double getPvTotalInDateRange (Map<String, Object> params);
	ArrayList<HitPvUv> getPvListForTrendData (Map<String, Object> params);
	
	ArrayList<HitPvUv> getUvListInDateRangeByDimension (Map<String, Object> params);
	Double getUvTotalInDateRange (Map<String, Object> params);
	ArrayList<HitPvUv> getUvListForTrendData (Map<String, Object> params);
	
	ArrayList<HitPvUv> getHitPvListInDateRangeByDimension (Map<String, Object> params);
	Double getHitPvTotalInDateRange (Map<String, Object> params);
	ArrayList<HitPvUv> getHitPvListForTrendData (Map<String, Object> params);
	
	ArrayList<HitPvUv> getHitUvListInDateRangeByDimension (Map<String, Object> params);
	Double getHitUvTotalInDateRange (Map<String, Object> params);
	ArrayList<HitPvUv> getHitUvListForTrendData(Map<String, Object> params);
	
	ArrayList<HitPvUv> getPvListByResult(Map<String, Object> params);
	ArrayList<HitPvUv> getUvListByResult(Map<String, Object> params);

	Double getPvTotalInDateRangeTableHit(Map<String, Object> params);

	Double getUvTotalInDateRangeTableHit(Map<String, Object> params);

	List<HitPvUv> pvListForTrendData(Map<String, Object> params);

	List<HitPvUv> uvListForTrendData(Map<String, Object> params);

	List<HitPvUv> getDisturbanceData(Map<String, Object> params);

}
