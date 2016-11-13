/**
 * SDK 通用指标
 * @author	Rocky
 * @date	2012-03-17
 *  218 ,423参数加model
 */
define(function(require){
	window.startDate = '2013-03-01';
    require('common.js');
    require('calendar');
    require('datagrid');
    require('dialog');
    require('tipbox');
    require('highcharts_3.0.1.js');
    
var reportName = "MultiDimensionData";
var thisHref = window.location.href;
var _appKey = thisHref.split('appkey=')[1];
var appKey = 'appKey=' + _appKey;
var thisIndex = 'hit_pv';
var reportTypeCnName,reportTypeEnName;
var keywords = '';
var hitResult = '';

var flag = true, deviceModelArr = [], tabs = {'hit_pv':'hit_pv','hit_uv':'hit_uv','pv':'pv','uv':'uv'};

$(function(){
	reportTypeCnName = $('#reportTypeCnName').val(),
	reportTypeEnName = $('#reportTypeEnName').val();
	
	initBind(function(){
		$('.searchContent').val('');
		$('.hitResultContent').val('');
		keywords = '';
    	getData();
    });
	
	$('.keywordsSearch').click(function(){
		keywords = $(this).parent().find('.searchContent').val();
		hitResult = $(this).parent().find('.hitResultContent').val();
		getData();
	});
	
	$('.hitResultSearch').click(function(){
		keywords = $(this).parent().find('.searchContent').val();
		hitResult = $(this).parent().find('.hitResultContent').val();
		getData();
	});
    
    getData();
    
    
    $('.tableMode a').click(function(){
    	var thisMode = $(this).attr('mode');
    	if(thisMode == 'export'){
    		var _norm = 'hit_pv';
    		if(thisIndex == 'hit_pv'){
    			var _norm = 'hit_pv';
    		}else if(thisIndex == 'hit_uv'){
    			var _norm = 'hit_uv';
    		}else if(thisIndex == 'pv'){
    			var _norm = 'pv';
    		}else if(thisIndex == 'uv'){
    			var _norm = 'uv';
    		}
    		var dateArr = getDateParam(),
			startDate = dateArr[0],
			endDate = dateArr[1];
    		var excelColName = reportTypeCnName+",数量,比例(%)";

    		var	exportColumns = 'dimValue,normValue,proportion';
    		
    		var _tabName = $('.globalTab li.selected a').html();
    		$.exportExcel({
    			url: projectName+'/multiDimensionAction.do?method=export2Excel&reportName='+reportName
    				 +'&startDate='+startDate+'&endDate='+endDate+'&appKey='+appKey+'&norm='+_norm
    				 +'&sqlId='+reportTypeEnName+'SqlId&exportColumns='+exportColumns,
			    fileName: $('#ReportAnchor').html()+'__'+reportTypeCnName+ '__' + _tabName +"__明细数据---"+$("#FixedDate").val(),
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
    
    $('.globalTab li').click(function(){
    	$('.globalTab li').removeClass('selected');
    	$(this).addClass('selected');
    	thisIndex = $(this).attr('index');
    	$('#TrendLine  li').each(function(){
    		if($(this).attr('index')==tabs[thisIndex]){
    			$('#TrendLine  li').removeClass('selected');
    	    	$(this).addClass('selected');
    		}
    	});
    	getData();
    });
    $('#TrendLine  li').click(function(){
    	$('#TrendLine  li').removeClass('selected');
    	$(this).addClass('selected');
    	getTrendLine();
    });
    
    //导出excel
	$("#ExportExcel").click(function(){
		var dateArr = getDateParam(),
			startDate = dateArr[0],
			endDate = dateArr[1];
		
		var _tabName = $('.globalTab li.selected a').html();
		$.exportExcel({
			url: projectName+'/multiDimensionAction.do?method=export2Excel&reportName='+reportName
				 +'&startDate='+startDate+'&endDate='+endDate+'&appKey='+appKey
				 +'&sqlId='+thisIndex+'Of'+reportTypeEnName+'SqlId',
			fileName: $('#ReportAnchor').html()+'__'+reportTypeCnName+ '__' + _tabName +"__明细数据---"+$("#FixedDate").val(),
			excelColName: reportTypeCnName+",数量,比例"
		});
	});
	
	$('<a href="javascript:;" class="tipExplain" tipBoxText="亲，你还在为指标迷惑吗？请猛点这里" id="ShowExplainDialog" tipBoxText="亲，你还在为指标迷惑吗？请猛点这里">报表解读</a>').insertAfter('.dateOpt');
	
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
	$('#SelectAll').live('click', function(){
		if($(this).prop('checked')){
			var tableSelect = $('#Datagrid .tableSelect');
			tableSelect.each(function(k,v){
				if(deviceModelArr.length < 5){
					$(this).prop('checked', true);
					if(deviceModelArr.indexOf($(this).attr('model')) == -1){
						deviceModelArr.push($(this).attr('model'));
					}
				}else{
					if(!$(this).prop('checked')){
						$(this).attr('disabled','disabled');
					}
				}
			});
		}else{
			$('#Datagrid .tableSelect').prop('checked', false);
			$('#Datagrid .tableSelect').removeAttr('disabled');
			deviceModelArr = [];
		}
		if(deviceModelArr.length > 0){
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
		if(deviceModelArr.length > 0){
			$('#DrawLineChart').addClass('btnPrimary');
		}else{
			$('#DrawLineChart').removeClass('btnPrimary');
		}
		if(deviceModelArr.length < 5){
			$('#Datagrid .tableSelect').removeAttr('disabled');
			$('#SelectAll').prop('checked', false);
		}else{
			$('#SelectAll').prop('checked', true);
			$('#Datagrid .tableSelect').each(function(){
				if(!$(this).prop('checked')){
					$(this).attr('disabled','disabled');
				}
			})
		}
	});
	$('#DrawLineChart').click(function(){
		$('html,body').animate({scrollTop: $('#TrendLine').offset().top}, 500);
		getTrendLine();
	});
	
});

function getData(){
	flag = true;
	deviceModelArr = [];
	var dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1],
		data = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
	
	var _norm = 'hit_pv';
	var columnTitle2 = '投放量（比例）',
        columnTitle3 = '数量（比例）';
	if(thisIndex == 'hit_pv'){
		var columnTitle2 = '投放量（比例）',
        columnTitle3 = '数量（比例）';		
		var _norm = 'hit_pv';
	}else if(thisIndex == 'hit_uv'){
		var columnTitle2 = '投放用户量（比例）',
        columnTitle3 = '数量（比例）';		
		var _norm = 'hit_uv';
	}else if(thisIndex == 'pv'){
		var columnTitle2 = '访问量（比例）',
        columnTitle3 = '数量（比例）';		
		var _norm = 'pv';
	}else if(thisIndex == 'uv'){
		var columnTitle2 = '访问用户量（比例）',
        columnTitle3 = '数量（比例）';		
		var _norm = 'uv';
	}


	if($('#DateList .selected').find('a').attr('dateinterval') == '7'){
		$.extend(data,{'model': '7day'});
	}else if($('#DateList .selected').find('a').attr('dateinterval') == 'all'){
		$.extend(data,{'model': 'allday'});
	}
	$.extend(data,{'norm':_norm});
	if(keywords != ''){
		$.extend(data, {'keywords': '%'+keywords+'%'});
	}	
	
	if(hitResult != ''){
		$.extend(data, {'hitResult': hitResult});
	}		
	
	
	var datagridColor = ['#2f7ed8', '#910000', '#8bbc21', '#0d233a', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
	var prop = 0, datagridIndex = 0;
	$('#Datagrid').DatagridContenter({
		//url: projectName+'/datatest_hit_location_page.txt?method=get'+reportTypeEnName+'Dim&reportName='+reportName,
		url: projectName+'/hitanalysis/multiDimensionAction.do?method=get'+reportTypeEnName+'Dim&reportName='+reportName,
		height: 400,
		pageRowList: [10,20,30,50,100],
		heightAdjust: false,
		hasFirstCol: false,
		dataParam: data,
		beforeAjax: function(){
			prop = 0;
		},
		columns: [
					{field: 'select', title: '<input type="checkbox" id="SelectAll" />', width: 10, align: 'center', formatter:function(row){
						return '<input type="checkbox" value="1" name="model" class="tableSelect" model="' + row.dimValue + '"/>';
						}
					},
		         	{field: 'dimValue', title: reportTypeCnName, width: 60, align: 'left', formatter:function(row){
							datagridIndex++;
							if(datagridIndex == 11){
								datagridIndex = 1;
							}
							return '<div style="display:inline-block; *display:inline; *zoom:1; width:13px; height:13px; margin-left:10px; vertical-align:middle; background:'+datagridColor[datagridIndex-1]+'"></div>&nbsp;<span>' + row.dimValue + '</span>';
						}
					},
		         	{field: 'proportion', title: columnTitle3, width: 80, align: 'left', formatter: function(row){
						var _value = row.normValue < 0 ? 0 : row.normValue;
						
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
							

		         				var value = '&nbsp;'+formatNum(new Number(_value)) + ' <font style="color:#999">(' + row.proportion + '%)</font>';

	         				var thisHtml = '<div style="float:left; width:100%;"><div style="*float:left; padding:0 120px 0 5px;">';
	         					thisHtml += '<div class="rateBar" style="display:none; margin-top:2px; width:'+proportion+'%; height:16px;background:'+datagridColor[datagridIndex-1]+'">';
	         					thisHtml += '<span style=" display:block; position:relative; margin-right:-120px; float:right; width:120px; line-height:16px; text-align:left;">&nbsp;' + value + '</span>';
	         					thisHtml += '</div>';
	         					thisHtml += '</div></div>';
	         					

	         						thisHtml += '<span class="rateVal" val="'+row.proportion+'">'+value+'</span>';

	         				return thisHtml;
						}
					}
				],
		ajaxCallback: function(data){
			datagridIndex = 0;
			if(data.rows.length == 0){
				return;
			}
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
				_pieData.push($(this).find('td').eq(1).find('span').html());
				var _thisRate = $(this).find('td').eq(2).find('.rateVal').attr('val');
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

							return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';

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

									return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';

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
			deviceModelArr = [];
			$('#SelectAll').removeAttr('checked');
			if(flag){
				var modelName = $('#Datagrid .tableSelect').eq(0).attr('model');
				deviceModelArr.push(modelName);
//				flag = false;
				$('#Datagrid .tableSelect').eq(0).prop('checked',true);
				getTrendLine();
			}
		}
	});
	
}

function getTrendLine(){
	if(deviceModelArr.length==0)return;
	var diff = {'Location':{'dim':'city','table':'REPORT_LOCATION_STAT_ETL'},//地理位置
				'NetWork':{'dim':'network_type','table':'REPORT_NETWORK_STAT_ETL'},//联网方式
				'Operator':{'dim':'operators','table':'REPORT_OPERATORS_STAT_ETL'},//网络服务运营商
				'Resolution':{'dim':'resolution','table':'REPORT_RESOLUTION_STAT_ETL'},//分辨率
				'OSVersion':{'dim':'os_version','table':'REPORT_OS_STAT_ETL'},//操作系统
				'EngineVersion':{'dim':'engine_version','table':'REPORT_ENGINEVERSION_STAT_ETL'},//软件版本
				'DeviceModel':{'dim':'device_model','table':'REPORT_DEVICEMODEL_STAT_ETL'},//设备类型
				'NullHit':{'dim':'null_hit','table':'REPORT_NULLHIT_STAT_ETL'},//空投放
				'UserDisturbance':{'dim':'user_disturbance','table':'REPORT_USERDISTURBANCE_STAT_ETL'}//用户打扰
	           };
	var list = [],len = deviceModelArr.length;
	var idx = $('#TrendLine .selected').attr('index');
	for(var i =0;i<len;i++){
		list.push("'"+deviceModelArr[i]+"\'");
	}
	list = list.toString();
	
	var dateArr = getDateParam(),
	startDate = dateArr[0],
	endDate = dateArr[1],
	data = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
	$.extend(data, {'table': diff[reportTypeEnName].table},{'list':'('+list+')'},{'norm':idx},{'dim':diff[reportTypeEnName].dim});
	if($('#DateList .selected').find('a').attr('dateinterval') == '7'){
		var pageModel = {'Location':'city7day','NetWork':'network_type7day','OSVersion':'os_version7day','Resolution':'resolution7day','Operator':'operators7day','EngineVersion':'engine_version7day','DeviceModel':'device_model7day','NullHit':'null_hit7day','UserDisturbance':'user_disturbance7day'};
		$.extend(data,{'model': pageModel[reportTypeEnName]});
	}
	if(keywords != ''){
		$.extend(data, {'keywords': '%'+keywords+'%'});
	}	
	
	if(hitResult != ''){
		$.extend(data, {'hitResult': hitResult});
	}		
	
	$.ajax({
		//url: projectName+"/datatest_hit_location_trend.txt?method=getTrendData&reportName=MultiDimensionData",
		url: projectName+"/hitanalysis/multiDimensionAction.do?method=getTrendData&reportName=MultiDimensionData",		
		data: data,
		dataType : 'json',
		success: function(data){
			if(data){
				var dataX = [], series = [];
				for(var j=0;j<len;j++){
					var _s={};
					var model = deviceModelArr[j];
					_s.name = model;
					if(data[model]!=undefined){
						_s.data = data[model][1];
						series.push(_s);
						if(j==0){
							dataX = data[model][0];
						}
					}
				}
				var normName = $('#TrendLine .selected a').html();
				$('#LineChart').createLineChart({
					type:'spline',
					dataX: dataX,
					seriesData: series,
					height: 280,
					normName:normName
				});
			}
		}
	});
}

});
