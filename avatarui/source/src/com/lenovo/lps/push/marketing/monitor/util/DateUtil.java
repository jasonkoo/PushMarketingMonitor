package com.lenovo.lps.push.marketing.monitor.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateUtil {

	public static String getYesterday() {
		return getNBeforeDate(1);
	}
	
	public static String getNBeforeDate(int n) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, (0-n));
		// System.out.println("Yesterday's date = "+ cal.getTime());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		return dateFormat.format(cal.getTime());
	}
	
	public static String getNAfterDate(String startDateStr, int n) throws ParseException {
		Date startDate = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(startDateStr, "yyyyMMdd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(startDate);
		cal.add(Calendar.DATE, n);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		return dateFormat.format(cal.getTime());
	}
	
	public static String getToday() {
		Calendar cal = Calendar.getInstance();
		//cal.add(Calendar.DATE, -1);
		// System.out.println("Yesterday's date = "+ cal.getTime());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		return dateFormat.format(cal.getTime());
	}
	
	public static String getRealtimeHm(String yesterday, String minute5) throws ParseException {
		String datestr = yesterday + " " + minute5;
		String pattern = "yyyyMMdd HHmm";
		return Long.toString(DateString2long(datestr,pattern));
	}
	
	public static long DateString2long(String dateStr, String pattern) throws ParseException{
		Date date = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(dateStr, pattern);
		return date.getTime();
	}
	
	public static String date2String(Date date, String pattern) {
        SimpleDateFormat dateformat = new SimpleDateFormat(pattern);
        return dateformat.format(date);
	}
	
	public static String avatarDate2MdrillDate(String dateStr) throws ParseException{
		//startDate=2014-04-28
		//endDate=2014-05-04
		String str = null;
		if (dateStr.startsWith("startDate=")) {
			str = dateStr.substring(10);
		}
		if (dateStr.startsWith("endDate=")) {
			str = dateStr.substring(8);
		}
		Date date = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(str, "yyyy-MM-dd");
		return com.lenovo.lps.push.marketing.drill.common.util.DateUtil.dateToString(date, "yyyyMMdd");
	}
	
	public static String avatarDate2MdrillDate(String dateStr,String prefix) throws ParseException{
		String str = null;
		if (dateStr.startsWith(prefix)) {
			str = dateStr.substring(prefix.length());
		}
		Date date = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(str, "yyyy-MM-dd");
		return com.lenovo.lps.push.marketing.drill.common.util.DateUtil.dateToString(date, "yyyyMMdd");
	}
	
	public static String mdrillDate2AvatarDate(String dateStr) throws ParseException{
		Date date = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(dateStr, "yyyyMMdd");
		return com.lenovo.lps.push.marketing.drill.common.util.DateUtil.dateToString(date, "yyyy-MM-dd");
	}
	
	public static long dateDiffInDays(Date startDate,Date endDate){

		long duration =  endDate.getTime() - startDate.getTime();
		return TimeUnit.MILLISECONDS.toDays(duration);
		//long diffSeconds = TimeUnit.MILLISECONDS.toSeconds(duration);
		//long diffMinutes = TimeUnit.MILLISECONDS.toMinutes(duration);
		//long diffHours = TimeUnit.MILLISECONDS.toHours(duration);
	}
	
	public static long mdrillDateDiffInDays(String startDateStr,String endDateStr) throws ParseException{
		Date startDate = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(startDateStr, "yyyyMMdd");
		Date endDate = com.lenovo.lps.push.marketing.drill.common.util.DateUtil.stringToDate(endDateStr, "yyyyMMdd");
		return dateDiffInDays(startDate,endDate);
	}
	
}
