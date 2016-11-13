package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.util.ArrayList;

import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.MyUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;

public class BaseData {

	// base:
	protected String accum_pv = "0";
	protected String accum_uv = "0";
	protected String accum_hit_pv = "0";
	protected String accum_hit_uv = "0";
	protected String max_n_day_pv = "0";
	protected String max_n_day_uv = "0";
	protected String max_n_day_hit_pv = "0";
	protected String max_n_day_hit_uv = "0";
	protected String max_n_day_rate_hit_pv = "0.0";
	protected String max_n_day_rate_hit_uv = "0.0";
	
	protected String yest_pv = "0";
	protected String yest_uv = "0";
	protected String yest_hit_pv = "0";
	protected String yest_hit_uv = "0";

	// realTime:
	protected String tod_pv = "0";
	protected String tod_uv = "0";
	protected String tod_hit_pv = "0";
	protected String tod_hit_uv = "0";
	protected String rate_hit_pv = "0.0"; // = tod_hit_pv/tod_pv
	protected String rate_hit_uv = "0.0";// = tod_hit_uv/tod_uv
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
	public String getMax_n_day_pv() {
		return max_n_day_pv;
	}
	public void setMax_n_day_pv(String max_n_day_pv) {
		this.max_n_day_pv = max_n_day_pv;
	}
	public String getMax_n_day_uv() {
		return max_n_day_uv;
	}
	public void setMax_n_day_uv(String max_n_day_uv) {
		this.max_n_day_uv = max_n_day_uv;
	}
	public String getMax_n_day_hit_pv() {
		return max_n_day_hit_pv;
	}
	public void setMax_n_day_hit_pv(String max_n_day_hit_pv) {
		this.max_n_day_hit_pv = max_n_day_hit_pv;
	}
	public String getMax_n_day_hit_uv() {
		return max_n_day_hit_uv;
	}
	public void setMax_n_day_hit_uv(String max_n_day_hit_uv) {
		this.max_n_day_hit_uv = max_n_day_hit_uv;
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
	public String getTod_pv() {
		return tod_pv;
	}
	public void setTod_pv(String tod_pv) {
		this.tod_pv = tod_pv;
	}
	public String getTod_uv() {
		return tod_uv;
	}
	public void setTod_uv(String tod_uv) {
		this.tod_uv = tod_uv;
	}
	public String getTod_hit_pv() {
		return tod_hit_pv;
	}
	public void setTod_hit_pv(String tod_hit_pv) {
		this.tod_hit_pv = tod_hit_pv;
	}
	public String getTod_hit_uv() {
		return tod_hit_uv;
	}
	public void setTod_hit_uv(String tod_hit_uv) {
		this.tod_hit_uv = tod_hit_uv;
	}
	public String getRate_hit_pv() {
		return rate_hit_pv;
	}
	public void setRate_hit_pv(String rate_hit_pv) {
		this.rate_hit_pv = rate_hit_pv;
	}
	public String getRate_hit_uv() {
		return rate_hit_uv;
	}
	public void setRate_hit_uv(String rate_hit_uv) {
		this.rate_hit_uv = rate_hit_uv;
	}
	
	public void setupPv(ArrayList<HitPvUv> pvUvList) {
		if (pvUvList!=null && pvUvList.size()>0) {
			HitPvUv pv = pvUvList.get(pvUvList.size()-1);
			this.tod_pv = pv.getSum();
		}
		
	}
	
	public void setupUv(ArrayList<HitPvUv> pvUvList) {
		if (pvUvList!=null && pvUvList.size()>0) {
			HitPvUv uv = pvUvList.get(pvUvList.size()-1);
			this.tod_uv = uv.getSum();
		}		
	}
	public void setupHitPv(ArrayList<HitPvUv> hitPvList, boolean rateFlag) {
		// Setup tod_hit_pv, yest_hit_pv, rate_hit_pv and max_n_day_hit_pv
		if (hitPvList != null && hitPvList.size() > 0) {
			HitPvUv hit_pv = hitPvList.get(hitPvList.size() - 1);
			this.tod_hit_pv = hit_pv.getSum(); 
			if (rateFlag) {
				this.rate_hit_pv = MyUtil.getHitRate(this.tod_hit_pv, this.tod_pv);	
			}
		
		}
		
		// Compute max_n_day_rate_hit_pv for each day
		// this.max_n_day_hit_pv = computeMaxNDayRateHitXv(hitPvList, pvList);		
	}
	
	public void setupHitUv(ArrayList<HitPvUv> hitUvList, boolean rateFlag) {
		// Setup tod_hit_uv, yest_hit_uv, rate_hit_uv and max_n_day_hit_uv
		if (hitUvList != null && hitUvList.size() > 0) {
			HitPvUv hit_uv = hitUvList.get(hitUvList.size() - 1);
			this.tod_hit_uv = hit_uv.getSum();
			if (rateFlag) {
				this.rate_hit_uv =MyUtil.getHitRate(this.tod_hit_uv,this.tod_uv);
			}
		}
		
		// Compute max_n_day_rate_hit_uv for each day
		//this.max_n_day_rate_hit_uv = computeMaxNDayRateHitXv(hitUvList, uvList);		
	}
	
	public static String computeMaxNDayRateHitXv(ArrayList<HitPvUv> hitXvList, ArrayList<HitPvUv> xVList) {
		if (hitXvList != null && hitXvList.size() > 0 && xVList != null && xVList.size() > 0) {
			if(hitXvList.size() == xVList.size()){
				int len = hitXvList.size();
				double max_n_day_rate_hit_xv = 0.0;
				double this_day_rate_hit_xv;
				HitPvUv hitXv;
				HitPvUv xV;
				for (int i = 0; i < len; i++ ) {
					hitXv = hitXvList.get(i);
					xV = xVList.get(i);
					this_day_rate_hit_xv = Double.parseDouble(hitXv.getSum()) / Double.parseDouble(xV.getSum());
					if ( this_day_rate_hit_xv > max_n_day_rate_hit_xv ) {
						max_n_day_rate_hit_xv = this_day_rate_hit_xv;
					}
				}
				return String.valueOf(NumberUtil.double2PercentWithoutPercentSign(max_n_day_rate_hit_xv));
			} else {
				System.out.println("hitXvList.size() != xVList.size()");
				return "0.00";
			}
		} else {
			System.out.println("hitXvList == null or hitXvList.size() == 0 or xVlist == null or xVList.size() = 0");
			return "0.00";
		}
	}
	
	
	public void setupAllPv(ArrayList<HitPvUv> pvUvList) {
		if (pvUvList!=null && pvUvList.size()>0) {
			 HitPvUv pv = pvUvList.get(0);
			this.accum_pv = pv.getSum();
		}
		
	}
	public void setupAllUv(ArrayList<HitPvUv> pvUvList) {
		if (pvUvList!=null && pvUvList.size()>0) {
			 HitPvUv hit_uv = pvUvList.get(0);
			this.accum_uv = hit_uv.getSum();
		}
		
	}
	public void setupAllHitPv(ArrayList<HitPvUv> pvUvList) {
		if (pvUvList != null && pvUvList.size() > 0) {
			HitPvUv hit_pv = pvUvList.get(0);
			this.accum_hit_pv = hit_pv.getSum();
		}		
	}
	public void setupAllHitlUv(ArrayList<HitPvUv> pvUvList) {
		if (pvUvList != null && pvUvList.size() > 0) {
			HitPvUv uv = pvUvList.get(0);
			this.accum_hit_uv = uv.getSum();
		}		
	}
	
//	public String toJsonString(){
//		StringBuilder sb = new StringBuilder();
//		
//		sb.append("{\"realTime\":{");
//		sb.append("\"real_pv\":\"" + tod_pv + "\",");
//		sb.append("\"real_uv\":\"" + tod_uv + "\",");
//		sb.append("\"real_hit_pv\":\"" + tod_hit_pv + "\",");
//		sb.append("\"real_hit_uv\":\"" + tod_hit_uv + "\",");
//		
//		sb.append("\"real_hit_pv_rate\":\"" + rate_hit_pv + "\",");
//		sb.append("\"real_hit_uv_rate\":\"" + rate_hit_uv + "\"");
//		
//		sb.append("},");
//		
//		sb.append("\"base\":[{");
//		sb.append("\"accum_pv\":\"" + accum_pv + "\",");
//		sb.append("\"accum_uv\":\"" + accum_uv + "\",");
//		sb.append("\"accum_hit_pv\":\"" + accum_hit_pv + "\",");
//		sb.append("\"accum_hit_uv\":\"" + accum_hit_uv + "\",");
//		
//		sb.append("\"max_pv\":\"" + max_n_day_pv + "\",");
//		sb.append("\"max_uv\":\"" + max_n_day_uv + "\",");
//		sb.append("\"max_hit_pv\":\"" + max_n_day_hit_pv + "\",");
//		sb.append("\"max_hit_uv\":\"" + max_n_day_hit_uv + "\",");
//		sb.append("\"max_hit_pv_rate\":\"" + max_n_day_rate_hit_pv + "\",");
//		sb.append("\"max_hit_uv_rate\":\"" + max_n_day_rate_hit_uv + "\",");
//		
//		sb.append("\"yest_pv\":\"" + yest_pv + "\",");
//		sb.append("\"yest_uv\":\"" + yest_uv + "\",");
//		sb.append("\"yest_hit_pv\":\"" + yest_hit_pv + "\",");
//		sb.append("\"yest_hit_uv\":\"" + yest_hit_uv + "\"");
//		
//		sb.append("}]}");
//		return sb.toString();
//	}
//	public String getMax_n_day_rate_hit_pv() {
//		return max_n_day_rate_hit_pv;
//	}
//	public void setMax_n_day_rate_hit_pv(String max_n_day_rate_hit_pv) {
//		this.max_n_day_rate_hit_pv = max_n_day_rate_hit_pv;
//	}
//	public String getMax_n_day_rate_hit_uv() {
//		return max_n_day_rate_hit_uv;
//	}
//	public void setMax_n_day_rate_hit_uv(String max_n_day_rate_hit_uv) {
//		this.max_n_day_rate_hit_uv = max_n_day_rate_hit_uv;
//	}

}
