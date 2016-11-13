/**
 * SDK 访问者--特征--版本分布
 * @author	Rocky
 * @date	2012-06-20
 * 807,939七天
 */
define(function(require){
	window.startDate = '2012-05-01';
    require('common');
    require('calendar');
    require('datagrid');
    require('dialog');
    require('tipbox');
    require('imitselect');
    require('highcharts_3.0.1');
    
var reportName = "deviceModelDimensionDataMulti";
var thisHref = window.location.href;
var _appKey = thisHref.split('appkey=')[1];
var appKey = 'appKey=' + _appKey;
var thisIndex = 'all';
var reportTypeCnName,reportTypeEnName;

var cacheVersion, cacheChannel, cacheReg;

var flag = true, deviceModelArr = [];

var keywords = '';
var top5Index = 0;

var thisIndexSingle = 0;

var singleDimSeven = {'startUserNum':'uv','newUserNum':'newUv','times':'startTimes','pv':'pv'};

var orderName = 'pv@desc';
$(function(){
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
	
	reportTypeCnName = $('#reportTypeCnName').val(),
	reportTypeEnName = $('#reportTypeEnName').val();
	
	initBind(function(){
		$('.searchContent').val('');
		keywords = '';
		getMultiOpt();
    	dateReload();
    });
	
	getMultiOpt();
	fullListItem();
	

	
	$('.tableMode a').click(function(){
    	var thisMode = $(this).attr('mode');
    	if(thisMode == 'export'){
    		var _data = getAjaxParam();
    		var _url, excelColName;
			var dataParam = _data[0];
			var excelColName = reportTypeCnName+",数量,比例(%)";
    		if(thisIndex == 'uv'){
    			excelColName = reportTypeCnName+",比例(%)";
    			exportColumns = 'dimValue,proportion';
    		}else{
    			exportColumns = 'dimValue,normValue,proportion';
    		}
    		
    		var _normArr = {'pv':'pv','uv':'startUserNum','newAddUser':'newUserNum','startTimes':'times'} 
    		var method = 'write2Excel',_tablename = '', _sqls = thisIndex+'Of'+reportTypeEnName+'SqlId',_norm = '';
    		if(dataParam.tablename){
    			method = 'write2ExcelNew';
    			_sqls = 'getEveryNormExcelDataSqlId';
    			_tablename = '&tablename='+dataParam.tablename;
    			_norm = '&norm='+_normArr[thisIndex];
    		}
			_url = projectName+'/excelAction.do?method='+method+'&reportName=deviceModelDimensionDataMulti'
			 +'&startDate='+dataParam.startDate+'&endDate='+dataParam.endDate+'&appKey='+dataParam.appKey
			 +'&tableName='+dataParam.tableName+'&tableReg=\\$\\{t\\}&sqlId='+_sqls+'&exportColumns='+exportColumns+'&namespace=DeviceAnalysis'+_tablename+_norm;
			if(dataParam.appVersion){
				_url += '&appVersion='+dataParam.appVersion;
			}
			if(dataParam.appChannel){
				_url += '&appChannel='+dataParam.appChannel;
			}
			if(dataParam.appReg){
				_url += '&appReg='+dataParam.appReg;
			}

    		var _tabName = $('.globalTab li.selected a').html();
    		
    		$.exportExcel({
    			url: _url,
    			fileName: $('#ReportAnchor').html()+'__'+reportTypeCnName+'__'+_tabName+"__明细数据---"+$("#FixedDate").val(),
    			excelColName: excelColName
    		});
    		return;
    	}
    	$('.tableMode a').removeClass('active');
    	$(this).addClass('active');
    	
    	if(thisMode == 'performance'){
    		$('#Datagrid .pieTd').hide();
    		$('#Datagrid .rateBar').show();
    		$('#Datagrid .rateVal').hide();
    	}else if(thisMode == 'data'){
    		$('#Datagrid .pieTd').hide();
    		$('#Datagrid .rateBar').hide();
    		$('#Datagrid .rateVal').show();
    	}else if(thisMode == 'pie'){
    		$('#Datagrid .pieTd').show();
    		$('#Datagrid .rateBar').hide();
    		$('#Datagrid .rateVal').show();
    	}
    });
    
    $('#GlobalTabOverview li').click(function(){
    	keywords = '';
    	$('.searchContent').val('');
    	
    	$('#GlobalTabOverview li').removeClass('selected');
    	$(this).addClass('selected');
    	thisIndex = $(this).attr('index');
    	if(thisIndex == 'all'){
    		$('.tableMode').hide();
    		$('#ExportExcel').show();
    	}else{
    		$('.tableMode').show();
    		$('#ExportExcel').hide();
    	}
    	getData();
    });
    
    $('#GlobalTabSingle li').click(function(){
    	$('#GlobalTabSingle li').removeClass('selected');
    	$(this).addClass('selected');
    	thisIndexSingle = $(this).attr('index');
    	var _name = $('#SingleName').val();
    	getTrendSingle(_name);
    });

    $('#ReportHelp').click(function(){
		$.Dialog({
			width: 700,
			title: '报表解读',
			contentDom: '#Help'
		});
	});
	
	$('.tableMode a').TipBox({
	    location: 'Top',
	    theme: 'tipBoxOrange',
	    width: 60
    });
	
	$('#SearchBtn').click(function(){
		$('.multiDataLoading').show();
		
		$('.searchContent').val('');
		keywords = '';
		getData();
		top5Trend(top5Index);
	});
	
	$('#Top5Tab li').click(function(){
    	$('#Top5Tab li').removeClass('selected');
    	$(this).addClass('selected');
    	top5Index = $(this).attr('index');
    	top5Trend(top5Index);
    });
	
	$('.keywordsSearch').click(function(){
		keywords = $(this).parent().find('.searchContent').val();
		getData();
	});
	
	$('#SelectAll').live('click', function(){
		if($(this).prop('checked')){
			$('#Datagrid .tableSelect').prop('checked', true);
			var tableSelect = $('#Datagrid .tableSelect');
			tableSelect.each(function(){
				deviceModelArr.push($(this).attr('model'));
			});
			deviceModelArr = deviceModelArr.distinct();
		}else{
			$('#Datagrid .tableSelect').prop('checked', false);
			var tableSelect = $('#Datagrid .tableSelect');
			tableSelect.each(function(){
				deviceModelArr.remove($(this).attr('model'));
			});
		}
		if(deviceModelArr.length > 1){
			$('#DrawLineChart').addClass('btnPrimary');
		}else{
			$('#DrawLineChart').removeClass('btnPrimary');
		}
	});
	
	$('#Datagrid .tableSelect').live('click', function(){
		if($(this).prop('checked')){
			deviceModelArr.push($(this).attr('model'));
			deviceModelArr = deviceModelArr.distinct();
		}else{
			deviceModelArr.remove($(this).attr('model'));
		}
		if(deviceModelArr.length > 1){
			$('#DrawLineChart').addClass('btnPrimary');
		}else{
			$('#DrawLineChart').removeClass('btnPrimary');
		}
	});
	$('#DrawLineChart').click(function(){
		getTrendLine();
	});
	
	
	//导出excel
	$("#ExportExcel").click(function(){
		var _data = getAjaxParam();
		var _url, excelColName;
		
		var excelColName = '设备型号,启动用户,启动用户比例,新用户,新用户比例,启动次数,启动次数比例,浏览量,浏览量比例';
		
		var dataParam = _data[0];
		var _url = projectName+'/excelAction.do?method=write2Excel&reportName=deviceModelDimensionDataMulti'
		 +'&startDate='+dataParam.startDate+'&endDate='+dataParam.endDate+'&tableName='+dataParam.tableName+'&appKey='+appKey
		 +'&sqlId=deviceIntroId&exportColumns='+exportColumns;
		if(dataParam.appVersion){
			_url += '&appVersion='+dataParam.appVersion;
		}
		if(dataParam.appModel){
			_url += '&appModel='+dataParam.appModel;
		}
		if(dataParam.appReg){
			_url += '&appReg='+dataParam.appReg;
		}
		if($('.searchContent').val() != ''){
			_url += '&channelName=channelName='+ encodeURIComponent('%' + $('.searchContent').val() + '%');
		}

		$.exportExcel({
			url: _url,
			fileName: $('#ReportAnchor').html()+'__设备型号__明细数据---'+$("#FixedDate").val(),
			excelColName: excelColName
		});
	});
	
	$('.tipbox').TipBox({
	    location: 'Top',
	    theme: 'tipBoxBlue',
	    width: 110
    });
   
});

//显示设备详情
window.getDeviceModelDetail = function(deviceModel){
	var title = "设备详情("+deviceModel+")";
	if(RegExp('Lenovo ').test(deviceModel)){
		deviceModel = deviceModel.split(' ')[1]
	}
	var deviceModel='deviceModel='+$.trim(deviceModel);
	$('#Loading').show();
	$('#DeviceDetailGrid .detailTable').hide();
	$('#NoData').hide();
	$('.dialogTitle .dialogTitleH1').html(title);
	$.Dialog({
		title: title,
		width: 750,  
		height: 485,
		contentDom: '#DeviceDetailGrid'
	});
	
	$.ajax({
		url: projectName+"/SDACAction.do?method=getDeviceModelDetail&reportName=sdacData",
		data: {'deviceModel': deviceModel},
		dataType: 'json',
		success: function(data){
			data = data[0];
			$('#Loading').hide();
			$('#DeviceDetailGrid .detailTable').show();
			if(data){
				$('#DeviceDetailGrid').show();
				for(var key in data){
					if(data[key]){
						$('#'+key).parent('li').show();	
						$('#'+key).html(data[key]);
					}else{
						$('#'+key).parent('li').hide();	
					}
				}
			}else{
				$('#NoData').show();
				$('#DeviceDetailGrid .detailTable').hide();
			}
		}
	});
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
	getData();
	top5Trend(top5Index);
}
function isVCDZ(){
	var appVersion = $('#AppVersionOpt .fixedText').html(),v = 0;
	var appChannel = $('#AppChannelOpt .fixedText').html(),c = 0;
	var appReg = $('#AppRegOpt .fixedText').html(),z = 0;
	if(appVersion != '所有版本'){v = 1;}
	if(appChannel != '所有渠道'){c = 1;}
	if(appReg != '所有'){z = 1;}
	if(v + c + z >1){
		return true;
	}else{
		return false;
	}
}
//获取参数
function getAjaxParam(){
	var _dataParam = [],
		dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1],
		reportName = 'MultiDimensionData',
		data = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
	
	if(keywords != ''){
		$.extend(data, {'appModel': 'appModel=%'+keywords.toLowerCase()+'%'});
	}	
	var appVersion = $('#AppVersionOpt .fixedText').html();
	if(appVersion != '所有版本'){
		if(appVersion != null && appVersion != 'Other'){
			var _temp = appVersion.substring(appVersion.lastIndexOf('('),appVersion.lastIndexOf(')'));
			_temp =_temp.replace('(','__');
			appVersion =appVersion.substring(0,appVersion.lastIndexOf('('))+_temp;
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
	
	var appReg = $('#AppRegOpt .fixedText').html();
	if(appReg != '所有'){
		appReg = appReg == '非注册' ? 0 : 1;
		$.extend(data, {'appReg': 'appReg='+appReg});
	}
	
	var isAll = (appVersion == '所有版本' && appChannel == '所有渠道' && appReg == '所有');
	var _v = appVersion != '所有版本' ? 'V' : '';
	var _c = appChannel != '所有渠道' ? 'C' : '';
	var _z = appReg != '所有' ? 'Z' : '';
	if(isAll){
		var _tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_MODEL_ETL';
		$.extend(data, {'tableName': _tableName});
	}else{
		var _tableName = 'REPORT_INTRO_MULTI_'+ _v + _c + 'D' + _z +'_ETL';
		$.extend(data, {'tableName': _tableName});
		reportName = 'deviceModelDimensionDataMulti';
	}
	var _multi = _v  + _c + 'D' + _z;
	if(_multi.length == 1){
		 _multi = '';
	}
	if($('#DateList .selected').find('a').attr('dateinterval') == '7'){
		$.extend(data,{'model': '7day' + _multi});
	}else if($('#DateList .selected').find('a').attr('dateinterval') == 'all'){
		$.extend(data,{'model': 'allday' + _multi});
	}
	var equalSymbol = {'appKey':1,'startDate':1,'endDate':1,'appVersion':1,'appChannel':1,'appModel':1,'appReg':1};
	if(isVCDZ()){
		for(var k in data){
			if(equalSymbol[k]){
				var equal = k.length+1;
				data[k] = data[k].substring(equal);
			}
		}
		$.extend(data, {'tablename': 'rps__h_report_more_dimension_more_norm_'+(_multi).toLocaleLowerCase()+'_impala'});
	}
	_dataParam.push(data);
	_dataParam.push(reportName);
	return _dataParam;
}

function getData(){
	if(thisIndex == 'all'){
		$('#AllTable').show();
		$('#SingleTable').hide();
		getDataAll();
	}else{
		$('#AllTable').hide();
		$('#SingleTable').show();
		getDataSingle();
	}
}

function getDataAll(){
	var _data = getAjaxParam();
	var _date = $('#FixedDate').val().split(' 至 ');
	
	var columns = [
					{field: 'dimValue', title: '设备型号', width: 80, align: 'left', formatter: function(row){
							return '<a href="javascript:;" style="border-bottom:1px dashed #0E4279" title="点击查看设备详情" onclick="getDeviceModelDetail(\''+row.dimValue+'\');">' + row.dimValue + '</a>';
						}
					},
					{field: 'uv', title: '启动用户比例', width: 70, align: 'left', sortable: true, formatter:function(row){
							return addPercent(row.uvRate);
						}
					},
					{field: 'newUv', title: '新用户(%)', width: 70, align: 'left', sortable: true, formatter:function(row){
							return formatNum(row.newUv)+' <font style="color:#999">('+addPercent(row.newUvRate)+')</font>';
						}
					},
					{field: 'startTimes', title: '启动次数(%)', width: 70, align: 'left', sortable: true, formatter:function(row){
							return formatNum(row.startTimes)+' <font style="color:#999">('+addPercent(row.startTimesRate)+')</font>';
						}
					},
					{field: 'pv', title: '浏览量(%)', width: 70, align: 'left', sortable: true, formatter:function(row){
							return formatNum(row.pv)+' <font style="color:#999">('+addPercent(row.pvRate)+')</font>';
						}
					},
					{field: 'manage', title: '操 作', width: 60, align: 'center', formatter:function(row){
							return '<div style="height:24px;"><input type="button" class="btn btnSmall" value="查看趋势" onclick="showTrend(\''+row.dimValue+'\')" /></div>';
						}
					}
				];
	var _impala = '';
	if(isVCDZ()){
		_impala = '_impala';
	}
	$('#Datagrid').Datagrid({
		url: projectName+'/deviceModelDimensionAction.do?method=deviceIntro'+_impala+'&reportName=deviceModelDimensionDataMulti',
		dataParam: _data[0],
		conDivAuto: true,
		dgAutoHeight: true,
		firstColWidth:40,
		columns: columns,
		pageRowSelected: 10,
		pageRowList: [10,30,50,100],
		sortType: 'ajax',
		sortRule: 'desc',
		sortOrderBy: 'pv',
		ajaxCallback: function(data, _self){
			if($('#Datagrid .dgHeader .sortabledesc').length>0){
				orderName = $('#Datagrid .dgHeader .sortabledesc').parent('td').attr('field')+'@desc';
			}else if($('#Datagrid .dgHeader .sortableasc').length>0){
				orderName = $('#Datagrid .dgHeader .sortableasc').parent('td').attr('field')+'@asc';
			}
//			_cacheGridData = data;		
			$('.multiDataLoading').hide();
		}
	});
}
function addPercent(rate){
	if(isVCDZ()){
		return rate + '%';
	}else{
		return rate;
	}
}
function getDataSingle(){
	var _sortOrderBy = orderName.split('@')[0], _sortRule = orderName.split('@')[1];
	flag = true;
	deviceModelArr = [];
	
	var _data = getAjaxParam();
	var oneDay = false;
	var _norm = 'pv';
	if(thisIndex == 'pv'){
		var columnTitle2 = '浏览量（比例）',
			columnTitle3 = '数量（比例）',
			method = 'getPVOf'+reportTypeEnName;
		_norm = 'pv';
	}else if(thisIndex == 'uv'){
		var columnTitle2 = '启动用户（比例）';
		if(oneDay){
			var columnTitle3 = '数量';
		}else{
			var columnTitle3 = '比例';
		}
		var method = 'getUVOf'+reportTypeEnName;
		_norm = 'startUserNum';
	}else if(thisIndex == 'newAddUser'){
		var columnTitle2 = '新用户数（比例）',
			columnTitle3 = '数量（比例）',
			method = 'getNewAddUserNumOf'+reportTypeEnName;
		_norm = 'newUserNum';
	}else if(thisIndex == 'startTimes'){
		var columnTitle2 = '启动次数（比例）',
			columnTitle3 = '数量（比例）',
			method = 'getStartTimesOf'+reportTypeEnName;
		_norm = 'times';
	}
	if(isVCDZ()){
		method = 'getEveryNormData';
		$.extend(_data[0], {'norm': _norm});
	}
	var datagridColor = ['#2f7ed8', '#910000', '#8bbc21', '#0d233a', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
	var prop = 0, datagridIndex = 0;
	$('#Datagrid').css({'padding': 0});
	$('#Datagrid').DatagridContenter({
		url: projectName+'/deviceModelDimensionAction.do?method='+method+'&reportName=deviceModelDimensionDataMulti',
		height: 400,
		pageRowList: [10,20,30,50,100],
		heightAdjust: false,
		hasFirstCol: false,
		dataParam: _data[0],
		sortRule: _sortRule,
		sortOrderBy: _sortOrderBy,
		beforeAjax: function(){
			prop = 0;
		},
		columns: [
		         	{field: 'dimValue', title: reportTypeCnName, width: 80, align: 'left', formatter:function(row){
							datagridIndex++;
							if(datagridIndex == 11){
								datagridIndex = 1;
							}
							return '<div style="display:inline-block; *display:inline; *zoom:1; width:13px; height:13px; margin-left:10px; vertical-align:middle; background:'+datagridColor[datagridIndex-1]+'"></div>&nbsp;<a href="javascript:;" style="border-bottom:1px dashed #0E4279" title="点击查看设备详情" onclick="getDeviceModelDetail(\''+row.dimValue+'\');">' + row.dimValue + '</a>';
						}
					},
		         	{field: 'proportion', title: columnTitle3, width: 80, align: 'left', formatter: function(row){
							var proportion = 100;
							if(row.proportion == 0.00){
								prop = 0;
								proportion = 0;
							}else{
								if(prop == 0){
									prop = 100/row.proportion;
								}else{
									proportion = row.proportion*prop;
								}
							}
							
							if(thisIndex == 'uv'){
								if(oneDay){
									var value = '&nbsp;'+formatNum(row.normValue);
								}else{
									var value = '&nbsp;'+row.proportion+'%';
								}
		         			}else{
		         				var value = '&nbsp;'+formatNum(row.normValue) + ' <font style="color:#999">(' + row.proportion + '%)</font>';
		         			}
	         				var thisHtml = '<div style="float:left; width:100%;"><div style="*float:left; padding:0 120px 0 5px;">';
	         					thisHtml += '<div class="rateBar" style="display:none; margin-top:2px; width:'+proportion+'%; height:16px;background:'+datagridColor[datagridIndex-1]+';">';
	         					thisHtml += '<span style=" display:block; position:relative; margin-right:-120px; float:right; width:120px; line-height:16px; text-align:left;">&nbsp;' + value + '</span>';
	         					thisHtml += '</div>';
	         					thisHtml += '</div></div>';
	         					if(thisIndex == 'uv' && oneDay){
	         						thisHtml += '<span class="rateVal" val="'+row.normValue+'">'+value+'</span>';
	         					}else{
	         						thisHtml += '<span class="rateVal" val="'+row.proportion+'">'+value+'</span>';
	         					}
	         				return thisHtml;
						}
					}
				],
				ajaxCallback: function(data){
			$('.multiDataLoading').fadeOut('fast');
			if(data.rows.length == 0){return;}
			var tableModes = $('.tableMode a'),
				thisMode;
			tableModes.each(function(){
				if($(this).hasClass('active')){
					thisMode = $(this).attr('mode');
				}
			});
			var rowspan = $('#Datagrid .rowNum').val();
			$('#Datagrid .dgContentTable tbody tr').eq(0).append('<td class="pieTd" rowspan="'+rowspan+'" valign="middle" align="center" style="display:none; border:1px solid #E5E5E5; border-right:none; background:#fff; vertical-align: middle;"><div id="PieContenter" class="pieContenter" style="width:700px;"></div></td>');
			var dataRateTr = $('#Datagrid .dgContentTable tbody tr');
			var pieData = [], pieRate = 0;
			dataRateTr.each(function(){
				var _pieData = [];
				_pieData.push($(this).find('td').eq(0).find('a').html());
				var _thisRate = $(this).find('td').eq(1).find('.rateVal').attr('val');
				_thisRate = parseFloat(_thisRate);
				
				_pieData.push(_thisRate);
				pieRate += _thisRate;
				pieData.push(_pieData);
			});
			var _totle = $('.dgFooter .total').html();
			if(pieRate < 100 && (_totle > data.rows.length)){
				pieData.push({
                    name: '其他',
                    y: parseFloat(100-pieRate),
                    color: '#AADFF3'
                });
			}
			
			
			new Highcharts.Chart({
				chart: {
					renderTo: 'PieContenter',
					defaultSeriesType: 'pie',
					width: 700,
					height: 300,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: ''
				},
				tooltip: {
					formatter: function() {
						if(thisIndex == 'uv' && oneDay){
							return '<b>'+ this.point.name +'</b>: '+ formatNum(this.y);
						}else{
							return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
						}
					}
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							connectorColor: '#000000',
							connectorPadding: 0,
							softConnector: false,
							rotation: 0,
							formatter: function() {
								if(thisIndex == 'uv' && oneDay){
									return '<b>'+ this.point.name +'</b>: '+ formatNum(this.y);
								}else{
									return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
								}
							}
						},
						style: {
							color: '#333333',
							fontSize: '9px',
							padding: '5px'
						}
					}
				},
				series: [{
					type: 'pie',
					name: 'Browser share',
					data: pieData
				}]
			});
			
			if(thisMode == 'performance'){
	    		$('#Datagrid .pieTd').hide();
	    		$('#Datagrid .rateBar').show();
	    		$('#Datagrid .rateVal').hide();
	    	}else if(thisMode == 'data'){
	    		$('#Datagrid .pieTd').hide();
	    		$('#Datagrid .rateBar').hide();
	    		$('#Datagrid .rateVal').show();
	    	}else if(thisMode == 'pie'){
	    		$('#Datagrid .pieTd').show();
	    		$('#Datagrid .rateBar').hide();
	    		$('#Datagrid .rateVal').show();
	    	}
		}
	});
}

//top5趋势
function top5Trend(norm){
	$('#Top5Trend').html('<div class="loading"></div>');
	var _data = getAjaxParam();
	
	$.extend(_data[0], {'norm': $('#Top5Tab li.selected').attr('index')});
	if($('#DateList .selected').find('a').attr('dateinterval') == '7' && _data[1] == 'MultiDimensionData'){
		var _idx = $('#Top5Tab li.selected').attr('index');
		_data[0].norm = singleDimSeven[_idx]; 
	}
	var _impala = '';
	if(isVCDZ()){
		_impala = '_impala'; 
	}
	$.ajax({
		url: projectName+'/deviceModelDimensionAction.do?method=geNormTop5Trend'+_impala+'&reportName=deviceModelDimensionDataMulti',
		data: _data[0],
		dataType: 'json',
		success: function(data){
			var series = [];
			var dataX = [];
			var keyName = [];
			
			for(var k in data){
				keyName.push(k);
				
				var item = {};
				item.name = k;
				item.data = [];
				
				if(dataX.length == 0){
					dataX = data[k][0];
				}
				var dataArr = data[k][1];
				var newDataArr = [];
				for(var i = 0, len = dataArr.length; i < len; i++){
					newDataArr.push(parseFloat(dataArr[i]));
				}
				item.data = newDataArr;
				series.push(item)
			}
			
			$('#Top5Trend').html('');
			
			$('#Top5Trend').createLineChart({
				type: 'spline',
				dataX: dataX,
				seriesData: series,
				normName: $('#Top5Tab li.selected a').html(),
				height: 300
			});
		}
	})
}


window.showTrend = function(appChannelName){
	var title = '<span id="SingleTitle">'+appChannelName+'</span>__趋势分析';
	$('.dialogTitle .dialogTitleH1').html(title);
	$.Dialog({
		width: 1000,
		height: 550,
		title: title,
		contentDom: '#TrendSingle',
		initCallback: function(){
			$('#SingleTitle').html(appChannelName);
			$('#SingleName').val(appChannelName);
			
			$('#DateListSingle').html($('#DateList').html());
			
			var _startDate = typeof startDate !== 'undefined' ? startDate : '2010-01-01';
			$("#DateListSingle a").die().live("click", function () {
		        $("#CalendarSingle").val("");
		        $(this).parent().addClass("selected").siblings().removeClass("selected");
		        if ($(this).attr("dateInterval") == "all"){
		        	getDateInterval("#FixedDateSingle", "all");
		        }else{
		        	getDateInterval("#FixedDateSingle", $(this).attr("dateInterval"));
		        }
		        $("#CalendarSingle").val($("#FixedDateSingle").val());
		        getTrendSingle(appChannelName);
		    });
			
			$("#CalendarSingle").val($('#FixedDate').val());
			$("#FixedDateSingle").val($('#FixedDate').val());
		    $("#CalendarSingle").Calendar({
		        single: false,
		        monthSize: 3,
		        showFooter: true,
		        offsetX: -340,
		        disableDate: _startDate+'||'+date2Str(getPastDate(_date, 1)),
		        currentDate: getPastDate(_date, 1),
		        applyCallback: function () {
		            $("#FixedDateSingle").val($("#CalendarSingle").val());
		            $("#DateListSingle dd").removeClass("selected");
		            
		            var appChannelName = $('#SingleTitle').html();
		            getTrendSingle(appChannelName);
		        }
		    });
			
			getTrendSingle(appChannelName);
		}
	});
}


//线图数据
var dataX = [];
var series = [];

function getTrendSingle(name){
	$('#LineChartSingle').html('<div class="loading"></div>');
	
	var len = 1;
	var list = "'" + name + "\'",
	tabs = {'uv':'uv','newAddUser':'new_uv','startTimes':'start_times','pv':'pv', 'pv|uv': 'pv|uv', 'pv|startTimes': 'pv|start_times', 'startTimes|uv': 'start_times|uv', 'newAddUser|uv': 'new_uv|uv'},
	tabsSeven = {'uv':'uv','newAddUser':'newUv','startTimes':'startTimes','pv':'pv','pv|uv':'pv|uv','pv|startTimes':'pv|startTimes','startTimes|uv':'startTimes|uv','newAddUser|uv':'newUv|uv'};
	
	tabsMulti = {'uv':'startUserNum','newAddUser':'newUserNum','startTimes':'times','pv':'pv', 'pv|uv': 'pv|startUserNum', 'pv|startTimes': 'pv|times', 'startTimes|uv': 'times|startUserNum', 'newAddUser|uv': 'newUserNum|startUserNum'};
	
	var table = 'REPORT_DEVICE_MODEL_STAT_ETL',action='/multiDimensionAction.do', 
		_data = getAjaxParam();
	
	if(_data[0].tableName != 'REPORT_INTRO_MULTI_SINGLE_BY_MODEL_ETL'){
		table = _data[0].tableName;
		action = '/deviceModelDimensionAction.do';
	}
	
	var array = $('#FixedDateSingle').val().split('至');
    var startDate = 'startDate='+array[0].trim();
    var endDate = 'endDate='+array[1].trim();
    _data[0].startDate = startDate;
    _data[0].endDate = endDate;
    
    
    if(_data[0].model){
		var _mulit = _data[0].model.split('day')[1];
		if($('#DateListSingle .selected').find('a').attr('dateinterval') == '7'){
			_data[0].model = '7day'+ _mulit;
		}else if($('#DateListSingle .selected').find('a').attr('dateinterval') == 'all'){
			_data[0].model = 'allday'+ _mulit;
		}else{
			_data[0].model = '';
		}
	}
    var _norm, _dim = 'device_model';
    if(_data[1] == 'deviceModelDimensionDataMulti'){
    	_norm = tabsMulti[$('#GlobalTabSingle li.selected').attr('index')];
    }else{
    	_norm = tabs[$('#GlobalTabSingle li.selected').attr('index')];
    	if($('#DateListSingle .selected').find('a').attr('dateinterval') == '7'){
    		_norm = tabsSeven[$('#GlobalTabSingle li.selected').attr('index')];
    		_data[0].model = 'device_model7day';
    		_dim = 'appModel';
		}
    }
    $.extend(_data[0], {'table': table},{'list':'('+list+')'},{'norm': _norm},{'dim':_dim});
	
	
	var index = $('#GlobalTabSingle li.selected').attr('index');
	var isNextOpt = index == 'pv|uv' || index == 'pv|startTimes' || index == 'startTimes|uv';
	var _toolTipSuffix = index == 'newAddUser|uv' ? '%' : '';
	var _impala = '';
	if(isVCDZ()){
		_data[0].startDate = array[0].trim();
		_data[0].endDate = array[1].trim();
		_impala = '_impala'; 
	}
	$.ajax({
		url: projectName + action + "?method=getTrendData"+_impala+"&reportName="+_data[1],
		data: _data[0],
		dataType : 'json',
		success: function(data){
			if(data){
				var dataX = [], series = [];
				for(var j = 0; j < len; j++){
					var _s = {};
					var model = name;
					_s.name = model;
					if(data[model]!=undefined){
						
						_s.data = data[model][1];
						
						if(isNextOpt){
							for(var i = 0; i < _s.data.length; i++){
								_s.data[i] = (_s.data[i]/100).toFixed(2);
							}
						}
						
						series.push(_s);
						if(j==0){
							dataX = data[model][0];
						}
					}
				}
				var normName = $('#GlobalTabSingle .selected a').html();
				$("#LineChartSingle").html('');
				var date = $('#FixedDateSingle').val().split('至');
				var _resulte = fullData(dataX,series,date);
				dataX = _resulte[0];
				series = _resulte[1];
				$('#LineChartSingle').createLineChart({
					dataX: dataX,
					seriesData: series,
					height: 400,
					normName: normName,
					toolTipSuffix: _toolTipSuffix
				});
			}
		}
	});
}
function fullData(dataX,series,date){
date[0] = $.trim(date[0]);
date[1] = $.trim(date[1]);
    var _start = new Date(date[0]).getTime(),_end = new Date(date[1]).getTime(),i=0;
    var _dataX = [],_dataY = [];
    while(_start <= _end){
        var _s = formatDate(_start);
        _dataX.push(_s);
        if( _s == dataX[i]){
        	_dataY.push(series[0].data[i]);
        	 i++;
        }else{
        	_dataY.push(0);
        }
        _start += 24*60*60*1000;
    }
   series[0].data = _dataY;
   return [_dataX,series];
 }
function formatDate(time){
	var t = new Date(time);
	var y = t.getFullYear(),m = t.getMonth() +1,d = t.getDate();
	m = m >9 ? m : '0'+m;
			d =d >9 ? d : '0'+d;
			return y+'-'+m+'-'+d;
}

});