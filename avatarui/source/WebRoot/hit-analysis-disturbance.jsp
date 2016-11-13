
<head>
<title>营销投放管理平台</title>

</head>
<body data-main="script/sdk/hitanalysis/sdkUser.js?20131223">

<div class="wrap">
		<div class="crumb">
				<h1><span id="ReportAnchor"></span> 用户打扰</h1>
				<span class="reportTimeTip">本报表为即席查询，支持实时数据查询</span>
				<input type="hidden" value="用户打扰" id="reportTypeCnName"/>
				<input type="hidden" value="UserDisturbance" id="reportTypeEnName"/>
			</div>
			
			


	
			<div class="filterOpt">
				<div class="dateFilter">
					<dl id="DateList">
						<dd><a href="javascript:;" dateInterval="1" iconleft="11">昨天</a></dd>
						<dd class="selected"><a href="javascript:;" dateInterval="7" iconleft="91">最近七天</a></dd>
						
						<div class="iconSelect"></div>
					</dl>
					
					<a href="javascript:;" id="ReportHelp" class="reportHelp">报表解读</a>
					<div id="DateCalendar">
						<input type="text" class="calendar" id="Calendar" onkeydown="return false;" />
						<input type="hidden" id="FixedDate"/>
					</div>
				</div>
			</div>
	 		<h2 class="globalTitle">明细数据</h2>
	 		<div class="globalTab">
				<ul>
					<li index="hit_pv" class="selected"><a href="javascript:;">用户打扰</a></li>
				</ul>
			</div>
			
			<div class="maxTable">
				<div class="tableControl">
                   
					<div class="tableMode">
						<a href="javascript:;" class="first" mode="data" tipboxtext="表格显示"><i class="data"></i></a>
						<a href="javascript:;" class="active" mode="pie" tipboxtext="饼图显示"><i class="pie"></i></a>
						<a href="javascript:;" mode="performance" tipboxtext="柱状图显示"><i class="performance"></i></a>

					</div>
				</div>
				<div class="datagridWrap">
					<div id="Datagrid"></div>
				</div>
			</div>

		</div>



<div id="Help" style="display:none;">
	<h2 class="sdkH2">报表描述</h2>
	<div class="explainCon">
	<p>未投放原因代码含义</br></p>
<p><span style="color:#DB4701">0 成功投放</span></p>
<p><span style="color:#DB4701">1 请求过频</span></p>
<p><span style="color:#DB4701">2 非投放时段</span></p>
<p><span style="color:#DB4701">3 投放过频</span></p>
<p><span style="color:#DB4701">4 无满足条件的广告</span></p>
<p><span style="color:#DB4701">5 用户信息不存在</span></p>
<p><span style="color:#DB4701">6 调用推送网关失败</span></p>
	</div>

	 
	 	
</div>
</div>
</body>
