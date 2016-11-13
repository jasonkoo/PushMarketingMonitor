package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;

public class DateAttributeData {

	String date;
	String attribute;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	
	public static String pvUvList2JsonString(List<HitPvUv> pvUvList) throws JsonGenerationException, JsonMappingException, IOException{
		String result = null;
		if (pvUvList!=null){
			List<DateAttributeData> list = new ArrayList<DateAttributeData>();
			for (HitPvUv v : pvUvList){
				if (v!=null){
					DateAttributeData d = new DateAttributeData();
					d.setDate(v.getThedate());
					d.setAttribute(v.getSum());
					list.add(d);
				}
			}
			result = JsonUtil.entity2JsonString(list);
		}
		return result;
	}
	
	public static String feedbackList2JsonString (List<Feedback> fbList, String asColumnName) throws JsonGenerationException, JsonMappingException, IOException {
		String result = null;
		if (fbList != null ) {
			List<DateAttributeData> list = new ArrayList<DateAttributeData>();
			for (Feedback fb : fbList) {
				if (fb != null) {
					DateAttributeData d = new DateAttributeData();
					d.setDate(fb.getDate());
					d.setAttribute(String.valueOf(Feedback.getNormValue(fb, asColumnName)));
					list.add(d);
				}
			}
			result = JsonUtil.entity2JsonString(list);
		}
		return result;
	}

	public String toJsonString() throws JsonGenerationException,
			JsonMappingException, IOException {
		return JsonUtil.entity2JsonString(this);
	}
	
	public static void main(String[] args){
		
		try {
			DateAttributeData d = new DateAttributeData();
			d.setAttribute("a");
			d.setDate("d");
			System.out.println("j: " + d.toJsonString());
			
			DateAttributeData d1 = new DateAttributeData();
			d1.setAttribute("a1");
			d1.setDate("d1");
			
			List<DateAttributeData> list = new ArrayList<DateAttributeData>();
			list.add(d);
			list.add(d1);
			System.out.println("j: " + JsonUtil.entity2JsonString(list));
			//System.out.println("j: " + JsonUtil.list2JsonString(list));
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
