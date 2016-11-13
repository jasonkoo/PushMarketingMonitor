<%@ page language="java" %>
<%@ page import="com.lenovo.lps.push.marketing.manager.HitConfig" %>
<%@ page import="com.lenovo.lps.push.marketing.manager.services.HitConfigService" %>
<%@ page import="java.util.*" %>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<head>
<title>营销投放管理平台</title>
<style type="text/css">
.trOdd {line-height: 50px;}
.warning {color: red;}
</style>
<script type="text/javascript">
function beforeSubmit() {
	var minHitIntervalVal = document.getElementById("minHitInterval").value;
	if (minHitIntervalVal == null || minHitIntervalVal == "") {
		document.getElementById("minHitIntervalLabel").innerHTML = "最小投放间隔不能为空！";
		return false;
	} else {
		document.getElementById("minHitIntervalLabel").innerHTML = "";
	}
	
	var userMaxAdsPerDay = document.getElementById("userMaxAdsPerDay").value;
	if (userMaxAdsPerDay == null || userMaxAdsPerDay == "") {
		document.getElementById("userMaxAdsPerDayLabel").innerHTML = "用户骚扰度不能为空！";
		return false;
	} else {
		document.getElementById("userMaxAdsPerDayLabel").innerHTML = "";
	}
	
	return true;	
 }
</script>
</head>


<body data-main="script/sdk/hit/sdkUser.js?20131223">

	<div class="wrap">
	<div class="crumb">
		<h1><span id="ReportAnchor"></span>全局设置</h1>
	</div>	
	<%
		
		try {
// 				HitConfig hc = (HitConfig)request.getAttribute("hitConfig");     
//     			if (hc == null) {
//     				HitConfigService hcs = new HitConfigService();
//     				hc = hcs.getValue(); 
//     			} 
				ServletContext context = request.getSession().getServletContext();  
				WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(context);		
				HitConfigService hcs = (HitConfigService) ctx.getBean("hitconfigservice");
				HitConfig hc = hcs.getValue();
    %>   	
    	
    <form class="form-horizontal" action="zkconfig/hitConfig.do?action=u" method="post" onSubmit="return beforeSubmit();">
	
	<table class="dgContentTable" border="0" cellpadding="0" cellspacing="0" style="width:100%; background:#fff;">
	<tbody>
	<tr class="trOdd">
	 	<td class="noBorder" style="width:6%; text-align:left">		
  			<label for="minHitInterval">最小投放间隔 ：</label>
  		</td>
  		<td class="noBorder" style="width:60%; text-align:left">
  			<input id="minHitInterval" name="minHitInterval" type="text" placeholder="" class="form-control input-md" value=<%=hc.getMinHitInterval() %>>
			<span class="help-block">ms</span>
		</td>
	</tr>
	<tr class="trOdd">
		<td class="noBorder" style="width:6%; text-align:left">
		</td>
		<td class="noBorder" style="width:60%; text-align:left">
			<label id="minHitIntervalLabel" class="warning"></label>
		</td>
	</tr>

	<tr class="trOdd">
		<td class="noBorder" style="width:6%; text-align:left">
  			<label for="pushHours">投放时段：</label>
  		</td>
  		<td class="noBorder" style="width:60%; text-align:left">
  
  	<%
  		int[] pushHours = hc.getPushHours();
  		int len = 0;
  		if (pushHours != null) {
			len = pushHours.length;
  		} 
  		int i = 0, j = 0;		
		while (i < 24 && j < len){
			if(i == pushHours[j]){
				j++;
	%>
	<label class="checkbox-inline" for="pushHours-<%=i %>">
      <input type="checkbox" name="pushHours" id="pushHours-<%=i %>" value="<%=i %>" checked="checked">
      <%=i %>
    </label>
    <%
			} else {
	%>
	<label class="checkbox-inline" for="pushHours-<%=i %>">
      <input type="checkbox" name="pushHours" id="pushHours-<%=i %>" value="<%=i %>">
      <%=i %>
    </label>
    <% }
		   i++;
	}  		 																	
  	%>
  	<%
  		while (i < 24) {
  	%>
  	<label class="checkbox-inline" for="pushHours-<%=i %>">
      <input type="checkbox" name="pushHours" id="pushHours-<%=i %>" value="<%=i %>">
      <%=i %>
    </label>
    <%  			
  			i++;
  		}  	
  	%>
  		</td> 
	</tr>


  <tr class="trOdd">
  <td class="noBorder" style="width:6%; text-align:left">
  <label for="testDevices">测试设备列表：</label> 
  </td>
  <td class="noBorder" style="width:60%; text-align:left">
  <%
	Set<Long> testDevices = hc.getTestDevices();
  	String textValue = "";
  	if (testDevices != null && testDevices.size() > 0) {
  		for(Long td : testDevices) {
  	  		textValue += td + ",";
  	  	}
  		textValue = textValue.substring(0, textValue.length() -1);
  	}  	
%>
  <input id="testDevices" name="testDevices" type="text" placeholder="comma separated values" class="form-control input-md" value="<%=textValue %>">
  <span class="help-block">eg: 34567,45667,99898</span> 
  </td>
  </tr>
<%
	int umapd = hc.getUserMaxAdsPerDay();
%>

  <tr class="trOdd">
  	 <td class="noBorder" style="width:6%; text-align:left">
  		<label for="userMaxAdsPerDay">用户骚扰度：</label> 
  	 </td>
  	 <td class="noBorder" style="width:60%; text-align:left">
  		<input id="userMaxAdsPerDay" name="userMaxAdsPerDay" type="text" placeholder="" class="form-control input-md" value="<%=umapd %>">
  	 </td>
  </tr>
  <tr class="trOdd">
		<td class="noBorder" style="width:6%; text-align:left">
		</td>
		<td class="noBorder" style="width:60%; text-align:left">
			<label id="userMaxAdsPerDayLabel" class="warning"></label>
		</td>
	</tr>
  <tr class="trOdd">
  	<td class="noBorder" style="width:6%; text-align:left"></td>
  	<td class="noBorder" style="width:60%; text-align:left">  	
    	<input id="submit-btn" name="submit-btn" type="submit" class="btn btn-primary" value="设置">
    </td>
  </tr>
  <%
  		String res = request.getParameter("res");
  		if (res != null) {
  			if (res.equals("0")) {
  %>
  <tr class="trOdd">
  	<td class="noBorder" style="width:6%; text-align:left"></td>
  	<td class="noBorder" style="width:60%; text-align:left">
  		 <label style="color:green; font-weight:bold">设置成功！</label> 
  	</td>
  </tr>
  <%
  			} else if (res.equals("1")) {
  %>
  <tr class="trOdd">
  	<td class="noBorder" style="width:6%; text-align:left"></td>
  	<td class="noBorder" style="width:60%; text-align:left">
  		 <label style="color:red; font-weight:bold">最小投放间隔不能为空！</label> 
  	</td>
  </tr>
  <%
  		   } else if (res.equals("2")) {
  
  %>
  <tr class="trOdd">
  	<td class="noBorder" style="width:6%; text-align:left"></td>
  	<td class="noBorder" style="width:60%; text-align:left">
  		 <label style="color:red; font-weight:bold">用户骚扰度不能为空！</label> 
  	</td>
  </tr>
  <%     }
  		   }
  %>
</tbody>
</table>
</form>    	
    	
    <%	
	}catch(Exception e){
	%>
	
	
	<h2 class="sdkH2">服务器内部错误</h2>
	<div class="explainCon">
	<p>无法连接ZooKeeper</br></p>
    <p><span style="color:#DB4701">请检查网络配置</span></p>
	</div>	
	
	<%	
	}
	%>


</div>	
</body>
