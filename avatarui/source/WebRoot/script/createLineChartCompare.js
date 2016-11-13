define(function(require){
	  require('highcharts_3.0.1');
		;(function(win, $, undefined){
	    	Highcharts.setOptions({
	    		colors:['#2f7ed8','#910000','#8bbc21','#0d233a','#1aadce','#492970','#f28f43','#77a1e5','#c42525','#a6c96a'],
	    		exporting:{
	    			enabled: false
	    		},
	    		credits:{
	                enabled:false
	            }
	    	});

	    	$.fn.createLineChartCompare = function(options) {
	    		var dafaults = {
	    			dataX: [],

	    			seriesData: [],			// series数据
	    									// {
	    									//		name: 'Tokyo',
	    									//		data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	    									//	}, {
	    									//		name: 'London',
	    									//		data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	    									//	}

	    			normName: '',			// 指标名称

	    			width: '',				// 整个宽度
	    			height: 280,			// 整个高度

	    			type: 'areaspline',		// 默认区域 (areaspline || spline)

	    			marginTop: 15,			// 上边距
	    			marginRight: 15,
	    			marginBottom: 85,		// legend隐藏时是65
	    			marginLeft: 50,

	    			xAxis_type: 'datetime',		// 默认时间轴 (datetime || line)
	    			xAxis_label_x: -7,			// x轴数据横向偏移
	    			xAxis_label_y: 32,			// x轴数据纵向偏移
	    			xAxis_label_rotation: -45,	// x轴数据角度偏移
	    			
	    			yMinRate: 0.95,				// yMin的比例
	    			
	    			toolTipSuffix: '',			// 百分号之类的后缀
//	    			toolTipFormatter: function(normName, xAxis_type, _self, dataX, seriesData, _dataDes){}  

	    			festivalImg: 'images/star.png'		// 节日图片
	    		}
	    		

	    		var opt = $.extend({}, dafaults, options);

	    		var _self = $(this);

	    		// 日期变量
	    		var festival = {
	    			'2010-01-01':{'color':'#db4f4f','des':'【元旦节】'},'2010-02-13':{'color':'#db4f4f','des':'【除夕】'},'2010-04-03':{'color':'#db4f4f','des':'【清明节】'},'2010-05-01':{'color':'#db4f4f','des':'【劳动节】'},'2010-06-14':{'color':'#db4f4f','des':'【端午节】'},'2010-09-22':{'color':'#db4f4f','des':'【中秋节】'},'2010-10-01':{'color':'#db4f4f','des':'【国庆节】'},
	        		        '2011-01-01':{'color':'#db4f4f','des':'【元旦节】'},'2011-02-02':{'color':'#db4f4f','des':'【除夕】'},'2011-04-03':{'color':'#db4f4f','des':'【清明节】'},'2011-05-01':{'color':'#db4f4f','des':'【劳动节】'},'2011-06-04':{'color':'#db4f4f','des':'【端午节】'},'2011-09-10':{'color':'#db4f4f','des':'【中秋节】'},'2011-10-01':{'color':'#db4f4f','des':'【国庆节】'},
	        		        '2012-01-01':{'color':'#db4f4f','des':'【元旦节】'},'2012-01-22':{'color':'#db4f4f','des':'【除夕】'},'2012-04-02':{'color':'#db4f4f','des':'【清明节】'},'2012-05-01':{'color':'#db4f4f','des':'【劳动节】'},'2012-06-22':{'color':'#db4f4f','des':'【端午节】'},'2012-09-30':{'color':'#db4f4f','des':'【中秋节】'},'2012-10-01':{'color':'#db4f4f','des':'【国庆节】'},
	                        '2013-01-01':{'color':'#db4f4f','des':'【元旦节】'},'2013-02-09':{'color':'#db4f4f','des':'【除夕】'},'2013-04-04':{'color':'#db4f4f','des':'【清明节】'},'2013-05-01':{'color':'#db4f4f','des':'【劳动节】'},'2013-06-19':{'color':'#db4f4f','des':'【端午节】'},'2013-09-19':{'color':'#db4f4f','des':'【中秋节】'},'2013-10-01':{'color':'#db4f4f','des':'【国庆节】'},
	                        '2014-01-01':{'color':'#db4f4f','des':'【元旦节】'},'2014-01-30':{'color':'#db4f4f','des':'【除夕】'},'2014-04-05':{'color':'#db4f4f','des':'【清明节】'},'2014-05-01':{'color':'#db4f4f','des':'【劳动节】'},'2014-06-02':{'color':'#db4f4f','des':'【端午节】'},'2014-09-08':{'color':'#db4f4f','des':'【中秋节】'},'2014-10-01':{'color':'#db4f4f','des':'【国庆节】'}
	    		};
	    		
	            //格式化字符串 5785323 > 5,785,323
	    		var formatNum = function (str) {
	    			str = str.toString();
	    			if (/[^0-9\.]/.test(str)) {
	    				return str;
	    			}
	    			var strFloor = '';
	    			if (RegExp('\\.').test(str)) {
	    				strArr = str.split('.');
	    				str = strArr[0];
	    				strFloor = '.' + strArr[1];
	    			}
	    			var n = str.length % 3;
	    			if (n) {
	    				return str.slice(0, n) + str.slice(n).replace(/(\d{3})/g, ',$1') + strFloor;
	    			} else {
	    				return str.replace(/(\d{3})/g, ',$1').slice(1) + strFloor;
	    			}
	    		};

	    		// 格式化数据
	    		var formatData = function(dataX, seriesData) {
	    			var dataX = dataX[0];
	    			var yMin;
	    			var _result = [],
	    				_series = [],
	    				_pointDes = {};

	    			for (var i = 0; i < seriesData.length; i++) {
	    				var _seriesData = $.extend({},seriesData[i]);
	    				_seriesData.data = [];

	    				var _data = seriesData[i].data;

	    				for (var j = 0; j < _data.length; j++) {

	    					var _dataY = parseFloat(_data[j]),
	    						_dateX = dataX[j];

	    					var marker = {
	    						enabled: true,
	    						fillColor: '#0000FF',
	    						lineColor: '#0000FF',
	    						radius: 3,
	    						states: {
	    							hover: {
	    								enabled: true,
	    								radius: 4,
	    								lineColor: '#0000FF',
	    								fillColor: '#fff'
	    							}
	    						}
	    					}
	    					var _date = new Date(Date.parse(_dateX.replace(/\-/g, "/")));

	    					if(festival[_dateX]){
	    						if(i == 0){
	    							_pointDes[_dateX] = festival[_dateX].des;
	    						}
	    						marker.symbol = 'url('+opt.festivalImg+')';
	    						
	    						var _dataObj = {};
	    						_dataObj.y = _dataY;
//	    						_dataObj.color = festival[_dateX].color;
//	    						_dataObj.marker = marker;
	    						
	    						_seriesData.data.push(_dataObj);
	    					}else if ((_date.getDay() == 0 || _date.getDay() == 6)) {
	    						if(i == 0){
	    							if(_date.getDay() == 0){
	    								_pointDes[_dateX] = '【周日】';
	    							}else{
	    								_pointDes[_dateX] = '【周六】';
	    							}
	    						}
	    						var _dataObj = {};

	    						_dataObj.y = _dataY;
//	    						_dataObj.color = '#0000FF';
//	    						_dataObj.marker = marker;
	    						_seriesData.data.push(_dataObj);
	    					}else{
	    						_seriesData.data.push(_dataY);
	    					}

	    					if(yMin == undefined || _dataY < yMin){
	    						yMin = _dataY;
	    					}
	    				}
	    				_series.push(_seriesData)
	    			}

	    			_result.push(_series);
	    			_result.push(yMin);
	    			_result.push(_pointDes);
	    			return _result;
	    		};

	    		// 格式化数据 x轴是线的
	    		var formatData_line = function(seriesData){
	    			var _result = [], _series = [], yMin;
	    			for (var i = 0; i < seriesData.length; i++) {
	    				var _seriesData = $.extend({},seriesData[i]);
	    				_seriesData.data = [];

	    				var _data = seriesData[i].data;

	    				for (var j = 0; j < _data.length; j++) {
	    					var _dataY = parseFloat(_data[j]);

	    					_seriesData.data.push(_dataY);
	    					if(yMin == undefined || _dataY < yMin){
	    						yMin = _dataY;
	    					}
	    				}
	    				_series.push(_seriesData);
	    			}
	    			_result.push(_series);
	    			_result.push(yMin)

	    			return _result;
	    		}
	    		

	    		var _dataXLen = opt.dataX[0].length;
	    		var _tickInterval = _dataXLen > 25 ? Math.ceil(_dataXLen/25) : 1;

	    		var _title = {
	    			text: ''
	    		};

	    		var _colors = ['#2f7ed8', '#910000', '#8bbc21', '#0d233a', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
	    		if(opt.type == 'areaspline'){
	    			_colors = ['#92C2F3'];
	    		}

	    		// 初始化x轴数据
	    		var _xAxis = {
	    						showFirstLabel: true,
	    						startOnTick: false,

	    						min: 0,
	    						tickColor: '#ddd',
	    						tickPosition: "outside",

	    						gridLineColor: '#E4ECEF',
	    						gridLineDashStyle: 'dash',

	    						labels: {
	    							x: opt.xAxis_label_x,
	    							y: opt.xAxis_label_y,
	    							rotation: opt.xAxis_label_rotation,
	    							style: {
	    								fontSize: '11px',
	    								fontFamily: 'Verdana,Arial,microsoft yahei,SimSun,sans-serif'
	    				            },
	    							formatter: function () {
	    											var _val = opt.dataX[0][this.value];
	    											return _val;
	    										}
	    						}
	    					};
	    		if(opt.xAxis_type == 'datetime'){
	    			_xAxis.type = 'datetime';
	    			_xAxis.tickPixelInterval = 50;
	    			_xAxis.labels.formatter = function () {
	    											var _val = opt.dataX[0][this.value];
//	    											if (this.isLast) {
//	    												console.log(this)
//	    												_val = opt.dataX[opt.dataX.length-1];
//	    											}
	    											if(_val == undefined){
	    												_val = ''
	    											}
	    											var _color = '#666';
	    											if(festival[_val] || _dataDes[_val]) {
	    												_color = '#0000FF';
	    											}
	    											return '<span style="color:#666">' + _val + '</span>';
	    										}

	    		}else{
	    			_xAxis.type = 'line';
	    			_xAxis.tickInterval = _tickInterval;
	    		}

	    		var _seriesResult;
	    		if(opt.xAxis_type == 'datetime'){
	    			_seriesResult = formatData(opt.dataX, opt.seriesData);
	    		}else{
	    			_seriesResult = formatData_line(opt.seriesData);
	    		}
	    		
	    		var _series = _seriesResult[0];
	    		
	    		var _yMin = _seriesResult[1]*opt.yMinRate;
	    		var _dataDes = _seriesResult[2];
	    		
	    		var _yAxis = {
	    			title: {
	    				text: ''
	    			},
	    			min: _yMin,
	    			// startOnTick: false,
	    			showFirstLabel: true,
	    			gridLineColor: '#E4ECEF',
	    			gridLineDashStyle: 'dash',
	    			labels: {
	    				style: {
	    					color: '#999',
	    					fontSize: '11px'
	    				}
	    			}
	    		};
	    		
	    		var _toolTip = {
	    			crosshairs: true,
	    			shared: true,
	    			formatter: function () {
	    				var dataXLen = opt.dataX.length,
	    					seriesLen = opt.seriesData.length;
	    				
	    				var s1Des = _dataDes[opt.dataX[0][this.x]] != undefined ? _dataDes[opt.dataX[0][this.x]] : '';
	    				var s1 = opt.dataX[0][this.x];
	    				if(dataXLen == 2){
	    					var s2Des = _dataDes[opt.dataX[1][this.x]] != undefined ? _dataDes[opt.dataX[1][this.x]] : '';
	    					var s2 = opt.dataX[1][this.x];
	    				}
	    				
	    				var s = [];
	    				
	    				function getSuffix(name){
	    					var _toolTipSuffix = '';
	    					if(name.split('(')[0] == '启动新用户占比'){
	    						_toolTipSuffix = '%';
	    					}
	    					return _toolTipSuffix;
	    				}
	    				
	    				if(dataXLen == 1 && seriesLen == 1){
	    					if(this.points[0]){
	    						var _toolTipSuffix = getSuffix(this.points[0].series.name);
	    						s.push('<span style="color:' + this.points[0].series.color + '">' + s1 + ' ' + this.points[0].series.name.split('(')[0] + ': </span><b>' + formatNum(this.points[0].y) + _toolTipSuffix + '</b>');
	    					}
	    				}else if(dataXLen == 1 && seriesLen == 2){
	    					for (var i = 0; i < opt.seriesData.length; i++) {
	    						if(this.points[i]){
	    							var _toolTipSuffix = getSuffix(this.points[i].series.name);
	    							s.push('<span style="color:' + this.points[i].series.color + '">' + s1 + ' ' + this.points[i].series.name.split('(')[0] + ': </span><b>' + formatNum(this.points[i].y) + _toolTipSuffix + '</b>');
	    						}
	    					}
	    				}else if(dataXLen == 2 && seriesLen == 2){
	    					for (var i = 0; i < opt.seriesData.length; i++) {
	    						if(this.points[i]){
	    							var _toolTipSuffix = getSuffix(this.points[i].series.name);
	    							var thisPointName = this.points[i].series.name;
	    							thisPointName = thisPointName.split('(')[1].split(' -')[0];
	    							var sDate = thisPointName == opt.dataX[0][0] ? s1 : s2;
	    							s.push('<span style="color:' + this.points[i].series.color + '">' + sDate + ' ' + this.points[i].series.name.split('(')[0] + ': </span><b>' + formatNum(this.points[i].y) + _toolTipSuffix + '</b>');
	    						}
	    					}
	    				}else if(dataXLen == 2 && seriesLen == 4){
	    					for (var i = 0; i < opt.seriesData.length; i++) {
	    						if(this.points[i]){
	    							var _toolTipSuffix = getSuffix(this.points[i].series.name);
	    							
	    							var thisPointName = this.points[i].series.name;
	    							thisPointName = thisPointName.split('(')[1].split(' -')[0];
	    							var sDate = thisPointName == opt.dataX[0][0] ? s1 : s2;
	    							
	    							s.push('<span style="color:' + this.points[i].series.color + '">' + sDate + ' ' + this.points[i].series.name.split('(')[0] + ': </span><b>' + formatNum(this.points[i].y) + _toolTipSuffix + '</b>');
	    						}
	    					}
	    				}
	    				return s.join('<br/>');
	    			}
	    		};

	    		var _plotOptions = {
	    			areaspline: {
	    				lineWidth: 1,
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
	    							lineWidth: 2,
	    							radius: 4
	    						}
	    					}
	    				}
	    			},
	    			spline: {
	    				lineWidth: 1,
	    				marker: {
	    					enabled: true,
	    					symbol: 'circle',
	    					radius: 2,
	    					states: {
	    						hover: {
	    							enabled: true,
	    							fillColor: '#fff',
	    							lineColor: "#599FE4",
	    							lineWidth: 2,
	    							radius: 4
	    						}
	    					}
	    				}
	    			}
	    		};

	    		var _legend = {
	    			borderRadius: 3,
	    			borderColor: '#bbb',
	    			margin: 5,
	    			padding: 6,
	    			itemStyle: {
	    				lineHeight: '14px',
	    				fontFamily: 'Verdana,Arial,microsoft yahei,SimSun,sans-serif'
	    			}
	    		};
	    		
	    		
	    		_self.highcharts({
	    			chart: {
	    				width: opt.width,
	    				height: opt.height,
	    				type: opt.type,
	    				
	    				spacingTop: 50,
	    				spacingLeft: 90,
	    				spacingRight: 90,
	    				spacingBottom: 0,

	    				marginTop: opt.marginTop,
	    				marginRight: opt.marginRight,
	    				marginBottom: opt.marginBottom,
	    				marginLeft: opt.marginLeft
	    			},
	    			credits: {
	    				enabled: false
	    			},
	    			exporting: {
	    				enabled: false
	    			},

	    			colors: opt.colors || _colors,

	    			title: opt.title || _title,

	    			subtitle: opt.subtitle || _title,

	    			xAxis: opt.xAxis || _xAxis,

	    			yAxis: opt.yAxis || _yAxis,

	    			tooltip: opt.toolTip || _toolTip,

	    			plotOptions: opt.plotOptions || _plotOptions,

	    			legend: opt.legend || _legend,

	    			series: opt.series || _series
	    		});
	    	}
	    })(this, jQuery);
});