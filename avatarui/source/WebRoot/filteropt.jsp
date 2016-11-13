
<div class="crumb">
            <h1><span id="ReportAnchor"></span> 访问概况</h1>
            <span class="reportTimeTip" id="ReportTimeTip">本报表为即席查询，支持实时数据查询</span>
        </div>
<div class="filterOpt">
            <div class="dateFilter">
                <dl id="DateList">
                    <dd class=""><a href="javascript:;" dateinterval="1" iconleft="11">昨天</a></dd>
                    <dd class="" id="DateSeven"><a href="javascript:;" dateinterval="7" iconleft="91">最近七天</a></dd>
                    <dd id="DateTotal" class="selected"><a href="javascript:;" dateinterval="all" iconleft="165">累计</a></dd>
                    <div class="iconSelect iconSelectBlue" style="left: 165px;"></div>
                </dl>
                <div class="tabTag">
                    <ul id="Tab">
                        <li class="current" page="old"><s></s><span><i class="icon_1"></i>所有用户</span><b></b></li>
                        <li class="currentIndex1" page="reg"><s></s><span><i class="icon_2"></i>注册用户</span><b></b></li>
                    </ul>
                </div>
                <a href="javascript:;" id="ReportHelp" class="reportHelp">报表解读</a>
                <div id="DateCalendar"><input type="text" onkeydown="return false;" id="Calendar" class="calendar originDate calendarCompare" interval="custom" style="margin-top: 0px;"><input type="hidden" id="FixedDate" value="2012-05-01 至 2014-04-27"></div>
            </div>
            <div class="dimensionFilter">
                
                <div id="RegOpt">
                    <label>注册：</label>
                    <div id="AppRegOpt" class="opt chosen"><div class="dataSelected" style="padding-right: 20px; height: 24px;"><label class="fixedTextInit"></label><a href="javascript:;" class="fixedText">所有</a><input type="hidden" class="fixedId" value="-1"><input type="hidden" class="fixedVal" value="所有"><a href="javascript:;" class="clearSelected"></a><b class="chosenArrow"></b></div><div class="chosenCon chosenConFFF" style="width: 200px; display: none;"><div class="searchKeyword"><input type="text" class="keywords" autocomplete="off" placeholder="关键字搜索…"><div class="dataList keywordsDataList"><ul></ul></div></div><div class="dataList dataListAll"><ul><li thisval="所有" thisid="-1">所有</li><li thisid="1" thisval="注册" class="odd">注册</li><li thisid="0" thisval="非注册">非注册</li></ul></div></div></div>
                    <div id="AppRegOptTip"></div>
                </div>
                <input type="button" id="SearchBtn" class="btn" value="查 询">
                <span class="multiDataLoading" style="display: none;">数据加载中...</span>
            </div>
        </div>