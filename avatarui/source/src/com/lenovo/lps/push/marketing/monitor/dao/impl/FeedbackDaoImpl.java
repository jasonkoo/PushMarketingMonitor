package com.lenovo.lps.push.marketing.monitor.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lenovo.lps.push.marketing.monitor.dao.FeedbackDao;
import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.mapper.FeedbackMapper;

/**
 * @author Rocky
 */
@Repository
public class FeedbackDaoImpl extends BaseDaoImpl<Feedback, FeedbackMapper>	implements FeedbackDao {
	public FeedbackDaoImpl() {
		setMapperClass(FeedbackMapper.class);
	}

	public ArrayList<Feedback> feedbackList() {
		return this.getMapper().feedbackList();
	}

	@Override
	public ArrayList<Feedback> feedbackListByCityName(String columnName,
			String startDate, String endDate, int limit, int offset,
			String sortRule, String sortOrderBy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<Feedback> feedbackListByMultiDimension(Page<Feedback> p,String groupByColumnName, String columnName,String asColumnName,String startDate,String endDate,Long limit,Long offset,String likeValue) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("groupByColumnName", groupByColumnName);
		params.put("columnName", columnName);
		params.put("asColumnName", asColumnName);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("page", p);
		params.put("limit", limit);
		params.put("offset", offset);
		params.put("likeValue", likeValue);
		return this.getMapper().feedbackRedListByMultiDimension(params);
	}
	
	@Override
	public String feedbackRedAll(String columnName,String startDate,String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("columnName", columnName);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		return this.getMapper().feedbackRedAll(params);
	}

	@Override
	public List<Feedback> feedbackListForTrendData(String groupByColumnName,
			String columnName, String asColumnName, String startDate,
			String endDate, Long offset, String cityName) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("groupByColumnName", groupByColumnName);
		params.put("columnName", columnName);
		params.put("asColumnName", asColumnName);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("offset", offset);
		params.put("cityName", cityName);
		return this.getMapper().feedbacRedkListForTrendData(params);
	}
	
	@Override
	public ArrayList<Feedback> getDateColumnListInDateRange(String columnName,
			String asColumnName, String startDate, String endDate, String pid,
			String adid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("columnName", columnName);
		params.put("asColumnName", asColumnName);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		return this.getMapper().getDateColumnListInDateRange(params);
	}
	
	@Override
	public ArrayList<Feedback> getHourColumnListInDateRange(String columnName,
			String asColumnName, String startDate, String endDate, String pid,
			String adid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("columnName", columnName);
		params.put("asColumnName", asColumnName);
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		return this.getMapper().getHourColumnListInDateRange(params);
	}
	
	@Override
	public ArrayList<Feedback> getFeedbackListInDateRange(
			String startDate, String endDate, String pid, String adid,
			String sortOrderBy, String sortRule, int limit, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();		
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("sortOrderBy", sortOrderBy);
		params.put("sortRule", sortRule);
		params.put("limit", limit);
		params.put("offset", offset);
		return this.getMapper().getFeedbackListInDateRange(params);
	}

	@Override
	public List<Feedback> getFeedbackErrorPvListByResult(Page<Feedback> p,
			String startDate, String endDate, Long offset, Long rows,
			String type) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("page", p);
		params.put("offset", offset);
		params.put("rows", rows);
		params.put("type", type);
		return this.getMapper().getFeedbackErrorPvListByResult(params);
	}

	@Override
	public double getFeedbackErrorPvTotalInDateRange(String startDate,
			String endDate, String type) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("type", type);
		return this.getMapper().getFeedbackErrorPvTotalInDateRange(params);
	}

	@Override
	public List<Feedback> feedbackErrorPvListForTrendData(String startDate,
			String endDate, Long rows, String result, String type) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("type", type);
		params.put("rows", rows);
		params.put("result", result);
		return this.getMapper().feedbackErrorPvListForTrendData(params);
	}
	
	@Override
	public List<Feedback> getFeedbackErrorUvListByResult(Page<Feedback> p,
			String startDate, String endDate, Long offset, Long rows,
			String type) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("page", p);
		params.put("offset", offset);
		params.put("rows", rows);
		params.put("type", type);
		return this.getMapper().getFeedbackErrorPvListByResult(params);
	}

	@Override
	public double getFeedbackErrorUvTotalInDateRange(String startDate,
			String endDate, String type) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("type", type);
		return this.getMapper().getFeedbackErrorPvTotalInDateRange(params);
	}

	@Override
	public List<Feedback> feedbackErrorUvListForTrendData(String startDate,
			String endDate, Long rows, String result, String type) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("type", type);
		params.put("rows", rows);
		params.put("result", result);
		return this.getMapper().feedbackErrorPvListForTrendData(params);
	}
	
	@Override
	public ArrayList<Feedback> getFeedbackListInDateRangeExclude3Cols(
			String startDate, String endDate, String pid, String adid,
			String sortOrderBy, String sortRule, int limit, int offset) {
		Map<String, Object> params = new HashMap<String, Object>();		
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("sortOrderBy", sortOrderBy);
		params.put("sortRule", sortRule);
		params.put("limit", limit);
		params.put("offset", offset);
		return this.getMapper().getFeedbackListInDateRangeExclude3Cols(params);
	}
	
	@Override
	public List<Feedback> getFeedbackListInDateGroupByDeviceId(String startDate, String endDate, String pid, String adid,String col, int offset,int rows){
		Map<String, Object> params = new HashMap<String, Object>();		
		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("pid", pid);
		params.put("adid", adid);
		params.put("offset", offset);
		params.put("rows", rows);
		params.put("col", col);
		return this.getMapper().getFeedbackListInDateGroupByDeviceId(params);
	}

	

}
