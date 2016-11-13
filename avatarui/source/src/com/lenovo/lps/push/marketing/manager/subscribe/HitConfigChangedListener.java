package com.lenovo.lps.push.marketing.manager.subscribe;

import com.lenovo.lps.push.zkconfigurer.ConfigChangeListener;
import com.lenovo.lps.push.zkconfigurer.Data;

public class HitConfigChangedListener implements ConfigChangeListener {

	@Override
	public void configChanged(String zkPath, Object listenerObj, String ObjName) {

			System.out.println(ObjName + " in Path " + zkPath + " has changed");
			
			Data data = (Data)listenerObj;
			System.out.println(data.getValue());
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
