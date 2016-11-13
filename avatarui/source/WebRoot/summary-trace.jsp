
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
            <h1><span id="ReportAnchor"></span> 跟踪数据</h1>
            <span class="reportTimeTip" id="ReportTimeTip">本报表为即席查询，支持实时数据查询</span>
        </div>
        
        <div class="filterOpt">
            <div class="dateFilter">
                <dl id="DateList">
                    <dd><a href="javascript:;" dateInterval="1" iconleft="11">昨天</a></dd>
                    <dd class="selected" id="DateSeven"><a href="javascript:;" dateInterval="7" iconleft="91">最近七天</a></dd>
                    <!-- <dd id="DateTotal"><a href="javascript:;" dateInterval="all" iconleft="165">累计</a></dd>  -->
                    <div class="iconSelect iconSelectBlue"></div>
                </dl>
                <div class="tabTag">
                    <ul id="Tab">
                        <li class="current" page="old"><s></s><span><i class="icon_1"></i>所有用户</span><b></b></li>
                      <!--    <li class="currentIndex1" page="reg"><s></s><span><i class="icon_2"></i>注册用户</span><b></b></li> -->
                    </ul>
                </div>
                <a href="javascript:;" id="ReportHelp" class="reportHelp">报表解读</a>
                <div id="DateCalendar">
                    <input type="text" class="calendar" id="Calendar" onkeydown="return false;" />
                    <input type="hidden" id="FixedDate"/>
                </div>
            </div>
            <div class="dimensionFilter">
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
                <input type="button" id="SearchBtn" class="btn" value="查 询" />
                <span class="multiDataLoading">数据加载中...</span>
            </div>
        </div>
        <div  id="Page">

        
        <div style="position:relative;">
            <h2 class="globalTitle" id="DatagridDetailH2">明细数据</h2>
            <a href="javascript:;" id="DatagridDetailFold" style="position:absolute; right:15px; top:2px; line-height:30px">收起</a>
            <a href="javascript:;" id="ExportExcel" class="exportExcel" style="position:absolute; right:60px; top:8px;">导出Excel数据</a>
        </div>
        <div id="DatagridDetailCon" style="margin-top:8px;">
            <div id="DatagridDetail"></div>
        </div>
        

    </div>
  






<div id="Help" style="display:none;">
<h2 class="sdkH2">报表描述</h2>
<div class="explainCon">
<p>用户访问概况，这里有用户使用每一个应用程序的基本情况。大体包括有应用的启动次数，启动用户数，新用户数，新用户比例，累计用户和应用的平均使用时长。图文并茂的设计，一定可以让你对原本纷繁枯燥的用户数据，有一个清晰明确的了解，从而指导进一步的业务推广和追踪运营的状况。</p>
<p id="SDACexplain" style="display:none" ><b>SDAC+注册条件</b><br/>&nbsp;&nbsp;I) 产品开机连续2小时以上<br/>&nbsp;&nbsp;II) 在这2小时之内或者之后，呼入或者呼出电话一次（非手机产品不做要求）<br/>&nbsp;&nbsp;III) 呼叫的电话号码长度大于等于7位，电话接通（非手机产品不做要求）<br/>&nbsp;&nbsp;以上为发送判断条件为“并且”的关系，同时满足这些条件，则开始进行SDAC+正式信息注册，即HTTP的注册。</p>  
</div>
<h2 class="sdkH2">指标解读</h2>
<div class="explainCon">
<dl>
<dt>浏览量：</dt>
<dd>用户访问一次应用的任意一个Activity为一次浏览量，一般指PV</dd>
</dl>
<dl class="odd">
<dt>启动次数:</dt>
<dd>用户打开应用主界面的次数</dd>
</dl>
<dl>
<dt>启动用户（UV）:</dt>
<dd>指定时段内使用过该应用的独立用户数（去重），又称活跃用户</dd>
</dl>
<dl class="odd">
<dt>新用户:</dt>
<dd>时段内第一次使用应用的独立用户数</dd>
</dl>
<dl>
<dt>新用户比例:</dt>
<dd>新用户数/启动用户数</dd>
</dl>
<dl class="odd">
<dt>累计用户活跃率:</dt>
<dd>启动用户/累计用户</dd>
</dl>
<dl>
<dt>单次平均使用时长:</dt>
<dd>用户平均每次使用应用的时间</dd>
</dl>
<dl class="odd">
<dt>累计浏览量：</dt>
<dd>截止到昨天，该应用浏览量总数</dd>
</dl>
<dl>
<dt>累计用户：</dt>
<dd>截止到昨天，使用过应用的所有独立用户总数</dd>
</dl>
<dl class="odd">
<dt>累计启动：</dt>
<dd>截止到昨天，该应用被启动的总次数</dd>
</dl>
<dl>
<dt>现存用户：</dt>
<dd>截止到昨天，各版本中保留下来的累积用户数（去除了升级离开的用户）</dd>
</dl>
<dl>
<dt>版本升级用户：</dt>
<dd>时间段内，从其他版本升级过来的用户数（他是新用户的一个组成部分，新用户=升级用户+直接首次使用该版本新用户）</dd>
</dl>
<dl>
<dt>渠道升级用户：</dt>
<dd>时间段内，从其他渠道升级过来的用户数（他是新用户的一个组成部分，新用户=升级用户+直接首次使用该渠道的新用户；但是对于连续多天进行降级升级的用户，升级用户会被记录多次，例如：第一天是4.0，第二天升级为5.0，那么5.0里面新用户会+1，升级用户+1；第二天用户降级为4.0，第三天又升级为5.0，这个时候新用户不会+1，升级用户会+1）</dd>
</dl>
</div>
</div>
</body>
