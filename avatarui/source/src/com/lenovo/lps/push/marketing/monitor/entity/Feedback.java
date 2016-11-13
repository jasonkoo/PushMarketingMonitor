package com.lenovo.lps.push.marketing.monitor.entity;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.param.Param;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;

/**
 * @author liuhk2
 */
public class Feedback {
	
	private static Logger logger = Logger.getLogger(Feedback.class);

	String date;
	String hour;	
	List<String> idList;

	double arrived = 0;
	double displayed = 0;
	double sysmsgclicked = 0;
	double s2nddisplayed = 0;
	double s2ndclicked = 0;
	double downloaded = 0;
	double installed = 0;
	double activated = 0;
	
	String cityName;
	String osVersion;
	String operationType;
	String peVersion;
	String deviceModel;
	String countryCode;
	
	double sum;
	String result;
	
	
	
	
	
	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getPeVersion() {
		return peVersion;
	}

	public void setPeVersion(String peVersion) {
		this.peVersion = peVersion;
	}

	public String getDeviceModel() {
		return deviceModel;
	}

	public void setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
	}

	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	public String getOsVersion() {
		return osVersion;
	}

	public void setOsVersion(String osVersion) {
		this.osVersion = osVersion;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public Feedback() {
		super();

	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getHour() {
		return hour;
	}
	
	public void setHour(String hour) {
		this.hour = hour;
	}

	public List<String> getIdList() {
		return idList;
	}

	public void setIdList(List<String> idList) {
		this.idList = idList;
	}

	public double getArrived() {
		return arrived;
	}

	public void setArrived(double arrived) {
		this.arrived = arrived;
	}

	public double getDisplayed() {
		return displayed;
	}

	public void setDisplayed(double displayed) {
		this.displayed = displayed;
	}

	public double getSysmsgclicked() {
		return sysmsgclicked;
	}

	public void setSysmsgclicked(double sysmsgclicked) {
		this.sysmsgclicked = sysmsgclicked;
	}

	public double getDownloaded() {
		return downloaded;
	}

	public void setDownloaded(double downloaded) {
		this.downloaded = downloaded;
	}

	public double getInstalled() {
		return installed;
	}

	public void setInstalled(double installed) {
		this.installed = installed;
	}

	public double getActivated() {
		return activated;
	}

	public void setActivated(double activated) {
		this.activated = activated;
	}
	
	public double getS2nddisplayed() {
		return s2nddisplayed;
	}

	public void setS2nddisplayed(double s2nddisplayed) {
		this.s2nddisplayed = s2nddisplayed;
	}

	public double getS2ndclicked() {
		return s2ndclicked;
	}

	public void setS2ndclicked(double s2ndclicked) {
		this.s2ndclicked = s2ndclicked;
	}

//	public static String toJsonString(List<Feedback> feedbackList, int pageNow,
//			int total) {
//		StringBuilder sb = new StringBuilder();
//		sb.append("{\"pageNow\":" + pageNow + ",\"total\":" + total
//				+ ",\"rows\":[");
//
//		if (feedbackList != null) {
//			for (int i = 0; i < feedbackList.size(); i++) {
//				sb.append("{\"date\":\"" + feedbackList.get(i).getDate()
//						+ "\",");
//				sb.append("\"arrived\":\"" + feedbackList.get(i).getArrived()
//						+ "\",");
//				sb.append("\"displayed\":\""
//						+ feedbackList.get(i).getDisplayed() + "\",");
//				sb.append("\"sysmsgclicked\":\""
//						+ feedbackList.get(i).getSysmsgclicked() + "\",");
//				sb.append("\"downloaded\":\""
//						+ feedbackList.get(i).getDownloaded() + "\",");
//				sb.append("\"installed\":\""
//						+ feedbackList.get(i).getInstalled() + "\",");
//				sb.append("\"activated\":\""
//						+ feedbackList.get(i).getActivated() + "\"},");
//			}
//		} else {
//			System.out.println("fb list is null!");
//		}
//		sb = sb.deleteCharAt(sb.length() - 1);
//		sb.append("]}");
//		return sb.toString();
//	}

	public static String pageToJsonString(Page<Feedback> page,String groupByColumnName,String asColumnName,double all) {

		StringBuilder sb = new StringBuilder();
		sb.append("{\"page\":" + page.getPageNo() + ",\"total\":"
				+ page.getTotalRecord() + ",\"rows\":[");
		List<Feedback> feedbackList = page.getResults();
		if (feedbackList != null) {
			for (int i = 0; i < feedbackList.size(); i++) {
				logger.debug("trim(dv)");
				//logger.debug("dimValue: " +getDimValue(feedbackList.get(i),groupByColumnName) + "; trim(dimValue): " +getDimValue(feedbackList.get(i),groupByColumnName).trim() + "; bytes: " + StringUtil.bytes2HexString(getDimValue(feedbackList.get(i),groupByColumnName).getBytes()));
				String dv = getDimValue(feedbackList.get(i),groupByColumnName);
				// TODO 等陈改好后，去掉trim逻辑
				// liuhk2: 去掉不可见字符 ‘01’，不然，影响前台的显示
				dv = dv.trim();
				sb.append("{\"dimValue\":\"" + dv
						+ "\",");
				double nv = getNormValue(feedbackList.get(i),asColumnName);
				sb.append("\"normValue\":\"" + nv
						+ "\",");
				double proportion = nv / all;
				String proportionStr = NumberUtil.double2PercentWithoutPercentSign(proportion);
				sb.append("\"proportion\":\""
						+ proportionStr + "\"},");
			}
		} else {
			logger.warn("fb list is null!");
		}
		sb = sb.deleteCharAt(sb.length() - 1);
		sb.append("]}");
		return sb.toString();
	}
	
	public static String ToTrendDataJsonString(Map<String,List<Feedback>> map,String asColumnName,String startDate,String endDate) throws ParseException {

		makeListEqualLength(map,startDate,endDate);
		
		StringBuilder sb = new StringBuilder();
		if (map!=null) {
			sb.append("{");
			for (String columnName : map.keySet()) {
				sb.append("\"" + columnName + "\":[");
				List<Feedback> feedbackList = map.get(columnName);
				if (feedbackList != null && feedbackList.size()>0) {
					sb.append("[");
					StringBuilder sb1 = new StringBuilder();
					StringBuilder sb2 = new StringBuilder();
					for (Feedback fd : feedbackList) {
						String dateStr = DateUtil.mdrillDate2AvatarDate(fd
								.getDate());
						sb1.append("\"" + dateStr + "\",");
						double nv = getNormValue(fd, asColumnName);
						sb2.append("\"" + nv + "\",");
					}

					sb1 = sb1.deleteCharAt(sb1.length() - 1);
					sb2 = sb2.deleteCharAt(sb2.length() - 1);
					sb.append(sb1.toString() + "],[" + sb2.toString() + "],");
					sb = sb.deleteCharAt(sb.length() - 1);
				} else {
					sb.append("[],[]");
				}
				sb.append("],");
			}
			sb = sb.deleteCharAt(sb.length() - 1);
			sb.append("}");
		}
		return sb.toString();
	}
	
	private static void makeListEqualLength(Map<String, List<Feedback>> map,
			String startDate,String endDate) throws ParseException {
		long dayDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
		long size = dayDiff + 1;
		for (String columnName : map.keySet()) {
			List<Feedback> feedbackList = map.get(columnName);
			if (feedbackList.size() < size) {
				List<Feedback> feedbackList1 = new ArrayList<Feedback>();
				for (int i = 0; i < size; i++) {
					String theDate = DateUtil.getNAfterDate(startDate, i);
					Feedback fb = getFeedback(theDate, feedbackList);
					if (fb == null) {
						fb = new Feedback();
						fb.setDate(theDate);
					}
					feedbackList1.add(fb);
				}
				map.put(columnName, feedbackList1);
			}
			
		}
	}

	private static Feedback getFeedback(String theDate,
			List<Feedback> feedbackList) {
		if (feedbackList!=null){
			for (Feedback fb : feedbackList){
				if (theDate.equals(fb.getDate())) {
					return fb;
				}
			}
		}
		return null;
	}

	private static String getDimValue(Feedback feedback,String groupByColumnName) {
		String dv = null;
		if (Param.COLUMNNAME_CITY_NAME.equals(groupByColumnName)) {
			dv = feedback.getCityName();
		}
		if (Param.COLUMNNAME_OS_VERSION.equals(groupByColumnName)) {
			dv = feedback.getOsVersion();
		}
		if (Param.COLUMNNAME_OPERATION_TYPE.equals(groupByColumnName)) {
			dv = feedback.getOperationType();
		}
		if (Param.COLUMNNAME_DEVICE_MODEL.equals(groupByColumnName)) {
			dv = feedback.getDeviceModel();
		}
		if (Param.COLUMNNAME_PE_VERSION.equals(groupByColumnName)) {
			dv = feedback.getPeVersion();
		}
		if (Param.COLUMNNAME_COUNTRY_CODE.equals(groupByColumnName)) {
			dv = feedback.getCountryCode();
		}
		return dv;
	}
	
	public static double getNormValue(Feedback feedback,String asColumnName) {
		double nv = 0;
		if (Param.ARRIVED.equals(asColumnName)) {
			nv = feedback.getArrived();
		}
		if (Param.DISPLAYED.equals(asColumnName)) {
			nv = feedback.getDisplayed();
		}
		if (Param.SYSMSGCLICKED.equals(asColumnName)) {
			nv = feedback.getSysmsgclicked();
		}
		if (Param.S_2NDDISPLAYED.equals(asColumnName)) {
			nv = feedback.getS2nddisplayed();
		}
		if (Param.S_2NDCLICKED.equals(asColumnName)) {
			nv = feedback.getS2ndclicked();
		}
		if (Param.DOWNLOADED.equals(asColumnName)) {
			nv = feedback.getDownloaded();
		}
		if (Param.INSTALLED.equals(asColumnName)) {
			nv = feedback.getInstalled();
		}
		if (Param.ACTIVATED.equals(asColumnName)) {
			nv = feedback.getActivated();
		}
		return nv;
	}
	
	public static void setNormValue(Feedback feedback, String asColumnName, double nv) {		
		if (Param.ARRIVED.equals(asColumnName)) {
			feedback.setArrived(nv);
		}
		if (Param.DISPLAYED.equals(asColumnName)) {
			feedback.setDisplayed(nv);
		}
		if (Param.SYSMSGCLICKED.equals(asColumnName)) {
			feedback.setSysmsgclicked(nv);
		}
		if (Param.S_2NDDISPLAYED.equals(asColumnName)) {
			feedback.setS2nddisplayed(nv);
		}
		if (Param.S_2NDCLICKED.equals(asColumnName)) {
			feedback.setS2ndclicked(nv);
		}
		if (Param.DOWNLOADED.equals(asColumnName)) {
			feedback.setDownloaded(nv);
		}
		if (Param.INSTALLED.equals(asColumnName)) {
			feedback.setInstalled(nv);
		}
		if (Param.ACTIVATED.equals(asColumnName)) {
			feedback.setActivated(nv);
		}		
	}
	
	
}
