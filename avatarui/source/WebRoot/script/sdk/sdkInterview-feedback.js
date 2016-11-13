/**
 * SDK 访问概况
 * @author	Rocky
 * @date	2012-03-17
 * 503行给爱贝支付开放注册维度
 * 1146,7天累计
 */

define(function(require){
	window.startDate = '2012-05-01';
    require('common.js');
    require('calendar');
    require('calendar_compare');
    require('datagrid');
    require('tipbox');
    require('dialog');
    require('imitselect');
    require('highcharts_3.0.1');
    require('createLineChartCompare');
    require('sdk/sdkInterviewCommon.js');
    
var reportName = "productUserVisitOverviewMulti";
var norm = 0, lineTitle = "到达";
var thisHref = window.location.href;
var _appKey = thisHref.split('appkey=')[1];
var appKey = 'appKey=' + _appKey;

//var dateInterval = [], dateName = ['昨天', '7天均值', '近一个月均值', '累计均值'];
var dateInterval = [], dateName = ['昨天', '7天均值'];

var cacheVersion, cacheChannel, cacheModel, cacheReg;
var fixedDataMethod = 'getFixedJsonData';
var hours = _date.getHours();
var hourControl = 10;

var _yesterday = getPastDate(_date, 1);

var _lastSevenDay = date2Str(getPastDate(_date, 7)) + ' 至 ' + date2Str(getPastDate(_date, 1));

var normObj = {
	'arrived': '到达',
	'displayed': '展现',
	'sysmsgclicked': '点击',
	's2nddisplayed': '二次展现',
	's2ndclicked': '二次点击',
	'downloaded': '下载',
	'installed': '安装',	
	'activated': '激活'			
};

var summaryUrlPrefix = '/summaryfeedback';

var adid = '';
var pid = '';

function getLastWeek(date){
	var _monday = date.getDay() == 0 ? 7 : date.getDay();
	var date1 = new Date();
	date1.setDate(date.getDate() - _monday - 6);
	var date2 = new Date();
	date2.setDate(date.getDate() - _monday);
	return [date2Str(date1), date2Str(date2)];
}

function getLastMonth(date){
	var _month = date.getMonth();
	var year = date.getFullYear();
	return [year + '-' + singular(_month) + '-01', year + '-' + singular(_month) + '-31'];
}

$(function(){
	if(tempHtmlOld == ''){
	tempHtmlOld = $('#Page').html();
	tempHtmlNew = $('#RegPage').html();
 }
	var aibei = _appKey == 'QDLENGR0KOUD' ? true : false;
	var letongbu = _appKey == 'PJPRUFMX2B3H' ? true : false;
	var lejishi= _appKey == '9PZJIUIQ0S5Q' ? true : false;
	if(letongbu || aibei || lejishi){
		$('#RegOpt').show();
	}

	$('#AppRegOptTip').hover(function(){
    	var _left = $('#AppRegOpt').offset().left - 100;
    	var _top = $('#AppRegOpt').offset().top - 135;
    	$(document.body).append('<div id="AppRegOptTipCon" style="left:'+_left+'px; top:'+_top+'px;">1、所有选项：不区分用户是否登录LenovoID的设备使用情况，（注：新用户数，为时段内第一次使用应用的独立设备数）<br/>'
    			+'2、注册选项：反映登录了LenovoID的设备的使用情况（注：新用户数为首次注册登录的独立设备数）<br/>'
    			+'3、非注册选项：反映未登录LenovoID的设备的使用情况（注：新用数为时段内第一次使用应用的独立设备数,通常需要开启应用后才能登录或注册，因此登录之前会记为“未登录(未注册)用户”，故“未注册”的新用户数与“所有”的新用户数可能相等。）</div>')
    }, function(){
    	$('#AppRegOptTipCon').remove();
    });
	
	
	if(_appKey == 'ZGWN9HD1JBXM'){
		$('#TrendTab li').eq(6).hide();
	}
	if($('#ReportList li[appkey=7doMcXhXD199]').length>0){
		$('#SDACexplain').show();
	}
	
	if(_appKey == 'PJPRUFMX2B3H'){
		$('.newRegUser').show();
	}
	
	
	initBind(function(){
		if(_appKey == 'PJPRUFMX2B3H'){
			$('.newRegUser').show();
		}
		getMultiOpt();
    	dateReload();
    });
	
	
	$('#TimeTrendFold').click(function(){
		if($(this).html() == '展开'){
			$('#TimeTrendH2').removeClass('globalTitleFolded');
			$('#TimeTrendCon').show();
			$(this).html('收起');
		}else{
			$('#TimeTrendH2').addClass('globalTitleFolded');
			$('#TimeTrendCon').hide();
			$(this).html('展开');
		}
		getTimeTrendData();
	});
	
	$('#DatagridDetailFold').click(function(){
		if($(this).html() == '展开'){
			$('#DatagridDetailH2').removeClass('globalTitleFolded');
			$('#DatagridDetailCon').show();
			$('#ExportExcel').show();
			$(this).html('收起');
			getDateGridData();
		}else{
			$('#DatagridDetailH2').addClass('globalTitleFolded');
			$('#DatagridDetailCon').hide();
			$('#ExportExcel').hide();
			$(this).html('展开');
		}
	});
	
/*
	$('#NewUser').unbind('click').bind('click',function(){
		$('#NewUser').addClass('selected');
		$('#StartNum').removeClass('selected');
		getTimeTrendData();
	});
	
	$('#StartNum').unbind('click').bind('click',function(){
		$('#StartNum').addClass('selected');
		$('#NewUser').removeClass('selected');
		getTimeTrendData();
	});
	*/
    
    //自动提示
	$('.totalTable .tip').TipBox({
	    location: 'Top',
        width: 120
    });
	
	getMultiOpt();
	fullListItem();
    $('#TrendTab li').click(function(){
    	$('#TrendTab li').removeClass('active');
    	$(this).addClass('active');
    	norm = $(this).attr('index');
    	lineTitle = $(this).html();
    	
    	getLinechartData();
    });
    
	//导出excel
	$("#ExportExcel").click(function(){
		var _data = getAjaxParam();
		
		if(_data[1] == 'productUserVisitOverview'){
			var dateArr = getDateParam(),
				startDate = dateArr[0],
				endDate = dateArr[1];
			var excelColName, sqlName = 'gridSqlIdNoPCM';
			if(_appKey == 'PJPRUFMX2B3H'){
				excelColName = '时间,浏览量,新用户,累计用户,启动用户,启动次数,单次平均使用时长(秒),新注册用户';
				exportColumns = 'date,pv,newUserNum,accumUserNum,startUserNum,startTimeNum,avgUseDateLength,pcmUsers';
				sqlName = 'gridSqlId';
			}else{
				excelColName = '时间,浏览量,新用户,累计用户,启动用户,启动次数,单次平均使用时长(秒)';
				exportColumns = 'date,pv,newUserNum,accumUserNum,startUserNum,startTimeNum,avgUseDateLength';
			}
			$.exportExcel({
				url: projectName+"/excelAction.do?method=write2Excel&reportName=productUserVisitOverview"
				 +"&startDate="+startDate+"&endDate="+endDate+"&appKey="+appKey
				 +"&sqlId="+sqlName+"&exportColumns="+exportColumns,
				fileName: $('#ReportName').html()+"_概况明细数据---"+$("#FixedDate").val(),
				excelColName: excelColName
			});
		}else{
			var _url, excelColName;
			var _tableName = _data[0].tableName;
			var _multi = _tableName.indexOf('SINGLE_BY') < 0;
			
			if(_appKey == 'ZGWN9HD1JBXM' || _multi){
				if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
					excelColName = '时间,浏览量,新用户,升级用户,累计用户,启动用户,启动次数';
					exportColumns = 'date,pv,newUserNum,updateUser,accumUserNum,startUserNum,startTimeNum';
				}else{
					excelColName = '时间,浏览量,新用户,累计用户,启动用户,启动次数';
					exportColumns = 'date,pv,newUserNum,accumUserNum,startUserNum,startTimeNum';
				}
			}else{
				if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
					excelColName = '时间,浏览量,新用户,升级用户,累计用户,启动用户,启动次数,单次平均使用时长(秒)';
					exportColumns = 'date,pv,newUserNum,updateUser,accumUserNum,startUserNum,startTimeNum,avgUseDateLength';
				}else{
					excelColName = '时间,浏览量,新用户,累计用户,启动用户,启动次数,单次平均使用时长(秒)';
					exportColumns = 'date,pv,newUserNum,accumUserNum,startUserNum,startTimeNum,avgUseDateLength';
				}
			}

			var dataParam = _data[0];
			_url = projectName+'/excelAction.do?method=write2Excel&reportName=productUserVisitOverviewMulti'
			 +'&startDate='+dataParam.startDate+'&endDate='+dataParam.endDate+'&tableName='+dataParam.tableName+'&appKey='+appKey
			 +'&sqlId=gridSqlId&exportColumns='+exportColumns;
			if(dataParam.appVersion){
				_url += '&appVersion='+dataParam.appVersion;
			}
			if(dataParam.appChannel){
				_url += '&appChannel='+dataParam.appChannel;
			}
			if(dataParam.appModel){
				_url += '&appModel='+dataParam.appModel;
			}
			if(dataParam.appReg){
				_url += '&appReg='+dataParam.appReg;
			}
			$.exportExcel({
				url: _url,
				fileName: $('#ReportAnchor').html()+'_概况明细数据---'+$("#FixedDate").val(),
				excelColName: excelColName
			});
		}
	});
	$('#ReportHelp').unbind('click').bind('click');
	$('#ReportHelp').click(function(){
		$.Dialog({
			width: 800,
			title: '报表解读',
			contentDom: '#Help',
			scroll: false
		});
	});
	
	$('#SinglePix').click(function(){
		var _data = getAjaxParam();
		$.extend(_data[0],{'norm': norm});
		sdacTrend(_data);
	});
	$('#SearchBtn').unbind('click').bind('click');
	$('#SearchBtn').click(function(){
		
		adid = $(this).parent().find('.ADIDContent').val();
		pid = $(this).parent().find('.PIDContent').val();
		
		if($('#Tab .current').attr('page') == 'reg'){return;}
		$('.multiDataLoading').show();
		
		closeFn();
		
		getAccumData();
		getInterviewData();
	    getTimeTrendData();
	    getLinechartData();
	    getDateGridData();
	    if(isMulti() && _appKey=='PJPRUFMX2B3H'){
	    	$('.newRegUser').show();
	    }else{
	    	$('.newRegUser').hide();
	    }
	    var _data = getAjaxParam();
		var _tableName = _data[0].tableName;
		if(_tableName == 'REPORT_INTRO_MULTI_VC_ETL' || _tableName == 'REPORT_INTRO_MULTI_VD_ETL' || _tableName == 'REPORT_INTRO_MULTI_CD_ETL' || _tableName == 'REPORT_INTRO_MULTI_VCD_ETL'){
			$('#TrendTab li').eq(6).hide();
		}else{
			$('#TrendTab li').eq(6).show();
		}
	});
	
	$('.tipbox').TipBox({
	    location: 'Top',
	    theme: 'tipBoxBlue',
	    width: 110
    });
	
	$('#TimeTrendTab li').click(function(){
		$('#TimeTrendTab li').removeClass('active');
		$(this).addClass('active');
		getTimeTrendData();
	});
	
	$('#TimeCompareSwitch').click(function(){
		if($(this).html() == '时段对比'){
			$('#TimeCompareCalendar').show();
			
			$('#TimeCompareCalendar').CalendarCompare({
				offsetY: 3,
				offsetX: -530,
				currentDate: _yesterday,
		        disableDate: '2012-05-01',
		        defaultDate: _lastSevenDay,
		        applyCallback: function(){
					getTimeTrendData();
				}
			});
			$('#TimeCompareCalendar').click();
			
			$(this).html('关闭对比')
		}else{
			$(this).html('时段对比');
			$('#TimeCompareCalendar').removeClass('calendarCompareActive').find('.originDate').remove('interval').val('');
			$('#TimeCompareCalendar').find('.compareDateWrap').hide();
			$('#TimeCompareCalendar').find('.compareDate').remove('interval').val('');
			$('#TimeCompareCalendar').hide();
			getTimeTrendData();
		}
	});
	
	$('#TrendCompareSwitch').click(function(){
		$('#NormSelect1 .btn').val('请选择维度一');
		$('#NormSelect2 .btn').val('请选择维度二');
		
		$('#Norm1').val(0);
		$('#Norm2').val(0);
		
		var _width = $('.rightSide').width() - 2;
		$('#TrendCompareWrap').show().css({'width': _width, 'right': -_width});
		
		$('#TrendCompareWrap').animate({'right': 0}, 300, function(){
			$('#TrendCompareCalendar').CalendarCompare({
				offsetX: -552,
				offsetY: 3,
				currentDate: _yesterday,
		        disableDate: '2012-05-01',
		        defaultDate: _lastSevenDay,
		        applyCallback: function(){
					if($('#Norm1').val() != 0 || $('#Norm2').val() != 0){
						getLinechartDataCompare();
					}
				}
			});
		})
	});
	
	$(window).resize(function(){
		if($('#TrendCompareWrap').is(':visible')){
			var _width = $('.rightSide').width() - 2;
			$('#TrendCompareWrap').show().css({'width': _width});
		}
	});
	
	$('#CloseTrendCompare').click(function(){
		var _width = $('.rightSide').width() - 2;
		$('#TrendCompareWrap').animate({'right': -_width}, 200, function(){
			$('#TrendCompareCalendar').removeClass('calendarCompareActive').find('.originDate').remove('interval').val('');
			$('#TrendCompareCalendar').find('.compareDateWrap').hide();
			$('#TrendCompareCalendar').find('.compareDate').remove('interval').val('');
			
			$('#TrendCompareWrap').hide();
			getLinechartData();
		});
	});
	
	
	var normSelect = $('.normSelect');
	normSelect.each(function(){
		var _self = $(this), _timerFilter;
		_self.hover(function(){
			clearInterval(_timerFilter);
			_timerFilter = setTimeout(function(){
				if(_self.attr('id') == 'NormSelect1'){
					var norm = $('#Norm2').val();
				}else{
					var norm = $('#Norm1').val();
				}
				
				_self.find('li a').each(function(){
					if($(this).attr('value') == norm && $(this).attr('value') != 0){
						$(this).parents('li').hide();
					}else{
						$(this).parents('li').show();
					}
				});
				_self.find('.dropDownMenu').addClass('dropDownMenuActive');
			},150);
		},function(){
			clearInterval(_timerFilter);
			_timerFilter = setTimeout(function(){
				_self.find('.dropDownMenu').removeClass('dropDownMenuActive');
			},100);
		});
	});

	$('.normSelect .dropDownMenu a').die().live('click', function(){
		var thisFilterBtn = $(this).parents('.normSelect');
		var thisVal = $(this).attr('value');
		
		thisFilterBtn.find('.fixedValue').val(thisVal);
		thisFilterBtn.find('.dropDownMenu').removeClass('dropDownMenuActive');
		if(thisVal == 0){
			var text = thisFilterBtn.find('.fixedValue').attr('id') == 'Norm1' ? '一' : '二';
			thisFilterBtn.find('.btn').val('请选择指标' + text);
		}else{
			thisFilterBtn.find('.btn').val(normObj[thisVal]);
		}
		
		if($('#Norm1').val() == 0 || $('#Norm2').val() == 0 || $('#Norm2').val() == $('#Norm1').val()){
			return;
		}else{
			getLinechartDataCompare();
		}
	});
	
});


function closeFn(){
	$('#TrendCompareCalendar').removeClass('calendarCompareActive').find('.originDate').remove('interval').val('');
	$('#TrendCompareCalendar').find('.compareDateWrap').hide();
	$('#TrendCompareCalendar').find('.compareDate').remove('interval').val('');
	
	$('#TrendCompareWrap').hide();

	$('#LineChart').html('<div class="loading"></div>');


	$('#TimeCompareSwitch').html('时段对比');
	$('#TimeCompareCalendar').removeClass('calendarCompareActive').find('.originDate').remove('interval').val('');
	$('#TimeCompareCalendar').find('.compareDateWrap').hide();
	$('#TimeCompareCalendar').find('.compareDate').remove('interval').val('');
	$('#TimeCompareCalendar').hide();

	$('#TimeLineChart').html('<div class="loading"></div>');
}

//时间选择重置
function dateReload(){
	var _yesterday = date2Str(getPastDate(_date, 1));
	var thisDate = $('#FixedDate').val();
	var _startDate = thisDate.split(' 至')[0];
	var _endDate = thisDate.split(' 至 ')[1];
	
	$('#DateCalendar').html('<input type="text" onkeydown="return false;" id="Calendar" class="calendar"><input type="hidden" id="FixedDate"/>');
	$('#Calendar').val(_startDate + ' 至 ' + _endDate);
	$('#FixedDate').val(_startDate + ' 至 ' + _endDate);
	
	$("#Calendar").Calendar({
        single: false,
        monthSize: 3,
        showFooter: true,
        offsetX: -340,
        disableDate: '2012-05-01||'+_yesterday,
        currentDate: getPastDate(_date, 1),
        applyCallback: function () {
            $("#FixedDate").val($("#Calendar").val());
            $("#DateList dd").removeClass("selected");
            getMultiOpt();
        	dateReload();
        }
    });
}

//获取多维条件
function getMultiOpt(){
	closeFn();
	/*
	$('#AppVersionOpt').html('<div class="smallLoading"></div>');
	$('#AppChannelOpt').html('<div class="smallLoading"></div>');
	$('#AppModelOpt').html('<div class="smallLoading"></div>');
	$('#AppRegOpt').html('<div class="smallLoading"></div>');
	
	var dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1],
		_data = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
	
	$.when(
			getMultiOptsData('getAppVersionDimenssionData', _data),
			getMultiOptsData('getChannelDimenssionData', _data),
			getMultiOptsData('getDeviceModelDimenssionData', _data)
	).done(function(allVersion, allChannel, allModel){
		allVersion = allVersion[0];
		allChannel = allChannel[0];
		allModel = allModel[0];
		allReg = [{'id': 1, 'name': '注册'}, {'id': 0, 'name': '非注册'}];
		
		var _version = ['所有版本'];
		if(cacheVersion != undefined){
			$.each(allVersion, function(k, v){
				if(cacheVersion == v.name){
					_version = [cacheVersion];
					return false;
				}
			});
		}
		
		var _channel = ['所有渠道'];
		if(cacheChannel != undefined){
			$.each(allChannel, function(k, v){
				if(cacheChannel == v.name){
					_channel = [cacheChannel];
					return false;
				}
			});
		}
		
		var _model = ['所有型号'];
		if(cacheModel != undefined){
			$.each(allModel, function(k, v){
				if(cacheModel == v.name){
					_model = [cacheModel];
					return false;
				}
			});
		}
		
		var _reg = ['所有'];
		if(cacheReg != undefined){
			$.each(allReg, function(k, v){
				if(cacheReg == v.name){
					_reg = [cacheReg];
					return false;
				}
			});
		}
		
		bindChosen('AppVersionOpt', '所有版本', 250, allVersion, _version);
		bindChosen('AppChannelOpt', '所有渠道', 200, allChannel, _channel);
		bindChosen('AppModelOpt', '所有型号', 200, allModel, _model, _data);
		bindChosen('AppRegOpt', '所有', 200, allReg, _reg);
		
		
		getAccumData();
		getInterviewData();
		getTimeTrendData();
		getLinechartData();
    	getDateGridData();
	});
	*/
	getAccumData();
	getInterviewData();
	getTimeTrendData();
	getLinechartData();
	getDateGridData();
};

function getMultiOptsData(_method, _data){
	return $.ajax({
		url: projectName+summaryUrlPrefix+'/dimenssionDataAction.do?method='+_method+'&reportName=dimenssionData',
		type: 'post',
		data: _data,
		dataType: 'json'
	});
};

function bindChosen(id, _name, _width, data, selectedVal, _data){
	var chosenOpt = {
		valueWidth: 'auto',
		chosenConWidth: _width,
		data: data,
		selectedVal: selectedVal,
		beforeFillData: function(_self){
			_self.find('.dataListAll ul').append('<li thisval="'+_name+'" thisid="-1">'+_name+'</li>');
		},
		initCallback: function(_self){
			if(id == 'AppChannelOpt'){
				_self.find('.dataListAll li').each(function(){
					var thisVal = $(this).attr('thisval');
	//				if(RegExp('[&]').test(thisVal)){
	//					$(this).remove();
	//				}
					if(RegExp('未知渠道\\(旧sdk版本未采集\\)').test(thisVal)){
						$(this).attr('thisval', '未知渠道(旧sdk版本未采集)').html('未知渠道(旧sdk版本未采集)');
					}
				});
			}
		},
		selectedCallback: function(a, name){
			if(id == 'AppVersionOpt'){
				cacheVersion = name;
			}else if(id == 'AppChannelOpt'){
				cacheChannel = name;
			}else if(id == 'AppModelOpt'){
				cacheModel = name;
			}else if(id == 'AppRegOpt'){
				cacheReg = name;
			}
			
			var _data = getAjaxParam();
			var _tableName = _data[0].tableName;
			
			if(_tableName && _tableName.indexOf('SINGLE_BY') < 0){
				if($('#NoDataTip').length == 0){
					$('<span class="reportTimeTip" id="NoDataTip">当日的现存用户通常10：00计算完成,多维数据通常情况下将在每天15：00计算完成！</span>').insertAfter('#ReportTimeTip');
				}
				
				var _yesterday = date2Str(getPastDate(_date, 1));
				var thisDate = $('#FixedDate').val();
				var _startDate = thisDate.split(' 至')[0];
				var _endDate = thisDate.split(' 至 ')[1];
				_endDate = (_endDate.split('-')[0] == 2012 && _endDate.split('-')[1] < 10) ? _yesterday : _endDate;
				
				$('#DateCalendar').html('<input type="text" onkeydown="return false;" id="Calendar" class="calendar"><input type="hidden" id="FixedDate"/>');
				if(_startDate.split('-')[0] == 2012 && _startDate.split('-')[1] < 10){
					$('#Calendar').val('2012-10-02 至 ' + _endDate);
					$('#FixedDate').val('2012-10-02 至 ' + _endDate);
				}else{
					$('#Calendar').val(_startDate + ' 至 ' + _endDate);
					$('#FixedDate').val(_startDate + ' 至 ' + _endDate);
				}
				$("#Calendar").Calendar({
			        single: false,
			        monthSize: 3,
			        showFooter: true,
			        offsetX: -340,
			        disableDate: '2012-10-02||'+_yesterday,
			        currentDate: getPastDate(_date, 1),
			        applyCallback: function () {
			            $("#FixedDate").val($("#Calendar").val());
			            $("#DateList dd").removeClass("selected");
			            getMultiOpt();
//			        	dateReload();
			        }
			    })
			}else{
				$('#NoDataTip').remove();
//				dateReload();
			}
		}
	};
	
	if(id == 'AppModelOpt'){
		$.extend(chosenOpt, {
			keywordsPlaceholder: '搜索更多设备型号...',
			ajaxData: _data,
			searchBack: true,
			searchAjaxURL: projectName+'/dimenssionDataAction.do?method=getDeviceModelDimenssionData&reportName=dimenssionData'
		})
	}
	$('#'+id).Chosen(chosenOpt);
}

//获取参数
function getAjaxParam(){
	var _dataParam = [],
		dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1],
		reportName = 'productUserVisitOverviewMulti',
		methodName = '/productUserVisitOverviewMultiAction.do',
		data = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
	

	if(adid != ''){
		$.extend(data, {'adid': adid});
	}
	if(pid != ''){
		$.extend(data, {'pid': pid});
	}	
	
	var appVersion = $('#AppVersionOpt .fixedText').html();
	if(appVersion != '所有版本'){
		if(appVersion != null && appVersion != 'Other'){
			appVersion = appVersion.replace('(','__').substring(0,appVersion.indexOf(')')+1);
		}
		$.extend(data, {'appVersion': 'appVersion='+appVersion});
	}
	
	var appChannel = $('#AppChannelOpt .fixedText').html();
	if(appChannel != '所有渠道'){
		if(RegExp('[\(]').test(appChannel) && !RegExp('未知渠道\\(旧sdk版本未采集\\)').test(appChannel)){
			appChannel = appChannel.substring(0, appChannel.lastIndexOf('('))
		}
		$.extend(data, {'appChannel': 'appChannel='+appChannel});
	}

	var appModel = $('#AppModelOpt .fixedText').html();
	if(appModel != '所有型号'){
		$.extend(data, {'appModel': 'appModel='+appModel});
	}
	
	var appReg = $('#AppRegOpt .fixedText').html();
	if(appReg != '所有'){
		appReg = appReg == '非注册' ? 0 : 1;
		$.extend(data, {'appReg': 'appReg='+appReg});
	}
	
	var isAll = appVersion == '所有版本' && appChannel == '所有渠道' && appModel == '所有型号' && appReg == '所有';
	if(isAll){
		reportName = 'productUserVisitOverview';
		methodName = '/productUserVisitOverviewAction.do';
	}
	
	var _v = appVersion != '所有版本' ? 'V' : '';
	var _c = appChannel != '所有渠道' ? 'C' : '';
	var _d = appModel != '所有型号' ? 'D' : '';
	var _z = appReg != '所有' ? 'Z' : '';
	if(!isAll){
		var _multi = _v + _c + _d + _z;
		if(_multi.length == 1){
			if(_multi == 'V'){
				_tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL';
			}else if(_multi == 'C'){
				_tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL';
			}else if(_multi == 'D'){
				_tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_MODEL_ETL';
			}else if(_multi == 'Z'){
				_tableName = 'REPORT_INTRO_MULTI_Z_ETL';
			}
		}else{
			_tableName = 'REPORT_INTRO_MULTI_'+ _v + _c + _d + _z +'_ETL';
		}
		$.extend(data, {'tableName': _tableName});
		if($('#DateList .selected').find('a').attr('dateinterval') == '7' && appReg == '所有'){
			$.extend(data,{'model': '7day' + _multi});
		}else if($('#DateList .selected').find('a').attr('dateinterval') == 'all' && appReg == '所有'){
			$.extend(data,{'model': 'allday' + _multi});
		}
		
	}
	
	_dataParam.push(data);
	_dataParam.push(reportName);
	_dataParam.push(methodName);
	return _dataParam;
};

function isMulti(){
	/*
	var appVersion = $('#AppVersionOpt .fixedText').html();
	var appChannel = $('#AppChannelOpt .fixedText').html();
	var appModel = $('#AppModelOpt .fixedText').html();
	var appReg = $('#AppRegOpt .fixedText').html();
	return isAll = (appVersion == '所有版本' && appChannel == '所有渠道' && appModel == '所有型号' && appReg == '所有');
	*/
	return true;
};

function getTimeTrendData(){
	if(!isMulti()){
		$('#TimeTrendWrap').hide();
		return;
	}
	$('#TimeTrendWrap').show();
//	if($('#TimeTrendCon').is(':hidden')){
//		return;
//	}
	
	$('#TimeLineChart').html('<div class="loading"></div>');	
	
	var method, title;
	if($('#Arrived').hasClass('active')){
		method = 'getArrivedLineJsonData';
	}else if($('#Displayed').hasClass('active')){
		method = 'getDisplayedLineJsonData';
	}else if($('#SysmsgClicked').hasClass('active')){
		method = 'getSysmsgClickedLineJsonData';
	}else if($('#S2ndDisplayed').hasClass('active')){
		method = 'gets2ndDisplayedLineJsonData';
	}else if($('#S2ndClicked').hasClass('active')){
		method = 'gets2ndClickedLineJsonData';
	}else if($('#Downloaded').hasClass('active')){
		method = 'getDownloadedLineJsonData';
	}else if($('#Installed').hasClass('active')){
		method = 'getInstalledLineJsonData';
	}else if($('#Activated').hasClass('active')){
		method = 'getActivatedLineJsonData';
	}
	
	var _data = getAjaxParam();
	
	if($('#TimeCompareCalendar').is(':visible')){

		if($('#Arrived').hasClass('active')){
			method = 'getArrivedLineJsonData';
		}else if($('#Displayed').hasClass('active')){
			method = 'getDisplayedLineJsonData';
		}else if($('#SysmsgClicked').hasClass('active')){
			method = 'getSysmsgClickedLineJsonData';
		}else if($('#S2ndDisplayed').hasClass('active')){
			method = 'gets2ndDisplayedLineJsonData';
		}else if($('#S2ndClicked').hasClass('active')){
			method = 'gets2ndClickedLineJsonData';
		}else if($('#Downloaded').hasClass('active')){
			method = 'getDownloadedLineJsonData';
		}else if($('#Installed').hasClass('active')){
			method = 'getInstalledLineJsonData';
		}else if($('#Activated').hasClass('active')){
			method = 'getActivatedLineJsonData';
		}
		
		if($('#Arrived').hasClass('active')){
			method = 'getArrivedTrendCompareData';
		}else if($('#Displayed').hasClass('active')){
			method = 'getDisplayedTrendCompareData';
		}else if($('#SysmsgClicked').hasClass('active')){
			method = 'getSysmsgClickedTrendCompareData';
		}else if($('#S2ndDisplayed').hasClass('active')){
			method = 'gets2ndDisplayedTrendCompareData';
		}else if($('#S2ndClicked').hasClass('active')){
			method = 'gets2ndClickedTrendCompareData';
		}else if($('#Downloaded').hasClass('active')){
			method = 'getDownloadedTrendCompareData';
		}else if($('#Installed').hasClass('active')){
			method = 'getInstalledTrendCompareData';
		}else if($('#Activated').hasClass('active')){
			method = 'getActivatedTrendCompareData';
		}
		
		var _originDate = $('#TimeCompareCalendar').find('.originDate').val().split(' 至 ');
		
		var sd = 'sd='+_originDate[0];
		var ed = 'ed='+_originDate[1];
		
		//var _data = {'ak': appKey, 'sd': sd, 'ed': ed};
		$.extend(_data[0], {'ak': appKey, 'sd': sd, 'ed': ed});
		
		var _compareDate = $('#TimeCompareCalendar').find('.compareDate').val();
		
		var csd, ced;
		if(_compareDate != ''){
			_compareDate = _compareDate.split(' 至 ');
			csd = 'csd='+_compareDate[0];
			ced = 'ced='+_compareDate[1];
			//$.extend(_data, {'csd': csd, 'ced': ced});
			$.extend(_data[0], {'csd': csd, 'ced': ced});
		}
		
		$.ajax({
			//url: projectName+'/datatest_summary_time_trend_compare.txt?method='+method+'&reportName=productUserVisitOverview',
			url: projectName+summaryUrlPrefix+'/productUserVisitOverviewAction.do?method='+method+'&reportName=productUserVisitOverview',
			data: _data[0],
			dataType: 'json',
			success: function(data){
				var st = [], cst = [], seried = [];
				
				if(csd != undefined){
					$.each(data, function(k, v){
						st.push(v.st);
						cst.push(v.cst);
					});
					series = [
							    {'name': _originDate[0] + ' 至 ' +_originDate[1], 'data': st},
							    {'name': _compareDate[0] + ' 至 ' +_compareDate[1], 'data': cst}
							];
				}else{
					$.each(data, function(k, v){
						st.push(v.st);
					});
					var _ne = $('#TimeCompareCalendar').find('.originDate').val();
					series = [
							    {'name': _ne, 'data': st}
							];
				}
				
				$('#TimeLineChart').html('');
				
				$('#TimeLineChart').createLineChart({
					type: 'spline',
					dataX: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
					seriesData: series,
					height: 270,
					marginBottom: 50,
					xAxis_type: 'line',
					xAxis_label_x: 0,
					xAxis_label_y: 14,
					xAxis_label_rotation: 0
				});
			}
		});
		return;
	}
	
	$.ajax({
		//url:  projectName+'/datatest_summary_time_trend.txt?method='+method+'&reportName=productUserVisitOverview',
		url:  projectName+summaryUrlPrefix+'/productUserVisitOverviewAction.do?method='+method+'&reportName=productUserVisitOverview',
		//data: {'appKey': appKey},
		data: _data[0],
		dataType: 'json',
		success: function(data){
			var od = [],
				sd = [],
				td = [],
				tos = [];
			$.each(data, function(k, v){
				od.push(v.od);
				sd.push(v.sd);
				td.push(v.td);
				tos.push(v.tos);
			});
			
			var series = [
			    {'name': '昨天', 'data': od},
			    {'name': '7天均值', 'data': sd}//,
			    //{'name': '近一个月均值', 'data': td},
			    //{'name': '累计均值', 'data': tos}
			];
			
			$('#TimeLineChart').html('');
			
			$('#TimeLineChart').createLineChart({
				type: 'spline',
				dataX: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
				seriesData: series,
				height: 270,
				marginBottom: 50,
				xAxis_type: 'line',
				xAxis_label_x: 0,
				xAxis_label_y: 14,
				xAxis_label_rotation: 0
			});
		}
	});
}

function getInterviewData(){
	$('.timeInterval').html('');
	if(isMulti()){
		$('#DatagridInterview').removeClass('dg').html('<div class="loading" style="padding:25px 0; background-position:0 10px;"></div>');
		$('.accumTable .num').html('<div class="smallLoading"></div>');
		getInterviewDataReal();
	}else{
		$('#DatagridInterview').removeClass('dg').html('<div class="loading" style="padding:20px 0; background-position:0 10px;"></div>');
		$('.accumTable .num').html('<div class="smallLoading"></div>');
		$('#AccumRegUserTd').hide();
		$('.timeInterval').html('');
		var _data = getAjaxParam();
		$.ajax({
			url: projectName+summaryUrlPrefix+'/productUserVisitOverviewMultiAction.do?method=getFixedJsonData&reportName='+_data[1],
			data: _data[0],
			dataType: 'json',
			success: function(data){
				var _data = getAjaxParam();
				var _tableName = _data[0].tableName;
				
				var _multi = _tableName.indexOf('SINGLE_BY') < 0;
				
				var staticData = [];
				var twoDay = data.twoDays;
				for(var i = 0, len = twoDay.length; i < len; i++){
					var dayArr = [];
					dayArr.push(twoDay[i].pv);
					dayArr.push(twoDay[i].startTimeNum);
					dayArr.push(twoDay[i].startUserNum);
					dayArr.push(twoDay[i].newUserNum);
					dayArr.push(twoDay[i].newUserRate);
					if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
						dayArr.push(twoDay[i].updateUser);
					}
					
					if(_appKey != 'ZGWN9HD1JBXM' && !_multi){
						dayArr.push(twoDay[i].avgUseDateLength);
					}
					dayArr.push(twoDay[i].activeRate);
					staticData.push(dayArr);
				}
				
				var _columns;
				
				if(_appKey != 'ZGWN9HD1JBXM' && !_multi){
					if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
						_columns = [
						         	{field:'pv', title:'浏览量', width:80, align:'center'},
									{field:'name', title:'启动次数', width:80, align:'center'},
									{field:'email', title: '启动用户', width:80, align:'center'},
									{field:'score', title:'新用户', width:80, align:'center'},
									{field:'date', title:'新用户比例', width:80, align:'center'},
									{field:'updateUser', title:'<div class="newTd">升级用户<span class="newTip"></span></div>', width:80, align:'center'},
									{field:'date', title:'单次平均使用时长(秒)', width:110, align:'center'},
									{field:'date', title:'累计用户活跃率', width:80, align:'center'}
								];
					}else{
						_columns = [
						         	{field:'pv', title:'浏览量', width:80, align:'center'},
									{field:'name', title:'启动次数', width:80, align:'center'},
									{field:'email', title: '启动用户', width:80, align:'center'},
									{field:'score', title:'新用户', width:80, align:'center'},
									{field:'date', title:'新用户比例', width:80, align:'center'},
									{field:'date', title:'单次平均使用时长(秒)', width:110, align:'center'},
									{field:'date', title:'累计用户活跃率', width:80, align:'center'}
								];
					}
				}else{
					if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
						_columns = [
						         	{field:'pv', title:'浏览量', width:80, align:'center'},
									{field:'name', title:'启动次数', width:80, align:'center'},
									{field:'email', title: '启动用户', width:80, align:'center'},
									{field:'score', title:'新用户', width:80, align:'center'},
									{field:'date', title:'新用户比例', width:80, align:'center'},
									{field:'updateUser', title:'<div class="newTd">升级用户<span class="newTip"></span></div>', width:80, align:'center'},
									{field:'date', title:'累计用户活跃率', width:80, align:'center'}
								];
					}else{
						_columns = [
						         	{field:'pv', title:'浏览量', width:80, align:'center'},
									{field:'name', title:'启动次数', width:80, align:'center'},
									{field:'email', title: '启动用户', width:80, align:'center'},
									{field:'score', title:'新用户', width:80, align:'center'},
									{field:'date', title:'新用户比例', width:80, align:'center'},
									{field:'date', title:'累计用户活跃率', width:80, align:'center'}
								];
					}
				}
			
				$("#DatagridInterview").Datagrid({
					height: 80,
					hasFirstCol: true,
					firstColWidth: 120,
					firstColHeaderName: "时间",
					firstColData: ['昨天', '前天'],
					staticData: staticData,
					dgResize: false,
					columns: _columns,
					showFooter: false,
					initCallback: function(){
						$('#DatagridInterview .dgContentTable div').each(function(){
							$(this).html(formatNum($(this).html()));
						});
					}
				});
				var accumUser = parseInt(data.accum[0].accumUserNum);
				
				$('#AccumUserNum').html(formatNum(accumUser));
				
				$('#AccumStartNum').html(formatNum(data.accum[0].accumStartNum));
				
				$('#AccumPv').html(formatNum(data.accum[0].accumPV));
				
				if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
					$('#AccumSingleTd').show();
					$('#ExtantUser').html(formatNum(data.accum[0].extantUser));
//					$('#UpdateUser').html(formatNum(data.accum[0].updateUser));
					
					$('.extantUserTip').TipBox({
					    location: 'Left',
				        width: 150,
				        theme: 'tipBoxOrange'
				    });
				}else{
					$('#AccumSingleTd').hide();
				}

				$('.timeInterval').html(' (' + $('#FixedDate').val() + ')');
				
				$('#TotalUser').html('累计新用户<br/><span class="timeInterval">(' + $('#FixedDate').val() + ')</span>');
				$('.tip').each(function(){
					var thisVal = $(this).attr('tipBoxText');
					if(RegExp('截止到现在').test(thisVal)){
						thisVal = thisVal.replace('截止到现在', '所选时间段内');
						$(this).attr('tipBoxText', thisVal);
					}
				});
				$('.multiDataLoading').fadeOut();
			}
		});
	}
}

//实时5秒刷新
function getInterviewDataReal(){
	var dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1];
       
	getFixedData();
	function getFixedData(){
		var _data = getAjaxParam();
		$.extend(_data[0], {"startDate": startDate, "endDate": endDate, "appKey": appKey});
		
		$.ajax({
			//url: projectName+'/datatest_summary_fixed_json_data.txt?method='+fixedDataMethod+'&reportName=productUserVisitOverview',
			url: projectName+summaryUrlPrefix+'/productUserVisitOverviewAction.do?method='+fixedDataMethod+'&reportName=productUserVisitOverview',
			//data: {"startDate": startDate, "endDate": endDate, "appKey": appKey},
			data: _data[0],
			dataType: 'json',
			success: function(data){
			/*	if(fixedDataMethod == 'getFixedJsonData'){
					if(data.twoDays[0].accumUser == 0){
						fixedDataMethod = 'getFixedJsonDataFromRealTime';
						getFixedData();
						return;
					}
				}
			*/
				showTable(data);
			}
		});
	}
	
	function showTable(data){
		//var accumUser = data.accum[0].accumUserNum;
		
		//var _accumUser = parseInt(accumUser);
//		if(_appKey == 'RT3N00LZP3B8' && $('#DateTotal').hasClass('selected')){
//			_accumUser += 308564;
//		}
		
		var staticData = [];
		var twoDay = data.twoDays;
//		var _realTime = [];
//		_realTime.push(data.today.pv);
//		_realTime.push(data.today.start_time);
//		_realTime.push(data.today.uv);
//		_realTime.push(data.today.new_user);
//		_realTime.push((data.today.new_user / data.today.uv * 100).toFixed(2) +'%');
//		if(_appKey == 'PJPRUFMX2B3H'){
//			_realTime.push('—');
//		}
//		_realTime.push('—');
//		_realTime.push('—');
//		
//		staticData.push(_realTime);
		
		for(var i = 0, len = twoDay.length; i < len; i++){
			var dayArr = [];
			dayArr.push(formatNum(new Number(twoDay[i].arrived)));
			dayArr.push(formatNum(new Number(twoDay[i].displayed)));
			dayArr.push(formatNum(new Number(twoDay[i].sysmsgclicked)));
			dayArr.push(formatNum(new Number(twoDay[i].s2nddisplayed)));
			dayArr.push(formatNum(new Number(twoDay[i].s2ndclicked)));
			dayArr.push(formatNum(new Number(twoDay[i].downloaded)));
			dayArr.push(formatNum(new Number(twoDay[i].installed)));
			dayArr.push(formatNum(new Number(twoDay[i].activated)));
			staticData.push(dayArr);
		}
		
		var _startUser = '启动用户';
		var _columns;

			_columns = [
			         	{field:'arrived', title:'到达', width:80, align:'center'},
						{field:'displayed', title:'展现', width:80, align:'center'},
						{field:'sysmsgclicked', title:'点击', width:80, align:'center'},
						{field:'s2nddisplayed', title:'二次展现', width:80, align:'center'},
						{field:'s2ndclicked', title:'二次点击', width:80, align:'center'},
						{field:'downloaded', title:'下载', width:80, align:'center'},
						{field:'installed', title:'安装', width:80, align:'center'},						
						{field:'activated', title:'激活', width:110, align:'center'}					
						
					];

		$("#DatagridInterview").Datagrid({
			hasFirstCol: true,
			firstColWidth: 120,
			firstColHeaderName: "时间",
			firstColData: ['今天', '昨天'],
			staticData: staticData,
			dgResize: false,
			columns: _columns,
			showFooter: false,
			initCallback: function(){
				$('#DatagridInterview .dgContentTable div').each(function(){
					$(this).html(formatNum($(this).html()));
				});
			}
		});
		if(_appKey == 'PJPRUFMX2B3H'){
			$('#AccumRegUserTd').show();
			$('#AccumRegUserNum').html(formatNum(data.accum[0].accumPCMUsers));
			$('.pcmTip').TipBox({
			    location: 'Top',
		        width: 120,
		        theme: 'tipBoxOrange'
		    });
		}else{
			$('#AccumRegUserTd').hide();
		}
		$('#AccumSingleTd').hide();
//		$('#DatagridInterview .dgContentTable tr').eq(0).addClass('trRealtime');
//		$('#DatagridInterview .tableConFirst tr').eq(0).addClass('trRealtime');
		
		if($('#DateSeven').hasClass('selected') || $('#DateTotal').hasClass('selected')){
			_accumUser += parseInt(data.today.new_user);
			$('#AccumStartNum').html(formatNum(parseInt(data.accum[0].accumStartNum) + parseInt(data.today.start_time)));
			$('.timeInterval').html(' (' + startDate.split('=')[1] + ' 至 ' + endDate.split('=')[1] +')');
			$('#AccumPv').html(formatNum(parseInt(data.accum[0].accumPV) + parseInt(data.today.pv)));
			
			$('#TotalUser').html('累计用户<br/><span class="timeInterval">(' + startDate.split('=')[1] + ' 至 ' + endDate.split('=')[1] +')</span>');
			
			$('.tip').each(function(){
				var thisVal = $(this).attr('tipBoxText');
				if(RegExp('所选时间段内').test(thisVal)){
					thisVal = thisVal.replace('所选时间段内', '截止到现在');
					$(this).attr('tipBoxText', thisVal);
				}
			});
		}else{
			$('#AccumStartNum').html(formatNum(parseInt(data.accum[0].accumStartNum)));
			$('#AccumPv').html(formatNum(parseInt(data.accum[0].accumPV)));
			$('.timeInterval').html(' (' + $('#FixedDate').val() + ')');
			
			$('#TotalUser').html('累计新用户 <span class="timeInterval">(' + $('#FixedDate').val() + ')</span>');
			
			$('.tip').each(function(){
				var thisVal = $(this).attr('tipBoxText');
				if(RegExp('截止到现在').test(thisVal)){
					thisVal = thisVal.replace('截止到现在', '所选时间段内');
					$(this).attr('tipBoxText', thisVal);
				}
			});
		}
		$('#AccumUserNum').html(formatNum(_accumUser));
		$('.multiDataLoading').fadeOut();
	}
}

function getAccumData(){
	var _data = getAjaxParam();
	
	if(_data[1] != 'productUserVisitOverview'){
		$('.accumMulti').hide();
		
		$('#AccumTable').hide();
		$('#AccumTableMulti').show();
		getAccumDataMulti();
		return;
		
	}else{
		$('#AccumTable').show();
		$('#AccumTableMulti').hide();
		$('.accumMulti').show();
	}
	
	var lastWeek = getLastWeek(_date);
	var lastMonth = getLastMonth(_date);
	
	$.extend(_data[0], {'wsd': 'wsd=' + lastWeek[0], 'wed': 'wed=' + lastWeek[1], 'msd': 'msd=' + lastMonth[0], 'med': 'med=' + lastMonth[1]});
	
	$.ajax({
		url: projectName+summaryUrlPrefix+_data[2]+'?method=getBaseOverViewData&reportName='+_data[1],
		data: _data[0],
		dataType: 'json',
		success: function(data){
			$.each(data[0], function(k, v){
				$('#'+k).html(formatNum(v));
				if(_appKey == 'PJPRUFMX2B3H'){
					$('#AccumRegText').show();
					$('#AccumReg').show();
				}
			})
		}
	});
}

function getAccumDataMulti(){
	var _data = getAjaxParam();
	$.ajax({
		url: projectName+_data[2]+'?method=getBaseOverViewData&reportName='+_data[1],
		data: _data[0],
		dataType: 'json',
		success: function(data){
			data = data[0];
			$('#dtpv').html(formatNum(parseFloat(data.dtpv)));
			$('#dust').html(formatNum(parseFloat(data.dust)));
			$('#dupv').html(formatNum(parseFloat(data.dupv)));
			$('#dar').html(formatNum(parseFloat(data.dar)) + '%');
			
			if(_data[1] == 'productUserVisitOverview'){
				$('#dudur').html(formatNum(parseFloat(data.dudur)) + '秒');
				$('#enum').html(formatNum(parseFloat(data.enum)));
				$('#lu3').html(formatNum(parseFloat(data.lu3)) + ' / ' + data.lr3 + '%');
				$('#lu9').html(formatNum(parseFloat(data.lu9)) + ' / ' + data.lr9 + '%');
			}
			
		}
	});
}

function getDateGridData(){
	if($('#DatagridDetailCon').is(':hidden')){
		return;
	}
	var _startUser = '启动用户';
	var _allUser = '累计用户';
	var isAll = isMulti();
	var _data = getAjaxParam();
	var _tableName = _data[0].tableName;
	var _multi = _tableName && _tableName.indexOf('SINGLE_BY') < 0;
	
	
	/*
	if(_appKey == 'ZGWN9HD1JBXM' || _multi){
		if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
			var _columns = [
							{field:'date', title:'时间', width:100, align:'center'},
							{field:'pv', title:'浏览量', width:100, align:'left', formatter:function(row){   
									return formatNum(row.pv);
								}   
							},
							{field:'newUserNum', title:'新用户', width:100, align:'left', formatter:function(row){   
									return formatNum(row.newUserNum);
								}   
							},
							{field:'updateUser', title:'<div class="newTd">升级用户<span class="newTip"></span></div>', width:100, align:'left', formatter:function(row){   
									return formatNum(row.updateUser);
								}   
							},
							{field:'accumUserNum', title: _allUser, width:100, align:'left', formatter:function(row){   
									return formatNum(row.accumUserNum);
								}   
							},
							{field:'startUserNum', title: _startUser, width:100, align:'left', formatter:function(row){   
									return formatNum(row.startUserNum);
								}   
							},
							{field:'startTimeNum', title:'启动次数', width:100, align:'left', formatter:function(row){   
									return formatNum(row.startTimeNum);
								}   
							}
						];
		}else{
			var _columns = [
						{field:'date', title:'时间', width:100, align:'center'},
						{field:'pv', title:'浏览量', width:100, align:'left', formatter:function(row){   
								return formatNum(row.pv);
							}   
						},
						{field:'newUserNum', title:'新用户', width:100, align:'left', formatter:function(row){   
								return formatNum(row.newUserNum);
							}   
						},
						{field:'accumUserNum', title: _allUser, width:100, align:'left', formatter:function(row){   
								return formatNum(row.accumUserNum);
							}   
						},
						{field:'startUserNum', title: _startUser, width:100, align:'left', formatter:function(row){   
								return formatNum(row.startUserNum);
							}   
						},
						{field:'startTimeNum', title:'启动次数', width:100, align:'left', formatter:function(row){   
								return formatNum(row.startTimeNum);
							}   
						}
					];
		}
	}else{
		if(_appKey == 'PJPRUFMX2B3H' && isAll){
			var _columns = [
							{field:'date', title:'时间', width:100, align:'center'},
							{field:'pv', title:'浏览量', width:100, align:'left', formatter:function(row){   
									return formatNum(row.pv);
								}   
							},
							{field:'newUserNum', title:'新用户', width:100, align:'left', formatter:function(row){   
									return formatNum(row.newUserNum);
								}   
							},
							{field:'accumUserNum', title: '累计用户', width:100, align:'left', formatter:function(row){   
									return formatNum(row.accumUserNum);
								}   
							},
							{field:'pcmUsers', title: '新注册用户', width:100, align:'left', formatter:function(row){   
									if(row.pcmUsers == 0){
										return '—';
									}else{
										return formatNum(row.pcmUsers);
									}
								}   
							},
							{field:'startUserNum', title: _startUser, width:100, align:'left', formatter:function(row){   
		
									return formatNum(row.startUserNum);
								}   
							},
							{field:'startTimeNum', title:'启动次数', width:100, align:'left', formatter:function(row){   
									return formatNum(row.startTimeNum);
								}   
							},
							{field:'avgUseDateLength', title:'单次平均使用时长(秒)', width:120, align:'left'}
						];
		}else if((_tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL' || _tableName == 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL') && hours >= hourControl){
			var _columns = [
							{field:'date', title:'时间', width:100, align:'center'},
							{field:'pv', title:'浏览量', width:100, align:'left', formatter:function(row){   
									return formatNum(row.pv);
								}   
							},
							{field:'newUserNum', title:'新用户', width:100, align:'left', formatter:function(row){   
									return formatNum(row.newUserNum);
								}   
							},
							{field:'updateUser', title:'<div class="newTd">升级用户<span class="newTip"></span></div>', width:100, align:'left', formatter:function(row){   
									return formatNum(row.updateUser);
								}   
							},
							{field:'accumUserNum', title: _allUser, width:100, align:'left', formatter:function(row){   
									return formatNum(row.accumUserNum);
								}   
							},
							{field:'startUserNum', title: _startUser, width:100, align:'left', formatter:function(row){   
									return formatNum(row.startUserNum);
								}   
							},
							{field:'startTimeNum', title:'启动次数', width:100, align:'left', formatter:function(row){   
									return formatNum(row.startTimeNum);
								}   
							},
							{field:'avgUseDateLength', title:'单次平均使用时长(秒)', width:120, align:'left'}
						];
		}else{
			var _columns = [
							{field:'date', title:'时间', width:100, align:'center'},
							{field:'pv', title:'浏览量', width:100, align:'left', formatter:function(row){   
									return formatNum(row.pv);
								}   
							},
							{field:'newUserNum', title:'新用户', width:100, align:'left', formatter:function(row){   
									return formatNum(row.newUserNum);
								}   
							},
							{field:'accumUserNum', title: _allUser, width:100, align:'left', formatter:function(row){   
									return formatNum(row.accumUserNum);
								}   
							},
							{field:'startUserNum', title: _startUser, width:100, align:'left', formatter:function(row){   
									return formatNum(row.startUserNum);
								}   
							},
							{field:'startTimeNum', title:'启动次数', width:100, align:'left', formatter:function(row){   
									return formatNum(row.startTimeNum);
								}   
							},
							{field:'avgUseDateLength', title:'单次平均使用时长(秒)', width:120, align:'left'}
						];
		}
	}
*/


	var _columns = [
					{field:'date', title:'时间', width:100, align:'center'},
					{field:'arrived', title:'到达', width:100, align:'left', formatter:function(row){   
							return formatNum(new Number(row.arrived));
						}   
					},
					{field:'displayed', title:'展现', width:100, align:'left', formatter:function(row){   
							return formatNum(new Number(row.displayed));
						}   
					},
					{field:'sysmsgclicked', title:'点击', width:100, align:'left', formatter:function(row){   
							return formatNum(new Number(row.sysmsgclicked));
						}
					},
					{field:'s2nddisplayed', title:'二次展现', width:100, align:'left', formatter:function(row){   
							return formatNum(new Number(row.s2nddisplayed));
						}
					},
					{field:'s2ndclicked', title:'二次点击', width:100, align:'left', formatter:function(row){   
						    return formatNum(new Number(row.s2ndclicked));
					    }
				    },
				    {field:'downloaded', title:'下载', width:100, align:'left', formatter:function(row){   
				    	    return formatNum(new Number(row.downloaded));
					    }
				    },
					{field:'installed', title:'安装', width:100, align:'left', formatter:function(row){   
						    return formatNum(new Number(row.installed));
					    }
				    },
				    {field:'activated', title:'激活', width:100, align:'left', formatter:function(row){   
				    	    return formatNum(new Number(row.activated));
					    }
				    }			
				];
	
	
	$('#DatagridDetail').Datagrid({
		columns: _columns,
		dataParam: _data[0],
		//url: projectName+'/datatest_summary_grid_json_data.txt?method=getGridJsonData&reportName='+_data[1],
		url: projectName+summaryUrlPrefix+_data[2]+'?method=getGridJsonData&reportName='+_data[1],
		ajaxCallback: function(){
			$('.KPITip').TipBox({
			    location: 'Top',
		        width: 120,
		        className: 'kpiPreTipBox'
		    });
		}
	});
}

function getLinechartData(){
	$('#LineChart').html('<div class="loading"></div>');
	$('#SDAC').hide();
	var _data = getAjaxParam();
	
	$.extend(_data[0],{'norm': norm});
	if(norm == 2 && $('#ReportList li[appkey=7doMcXhXD199]').length >0){
		$('#SDAC').show();
		sdacTrend(_data);
		return;
	}
	
	
	var _toolTipSuffix = norm == '10' ? '%' : '';
	
	$.ajax({
		//url: projectName+'/datatest_summary_linechart.txt?method=getLineJsonData&reportName='+_data[1],
		url: projectName+summaryUrlPrefix+_data[2]+'?method=getLineJsonData&reportName='+_data[1],
		data: _data[0],
		dataType: 'json',
		success: function(data){
			data = data.reverse();
			var dataY = [];
				dataX = [],
				series = [];
				for(var j = 0; j < data.length; j++){
					dataX.push(data[j].date.trim());
					dataY.push(parseFloat(data[j].attribute));
				}
				
				var enabled = dataY.length < 200 ? true : false;
				series.push({
					name: lineTitle,
					data: dataY,
					marker: {
						enabled: enabled,
						radius: 3,
						states: {
							hover: {
								enabled: true,
								radius: 5
							}
						}
					}
				});
				$('#LineChart').createLineChart({
					dataX: dataX,
					seriesData: series,
					height: 290,
					marginLeft: 60,
					marginBottom: 65,
					legend: {
						enabled: false
					},
					toolTipSuffix: _toolTipSuffix
				});

		}
	});
}

function getLinechartDataCompare(){

	$('#LineChart').html('<div class="loading"></div>');
	$('#SDAC').hide();
	var _data = getAjaxParam();
	
	var _originDate = $('#TrendCompareCalendar .originDate').val();
	var _originDateArr = _originDate.split(' 至 ');
	
	var _compareDate = $('#TrendCompareCalendar .compareDate').val();
	var _isCompare = _compareDate == '' ? false : true;
	
	$.extend(_data[0], {'ak': appKey, 'sd': 'sd='+_originDateArr[0], 'ed': 'ed='+_originDateArr[1]});
	
	var time = _originDateArr[0] + ',' + _originDateArr[1];
	
	if(_isCompare){
		var _compareDateArr = _compareDate.split(' 至 ');
		
		time = time + ',' + _compareDateArr[0] + ',' + _compareDateArr[1];
		$.extend(_data[0], {'ak': appKey, 'csd': 'csd='+_compareDateArr[0], 'ced': 'ced='+_compareDateArr[1]});
	}
	
	var _norm1 = $('#Norm1').val();
	var _norm2 = $('#Norm2').val();
	
	var _normStr;
	if(_norm1 != 0 && _norm2 != 0 && _norm1 != _norm2){
		_normStr = _norm1 + ',' + _norm2;
	}else{
		_normStr = _norm1 != 0 ? _norm1 : _norm2;
	}
	
	$.extend(_data[0], {'norms': _normStr, 'time': time});
	
	var _toolTipSuffix = norm == '10' ? '%' : '';
	$.ajax({	
		//url: projectName+'/datatest_summary_linechart_compare.txt?method=getNormCompareOrDateCompare&reportName='+_data[1],
		url: projectName+summaryUrlPrefix+_data[2]+'?method=getNormCompareOrDateCompare&reportName='+_data[1],
		data: _data[0],
		dataType: 'json',
		success: function(data){
			var _dataLen = data.length;
			
			var _date = [],
				_date1 = [], 
				_date2 = [],
				_data1 = [],
				_data2 = [],
				_yAxis = [], 
				series = [];
			
			if(_dataLen == 2){
				_date1 = data[0].split(',');
				_data1 = data[1].split(',');
				
				_date = [_date1];
				
				var yMin = getMinData(_data1);
				
				var title = $('#Norm1').val() == 0 ? $('#Norm2').val() : $('#Norm1').val();
				
				_yAxis = [{
					title: {
						text: normObj[$('#Norm1').val()],
						style: {
							color: '#2f7ed8'
						}
					},
					min: yMin,
					gridLineColor: '#E4ECEF',
					gridLineDashStyle: 'dash',
					labels: {
						style: {
							color: '#2f7ed8'
						}
					}
				}];
				series = [
				          	{'name': normObj[title] + '(' + _date1[0] + ' - ' + _date1[_date1.length - 1] + ')', 'data': _data1, color: '#2f7ed8'}
				          ];
			}else if(_dataLen == 3){
				_date1 = data[0].split(',');
				_data1 = data[1].split(',');
				_data2 = data[2].split(',');
				
				_date = [_date1];
				
				var yMin1 = getMinData(_data1);
				var yMin2 = getMinData(_data2);
				
				_yAxis = [{
							title: {
								text: normObj[$('#Norm1').val()],
								style: {
									color: '#2f7ed8'
								}
							},
							min: yMin1,
							gridLineColor: '#E4ECEF',
							gridLineDashStyle: 'dash',
							labels: {
								style: {
									color: '#2f7ed8'
								}
							}
						},
						{
							title: {
								text: normObj[$('#Norm2').val()],
								style: {
									color: '#c42525'
								}
							},
							min: yMin2,
							gridLineColor: '#E4ECEF',
							gridLineDashStyle: 'dash',
							labels: {
								style: {
									color: '#c42525'
								}
							},
							opposite: true
						}];
						
				series = [
				          	{'name': normObj[$('#Norm1').val()] + '(' + _date1[0] + ' - ' + _date1[_date1.length - 1] + ')', 'data': _data1, color: '#2f7ed8'},
				          	{'name': normObj[$('#Norm2').val()] + '(' + _date1[0] + ' - ' + _date1[_date1.length - 1] + ')', 'data': _data2, yAxis: 1, color: '#c42525'}
				          ];
				
			}else if(_dataLen == 4){
				_date1 = data[0].split(',');
				_data1 = data[1].split(',');
				
				_date2 = data[2].split(',');
				_data2 = data[3].split(',');
				
				_date = [_date1, _date2];
				
				_data2 = cutData(_data1, _data2);
				
				var yMin1 = getMinData(_data1, _data2);
				
				
				_yAxis = [{
					title: {
						text: normObj[$('#Norm1').val()],
						style: {
							color: '#2f7ed8'
						}
					},
					min: yMin1,
					gridLineColor: '#E4ECEF',
					gridLineDashStyle: 'dash',
					labels: {
						style: {
							color: '#2f7ed8'
						}
					}
				}];
				
				var norm = $('#Norm1').val() == 0 ? $('#Norm2').val() : $('#Norm1').val();
				
				series = [
				          	{'name': normObj[norm] + '(' + _date1[0] + ' - ' + _date1[_date1.length - 1] + ')', 'data': _data1, color: '#2f7ed8'},
				          	{'name': normObj[norm] + '(' + _date2[0] + ' - ' + _date2[_date2.length - 1] + ')', 'data': _data2, color: '#1aadce'}
				          ];
				
			}else if(_dataLen == 6){
				_date1 = data[0].split(',');
				_data1 = data[1].split(',');
				_data2 = data[2].split(',');
				
				_date2 = data[3].split(',');
				_data3 = data[4].split(',');
				_data4 = data[5].split(',');
				
				_data3 = cutData(_data1, _data3);
				_data4 = cutData(_data1, _data4);
				
				_date = [_date1, _date2];
				
				var yMin1 = getMinData(_data1, _data3);
				var yMin2 = getMinData(_data2, _data4);
				
				_yAxis = [{
					title: {
						text: normObj[$('#Norm1').val()],
						style: {
							color: '#2f7ed8'
						}
					},
					min: yMin1,
					gridLineColor: '#E4ECEF',
					gridLineDashStyle: 'dash',
					labels: {
						style: {
							color: '#2f7ed8'
						}
					}
				},
				{
					title: {
						text: normObj[$('#Norm2').val()],
						style: {
							color: '#c42525'
						}
					},
					min: yMin2,
					gridLineColor: '#E4ECEF',
					gridLineDashStyle: 'dash',
					labels: {
						style: {
							color: '#c42525'
						}
					},
					opposite: true
				}];
				
				series = [
				          	{'name': normObj[$('#Norm1').val()] + '(' + _date1[0] + ' - ' + _date1[_date1.length - 1] + ')', 'data': _data1, color: '#2f7ed8'},
				          	{'name': normObj[$('#Norm2').val()] + '(' + _date1[0] + ' - ' + _date1[_date1.length - 1] + ')', 'data': _data2, yAxis: 1, color: '#c42525'},
				          	{'name': normObj[$('#Norm1').val()] + '(' + _date2[0] + ' - ' + _date2[_date2.length - 1] + ')', 'data': _data3, color: '#1aadce'},
				          	{'name': normObj[$('#Norm2').val()] + '(' + _date2[0] + ' - ' + _date2[_date2.length - 1] + ')', 'data': _data4, yAxis: 1, color: '#f28f43'}
				          ];
			};
			
			$('#LineChart').createLineChartCompare({
				type: 'spline',
				dataX: _date,
				yAxis: _yAxis,
				seriesData: series,
				height: 290,
				marginBottom: 100,
				marginLeft: 80,
				marginRight: 80
//				,toolTipSuffix: _toolTipSuffix
			});
			
			return;
		}
	});
}

function formatData(data){
	var newData = [];
	for(var i = 0; i < data.length; i++){
		newData.push(parseFloat(data[i]));
	}
	return newData;
}

function cutData(data1, data2){
	if(data2.length > data1.length){
		var data = [];
		for(var i = 0; i < data1.length; i++){
			data.push(data2[i]);
		}
		return data;
	}else{
		return data2;
	}
}

function getMinData(data, data1){
	var min;
	for(var i = 0; i < data.length; i++){
		if(min == undefined || min > data[i]){
			min = parseFloat(data[i]);
		}
	}
	if(data1){
		for(var i = 0; i < data1.length; i++){
			if(min > data1[i]){
				min = parseFloat(data1[i]);
			}
		}
	}
	return min;
}


//设备趋势
function sdacTrend(_data){
	var dataX = [],	series = [];
	$.ajax({
		url: projectName+summaryUrlPrefix+_data[2]+'?method=getLineJsonData&reportName='+_data[1],
		data: _data[0],
		dataType: 'json',
		async: false,
		success: function(data){
			data = data.reverse();
			var dataY = [];
				dataX = [];
				for(var j = 0; j < data.length; j++){
					dataX.push(data[j].date.trim());
					dataY.push(parseFloat(data[j].attribute));
				}
				
				var enabled = dataY.length < 200 ? true : false;
				if($('#SinglePix').prop('checked')){
					series.push({
						name: lineTitle,
						data: dataY
					});
				}else{
					series.push({
						name: lineTitle,
						data: dataY,
						yAxis: 1
					});
				}
				
		}
	});
	
	var deviceModelArr = ['总计'];
	var type = -1;
	$('#DateList dd').each(function(k,v){
		if($(this).hasClass('selected')){
			type = $(this).attr('index');
			return false;
		}
	});
	if(type == -1){
		var _data = {'timePeriod': 3, 'startDate': _data[0].startDate, 'endDate': _data[0].endDate, 'granularity': 'day'};
	}else{
		var _data = {'timePeriod': type, 'startDate': _data[0].startDate, 'endDate': _data[0].endDate, 'granularity': 'day'};
	}
	
	$.ajax({
		url: projectName+summaryUrlPrefix+"/SDACAction.do?method=sdacTrend&reportName=sdacData",
		data: _data,
		async: false,
		dataType : 'json',
		success: function(data){
			var dataCount = [];
			$.each(data, function(k,v){
				dataCount.push(parseFloat(v.count));
			});
			
			if($('#SinglePix').prop('checked')){
				series.push({
					name: 'SDAC+总设备数',
					data: dataCount
				});
			}else{
				series.push({
					name: 'SDAC+总设备数',
					data: dataCount
				});
			}
		}
	});
	var tooltipFormatter = function(normName, xAxis_type, _self, dataX, seriesData, _dataDes){
		if(_self.points[1]){
			var des = '';
			if(_dataDes[dataX[_self.x]]){
				des = _dataDes[dataX[_self.x]];
			}
			var s = ''+ dataX[_self.x] +' ' + des + ':';
            s += '<br/>'+ _self.points[0].series.name +': <b>'+ formatNum(_self.points[0].y)+'</b>';
            s += '<br/>'+ _self.points[1].series.name +': <b>'+ formatNum(_self.points[1].y)+'</b>';
            
            if(_self.points[1].y == 0){
            	s += '';
            }else if(_self.points[0].y == 0){
            	s += '<br/>占比: <b>0</b>';
            }else{
            	s += '<br/>占比: <b>'+ (_self.points[0].y * 100 / _self.points[1].y).toFixed(2)+'%</b>';
            }
            return s;
		}else{
			var s = ''+ _self.x +':';
            s += '<br/>'+ _self.points[0].series.name +': <b>'+ formatNum(_self.points[0].y)+'</b>';
            return s;
		}
	};
	
	
	if($('#SinglePix').prop('checked')){
		$('#LineChart').createLineChart({
			marginTop: 35,
			colors: ['#528DDD', '#AA4643'],
			type: 'spline',
			dataX: dataX,
			seriesData: series,
			height: 285,
			toolTipFormatter: tooltipFormatter
		});
	}else{
		var yAxis = [{
						title: {
							text: 'SDAC+总设备数',
							style: {
								color: '#AA4643'
							}
						},
						gridLineColor: '#E4ECEF',
						gridLineDashStyle: 'dash',
						labels: {
							style: {
								color: '#AA4643'
							}
						},
						opposite: true,
						showFirstLabel: false
					},
					{
						title: {
							text: '新用户数',
							style: {
								color: '#528DDD'
							}
						},
						gridLineColor: '#E4ECEF',
						gridLineDashStyle: 'dash',
						labels: {
							style: {
								color: '#528DDD'
							}
						},
						showFirstLabel: false
					}];
		
		$('#LineChart').createLineChart({
			colors: ['#528DDD', '#AA4643'],
			marginTop: 35,
			marginLeft: 60,
			marginRight: 60,
			type: 'spline',
			dataX: dataX,
			seriesData: series,
			height: 285,
			yAxis: yAxis,
			toolTipFormatter: tooltipFormatter
		});
	}
}

function getDeviceType(){
	$.ajax({
		url: projectName+summaryUrlPrefix+"/SDACAction.do?method=deviceType&reportName=sdacData",
		dataType : 'json',
		success: function(data){
			$('#DeviceType').html('');
			$.each(data, function(k,v){
				$('#DeviceType').append('<option value="'+v.name+'">'+v.name+'</option>')
			});
			$('#DeviceType').change(function(){
				getDeviceModel();
				sdacProportion();
			});
			getDeviceModel();
		}
	});
}

function getDeviceModel(){
	$('#DeviceModelSearch').hide();
	var type = -1;
	var dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1];
	$('#DateList dd').each(function(k,v){
		if($(this).hasClass('selected')){
			type = k;
			return false;
		}
	});
	if(type == -1){
		var _data = {'timePeriod': 3};
	}else{
		var _data = {'timePeriod': type};
	}
	
	if($('#DeviceType').val() != 'all'){
		$.extend(_data, {'deviceType': 'deviceType=' + $('#DeviceType').val()});
	}
	$.ajax({
		url: projectName+summaryUrlPrefix+"/SDACAction.do?method=deviceModel&reportName=sdacData",
		data: _data,
		dataType: 'json',
		success: function(data){
			$('#DeviceModelSearch').show();
			$('#DeviceModel').ImitSelect({
				selectWidth: 170,
				selectUlWidth: 175,
				option: data
			});
		}
	});
}

});
