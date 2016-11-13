package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;



import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;

public class JsonData2 {
	
	long page;
	long total;
	List<Row> rows;
	
	public long getPage() {
		return page;
	}



	public void setPage(long page) {
		this.page = page;
	}



	public long getTotal() {
		return total;
	}



	public void setTotal(long total) {
		this.total = total;
	}



	public List<Row> getRows() {
		return rows;
	}



	public void setRows(List<Row> rows) {
		this.rows = rows;
	}

	public String toJsonString() throws JsonGenerationException, JsonMappingException, IOException{
		return JsonUtil.entity2JsonString(this);
	}

	public  class Row{
		//"date":"2014-05-06","newUserNum":"119026","accumUserNum":"66402120","startUserNum":"21448455","startTimeNum":"269343628","avgUseDateLength":"170.44","pv":"276804906","pcmUsers":"0"
		String date;
		String pv;
		String uv;
		String hit_pv;
		String hit_uv;
		String hit_pv_rate;
		String hit_uv_rate;
		
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
		public String getHit_pv_rate() {
			return hit_pv_rate;
		}
		public void setHit_pv_rate(String hit_pv_rate) {
			this.hit_pv_rate = hit_pv_rate;
		}
		public String getHit_uv_rate() {
			return hit_uv_rate;
		}
		public void setHit_uv_rate(String hit_uv_rate) {
			this.hit_uv_rate = hit_uv_rate;
		}
		
		
	}
	
	
	public static String pvUvList2JsonString(long page,long total,List<HitPvUv> pvList,List<HitPvUv> uvList,List<HitPvUv> hitPvList,List<HitPvUv> hitUvList) throws JsonGenerationException, JsonMappingException, IOException {
		JsonData2 jd = new JsonData2();
		jd.setPage(page);
		jd.setTotal(total);
		if (pvList!=null) {
			List<Row> rows = new ArrayList<Row>();
			for (HitPvUv pv : pvList) {
				Row row = jd.new Row();
				String thedate = pv.getThedate();
				row.setDate(thedate);
				
				String pvSum = pv.getSum();
				row.setPv(pvSum);
				
				String uvSum = getValue(thedate, uvList);
				row.setUv(uvSum);
				
				String hitPvSum = getValue(thedate, hitPvList);
				row.setHit_pv(hitPvSum);
				
				String hitUvSum = getValue(thedate, hitUvList);
				row.setHit_uv(hitUvSum);
				
				row.setHit_pv_rate(NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitPvSum) / Double.parseDouble(pvSum)));
				row.setHit_uv_rate(NumberUtil.double2PercentWithoutPercentSign(Double.parseDouble(hitUvSum) / Double.parseDouble(uvSum)));
				rows.add(row);
			}
			jd.setRows(rows);
		}
		return JsonUtil.entity2JsonString(jd);
	}
	
	
	
	private static String getValue(String key, List<HitPvUv> pvUvList) {
		String result = "0";
		if (key != null) {
			if (pvUvList != null) {
				for (HitPvUv v : pvUvList) {
					if (v != null && key.equals(v.getThedate())) {
						result = v.getSum();
						break;
					}
				}
			}
		}
		return result;
	}
}
