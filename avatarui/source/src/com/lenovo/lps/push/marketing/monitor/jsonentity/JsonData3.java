package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;

public class JsonData3 {
	
	//private static Logger logger = Logger.getLogger(JsonData3.class);

	//{"hod":"0","st":"11859646","cst":"13215745"}
	String hod = "0";
	String st = "0";
	String cst = "0";
	public String getHod() {
		return hod;
	}
	public void setHod(String hod) {
		this.hod = hod;
	}
	public String getSt() {
		return st;
	}
	public void setSt(String st) {
		this.st = st;
	}
	public String getCst() {
		return cst;
	}
	public void setCst(String cst) {
		this.cst = cst;
	}
	public static String list2JsonString(ArrayList<HitPvUv> pvUvList,
			ArrayList<HitPvUv> pvUvList1, boolean cFlag) throws JsonGenerationException, JsonMappingException, IOException {
		List<JsonData3> list = new ArrayList<JsonData3>();
		int n = 24;
		for (int i = 0; i < n; i++) {
			JsonData3 jd = new JsonData3();
			jd.hod = Integer.toString(i);
			jd.st = getSt(pvUvList, i);
			if (cFlag) {
				jd.cst = getSt(pvUvList1, i);
			}
			list.add(jd);
		}

		return JsonUtil.entity2JsonString(list);
	}
	private static String getSt(ArrayList<HitPvUv> pvUvList, int i) {
		if (pvUvList!=null) {
			for (HitPvUv v : pvUvList) {
				if (v!=null) {
					String hour = v.getHour();
					if (hour!=null && Integer.parseInt(hour) == i) {
						return v.getSum();
					}
				}
			}
		}
		return "0";
	}
	
	
	public static String fbList2JsonString(ArrayList<Feedback> fbList,
			ArrayList<Feedback> fbList1, boolean cFlag, String asColumnName) throws JsonGenerationException, JsonMappingException, IOException {
		List<JsonData3> list = new ArrayList<JsonData3>();
		int n = 24;
		for (int i = 0; i < n; i++) {
			JsonData3 jd = new JsonData3();
			jd.hod = Integer.toString(i);
			jd.st = getSt(fbList, i, asColumnName);
			if (cFlag) {
				jd.cst = getSt(fbList1, i, asColumnName);
			}
			list.add(jd);
		}

		return JsonUtil.entity2JsonString(list);
	}
	private static String getSt(ArrayList<Feedback> fbList, int i, String asColumnName) {
		if (fbList!=null) {
			for (Feedback fb : fbList) {
				if (fb!=null) {
					String hour = fb.getHour();
					if (hour!=null && Integer.parseInt(hour) == i) {
						return String.valueOf(Feedback.getNormValue(fb, asColumnName));						
					}
				}
			}
		}
		return "0";
	}
	
	
	
	
}
