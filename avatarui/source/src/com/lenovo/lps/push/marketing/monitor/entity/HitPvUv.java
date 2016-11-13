package com.lenovo.lps.push.marketing.monitor.entity;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.lenovo.lps.push.marketing.monitor.interceptor.Page;
import com.lenovo.lps.push.marketing.monitor.util.DateUtil;
import com.lenovo.lps.push.marketing.monitor.util.NumberUtil;

/**
 * @author liuhk2
 */
public class HitPvUv {

	//private static Logger logger = Logger.getLogger(HitPvUv.class);

	private String thedate;
	private String hour;
	private String minute5;
	private String sum;
	private String count;
	
	private String dim; //组名，如版本名称，分发渠道，设备型号，城市名称，系统版本，网络服务运营商
	private double dimSum;	
	
	public String getThedate() {
		return thedate;
	}

	public void setThedate(String thedate) {
		this.thedate = thedate;
	}

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public String getMinute5() {
		return minute5;
	}

	public void setMinute5(String minute5) {
		this.minute5 = minute5;
	}

	public String getSum() {
		return sum;
	}

	public void setSum(String sum) {
		this.sum = sum;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getDim() {
		return dim;
	}

	public void setDim(String dim) {
		this.dim = dim;
	}

	
	
	public Double getDimSum() {
		return dimSum;
	}

	public void setDimSum(Double dimSum) {
		this.dimSum = dimSum;
	}
	

//	public static String pvUvList2JsonStringByMinute5(
//			ArrayList<HitPvUv> pvUvList, boolean isYesterday)
//			throws ParseException {
//		//String myDateStr = dateStr;
//		//if (isYesterday) {
//		String myDateStr = DateUtil.getToday();
//		//}
//		StringBuilder sb = new StringBuilder();
//		sb.append("[");
//		if (pvUvList != null && (pvUvList.size() > 0)) {
//
//			for (int i = 0; i < pvUvList.size(); i++) {
//				if (!isYesterday && i == pvUvList.size() - 1) {
//					continue;
//				}
//
//				String min5 = pvUvList.get(i).getMinute5();
//				String hm = DateUtil.getRealtimeHm(myDateStr, min5);
//				sb.append("{\"hm\":\"" + hm + "\",");
//				String sum = pvUvList.get(i).getSum();
//				String norm = NumberUtil.doubleStr2LongString(sum);
//				sb.append("\"norm\":\"" + norm + "\"},");
//			}
//		} else {
//
//			if (pvUvList == null) {
//				logger.warn("pvuv list is null!");
//			}
//			if (pvUvList.size() <= 0) {
//				logger.warn("Length of pvUvList: " + pvUvList.size());
//			}
//			int n = getListLength(isYesterday);
//
//			for (int i = 0; i < n; i++) {
//				String hour = Integer.toString((i * 5) / 60);
//				if (hour.length()==1) {
//					hour = "0" + hour;
//				}
//				String min5 = Integer.toString((i * 5) & 60);
//				if (min5.length()==1) {
//					min5 = "0" + min5;
//				}
//				logger.debug("hour=" + hour + "; min5=" + min5); 
//				String time = hour + min5;
//				String hm = DateUtil.getRealtimeHm(myDateStr, time);
//				sb.append("{\"hm\":\"" + hm + "\",");
//				String sum = "0";
//				String norm = NumberUtil.doubleStr2LongString(sum);
//				sb.append("\"norm\":\"" + norm + "\"},");
//			}
//		}
//		sb = sb.deleteCharAt(sb.length() - 1);
//		sb.append("]");
//
//		return sb.toString();
//	}
	
	public static String page2JsonStringForDimensionData(Page<HitPvUv> page, double total) {
		StringBuilder sb = new StringBuilder();
		sb.append("{\"page\":" + page.getPageNo() + ",\"total\":"
				+ page.getTotalRecord() + ",\"rows\":[");
		List<HitPvUv> hitPvUvList = page.getResults();
		if(hitPvUvList != null) {
			for (int i = 0; i < hitPvUvList.size(); i++) {
				HitPvUv hit = hitPvUvList.get(i);
				// 去掉不可见字符
				String dim = hit.getDim();
				dim = dim.trim();
				sb.append("{\"dimValue\":\"" + dim + "\",");
				sb.append("\"normValue\":\"" + hit.getDimSum() + "\",");				
				sb.append("\"proportion\":\"" + NumberUtil.double2PercentWithoutPercentSign(hit.getDimSum() / total) + "\"},");
			}
		} else {
			System.out.println("hit list is null");
		}
		if(hitPvUvList.size() > 0) {
			sb = sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}");
		return sb.toString();
	}
	
	public static String map2JsonStringForTrendData (Map<String, List<HitPvUv>> map) throws ParseException {
 		StringBuilder sb = new StringBuilder();		
		if (!map.isEmpty()) {
			sb.append("{");
			for (String dimVal: map.keySet() ) {
				sb.append("\"" + dimVal +  "\":[[");
				List<HitPvUv> hitPvUvList = map.get(dimVal);
				// This conditional test is specially used for the dimVal="null"
				// which will result in hitPvUvList.size() = 0
				if (hitPvUvList != null && hitPvUvList.size() > 0) {					
					StringBuilder sb1 = new StringBuilder();
					StringBuilder sb2 = new StringBuilder();
					for (HitPvUv hitPvUv : hitPvUvList) {
						String dateStr = DateUtil.mdrillDate2AvatarDate(hitPvUv.getThedate());
						sb1.append("\"" + dateStr + "\",");					
						sb2.append("\"" + hitPvUv.getDimSum() + "\",");					
					}
					sb1 = sb1.deleteCharAt(sb1.length() - 1);
					sb2 = sb2.deleteCharAt(sb2.length() - 1);
					sb.append(sb1.toString() + "],[" + sb2.toString() + "]],");
				} else {
					sb.append("],[]],");
				}
			}
			sb = sb.deleteCharAt(sb.length() - 1);
			sb.append("}");
		}
		return sb.toString();
	}
	
	public static void makeListEqualLength(Map<String, List<HitPvUv>> map,
			String startDate,String endDate) throws ParseException {
		long dayDiff = DateUtil.mdrillDateDiffInDays(startDate, endDate);
		long size = dayDiff + 1;
		for (String columnName : map.keySet()) {
			List<HitPvUv> hitPvUvList = map.get(columnName);
			if (hitPvUvList.size() < size) {
				List<HitPvUv> hitPvUvList1 = new ArrayList<HitPvUv>();
				for (int i = 0; i < size; i++) {
					String theDate = DateUtil.getNAfterDate(startDate, i);
					HitPvUv hitPvUv = getHitPvUv(theDate, hitPvUvList);
					if (hitPvUv == null) {
						hitPvUv = new HitPvUv();
						hitPvUv.setThedate(theDate);
					}
					hitPvUvList1.add(hitPvUv);
				}
				map.put(columnName, hitPvUvList1);
			}
			
		}
	}

	private static HitPvUv getHitPvUv(String theDate, List<HitPvUv> hitPvUvList) {
		if (hitPvUvList!=null){
			for (HitPvUv hitPvUv : hitPvUvList){
				if (theDate.equals(hitPvUv.getThedate())) {
					return hitPvUv;
				}
			}
		}
		return null;
	}
//	private static int getListLength(boolean isYesterday) {
//		if (isYesterday){
//			return 288;
//		} else {
//			Date now = new Date();
//			int hour = Integer.parseInt(DateUtil.date2String(now, "HH"));
//			int min = Integer.parseInt(DateUtil.date2String(now, "mm"));
//			return hour * 12 + min / 5;
//		}
//	}

}
