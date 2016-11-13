package com.lenovo.lps.push.marketing.monitor.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.lenovo.lps.push.marketing.monitor.entity.Feedback;

/**
 * @author Rocky
 */
public interface FeedbackMapper extends BaseMapper<Feedback> {

	ArrayList<Feedback> feedbackList(
	);
	
	
	public ArrayList<Feedback> feedbackListByCityName(String columnName,
			String startDate, String endDate, int limit, int offset,
			String sortRule, String sortOrderBy);
	
	//public ArrayList<Feedback> feedbackListByCityName(Page<Feedback> p);
	public ArrayList<Feedback> feedbackRedListByMultiDimension(Map<String,Object> params);
	
	public String feedbackRedAll(Map<String,Object> params);
	
	public ArrayList<Feedback> feedbacRedkListForTrendData(Map<String,Object> params);
	
	
	
	public ArrayList<Feedback> getDateColumnListInDateRange(Map<String, Object> params);
	public ArrayList<Feedback> getHourColumnListInDateRange(Map<String, Object> params);
	public ArrayList<Feedback> getFeedbackListInDateRange(Map<String, Object> params);


	public List<Feedback> getFeedbackErrorPvListByResult(Map<String, Object> params);
	public double getFeedbackErrorPvTotalInDateRange(Map<String, Object> params);
	public List<Feedback> feedbackErrorPvListForTrendData(Map<String, Object> params);
	
	public ArrayList<Feedback> getFeedbackListInDateRangeExclude3Cols(Map<String, Object> params);


	public List<Feedback> getFeedbackListInDateGroupByDeviceId(Map<String, Object> params);
	
}
