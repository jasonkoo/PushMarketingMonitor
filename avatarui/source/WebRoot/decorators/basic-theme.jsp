

<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>  

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!--  <base href="http://localhost:8080/Stream/">  -->
<title><decorator:title default="营销投放管理平台"/></title>
 <style type="text/css">
.dg .dgContentTable tr.trRealtime, .dgFirstCol .tableCon tr.trRealtime{background:#DFF0D8; font-weight:bold;}
.rightSide .totalTable td .title{color:#666;}
.timeInterval{font-size:11px; font-family:Tahoma,microsoft yahei; -webkit-text-size-adjust:none; color:#999;}
.newTd{ position:relative;}
.newTip{display:inline-block; background: url("images/report/icon_new.gif") repeat scroll 0 0 transparent; font-size: 0;
    height: 15px;
    line-height: 0;
    width: 25px;
}
#AppRegOptTip{float:left; width:13px; height:13px; margin:6px 0 0 -15px; display:inline; background:url(images/common/icon_tip_blue.gif);}
#AppRegOptTipCon{position:absolute; width:500px; height:130px; padding:3px; z-index:200000;-webkit-border-radius:5px; border-radius:5px; border:1px solid #D1BA77; background:#FFF6C3;
-webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.3);
          box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.3);
}
.rightSide h2.globalTitle{border-left: 4px solid #A7C6E4; color:#A7C6E4; font-size:18px; height:18px; line-height:18px; margin-top:20px; padding-left:5px;}
.rightSide h2.globalTitleFolded{ height:30px; padding-left:10px; background:#E2EFF8; border:1px solid #D5E5F4; line-height:30px; -webkit-border-radius:3px; border-radius:3px;}

.accumTable{ width:100%; border:1px solid #D7E4F4; background:#E9F1FC;}
.accumTable td{ padding:0 15px; background:url(images/store/daily_line.png) no-repeat right center;}
.accumTable td .item{padding:6px 0;}
.accumTable td h3{ font-weight:normal; font-size:12px; color:#8096BD}
.accumTable td .num{ line-height:30px; font-size:20px; color:#083075; font-family:Tahoma; text-shadow:0 1px 0 #fff}

#TrendTab li{padding:0 10px;}
#TrendTab li a{ padding:0; min-width:0; font-size:13px;}
#TrendTab li a:hover{color:#0D143E;}

.sdkTabs{height:42px; border-bottom:1px solid #c7c7c7;}
.sdkTabs li{ float:left; height:34px; margin-top:7px; padding:0 20px; border-left:1px solid #c7c7c7; border-top:1px solid #c7c7c7; cursor:pointer;
background-image: -webkit-gradient(linear, left top, left bottom, from(#f9f9f9), to(#ebebeb));
background-image: -webkit-linear-gradient(top, #f9f9f9, #ebebeb);
background-image:    -moz-linear-gradient(top, #f9f9f9, #ebebeb);
background-image:      -o-linear-gradient(top, #f9f9f9, #ebebeb);
background-image:         linear-gradient(to bottom, #f9f9f9, #ebebeb);
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f9f9',endColorstr='#ebebeb');
font-size:13px;
line-height:34px;

}


.sdkTabs li:hover{color:#0D143E;}

.sdkTabs li.first{
-webkit-border-radius:4px 0 0 0; border-radius:4px 0 0 0;
}

.sdkTabs li.last{
border-right:1px solid #c7c7c7;
-webkit-border-radius:0 4px 0 0; border-radius:0 4px 0 0;
}

.sdkTabs li.active{ position:relative; height:38px; margin:0 -1px -1px 0; background:#fff; filter:none; border:1px solid #f4af4c; border-top:5px solid #f4af4c; border-bottom:none;
line-height:38px;
-webkit-border-radius:0 0 0 0; border-radius:0 0 0 0;
}

.sdkTabs li a{ color:#5B636A; font-size:14px;}

.sdkTabsCon{ padding:10px; border:1px solid #c7c7c7; border-top:0}

.sdkTabsTrend li{padding:0 10px;}

#CloseTrendCompare{position:absolute; right:-8px; top:-10px; width:23px; height:23px; background:url(images/close_bg.png); cursor:pointer}
#CloseTrendCompare:hover{ background:url(images/close_bg_hover.png);}

.accumTableNew td{ width:16%; padding-left:20px; background:url("images/store/daily_line.png") right center no-repeat; text-align:left}
.accumTableNew td.first{  padding:0; background:none; border-right:1px dashed #B8D3E8; text-align:center;}
.accumTableNew td.last{ background:none;}
.accumTableNew td.extantUserTD{background:url("images/store/daily_line.png") left center no-repeat;}

.accumTableNew .theTitle{ padding-top:10px; line-height:20px; font-size:12px; color:#8FA3C4}
.accumTableNew .bigFont{ line-height:40px; color:#053172; font-size:18px; font-family:Tahoma }
.accumTableNew .smallFont{ color:#053172; font-family:Tahoma }

.accumTableNew{ width:100%; height:174px; background:#F3F6FB; border:1px solid #B6D4EE; text-align:center}
.accumTableNew ul{ width:100%; margin-top:5px;}
.accumTableNew ul li{ line-height:30px; color:#999; background:none}
.accumTableNew ul li label{ padding-right:8px;}

.accumTableNew .newUserFont{height:35px; line-height:30px; font-size:26px; color:#073073; font-family:Impact}
.normSelect{display: inline-block; position: relative; width: 185px;}
.normSelect input.btn{ width:180px; height:30px; font-family: microsoft yahei}
.normSelect .caretDropdown { position: absolute; right: 12px; top:5px;}
</style>
<link href="css/common.css?20130523" rel="stylesheet" type="text/css">
<link type="text/css" rel="stylesheet" href="chrome-extension://imamemhokkdleoelohnmkimbmpfglcil/css/capture.css">
<style id="huaban_Style">#huaban_Container {font-family: 'helvetica neue', arial, sans-serif; position: absolute; padding-top: 37px; z-index: 100000002; top: 0; left: 0; background-color: transparent; opacity: 1;hasLayout:-1;}#huaban_Overlay {position: fixed; z-index: 100000001; top: 0; right: 0; bottom: 0; left: 0; background-color: #f2f2f2; opacity: .95;}* html #huaban_Overlay {position: absolute;}#huaban_Control {position:relative; z-index: 100000; float: left; background-color: #fcf9f9; border: solid #ccc; border-width: 0 1px 1px 0; height: 200px; width: 200px; opacity: 1;}* html #huaban_Control {position:static;}#huaban_Control img {position: relative; padding: 0; display: block; margin: 82px auto 0; -ms-interpolation-mode: bicubic;}#huaban_Control a {position: fixed; z-index: 10001; right: 0; top: 0; left: 0; height: 24px; padding: 12px 0 0; text-align: center; font-size: 14px; line-height: 1em; text-shadow: 0 1px #fff; color: #211922; font-weight: bold; text-decoration: none; background: #fff url(http://huaban.com/img/fullGradient07Normal.png) 0 0 repeat-x; border-bottom: 1px solid #ccc; -mox-box-shadow: 0 0 2px #d7d7d7; -webkit-box-shadow: 0 0 2px #d7d7d7;}* html #huaban_Control a {position: absolute; width: 100%;}#huaban_Control a:hover {color: #fff; text-decoration: none; background-color: #1389e5; border-color: #1389e5; text-shadow: 0 -1px #46A0E6;}#huaban_Control a:active {height: 23px; padding-top: 13px; background-color: #211922; border-color: #211922; background-image: url(http://huaban.com/img/fullGradient07Inverted.png); text-shadow: 0 -1px #211922;}.huabanImagePreview {position: relative; padding: 0; margin: 0; float: left; background-color: #fff; border: solid #e7e7e7; border-width: 0 1px 1px 0; height: 200px; width: 200px; opacity: 1; z-index: 10002; text-align: center; overflow:hidden;}.huabanImagePreview .huabanVideoIcon {position:absolute;display:block;top:0;left:0;width:100%;height:100%;background:url(http://huaban.com/img/media_video.png) center center no-repeat;}.huabanImagePreview .huabanImg {border: none; height: 200px; width: 200px; opacity: 1; padding: 0; position: absolute; top: 0; left: 0;}.huabanImagePreview .huabanImg a {margin: 0; padding: 0; position: absolute; top: 0; bottom: 0; right: 0; left: 0; display: block; text-align: center;  z-index: 1;}.huabanImagePreview .huabanImg a:hover {background-color: #fcf9f9; border: none;}.huabanImagePreview .huabanImg .ImageToPin {max-height: 200px; max-width: 200px; width: auto !important; height: auto !important;}.huabanImagePreview img.huaban_PinIt {border: none; position: absolute; top: 82px; left: 42px; display: none; padding: 0; background-color: transparent; z-index: 100;}.huabanImagePreview strong {text-indent: -9999px; position: absolute; top: 82px; display: none; height: 32px; background: url(http://huaban.com/img/bm_pin_sprite.png?20120918) no-repeat 0 0;}.huabanImagePreview strong.huaban_ThunderPin {width: 24px; left: 52px; background-position: 0 0;}.huabanImagePreview strong.huaban_ThunderPin:hover {background-position: 0 -50px;}.huabanImagePreview strong.huaban_ThunderPin:active {background-position: 0 -100px;}.huabanImagePreview strong.huaban_Pin {width: 72px; left: 75px; background-position: -40px 0;}.huabanImagePreview strong.huaban_Pin:hover {background-position: -40px -50px;}.huabanImagePreview strong.huaban_Pin:active {background-position: -40px -100px;}.huabanImagePreview img.huaban_vidind {border: none; position: absolute; top: 75px; left: 75px; padding: 0; background-color: transparent; z-index: 99;}.huabanDimensions { color: #000; position: relative; margin-top: 180px; text-align: center; font-size: 10px; z-index:10003; display: inline-block; background: white; border-radius: 4px; padding: 0 2px;}#huaban_Button, #huaban_Button *, #huaban_Container, #huaban_Container * { -webkit-box-sizing: content-box; -moz-box-sizing: content-box; -ms-box-sizing: content-box; box-sizing: content-box;}#huaban_Button { display: none; position: absolute; z-index: 999999999 !important; color: #211922; text-shadow: 0 1px #eaeaea; font: 12px/1 'Helvetica Neue',Helvetica,Arial,Sans-serif; text-align: center; padding: 0; margin: 0; cursor: pointer;}#huaban_Button a {text-decoration: none; color: #211922; display: inline-block; text-align: center; line-height: 14px; height: 14px; border-radius: 2px; -webkit-border-radius: 2px; -moz-border-radius: 2px; -ms-border-radius: 2px; -o-border-radius: 2px; cursor: pointer; position: absolute; top: 0; left: 0; height: 14px; margin: 0 2px; padding: 5px 8px; border: 1px solid #555; border: 1px solid rgba(140, 126, 126, .5); background-color: #fff;}#huaban_Button a:hover {text-decoration: none; background-image: -webkit-linear-gradient(top, #fefeff, #efefef); background-image: -moz-linear-gradient(top, #fefeff, #efefef); box-shadow: inset 0 1px rgba(255,255,255,0.35), 0 1px 1px rgba(35,24,24,0.75); -o-box-shadow: inset 0 1px rgba(255,255,255,0.35), 0 1px 1px rgba(35,24,24,0.75); -ms-box-shadow: inset 0 1px rgba(255,255,255,0.35), 0 1px 1px rgba(35,24,24,0.75); -moz-box-shadow: inset 0 1px rgba(255,255,255,0.35), 0 1px 1px rgba(35,24,24,0.75); -webkit-box-shadow: inset 0 1px rgba(255,255,255,0.35), 0 1px 1px rgba(35,24,24,0.75);}#huaban_Button a:active {text-decoration: none; background-image: -webkit-linear-gradient(top, #fefeff, #efefef); background-image: -moz-linear-gradient(top, #fefeff, #efefef); box-shadow: inset 0 1px 2px rgba(34,25,25,0.25), 0 0 1px rgba(232,230,230,0.5); -o-box-shadow: inset 0 1px 2px rgba(34,25,25,0.25), 0 0 1px rgba(232,230,230,0.5); -ms-box-shadow: inset 0 1px 2px rgba(34,25,25,0.25), 0 0 1px rgba(232,230,230,0.5); -moz-box-shadow: inset 0 1px 2px rgba(34,25,25,0.25), 0 0 1px rgba(232,230,230,0.5); -webkit-box-shadow: inset 0 1px 2px rgba(34,25,25,0.25), 0 0 1px rgba(232,230,230,0.5);}#huaban_Button a strong {position: relative; line-height: 12px;}#huaban_Button a.thunderpin {margin-right: 0; border-right: none; width: 14px; padding: 5px 0 5px 4px; border-top-right-radius: 0; border-bottom-right-radius: 0; -webkit-border-top-right-radius: 0; -webkit-border-bottom-right-radius: 0; -moz-border-top-right-radius: 0; -moz-border-bottom-right-radius: 0; -ms-border-top-right-radius: 0; -ms-border-bottom-right-radius: 0; -o-border-top-right-radius: 0; -o-border-bottom-right-radius: 0;}#huaban_Button a.thunderpin em {background: url(http://huaban.com/img/ActionIcons10.png?20120801) no-repeat -30px 0; position: relative; display: inline-block; width: 10px; height: 10px; top: 1px; left: -2px;}#huaban_Button a.thunderpin:hover em {background-image-postion: -30px -10px;}#huaban_Button a.thunderpin:active em {background-image-postion: -30px -20px;}#huaban_Button a.pin {left: 20px; width: 64px; margin-left: 0; *margin-left: -2px; border-top-left-radius: 0; border-bottom-left-radius: 0; -webkit-border-top-left-radius: 0; -webkit-border-bottom-left-radius: 0; -moz-border-top-left-radius: 0; -moz-border-bottom-left-radius: 0; -ms-border-top-left-radius: 0; -ms-border-bottom-left-radius: 0; -o-border-top-left-radius: 0; -o-border-bottom-left-radius: 0;}.huaban_thunder_tip {position: absolute; z-index: 999999999 !important; background: #000; background: rgba(0,0,0,0.5); color: white; line-height: 16px; padding: 5px; border-radius: 2px; margin-left: 2px; }.huaban_thunder_tip a {text-shadow: none; cursor: pointer; padding: 0 4px; margin: 0 2px; color: white; font-size: 13px; background: rgba(255, 255, 255, 0.4); }.huaban_thunder_tip a:hover {color: #B90000; background: white; text-decoration: none; }.huabanImagePreview .huaban_thunder_tip {line-height: 12px; padding: 8px 10px; font-size: 14px; top: 50%; left: 50%; margin-left: -48px; margin-top: -18px;}.huabanImagePreview .huaban_thunder_tip_warning {left: 48px; height: auto; text-align: left;}.huaban_thunder_tip_success {color: #fff;font-weight: bold;}.huaban_thunder_tip p {font-weight: normal; margin-top: 2px; margin-bottom: 0; padding-left: 20px; text-align: left;}.huaban_thunder_tip a {color: #fff;}.huaban_thunder_tip_failed {height: 32px; font-weight: bold; color: #fff;background: #c90000; background: rgba(201, 0, 0, .5); }.huaban_thunder_tip_failed p {margin: 0 2px; font-weight: normal; font-size: 12px;}.huaban_thunder_tip span { padding-left: 22px; position: relative;}.huaban_thunder_tip_warning span {display: block; line-height: 18px;}.huaban_thunder_tip span em { background: url(http://huaban.com/img/bm_pin_sprite.png?20120918) no-repeat 0px -150px; display: inline-block; height: 16px; width: 16px; position: absolute; left: 0; top: 50%; margin-top: -8px;}.huaban_thunder_tip_success span em { background: url(http://huaban.com/img/bm_pin_sprite.png?20120918) no-repeat 0px -150px;}.huaban_thunder_tip_warning span em { top: 9px; left: 0px; background: url(http://huaban.com/img/bm_pin_sprite.png?20120918) no-repeat -80px -150px;}.huaban_thunder_tip_failed span em { background: url(http://huaban.com/img/bm_pin_sprite.png?20120918) no-repeat -40px -150px;}.huaban_thunder_tip_ing span em { background: url(http://huaban.com/img/thunder_motion.gif) no-repeat 2px 2px;}.huabanImagePreview .huaban_thunder_tip_failed {width: 140px; margin-left: -80px; margin-top: -26px;}.huabanImagePreview .huaban_thunder_tip_success {width: 88px; margin-left: -52px; margin-top: -26px;}.huabanImagePreview .huaban_thunder_tip_ing {width: 72px;}.huabanImagePreview .huaban_thunder_tip_success p, .huabanImagePreview .huaban_thunder_tip_failed p {margin-top: 9px; font-size: 12px; display: block;}</style>
<link rel="stylesheet" href="css/AvatarUI/avatarui_calendar_compare.css?20131028">
<link rel="stylesheet" href="css/AvatarUI/avatarui_calendar_compare.css?20130328">
<link rel="stylesheet" href="css/AvatarUI/avatarui_datagrid.css">  
<link rel="stylesheet" href="css/AvatarUI/avatarui_tipbox.css?20130328">
<link rel="stylesheet" href="css/AvatarUI/avatarui_dialog.css?20130328">
<link rel="stylesheet" href="css/AvatarUI/avatarui_imitselect.css?20130328">   
<link href="favicon.ico" type="image/x-icon" rel=icon>
<link href="favicon.ico" type="image/x-icon" rel="shortcut icon">
<decorator:head/>  
</head>
<body style="min-width:1280px;" huaban_collector_injected="true">
<script type="text/javascript">
var pages = {"0":["sdkRealtime.jsp","sdkInterview.jsp","sdkUserAppVersion.jsp","sdkUserChannel.jsp","sdkUserDevice.jsp","sdkUserLocation.jsp","sdkUserNetwork.jsp","sdkUserOS.jsp","sdkUserResolution.jsp","sdkUserOperator.jsp","sdkLossUser.jsp","sdkUserActive.jsp","sdkUserRetention.jsp","sdkUserFrequency.jsp","sdkUserDuration.jsp","sdkUserActivityVisit.jsp","sdkUserActivityVisitDetail.jsp","sdkError.jsp","sdkFeedback.jsp","sdkUserCustomEventMulti.jsp","sdkUserCustomEventManage.jsp","sdkUserActivityManage.jsp","sdkUserVersionManage.jsp","sdkUserChannelManage.jsp"],"2":["insightCompeteProducts.jsp","insightDataMiningPerson.jsp"]}
var _date = new Date(<%=System.currentTimeMillis()+1000*3600*24%>);
</script>
<div class="header" style="min-width:1250px">
  <page:applyDecorator name="header" page="/decorators/header.jsp" />
</div>
<div id="LeftSideLoading" class="loading" style="position: absolute; top: 50px; left: 50px; width: 130px; display: none;"></div>
<a id="ToggleBar" class="toggleBar" href="javascript:;" style="display: inline; height: 673px;"><div class="toggleBarArrow"></div></a>
<style>
.reportList li {width:230px;}
.reportList li a{width:230px;}
.reportList li a i.iconLeyunjishi{
background: url("images/v2/icon_leyunjishi.png") repeat scroll 0 0 rgba(0, 0, 0, 0);
}
.header .home{margin-left:30px;}
.nav li a{padding:0 12px;}
</style>
<script>
var tempHtmlOld = '',tempHtmlNew = '';  
</script>   
<script id="oldPages" src="script/init.js?20131223" <decorator:getProperty property="body.data-main" writeEntireProperty="true" />></script> 
  


   
   <div class="content clearfix">

<div class="leftSide" id="LeftSideMenu" style="display: block;">
  <page:applyDecorator name="leftSide" page="/decorators/leftSide.jsp" />
</div>  
   
   
<div class="rightSide clearfix" style="margin-left: 221px;">
<decorator:body />
</div>
    
   
   
   </div>
 

   
<div class="footer">
  <page:applyDecorator name="footer" page="/decorators/footer.jsp" />
</div>



<script charset="utf-8"> (function(w, d, g, J) { var e = J.stringify || J.encode; d[g] = d[g] || {}; d[g]['showValidImages'] = d[g]['showValidImages'] || function() { w.postMessage(e({'msg': {'g': g, 'm':'s'}}), location.href); } })(window, document, '__huaban', JSON); </script>
<pinit id="huaban_Button" style="display: none;"><a id="huaban_thunderpinBtn" href="#" title="快速采集" class="thunderpin"><strong><em></em></strong></a><a id="huaban_pinBtn" href="#" title="采集到花瓣" class="pin">采集到花瓣</a></pinit>
</body>
</html>