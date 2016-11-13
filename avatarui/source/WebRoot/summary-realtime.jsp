
<head>
<title>营销投放管理平台</title>
<style type="text/css">
.realHeader{
    height:50px;
  background-color: #2972bc;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#2972bc), to(#145ca6));
  background-image: -webkit-linear-gradient(top, #2972bc, #145ca6);
  background-image:    -moz-linear-gradient(top, #2972bc, #145ca6);
  background-image:      -o-linear-gradient(top, #2972bc, #145ca6);
  background-image:         linear-gradient(to bottom, #2972bc, #145ca6);
}
.realHeader .con{width:1280px; height: 50px; }

.realLeft{float:left; width:220px;}

.realRight{margin-top:15px;}



/* 实时仪表盘 */
.realMeter{ float:right; width:310px; height:300px; border:1px solid #E4EBF3; background: #F4F8FB; -webkit-border-radius:5px; border-radius:5px;}
.realMeter .meterOverviewNum{ line-height: 60px; color: #073073; font-family: Impact; font-size: 48px; text-align: center;}
.realMeter .meterCon{ width:200px; height:150px; margin:0 auto;}
.realMeter .meterMax{color:#777; text-align: center}


/* 实时曲线图 */
.realLine{ height:300px; margin-right: 320px;  background: #E2EFF8; border:1px solid #D6E6F3; -webkit-border-radius:5px; border-radius:5px;}
.realLine .tab{ height:43px; margin-top:2px; border-bottom:1px solid #D5E5F4;}
.realLine .tab li{ float:left; width:150px; height:43px; margin-left:10px; line-height:42px; font-size: 14px; text-align: center; }
.realLine .tab li a{ color:#1366aa;}
.realLine .tab li.active{ width:148px; height:42px; line-height:40px; background: #fff; border:1px solid #D5E5F4; border-bottom:1px solid #fff; -webkit-border-radius:5px 5px 0 0; border-radius:5px 5px 0 0;}
.realLine .tab li.active a{ color:#555;}

.realLine .tab li:hover a{text-decoration:underline;}


.lineChart{height:254px; background:#fff; -webkit-border-radius:0 0 5px 5px; border-radius:0 0 5px 5px; text-align: center;}

.chartToolTip{width:133px; height:48px; padding:4px 0 0 51px; background: url(images/realtime/real_chart_bg.png);}
.chartToolTip .pointValue{ font-size:14px; line-height: 26px; color:#b84303; font-family:Verdana;}
.chartToolTip .pointDate{ line-height: 18px; font-size: 11px; color:#fff; font-family:Verdana; -webkit-text-size-adjust:none;}

.meterTitle{ width:70px; height:24px; margin:10px auto; padding-left:18px; background: url(images/realtime/icon_user.jpg) 0 center no-repeat; line-height: 24px; font-size:14px; color:#7f9dcf;}
.meterTitle1{ width:200px; height:24px; margin:10px auto; background: url(images/realtime/icon_user.jpg) 0 0 no-repeat;}
.realDetail{ height:320px; margin-top:20px; background: #F4F8FB; border:1px solid #E4EBF3; -webkit-border-radius:5px; border-radius:5px;}



.realDetail .leftTd{ height:285px; background: url(images/realtime/real_detail_bg.png) right 0 no-repeat;}
.realDetail .rightTd{ height:285px; background: url(images/realtime/real_detail_bg.png) left -285px no-repeat;}

/* 实时环状图 */
.realDonutWrap{width:350px; }
.realDonut{ float:left; position: relative; width:150px; margin:0 12px;}
.realDonutNewUser{ position: absolute;}

.realDonut .newUser{position: absolute; top:30px; left:0; width:150px;}
.realDonut .newUserIcon{width:31px; height:34px; margin:0 auto; background:url(images/realtime/icon_person_big.jpg);}
.realDonut .newUserNum{ height:58px; line-height: 40px; color:#1b64ae; font-size: 30px; font-family: Impact; text-align: center;}
.realDonut .newUserTxt{ font-size:14px; color:#7F9DCF; text-align: center;}
.realDonut .newUserMax{ margin-top:10px; color:#777; text-align: center;}

.realDonut .newUserRatePerson{ width:40px; height:17px; margin:3px auto 0; background: url(images/realtime/icon_person_small.png) right 0}
.realDonut .newUserRatePersonCon{width:0; height:17px; background: url(images/realtime/icon_person_small.png)}
.realDonut .newUserRateReal{height:46px; line-height:44px; color:#1b64ae; font-size: 30px; font-family: Impact; text-align: center;}
.realDonut .newUserRateTxt{font-size:14px; color:#7F9DCF; text-align: center;}

/* 累计 */
.realAccum{margin:15px auto;}
.realAccum dl{ clear: both; margin-bottom:10px; overflow: hidden;}
.realAccum dl dt{ float: left; width:45px; height:28px; background: url(images/realtime/icon_real.jpg) no-repeat;}
.realAccum dl dt.dt1{ height:40px; background-position: 0 0;}
.realAccum dl dt.dt2{ height:28px; background-position: 0 -40px;}
.realAccum dl dt.dt3{ height:29px; background-position: 0 -68px;}
.realAccum dl dd{ float: left; }
.realAccum dl dd h2{ margin:0; font-size:14px; color:#7f9dcf;}
.realAccum dl dd p{ height:40px; font-size:24px; font-family: Impact; color:#073073;}
.realAccum dl dd p.p1{height:70px; line-height:60px; font-size:48px;}

/* 温度计 */
.realTherm{ margin:0 auto;width:280px;}
.thermometer{ float:left; width:110px; margin:0 15px;}
.thermometer h2{ margin:0; line-height:18px; font-size:14px; color:#7F9DCF;}
.thermometer h3{font-size:18px;  font-family:Impact; color:#073073;}
.therm{ position: relative; width:39px; height:170px;}
.therm .icon{ position:absolute; bottom:0; left:0; width:39px; height:39px; background: url(images/realtime/thermometer_bg.png); z-index: 1;}
.thermPillar{ position:relative; float:left; width:22px; height:150px; left:8px; background: url(images/realtime/thermometer_bg.png) -260px 0; border:1px solid #CBCBCB; -webkit-border-radius:4px; border-radius:4px;}
.thermometer .staticValue{margin-top:5px; color:#777;}

.thermPillar .realValue{position: absolute; left:-1px; bottom:0; width:22px; height:0; background:url(images/realtime/thermometer_bg.png); border-bottom:0; -webkit-border-radius:4px; border-radius:4px;}
.thermPillar .lastValue{ position: absolute; left:23px; bottom:0; width:5px; height:0; background:url(images/realtime/thermometer_bg.png); border-bottom:0;}
.thermPillar .lastValueTip{ display: none; position:absolute; left:5px; bottom:0; width:81px; height:58px; padding:5px; background:url(images/realtime/thermometer_bg.png);}

.thermBlue .icon{ background-position: -39px 0}
.thermOrange .thermPillar .realValue{ background-position:-282px 0; border:1px solid #CD9447;}
.thermBlue .thermPillar .realValue{ background-position:-309px 0; border:1px solid #6AA3D0;}

.thermOrange .thermPillar .lastValue{ background-position:-304px 0; border-top:1px solid #E3C69C; border-right:1px solid #E3C69C; -webkit-border-radius:0 2px 0 0; border-radius:0 2px 0 0;}
.thermBlue .thermPillar .lastValue{ background-position:-331px 0; border-top:1px solid #A2C0D8; border-right:1px solid #A2C0D8; -webkit-border-radius:0 2px 0 0; border-radius:0 2px 0 0;}

.thermOrange .thermPillar .lastValueTip{ background-position: -78px 0; color:#b84303;}
.thermBlue .thermPillar .lastValueTip{ background-position: -169px 0; color:#4989bc;}
.solution{text-decoration:underline;}
.solution:hover{color:red;text-decoration:underline;}

.lineChart .btn{padding:2px 8px; font-size:12px;}
.historyValue{ color:#333;}
.historyValue .fontOrange{color:#073073; line-height:20px;}
.historyValue .fontBlue{color:#b84303;}
</style>
</head>

<body data-main="script/sdk/sdkRealtime.js?20131223">

       <div class="crumb">
            <h1><span id="ReportAnchor"></span> 实时数据</h1>
            <span class="reportTimeTip" id="ReportTimeTip">本报表为即席查询，支持实时数据查询</span>            
        </div>
        
           <!--        -->  

             <div class="maxTable">
				<div class="tableControl">

					<div style="float:left; margin:3px 0 0 15px; line-height:25px;">未投放原因：</div>
					<div style="float:left;"><input type="text" style="height:16px; padding:2px 4px; line-height:18px; margin-top: 5px;" class="search hitResultContent"></div>
						
                <input type="button" id="SearchBtn" class="btn" style="margin-left: 5px;" value="查 询" />														        
                 </div>

              </div>        
                             


        
        <div class="noDataAlert" id="NoDataAlert" style="display:none; width:600px;">
        很遗憾，您的浏览器不支持HTML5，请使用IE9+，Firefox、Chrome或safari浏览器!</p>
        </div>
        <div class="realRight" id="RealWrap" align="center">


            <div class="realMeter">
                           <div class="realTherm">
                                <div class="thermometer" id="HitPVRealTherm">
                                    <h2>投放量</h2>
                                    <h3 class="real"></h3>
    
                                    <div class="therm thermOrange">
                                        <div class="icon"></div>
                                        <div class="thermPillar">
                                            <div class="realValue"></div>
                                            <div class="lastValue"></div>
                                            <div class="lastValueTip">昨天<br/><b class="last"></b></div>
                                        </div>
                                    </div>
    
                                    <div class="staticValue">
                                        <p>最近7天最高纪录</p>
                                        <b class="max" id="HitPVMax"></b>
                                    </div>
                                </div>
    
                                <div class="thermometer" id="HitUVRealTherm">
                                    <h2>投放用户量</h2>
                                    <h3 class="real"></h3>
    
                                    <div class="therm thermBlue">
                                        <div class="icon"></div>
                                        <div class="thermPillar">
                                            <div class="realValue"></div>
                                            <div class="lastValue"></div>
                                            <div class="lastValueTip">昨天<br/><b class="last"></b></div>
                                        </div>
                                    </div>
    
                                    <div class="staticValue">
                                        <p>最近7天最高纪录</p>
                                        <b class="max" id="HitUVMax"></b>
                                    </div>
                                </div>
                                
                                                                
                            </div>
            </div>
        
    
            <div class="realLine">
                <div class="tab">
                    <ul>
                        <li class="active" index="hit_pv"><a href="javascript:;">投放量</a></li>
	                    <li index="hit_uv"><a href="javascript:;">投放用户量</a></li>    
                        <li index="pv"><a href="javascript:;">访问量</a></li>
                        <li index="uv"><a href="javascript:;">访问用户量</a></li>
                    </ul>
                </div>
                <div class="lineChart" style="position:relative;">
                    <div style="display:block; position:absolute; top:0; right:0; z-index:1000;">
						<a href="javascript:;" class="btn btnFirst btnPrimary" id="ChartRealtime">实时</a><a href="javascript:;" class="btn btnInside" id="ChartAllDay">历史数据</a>
					</div>
					<div id="RealLine" style="position:absolute; left:0; top:0; width:100%"></div>
					<div id="AllDayLine" style="display:none; position:absolute; left:0; top:0; width:100%"></div>
                </div>
            </div>
    
            <div class="realDetail">
                <table colspan="0" colpadding="0" border="0" width="100%" >
                    <tr>
                        <td class="leftTd" width="33%" align="center">
                            <div class="realDonutWrap">
                                <div class="realDonut">
                                    <canvas width=150 height=150 id="RealDonutHitPV"></canvas>
    
                                    <div class="newUser">
                                        <div class="newUserRatePerson" >
                                            <div class="newUserRatePersonCon" id="HitPVRatePerson"></div>
                                        </div>
                                        <div class="newUserRateReal"><span id="HitPVRateReal"></span> %</div>
                                        <div class="newUserRateTxt">投放量比例</div>
                                    </div>
                                    <div class="newUserMax">
                                        最近7天最高纪录<br/>
                                        <b id="HitPVRateMax"></b><b>%</b>
                                    </div>
                                </div>                                
                                <div class="realDonut">
                                    <canvas width=150 height=150 id="RealDonutHitUV"></canvas>
    
                                    <div class="newUser">
                                        <div class="newUserRatePerson" >
                                            <div class="newUserRatePersonCon" id="HitUVRatePerson"></div>
                                        </div>
                                        <div class="newUserRateReal"><span id="HitUVRateReal"></span> %</div>
                                        <div class="newUserRateTxt">投放用户量比例</div>
                                    </div>
                                    <div class="newUserMax">
                                        最近7天最高纪录<br/>
                                        <b id="HitUVRateMax"></b><b>%</b>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <!-- 
                        <td class="centerTd" width="33%" align="center">
                            <div class="realAccum">
                                <dl>
                                    <dt class="dt2"></dt>
                                    <dd>
                                        <h2>累计投放量</h2>
                                        <p  id="AccumHitPV"></p>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="dt3"></dt>
                                    <dd>
                                        <h2>累计投放用户量</h2>
                                        <p id="AccumHitUV"></p>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="dt2"></dt>
                                    <dd>
                                        <h2>累计访问量</h2>
                                        <p id="AccumPV"></p>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="dt3"></dt>
                                    <dd>
                                        <h2>累计访问用户量</h2>
                                        <p id="AccumUV"></p>
                                    </dd>
                                </dl>                                
                            </div>
                        </td>
                         -->
                        <td class="rightTd" width="33%" align="center">
                            <div class="realTherm">
                                
                                <div class="thermometer" id="PVRealTherm">
                                    <h2>访问量</h2>
                                    <h3 class="real"></h3>
    
                                    <div class="therm thermOrange">
                                        <div class="icon"></div>
                                        <div class="thermPillar">
                                            <div class="realValue"></div>
                                            <div class="lastValue"></div>
                                            <div class="lastValueTip">昨天<br/><b class="last"></b></div>
                                        </div>
                                    </div>
    
                                    <div class="staticValue">
                                        <p>最近7天最高纪录</p>
                                        <b class="max" id="PVMax"></b>
                                    </div>
                                </div>
    
                                <div class="thermometer" id="UVRealTherm">
                                    <h2>访问用户量</h2>
                                    <h3 class="real"></h3>
    
                                    <div class="therm thermBlue">
                                        <div class="icon"></div>
                                        <div class="thermPillar">
                                            <div class="realValue"></div>
                                            <div class="lastValue"></div>
                                            <div class="lastValueTip">昨天<br/><b class="last"></b></div>
                                        </div>
                                    </div>
    
                                    <div class="staticValue">
                                        <p>最近7天最高纪录</p>
                                        <b class="max" id="UVMax"></b>
                                    </div>
                                </div>
                                                                
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>



<div id="Help" style="display:none">
    <div style="padding:5px;border-bottom:1px dashed #ccc;">
        <span style="font-size:16px;font-weight:bold">问题和现象:</span><br/>
        <span style="font-size:14px;line-height:25px;padding-left:10px;">用的明明就是IE9，还提示更换浏览器,出现如下提示：</span><br/><img src="images/error.jpg"/>
    </div>
    <div style="padding:5px;border-bottom:1px dashed #ccc;">
        <span style="font-size:16px;font-weight:bold;line-height:30px">解决方案:</span><br/>
        <span style="font-size:14px;line-height:25px;padding-left:10px">1.打开IE9浏览器，在菜单"Tools"中选中"F12 developer tools"(或直接按"F12"),调出HTML，CSS及JavaScript调试窗口；</span><br/>
        <span style="font-size:14px;line-height:25px;padding-left:10px">2.选择 "浏览器模式" ，选中 "Internet Explorer9(9)" 即可。</span>
        <img src="images/ie9.jpg"/>
    </div>
</div>


</body>
