/* AvatarUI Calendar | By Rocky | 2013-06-07 */
define(function(require){
	require('avatarui_css/avatarui_calendar_compare.css?20131028');
	
	$.fn.Calendar = function(options) {
		var defaults = {
			offsetX: -366,						// 横向偏移量
			offsetY: 0,						// 纵向偏移量
			monthSize: 2,					// 显示多少个月份
			
			currentDate: new Date(),		// 自定义系统时间
			//disableDate: "2013-05-01||2013-10-17",				// 不能选择的日期 "past"||"futrue"||"2012-01-12||2012-01-18"
			disableDate: "",
			
//			defaultDate: '2013-04-20 至 2013-05-24',

			isCompare: true,

			initCallback: function(){},		// 日历框初始化回调函数
			applyCallback: function(){}		// 选择日期后的回调函数
		};
		var opt = $.extend({},defaults, options);
		opt.monthSize = 2;
		opt.offsetX =  -366;
		var _lastDate = opt.disableDate.split('||')[1].trim();
		opt.disableDate = opt.disableDate.split('||')[0].trim();
		$(this).addClass('originDate');
		$(this).css('margin-top','0');
		opt.defaultDate = $(this).val();  
		var C = {
			setDateZero: function(date){
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0);
				return date;
			},

			current: function(){
				function checkTime(i){if (i<10){i="0" + i}return i;}
				var today = new Date();
				var h = checkTime(today.getHours());
				var m = checkTime(today.getMinutes());
				var s = checkTime(today.getSeconds());
				box.find('.detailTime').val(h+':'+m+':'+s);
			},

			// 根据日期区间获得月份
			setDateRange: function(date1,date2){
				_start = date1.getTime();
				_end = date2.getTime();
				for(var i = 0; i < opt.monthSize; i++){
					C.showMonth(C.changeMonth(new Date(date1),i-1), 'month'+(i+1));
				};
				C.showSelectedDays();
			},

			// 获得选择的日期区间
			showSelectedDays: function(){
				box.find('.day').each(function(){
					if (!$(this).hasClass('toMonth')) return;
					$(this).removeClass('checked checkedCompare checkedCompareCross');
					var time = $(this).attr('time');
					if (
						(_start && _end && _end >= time && _start <= time )
						|| ( _start && !_end && _start == time )
					){  
						$(this).addClass('checked');
						if($(this).hasClass('checkedCompare')){
							$(this).addClass('checkedCompareCross')
						}
					}else{
						$(this).removeClass('checked');
					}

					if(box.find('.compareSwitch').attr('checked')){
						if (
							(_startC && _endC && _endC >= time && _startC <= time )
							|| ( _startC && !_endC && _startC == time )
						){
							$(this).addClass('checkedCompare');
							if($(this).hasClass('checked')){
								$(this).addClass('checkedCompareCross');
							}
						}else{
							$(this).removeClass('checkedCompare');
						}
					}
				});
			},

			// 日期点击处理
			dayClicked: function(day){
				
				var time = day.attr('time');

				if((box.find('.date_1_s').hasClass('textActive') || box.find('.date_1_e').hasClass('textActive'))){
					box.find('.toMonth').each(function(){
						$(this).removeClass('checkedCompare');
					});

					day.addClass('checkedCompare');

					if(box.find('.date_1_s').hasClass('textActive')){
						_startC = time;
						_endC = time;

						box.find('.date_1_s').val(C.dateToString(new Date(parseFloat(time))));

					}else{
						_endC = time;
						box.find('.date_1_e').val(C.dateToString(new Date(parseFloat(time))));
					}

					if(_endC < _startC){
						var tmp = _endC;
						_endC = _startC;
						_startC = tmp;

						box.find('.date_1_s').val(C.dateToString(new Date(parseFloat(_startC))));
						box.find('.date_1_e').val(C.dateToString(new Date(parseFloat(_endC))));
					}

				}else{
					day.addClass('checked');
					if ((_start && _end) || (!_start && !_end) ){
						_start = time;
						_end = false;
					}else if (_start){
						_end = time;
					}
					if (_start && _end && _start > _end){

						var tmp = _end;
						_end = _start;
						_start = tmp;
					}
					_start = parseInt(_start);

					if(_end){
						_end = parseInt(_end);
					}
				}

				if(!box.find('.date_1_s').hasClass('textActive') && !box.find('.date_1_e').hasClass('textActive')){
					if(box.find('.compareOpt').val() != 'custom'){
						box.find('.compareOpt').val('custom');
						box.find('.date_0_s').addClass('textActive');
					}
					box.find('.date_0_s').removeClass('textDefault');
					box.find('.date_0_e').removeClass('textDefault');

					box.find('.date_0_s').val(C.dateToString(new Date(_start)));

					if(_end == false){
						box.find('.date_0_e').val(C.dateToString(new Date(_start)));
					}else{
						box.find('.date_0_e').val(C.dateToString(new Date(_end)));
					}
				}

				if(box.find('.date_0_s').hasClass('textActive')){
					box.find('.textActive').removeClass('textActive');
					box.find('.date_0_e').addClass('textActive');
				}else if(box.find('.date_0_e').hasClass('textActive')){
					box.find('.textActive').removeClass('textActive');
					if(box.find('.compareSwitch').attr('checked') && box.find('.compareInterval').val() == 'custom'){
						box.find('.date_1_s').addClass('textActive');
					}else{
						box.find('.date_0_s').addClass('textActive');
					}

				}else if(box.find('.date_1_s').hasClass('textActive')){
					box.find('.textActive').removeClass('textActive');
					box.find('.date_1_e').addClass('textActive');
				}else if(box.find('.date_1_e').hasClass('textActive')){
					box.find('.textActive').removeClass('textActive');
					if(box.find('.compareOpt').val() == 'custom'){
						box.find('.date_0_s').addClass('textActive');
					}else{
						box.find('.date_1_s').addClass('textActive');
					}
				}

				if(
					box.find('.compareSwitch').attr('checked') 
					&& box.find('.compareInterval').val() != 'custom' 
					&& !box.find('.date_1_s').hasClass('textActive')
					&& !box.find('.date_1_e').hasClass('textActive')
				){
					C.getCompareDate();
				}

				C.showSelectedDays();

				opt.compare && C.compareDate();
			},


			// 获得比较日期
			getCompareDate: function(){
				var _timeInterval = box.find('.compareInterval').val();
				if(_timeInterval == 'previousperiod'){
					_startC = C.stringToDateSingle(box.find('.date_0_s').val()).getTime() - (C.stringToDateSingle(box.find('.date_0_e').val()).getTime() - C.stringToDateSingle(box.find('.date_0_s').val()).getTime()) - 86400000;
					_endC = C.stringToDateSingle(box.find('.date_0_s').val()).getTime() - 86400000;
				}else if(_timeInterval == 'previousyear'){
					_startC = C.stringToDateSingle(box.find('.date_0_s').val()).getTime() - 86400000*365;
					_endC = C.stringToDateSingle(box.find('.date_0_e').val()).getTime() - 86400000*365;
				}else{
					_startC = C.stringToDateSingle(box.find('.date_0_s').val()).getTime() - (C.stringToDateSingle(box.find('.date_0_e').val()).getTime() - C.stringToDateSingle(box.find('.date_0_s').val()).getTime()) - 86400000;
					_endC = C.stringToDateSingle(box.find('.date_0_s').val()).getTime() - 86400000;
				}

				box.find('.date_1_s').val(C.dateToString(new Date(_startC)));
				box.find('.date_1_e').val(C.dateToString(new Date(_endC)));

				C.showSelectedDays();				
			},

			
			// 显示日期
			showMonth: function(date,month){
				var monthName = C.nameMonth(date.getMonth());
				box.find('.'+month+' .monthName').html('<span class="yearVal">'+date.getFullYear()+'</span>年 <span class="monthVal">'+monthName.toUpperCase()+'</span>月');
				box.find('.'+month+' .dateTable').html(C.createMonthHTML(date));
				opt[month] = date;

				// 当日之前的日期不能选择
				opt.disableDate != false && C.disableDate();
			},

			// 当天之前的日期不能点击
			disableDate: function(){
				box.find('.day').each(function(){
					var time = $(this).attr('time');
					if(time < C.stringToDateSingle(opt.disableDate).getTime() ||  time > _currentDate.getTime()){
						$(this).removeClass('toMonth');
					}
				});
			},

			// 关闭操作
			closeCalendar: function(){
				$(box).slideUp(100,function(){
					box.remove();
					isIE6 && $('#Iframe').remove();
					_self.removeAttr('calendarOpenned',false);
				});
				$(document.body).unbind('.calendar');
			},

			/*--- util 工具类 start ---*/
			// 改变月份
			changeMonth: function(date, n){
				date.setDate(1);
				date.setMonth(date.getMonth() + n);
				return date;
			},
			
			// 改变年份
			changeYear: function(date, n){
				date.setFullYear(date.getFullYear() + n); 
				return date;
			},

			// 日期转字符串 转换前Thu Sep 01 2011 00:00:00 GMT+0800， 转换后的格式是 2011-08-21
			dateToString: function(date){
				var dateYear = date.getFullYear();
				var dateMonth = date.getMonth()+1;
				if(dateMonth < 10){
					dateMonth = "0"+dateMonth;
				}
				var dateDay = date.getDate();
				if(dateDay < 10){
					dateDay = "0"+dateDay;
				}
				return dateYear+"-"+dateMonth+"-"+dateDay;
			},

			// 毫秒转字符串 13232323000 > 2013-02-08
			timeToString: function(time){
				return C.dateToString(new Date(time));
			},

			stringToDateSingle: function(dateStr){
				dateStr = dateStr.replace("-","/").replace("-","/");
				dateStr = new Date(Date.parse(dateStr));
				return dateStr;
			},
			
			// 字符串转日期 转换前:2011-05-20 至 2011-08-20， 转换后的格式是 Thu Aug 18 00:00:00 UTC+0800 2011至Thu Aug 25 00:00:00 UTC+0800 2011
			stringToDate: function(dateStr){
				dateStr = dateStr.replace("-","/").replace("-","/").replace("-","/").replace("-","/");
				dateStr = dateStr.replace(" ","").replace(" ","");
				dateStr = dateStr.split("至");
				dateStr = new Date(Date.parse(dateStr[0])).toString() + '至' + new Date(Date.parse(dateStr[1])).toString();
				return dateStr;
			},
			
			
			// 月份数组
			nameMonth: function(m){
				return ['1','2','3','4','5','6','7','8','9','10','11','12'][m];
			},

			// 创建日历框dom
			createDom: function(){
				box = $('<div class="calendarCompareWrapper" style="overflow:hidden">'
							+'<div class="calendarCompareCon"></div>'
							+'<div class="calendarControl" style="float:right;width:180px; height:170px; margin:4px;padding-left:5px;">'
				            	+'<ul>'
					            	+'<li>'
					            		+'<label>'
				            			+'	快速选择：'
				            			+'</label> '
										+'<select class="compareOpt">'
//										+'	<option value="0">昨天</option>'
//										+'	<option value="6">近七天</option>'
//										+'	<option value="29">近30天</option>'
										+'	<option value="lastWeek">上周</option>'
										+'	<option value="lastMonth">上个月</option>'
										+'	<option value="1">近一个月</option>'
										+'	<option value="3">近三个月</option>'
										+'	<option value="6">最近半年</option>'
//										+'	<option value="12">最近一年</option>'
										+'	<option value="custom">自定义</option>'
										+'</select>'
					            	+'</li>'
					            	+'<li class="compareOrigin" style="margin-top:-3px">'
					            	+'	<input type="text" style="width:70px" class="text textDefault date_0_s" readonly="true"/> - <input type="text" style="width:70px" class="text textDefault date_0_e" readonly="true"/>'
					            	+'</li>'
//					            	+'<li>'
//					            	+'	<label>'
//				            		+'		<input class="compareSwitch" type="checkbox">比较日期范围：'
//				            		+'	</label> '
//				            		+'	<select class="compareInterval disabled" disabled="disabled">'
//				            		+'		<option value="previousperiod">上一时间段</option>'
//				            		+'		<option value="previousyear">去年</option>'
//				            		+'		<option value="custom">自定义</option>'
//				            		+'	</select>'
//					            	+'</li>'
					            	+'<li style="height:40px">'
					            	+'	<label style="line-height:25px;float:left;">'
				            		+'		选择整月：'
				            		+'	</label> '
				            		+'<div class="yearInterval"><div class="yearLeftBtn"> < </div><div style="width:78px;height:25px;overflow:hidden;position:relative;float:left;"><div class="yearMiddle"><a>2011</a><a>2011</a><a>2011</a><a>2011</a></div></div><div class="yearRightBtn btnsReadonly"> > </div></div>'
				            		+'<div class="monthInterval"><a href="javascript:;">1</a><a href="javascript:;">2</a><a href="javascript:;">3</a><a href="javascript:;">4</a><a href="javascript:;">5</a><a href="javascript:;">6</a><a href="javascript:;">7</a><a href="javascript:;">8</a><a href="javascript:;">9</a><a href="javascript:;">10</a><a href="javascript:;">11</a><a href="javascript:;">12</a></div>'
//				            		+'	<select  class="dateYearInterval compareInterval">'
//				            		+'		<option>2013</option>'
//				            		+'		<option>2012</option>'
//				            		+'	</select>'
//				            		+' - '
//				            		+'	<select class="dateMonthInterval compareInterval">'
//				            		+'		<option>1</option>'
//				            		+'		<option>2</option>'
//				            		+'	</select>'
					            	+'</li>'
					            	+'<li class="compareDate">'
					            	+'	<input type="text" style="width:70px" class="text textDefault date_1_s"/> - <input type="text" style="width:70px" class="text textDefault date_1_e"/>'
					            	+'</li>'
					            	+'<li class="operate"><div class="operateCon">'
					            	+'	<input type="button" class="btn btnPrimary applyBtn" value="确定"/><a href="javascript:;" class="cancelBtn">取消</a>'
					            	+'</div></li>'
					            +'</ul>'
				            +'</div>'
						+'</div>');
				return box;
			},
			

			// 创建月份
			createMonthHTML: function(d){
				var days = [];
				d.setDate(1);
				var lastMonth = new Date(d.getTime() - 86400000);
				if (d.getDay() > 0){
					for(var i = d.getDay(); i>0; i--){
						var day = new Date(d.getTime() - 86400000*i);
						days.push({type:'lastMonth',day: day.getDate(),time:day.getTime() });
					}
				}
				var toMonth = d.getMonth();
				for(var i=0; i<40; i++){
					var today = new Date(d.getTime() + 86400000*i);
					days.push({type: today.getMonth() == toMonth ? 'toMonth' : 'nexMonth',day: today.getDate(),time:today.getTime() });
				}
				var html = [];
				for(var week=0; week<6; week++){
					if (days[week*7].type == 'nexMonth') break;
					html.push('<tr>');
					for(var day = 0; day<7; day++){
						var today = days[week*7+day];
						html.push('<td><a time="'+today.time+'" href="javascript:;" class="day '+today.type+'">'+today.day+'</a></td>');
					}
					html.push('</tr>');
				}
				return html.join('');
			},
			//创建下拉框
//			createSelecteYear:function(disableDate){
//				$('.dateYearInterval').html('');
//				$('.dateMonthInterval').html('');
//				var _sY = new Date(disableDate).getFullYear(),
//					_sM = new Date(disableDate).getMonth(),
//					_sD = new Date(disableDate).getDate(),
//					current = new Date();
//				var _c = current.getFullYear();
//				var currentM = current.getDate() == 1 || current.getDate() == '1';
//				if(currentM){_c = current.getFullYear() - 1}
//				var len = parseInt(_c - _sY) + 1;
//				var firstMonth = 1, lastMonth = 13;
//				for(var i=0;i<len;i++){
//					var _d = parseFloat(_c)-i
//					$('.dateYearInterval').append('<option>'+_d+'</option>');
//				}
//				if($('.dateYearInterval').val() == _c){
//					if(currentM){
//						lastMonth = 13;
//					}else{
//						lastMonth = current.getMonth() + 1;
//					}
//				}
//				for(var i=firstMonth;i<lastMonth;i++){
//					$('.dateMonthInterval').append('<option>'+i+'</option>');
//				}
//				$('.dateYearInterval').change(function(){
//					$('.dateMonthInterval').html('');
//					var _sY = new Date(disableDate).getFullYear(),
//					_sM = new Date(disableDate).getMonth(),
//					_sD = new Date(disableDate).getDate(),
//					ccurrent = new Date();
//					var _c = current.getFullYear();
//					var firstMonth = 1, lastMonth = 13;
//					var currentM = current.getDate() == 1 || current.getDate() == '1';
//					if($('.dateYearInterval').val() == _c){
//						if(currentM){
//							lastMonth = 13;
//						}else{
//							lastMonth = current.getMonth() + 1;
//						}
//					}
//					if($('.dateYearInterval').val() == _sY){
//						if(_sD == 1 || _sD == '1'){
//							firstMonth = _sM + 1;
//						}else{
//							firstMonth = _sM + 2;	
//						}
//							
//					}
//					for(var i=firstMonth;i<lastMonth;i++){
//						$('.dateMonthInterval').append('<option>'+i+'</option>');
//					}
//					changeRange();
//				});
//				box.find('.dateMonthInterval').change(function(){
//					changeRange();
//				});
//				function changeRange(){
//					box.find('.date_0_s').removeClass('textActive').addClass('textDefault');
//					box.find('.date_0_e').removeClass('textActive').addClass('textDefault');
//					var _year = box.find('.dateYearInterval').val(),_month = box.find('.dateMonthInterval').val(),_nextMonth = parseInt(_month) + 1;
//					_month =_month < 10 ? '0'+_month : _month;
//					var _s = new Date(_year+'-'+_month+'-01'),_e;
//					C.setDateZero(_s);
//					_start = _s.getTime();
//					if(_month == 12 || _month == '12'){
//						_year = parseInt(_year) + 1;
//						_e = new Date(_year+'-01-01');
//					}else{
//						_nextMonth =_nextMonth < 10 ? '0'+_nextMonth : _nextMonth;
//						_e = new Date(_year+'-'+_nextMonth+'-01')
//					}					
//					C.setDateZero(_e);
//					_end = _e.getTime()- 86400000;
//					box.find('.date_0_s').val(C.dateToString(new Date(_start)));
//					box.find('.date_0_e').val(C.dateToString(new Date(_end)));
//					C.setDateRange(_s,new Date(_end));
//					if(box.find('.compareInterval').val() == 'custom'){
//						box.find('.date_1_s').addClass('textActive');
//					}
//				}
//				
//			},
			createSelectYear:function(disableDate){
				$('.yearInterval .yearMiddle').html('');
				var _sY = new Date(disableDate).getFullYear(),
					_sM = new Date(disableDate).getMonth(),
					_sD = new Date(disableDate).getDate(),
					current = new Date();
				var _c = current.getFullYear();
				var currentM = current.getMonth() == 0 || current.getMonth() == '0';
				if(currentM){_c = current.getFullYear() - 1}
				var len = parseInt(_c - _sY) + 1;
				var firstMonth = 1, lastMonth = 13;
				var _tempHTML = '';
				for(var i=0;i<len;i++){
					var _d = parseFloat(_c)-i;
					if(_d == _c){
						_tempHTML = '<a href="javascript:;" class="active">'+_d+'</a>' + _tempHTML;
					}else{
						_tempHTML = '<a href="javascript:;">'+_d+'</a>' + _tempHTML;	
					}
				}
				$('.yearMiddle').html(_tempHTML);
				if($('.yearMiddle .active').html() == _c){
					if(currentM){
						lastMonth = 13;
					}else{
						lastMonth = current.getMonth() + 1;
					}
				}
				if($('.yearMiddle .active').html() == _sY){
					if(_sD == 1 || _sD == '1'){
						firstMonth = _sM + 1;
					}else{
						firstMonth = _sM + 2;	
					}
						
				}
				$('.monthInterval a').addClass('btnsReadonly');
				for(var i=firstMonth;i<lastMonth;i++){
					$('.monthInterval a').eq(i-1).removeClass('btnsReadonly');
				}
//				$('.monthInterval a').eq(lastMonth - 1).addClass('active');
				if($('.yearMiddle a').length > 2){
					var _left = ($('.yearMiddle a').length - 2 )*(-37);
					$('.yearMiddle').css('left',_left+'px');
				}else{
					$('.yearLeftBtn').addClass('btnsReadonly');
					$('.yearRightBtn').addClass('btnsReadonly');
				}
				//选择年份
				$('.yearMiddle a').click(function(){
					if($(this).hasClass('btnsReadonly')){return;}
					$('.yearMiddle a').removeClass('active');
					$(this).addClass('active');
					var _sY = new Date(disableDate).getFullYear(),
					_sM = new Date(disableDate).getMonth(),
					_sD = new Date(disableDate).getDate(),
					ccurrent = new Date();
					var _c = current.getFullYear();
					var firstMonth = 1, lastMonth = 13;
					var currentM = current.getMonth() == 0 || current.getMonth() == '0';
					if($('.yearMiddle .active').html() == _c){
						if(currentM){
							lastMonth = 13;
						}else{
							lastMonth = current.getMonth() + 1;
						}
					}
					if($('.yearMiddle .active').html() == _sY){
						if(_sD == 1 || _sD == '1'){
							firstMonth = _sM + 1;
						}else{
							firstMonth = _sM + 2;	
						}
							
					}
					var _selet = parseInt($('.monthInterval .active').html());
					
					$('.monthInterval a').addClass('btnsReadonly');
					for(var i=firstMonth;i<lastMonth;i++){
						$('.monthInterval a').eq(i-1).removeClass('btnsReadonly');
					}
					if(_selet < firstMonth){
						$('.monthInterval a').removeClass('active');
						$('.monthInterval a').eq(firstMonth-1).addClass('active');
					}else if(_selet > lastMonth){
						$('.monthInterval a').removeClass('active');
						$('.monthInterval a').eq(lastMonth-1).addClass('active');
					}
					changeRange();
				});
				//年份选择左
				$('.yearRightBtn').click(function(){
					if($(this).hasClass('btnsReadonly')){return;}
					var _left = ($('.yearMiddle a').length - 2 )*(-37);
					if($('.yearMiddle').position().left > _left){
					var left = $('.yearMiddle').position().left - 37;
					$('.yearMiddle').css('left',left+'px');
					$('.yearMiddle').css('left',left+'px');
					$('.yearLeftBtn').removeClass('btnsReadonly');
					if(left == _left){$('.yearRightBtn').addClass('btnsReadonly');}
					}
				});
				//年份选择右
				$('.yearLeftBtn').click(function(){
					if($(this).hasClass('btnsReadonly')){return;}
					if($('.yearMiddle').position().left < 0){
						if($(this).hasClass('btnsReadonly')){return;}
						var left = $('.yearMiddle').position().left +37;
						$('.yearMiddle').css('left',left+'px');
						$('.yearRightBtn').removeClass('btnsReadonly');
						if(left == 0 || left == '0' || left == '0px'){
							$('.yearLeftBtn').addClass('btnsReadonly');
						}
					}
					
				});
				//选择月份
				$('.monthInterval a').click(function(){
					if($(this).hasClass('btnsReadonly')){return;}
					$('.monthInterval a').removeClass('active');
					$(this).addClass('active');
					changeRange();
				});
				function changeRange(){
					if($('.yearMiddle .active').length < 1 || $('.monthInterval .active').length < 1){return;}
					box.find('.date_0_s').removeClass('textActive').addClass('textDefault');
					box.find('.date_0_e').removeClass('textActive').addClass('textDefault');
					box.find('.date_0_s').removeClass('textDefault');
					box.find('.date_0_e').removeClass('textDefault');
					
					box.find('.compareDate input').removeClass('textActive');

					box.find('.date_0_s').addClass('textActive');
					box.find('.compareOpt').val('custom');
					var _year = box.find('.yearMiddle .active').html(),_month = box.find('.monthInterval .active').html(),_nextMonth = parseInt(_month) + 1;
					_month =_month < 10 ? '0'+_month : _month;
					var _s = new Date(_year+'-'+_month+'-01'),_e;
					C.setDateZero(_s);
					_start = _s.getTime();
					if(_month == 12 || _month == '12'){
						_year = parseInt(_year) + 1;
						_e = new Date(_year+'-01-01');
					}else{
						_nextMonth =_nextMonth < 10 ? '0'+_nextMonth : _nextMonth;
						_e = new Date(_year+'-'+_nextMonth+'-01')
					}					
					C.setDateZero(_e);
					_end = _e.getTime()- 86400000;
					box.find('.date_0_s').val(C.dateToString(new Date(_start)));
					box.find('.date_0_e').val(C.dateToString(new Date(_end)));
					C.setDateRange(_s,new Date(_end));
					if(box.find('.compareInterval').val() == 'custom'){
						box.find('.date_1_s').addClass('textActive');
					}
				}
			},
			getLastWeek:function(){
				var Nowdate=new Date(_date),WeekDay=Nowdate.getDay();
				var WeekFirstDay=new Date(Nowdate-(WeekDay-1)*86400000);
				var lastWeekFirstDay = date2Str(new Date(WeekFirstDay-86400000*7));
				
				var  lastWeekLastDay= date2Str(new Date(WeekFirstDay-86400000));
				var dateArr = [];
				dateArr.push(lastWeekFirstDay);
				dateArr.push(lastWeekLastDay);
				return  dateArr;
			},
			getLastMonth:function(){
				var Nowyear=(new Date(_date)).getFullYear(),Nowmonth=(new Date(_date)).getMonth();
				var MonthFirstDay=new Date(Nowyear,Nowmonth,1);
				var lastMonthFirstDay = date2Str(new Date(MonthFirstDay.getFullYear(),MonthFirstDay.getMonth()-1,1));
				var lastMonthLastDay = date2Str(new Date(MonthFirstDay-86400000));
				var dateArr = [];
				dateArr.push(lastMonthFirstDay);
				dateArr.push(lastMonthLastDay);
				return  dateArr;
			}
			/*--- util 工具类 end ---*/
		}

		var _currentDate = C.setDateZero(opt.currentDate);

		
		var box;
		
		$(this).addClass('calendarCompare');

		_start = false;
		_end = false;
		_startC = false;
		_endC = false;

		var startStr, endStr;

		var isIE6 = $.browser.msie && ($.browser.version == '6.0');

		$('.toMonth').live('hover',function(){$(this).addClass('toMonthHover');});
		$('.toMonth').live('mouseleave',function(){$(this).removeClass('toMonthHover');});

		$('.selectList a').live('hover',function(){$(this).addClass('hover');});
		$('.selectList a').live('mouseleave',function(){$(this).removeClass('hover');});


		var _originDate = $(this);
//		var _compareDate = $(this).find('.compareDate');
		
		_originDate.val(opt.defaultDate).attr('interval', 'custom');
		
		var _self = $(this);
		
		$(this).click(function(e){
			e.stopPropagation();
			if($(this).attr('calendarOpenned')){
				C.closeCalendar();
				return;
			}

			// 绑定显示日历的属性
			$(this).attr('calendarOpenned',true);

			var box = C.createDom().hide();
			$(document.body).append(box);

			// 显示月份
			for(var i = 1; i <= parseInt(opt.monthSize); i++){
				box.find('.calendarCompareCon').append('<div class="month'+i+' monthItem">'
					+'<div class="caption">'
					+'<div class="prevYearTh"><a class="prevYear" href="javascript:;"><<</a></div>'
					+'<div><a class="prevMonth" href="javascript:;"><</a></div>'
					+'<div><a href="javascript:;" class="monthName" id="monthName_'+i+'"><span class="yearVal">2011</span>年<span class="monthVal">06</span>月</a></div>'
					+'<div><a class="nextMonth" href="javascript:;" >></a></div>'
					+'<div class="nextYearTh"><a class="nextYear" href="javascript:;" >>></a></div>'
					+'</div>'
					+'<div class="weekName"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>'
					+'<table class="dateTable" cellspacing="0" cellpadding="0" border="0"></table>'
					+'<div class="selectPanel" id="SelectPanel_'+i+'">'
					+'<div class="selectPanelTop"></div>'
					+'<div class="selectList selectListMonth"><a href="javascript:;" monthval="1">1月</a><a href="javascript:;" monthval="2">2月</a><a href="javascript:;" monthval="3">3月</a><a href="javascript:;" monthval="4">4月</a><a href="javascript:;" monthval="5">5月</a><a href="javascript:;" monthval="6">6月</a><a href="javascript:;" monthval="7">7月</a><a href="javascript:;" monthval="8">8月</a><a href="javascript:;" monthval="9">9月</a><a href="javascript:;" monthval="10">10月</a><a href="javascript:;" monthval="11">11月</a><a href="javascript:;" monthval="12">12月</a></div>'
					+'<div class="selectList selectListYear"><a href="javascript:;" class="prevA">&lt;</a><a href="javascript:;" class="nextA">&gt;</a><div class="yearList"></div></div>'
					+'<div class="botBtn"><input type="button" class="selectedBtn" value="确定"/>&nbsp;<input type="button" class="selectedCancel" value="取消"/></div>'
					+'</div>'
					+'</div>');
			}


			var _boxTop, 
				thisOffsetTop = $(this).offset().top, 
				thisOuterHeight = $(this).outerHeight(),
				boxOuterHeight = box.outerHeight();
			
			if(thisOffsetTop > boxOuterHeight && thisOffsetTop + thisOuterHeight + opt.offsetY + boxOuterHeight > document.documentElement.clientHeight + document.documentElement.scrollTop + document.body.scrollTop){
				_boxTop = thisOffsetTop - boxOuterHeight;
			}else{
				_boxTop = thisOffsetTop + thisOuterHeight + opt.offsetY;
			}
			box.width(opt.monthSize*180+195);
			box.css({'top': _boxTop, 'left':($(this).offset().left) + opt.offsetX});

			box.slideDown(100);

			box.click(function(e){
				e.stopPropagation();
			});

			var defaults = _originDate.val();
//			var defaultsC = _compareDate.val();
			var defaultsC = '';

			// 已经有选择的日期则按照这个日期段显示，如果没有显示当前日期的区间
			if(defaults != ""){
				defaults = C.stringToDate(defaults).split('至');

				if(defaultsC != ''){
					defaultsC = C.stringToDate(defaultsC).split('至');
					_startC = new Date(defaultsC[0]).getTime();
					_endC = new Date(defaultsC[1]).getTime();

					box.find('.compareSwitch').attr('checked', true);
					box.find('.compareInterval').val(_compareDate.attr('interval')).removeAttr('disabled').removeClass('disabled');
					box.find('.compareDate').show();

					box.find('.date_1_s').val(C.dateToString(new Date(parseFloat(_startC))));
					box.find('.date_1_e').val(C.dateToString(new Date(parseFloat(_endC))));

					if(_compareDate.attr('interval') == 'custom'){
						box.find('.date_1_s').removeClass('textDefault');
						box.find('.date_1_e').removeClass('textDefault');

						if(_originDate.attr('interval') != 'custom'){
							box.find('.date_1_s').addClass('textActive');
						}
					}
				}

				box.find('.compareOpt').val(_originDate.attr('interval'));

				if(_originDate.attr('interval') == 'custom'){
					box.find('.compareOrigin .text').removeClass('textDefault');
					box.find('.date_0_s').addClass('textActive');
				}

				C.setDateRange(new Date(defaults[0]),new Date(defaults[1]));
			}else{
				_start = C.dateToString(_currentDate).replace('-','/').replace('-','/');
				_end = _start;

				C.setDateRange(new Date(_start), new Date(_end));
			}

			// ie6下select没法遮住，使用了添加iframe的方法遮盖。
			if(isIE6){
				$(document.body).append("<iframe scrolling='no' frameborder='0' id='Iframe' style='position:absolute;'/></iframe>");
				$('#Iframe').css({'width' : box.width()+12, 'height' : box.find('.calendarCompareCon').outerHeight()+12, 'top' : box.css('top'), 'left' : box.css('left')});
			};

			// 点击网页隐藏日历框
			$(document).bind('click.calendar',function(e){
				if(!$(e.target).closest('#TimeCompareSwitch').is('a') || $('#TimeCompareSwitch').html() != '关闭对比'){
					C.closeCalendar();
				}
			});



			box.find('.date_0_s').val(C.dateToString(new Date(_start)));

			if(_end == false){
				box.find('.date_0_e').val(C.dateToString(new Date(_start)));
			}else{
				box.find('.date_0_e').val(C.dateToString(new Date(_end)));
			}
//-------------------
//			C.createSelecteYear(opt.disableDate);
			C.createSelectYear(opt.disableDate);
//-------------------
			box.find('.compareOpt').change(function(){
				box.find('.compareOrigin .textActive').removeClass('textActive');

				var _compareOpt = $(this).val();
				if(_compareOpt == 'custom'){
					box.find('.date_0_s').removeClass('textDefault');
					box.find('.date_0_e').removeClass('textDefault');
					
					box.find('.compareDate input').removeClass('textActive');

					box.find('.date_0_s').addClass('textActive');

				}else{
					box.find('.date_0_s').removeClass('textActive').addClass('textDefault');
					box.find('.date_0_e').removeClass('textActive').addClass('textDefault');
					if(_compareOpt == 'lastWeek' || _compareOpt == 'lastMonth'){
						if(_compareOpt == 'lastWeek'){
							var _s = new Date(C.getLastWeek()[0]),_e = new Date(C.getLastWeek()[1]);
							C.setDateZero(_s);C.setDateZero(_e);
							_start = _s;
							_end = _e;
							C.showSelectedDays();
							box.find('.date_0_s').val(C.dateToString(new Date(_start)));
							box.find('.date_0_e').val(C.dateToString(new Date(_end)));
							C.setDateRange(new Date(_start),new Date(_end));
						}else{
							var _s = new Date(C.getLastMonth()[0]),_e = new Date(C.getLastMonth()[1]);
							C.setDateZero(_s);C.setDateZero(_e);
							_start = _s;
							_end = _e;
							C.showSelectedDays();
							box.find('.date_0_s').val(C.dateToString(new Date(_start)));
							box.find('.date_0_e').val(C.dateToString(new Date(_end)));
							C.setDateRange(new Date(_start),new Date(_end));
						}
					}else{
						var _cy = _currentDate.getFullYear(),_cm = _currentDate.getMonth()+1,_cd = _currentDate.getDate();
						var _m = _cm < 10 ? '0'+_cm : _cm ;
						var _now = new Date(_cy+'-'+_m+'-'+_cd);
						if(_cm - _compareOpt > 0){
							_cm =  _cm - _compareOpt
						}else{
							_cy = _cy - 1;
							_cm = _cm - _compareOpt + 12;
						}
						_cm = _cm < 10 ? '0'+_cm : _cm ;
						_cd = _cd < 10 ? '0'+_cd : _cd ;
						//当前为本月最后一天时，往前推算指定月的最后一天（大小月最后一天不一样）
						if(new Date(_now.getTime()+ 86400000).getDate() == 1 || new Date(_now.getTime()+ 86400000).getDate() == '1'){
							if(_cm == 12){
								_cd = '31'
							}else{
								var _cc = parseInt(_cm) +1
								_cc = _cc < 10 ? '0'+_cc : _cc ;
								var _n = new Date(_cy+'-'+_cc+'-01');
								_cd = 	new Date(_n.getTime() - 86400000).getDate() ;
							}
						}
						var	_s = new Date(_cy+'-'+_cm+'-'+_cd);
						C.setDateZero(_s);
						C.setDateZero(_now);
						_start = _s.getTime()+ 86400000;
						_end = _currentDate.getTime();
						
						C.showSelectedDays();
						box.find('.date_0_s').val(C.dateToString(new Date(_start)));
						box.find('.date_0_e').val(C.dateToString(new Date(_currentDate)));
						C.setDateRange(new Date(_start),new Date(_end));
					}
//					if(box.find('.compareInterval').val() == 'custom'){
//						box.find('.date_1_s').addClass('textActive');
//					}
				}

				if(box.find('.compareSwitch').attr('checked')){
					C.getCompareDate();
				}

			});

			box.find('.compareInterval').change(function(){
				if(box.find('.compareSwitch').attr('checked')){

					if($(this).val() == 'custom'){
						box.find('.textActive').removeClass('textActive');
						box.find('.date_1_s').removeClass('textDefault').addClass('textActive');
						box.find('.date_1_e').removeClass('textDefault');
					}else{
						box.find('.date_1_s').addClass('textDefault');
						box.find('.date_1_e').addClass('textDefault');

						box.find('.compareDate .text').removeClass('textActive');

						if(box.find('.compareOpt').val() == 'custom'){
							box.find('.date_0_s').addClass('textActive');
						}
					}
					C.getCompareDate();
				}
			});

			box.find('.compareSwitch').click(function(){
				if($(this).attr('checked')){
					box.find('.compareInterval').removeAttr('disabled').removeClass('disabled');

					box.find('.compareDate').show();

					C.getCompareDate();
					
				}else{
					box.find('.compareInterval').attr('disabled', 'disabled').addClass('disabled');

					box.find('.compareDate').hide();
					box.find('.toMonth').each(function(){
						$(this).removeClass('checkedCompare checkedCompareCross');
					});
				}
			});

			
			box.find('.todayBtn').bind('click.calendar',function(){
				_start = C.dateToString(_currentDate).replace('-','/').replace('-','/');
				_end = _start;
				C.setDateRange(new Date(_start), new Date(_end));
			});


			// 下一月
			box.find('.nextMonth').bind('click.calendar',function(){
				for(var i = 1; i <= opt.monthSize; i++){
					C.showMonth(C.changeMonth(opt['month'+i],1), 'month'+i);
				};
				C.showSelectedDays();

			});

			// 上一月
			box.find('.prevMonth').bind('click.calendar',function(){
				for(var i = 1; i <= opt.monthSize; i++){
					C.showMonth(C.changeMonth(opt['month'+i],-1), 'month'+i);
				};
				C.showSelectedDays();
			});
			
			// 下一年
			box.find('.nextYear').bind('click.calendar',function(){
				for(var i = 1; i <= opt.monthSize; i++){
					C.showMonth(C.changeYear(opt['month'+i],1), 'month'+i);
				};
				C.showSelectedDays();
			});
			
			// 上一年
			box.find('.prevYear').bind('click.calendar',function(){
				for(var i = 1; i <= opt.monthSize; i++){
					C.showMonth(C.changeYear(opt['month'+i],-1), 'month'+i);
				};
				C.showSelectedDays();
			});
			
			// 点击选择日期
			box.bind('click',function(e){
				if ($(e.target).hasClass('day') && $(e.target).hasClass('toMonth')){
					C.dayClicked($(e.target));
				}
			});

			// 日历中的月份年份选择
			box.find('.monthName').bind('click',function(){
				$(".selectPanel").hide();
				var thisId = $(this).attr("id");
				thisId = thisId.substring(thisId.lastIndexOf("_"));
				
				var yearVal = $(this).find(".yearVal").html();
				var monthVal = $(this).find(".monthVal").html();

				var selectPanel = $("#SelectPanel"+thisId);

				selectPanel.find(".selectPanelTop").html(yearVal+"年 "+monthVal+"月");

				var monthA = selectPanel.find(".selectListMonth a");
				var yearA = selectPanel.find(".selectListYear .yearList a");

				$.each(monthA, function(i,v){
					if(monthVal == $(this).attr("monthval")){
						$(this).addClass("selected");
					}else{
						$(this).removeClass("selected");
					}
				});

				var yearList = selectPanel.find(".yearList");
				$(".yearList").html("");

				var startYear = parseInt(yearVal) - 4;
				var endYear = parseInt(yearVal) + 4;
				for(var i = startYear; i < endYear; i++){
					if(i == yearVal){
						yearList.append('<a href="javascript:;" yearval="'+i+'" class="selected">'+i+'</a>');
					}else{
						yearList.append('<a href="javascript:;" yearval="'+i+'">'+i+'</a>');
					}
				}

				$(".selectListMonth a").bind("click.select",function(){
					$(this).addClass("selected").siblings().removeClass("selected");
				});

				$(".selectListYear .yearList a").bind("click.select",function(){
					$(this).addClass("selected").siblings().removeClass("selected");
				});

				$(".selectListYear .prevA").bind("click.select",function(){
					var endYear = $(".selectListYear .yearList a").eq(0).attr("yearval");
					$(".yearList").html("");
					for(var i = parseInt(endYear) - 8; i < endYear; i++){
						if(i == yearVal){
							yearList.append('<a href="javascript:;" yearval="'+i+'" class="selected">'+i+'</a>');
						}else{
							yearList.append('<a href="javascript:;" yearval="'+i+'">'+i+'</a>');
						}
					}

					$(".selectListYear .yearList a").bind("click.select",function(){
						$(this).addClass("selected").siblings().removeClass("selected");
					});
				});

				$(".selectListYear .nextA").bind("click.select",function(){
					var startYear = parseInt($(".selectListYear .yearList a").eq(7).attr("yearval"))+1;
					$(".yearList").html("");
					for(var i = startYear; i < parseInt(startYear) + 8; i++){
						if(i == yearVal){
							yearList.append('<a href="javascript:;" yearval="'+i+'" class="selected">'+i+'</a>');
						}else{
							yearList.append('<a href="javascript:;" yearval="'+i+'">'+i+'</a>');
						}
					}

					$(".selectListYear .yearList a").bind("click.select",function(){
						$(this).addClass("selected").siblings().removeClass("selected");
					});
				});

				$(".selectedBtn").bind("click.select", function(){
					$(".selectListMonth a").each(function(){
						if($(this).hasClass("selected")){
							monthVal = $(this).html();
						}
					});

					$(".selectListYear a").each(function(){
						if($(this).hasClass("selected")){
							yearVal = $(this).html();
						}
					});

					var dateStr = yearVal + "/" + (parseInt(monthVal)) + "/01";
					var _index = thisId.substring(1);

					for(var i = 1; i <= opt.monthSize; i++){
						var date = new Date(dateStr);
						var le = i-_index;                                                                                            
						C.showMonth(C.changeMonth(date,le), 'month'+i);
					};

					selectPanel.slideUp(100);
					$(".selectPanel a").unbind('.select');

				});

				$(".selectedCancel").bind("click.select", function(){
					selectPanel.slideUp(100);
					$(".selectPanel a").unbind('.select');
				});

				selectPanel.show();
			});

			
			// 确定按钮
			box.find('.applyBtn').click(function(){
				(!_end) && (_end = _start);
				var startDate = C.dateToString(new Date(_start));
				var endDate = C.dateToString(new Date(_end));

				_originDate.val(startDate+' 至 '+endDate);
					
				_originDate.attr('interval', box.find('.compareOpt').val());
				if(box.find('.compareSwitch').attr('checked')){
					_self.addClass('calendarCompareActive');
					_self.find('.compareDateWrap').show();
					_compareDate.val(box.find('.date_1_s').val() + ' 至 ' + box.find('.date_1_e').val());
					_compareDate.attr('interval', box.find('.compareInterval').val());
					
				}else{
					_self.removeClass('calendarCompareActive');
					_self.find('.compareDateWrap').hide();
//					_compareDate.removeAttr('interval').val('');
				}
				
				C.closeCalendar();
				opt.applyCallback();
			});
			
			// 取消按钮
			box.find('.cancelBtn').click(function(){
				C.closeCalendar();
			});
			
			// 日历框初始化完毕
			opt.initCallback();
			
		});
	};
});
