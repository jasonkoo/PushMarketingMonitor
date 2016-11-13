package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.entity.HitPvUv;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;
import com.lenovo.push.marketing.lestat.db.entity.DisturbanceResult;

public class JsonData4 {
	
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
		String dimValue;
		String normValue;
		String proportion;
		public String getDimValue() {
			return dimValue;
		}
		public void setDimValue(String dimValue) {
			this.dimValue = dimValue;
		}
		public String getNormValue() {
			return normValue;
		}
		public void setNormValue(String normValue) {
			this.normValue = normValue;
		}
		public String getProportion() {
			return proportion;
		}
		public void setProportion(String proportion) {
			this.proportion = proportion;
		}
	}

	public static String toJsonString(long page,long total,List<HitPvUv> pvList,double all) throws JsonGenerationException, JsonMappingException, IOException {
		JsonData4 jd = new JsonData4();
		jd.setPage(page);
		jd.setTotal(total);
		if (pvList!=null) {
			List<Row> rows = new ArrayList<Row>();
			for (HitPvUv pv : pvList) {
				Row row = jd.new Row();
				row.setDimValue(pv.getDim());
				String normValue = Double.toString(pv.getDimSum());
				row.setNormValue(normValue);
				row.setProportion(NumberUtil.double2PercentWithoutPercentSign(pv.getDimSum() / all));
				rows.add(row);
			}
			jd.setRows(rows);
		}
		return JsonUtil.entity2JsonString(jd);
	}
	
	public static String toJsonStringForDisturbance(long page, long total, List<DisturbanceResult> list) throws JsonGenerationException, JsonMappingException, IOException {
		JsonData4 jd = new JsonData4();
		jd.setPage(page);
		jd.setTotal(total);
		if (list != null) {
			List<Row> rows = new ArrayList<Row>();
			double totalNumUsers = 0;
			for (DisturbanceResult dr : list){
				totalNumUsers += dr.getNumUsers();
			}
			for (DisturbanceResult dr : list) {
				Row row = jd.new Row();
				row.setDimValue(String.valueOf(dr.getHitCount()));
				row.setNormValue(String.valueOf(dr.getNumUsers()));				
				row.setProportion(NumberUtil.double2PercentWithoutPercentSign(dr.getNumUsers() / totalNumUsers));
				rows.add(row);
			}
			jd.setRows(rows);
		}
		return JsonUtil.entity2JsonString(jd);
	}
	
	public static String toJsonStringForFeedback(long page,long total,List<Feedback> pvList,double all) throws JsonGenerationException, JsonMappingException, IOException {
		JsonData4 jd = new JsonData4();
		jd.setPage(page);
		jd.setTotal(total);
		if (pvList!=null) {
			List<Row> rows = new ArrayList<Row>();
			for (Feedback fb : pvList) {
				Row row = jd.new Row();
				row.setDimValue(fb.getResult());
				String normValue = Double.toString(fb.getSum());
				row.setNormValue(normValue);
				row.setProportion(NumberUtil.double2PercentWithoutPercentSign(fb.getSum() / all));
				rows.add(row);
			}
			jd.setRows(rows);
		}
		return JsonUtil.entity2JsonString(jd);
	}
	
	
}
