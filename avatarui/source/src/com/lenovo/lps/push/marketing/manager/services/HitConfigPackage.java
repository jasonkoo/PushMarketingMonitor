package com.lenovo.lps.push.marketing.manager.services;

import java.util.HashSet;
import java.util.Set;

import com.lenovo.lps.push.marketing.manager.HitConfig;

public class HitConfigPackage {
	
	
	public HitConfig pack(String minHitIntervalString, String[] pushHours, String[] testDevices, String userMaxAdsPerDay ){
		HitConfig hitConfig = new HitConfig();
		hitConfig.setMinHitInterval(Long.parseLong(minHitIntervalString));
		
		if (pushHours != null && pushHours.length > 0) {
			int[] pushHoursInts = new int[pushHours.length];
			for(int i = 0; i < pushHours.length; i++){
				pushHoursInts[i] = Integer.parseInt(pushHours[i]);
			}
			hitConfig.setPushHours(pushHoursInts);
		} else {
			hitConfig.setPushHours(null);
		}
		
		if (testDevices != null) {
			Set<Long> testDevicesSet = new HashSet<Long>();
			for(String testDevice : testDevices){
				testDevicesSet.add(Long.parseLong(testDevice));
			}
			hitConfig.setTestDevices(testDevicesSet);
		} else {
			hitConfig.setTestDevices(null);
		}		
		
		hitConfig.setUserMaxAdsPerDay(Integer.parseInt(userMaxAdsPerDay));
		
		return hitConfig;		
	}
}
