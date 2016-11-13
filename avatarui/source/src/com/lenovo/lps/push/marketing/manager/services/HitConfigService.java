package com.lenovo.lps.push.marketing.manager.services;

import org.springframework.beans.factory.InitializingBean;

import com.lenovo.lps.push.marketing.manager.HitConfig;
import com.lenovo.lps.push.zkconfigurer.DataManager;
import com.lenovo.lps.push.zkconfigurer.ZKConfigurer;

public class HitConfigService implements InitializingBean{

//  For localhost testing
//	private String zkAddress = "localhost:2181";
//	private String zkPath = "/user/jason/config/hitConfig";
	

	private String zkAddress; //= "10.100.149.232:2181";
	private String zkPath; // = "/config/pm/hitconfig";
	private DataManager dm;
	private ZKConfigurer zkc;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		dm = new DataManager(zkAddress);
		zkc = new ZKConfigurer(zkAddress);
	}
	
	public String getZkAddress() {
		return zkAddress;
	}

	public void setZkAddress(String zkAddress) {
		this.zkAddress = zkAddress;
	}

	public String getZkPath() {
		return zkPath;
	}

	public void setZkPath(String zkPath) {
		this.zkPath = zkPath;
	}	
	
	public int add(HitConfig hitConfig){
		DataManager dm = new DataManager(zkAddress);
		dm.savaValue(this.zkPath, hitConfig);
		return 0;
	}
	
	public HitConfig getValue(){		
		HitConfig hc = null;
		try {
			hc = zkc.getValue(this.zkPath, HitConfig.class);
		} catch (Exception e) {
			
		} finally {
			// If there is no configuration for HitConfig in Zookeeper, then return the default value.
			if(hc == null){
				hc = new HitConfig();
			}
		}
		
		return hc;
	}
	
	public int update(HitConfig hitConfig){
		dm.savaValue(this.zkPath, hitConfig);
		return 0;
	}
	public void deleteValue(){		
		dm.delete(this.zkPath);
	}
	
	
	public static void main(String[] args) {		
	}
}
