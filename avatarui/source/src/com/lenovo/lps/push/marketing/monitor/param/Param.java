package com.lenovo.lps.push.marketing.monitor.param;

import java.util.HashMap;
import java.util.Map;

public class Param {
	public final static long TREND_DATA_OFFSET =7;
	
	public final static String COLUMNNAME_COL_0 = "col_0";
	public final static String COLUMNNAME_COL_1 = "col_1";
	public final static String COLUMNNAME_COL_2 = "col_2";
	public final static String COLUMNNAME_COL_3 = "col_3";
	public final static String COLUMNNAME_COL_4 = "col_4";
	public final static String COLUMNNAME_COL_5 = "col_5";
	public final static String COLUMNNAME_COL_6 = "col_6";
	public final static String COLUMNNAME_COL_7 = "col_7";
	
	
	public final static String COLUMNNAME_CITY_NAME = "city_name";
	public final static String COLUMNNAME_OS_VERSION = "os_version";
	public final static String COLUMNNAME_OPERATION_TYPE = "operation_type";
	public final static String COLUMNNAME_DEVICE_MODEL = "device_model";
	public final static String COLUMNNAME_PE_VERSION = "pe_version";
	public final static String COLUMNNAME_COUNTRY_CODE = "country_code";
	
	public final static String FEEDBACK_ERROR_TYPE_DOWNLOAD = "0";
	public final static String FEEDBACK_ERROR_TYPE_INSTALL = "1";
	
	public final static String COLUMNNAME_RESULT = "result";
	
	public final static String ARRIVED = "arrived";
	public final static String DISPLAYED = "displayed";
	public final static String SYSMSGCLICKED = "sysmsgclicked";
	public final static String S_2NDDISPLAYED = "2nddisplayed";
	public final static String S_2NDCLICKED = "2ndclicked";
	public final static String DOWNLOADED = "downloaded";
	public final static String INSTALLED = "installed";
	public final static String ACTIVATED = "activated";
	
	
	
	@SuppressWarnings("serial")
	public final static Map<String, String> NAME_MAP = new HashMap<String, String>() {
		{
			put(ARRIVED, COLUMNNAME_COL_0);
			put(DISPLAYED, COLUMNNAME_COL_1);
			put(SYSMSGCLICKED, COLUMNNAME_COL_2);
			put(S_2NDDISPLAYED, COLUMNNAME_COL_3);
			put(S_2NDCLICKED, COLUMNNAME_COL_4);
			put(DOWNLOADED, COLUMNNAME_COL_5);
			put(INSTALLED, COLUMNNAME_COL_6);
			put(ACTIVATED, COLUMNNAME_COL_7);
		}
	};
	
	public final static int HIT_RESULT_UPPER_LIMIT = 7;
	
	public final static long SAMPLE_NO = 10;
	public final static long RECORD_LOWER_BOUND = 100;
	public final static long MDRILL_GROUP_BY_UPPER_LIMIT = 10000;
	
	// from yinzj4 2014-06-06
    @SuppressWarnings("serial")
	public final static Map<String, String> SWITCH_PROVINCE_ENCOCE_MAP = new HashMap<String, String>() {
    	{
	       put("CN_01", "Anhui");
	       put("CN_02", "Zhejiang");
	       put("CN_03", "Jiangxi");
	       put("CN_04", "Jiangsu");
	       put("CN_05", "Jilin");
	       put("CN_06", "Qinghai");
	       put("CN_07", "Fujian");
	       put("CN_08", "Heilongjiang");
	       put("CN_09", "Henan");
	       put("CN_10", "Hebei");
	       put("CN_11", "Hunan");
	       put("CN_12", "Hubei");
	       put("CN_13", "Xinjiang");
	       put("CN_14", "Xizang");
	       put("CN_15", "Gansu");
	       put("CN_16", "Guangxi");
	       put("CN_18", "Guizhou");
	       put("CN_19", "Liaoning");
	       put("CN_20", "Nei Mongol");
	       put("CN_21", "Ningxia");
	       put("CN_22", "Beijing");
	       put("CN_23", "Shanghai");
	       put("CN_24", "Shanxi");
	       put("CN_25", "Shandong");
	       put("CN_26", "Shaanxi");
	       put("CN_28", "Tianjin");
	       put("CN_29", "Yunnan");
	       put("CN_30", "Guangdong");
	       put("CN_31", "Hainan");
	       put("CN_32", "Sichuan");
	       put("CN_33", "Chongqing");
    	}
    };

}
