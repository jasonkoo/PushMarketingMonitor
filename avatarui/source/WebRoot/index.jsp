

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>营销投放管理平台</title>
<META http-equiv="pragma" content="no-cache">
<META http-equiv="cache-control" content="no-cache">
<META http-equiv="expires" content="0">
<META http-equiv='Content-Type' content='text/html; charset=UTF-8'>
<link href="login.css" rel="stylesheet" type="text/css" />
<link href="favicon.ico" type="image/x-icon" rel=icon>
<link href="favicon.ico" type="image/x-icon" rel="shortcut icon">
<script type="text/javascript" src="script/jquery.js"></script>
<script type="text/javascript" src="script/login.js"></script>
<script>
$(function(){
         var _n = new Date();      
         window.timestamp = _n.getFullYear()+''+_n.getMonth()+''+_n.getDate();  
         var s0 = "images/loginpic/pic0.jpg?"+timestamp;
         var s1 = "images/loginpic/pic1.jpg?"+timestamp;
         $('#showPic0').css("background-image","url("+s0+")");
         $('#showPic1').css("background-image","url("+s1+")");
});

function openResetWindow(href,target){
    window.open(href,target,"width=500,height=200,left=200,top=300","");
}

function cfyzm(){
    var myDate = new Date();
    var milliseconds = myDate.getMilliseconds();   //获取当前毫秒数(0-999)   
    document.getElementById('imgs').src="imagenumber?"+milliseconds;
}
    
    function keyDown(event){
     if (typeof (event) == 'string') return event.charCodeAt(0);
       var code = document.all ? event.keyCode : (event && event.which) ? event.which : 0;
       if(code == 13 ){
        login();
       }
    }
//登录，输入用户名密码点击登录
function login(){
    var userName = document.getElementById('userName');
    var passWord = document.getElementById('passWord');
                
    if(userName.value.length==0){          
    	userName.focus();
    	userName.select();
        return false;
    }
    if(passWord.value.length==0){           
    	passWord.focus();
    	passWord.select();
        return false;
    }

    form1.submit();
}    
</script>
</head>
<body>
<div class="header">
    <div class="logo"></div>
      <div style="float:right;z-index:100;margin-right:-10px;margin-top:55px;width:300px;height:20px;font-size:14px;font-weight:bold;color:#666666;">
             营销投放管理平台&nbsp;&nbsp;|&nbsp;&nbsp;营销业务管理平台
      </div>

    <div class="mainBox">
        <div class="picBtns">
            <a  href="javascript:;"  id="pic0" class="show"> </a>
            <a  href="javascript:;" id="pic1" class="hide"> </a>
        </div>
        <form name="form1" method="post" action="login.do" onkeypress="keyDown(event);" >
            <div class="loginBox">   
                <ul>
                    <li>        
                        <label for="userName" style="display: block;">帐  号</label> 
                        <input id="userName" name="userName"  type="text" class="text"  tabindex="1" maxlength="20"  value=""/>
                    </li>
                    <li>    
                        <label for="passWord" style="display: block;">密  码</label>  
                        <input id="passWord" name="passWord"   type="password" class="text" tabindex="2" maxlength="20"  value=""/>
                    </li>
                    <!-- 
                    <li>                
                        <label id="codeLabel" for="concodes" style="display: block;">验证码</label> 
                        <div class="codeDiv"><input name="concodes" id="concodes"  type="text" class="code" tabindex="3"  maxlength="4"  value=""/></div>
                        <div class="img">
                            <div class="pic"><img src="imagenumber" width="80px" height="20px"   alt="pic" id="imgs" align="top"/></div>
                            <a href="javascript:cfyzm();"> 换一张</a>
                        </div>
                    </li>
                     -->
                    <li>
                        <div class="sub" onclick="login()"></div>                    
                    </li>
                </ul>   
            </div>  
        </form>
    </div>       
</div>
<div class="middle">
    <div class="leftBtn"></div>
        <ul class="main">
            <li id="showPic0" style="background-color:#247ABa;background-image:url(images/loginpic/pic0.jpg); display: block; opacity: 1; position: absolute; z-index: 9">
            </li>
            <li id="showPic1" style="background-color:#247ABa;background-image:url(images/loginpic/pic1.jpg); display: block; opacity: 0; position: absolute; z-index: 9">
            </li> 
        </ul>
    <div class="rightBtn"></div>    
</div>
<div class="noticeMsg">
    <div style="float:left; width:60px; height:60px;"><img src="imgs/notice.png" /></div>
    <div class="msg">
    为了能有更好的浏览效果，强烈建议您使用<span id="ie9">IE9+ 、</span><span>Firefox</span>、<span>Chrome</span> 或 <span>safari</span>浏览器 !</br>
    设置您的代理，工具 -> Internet选项 -> 连接 -> 局域网设置 -> 使用自动配置脚本，地址输入<span>http://web.lenovo/proxyvendor.pac</span>
    </div>
</div>
<div class="footerBQ">版权所有：1998－2014 联想集团有限公司</div>
</body>
</html>