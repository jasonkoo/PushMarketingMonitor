package com.lenovo.lps.push.marketing.monitor.task;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component 
public class CacheDataTask {
	
	private static Logger logger = Logger.getLogger(CacheDataTask.class);

	@PostConstruct
	public void start(){
		logger.debug("start");
		// TODO 获取缓存数据
	}
}
