package com.lenovo.lps.push.marketing.monitor.jsonentity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.lenovo.lps.push.marketing.monitor.entity.Feedback;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;

public class JsonData5 {
	
	long page;
	long total;
	List<FeedbackRow> rows;
	
	

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


	public List<FeedbackRow> getRows() {
		return rows;
	}


	public void setRows(List<FeedbackRow> rows) {
		this.rows = rows;
	}


	public class FeedbackRow{
		String date;
		
		String arrived;
		String displayed;
		String sysmsgclicked;
		String s2nddisplayed;
		String s2ndclicked;
		String downloaded;
		String installed;
		String activated;
		
		
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getArrived() {
			return arrived;
		}
		public void setArrived(String arrived) {
			this.arrived = arrived;
		}
		public String getDisplayed() {
			return displayed;
		}
		public void setDisplayed(String displayed) {
			this.displayed = displayed;
		}
		public String getSysmsgclicked() {
			return sysmsgclicked;
		}
		public void setSysmsgclicked(String sysmsgclicked) {
			this.sysmsgclicked = sysmsgclicked;
		}
		public String getS2nddisplayed() {
			return s2nddisplayed;
		}
		public void setS2nddisplayed(String s2nddisplayed) {
			this.s2nddisplayed = s2nddisplayed;
		}
		public String getS2ndclicked() {
			return s2ndclicked;
		}
		public void setS2ndclicked(String s2ndclicked) {
			this.s2ndclicked = s2ndclicked;
		}
		public String getDownloaded() {
			return downloaded;
		}
		public void setDownloaded(String downloaded) {
			this.downloaded = downloaded;
		}
		public String getInstalled() {
			return installed;
		}
		public void setInstalled(String installed) {
			this.installed = installed;
		}
		public String getActivated() {
			return activated;
		}
		public void setActivated(String activated) {
			this.activated = activated;
		}
	}
	

	public static String fbList2JsonString(long page, long total, List<Feedback> fbList) throws JsonGenerationException, JsonMappingException, IOException {
		JsonData5 jd = new JsonData5();
		jd.setPage(page);
		jd.setTotal(total);
		if (fbList!=null) {
			List<FeedbackRow> rows = new ArrayList<FeedbackRow>();
			for (Feedback fb : fbList) {
				FeedbackRow row = jd.new FeedbackRow();
				row.setDate(fb.getDate());
				row.setArrived(String.valueOf(fb.getArrived()));
				row.setDisplayed(String.valueOf(fb.getDisplayed()));
				row.setSysmsgclicked(String.valueOf(fb.getSysmsgclicked()));
				row.setS2nddisplayed(String.valueOf(fb.getS2nddisplayed()));
				row.setS2ndclicked(String.valueOf(fb.getS2ndclicked()));
				row.setDownloaded(String.valueOf(fb.getDownloaded()));
				row.setInstalled(String.valueOf(fb.getInstalled()));
				row.setActivated(String.valueOf(fb.getActivated()));		
				
				rows.add(row);
			}
			jd.setRows(rows);
		}
		return JsonUtil.entity2JsonString(jd);
	}
	

}
