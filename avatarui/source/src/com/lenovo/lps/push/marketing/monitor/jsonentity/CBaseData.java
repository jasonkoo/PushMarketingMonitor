package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.lenovo.lps.push.marketing.monitor.util.DateUtil;


public class CBaseData {

	String pv = "0";
	String uv = "0";
	String hitPv = "0";
	String hitUv = "0";
	String hitPvRate = "0.0";
	String hitUvRate = "0.0";
	
	String date;
	
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getPv() {
		return pv;
	}
	public void setPv(String pv) {
		this.pv = pv;
	}
	public String getUv() {
		return uv;
	}
	public void setUv(String uv) {
		this.uv = uv;
	}
	public String getHitPv() {
		return hitPv;
	}
	public void setHitPv(String hitPv) {
		this.hitPv = hitPv;
	}
	public String getHitUv() {
		return hitUv;
	}
	public void setHitUv(String hitUv) {
		this.hitUv = hitUv;
	}
	public String getHitPvRate() {
		return hitPvRate;
	}
	public void setHitPvRate(String hitPvRate) {
		this.hitPvRate = hitPvRate;
	}
	public String getHitUvRate() {
		return hitUvRate;
	}
	public void setHitUvRate(String hitUvRate) {
		this.hitUvRate = hitUvRate;
	}
	
	
	public static String list2JsonData(Map<String, ArrayList<CBaseData>> map1,Map<String, ArrayList<CBaseData>> map2,List<String> norms,boolean cFlag) throws ParseException{
		StringBuilder sb = new StringBuilder();
		sb.append("[");
		String str = getDateStr(map1);
		sb.append("\"" + str + "\",");
		if (map1 != null && norms!=null) {
			for (String norm : norms) {
			//for (String norm : map1.keySet()) {
				ArrayList<CBaseData> cBDList = map1.get(norm);
				str = getNormStr(norm,cBDList);
				sb.append("\"" + str + "\",");
			}
		}
		
		
		if (cFlag){
			str = getDateStr(map2);
			sb.append("\"" + str + "\",");
			if (map2 != null && norms!=null) {
				for (String norm : norms) {
				//for (String norm : map2.keySet()) {
					ArrayList<CBaseData> cBDList = map2.get(norm);
					str = getNormStr(norm,cBDList);
					sb.append("\"" + str + "\",");
				}
			}
		}
		
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		return sb.toString();
	}
	
	private static String getNormStr(String norm, ArrayList<CBaseData> cBDList) {
		
		StringBuilder sb = new StringBuilder();
		if (cBDList != null && cBDList.size()>0) {
			for (CBaseData cBD : cBDList) {
				if (cBD != null) {
					if ("pv".equals(norm)) {
						sb.append(cBD.getPv() + ",");
					} else if ("uv".equals(norm)) {
						sb.append(cBD.getUv() + ",");
					} else if ("hit_pv".equals(norm)) {
						sb.append(cBD.getHitPv() + ",");
					} else if ("hit_uv".equals(norm)) {
						sb.append(cBD.getHitUv() + ",");
					} else if ("hit_pv_rate".equals(norm)) {
						sb.append(cBD.getHitPvRate() + ",");
					} else if ("hit_uv_rate".equals(norm)) {
						sb.append(cBD.getHitPvRate() + ",");
					} 
				}
			}
			sb.deleteCharAt(sb.length() - 1);
		}
		return sb.toString();
			
	}
	
	private static String getDateStr(Map<String, ArrayList<CBaseData>> map) throws ParseException {
		if (map!=null) {
			for (String norm : map.keySet()) {
				ArrayList<CBaseData> cBDList = map.get(norm);
				if (cBDList!=null && cBDList.size()>0) {
					StringBuilder sb = new StringBuilder();
					for (CBaseData cBD : cBDList){
						sb.append(DateUtil.mdrillDate2AvatarDate(cBD.getDate()) + ",");
					}
					sb.deleteCharAt(sb.length() - 1);
					return sb.toString();
				}
			}
		}
		return null;
	}
}
