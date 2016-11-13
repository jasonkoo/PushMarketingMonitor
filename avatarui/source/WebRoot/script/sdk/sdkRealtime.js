/**
 * SDK 实时数据
 * @author	Rocky
 * @date	2013-04-17
 */
/*
 * 285行修改实时曲线第一个点相同的问题
 */
define(function(require){
    require('common.js');
    require('highstock.js');
    require('dialog');

(function(){var h,n,i,l,m,o,p,q,r,k={}.hasOwnProperty,j=function(c,a){function b(){this.constructor=c}for(var f in a)k.call(a,f)&&(c[f]=a[f]);b.prototype=a.prototype;c.prototype=new b;c.__super__=a.prototype;return c};(function(){var c,a,b,f,d,e,g;d=["ms","moz","webkit","o"];for(e=0,g=d.length;e<g;e++){f=d[e];if(window.requestAnimationFrame)break;window.requestAnimationFrame=window[f+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f+"CancelAnimationFrame"]||window[f+"CancelRequestAnimationFrame"]}c=null;b=0;a={};if(requestAnimationFrame){if(!window.cancelAnimationFrame)return c=window.requestAnimationFrame,window.requestAnimationFrame=function(f,d){var e;e=++b;c(function(){if(!a[e])return f()},d);return e},window.cancelAnimationFrame=function(b){return a[b]=!0}}else return window.requestAnimationFrame=function(b){var a,f,c,d;a=(new Date).getTime();d=Math.max(0,16-(a-c));f=window.setTimeout(function(){return b(a+d)},d);c=a+d;return f},window.cancelAnimationFrame=function(b){return clearTimeout(b)}})();q=function(c){var a,b;a=Math.floor(c/3600);b=Math.floor((c-3600*a)/60);c=c-(3600*a+60*b)+"";for(b+="";2>b.length;)b="0"+b;for(;2>c.length;)c="0"+c;return(a?a+":":"")+b+":"+c};o=function(c){return m(c.toFixed(0))};r=function(c,a){var b,f;for(b in a)k.call(a,b)&&(f=a[b],c[b]=f);return c};p=function(c,a){var b,f,d;f={};for(b in c)k.call(c,b)&&(d=c[b],f[b]=d);for(b in a)k.call(a,b)&&(d=a[b],f[b]=d);return f};m=function(c){var a,b;a=(c+"").split(".");c=a[0];b="";1<a.length&&(b="."+a[1]);for(a=/(\d+)(\d{3})/;a.test(c);)c=c.replace(a,"$1,$2");return c+b};i=function(){function c(a,b){null==a&&(a=!0);this.clear=null!=b?b:!0;a&&AnimationUpdater.add(this)}c.prototype.animationSpeed=32;c.prototype.update=function(a){null==a&&(a=!1);return a||this.displayedValue!==this.value?(this.ctx&&this.clear&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),a=this.value-this.displayedValue,this.displayedValue=0.001>=Math.abs(a/this.animationSpeed)?this.value:this.displayedValue+a/this.animationSpeed,this.render(),!0):!1};return c}();h=function(c){function a(){return a.__super__.constructor.apply(this,arguments)}j(a,c);a.prototype.setOptions=function(b){null==b&&(b=null);this.options=p(this.options,b);this.textField&&(this.textField.el.style.fontSize=b.fontSize+"px");return this};return a}(i);(function(c){function a(b,a){this.elem=b;this.text=null!=a?a:!1;this.value=1*this.elem.innerHTML;this.text&&(this.value=0)}j(a,c);a.prototype.displayedValue=0;a.prototype.value=0;a.prototype.setVal=function(b){return this.value=1*b};a.prototype.render=function(){return this.elem.innerHTML=this.text?q(this.displayedValue.toFixed(0)):m(o(this.displayedValue))};return a})(i);l=function(c){function a(b){this.meter=b;this.ctx=this.meter.ctx;this.canvas=this.meter.canvas;a.__super__.constructor.call(this,!1,!1);this.setOptions()}j(a,c);a.prototype.displayedValue=0;a.prototype.value=0;a.prototype.options={strokeWidth:0.035,length:0.1,color:"#000000"};a.prototype.setOptions=function(b){null==b&&(b=null);r(this.options,b);this.length=this.canvas.height*this.options.length;this.strokeWidth=this.canvas.height*this.options.strokeWidth;this.maxValue=this.meter.maxValue;return this.animationSpeed=this.meter.animationSpeed};a.prototype.render=function(){var b,a,c,e,g,h,i,j;b=this.meter.getAngle.call(this,this.displayedValue);a=this.canvas.width/2;c=0.9*this.canvas.height;i=Math.round(a+this.length*Math.cos(b));j=Math.round(c+this.length*Math.sin(b));g=Math.round(a+this.strokeWidth*Math.cos(b-Math.PI/2));h=Math.round(c+this.strokeWidth*Math.sin(b-Math.PI/2));e=Math.round(a+this.strokeWidth*Math.cos(b+Math.PI/2));b=Math.round(c+this.strokeWidth*Math.sin(b+Math.PI/2));this.ctx.fillStyle=this.options.color;this.ctx.beginPath();this.ctx.arc(a,c,this.strokeWidth,0,2*Math.PI,!0);this.ctx.fill();this.ctx.beginPath();this.ctx.moveTo(g,h);this.ctx.lineTo(i,j);this.ctx.lineTo(e,b);return this.ctx.fill()};return a}(i);i=function(c){function a(b){this.canvas=b;a.__super__.constructor.call(this);this.ctx=this.canvas.getContext("2d");this.gp=[new l(this)];this.setOptions();this.render()}j(a,c);a.prototype.elem=null;a.prototype.value=[20];a.prototype.maxValue=80;a.prototype.displayedAngle=0;a.prototype.displayedValue=0;a.prototype.lineWidth=40;a.prototype.paddingBottom=0.1;a.prototype.options={colorStart:"#6fadcf",colorStop:void 0,strokeColor:"#e0e0e0",pointer:{length:0.8,strokeWidth:0.035},angle:0.15,lineWidth:0.44,fontSize:40};a.prototype.setOptions=function(b){var c,d,e;null==b&&(b=null);a.__super__.setOptions.call(this,b);this.lineWidth=this.canvas.height*(1-this.paddingBottom)*this.options.lineWidth;this.radius=this.canvas.height*(1-this.paddingBottom)-this.lineWidth;e=this.gp;for(c=0,d=e.length;c<d;c++)b=e[c],b.setOptions(this.options.pointer);return this};a.prototype.set=function(b){var a,c,e,g;b instanceof Array||(b=[b]);if(b.length>this.gp.length)for(a=0,c=b.length-this.gp.length;0<=c?a<c:a>c;0<=c?++a:--a)this.gp.push(new l(this));a=0;for(e=0,g=b.length;e<g;e++)c=b[e],c>this.maxValue&&(this.maxValue=1.1*this.value),this.gp[a].value=c,this.gp[a++].setOptions({maxValue:this.maxValue,angle:this.options.angle});this.value=b[b.length-1];return AnimationUpdater.run()};a.prototype.getAngle=function(a){return(1+this.options.angle)*Math.PI+a/this.maxValue*(1-2*this.options.angle)*Math.PI};a.prototype.render=function(){var a,c,d,e,g;e=this.canvas.width/2;d=this.canvas.height*(1-this.paddingBottom);a=this.getAngle(this.displayedValue);this.textField&&this.textField.render(this);this.ctx.lineCap="butt";void 0!==this.options.colorStop?(c=this.ctx.createRadialGradient(e,d,9,e,d,70),c.addColorStop(0,this.options.colorStart),c.addColorStop(1,this.options.colorStop)):c=this.options.colorStart;this.ctx.strokeStyle=c;this.ctx.beginPath();this.ctx.arc(e,d,this.radius,(1+this.options.angle)*Math.PI,a,!1);this.ctx.lineWidth=this.lineWidth;this.ctx.stroke();this.ctx.strokeStyle=this.options.strokeColor;this.ctx.beginPath();this.ctx.arc(e,d,this.radius,a,(2-this.options.angle)*Math.PI,!1);this.ctx.stroke();e=this.gp;g=[];for(c=0,d=e.length;c<d;c++)a=e[c],g.push(a.update(!0));return g};return a}(h);h=function(c){function a(b){this.canvas=b;a.__super__.constructor.call(this);this.ctx=this.canvas.getContext("2d");this.setOptions();this.render()}j(a,c);a.prototype.lineWidth=15;a.prototype.displayedValue=0;a.prototype.value=33;a.prototype.maxValue=80;a.prototype.options={lineWidth:0.1,colorStart:"#6f6ea0",colorStop:"#c0c0db",strokeColor:"#eeeeee",shadowColor:"#d5d5d5",angle:0.35};a.prototype.getAngle=function(a){return(1-this.options.angle)*Math.PI+a/this.maxValue*(2+this.options.angle-(1-this.options.angle))*Math.PI};a.prototype.setOptions=function(b){null==b&&(b=null);a.__super__.setOptions.call(this,b);this.lineWidth=this.canvas.height*this.options.lineWidth;this.radius=this.canvas.height/2-this.lineWidth/2;return this};a.prototype.set=function(a){this.value=a;this.value>this.maxValue&&(this.maxValue=1.1*this.value);return AnimationUpdater.run()};a.prototype.render=function(){var a,c,d,e;a=this.getAngle(this.displayedValue);e=this.canvas.width/2;d=this.canvas.height/2;this.textField&&this.textField.render(this);c=this.ctx.createRadialGradient(e,d,39,e,d,70);c.addColorStop(0,this.options.colorStart);c.addColorStop(1,this.options.colorStop);this.ctx.strokeStyle=this.options.strokeColor;this.ctx.beginPath();this.ctx.arc(e,d,this.radius,(1-this.options.angle)*Math.PI,(2+this.options.angle)*Math.PI,!1);this.ctx.lineWidth=this.lineWidth;this.ctx.lineCap="round";this.ctx.stroke();this.ctx.strokeStyle=c;this.ctx.beginPath();this.ctx.arc(e,d,this.radius,(1-this.options.angle)*Math.PI,a,!1);return this.ctx.stroke()};return a}(h);n=function(c){function a(){return a.__super__.constructor.apply(this,arguments)}j(a,c);a.prototype.strokeGradient=function(a,c,d,e){a=this.ctx.createRadialGradient(a,c,d,a,c,e);a.addColorStop(0,this.options.shadowColor);a.addColorStop(0.12,this.options._orgStrokeColor);a.addColorStop(0.88,this.options._orgStrokeColor);a.addColorStop(1,this.options.shadowColor);return a};a.prototype.setOptions=function(b){var c,d,e;null==b&&(b=null);a.__super__.setOptions.call(this,b);e=this.canvas.width/2;b=this.canvas.height/2;c=this.radius-this.lineWidth/2;d=this.radius+this.lineWidth/2;this.options._orgStrokeColor=this.options.strokeColor;this.options.strokeColor=this.strokeGradient(e,b,c,d);return this};return a}(h);window.AnimationUpdater={elements:[],animId:null,addAll:function(c){var a,b,f,d;d=[];for(b=0,f=c.length;b<f;b++)a=c[b],d.push(AnimationUpdater.elements.push(a));return d},add:function(c){return AnimationUpdater.elements.push(c)},run:function(){var c,a,b,f,d;c=!0;d=AnimationUpdater.elements;for(b=0,f=d.length;b<f;b++)a=d[b],a.update()&&(c=!1);return c?cancelAnimationFrame(AnimationUpdater.animId):AnimationUpdater.animId=requestAnimationFrame(AnimationUpdater.run)}};window.Meter=i;window.Donut=n;window.BaseDonut=h}).call(this);$.fn.Meter=function(b){this.each(function(){var a=$(this).data();a.meter&&delete a.meter;!1!==b&&(a.meter=(new Meter(this)).setOptions(b))});return this};$.fn.Donut=function(b){this.each(function(){var a=$(this).data();a.donut&&delete a.donut;!1!==b&&(a.donut=(new Donut(this)).setOptions(b))});return this};

window.singular = function(n){
    var newNum;
    newNum = n < 10 ? '0' + n : n;
    return newNum;
}

var realtimeUrlPrefix = '/realtime'

window.date2Str1 = function(date){
    return date.getFullYear()+'-'+singular(date.getMonth()+1)+'-'+singular(date.getDate())+' '+singular(date.getHours())+':'+singular(date.getMinutes())+':00';
}

function datePre(date, n){
	var _date = new Date();
	var t = date.getTime();
	t += 60000*n;
	_date.setTime(t);
	return _date;
}

//数字跳动
function numUpdate(bindDom, startNum, endNum, timerInterval, minInterval, fixed){
	var numTimer;
	minInterval = minInterval || 32;
	
	fixed = fixed || 0;

	var _staticEndNum = endNum;
	var diff = endNum - startNum;
	var diffUp = diff > 0;
	diff = Math.abs(diff);

	var interval, intervalNum;
	if(diff < timerInterval/minInterval){
		interval = diff == 0 ? 0 : timerInterval/diff;
		intervalNum = 1;
	}else{
		interval = minInterval;
		intervalNum = diff/(timerInterval/minInterval);
	}

	numUpdateCircle();
	function numUpdateCircle(){
		if(diffUp && startNum < endNum){
			numTimer = setTimeout(function(){
				startNum += intervalNum;
				if(startNum > _staticEndNum){
					startNum = _staticEndNum;
				}
				bindDom.html(formatNum(parseFloat(startNum).toFixed(fixed)));
				numUpdateCircle();
			}, interval);
		}else if(!diffUp && startNum > endNum){
			numTimer = setTimeout(function(){
				startNum -= intervalNum;
				if(startNum < _staticEndNum){
					startNum = _staticEndNum;
				}
				bindDom.html(formatNum(parseFloat(startNum).toFixed(fixed)));
				numUpdateCircle();
			}, interval);
		}else if(startNum == endNum){
			numTimer = setTimeout(function(){
				bindDom.html(formatNum(parseFloat(startNum).toFixed(fixed)));
			}, interval);
		}
	}
	return numTimer;
}

//实时数据
function getRealtime(){
	$.ajax({
		//url: projectName + '/datatest.txt?method=getBaseData&reportName=' + reportName,
		url: projectName + realtimeUrlPrefix + '/realTimeDataAction.do?method=getBaseData&reportName=' + reportName,
		data: {'appKey': appKey, 'hitResult': hitResult},
		dataType: 'json',
		success: function(data){
			
			loadData(data);
			/*
			if(!firstLoad){
				loadData(data);
			}
			realtimeData(data);
			*/
		}
	});
}

//第一次加载数据
function loadData(data){
	/*
	_accumPVBase = data.base[0].accum_pv_base;
	_accumUVBase = data.base[0].accum_uv_base;
	_accumHitPVBase = data.base[0].accum_hit_pv_base;
	_accumHitUVBase = data.base[0].accum_hit_uv_base;
	*/
	
	numUpdate($('#AccumHitPV'), 0, data.base[0].accum_hit_pv, 800);	
	numUpdate($('#AccumHitUV'), 0, data.base[0].accum_hit_uv, 800);
	numUpdate($('#AccumPV'), 0, data.base[0].accum_pv, 800);
	numUpdate($('#AccumUV'), 0, data.base[0].accum_uv, 800);
	

	numUpdate($('#HitPVMax'), 0, data.base[0].max_hit_pv, 800);
	numUpdate($('#HitUVMax'), 0, data.base[0].max_hit_uv, 800);
	numUpdate($('#PVMax'), 0, data.base[0].max_pv, 800);	
	numUpdate($('#UVMax'), 0, data.base[0].max_uv, 800);

	numUpdate($('#HitPVRateMax'), 0, parseFloat(data.base[0].max_hit_pv_rate), 800, 32, 2);
	numUpdate($('#HitUVRateMax'), 0, parseFloat(data.base[0].max_hit_uv_rate), 800, 32, 2);
	
	numUpdate($('#HitPVRateReal'), 0, parseFloat(data.realTime.real_hit_pv_rate), 800, 32, 2);
	numUpdate($('#HitUVRateReal'), 0, parseFloat(data.realTime.real_hit_uv_rate), 800, 32, 2);
	
	
	_realHitPV = data.realTime.real_hit_pv;
	_realHitUV = data.realTime.real_hit_uv;
	_realPV = data.realTime.real_pv;
	_realUV = data.realTime.real_uv;
	
	loadTherm(_realHitPV, data.base[0].yest_hit_pv, data.base[0].max_hit_pv, '#HitPVRealTherm');
	loadTherm(_realHitUV, data.base[0].yest_hit_uv, data.base[0].max_hit_uv, '#HitUVRealTherm');
	loadTherm(_realPV, data.base[0].yest_pv, data.base[0].max_pv, '#PVRealTherm');
	loadTherm(_realUV, data.base[0].yest_uv, data.base[0].max_uv, '#UVRealTherm');
	
	/*
	_realStartTime = data.realTime.start_time;
	_realPV = data.realTime.pv;
	*/
	
	//loadMeter(data);
	loadDonut(data);
	
	firstLoad = 1;
}

//实时数据
function realtimeData(data){
	/*
	numUpdate($('#AccumUser'), _accumUserReal, parseInt(data.base[0].accumUser) + parseInt(data.realTime.new_user), 800);
	numUpdate($('#AccumStartTime'), _accumStartTimeReal, parseInt(data.base[0].accumStartTime) + parseInt(data.realTime.start_time), 800);
	numUpdate($('#AccumPV'), _accumPVReal, parseInt(data.base[0].accumPV) + parseInt(data.realTime.pv), 800);
	*/
	numUpdate($('#AccumHitPV'), 0, data.base[0].accum_hit_pv, 800);	
	numUpdate($('#AccumHitUV'), 0, data.base[0].accum_hit_uv, 800);
	numUpdate($('#AccumPV'), 0, data.base[0].accum_pv, 800);
	numUpdate($('#AccumUV'), 0, data.base[0].accum_uv, 800);
	

	numUpdate($('#HitPVMax'), 0, data.base[0].max_hit_pv, 800);
	numUpdate($('#HitUVMax'), 0, data.base[0].max_hit_uv, 800);
	numUpdate($('#PVMax'), 0, data.base[0].max_pv, 800);	
	numUpdate($('#UVMax'), 0, data.base[0].max_uv, 800);

	numUpdate($('#HitPVRateMax'), 0, parseFloat(data.base[0].max_hit_pv_rate), 800, 32, 2);
	numUpdate($('#HitUVRateMax'), 0, parseFloat(data.base[0].max_hit_uv_rate), 800, 32, 2);
	
	numUpdate($('#HitPVRateReal'), 0, parseFloat(data.realTime.real_hit_pv_rate), 800, 32, 2);
	numUpdate($('#HitUVRateReal'), 0, parseFloat(data.realTime.real_hit_uv_rate), 800, 32, 2);
	
	
	//reFreshTherm(parseInt(data.realTime.start_time), _realStartTime, data.base[0].startTime, '#StartTimeRealTherm', data);
	//reFreshTherm(parseInt(data.realTime.pv), _realPV, data.base[0].pv, '#PVRealTherm', data);
	
	
	reFreshTherm(data.realTime.real_hit_pv, _realHitPV, data.base[0].max_hit_pv, '#HitPVRealTherm');
	reFreshTherm(data.realTime.real_hit_uv, _realHitUV, data.base[0].max_hit_uv, '#HitUVRealTherm');
	reFreshTherm(data.realTime.real_pv, _realPV, data.base[0].max_pv, '#PVRealTherm');
	reFreshTherm(data.realTime.real_uv, _realUV, data.base[0].max_uv, '#UVRealTherm');
	
	_realHitPV = data.realTime.real_hit_pv;
	_realHitUV = data.realTime.real_hit_uv;
	_realPV = data.realTime.real_pv;
	_realUV = data.realTime.real_uv;
	
	/*
	_realStartTime = data.realTime.start_time;
	_realPV = data.realTime.pv;
	
	_accumUserReal = parseInt(data.base[0].accumUser) + parseInt(data.realTime.new_user);
	_accumStartTimeReal = parseInt(data.base[0].accumStartTime) + parseInt(data.realTime.start_time);
	_accumPVReal = parseInt(data.base[0].accumPV) + parseInt(data.realTime.pv);
	*/
	
	//realMeter(data);
	realDonut(data);
}

//第一次加载温度计
function loadTherm(_real, _last, _max, bindDom){
	numUpdate($(bindDom).find('.real'), 0, _real, 300);

	var _realPercent = _real/_max;
	_realPercent = _realPercent > 1 ? 1 : _realPercent;

	var _lastPercent = _last/_max;
	_lastPercent = _lastPercent > 1 ? 1 : _lastPercent;
	
	//$(bindDom).find('.last').html(formatNum(_last));
	numUpdate($(bindDom).find('.last'), 0, _last, 300);

	$(bindDom).find('.realValue').animate({'height': _realPercent * 150}, 800);
	$(bindDom).find('.lastValue').animate({'height': _lastPercent * 150}, 800);
	$(bindDom).find('.lastValueTip').animate({'bottom': _lastPercent * 150}, 800);
}

//刷新温度计
//function reFreshTherm(_real, _realLast, _max, bindDom, data){
  function reFreshTherm(_real, _realLast, _max, bindDom){	
	numUpdate($(bindDom).find('.real'), _realLast, _real, 800);

	var _realPercent = _real/_max;
	_realPercent = _realPercent > 1 ? 1 : _realPercent;

	$(bindDom).find('.realValue').animate({'height': _realPercent * 150}, 800);
}

//仪表盘
/*
function loadMeter(data){
	$('#MeterOverview').Meter({
		lines: 12,
		angle: 0.13,
		lineWidth: 0.44,
		pointer: {
			length: 0.8,
			strokeWidth: 0.035,
			color: '#333'
		},
		colorStart: '#87C1DE',
		colorStop: '#5DABD3',
		strokeColor: '#E0E0E0',
		generateGradient: true
	});

	meter = $('#MeterOverview').data().meter;
	meter.maxValue = data.base[0].startUser;
	meter.set(data.realTime.uv);
	
	numUpdate($('#StartUserReal'), _realStartUser, data.realTime.uv, 800);
	_realStartUser = data.realTime.uv;
}
*/

//仪表盘
/*
function realMeter(data){
	meter.set(parseInt(data.realTime.uv));
	numUpdate($('#StartUserReal'), _realStartUser, parseInt(data.realTime.uv), 800);
	_realStartUser = data.realTime.uv;
}
*/

//新用户比例
  /*
function newUserRateBg(rate){
	$('#NewUserRatePerson').animate({'width': 40*rate/100}, 300)
}
*/

//初始化原形图
function loadDonut(data){
	$('#RealDonutHitPV').Donut({
		lineWidth: 0.12,
		colorStart: "#BDDA8D",
		colorStop: "#85AC3F",
		strokeColor: '#dedede',
		shadowColor: "#d7d7d7",
		angle: 0.5
	});
	donutHitPVRate = $('#RealDonutHitPV').data().donut;
	donutHitPVRate.maxValue = 100;
	donutHitPVRate.set(parseFloat(data.realTime.real_hit_pv_rate));

	//var newUserRate = parseFloat(data.realTime.new_user*100 / data.realTime.uv);
	$('#RealDonutHitUV').Donut({
		lineWidth: 0.12,
		colorStart: "#BDDA8D",
		colorStop: "#85AC3F",
		strokeColor: '#dedede',
		shadowColor: "#d7d7d7",
		angle: 0.5
	});
	donutHitUVRate = $('#RealDonutHitUV').data().donut;
	donutHitUVRate.maxValue = 100;
	donutHitUVRate.set(parseFloat(data.realTime.real_hit_uv_rate));
	
	/*
	numUpdate($('#NewUserReal'), _realNewUser, parseInt(data.realTime.new_user), 800);
	numUpdate($('#NewUserRateReal'), _realNewUseRate, newUserRate, 100, 32, 2);
	
	newUserRateBg(newUserRate);
	
	_realNewUser = data.realTime.new_user;
	_realNewUseRate = newUserRate;
	*/
}

//原形图
function realDonut(data){
	//donutNewUser.set(data.realTime.new_user);
	
	//var newUserRate = parseFloat(data.realTime.new_user*100 / _realStartUser);
	//donutNewUserRate.set(newUserRate);
	
	donutHitPVRate.set(parseFloat(data.realTime.real_hit_pv_rate));

	donutHitUVRate.set(parseFloat(data.realTime.real_hit_uv_rate));
	
	/*
	numUpdate($('#NewUserReal'), _realNewUser, parseInt(data.realTime.new_user), 800);
	numUpdate($('#NewUserRateReal'), _realNewUseRate, newUserRate, 100, 32, 2);
	
	newUserRateBg(newUserRate);
	
	_realNewUser = data.realTime.new_user;
	_realNewUseRate = newUserRate;
	*/
}

Highcharts.setOptions({
    global: {
        useUTC: false,
	    lang: {
			resetZoom: '重置',
			resetZoomTitle: '重置'
		}
    }
});

function initTrend(type){
	if (chartTimer) {
		clearInterval(chartTimer);
		chartTimer = null;
		chartTimerCnt = 0;
	}
	if($('#ChartRealtime').hasClass('btnPrimary')){
		$('#RealLine').html('<div style="text-align:center; padding-top:50px;">正在加载数据...</div>');
		
		var series = [];
		$.ajax({
			//url: projectName + '/datatest_trend.txt?method=getOverViewData&reportName=productUserVisitOverview',
			url: projectName + realtimeUrlPrefix +  '/realTimeDataAction.do?method=getOverViewData&reportName=productUserVisitOverview',
			data: {'norm': type, 'appKey': appKey, 'hitResult': hitResult},
			dataType: 'json',
			success: function(data){
				_static = parseFloat(data.today[type]);
				var _todayStart = new Date();
				_todayStart.setHours(0);
				_todayStart.setMinutes(0);
				_todayStart.setSeconds(0);
				_up = parseInt(_static / ((new Date().getTime() - _todayStart.getTime()) / 100000));
				var _arr = [0.9, 1, 1.1];
				var _n=Math.floor(Math.random()*3+1)-1;
				_up = Math.ceil(_up*_arr[_n]);
				trendReal(_up, type);
			}
		})
	}else{
		$('#AllDayLine').html('<div style="text-align:center; padding-top:50px;">正在加载数据...</div>');
		var dataY_Yes = [], dataY_Today = [];
		var series = [];
		
		$.when(
			$.ajax({
				//url: projectName + '/datatest_yesterday.txt?method=getYesterdayMuniteData&reportName=' + reportName,
				url: projectName + realtimeUrlPrefix + '/realTimeDataAction.do?method=getYesterdayMuniteData&reportName=' + reportName,
				data: {'norm': type, 'appKey': appKey, 'hitResult': hitResult},
				dataType: 'json'
			}),
			$.ajax({
				//url: projectName + '/datatest_today.txt?method=getTodayMuniteData&reportName=' + reportName,
				url: projectName + realtimeUrlPrefix + '/realTimeDataAction.do?method=getTodayMuniteData&reportName=' + reportName,
				data: {'norm': type, 'appKey': appKey, 'hitResult': hitResult},
				dataType: 'json'
			})
		).done(function(dataYes, dataToday){
			var dataX = [];
			$.each(dataYes[0], function(k, v){
				dataX.push(v.hm);
				dataY_Yes.push(
					{
			            x: parseFloat(v.hm),
			            y: parseFloat(v.norm)
			        }
				);
			});
			
			$.each(dataToday[0], function(k, v){
				dataY_Today.push(
					{
			            x: parseFloat(v.hm),
			            y: parseFloat(v.norm)
			        }
				);
			});
			
			series = [
			        	{
				            name: '昨日',
							index: 0 ,
							data: dataY_Yes
						},
						{
				            name: '今日',
							data: dataY_Today
				        }
					];
			trendHistory(dataX, series, type);
		});
	}
}

//实时趋势图
function trendReal(dataInit, type){
	var chart = new Highcharts.Chart({
		chart: {
			useUTC: false,
		    renderTo: 'RealLine',
	        type: 'areaspline',
	        marginTop: 20,
	        marginRight: 15,
	        marginBottom: 20,
	        height: 250,
	        events: {
				load: function() {
				if ($('#ChartRealtime').hasClass('btnPrimary')) {
			        var series = this.series[0];
			        chartTimerCnt = 0;
			        chartTimer = setInterval(function() {
			        	$.ajax({
							//url: projectName + '/realTimeDataAction.do?method=getOverViewData&reportName=productUserVisitOverview',
			        		url: projectName + realtimeUrlPrefix + '/realTimeDataAction.do?method=getOverViewData&reportName=productUserVisitOverview',
			        		data: {'norm': type, 'appKey': appKey, 'hitResult': hitResult},
							dataType: 'json',
							success: function(data){
								var _up = parseFloat(data.today[type]) - parseFloat(_static);
								if(parseFloat(data.today[type])>0){
									_static = parseFloat(data.today[type]);
								}
								_up = _up < 0 ? 0 : _up;
								if(series.points.length < 20){
									series.addPoint([(new Date()).getTime(), _up]);
								}else{
									series.addPoint([(new Date()).getTime(), _up], true, true);
								}
								_static = parseFloat(data.today[type]);
							}
						});
			        	
			        	chartTimerCnt ++;
			        	if (chartTimerCnt > 9) {
			        		if (chartTimer) {
			        			clearInterval(chartTimer);
			        			chartTimer = null;
			        			chartTimerCnt = 0;
			        		}
			        	}
			        }, 100000);
				} // end if
			    }
	        }
	    },
	
	    title: {
	        text: ''
	    },
	    colors: ['#92C2F3'],
	    xAxis: {
	        showFirstLabel: true,
	        lineWidth: 0,
	        tickInterval: 60000,
	        type: 'datetime',
	        tickmarkPlacement: 'on',
	        tickColor: '#ddd',
	        tickPosition: "outside"
	    },
	    yAxis: {
	        title: {
	            text: ''
	        },
	        startOnTick: true,
	        alternateGridColor: '#FBFBFB',
	        gridLineColor: '#E4ECEF',
	        gridLineDashStyle: 'dash',
	        labels: {
	            style: {
	                color: '#5aa5e3',
	                fontSize: '11px'
	            },
			    formatter: function(){
	            	if(this.value < 1000){
	                    return this.value;
	                }else{
	                	return parseInt(this.value) / 1000 +'k';
	                }
		        }
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	        enabled: false
	    },
	    tooltip: {
	        backgroundColor: 'rgba(0, 0, 0, 0.00)',
	        borderWidth: 0,
	        shadow: false,
	        useHTML: true,
	        formatter: function () {
	            return '<div class="chartToolTip">' + '<div class="pointValue">' + this.series.name + ':<b>' + formatNum(this.y) + '</b></div>' 
	            + '<div class="pointDate">' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'</div>' + '</div>';
	        }
	    },
	    plotOptions: {
	    	areaspline: {
	    		dataLabels: {
		            enabled: true,
		            formatter: function(){
				    	return formatNum(this.y)
				    }
		        },
	            lineWidth: 1,
	            shadow: false,
	            fillOpacity: 0.2,
	            marker: {
	                enabled: true,
	                symbol: 'circle',
	                radius: 3,
	                states: {
	                    hover: {
	                        enabled: true,
	                        fillColor: '#fff',
	                        lineColor: "#599FE4",
	                        radius: 5,
	                        lineWidth: 2
	                    }
	                }
	            }
	        }
	    },
	    series: [{
            name: '实时',
            data: (function() {
                var data = [];
                data.push({
                    x: new Date().getTime(),
                    y: dataInit
                });
                return data;
            })()
        }]
	});
}


//历史趋势图
function trendHistory(dataX, series, type){
	if(type == 'hit_pv'){
		type = '投放量';
	}else if(type == 'hit_uv'){
		type = '投放用户量';
	}else if(type == 'pv'){
		type = '访问量';
	}else if(type == 'uv'){
		type = '访问用户量';
	}
	
	$('#AllDayLine').highcharts('StockChart',{
		chart: {
		    renderTo: '',
	        type: 'spline',
	        marginTop: 10,
	        marginRight: 15,
	        spacingBottom: 5,
	        height: 250,
	        zoomType: 'x'
			
//	        events: {
//                load: function () {
//                    var that = this;
//                    clearInterval(highchartTimer);
//                    highchartTimer = setInterval(function(){
//                            seriesToday = that.series[1];
//                            $.ajax({
//                                    url: projectName + '/realTimeDataAction.do?method=getTodayMuniteData&reportName=' + reportName,
//                                    data: {'norm': _type, 'appKey': appKey, 'startDate': 'startDate=' + date2Str1(datePre(_todayEnd, _dateIndex)), 'endDate': 'endDate=' + date2Str1(datePre(_todayEnd, _dateIndex))},
//                                    dataType: 'json',
//                                    success: function(data){
//                                            if(data.length > 0){
//                                                    var _realVal = parseInt(data[0].norm);
//
//                                                    seriesToday.addPoint([parseFloat(data[0].hm), _realVal], true, true);
//                                            }else{
//                                                    var _date = datePre(_todayEnd, _dateIndex);
//                                                    _date.setSeconds(0);
//                                                    seriesToday.addPoint([_date.getTime(), 0], true, true);
//                                            }
//                                    }
//                            });
//                            _dateIndex++;
//                    }, 60000);
//                }
//			}
	    },
	    
	    rangeSelector: {
	    	enabled: false
	    },
	    
	    navigator: {
	    	height: 35,
	    	outlineColor: '#777'
	    },
	    
//	    scrollbar: {
//	    	height: 8,
//	    	buttonArrowColor: '#999',
//			barBackgroundColor: '#2E74BC',
//			barBorderRadius: 4,
//			barBorderWidth: 0,
//			buttonBackgroundColor: '#DBDBDB',
//			buttonBorderWidth: 0,
//			buttonBorderRadius: 5,
//			trackBackgroundColor: '#DBDBDB',
//			trackBorderWidth: 1,
//			trackBorderRadius: 5,
//			trackBorderColor: '#DBDBDB',
//			rifleColor: '#fff'
//	    },
	    
	    scrollbar: {
	    	enabled: false,
	    	height: 8,
//	    	buttonArrowColor: '#999',
//			barBackgroundColor: '#2E74BC',
			barBorderRadius: 4,
			barBorderColor: '#999',
//			barBorderWidth: 0,
			buttonBackgroundColor: '#DBDBDB',
//			buttonBorderWidth: 0,
			buttonBorderColor: '#ccc',
			buttonBorderRadius: 4,
//			trackBackgroundColor: '#DBDBDB',
			trackBorderWidth: 1,
			trackBorderRadius: 4,
			trackBorderColor: '#DBDBDB'
//			rifleColor: '#fff'
	    },
	
	    title: {
	        text: ''
	    },
	    colors: ['#999', '#073073'],
	    xAxis: {
//		startOnTick: true,
//		endOnTick: true,
	    	categories: dataX,
	        showFirstLabel: true,
	        lineWidth: 0,
//	        type: 'datetime',
	        tickmarkPlacement: 'on',
	        tickColor: '#ddd',
	        maxZoom: 3600000, // fourteen days
	        tickPosition: "outside"
	    },
	    yAxis: {
	        title: {
	            text: ''
	        },
	        startOnTick: true,
//	        max: 15000,
	        showFirstLabel: false,
	        alternateGridColor: '#FBFBFB',
	        gridLineColor: '#E4ECEF',
	        gridLineDashStyle: 'dash',
	        labels: {
	            style: {
	                color: '#5aa5e3',
	                fontSize: '11px'
	            },
			    formatter: function(){
	            	if(this.value < 1000){
	                    return this.value;
	                }else{
	                	return this.value / 1000 +'k';
	                }
		        }
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	enabled: true,
			align: 'left',
			verticalAlign: 'top',
			borderRadius: 3,
			borderColor: '#bbb',
			floating: true
		},
	    
	    tooltip: {
			borderColor: '#2F7ED8',
	        formatter: function () {
	    		var _day;
	    		
	    		var _date = new Date(this.points[0].x);
	    		var _hour = singular(_date.getHours());
	    		var _minute = singular(_date.getMinutes());
	    		
	    		if(this.points.name == '昨日'){
	    			_day = date2Str(_yesterday);
	    		}else{
	    			_day = date2Str(_date);
	    		}           
	    		var _Date = new Date(parseFloat(this.x));
	    		var thisHtml = '<div style="color:#999">昨日:<b>' + formatNum(this.points[0].y) + '</b></div>';
	    		if(this.points.length > 1){
	    			thisHtml += '<br/><div style="color:#073073">今日:<b>' + formatNum(this.points[1].y) + '</b></div>'
	    		}
	            return '<div class="historyValue">'
	            		+ '<div class="pointDate"><b style="font-size:13px; color:#B84303">'+type+'：</b><br/>时间:' + _hour + ':' + _minute +'<br/></div>'
	            		+ thisHtml
	            		+ '</div>'
	            	+ '</div>';
	        }
	    },
	    plotOptions: {
	        spline: {
	            lineWidth: 1,
	            marker: {
	                enabled: false,
	                lineWidth: 1,
	                symbol: 'circle',
	                radius: 2,
	                states: {
	                    hover: {
	                        enabled: true,
	                        fillColor: '#fff',
	                        lineColor: "#599FE4",
	                        lineWidth: 2
	                    }
	                }
	            }
	        }
	    },
	    series: series
	});
}

var reportName = 'realTimeData';

var thisHref = window.location.href;
//var _appKey = thisHref.split('appkey=')[1];
var _appKey = 'Push_Advertising_System';
var appKey = 'appKey=' + _appKey;



var donutHitPVRate = 0;
var donutHitUVRate = 0;

var firstLoad = 0;


var _realHitPV = 0,
    _realHitUV = 0,
    _realPV = 0,
    _realUV = 0;


/*
var _accumPVBase = 0,
	_accumStartTimeBase = 0,
	_accumUserBase = 0,
	
	_accumPVReal = 0,
	_accumStartTimeReal = 0,
	_accumUserReal = 0,
	
	_realStartUser = 0,
	_realNewUser = 0,
	_realNewUseRate = 0,
	_realStartTime = 0,
	_realPV = 0;

var meter = 1, donutNewUser = 1, donutNewUserRate = 1;


var _yesterday = getPastDate(_date,1);
var _yesStart = datePre(_yesterday, -15);
var _yesEnd = datePre(_yesterday, 15);

var _todayStart = datePre(_date, -15);
var _todayEnd = datePre(_date, 0);


var _dateIndex = 1;
*/

var _static;
var chartTimer = null,
	chartTimerCnt = 0;
var dataTimer = null,
	dataTimerCnt = 0;

var hitResult;
var trendType = 'hit_pv';

$(function(){
	if(parseInt($.browser.version) == 6 || parseInt($.browser.version) == 7 || parseInt($.browser.version) == 8){
		$('#RealWrap').hide();
		$('#NoDataAlert').show();
		return;
	}
	getRealtime();
	
	dataTimerCnt = 0;
	dataTimer = setInterval(function(){
		getRealtime();
		
		dataTimerCnt ++;
		if (dataTimerCnt > 9) {
			if (dataTimer) {
    			clearInterval(dataTimer);
    			dataTimer = null;
    			dataTimerCnt = 0;
    		}
		}
	}, 1800000);
	
	//显示昨天数据
	$('.thermPillar .lastValue').hover(function(){
		$(this).parent().find('.lastValueTip').fadeIn(200);
	}, function(){
		$(this).parent().find('.lastValueTip').fadeOut(150);
	});
	
	//初始化趋势图
	initTrend(trendType);
	
	//切换重绘趋势图
	$('.realLine li').click(function(){
		$('.realLine li').removeClass('active');
		$(this).addClass('active');
		trendType = $(this).attr('index');
		
		initTrend(trendType);
	});

	$('#ChartAllDay').click(function(){
		$('#AllDayLine').show();
		$('#RealLine').hide();
		
		$(this).addClass('btnPrimary');
		$('#ChartRealtime').removeClass('btnPrimary');
		var thisType = $('.realLine li.active').attr('index');
		initTrend(thisType);
	});
	$('#ChartRealtime').click(function(){
		$('#RealLine').show();
		$('#AllDayLine').hide();
		
		$(this).addClass('btnPrimary');
		$('#ChartAllDay').removeClass('btnPrimary');
		var thisType = $('.realLine li.active').attr('index');
		initTrend(thisType);
	});
	
	$('#SearchBtn').unbind('click').bind('click');
	$('#SearchBtn').click(function(){
		
		hitResult = $(this).parent().find('.hitResultContent').val();
		getRealtime();
		initTrend(trendType);
		
	});
	
});

});