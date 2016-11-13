package com.lenovo.lps.push.marketing.monitor.jsonentity;


public class OverviewData extends BaseData {
	
	//private List<BaseData> twoDays = new ArrayList<BaseData>(2);
	protected BaseData day0 = new BaseData();
	protected BaseData day1 = new BaseData();

	/*
	{"today":{"start_time":18890,"new_user":15,"pv":18393,"app_key":"UMTAPKHRJLQB","uv":1006},
		   "twoDays":[
		   {"startTimeNum":"268268239","accumUser":"66031615","startUserNum":"21276880","newUserNum":"147302",
		    "newUserRate":"0.69%","avgUseDateLength":"169.04","activeRate":"32.22%","pv":"275978292","pcmUsers":"0"},
		   {"startTimeNum":"270416268","accumUser":"65884313","startUserNum":"22118471","newUserNum":"167379","newUserRate":"0.76%",
		    "avgUseDateLength":"168.44","activeRate":"33.57%","pv":"279949826","pcmUsers":"0"}],
		   "accum":[{"accumUserNum":"66031615","accumStartNum":"209661327770","accumPV":"215990275385","accumPCMUsers":"0"}]}
		   */
	
	public BaseData getDay0() {
		return day0;
	}

	public void setDay0(BaseData day0) {
		this.day0 = day0;
	}

	public BaseData getDay1() {
		return day1;
	}

	public void setDay1(BaseData day1) {
		this.day1 = day1;
	}

	//@Override
	public String toJsonString(){
		StringBuilder sb = new StringBuilder();
		
		sb.append("{\"today\":{");
		sb.append("\"pv\":\"" + tod_pv + "\",");
		sb.append("\"uv\":\"" + tod_uv + "\",");
		sb.append("\"hit_pv\":\"" + tod_hit_pv + "\",");
		sb.append("\"hit_uv\":\"" + tod_hit_uv + "\"");
		
		//sb.append("\"real_hit_pv_rate\":\"" + rate_hit_pv + "\",");
		//sb.append("\"real_hit_uv_rate\":\"" + rate_hit_uv + "\"");
		
		sb.append("},");
		
		sb.append("\"twoDays\":[{");
		sb.append("\"real_pv\":\"" + day0.accum_pv + "\",");
		sb.append("\"real_uv\":\"" + day0.accum_uv + "\",");
		sb.append("\"real_hit_pv\":\"" + day0.accum_hit_pv + "\",");
		sb.append("\"real_hit_uv\":\"" + day0.accum_hit_pv + "\",");
		sb.append("\"real_hit_pv_rate\":\"" + day0.rate_hit_pv + "\",");
		sb.append("\"real_hit_uv_rate\":\"" + day0.rate_hit_uv + "\"},");
		
		sb.append("{\"real_pv\":\"" + day1.accum_pv + "\",");
		sb.append("\"real_uv\":\"" + day1.accum_uv + "\",");
		sb.append("\"real_hit_pv\":\"" + day1.accum_hit_pv + "\",");
		sb.append("\"real_hit_uv\":\"" + day1.accum_hit_pv + "\",");
		sb.append("\"real_hit_pv_rate\":\"" + day1.rate_hit_pv + "\",");
		sb.append("\"real_hit_uv_rate\":\"" + day1.rate_hit_uv + "\"}],");
		
		sb.append("\"accum\":[{");
		sb.append("\"accum_pv\":\"" + accum_pv + "\",");
		sb.append("\"accum_uv\":\"" + accum_uv + "\",");
		sb.append("\"accum_hit_pv\":\"" + accum_hit_pv + "\",");
		sb.append("\"accum_hit_uv\":\"" + accum_hit_uv + "\"");
		
		sb.append("}]}");
		return sb.toString();
	}
	
	
	public String toSummaryJsonString(){
		StringBuilder sb = new StringBuilder();
		
		sb.append("{\"today\":{");
		sb.append("\"pv\":\"" + tod_pv + "\",");
		sb.append("\"uv\":\"" + tod_uv + "\",");
		sb.append("\"hit_pv\":\"" + tod_hit_pv + "\",");
		sb.append("\"hit_uv\":\"" + tod_hit_uv + "\"");
		
		//sb.append("\"real_hit_pv_rate\":\"" + rate_hit_pv + "\",");
		//sb.append("\"real_hit_uv_rate\":\"" + rate_hit_uv + "\"");
		
		sb.append("},");
		
		sb.append("\"twoDays\":[{");
		sb.append("\"pv\":\"" + day0.tod_pv + "\",");
		sb.append("\"uv\":\"" + day0.tod_uv + "\",");
		sb.append("\"hit_pv\":\"" + day0.tod_hit_pv + "\",");
		sb.append("\"hit_uv\":\"" + day0.tod_hit_uv + "\",");
		sb.append("\"hit_pv_rate\":\"" + day0.rate_hit_pv + "\",");
		sb.append("\"hit_uv_rate\":\"" + day0.rate_hit_uv + "\"},");
		
		sb.append("{\"pv\":\"" + day1.tod_pv + "\",");
		sb.append("\"uv\":\"" + day1.tod_uv + "\",");
		sb.append("\"hit_pv\":\"" + day1.tod_hit_pv + "\",");
		sb.append("\"hit_uv\":\"" + day1.tod_hit_uv + "\",");
		sb.append("\"hit_pv_rate\":\"" + day1.rate_hit_pv + "\",");
		sb.append("\"hit_uv_rate\":\"" + day1.rate_hit_uv + "\"}],");
		
		sb.append("\"accum\":[{");
		sb.append("\"accum_pv\":\"" + accum_pv + "\",");
		sb.append("\"accum_uv\":\"" + accum_uv + "\",");
		sb.append("\"accum_hit_pv\":\"" + accum_hit_pv + "\",");
		sb.append("\"accum_hit_uv\":\"" + accum_hit_uv + "\"");
		
		sb.append("}]}");
		return sb.toString();
	}
	
}
