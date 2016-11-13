package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;


public class JsonData7 {
	
	
	// {"today":{"pv":"0","uv":"0","hit_pv":"0","hit_uv":"0"},"twoDays":[{"real_pv":"0","real_uv":"0","real_hit_pv":"0","real_hit_uv":"0","real_hit_pv_rate":"0.0","real_hit_uv_rate":"0.0"},{"real_pv":"0","real_uv":"0","real_hit_pv":"0","real_hit_uv":"0","real_hit_pv_rate":"0.0","real_hit_uv_rate":"0.0"}],"accum":[{"accum_pv":"0","accum_uv":"0","accum_hit_pv":"0","accum_hit_uv":"0"}]}
	
	private PvUv today;
	private List<RealPvUv> twoDays;
	private List<RealPvUv> accum;
	
	public class PvUv {
		String pv;
		String uv;
		String hit_pv;
		String hit_uv;
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
		public String getHit_pv() {
			return hit_pv;
		}
		public void setHit_pv(String hit_pv) {
			this.hit_pv = hit_pv;
		}
		public String getHit_uv() {
			return hit_uv;
		}
		public void setHit_uv(String hit_uv) {
			this.hit_uv = hit_uv;
		}
		
	}
	
	public class RealPvUv {
		String real_pv;
		String real_uv;
		String real_hit_pv;
		String real_hit_uv;
		String real_hit_pv_rate;
		String real_hit_uv_rate;
		public String getReal_pv() {
			return real_pv;
		}
		public void setReal_pv(String real_pv) {
			this.real_pv = real_pv;
		}
		public String getReal_uv() {
			return real_uv;
		}
		public void setReal_uv(String real_uv) {
			this.real_uv = real_uv;
		}
		public String getReal_hit_pv() {
			return real_hit_pv;
		}
		public void setReal_hit_pv(String real_hit_pv) {
			this.real_hit_pv = real_hit_pv;
		}
		public String getReal_hit_uv() {
			return real_hit_uv;
		}
		public void setReal_hit_uv(String real_hit_uv) {
			this.real_hit_uv = real_hit_uv;
		}
		public String getReal_hit_pv_rate() {
			return real_hit_pv_rate;
		}
		public void setReal_hit_pv_rate(String real_hit_pv_rate) {
			this.real_hit_pv_rate = real_hit_pv_rate;
		}
		public String getReal_hit_uv_rate() {
			return real_hit_uv_rate;
		}
		public void setReal_hit_uv_rate(String real_hit_uv_rate) {
			this.real_hit_uv_rate = real_hit_uv_rate;
		}
		
		
	}
	
	public class AccumPvUv {
		String accum_pv;
		String accum_uv;
		String accum_hit_pv;
		String accum_hit_uv;
		public String getAccum_pv() {
			return accum_pv;
		}
		public void setAccum_pv(String accum_pv) {
			this.accum_pv = accum_pv;
		}
		public String getAccum_uv() {
			return accum_uv;
		}
		public void setAccum_uv(String accum_uv) {
			this.accum_uv = accum_uv;
		}
		public String getAccum_hit_pv() {
			return accum_hit_pv;
		}
		public void setAccum_hit_pv(String accum_hit_pv) {
			this.accum_hit_pv = accum_hit_pv;
		}
		public String getAccum_hit_uv() {
			return accum_hit_uv;
		}
		public void setAccum_hit_uv(String accum_hit_uv) {
			this.accum_hit_uv = accum_hit_uv;
		}
		
		
		
	}

	public PvUv getToday() {
		return today;
	}

	public void setToday(PvUv today) {
		this.today = today;
	}

	public List<RealPvUv> getTwoDays() {
		return twoDays;
	}

	public void setTwoDays(List<RealPvUv> twoDays) {
		this.twoDays = twoDays;
	}

	public List<RealPvUv> getAccum() {
		return accum;
	}

	public void setAccum(List<RealPvUv> accum) {
		this.accum = accum;
	}
	
	public String toJsonString(List<HitPvUv> pvList, List<HitPvUv> uvList, List<HitPvUv> hitPvList, List<HitPvUv> hitUvList, String todayStr) throws JsonGenerationException, JsonMappingException, IOException {
		JsonData7 jd = new JsonData7();
		PvUv today = new PvUv();
		List<RealPvUv> twoDays = new ArrayList<RealPvUv>(2);
		List<RealPvUv> accum = new ArrayList<RealPvUv>(1);
		
		jd.setToday(today);
		jd.setTwoDays(twoDays);
		jd.setAccum(accum);
		
		// set today
		today.setPv(getV(pvList,todayStr));
		today.setUv(getV(uvList,todayStr));
		today.setHit_pv(getV(hitPvList,todayStr));
		today.setHit_uv(getV(hitUvList,todayStr));
		
		// set twoDays
		// TODO RealPvUv
		
		// set accum
		
		return JsonUtil.entity2JsonString(jd);
	}

	private String getV(List<HitPvUv> list, String todayStr) {
		if (todayStr!=null && list!=null) {
			for (HitPvUv v : list) {
				if (v!=null && todayStr.equals(v.getThedate()) && v.getSum() != null) {
					return v.getSum();
				}
			}
		}
		return "0";
	}
	
	
	
}
