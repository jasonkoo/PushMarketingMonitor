package com.lenovo.lps.push.marketing.manager.subscribe;

import java.io.IOException;

import com.lenovo.lps.push.zkconfigurer.ZKConfigurer;

public class Subscriber {

	private static final String zkAddress = "localhost:2181";
	private static final String zkPath = "/user/jason/config/hitConfig";
	
	public static void main(String[] args) {
		
		String ObjName = "hitConfig";
		ZKConfigurer zkc = new ZKConfigurer(zkAddress);
		ListenerObject lo = new ListenerObject();
		HitConfigChangedListener hccl = new HitConfigChangedListener();
		zkc.subscibe(zkPath, lo, ObjName, hccl);
		
//		try {
//			Thread.sleep(100000);
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
		try {
			System.in.read();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
}
