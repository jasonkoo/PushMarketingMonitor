define(function(require){
	 require('fullList.js');
//没有数据的提示
window.dataTip = "数据正在计算中。。。";

//定义项目名称
window.projectName = "/Stream";

//字符串替换
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
};

//字符串替换
String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,"");};

//数组的方法
Array.prototype.distinct = function () {
    for (var b = 0, f = this.length, a, c, d = {}, e = []; b < f; b++) a = this[b], c = typeof a, "undefined" == typeof d[a + c] && (d[a + c] = 1, e.push(a));
    return e
};

//数组扩展
Array.prototype.indexOf = function(Object){
    for(var i = 0, len = this.length; i < len; i++){
        if(this[i] == Object){
            return i;
        }
    }
    return -1;
};

//数组删除项
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//格式化字符串 5785323 > 5,785,323
window.formatNum = function(str){
    str = str.toString();
    if(/[^0-9\.]/.test(str)){return str;}
    var strFloor = '';
    if(RegExp('\\.').test(str)){
        strArr = str.split('.');
        str = strArr[0];
        strFloor = '.' + strArr[1];
    }
    var n = str.length % 3;
    if(n){
        return str.slice(0,n) +  str.slice(n).replace(/(\d{3})/g,',$1') + strFloor;
    }else{
        return str.replace(/(\d{3})/g,',$1').slice(1) + strFloor;
    }
};

//chart
window.drawLineChart = function (b, c, e, d, a, f) {
    new Highcharts.Chart({
        chart: {
            renderTo: b,
            marginBottom: 100,
            height: f || 400,
            defaultSeriesType: "spline",
            animation: !1
        },
        credits: {
            enabled: !1
        },
        title: {
            text: "",
            x: -20
        },
        subtitle: {
            text: "",
            x: -20
        },
        xAxis: {
            categories: c,
            labels: {
                x: 0,
                y: 30,
                rotation: -45,
                style: {
                    fontSize: "10px"
                }
            },
            tickInterval: a || 1
        },
        yAxis: {
            title: {
                text: ""
            },
            startOnTick: !1
        },
        tooltip: {
            crosshairs: !0,
            shared: !0
        },
        legend: {
            enabled: !0
        },
        series: e,
        exporting: {
            enabled: !1
        }
    })
};
window.drawColumnChart = function (b, c, e, d, a) {
    new Highcharts.Chart({
        chart: {
            renderTo: b,
            defaultSeriesType: "column",
            height: a || 400
        },
        title: {
            text: ""
        },
        subtitle: {
            text: ""
        },
        xAxis: {
            categories: c
        },
        yAxis: {
            min: 0,
            title: {
                text: ""
            }
        },
        tooltip: {
            formatter: function () {
                return "<b>" + this.series.name + "</b><br/>" + this.x + ": <b>" + this.y + "</b>"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: e,
        exporting: {
            enabled: !1
        }
    })
};
window.drawPieChart = function (b, c, e, d) {
    var a = 0,
        d = d || 380;
    $.each(c, function (c, b) {
        a += parseInt(b[1])
    });
    new Highcharts.Chart({
        chart: {
            renderTo: b,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: !1,
            height: d,
            width: 800
        },
        title: {
            text: ""
        },
        tooltip: {
            formatter: function () {
                return "<b>" + this.point.name + ":</b>" + this.y + ", " + Math.floor(1E4 * (this.y / a)) / 100 + "%"
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: !0,
                cursor: "pointer",
                dataLabels: {
                    enabled: !0,
                    color: "#000000",
                    connectorColor: "#000000",
                    formatter: function () {
                        return "<b>" + this.point.name + ":</b>" + formatNum(this.y) + " - " + Math.floor(1E4 * (this.y / a)) / 100 + "%"
                    }
                }
            }
        },
        series: [{
            type: "pie",
            data: c
        }],
        exporting: {
            enabled: !1
        }
    })
};

//add:      $.cookie("name", "value", {expires: 7, path: "/", domain: "jquery.com", secure: true});
//remove:   $.cookie("name", null); 
$.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { //name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); //use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { //only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                //Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//导出Excel
$.exportExcel = function (a) {
    a = $.extend({}, {
        url: "",
        fileName: "",
        excelCon: "",
        excelColName: "",
        excelTableName: "",
        tableSource: !1
    }, a);
    0 == $("#ExcelForm").length && $(document.body).append('<form target="ExcelIframe" id="ExcelForm"><input type="hidden" id="ExcelColName" name="excelColName" /><input type="hidden" id="ExcelCon" name="excelCon" /><input type="hidden" id="ExcelFilename" name="excelFilename"/></form><iframe name="ExcelIframe" style="display:none; visibility: hidden;"></iframe>');
    $("#ExcelFilename").val(a.fileName);
    if (a.tableSource) {
        var d = [],
            c = "";
        if(a.excelTableName != ''){
        	$('#'+a.excelTableName).find(".dgHeader td").each(function () {
	            d.push($(this).find("div").html())
	        });
        }else{
        	$(".dgHeader td").each(function () {
	            d.push($(this).find("div").html())
	        });
        }
        
        if(a.excelTableName != ''){
	        var b = $('#'+a.excelTableName).find(".dgFirstCol .tableCon td"),
	            e = $('#'+a.excelTableName).find(".dgContentTable tr");
        }else{
        	var b = $(".dgFirstCol .tableCon td"),
            e = $(".dgContentTable tr");
        }
        
        b.each(function (a) {
            var b = [];
            b.push($(this).html());
            e.eq(a).find("div").each(function () {
                b.push($(this).html())
            });
            b = b.join(";");
            c += b + "|"
        });
        d = d.join(";");
        c = c.substring(0, c.lastIndexOf("|"));
        a.excelColName = a.excelColName + ";" + d;
        a.excelCon = c
    }
    $("#ExcelColName").val(a.excelColName);
    $("#ExcelCon").val(a.excelCon);
    b = document.getElementById("ExcelForm");
    b.method = "post";
    b.action = a.url;
    b.submit()
};

//获得日期段函数
window.getPastDate = function(date, n){
    var datePast = new Date();
    datePast.setFullYear(date.getFullYear());
    datePast.setMonth(date.getMonth());
    datePast.setDate(date.getDate() - n);
    datePast.setHours(date.getHours());
    datePast.setMinutes(date.getMinutes());
    datePast.setSeconds(date.getSeconds());
    return datePast;
}
//个位补全
window.singular = function(n){
    var newNum;
    newNum = n < 10 ? '0' + n : n;
    return newNum;
}
//时间转字符串
window.date2Str = function(date){
    return date.getFullYear()+'-'+singular(date.getMonth()+1)+'-'+singular(date.getDate());
}
//获得日期段
window.getDateInterval = function(bindDom, n){
    var _startDate = typeof startDate !== 'undefined' ? startDate : '2010-01-01';
    var yesterday = getPastDate(_date,1),
        yestedayStr = date2Str(yesterday);

    if(n == 'all'){
        $(bindDom).val(_startDate + ' 至 ' + yestedayStr);
    }else{
        $(bindDom).val(date2Str(getPastDate(_date,n)) + ' 至 ' + yestedayStr);
    }
}

//获得日期参数
window.getDateParam = function(){
    var dateArr = [];
    var array = $('#FixedDate').val().split('至');
    dateArr.push('startDate='+array[0].trim());
    dateArr.push('endDate='+array[1].trim());
    return dateArr;
}

//初始化绑定
window.initBind = function (fn) {
	var _startDate = typeof startDate !== 'undefined' ? startDate : '2010-01-01';
    $("#DateList a").live("click", function() {
    	var _interval = $(this).attr("dateInterval");
    	var _iconleft = $(this).attr("iconleft");
    	
    	$('#DateList .iconSelect').css('left', parseInt(_iconleft));
    	
        $("#Calendar").val("");
        $(this).parent().addClass("selected").siblings().removeClass("selected");
        if ($(this).attr("dateInterval") == "all"){
        	getDateInterval("#FixedDate", "all");
        }else{
        	getDateInterval("#FixedDate", _interval);
        }
        $("#Calendar").val($("#FixedDate").val());
        fn();
    });
    $("#Calendar").Calendar({
        single: false,
        monthSize: 3,
        showFooter: true,
        offsetX: -340,
        disableDate: _startDate+'||'+date2Str(getPastDate(_date, 1)),
        currentDate: getPastDate(_date, 1),
        applyCallback: function () {
    		if($('#ReportHelp').length > 0){
    			$('#DateList .iconSelect').css('left', 880);
    		}else{
    			$('#DateList .iconSelect').css('left', 985);
    		}
            $("#FixedDate").val($("#Calendar").val());
            $("#DateList dd").removeClass("selected");
            fn();
        }
    });
};

/**
 * 获取日期的所在年周,如：2010-12-31->201052
 */
window.getYearWeek=function(date)
{
	var oneDay = 24*60*60*1000;
	var _date 		= new Date(date);
	var _year 		= _date.getFullYear();
	var _month 		= _date.getMonth();
	var _day 			= _date.getDay();//获取当前周的星期几(0-6)
	
	/**获取一年中的第一个星期一*/
  var fm = new Date(date);
	fm.setYear(_year);
	fm.setMonth(0);
	for(var i=1 ; i<=7 ;i++){
		fm.setDate(i);
		if(fm.getDay() === 1){break;}
	}
	
	/**获取一年中的第最后一个星期天*/
  var ls = new Date(date);
	ls.setYear(_year);
	ls.setMonth(11);
	for(var i=31 ; i>=1 ;i--){
		ls.setDate(i);
		if(ls.getDay() === 0){break;}
	}
	
	if(_date.getTime()>=fm.getTime() && _date.getTime()<=ls.getTime()){
	  var minus = _date - fm.setDate(fm.getDate())+oneDay;
	  var week = Math.ceil(Math.ceil(minus/oneDay)/7);
	  week = fm.getDate()<=4 ? week: week+1;
		return week<10 ? _year+"0"+week:_year+""+week;
	}else if(_date.getTime()<fm.getTime()){
		var td = new Date();
		td.setYear(_year-1);
		td.setMonth(11);
		td.setDate(31);
		return getYearWeek(td);
	}else{
		return 31-ls.getDate()<=3 ? (_year+1)+"01" :parseInt(getYearWeek(ls.setDate(ls.getDate()-1)))+1;
	}
};
window.html5Storage = 'sessionStorage' in window && window['sessionStorage'] !== null;
window.H = {};
$.extend(H,{
	thisHref : window.location.href,
	thisLink : window.location.pathname.substring(projectName.length+1)+window.location.search,
	thisAnchorName:'',
	thisAppKey : window.location.href.split("appkey=")[1],
	headerShow:{'13K3V6ntGiDw':'#Permission','jcZiOA2Ui547':'#DeviceManage','13K3V6nindex':'#AvatarIndex'},
	pages:{},
	sres:[],
	cres:[],
	insight:[],
	init:function(pages){
		this.pages = pages;
		if(pages){
			this.sres = pages['0'] ? pages['0'] :[];
			this.cres = pages['1'] ? pages['1'] :[];
			this.insight = pages['2'] ? pages['2'] :[];
		}
		this.handleEvent();
		if(this.thisLink.indexOf('main.jsp') > -1){
			$('#LeftSideLoading').hide();
			return;
		}
		if(this.thisLink.indexOf('?') > -1){
			this.thisLink = this.thisLink.substring(0,this.thisLink.indexOf('?'));
		}
		if(this.thisAppKey && this.thisAppKey.split('&').length > 1){
			this.thisAppKey = this.thisAppKey.substring(0,this.thisAppKey.indexOf('&'));
	    }
		if(this.pages && this.pages['2']){this.pages['2'].push('insight.html');}
		this.showLeftMenu();
	},
	handleEvent:function(){
		var timerChannel, channel = $("#Channel");
		channel.hover(function () {
		        clearInterval(timerChannel);
		        timerChannel = setTimeout(function () {
		        	channel.css('z-index',999999); 
		        	channel.find("ul").show();
		        	channel.find(".channelSwitch").addClass("channelSwitchHover")
		        }, 150)
		    }, function () {
		        clearInterval(timerChannel);
		        timerChannel = setTimeout(function () {
		        	channel.css('z-index',0); 
		        	channel.find("ul").hide();
		        	channel.find(".channelSwitch").removeClass("channelSwitchHover")
		        }, 300)
		    });
		//链接的hover效果
	    $('.hoverSpan').hover(function(){
	    	$(this).stop().animate({opacity:0},"fast");
	    },function(){
	    	$(this).stop().animate({opacity:1},"fast");
	    });
	    //清除本地存储
	    $('#LoginOut').click(function(){
	    	window.sessionStorage.clear();
	    });
	    
	    if(this.thisLink.indexOf('main.jsp') == -1){
		  //左侧菜单添加事件
		    $(".leftSide dt").live('click', function () {
		        $(this).parent().find("dd").slideToggle(150)
		    });
		    $('#LeftSideMenu dl .title').live('click', function(){
		        var thisDl = $(this).parent();
		        thisDl.find('ul').slideToggle(200);
		        
		        var thisArrow = $(this).find('span');
		        if(thisArrow.hasClass('arrowBottom')){
		            thisArrow.removeClass('arrowBottom').addClass('arrowRight');
		        }else{
		            thisArrow.removeClass('arrowRight').addClass('arrowBottom');
		        };
		    });
		    //隐藏菜单操作
	    	$('#ToggleBar').show().height(parseFloat($(document.body).height()) - 100);
		    $('#ToggleBar').hover(function(){
		    	if($('#LeftSideMenu').is(':visible')){
		    		$('.content').addClass('contentHover');
		    	}else{
		    		$('.content').addClass('contentOpenHover');
		    	}
		    }, function(){
		    	if($('#LeftSideMenu').is(':visible')){
		    		$('.content').removeClass('contentHover');
		    	}else{
		    		$('.content').removeClass('contentOpenHover');
		    	}
		    })
		    
		    $('#ToggleBar').click(function(){
		    	if($('#LeftSideMenu').is(':visible')){
		    		$('#ToggleBar').addClass('toggleBarOpen');
			    	$('#LeftSideMenu').hide();
			    	$('.rightSide').css('margin-left', 10);
			    	$(window).resize();
			    	$('.content').removeClass('contentHover').addClass('contentOpen');
		    	}else{
		    		$('#ToggleBar').removeClass('toggleBarOpen');
		    		$('#LeftSideMenu').show();
			    	$('.rightSide').css('margin-left', 221);
			    	$(window).resize();
			    	$('.content').removeClass('contentOpen contentOpenHover');
		    	}
		    });
	    }else{
	    	 $('#ToggleBar').hide();
	    }
	},
	showLeftMenu:function(){
		var sres = this.sres,cres = this.cres,insight = this.insight;
		var proName = $("#ReportList").find('li[appkey='+this.thisAppKey+']').find('a').find('span').html();
		$('#ReportName').html(proName);
		if(sres.length > 0){$('#SReport').show();$('#SReport').find('a').attr('href',sres[0]+'?appkey='+this.thisAppKey);}
		if(cres.length > 0){$('#CReport').show();$('#CReport').find('a').attr('href',cres[0]+'?appkey='+this.thisAppKey);}
		if(insight.length > 1){$('#InsightReport').show();$('#InsightReport').find('a').attr('href',insight[1]+'?appkey='+this.thisAppKey);}		
		if(sres.indexOf(this.thisLink) > -1){
			$('#SReport').addClass('active');
			this.checkLeft(sres);
		}else if(cres.indexOf(this.thisLink) > -1){
			$('#CReport').addClass('active');
			this.checkLeft(cres);
		}else if(insight.indexOf(this.thisLink) > -1){
			$("#InsightReport").addClass("active");
			this.checkLeft(insight);
		}
		$('#LeftSideLoading').hide();
	    $("#LeftSideMenu").show();
	    $("#LeftSideMenu ul a").removeClass('active');
	    var _link = this.thisLink;
	    var flag = true;
	    $("#LeftSideMenu ul a").each(function () {
	        if(_link == 'storeCustomShow.jsp' && window.location.href.indexOf('&') != -1){
	    		var idx = window.location.href.lastIndexOf('/')+1;
	    		if($(this).attr("href") == window.location.href.substring(idx)){
		    		$(this).addClass("active");
		            $(this).parents("dd").show();
		            $(this).parents('ul').show();
		            $(this).parents('.secondLevel').find('.arrow').removeClass('arrowRight').addClass('arrowBottom');
		            return;
	    		}
		}else if(_link == $(this).attr("href").split('?')[0] && flag){
		    flag = false;
	            $(this).addClass("active");
	            $(this).parents("dd").show();
	            
	            $(this).parents('ul').show();
	            $(this).parents('.secondLevel').find('.arrow').removeClass('arrowRight').addClass('arrowBottom');
	            return;
	        }
	    });
		
	},
	checkLeft:function(res){
		if(html5Storage && this.thisAppKey != undefined && $('#SReport').hasClass('active') && window.sessionStorage.getItem("leftCache_"+this.thisAppKey) != null && window.sessionStorage.getItem("leftCache_"+this.thisAppKey) != ''){
			$("#LeftSideMenu").html(window.sessionStorage.getItem("leftCache_"+this.thisAppKey));
	    }else{
			var _link = this.thisLink,_appkey = this.thisAppKey;
			$("#LeftSideMenu dl").each(function(){
				var thisA = $(this).find("a"),hasChild = false;
		        thisA.each(function () {
		            for (var i = 0; i < res.length; i++){
		            	var _hf = $(this).attr("href");            	
		            	if ( _hf == res[i]){
		            		$(this).attr("href",_hf+'?appkey='+_appkey);
			                $(this).parent().addClass("show");
			                $(this).parents(".secondLevel").show();
			                if(_link == res[i]){
			                	$(this).addClass('active');
			                	$(this).parents("dd").show();
			                }
			                hasChild = true;
			                return;
			            }
		            }
		        });
		        hasChild && $(this).show();
			});
			if(html5Storage && this.thisAppKey != undefined && $('#SReport').hasClass('active') && (window.sessionStorage.getItem("leftCache_"+this.thisAppKey) == null || window.sessionStorage.getItem("leftCache_"+this.thisAppKey) == '')){
		    	window.sessionStorage.setItem("leftCache_"+this.thisAppKey, $("#LeftSideMenu").html());
		    }
		}
		
	}
	
});
$(function(){
    
	//初始化时间默认为七天
    if($("#FixedDate").length >0){
    getDateInterval("#FixedDate", 7);
    $("#Calendar").val($("#FixedDate").val());
    }
	//初始化下拉列表
    fullListItemDefault();
    H.init(pages);
});


});
