
<head>
<title>营销投放管理平台</title>

<style type="text/css">
.compareDateTrend{position:relative; z-index:1; float:right; margin:3px 20px 0 0;}
#TrendCompareWrap .calendarCompareActive{margin-top:-9px}
.tabTag{ float:right; position: relative; height:39px; margin:-6px 0 0 30px; display:inline; padding-left:30px;}
.tabTag li{ position: relative; z-index:1; float: left; height:31px; margin-top:7px; margin-left:-35px; cursor: pointer;}
.tabTag li s, .tabTag li span, .tabTag li b{ float: left; height:31px; background: url(images/tab_tag_bg.png);}
.tabTag li s{ width:38px;}
.tabTag li span{ height:28px; padding-top:3px; background-position: 0 -31px; line-height: 28px; color:#1366aa; font-size:14px;}
.tabTag li span i{float: left; width:17px; height:17px; margin:5px 3px 0 0; display: inline; background: url(images/icon_tab_tag.png);}
.tabTag li span i.icon_1{background-position: 0 0;}
.tabTag li span i.icon_2{background-position: -17px 0;}
.tabTag li span i.icon_3{background-position: -34px 0;}
.tabTag li b{ width:38px; background-position:0 -62px;}

.tabTag li.current{height:39px; margin-top:0; z-index:3;}
.tabTag li.currentIndex1{z-index:2;}
.tabTag li.current s{ height:39px; background-position: 0 -93px}
.tabTag li.current span{ height:36px; background-position: 0 -132px; line-height: 36px; color:#666;}
.tabTag li.current span i{margin-top:9px;}
.tabTag li.current span i.icon_1{background-position: 0 -17px;}
.tabTag li.current span i.icon_2{background-position: -17px -17px;}
.tabTag li.current span i.icon_3{background-position: -34px -17px;}
.tabTag li.current b{ height:39px; background-position: 0 -171px;}
</style>
</head>
<body data-main="script/sdk/sdkInterview.js?20140219">

        <div class="crumb">
            <h1><span id="ReportAnchor"></span> 投放概况数据</h1>
            <span class="reportTimeTip" id="ReportTimeTip">本报表为即席查询，支持实时数据查询</span>
        </div>
        
        <div class="filterOpt">
            <div class="dateFilter">
                <dl id="DateList">
                    <dd><a href="javascript:;" dateInterval="1" iconleft="11">昨天</a></dd>
                    <dd class="selected" id="DateSeven"><a href="javascript:;" dateInterval="7" iconleft="91">最近七天</a></dd>
						<!-- <dd><a href="javascript:;" dateInterval="all" iconleft="165">累计</a></dd> -->
                      
                    <div class="iconSelect iconSelectBlue"></div>
                    
                    <!-- <div class="iconSelect"></div> -->
                </dl>
                <!-- 
                <div class="tabTag">
                    <ul id="Tab">
                        <li class="current" page="old"><s></s><span><i class="icon_1"></i>所有用户</span><b></b></li>
                        <li class="currentIndex1" page="reg"><s></s><span><i class="icon_2"></i>注册用户</span><b></b></li>  
                    </ul>
                </div>
                 -->
                <a href="javascript:;" id="ReportHelp" class="reportHelp">报表解读</a>
                <div id="DateCalendar">
                    <input type="text" class="calendar" id="Calendar" onkeydown="return false;" />
                    <input type="hidden" id="FixedDate"/>
                </div>
            </div>

            <div class="dimensionFilter">
                        <!-- 
                <label>版本：</label>
                <div id="AppVersionOpt" class="opt"><div class="smallLoading"></div></div>
                <label>渠道：</label>
                <div id="AppChannelOpt" class="opt"><div class="smallLoading"></div></div>
                <label>设备型号：</label>
                <div id="AppModelOpt" class="opt"><div class="smallLoading"></div></div>
                <div id="RegOpt">
                    <label>注册：</label>
                    <div id="AppRegOpt" class="opt"><div class="smallLoading"></div></div>
                    <div id="AppRegOptTip"></div>
                </div>
                             -->
             <div class="maxTable">
				<div class="tableControl">
					<div style="float:left; margin:3px 0 0 15px; line-height:25px;">广告ID：</div>
					<div style="float:left;"><input type="text" style="height:16px; padding:2px 4px; line-height:18px; margin-top: 5px;" class="search ADIDContent"></div>
					<!-- <div style="display: block;" class="searchBtn ADIDSearch"><i class="searchBtnInner"></i></div>	 -->
					
					<div style="float:left; margin:3px 0 0 15px; line-height:25px;">PID：</div>
					<div style="float:left;"><input type="text" style="height:16px; padding:2px 4px; line-height:18px; margin-top: 5px;" class="search PIDContent"></div>
					<!-- <div style="display: block;" class="searchBtn PIDSearch"><i class="searchBtnInner"></i></div>	 -->	
					
					<div style="float:left; margin:3px 0 0 15px; line-height:25px;">未投放原因：</div>
					<div style="float:left;"><input type="text" style="height:16px; padding:2px 4px; line-height:18px; margin-top: 5px;" class="search hitResultContent"></div>
					<!-- <div style="display: block;" class="searchBtn hitResultSearch"><i class="searchBtnInner"></i></div>  -->							        
						
					
                <input type="button" id="SearchBtn" class="btn" value="查 询" />
                <!-- <span class="multiDataLoading">数据加载中...</span>  -->															        
                 </div>

              </div>        
                             

            </div>

        </div>
        <div  id="Page">
        <h2 class="globalTitle">基本统计</h2>
        
        <div id="DatagridInterview"></div>

<!--       
        <h2 class="globalTitle">整体数据</h2>
        
        <table cellpadding="0" cellspacing="0" class="accumTableNew" id="AccumTable">
            <tr>
                <td class="first">
                    <div style="margin:0 auto; width:70px; height:60px;">
                        <img src="images/icon_people.png"/>
                    </div>
                    <div class="theTitle" style="padding:0">新用户</div>
                    <div class="newUserFont" id="tnu"></div>
                    <div class="theTitle" style="padding:0"><span id="AccumRegText" style="display:none">新注册用户 / </span>累计用户</div>
                    <div class="smallFont"><span id="AccumReg" style="display:none"><span id="pcm"></span> / </span><span id="tu"></span></div>
                </td>
                <td valign="top">
                    <div class="theTitle">活跃率</div>
                    <div class="bigFont"><span id="avgar"><div class="smallLoading"></div></span>%</div>
                    
                    <ul>
                        <li><label>日均</label><span class="smallFont" id="avgau"><div class="smallLoading"></div></span></li>
                        <li><label>上周</label><span class="smallFont" id="wau"><div class="smallLoading"></div></span></li>
                        <li><label>上月</label><span class="smallFont" id="mau"><div class="smallLoading"></div></span></li>
                    </ul>
                </td>
                
                <td valign="top">
                    <div class="theTitle">浏览量</div>
                    <div class="bigFont" id="pv"></div>
                    
                    <ul>
                        <li><label>单次</label><span class="smallFont" id="ostpv"><div class="smallLoading"></div></span></li>
                        <li><label>日均</label><span class="smallFont" id="avgpv"><div class="smallLoading"></div></span></li>
                        <li><label>用户日均</label><span class="smallFont" id="oudpv"><div class="smallLoading"></div></span></li>
                    </ul>
                    
                </td>
                
                <td valign="top">
                    <div class="theTitle">启动次数</div>
                    <div class="bigFont" id="tst"></div>
                    
                    <ul>
                        <li><label>日均</label><span class="smallFont" id="avgst"><div class="smallLoading"></div></span></li>
                        <li><label>用户日均</label><span class="smallFont" id="oudst"><div class="smallLoading"></div></span></li>
                    </ul>
                </td>
                
                <td valign="top">
                    <div class="theTitle">30天流失用户/流失率</div>
                    <div class="bigFont"><span id="omlu"><div class="smallLoading"></div></span> / <span id="omlr"><div class="smallLoading"></div></span>%</div>
                    
                    <div class="theTitle">90天流失用户/流失率</div>
                    <div class="bigFont"><span id="tmlu"><div class="smallLoading"></div></span> / <span id="tmlr"><div class="smallLoading"></div></span>%</div>
                </td>
                
                <td valign="top" class="last">
                    <div class="theTitle">单次使用时长</div>
                    <div class="bigFont" style="line-height:24px;"><span id="avgts"><div class="smallLoading"></div></span>秒</div>
                    <div class="theTitle">用户日均使用时长</div>
                    <div class="bigFont" style="line-height:24px;"><span id="oudts"><div class="smallLoading"></div></span>秒</div>
                    <div class="theTitle">错误总数</div>
                    <div class="bigFont" style="line-height:24px;" id="enum"><div class="smallLoading"></div></div>
                </td>
            </tr>
        </table>
        
        <table cellpadding="0" cellspacing="0" class="accumTableNew" id="AccumTableMulti" style="display:none; height:150px">
            <tr>
                <td class="first">
                    <div style="margin:0 auto; width:70px; height:60px;">
                        <img src="images/icon_people.png"/>
                    </div>
                    <div class="theTitle" style="padding:0">新用户</div>
                    <div class="newUserFont" id="AccumUserNum"></div>
                </td>
                <td valign="top">
                    <div class="theTitle">活跃率</div>
                    <div class="bigFont"><span id="dar"></span></div>

                </td>
                
                <td valign="top">
                    <div class="theTitle">浏览量</div>
                    <div class="bigFont" id="AccumPv"></div>
                    
                    <ul>
                        <li><label>单次</label><span class="smallFont" id="dtpv"></span></li>
                        <li><label>日均</label><span class="smallFont" id="dupv"></span></li>
                    </ul>
                    
                </td>
                
                <td valign="top" class="last">
                    <div class="theTitle">启动次数</div>
                    <div class="bigFont" id="AccumStartNum"></div>
                    
                    <ul>
                        <li><label>日均</label><span class="smallFont" id="dust"></span></li>
                    </ul>
                </td>
                
                <td valign="top" class="extantUserTD" style="display:none" id="AccumSingleTd">
                    <div class="theTitle">现存用户</div>
                    <div class="bigFont" style="margin-bottom:5px;"><span id="ExtantUser"></span></div>
                </td>
                
            </tr>
        </table>
   -->        
        <h2 class="globalTitle">趋势分析</h2>
        
        <div style="position:relative;">
            <div class="sdkTabs sdkTabsTrend" id="TrendTab">
                <ul>
                    <li index="0" class="active first"><a href="javascript:;">投放量</a></li>
                    <li index="1"><a href="javascript:;">投放用户量</a></li>
                    <li index="2"><a href="javascript:;">访问量</a></li>
                    <li index="3"><a href="javascript:;">访问用户量</a></li>
                    <li index="4"><a href="javascript:;" class="tipbox" tipboxtext="投放量 / 访问量">投放量比例</a></li>
                    <li index="5" class="last"><a href="javascript:;" class="tipbox" tipboxtext="投放用户量 / 访问用户量">投放用户量比例</a></li>
                </ul>
                
                <div style="float:right; margin:7px 10px 0 0;"><a href="javascript:;" class="btn btnPrimary" id="TrendCompareSwitch">对 比</a></div>  
            </div>
            
            
            <div id="TrendCompareWrap" style="display:none; position:absolute; top:0; height:30px; padding:10px 0; border:1px solid #B6D4EC; background:#F3F6FB">
                <div style="float:left; line-height:24px; font-size:14px;">
                    &nbsp;&nbsp;&nbsp;&nbsp;指标：
                    
                    <div class="normSelect" id="NormSelect1">
                        <input type="button" value="请选择指标一" class="btn btnPrimary">
                        <input type="hidden" value="0" class="fixedValue" id="Norm1" />
                        <div class="caretDropdown caret"></div>
                        <ul id="DropDownMenuChannel" class="dropDownMenu">
                            <li><a href="javascript:;" value="0">不选择</a></li>
                            <li><a href="javascript:;" value="hit_pv">投放量</a></li>
                            <li><a href="javascript:;" value="hit_uv">投放用户量</a></li>
                            <li><a href="javascript:;" value="pv">访问量</a></li>
                            <li><a href="javascript:;" value="uv">访问用户量</a></li>
                            <li><a href="javascript:;" value="hit_pv_rate">投放量比例</a></li>
                            <li><a href="javascript:;" value="hit_uv_rate">投放用户量比例</a></li>
                        </ul>
                    </div>
                    
                    对比 
                    <div class="normSelect" id="NormSelect2">
                        <input type="button" value="请选择指标二" class="btn btnPrimary">
                        <input type="hidden" value="0" class="fixedValue" id="Norm2" />
                        <div class="caretDropdown caret"></div>
                        <ul id="DropDownMenuChannel" class="dropDownMenu">
                            <li><a href="javascript:;" value="0">不选择</a></li>
                            <li><a href="javascript:;" value="hit_pv">投放量</a></li>
                            <li><a href="javascript:;" value="hit_uv">投放用户量</a></li>
                            <li><a href="javascript:;" value="pv">访问量</a></li>
                            <li><a href="javascript:;" value="uv">访问用户量</a></li>
                            <li><a href="javascript:;" value="hit_pv_rate">投放量比例</a></li>
                            <li><a href="javascript:;" value="hit_uv_rate">投放用户量比例</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="compareDateTrend" id="TrendCompareCalendar">
                    <input type="text" class="originDate" />
                    <div style="display:none" class="compareDateWrap">
                        <label>比较日期：</label>
                        <input type="text" class="compareDate" />
                    </div>
                </div>
                <a href="javascript:;" id="CloseTrendCompare"></a>
            </div>
            
            <div class="sdkTabsCon" style="height:300px; ">
                <div id="SDAC" style="position:absolute; top:50px; right:20px; z-index:1000; display:none;">
                    <input type="checkbox" id="SinglePix"/>单坐标
                </div>
                <div id="LineChart"></div>
            </div>
        </div>
        
        
        <div id="TimeTrendWrap" style="position:relative; margin-top:-10px;">
            <h2 class="globalTitle" id="TimeTrendH2">时段分布</h2>
            <!-- a href="javascript:;" id="TimeTrendFold" style="position:absolute; right:15px; top:2px; line-height:30px">收起</a> -->
            
            <div id="TimeTrendCon" style="position:relative;">
                <div class="sdkTabs" id="TimeTrendTab">
                    <ul>
                        <li id="HitPV" class="first active" >投放量</li>
                        <li id="HitUV">投放用户量</li>
                        <li id="PV">访问量</li>
                        <li id="UV">访问用户量</li>
                        <li id="HitPVRate">投放量比例</li>
                        <li id="HitUVRate" class="last" >投放用户量比例</li>
                    </ul>
                    
                     <div style="float:right; margin:6px 10px 0 0"><a href="javascript:;" id="TimeCompareSwitch" class="btn btnPrimary">时段对比</a></div> 
                    <div style="float:right; display:none; margin-right:15px;" id="TimeCompareCalendar">
                        <input type="text" class="originDate" />
                        <div style="display:none" class="compareDateWrap">
                            <label>比较日期：</label>
                            <input type="text" class="compareDate" />
                        </div>
                    </div>
                </div>
                <div class="sdkTabsCon" id="TimeLineChartWrap" style="height:270px;">
                    <div id="TimeLineChart"></div>
                </div>
            </div>
        </div>
        
        <div style="position:relative;">
            <h2 class="globalTitle" id="DatagridDetailH2">明细数据</h2>
            <a href="javascript:;" id="DatagridDetailFold" style="position:absolute; right:15px; top:2px; line-height:30px">收起</a>
            <!-- 
            <a href="javascript:;" id="ExportExcel" class="exportExcel" style="position:absolute; right:60px; top:8px;">导出Excel数据</a>
             -->
        </div>
        <div id="DatagridDetailCon" style="margin-top:8px;">
            <div id="DatagridDetail"></div>
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
