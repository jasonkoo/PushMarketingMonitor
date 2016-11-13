package com.lenovo.lps.push.marketing.manager;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.lenovo.lps.push.marketing.common.util.TimeUtils;

/**
 * Hit模块配置信息
 * @author chenzhao1
 *
 */
public class HitConfig implements Serializable{
	private static final long serialVersionUID = 1899881576600255807L;
	
	private String confId = UUID.randomUUID().toString();
	private long minHitInterval = 3600000;
	private int[] pushHours = new int[0];
	private Set<Long> testDevices= new HashSet<Long>();
	private int userMaxAdsPerDay = 1;
	
	private transient int lastCheckHour = -1;
	private transient boolean isPushhour = true;
	
	public boolean isPushTime(){
		if(lastCheckHour!=TimeUtils.getCurrenthour()){
			if(Arrays.binarySearch(pushHours, TimeUtils.getCurrenthour())<0){
				isPushhour = false;
			}else{
				isPushhour = true;
			}
		}
		return isPushhour;
	}
	
	public boolean isTestDevice(long pid){
		if(testDevices!=null){
			return testDevices.contains(pid);
		}
		return false;
	}
	
	public String getConfId() {
		return confId;
	}
	public void setConfId(String confId) {
		this.confId = confId;
	}
	public long getMinHitInterval() {
		return minHitInterval;
	}
	public void setMinHitInterval(long minHitInterval) {
		this.minHitInterval = minHitInterval;
	}
	public int[] getPushHours() {
		return pushHours;
	}
	public void setPushHours(int[] pushHours) {
		this.pushHours = pushHours;
	}
	public int getUserMaxAdsPerDay() {
		return userMaxAdsPerDay;
	}
	public void setUserMaxAdsPerDay(int userMaxAdsPerDay) {
		this.userMaxAdsPerDay = userMaxAdsPerDay;
	}
	public Set<Long> getTestDevices() {
		return testDevices;
	}
	public void setTestDevices(Set<Long> testDevices) {
		this.testDevices = testDevices;
	}	

	public String toStringForTest() {
		StringBuilder sb = new StringBuilder();
		sb.append("minHitInterval: " + minHitInterval);
		sb.append(";");
		sb.append("pushHours:");
		for(int pushHour : pushHours){
			sb.append(pushHour + ",");			
		}
		
		sb.append(";testDevices:");
		for(long testDevice: testDevices){
			sb.append(testDevice + ",");
		}
		
		sb.append(";userMaxAdsPerDay:" + userMaxAdsPerDay);
		sb.append(";confId: " + confId);
		
		return sb.toString();
	}
	
	public static void main(String[] args) {
		HitConfig hc = new HitConfig();
		System.out.println(hc.toStringForTest());
	}

}
