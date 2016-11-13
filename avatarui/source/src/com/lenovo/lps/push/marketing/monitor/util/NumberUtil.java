package com.lenovo.lps.push.marketing.monitor.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class NumberUtil {
	
	public static long double2Long(double d){
		return new Double(d).longValue();
	}

	public static String doubleStr2LongString(String doubleStr){
		return new Long(new Double(Double.parseDouble(doubleStr)).longValue()).toString();
	}
	
	public static long doubleStr2Long(String doubleStr){
		return new Double(Double.parseDouble(doubleStr)).longValue();
	}
	
//	public static String double2Percent(double d) {
//		NumberFormat defaultFormat = NumberFormat.getPercentInstance();
//		defaultFormat.setMinimumFractionDigits(2);
//		return defaultFormat.format(d);
//	}
//	
//	public static String double2PercentWithoutPercentSign(double d) {
//		String s = double2Percent(d);
//		return s.substring(0, s.length()-1);
//	}
	
	public static String double2Percent(double d) {
		return double2PercentWithoutPercentSign(d) + "%";
	}

	public static String double2PercentWithoutPercentSign(double d) {
		return new Double(round(d * 100, 2)).toString();
	}
	
	public static String removeDot0InDoubleString(String doubleStr){
		if (doubleStr!=null && doubleStr.endsWith(".0")) {
			return doubleStr.substring(0,doubleStr.length()-2);
		}
		return doubleStr;
	}
	
	public static double round(double value, int places) {
	    if (places < 0) throw new IllegalArgumentException("places is smaller than 0");
	    BigDecimal bd = new BigDecimal(value);
	    bd = bd.setScale(places, RoundingMode.HALF_UP);
	    return bd.doubleValue();
	}
}
