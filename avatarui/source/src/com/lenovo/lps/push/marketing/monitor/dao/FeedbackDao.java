package com.lenovo.lps.push.marketing.monitor.dao;

import java.util.ArrayList;
import java.util.List;

import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.mapper.FeedbackMapper;

public interface FeedbackDao extends BaseDao<Feedback, FeedbackMapper> {

	ArrayList<Feedback> feedbackList();

	ArrayList<Feedback> feedbackListByCityName(String columnName,
			String startDate, String endDate, int limit, int offset,
			String sortRule, String sortOrderBy);

	ArrayList<Feedback> feedbackListByMultiDimension(Page<Feedback> p,String groupByColumnName,String columnName,String asColumnName,String startDate,String endDate,Long limit,Long offset,String likeValue);

	String feedbackRedAll(String columnName,String startDate,String endDate);

	List<Feedback> feedbackListForTrendData(String groupByColumnName,
			String columnName, String asColumnName, String startDate,
			String endDate, Long offset,String cityName);
	
	ArrayList<Feedback> getDateColumnListInDateRange(String columnName, String asColumnName, String startDate, String endDate, String pid, String adid);
	ArrayList<Feedback> getHourColumnListInDateRange(String columnName, String asColumnName, String startDate, String endDate, String pid, String adid);
	ArrayList<Feedback> getFeedbackListInDateRange(String startDate, String endDate, String pid, String adid, String sortOrderBy, String sortRule, int limit, int offset);

	List<Feedback> getFeedbackErrorPvListByResult(Page<Feedback> p,	String startDate, String endDate, Long offset, Long rows,String type);
	double getFeedbackErrorPvTotalInDateRange(String startDate, String endDate,String type);
	List<Feedback> feedbackErrorPvListForTrendData(String startDate,String endDate, Long rows, String result,String type);

	List<Feedback> getFeedbackErrorUvListByResult(Page<Feedback> p,	String startDate, String endDate, Long offset, Long rows,String type);
	double getFeedbackErrorUvTotalInDateRange(String startDate, String endDate,String type);
	List<Feedback> feedbackErrorUvListForTrendData(String startDate,String endDate, Long rows, String result,String type);

	List<Feedback> getFeedbackListInDateRangeExclude3Cols(String startDate, String endDate, String pid, String adid, String sortOrderBy, String sortRule, int limit, int offset);

	List<Feedback> getFeedbackListInDateGroupByDeviceId(String startDate,String endDate, String pid, String adid, String col, int offset, int rows);

}
