package com.lenovo.lps.push.marketing.monitor.entity;

import java.util.Date;

/**
 * @author liuhk2
 */
public class Hit {
	private String thedate;
	private String hour;
	private String minute5;
	private String adId;
	private String result;
	private Date hitTime;
	public String getThedate() {
		return thedate;
	}
	public void setThedate(String thedate) {
		this.thedate = thedate;
	}
	public String getHour() {
		return hour;
	}
	public void setHour(String hour) {
		this.hour = hour;
	}
	public String getMinute5() {
		return minute5;
	}
	public void setMinute5(String minute5) {
		this.minute5 = minute5;
	}
	public String getAdId() {
		return adId;
	}
	public void setAdId(String adId) {
		this.adId = adId;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Date getHitTime() {
		return hitTime;
	}
	public void setHitTime(Date hitTime) {
		this.hitTime = hitTime;
	}
	
	
}
