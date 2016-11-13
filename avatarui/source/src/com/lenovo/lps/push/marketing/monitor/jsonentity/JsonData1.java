package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.alimama.mdrill.utils.zip.UnsupportedZipFeatureException.Feature;
import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;

public class JsonData1 {
	
	private static Logger logger = Logger.getLogger(JsonData1.class);

	//"hod":"0","od":"3477","sd":"3039","td":"2533","tos":"3361"}
	
	public final static String OD ="od";
	public final static String SD ="sd";
	
	String hod = "0";
	String od = "0";
	String sd = "0";
	String td = "0";
	String tos = "0";
	public String getHod() {
		return hod;
	}
	public void setHod(String hod) {
		this.hod = hod;
	}
	public String getOd() {
		return od;
	}
	public void setOd(String od) {
		this.od = od;
	}
	public String getSd() {
		return sd;
	}
	public void setSd(String sd) {
		this.sd = sd;
	}
	public String getTd() {
		return td;
	}
	public void setTd(String td) {
		this.td = td;
	}
	public String getTos() {
		return tos;
	}
	public void setTos(String tos) {
		this.tos = tos;
	}
	
	public static String pvUvList2JsonString(List<JsonData1> list, List<HitPvUv> pvUvList,String fieldFlag,boolean toStringFlag) throws JsonGenerationException, JsonMappingException, IOException{
		String result = null;
		if (list==null) {
			throw new RuntimeException("result list need to be initialized first");
		}
		if (list.size()==0) {
			int n = 24;
			for (int i=0;i<n;i++){
				JsonData1 jd = new JsonData1();
				jd.hod = Integer.toString(i);
				list.add(jd);
			}
		}
		
		
		if (pvUvList==null || pvUvList.size()>24) {
			throw new RuntimeException("pvUvList is null or its size is greater than 24");
		}
		
		if (pvUvList.size() < 24) {
			logger.warn("pvUvList's size is less than 24");
			ArrayList<HitPvUv> pvUvList1 = new ArrayList<HitPvUv>();
			for (int i = 0; i < 24; i++) {
				HitPvUv v = new HitPvUv();
				v.setHour(new Integer(i).toString());
				v.setSum("0");
				pvUvList1.add(v);
			}
			if (pvUvList.size() > 0) {
				for (HitPvUv v : pvUvList) {
					int hour = Integer.parseInt(v.getHour());
					pvUvList1.get(hour).setSum(v.getSum());
				}
			}
			pvUvList = pvUvList1;
		}
		
		int n = 24;
		for (int i=0;i<n;i++) {
			HitPvUv v = pvUvList.get(i);
			if (v != null) {
				JsonData1 jd = list.get(i);
				if (OD.equals(fieldFlag)) {
					jd.od = v.getSum();
				} else if (SD.equals(fieldFlag)) {
					jd.sd = v.getSum();
//				} else if ("td".equals(fieldFlag)) {
//					jd.td = v.getSum();
//				} else if ("tos".equals(fieldFlag)) {
//					jd.tos = v.getSum();
				} else {
					throw new IllegalArgumentException("not supported fieldFlag: " + fieldFlag);
				}
			}
		}
		if (toStringFlag) {
			result = JsonUtil.entity2JsonString(list);	
		}
		return result;
	}
	
	public static String feedbackList2JsonString (List<JsonData1> list, List<Feedback> fbList, String asColumnName, String fieldFlag, boolean toStringFlag) throws JsonGenerationException, JsonMappingException, IOException {
		String result = null;
		if (list==null) {
			throw new RuntimeException("result list need to be initialized first");
		}
		if (list.size()==0) {
			int n = 24;
			for (int i=0;i<n;i++){
				JsonData1 jd = new JsonData1();
				jd.hod = Integer.toString(i);
				list.add(jd);
			}
		}
		
		
		if (fbList==null || fbList.size()>24) {
			throw new RuntimeException("pvUvList is null or its size is greater than 24");
		}
		
		if (fbList.size() < 24) {
			logger.warn("pvUvList's size is less than 24");
			ArrayList<Feedback> fbList1 = new ArrayList<Feedback>();
			for (int i = 0; i < 24; i++) {
				Feedback fb = new Feedback();
				fb.setHour(new Integer(i).toString());
				Feedback.setNormValue(fb, asColumnName, 0.0);				
				fbList1.add(fb);
			}
			if (fbList.size() > 0) {
				for (Feedback fb : fbList) {
					int hour = Integer.parseInt(fb.getHour());
					Feedback.setNormValue(fbList1.get(hour), asColumnName, Feedback.getNormValue(fb, asColumnName));			
				}
			}
			fbList = fbList1;
		}
		
		int n = 24;
		for (int i=0;i<n;i++) {
			Feedback fb = fbList.get(i);
			if (fb != null) {
				JsonData1 jd = list.get(i);
				if (OD.equals(fieldFlag)) {
					jd.od = String.valueOf(Feedback.getNormValue(fb, asColumnName));
				} else if (SD.equals(fieldFlag)) {
					jd.sd = String.valueOf(Feedback.getNormValue(fb, asColumnName));
//				} else if ("td".equals(fieldFlag)) {
//					jd.td = v.getSum();
//				} else if ("tos".equals(fieldFlag)) {
//					jd.tos = v.getSum();
				} else {
					throw new IllegalArgumentException("not supported fieldFlag: " + fieldFlag);
				}
			}
		}
		if (toStringFlag) {
			result = JsonUtil.entity2JsonString(list);	
		}
		return result;
	}
}
