package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;
import com.lenovo.lps.push.marketing.monitor.util.MyUtil;


public class JsonData8 {
	
	
	// {"realTime":{"real_pv":"3.4215242E7","real_uv":"1092832","real_hit_pv":"0","real_hit_uv":"0","real_hit_pv_rate":"0.0","real_hit_uv_rate":"0.0"},
	//   "base":[{"accum_pv":"0","accum_uv":"0","accum_hit_pv":"0","accum_hit_uv":"0",
	//             "max_pv":"8.4110187E7","max_uv":"3282336","max_hit_pv":"0.00","max_hit_uv":"0","max_hit_pv_rate":"0.0","max_hit_uv_rate":"0.00",
	//              "yest_pv":"8.4110187E7","yest_uv":"3282336","yest_hit_pv":"0","yest_hit_uv":"0"}]}
	
	
	private RealPvUv realTime;
	private List<BaseObject> base;
	
	
	
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
	
	public class BaseObject {
		String accum_pv;
		String accum_uv;
		String accum_hit_pv;
		String accum_hit_uv;
		
		String max_pv;
		String max_uv;
		String max_hit_pv;
		String max_hit_uv;
		String max_hit_pv_rate;
		String max_hit_uv_rate;
		
		String yest_pv;
		String yest_uv;
		String yest_hit_pv;
		String yest_hit_uv;
		
		
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
		public String getMax_pv() {
			return max_pv;
		}
		public void setMax_pv(String max_pv) {
			this.max_pv = max_pv;
		}
		public String getMax_uv() {
			return max_uv;
		}
		public void setMax_uv(String max_uv) {
			this.max_uv = max_uv;
		}
		public String getMax_hit_pv() {
			return max_hit_pv;
		}
		public void setMax_hit_pv(String max_hit_pv) {
			this.max_hit_pv = max_hit_pv;
		}
		public String getMax_hit_uv() {
			return max_hit_uv;
		}
		public void setMax_hit_uv(String max_hit_uv) {
			this.max_hit_uv = max_hit_uv;
		}
		public String getMax_hit_pv_rate() {
			return max_hit_pv_rate;
		}
		public void setMax_hit_pv_rate(String max_hit_pv_rate) {
			this.max_hit_pv_rate = max_hit_pv_rate;
		}
		public String getMax_hit_uv_rate() {
			return max_hit_uv_rate;
		}
		public void setMax_hit_uv_rate(String max_hit_uv_rate) {
			this.max_hit_uv_rate = max_hit_uv_rate;
		}
		public String getYest_pv() {
			return yest_pv;
		}
		public void setYest_pv(String yest_pv) {
			this.yest_pv = yest_pv;
		}
		public String getYest_uv() {
			return yest_uv;
		}
		public void setYest_uv(String yest_uv) {
			this.yest_uv = yest_uv;
		}
		public String getYest_hit_pv() {
			return yest_hit_pv;
		}
		public void setYest_hit_pv(String yest_hit_pv) {
			this.yest_hit_pv = yest_hit_pv;
		}
		public String getYest_hit_uv() {
			return yest_hit_uv;
		}
		public void setYest_hit_uv(String yest_hit_uv) {
			this.yest_hit_uv = yest_hit_uv;
		}
		
		
		
	}

	
	
	public static String toJsonString(List<HitPvUv> pvList, List<HitPvUv> uvList, List<HitPvUv> hitPvList, List<HitPvUv> hitUvList, String todayStr) throws JsonGenerationException, JsonMappingException, IOException, ParseException {
		JsonData8 jd = new JsonData8();
		RealPvUv realTime = jd.new RealPvUv();
		jd.setRealTime(realTime);
		List<BaseObject> base = new ArrayList<BaseObject>(1);
		jd.setBase(base);
		
		// set up real time
		String pv = getV(pvList, todayStr);
		String uv = getV(uvList, todayStr);
		String hitPv = getV(hitPvList, todayStr);
		String hitUv = getV(hitUvList, todayStr);
		String hitPvRate = MyUtil.getHitRate(hitPv, pv);
		String hitUvRate = MyUtil.getHitRate(hitUv, uv);
		realTime.setReal_pv(pv);
		realTime.setReal_uv(uv);
		realTime.setReal_hit_pv(hitPv);
		realTime.setReal_hit_uv(hitUv);
		realTime.setReal_hit_pv_rate(hitPvRate);
		realTime.setReal_hit_uv_rate(hitUvRate);
		
		BaseObject bo = jd.new BaseObject();
		String accum_pv = getAccum(pvList);
		bo.setAccum_pv(accum_pv);
		String accum_uv = getAccum(uvList);
		bo.setAccum_uv(accum_uv);
		String accum_hit_pv = getAccum(hitPvList);
		bo.setAccum_hit_pv(accum_hit_pv);
		String accum_hit_uv = getAccum(hitUvList);
		bo.setAccum_hit_uv(accum_hit_uv);
		
		String max_pv = getMax(pvList);
		bo.setMax_pv(max_pv);
		String max_uv = getMax(uvList);
		bo.setMax_uv(max_uv);
		String max_hit_pv = getMax(hitPvList);
		bo.setMax_hit_pv(max_hit_pv);
		String max_hit_uv = getMax(hitUvList);
		bo.setMax_hit_uv(max_hit_uv);
		
		String max_hit_pv_rate = getMax(pvList, hitPvList);
		bo.setMax_hit_pv_rate(max_hit_pv_rate);
		String max_hit_uv_rate = getMax(uvList, hitUvList);
		bo.setMax_hit_uv_rate(max_hit_uv_rate);
		
		String yestStr = DateUtil.getNAfterDate(todayStr, -1);
		String yest_pv = getV(pvList, yestStr);
		bo.setYest_pv(yest_pv);
		String yest_uv = getV(uvList, yestStr);
		bo.setYest_uv(yest_uv);
		String yest_hit_pv = getV(hitPvList, yestStr);
		bo.setYest_hit_pv(yest_hit_pv);
		String yest_hit_uv = getV(hitUvList, yestStr);
		bo.setYest_hit_uv(yest_hit_uv);
		
		base.add(bo);
		
		return JsonUtil.entity2JsonString(jd);
	}

	private static String getMax(List<HitPvUv> uvList, List<HitPvUv> hitUvList) {
		if (hitUvList!=null) {
			double max = 0.0;
			for (HitPvUv hitV : hitUvList) {
				if (hitV!=null) {
					String hitVSum = hitV.getSum();
					String dateStr = hitV.getThedate();
					String vSum = getV(uvList, dateStr);
					double rate = Double.parseDouble(MyUtil.getHitRate(hitVSum, vSum));
					if (max < rate) {
						max = rate;
					}
				}
			}
			return new Double(max).toString();
		}
		return "0.0";
	}

	private static String getMax(List<HitPvUv> list) {
		if (list!=null) {
			double max = 0;
			for (HitPvUv v : list) {
				if (v!=null) {
					double sum = Double.parseDouble(v.getSum());
					if (max < sum) {
						max = sum;
					}
				}
			}
			return new Double(max).toString();
		}
		return "0";
	}

	private static String getAccum(List<HitPvUv> list) {
		if (list!=null) {
			double sum = 0;
			for (HitPvUv v : list) {
				if (v!=null) {
					sum = sum + Double.parseDouble(v.getSum());
				}
			}
			return new Double(sum).toString();
		}
		return "0";
	}

	private static String getV(List<HitPvUv> list, String todayStr) {
		if (todayStr!=null && list!=null) {
			for (HitPvUv v : list) {
				if (v!=null && todayStr.equals(v.getThedate()) && v.getSum() != null) {
					return v.getSum();
				}
			}
		}
		return "0";
	}

	public RealPvUv getRealTime() {
		return realTime;
	}

	public void setRealTime(RealPvUv realTime) {
		this.realTime = realTime;
	}

	public List<BaseObject> getBase() {
		return base;
	}

	public void setBase(List<BaseObject> base) {
		this.base = base;
	}
	
	
	
}
