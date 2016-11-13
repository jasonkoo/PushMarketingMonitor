package com.lenovo.lps.push.marketing.monitor.util;

public class MyUtil {

	public static String getHitRate(String hitV,String v) {
		return NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitV) / Double.parseDouble(v));
	}
}
