package com.lenovo.lps.push.marketing.monitor.engine;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.lenovo.lps.push.marketing.drill.common.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.dao.FeedbackDao;
import com.lenovo.lps.push.marketing.monitor.entity.Feedback;

public class MdrillEngine {
	
	public final static String COL_0_NAME = "col_0";
	public final static String COL_1_NAME = "col_1";
	public final static String COL_2_NAME = "col_2";
	public final static String COL_3_NAME = "col_3";
	public final static String COL_4_NAME = "col_4";
	public final static String COL_5_NAME = "col_5";
	public final static String COL_6_NAME = "col_6";
	public final static String COL_7_NAME = "col_7";
	
	@SuppressWarnings("serial")
	public final static List<String> COL_LIST = new ArrayList<String>() {
		{
			add(COL_0_NAME);
			add(COL_1_NAME);
			add(COL_2_NAME);
			add(COL_3_NAME);
			add(COL_4_NAME);
			add(COL_5_NAME);
			add(COL_6_NAME);
			add(COL_7_NAME);
		}
	};

	public synchronized static FeedbackResult getFb(FeedbackDao fbDao,
			String date, String adId) {
		Date d = null;
		if (StringUtils.isEmpty(date)) {
			throw new IllegalArgumentException("empty date: " + date);
		}
		try {
			d = DateUtil.stringToDate(date, DateUtil.DATE_PATTERN);
		} catch (Exception e) {
			throw new IllegalArgumentException("invalid date: " + date);
		}
		if (StringUtils.isEmpty(adId)) {
			throw new IllegalArgumentException("empty adId: " + adId);
		}
		return getFb(fbDao, d, adId);
	}

	private static FeedbackResult getFb(FeedbackDao fbDao, Date date,
			String adId) {
		FeedbackResult result = new FeedbackResult();

		String d = DateUtil.dateToString(date, DateUtil.DATE_PATTERN);
		result.setDate(d);
		result.setAdId(adId);
		List<Feedback> fbList = fbDao.getFeedbackListInDateRangeExclude3Cols(d, d, null,
				adId, "thedate", "asc", 0, 1);
		if (fbList == null || fbList.isEmpty()) {
			throw new RuntimeException("no data from mdrill");
		}

		Feedback fb = fbList.get(0);
		result.setS2nddisplayed(fb.getS2nddisplayed());
		result.setS2ndclicked(fb.getS2ndclicked());
		result.setDownloaded(fb.getDownloaded());
		result.setInstalled(fb.getInstalled());
		result.setActivated(fb.getActivated());
		return result;
	}

	public synchronized static FeedbackResult getDist(FeedbackDao fbDao,
			String date, String adId, String col) {
		Date d = null;
		if (StringUtils.isEmpty(date)) {
			throw new IllegalArgumentException("empty date: " + date);
		}
		try {
			d = DateUtil.stringToDate(date, DateUtil.DATE_PATTERN);
		} catch (Exception e) {
			throw new IllegalArgumentException("invalid date: " + date);
		}
		if (StringUtils.isEmpty(adId)) {
			throw new IllegalArgumentException("empty adId: " + adId);
		}
		if (StringUtils.isEmpty(adId) || ! COL_LIST.contains(col)) {
			throw new IllegalArgumentException("invalid col: " + col);
		}
		return getDist(fbDao, d, adId, col);
	}
	
	private static FeedbackResult getDist(FeedbackDao fbDao, Date date,
			String adId, String col) {
		FeedbackResult result = new FeedbackResult();

		String d = DateUtil.dateToString(date, DateUtil.DATE_PATTERN);
		result.setDate(d);
		result.setAdId(adId);
		List<Feedback> fbList = fbDao.getFeedbackListInDateGroupByDeviceId(d, d, null,
				adId, col, 0, 1);
		if (fbList == null || fbList.isEmpty()) {
			throw new RuntimeException("no data from mdrill");
		}

		Feedback fb = fbList.get(0);
		result.setDistCount(fb.getSum());
		return result;
	}

}
