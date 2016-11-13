package com.lenovo.lps.push.marketing.monitor.engine;

import org.codehaus.jackson.map.annotate.JsonSerialize;



/**
 * @author liuhk2
 */
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class FeedbackResult {

	//private static Logger logger = Logger.getLogger(FeedbackResult.class);

	String date;
	String adId;

	double arrived = 0;
	double displayed = 0;
	double sysmsgclicked = 0;
	double s2nddisplayed = 0;
	double s2ndclicked = 0;
	double downloaded = 0;
	double installed = 0;
	double activated = 0;
	
	double distCount = 0;
	
	public double getDistCount() {
		return distCount;
	}

	public void setDistCount(double distCount) {
		this.distCount = distCount;
	}

	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAdId() {
		return adId;
	}

	public void setAdId(String adId) {
		this.adId = adId;
	}

	public double getArrived() {
		return arrived;
	}

	public void setArrived(double arrived) {
		this.arrived = arrived;
	}

	public double getDisplayed() {
		return displayed;
	}

	public void setDisplayed(double displayed) {
		this.displayed = displayed;
	}

	public double getSysmsgclicked() {
		return sysmsgclicked;
	}

	public void setSysmsgclicked(double sysmsgclicked) {
		this.sysmsgclicked = sysmsgclicked;
	}

	public double getS2nddisplayed() {
		return s2nddisplayed;
	}

	public void setS2nddisplayed(double s2nddisplayed) {
		this.s2nddisplayed = s2nddisplayed;
	}

	public double getS2ndclicked() {
		return s2ndclicked;
	}

	public void setS2ndclicked(double s2ndclicked) {
		this.s2ndclicked = s2ndclicked;
	}

	public double getDownloaded() {
		return downloaded;
	}

	public void setDownloaded(double downloaded) {
		this.downloaded = downloaded;
	}

	public double getInstalled() {
		return installed;
	}

	public void setInstalled(double installed) {
		this.installed = installed;
	}

	public double getActivated() {
		return activated;
	}

	public void setActivated(double activated) {
		this.activated = activated;
	}
	
	
}
