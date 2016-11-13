package com.lenovo.lps.push.marketing.monitor.util;

public class StringUtil {
	public static String bytes2HexString(byte[] b) {  
		  String ret = "";  
		  for (int i = 0; i < b.length; i++) {  
		   String hex = Integer.toHexString(b[ i ] & 0xFF);  
		   if (hex.length() == 1) {  
		    hex = '0' + hex;  
		   }  
		   ret += hex.toUpperCase();  
		  }  
		  return ret;  
		}  
}
