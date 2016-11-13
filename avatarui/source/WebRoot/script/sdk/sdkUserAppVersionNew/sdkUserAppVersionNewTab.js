    var reportName = 'appVersionDimensionDataMultiNew';
    var thisHref = window.location.href;
    var _appKey = thisHref.split('appkey=')[1];
    var appKey = 'appKey=' + _appKey;
    var noticeBtn = true,outTime = 2000;
    var keywords = "";
    var cacheChannel = '所有渠道', cacheModel = '所有型号', cacheReg = '所有',IndicatorsFlag = true, tabFlag = true;
    var pannelWidth, _pannelIndex = 0;
    var top5Index = 0;    
    var _cacheGridData = '';
    var singleDim = ['new_uv', 'start_times', 'uv', 'pv', 'total_uv', 'update_user', 'extant_user', 'first_version_usernum', 'pv|uv', 'pv|start_times', 'start_times|uv', 'new_uv|uv'];
    var singleDimSeven = ['newUv','startTimes','uv','pv','totalUv','update_user','extant_user','first_version_usernum','pv|uv','pv|startTimes','startTimes|uv','newUv|uv'];
    var multiDim = ['newUserNum', 'times', 'startUserNum', 'pv', 'total_uv', 'update_user', 'extant_user', 'first_version_usernum', 'pv|startUserNum', 'pv|times', 'times|startUserNum', 'newUserNum|startUserNum'];
    var singleName = {
    		'pv': '浏览量',
    		'uv': '启动用户',
    		'newUv': '新用户',
    		'startTimes': '启动次数',
    		'totalUv': '累计用户',
    		'updateUser': '升级用户',
    		'extantUser': '现存用户',
    		'fvun': '首次版本新用户'
    	}
    var normObj = {
    		'su': '启动用户',
    		'nu': '新用户',
    		'tu': '累计用户',
    		'st': '启动次数',
    		'pv': '浏览量',
    		'ats': '单次平均使用时长(秒)',
    		'oupv': '单用户PV',
    		'ostpv': '单次启动PV',
    		'oust': '单用户启动次数',
    		'up': '启动新用户占比'
    	};
    var thisIndex = 'all', thisIndexSingle = 0, thisIndexCompare = 0;
    var deviceModelArr = [];
    //判断无维度与否
    function IsAll(){
    	if($('#AppChannelOpt .fixedText').html() == '所有渠道' && $('#AppModelOpt .fixedText').html() == '所有型号' && $('#AppRegOpt .fixedText').html() == '所有'){
    		return true;
    	}else{
    		return false;
    	}
    }
    //获取维度VCDZ
    function getVCDZ(){
    	var appVersion = $('#AppVersionOpt .fixedText').html();
    	var appChannel = $('#AppChannelOpt .fixedText').html();
    	var appModel = $('#AppModelOpt .fixedText').html();
    	var appReg = $('#AppRegOpt .fixedText').html();
    	var _v = appVersion != '所有版本' ? 'V' : '';
    	var _c = appChannel != '所有渠道' ? 'C' : '';
    	var _d = appModel != '所有型号' ? 'D' : '';
    	var _z = appReg != '所有' ? 'Z' : '';
    	return _v + _c + _d + _z ;
    	
    }
  //获取参数
    function getAjaxParam(){
    	var _dataParam = [],
    		dateArr = getDateParam(),
    		startDate = dateArr[0],
    		endDate = dateArr[1],
    		reportName = 'appVersionDimensionDataMultiNew',
    		data = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
    	
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
    	
    	if(keywords != ''){
    		$.extend(data, {'appVersionName': 'appVersionName=%'+keywords+'%'});
    	}
    	
    	var isAll = (appChannel == '所有渠道' && appModel == '所有型号' && appReg == '所有');
    	if(isAll){
    		reportName = 'appVersionDimensionDataNew';
    	}
    	
    	var _c = appChannel != '所有渠道' ? 'C' : '';
    	var _d = appModel != '所有型号' ? 'D' : '';
    	var _z = appReg != '所有' ? 'Z' : '';
    	

    	
    	if(!isAll){
    		var _tableName = 'REPORT_INTRO_MULTI_V'+ _c + _d + _z +'_ETL';
    		$.extend(data, {'tableName': _tableName});		
    	}
    	var _multi = 'V' + _c + _d;
    	if(_multi.length == 1){
    		_multi = '';
    	}
    	if($('#DateList .selected').find('a').attr('dateinterval') == '7' && appReg == '所有'){
    		$.extend(data,{'model': '7day' + _multi});
    	}else if($('#DateList .selected').find('a').attr('dateinterval') == 'all' && appReg == '所有'){
    		$.extend(data,{'model': 'allday' + _multi});
    	}
    	_dataParam.push(data);
    	_dataParam.push(reportName);
    	return _dataParam;
    };
    function getMultiOpt(){
    	$('#MutilNotice').hide();
    	closeFn();
    	if($('#SingleNameHidden').val()){
			closeFn();
			var _idx = $('.analysisTab li.selected').attr('index');
	    	eval(_idx+'()');
		}else{
			getAllData();
			top5Trend(top5Index);
		} 
    }
    function resetDate(){
    		$('#MutilNotice').hide();
			if($('#SingleNameHidden').val() && !IsAll()){
					$('#MutilNotice').fadeIn();
		    	//setTimeout(function(){$('#MutilNotice').fadeOut(3000)},1000);
				}else{
					$('#MutilNotice').fadeOut();
				}
			var _mu = getVCDZ();
			var _yesterday = date2Str(getPastDate(_date, 1));
			var thisDate = $('#FixedDate').val();
			var _startDate = thisDate.split(' 至')[0];
			var _endDate = thisDate.split(' 至 ')[1];
				_endDate = (_endDate.split('-')[0] == 2012 && _endDate.split('-')[1] < 10) ? _yesterday : _endDate;
			if($('#DateList .selected').find('a').attr('dateinterval') == 'all'){
				var _tempDate = '2012-05-01';
				$('#DateCalendar').html('<input type="text" onkeydown="return false;" id="Calendar" class="calendar"><input type="hidden" id="FixedDate"/>');
				if(_mu == 'VC' || _mu == 'VCD'){
					 _tempDate = '2012-10-02';
				}else if(_mu == 'VD' || _mu == 'CD'){
					 _tempDate = '2012-05-01';
				}
				$('#Calendar').val(_tempDate+' 至 ' + _endDate);
				$('#FixedDate').val(_tempDate+' 至 ' + _endDate);
				$("#Calendar").Calendar({
			        single: false,
			        monthSize: 3,
			        showFooter: true,
			        offsetX: -340,
			        disableDate: _tempDate+'||'+_yesterday,
			        currentDate: getPastDate(_date, 1),
			        applyCallback: function () {
						if($('#ReportHelp').length > 0){
			    			$('#DateList .iconSelect').css('left', 880);
			    		}else{
			    			$('#DateList .iconSelect').css('left', 985);
			    		}
			            $("#FixedDate").val($("#Calendar").val());
			            $("#DateList dd").removeClass("selected");
			            getMultiOpt();
			        }
			    });
				
			}
	}
		//用户行为
    function ActionCont(){
    	$('#userLossLineBtn').hide();
    	dateReload();
    	var idx = $('#ActionCont .tabLine .active').attr('idx');
    	switch(idx){
    		case '0': userLossLine();userLossDataGrid();break;
    		case '1': lossUserLine();lossUserDataGrid();break;
    		case '2': lossUserLine();lossUserDataGrid();break;
    		case '3': userFrequencyDataGrid();break;
    		case '4': userDurationDataGrid();break;
    		default:return;
    	}
    }
    //用户来源
    function CharacterCont(){
    	getOldDate();
    	$('#poistionBtnOpt').hide();
    	deviceModelArr = [];
    	getDataGridCharacter();
    }
   //---------------------------------------------------------------------------数据趋势------------------------
  //数据趋势-曲线
    function DeepCont(){
    	closeFn();
    	getOldDate();
    	$('#DeepCont .lineChartBox').show();
    	var name = $('#SingleNameHidden').val();
    	$('#DeepCont .tabLine .single').hide();
    	if(IsAll()){
    		$('#DeepCont .tabLine .single').show();
    	}else{
    		$('#DeepCont .tabLine .single').hide();
    		if(thisIndexSingle == 5 || thisIndexSingle == 6 || thisIndexSingle == 7){
				thisIndexSingle = 0;
				$('#DeepCont .tabLine li').removeClass('active');
				$('#DeepCont .tabLine li').eq(0).addClass('active');
			}
    	}
    	$('#LineChartsDeep').show().html('<div class="loading"></div>');
    	var dataX = [], series = []; 
    	var _data = getAjaxParam();
    	if(_data[0].model){
    		var _mulit = _data[0].model.split('day')[1];
    		if($('#DateList .selected').find('a').attr('dateinterval') == '7'){
    			_data[0].model = '7day'+ _mulit;
    		}else if($('#DateList .selected').find('a').attr('dateinterval') == 'all'){
    			_data[0].model = 'allday'+ _mulit;
    		}else {
    			_data[0].model = '';
    		}
    	}
    	if(IsAll()){
    		$.extend(_data[0], {'appVersion': 'appVersion='+name, 'norm': singleDim[thisIndexSingle]});
    		if($('#DateList .selected').find('a').attr('dateinterval') == '7'){    			
    			_data[0].norm = singleDimSeven[thisIndexSingle];
    		}
    	}else{
    		name = name != 'Other' ? replaceLast(name):'Other';
    		$.extend(_data[0], {'appVersion': 'appVersion='+name, 'norm': multiDim[thisIndexSingle]});
    	}
    	var index = $('#DeepCont .tabLine .checked').attr('index');
    	var isNextOpt = index == 8 || index == 9 || index == 10;
    	var _toolTipSuffix = index == 11 ? '%' : '';
    	$('#LineChartsDeep').html('<div class="loading"></div>');
    	$.ajax({
    		url: projectName+"/appVersionDimensionAction.do?method=getNormTrend&reportName="+_data[1],
    		data: _data[0],
    		dataType : 'json',
    		success: function(data){
    			if(!data){return;}
    			var dataY = [];
    			dataX = [];
    			series = [];
    			
    			for(var j = 0; j < data.length; j++){
    				dataX.push(data[j].date.trim());
    				if(isNextOpt){
    					dataY.push(parseFloat((data[j].num/100).toFixed(2)));
    				}else{
    					dataY.push(parseFloat(data[j].num));
    				}
    			}
    			var _yMin = dataY[0];
    			for(var i=0;i<dataY.length;i++){
    				if(dataY[i]<_yMin){
    					_yMin = dataY[i];
    					
    					}
    				}
    				_yMin = _yMin*0.95;
    			var enabled = dataY.length < 200 ? true : false;
    			series.push({
    				name: name,
    				data: dataY,
    				marker: {
    					enabled: enabled,
    					states: {
    						hover: {
    							enabled: true,
    							radius: 4
    						}
    					}
    				}
    			});
    			
    			if(series.length == 0){
    				$("#LineChartsDeep").html('');
    				return;
    			}  
    			var _title = '';
    			if($('#DeepCont .tabLine .active').length>0){
    				_title = $('#DeepCont .tabLine .active').find('a').html()
    			}else{
    				_title = $('#DeepCont .tabLine .checked').find('span').html();
    			}
    			
    			$('#LineChartsDeep').html('');
    			$('#LineChartsDeep').createLineChart({
    				dataX: dataX,
    				seriesData: series,
    				normName: _title,
    				height: 400,
    				marginLeft: 80,
    				yAxis: {
	            title: {
	                text: _title
	            },
	            min: _yMin,
							showFirstLabel: true,
							gridLineColor: '#E4ECEF',
							gridLineDashStyle: 'dash',
							labels: {
								style: {
									color: '#999',
									fontSize: '11px'
								}
							}
    				},
    				toolTipSuffix: _toolTipSuffix
    			});
    		}
    	});
    	getDeepContData(_data[0],_data[1]);
    }
    function getDeepContData(param,_reportName){
    	var columns = [
      		         	{field: 'date', title: '时间', width: 70,  align: 'left', formatter: function(row){
      		         	return row.date;
      		         	}
      		         	},
      		         	{field: 'newUserNum', title: '新用户', width: 70, align: 'left', formatter: function(row){
      							return formatNum(row.newUserNum);
      						}
      					}
      					
      				];
      	
   	   	if(IsAll()){
   	   		columns.push(
   	   						{field: 'updateUser', title: '升级用户', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.updateUser);
      							}
      						},
      						{field: 'extantUser', title: '现存用户', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.extantUser);
      							}
      						},
      						{field: 'firstVerUser', title: '首次版本新用户', width: 100,  align:'left', formatter:function(row){
      							return formatNum(row.firstVerUser);
      							}
      						}	
   	   					);
   	   	}
      	
   	   	columns.push(
   	   					{field: 'accumUserNum', title: '累计用户', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.accumUserNum);
      							}
      					},
      					{field: 'startUserNum', title: '启动用户', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.startUserNum);
      							}
      					},
      					{field: 'startTimeNum', title: '启动次数', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.startTimeNum);
      							}
      					},
      					{field: 'pv', title: '浏览量', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.pv);
      							}
      					},
      					{field: 'userPerPv', title: '单次用户PV', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.userPerPv);
      							}
      					},
      					{field: 'startPerPv', title: '单次启动PV', width: 82,  align:'left', formatter:function(row){
      							return formatNum(row.startPerPv);
      							}
      					},
      					{field: 'userPerTimes', title: '单用户启动次数', width: 100,  align:'left', formatter:function(row){
      							return formatNum(row.userPerTimes);
      							}
      					},
      					{field: 'userPerNew', title: '启动新用户占比', width: 100,  align:'left', formatter:function(row){
      							return row.userPerNew+'%';
      							}
      					}
   	   				);
    	$('#LineChartsDeepDataGrid').Datagrid({
    		url: projectName+'/appVersionDimensionAction.do?method=getTrendGridJsonData&reportName='+_reportName, 
    		dataParam: param,
    		conDivAuto: true,
    		dgAutoHeight: true,
    		height: 500,
    		heightAdjust: true,
    		dgAutoHeight: false,
    		hasFirstCol: true,
    		columns:columns ,
    		ajaxCallback: function(data){
	    		if(!data || data.length == 0){
	        		$('#ActionDataGrid').height(300).html('<div class="noDataAlert">没有相关数据!</div>');
	        	}
    			
    		}
    	});
    }
    //数据趋势-对比
    function getLinechartDataCompare(){
    	$('#LineChartsDeep').html('<div class="loading"></div>');
    	$('#SDAC').hide();
    	var _data = getAjaxParam();
    	var param = {};
    	param = $.extend('',_data[0],param);
    	var appVersion = $('#SingleNameHidden').val();
		appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		param.appVersion = 'appVersion='+appVersion;
		var _multi = getVCDZ();		
		_tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_VERSION_ETL';
		if(_multi.length == 1){
			if(_multi == 'C'){
				_tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_CHANNEL_ETL';
			}else if(_multi == 'D'){
				_tableName = 'REPORT_INTRO_MULTI_SINGLE_BY_MODEL_ETL';
			}else if(_multi == 'Z'){
				_tableName = 'REPORT_INTRO_MULTI_Z_ETL';
			}
		}else if(_multi.length > 1){
			_tableName = 'REPORT_INTRO_MULTI_'+ _multi +'_ETL';
		}
		$.extend(param,{'tableName': _tableName});
    	var _originDate = $('#TrendCompareCalendar .originDate').val();
    	var _originDateArr = _originDate.split(' 至 ');
    	
    	var _compareDate = $('#TrendCompareCalendar .compareDate').val();
    	var _isCompare = _compareDate == '' ? false : true;
    	
    	$.extend(param, {'ak': appKey, 'sd': 'sd='+_originDateArr[0], 'ed': 'ed='+_originDateArr[1]});
    	
    	var time = _originDateArr[0] + ',' + _originDateArr[1];
    	
    	if(_isCompare){
    		var _compareDateArr = _compareDate.split(' 至 ');
    		
    		time = time + ',' + _compareDateArr[0] + ',' + _compareDateArr[1];
    		$.extend(param, {'ak': appKey, 'csd': 'csd='+_compareDateArr[0], 'ced': 'ced='+_compareDateArr[1]});
    	}
    	
    	var _norm1 = $('#Norm1').val();
    	var _norm2 = $('#Norm2').val();
    	
    	var _normStr;
    	if(_norm1 != 0 && _norm2 != 0 && _norm1 != _norm2){
    		_normStr = _norm1 + ',' + _norm2;
    	}else{
    		_normStr = _norm1 != 0 ? _norm1 : _norm2;
    	}
    	
    	$.extend(param, {'norms': _normStr, 'time': time});
    	
   // 	var _toolTipSuffix = norm == '10' ? '%' : '%';
   var _toolTipSuffix = '';
    	$.ajax({
    		url: projectName+'/productUserVisitOverviewMultiAction.do?method=getNormCompareOrDateCompare&reportName=productUserVisitOverviewMulti',
    		data: param,
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
    			
    			$('#LineChartsDeep').createLineChartCompare({
    				type: 'spline',
    				dataX: _date,
    				yAxis: _yAxis,
    				seriesData: series,
    				height: 400,
    				marginBottom: 100,
    				marginLeft: 80,
    				marginRight: 80
//    				,toolTipSuffix: _toolTipSuffix
    			});
    			
    			return;
    		}
    	});
    }

    //------------------------------------------------------------------------------用户行为--------------------
    //用户行为--30天，90天流失曲线
	function lossUserLine(){	
		$('#LineCharts').html('<div class="loading"></div>');	
		$('.rzyBtn').hide();
    	$('.lineChartBox').show();
    	var _data = getAjaxParam();
    	var unit = $('#ActionCont .active').attr('idx') == '1' ? 'month':'threeMonth';
    	var param = {'unit':unit};
    	param = $.extend('',_data[0],param);
    	var appVersion = $('#SingleNameHidden').val();
		  appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		  param.appVersion = 'appVersion='+appVersion;
    	$.ajax({
    		url: projectName+'/appVersionDimensionAction.do?method=lastVersionNormTrend&reportName=appVersionDimensionDataNew',
    		dataType: 'json',
    		data: param,
    		success: function(data){
    			if(!data){return;}
    			if(data.length<1){
    				$('#LineCharts').html('');
    				return;
    			}    		
    			var dataX = [] ,dataY = [];
    		  for(var i=0;i<data.length;i++){
    		  	   dataX.push(data[i].date);
    		  	   dataY.push(data[i].num);
    		  	}
    		  	var ne = '';
    		  	if(	unit == 'month'){ne = '30天流失率'}else{ne = '90天流失率'}
    		  var series = [{'name':ne,'data':dataY}];
    		  var legendBox = {	enabled: false};
    		  $('#LineCharts').createLineChart({
							dataX: dataX,
							seriesData: series,
						//	colors: ['#AA4643','#92C2F3'],
							height: 400,
							toolTipSuffix:'%',
						//	legend:legendBox
						});
    		}
    	});
	}
	 //用户行为--30天，90天流失明细
	function lossUserDataGrid(){	
		$('.rzyBtn').hide();
    	$('.lineChartBox').show();
    	var _data = getAjaxParam();
    	var unit = $('#ActionCont .active').attr('idx') == '1' ? 'month':'threeMonth';
    	var param = {'unit':unit};
    	param = $.extend('',_data[0],param);
    	var appVersion = $('#SingleNameHidden').val();
		  appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		  param.appVersion = 'appVersion='+appVersion;		 
    	$('#ActionDataGrid').Datagrid({
    		url: projectName+"/appVersionDimensionAction.do?method=lastVersionGrid&reportName=appVersionDimensionDataNew",
    		height: 350,
    		dataParam: param,
    		dgAutoHeight:false,
    		hasFirstCol: false,
    		columns: [
    		         	{field: 'date', title: '日期', width: 25, sortable: true, align: 'center'},
    					{field: 'lossRate', title: '流失率<span>（流失用户/累计用户）</span>', sortable: true, width: 40, align: 'center', formatter: function(row){
    							return row.lossRate + '%';
    						}
    					},
    					{field: 'newLossUser', title: '新增流失用户', sortable: true, width: 40, align: 'center', formatter: function(row){
    							return formatNum(row.newLossUser);
    						}
    					},
    					{field: 'newUserRiseRate', title: '用户净增长率<span>（（新用户-新增流失用户）/新用户）</span>', sortable: true, width: 60, align: 'center', formatter: function(row){
    							return row.newUserRiseRate + '%';
    						}
    					}
    				],
            sortType: 'ajax',
            sortRule: 'desc',
            sortOrderBy: 'date',
            ajaxCallback: function(data){
            	$('#ActionDataGrid').css('padding-left','0');
            	if(data.rows.length == 0){
            		$('#ActionDataGrid').height(300).html('<div class="noDataAlert">没有相关数据!</div>');
            	}
            }
    	}); 
	}
	  //用户行为--使用频率
    function userFrequencyDataGrid(){
    	$('.rzyBtn').hide();
    	$('.lineChartBox').hide();
    	$('.userFrequency').show();
    	getTwoDaysInterval($('.userFrequency'));
    	var _data = getAjaxParam();
    	var reportName = 'appFrequencyDataMulti';
    	var sqlMethod = $('.userFrequency .btnPrimary').attr('index');
    	var _method = sqlMethod == 'Day' ? 'DAY' : sqlMethod == 'Week' ? 'WEEK' : 'MONTH';
    	var startDate = _data[0].startDate.split('=')[1], endDate = _data[0].endDate.split('=')[1];
    	var param = {'appKey':_data[0].appKey.split('=')[1]};
    	if(sqlMethod == 'Day'){
    		param = $.extend(param,{'startDate':startDate,'endDate':endDate});
    	}else if(sqlMethod == 'Week'){
    		startDate = getDateWeek(startDate);
    		endDate = getDateWeek(endDate);
    		param = $.extend(param,{'startWeek':startDate,'endWeek':endDate});
    	}else if(sqlMethod == 'Month'){
    		startDate = getDateMonth(startDate);
    		endDate = getDateMonth(endDate);
    		param = $.extend(param,{'startMonth':startDate,'endMonth':endDate});
    	}
    	param = $.extend(_data[0],param);
    	$.extend('',param,_data[0]);
    	
    	if(IsAll()){
    			param.model ='V';
    	}
    	var appVersion = $('#SingleNameHidden').val();
			appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
			param.appVersion = 'appVersion='+appVersion;
		if(sqlMethod == 'Day' || sqlMethod == 'Week' || sqlMethod == 'Month'){
			if(sqlMethod != 'Day'){
				var _param = {};
				for(var k in param){
					if(k != 'startDate' && k != 'endDate'){
						_param[k] = param[k]
					}
				}
				param = _param;
			}
			if(param.appChannel){param.appChannel = param.appChannel.split('=')[1];}
			if(param.appVersion){param.appVersion = param.appVersion.split('=')[1]}
			if(param.appModel){param.appModel = param.appModel.split('=')[1]}
			if(param.appReg){param.appReg = param.appReg.split('=')[1]}
		}	
			
		var _maxPer = 0,perArr = [];
    	$('#ActionDataGrid').Datagrid({
    		url: projectName+'/appFrequencyImpalaAction.do?method=getAppFrequencyBy'+sqlMethod+'&reportName=appFrequencyDataMulti',
    		hasFirstCol: false,
    		dataParam: param,
    		columns: [
    		         	{field: 'startFrequency', title: '频次', width: 40, align: 'left', formatter:function(row){
    			         		return '<b>'+row.startFrequency+'</b>'
    			         	}
    		         	},
    		         	{field: 'startTimes', title: '启动次数', width: 80, align: 'left', formatter:function(row){
    			         		return formatNum(row.startTimes);
    			         	}
    		         	},
    					{field: 'pageViews', title: '浏览量', width: 80, align:'left', formatter:function(row){
    			         		return formatNum(row.pageViews);
    			         	}
    		         	},
    					{field: 'startUserRate', title: '用户比例', width: 80, align: 'left',formatter:function(row){
    		         		return row.startUserRate+'%'
    		         	}
    		         	},
    					{field: 'startTimesRate', title: '占总数的百分比<br/><span class="inlineBlock" style="width:13px; height:13px; vertical-align:middle; background:#058DC7"></span> <font style="font-weight:normal">启动次数 </font><span class="inlineBlock" style="width:13px; height:13px; vertical-align:middle; background:#AADFF3"></span> <font style="font-weight:normal">浏览量</font>', width: 300, align: 'left', formatter:function(row){   
    							var startTimesRate = parseFloat(row.startTimesRate.split('%')[0]);
    							var pageViewsRate = parseFloat(row.pageViewsRate.split('%')[0]);
    							var _temp = 0;
    							if(startTimesRate > pageViewsRate){
    								_temp = startTimesRate
    								}else{
    									_temp = pageViewsRate;
    								}
    							if(_temp > _maxPer){
    								_maxPer = _temp;
    								}	
    								perArr.push(startTimesRate);
    								perArr.push(pageViewsRate);
    							return '<span style="float:left; width:55px; text-align:right; line-height:16px; font-size:11px;" class="valPer">'+row.startTimesRate+'%</span><span style="display:block; margin-left:60px"><span class="inlineBlock" style="vertical-align:middle; width:'+row.startTimesRate+'%; height:16px; background:#058DC7"></span></span>'
    								  +'<span style="clear:both; float:left; width:55px; text-align:right; line-height:16px; font-size:11px;" class="valPer">'+row.pageViewsRate+'%</span><span style="display:block; margin-left:60px"> <span class="inlineBlock" style="vertical-align:middle; width:'+row.pageViewsRate+'%; height:16px; background:#AADFF3"></span></span>';
    						}
    					}
    				],
			showFooter: false,
			conDivAuto: true,	
			height:550,
			dgAutoHeight: false,
			dgResize: false,
			dgHeaderHeight: 50,
    		ajaxCallback: function(data){
    			$('#ActionDataGrid').css('padding-left','0');
    			if(data.rows.length == 0){
    				$('#ActionDataGrid').height(300).html('<div class="noDataAlert">没有相关数据!</div>');
          }else{
          	var prop = 0;
          	if(_maxPer){prop = 100/_maxPer}
          	$('.dgContentTable tbody .inlineBlock').each(function(i){
          		  $(this).width(prop*perArr[i]+'%');
          		});
          }
    			
    		}
    	});
    }
  //用户行为--使用时长
    function userDurationDataGrid(){
    	$('.rzyBtn').hide();
    	$('.lineChartBox').hide();
    	$('.userDuration').show();
    	getTwoDaysInterval($('.userDuration'));
    	var _data = getAjaxParam();
    	var sqlMethod = $('.userDuration .btnPrimary').attr('index');
    	var startDate = _data[0].startDate.split('=')[1], endDate = _data[0].endDate.split('=')[1];
    	var param = {'appKey':_data[0].appKey.split('=')[1]};
    	if(sqlMethod == 'Single' || sqlMethod == 'Day'){
    		param = $.extend(param,{'startDate':startDate,'endDate':endDate});
    	}else if(sqlMethod == 'Week'){
    		startDate = getDateWeek(startDate);
    		endDate = getDateWeek(endDate);
    		param = $.extend(param,{'startWeek':startDate,'endWeek':endDate});
    	}else if(sqlMethod == 'Month'){
    		startDate = getDateMonth(startDate);
    		endDate = getDateMonth(endDate);
    		param = $.extend(param,{'startMonth':startDate,'endMonth':endDate});
    	}
    	param = $.extend(_data[0],param);
    	$.extend('',param,_data[0]);
    	reportName = 'appDurationDataMulti';
    	if(IsAll()){
    			param.model ='V';
    	}
    	var appVersion = $('#SingleNameHidden').val();
		appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		param.appVersion = 'appVersion='+appVersion;
		if(sqlMethod == 'Single' || sqlMethod == 'Day' || sqlMethod == 'Week' || sqlMethod == 'Month'){
			if(sqlMethod != 'Single' && sqlMethod != 'Day'){
				var _param = {};
				for(var k in param){
					if(k != 'startDate' && k != 'endDate'){
						_param[k] = param[k]
					}
				}
				param = _param;
			}
			if(param.appChannel){param.appChannel = param.appChannel.split('=')[1];}
			if(param.appVersion){param.appVersion = param.appVersion.split('=')[1]}
			if(param.appModel){param.appModel = param.appModel.split('=')[1]}
			if(param.appReg){param.appReg = param.appReg.split('=')[1]}
		}	
    	if(sqlMethod == 'Single'){
    		var columns = [
    			        {field: 'durationClass', title: '时长', width: 40, align: 'left', formatter:function(row){
    			         		return '<b>'+row.durationClass+'</b>'
    			         	}
    		         	},
    		         	{field: 'startTimes', title: '启动次数', width: 80, align: 'left', formatter:function(row){
    			         		return formatNum(row.startTimes)
    			         	}
    		         	},
    					{field: 'pageViews', title: '浏览量', width: 80, align:'left', formatter:function(row){
    			         		return formatNum(row.pageViews)
    			         	}
    		         	},
    					{field: 'startTimesRate', title: '占总数的百分比<br/><span class="inlineBlock" style="width:13px; height:13px; vertical-align:middle; background:#058DC7"></span> <font style="font-weight:normal">启动次数 </font><span class="inlineBlock" style="width:13px; height:13px; vertical-align:middle; background:#AADFF3"></span> <font style="font-weight:normal">浏览量</font>', width: 300, align: 'left', formatter:function(row){   
    							var startTimesRate = parseFloat(row.startTimesRate.split('%')[0]);
    							var pageViewsRate = parseFloat(row.pageViewsRate.split('%')[0]);
    							var _temp = 0;
    							if(startTimesRate > pageViewsRate){
    								_temp = startTimesRate
    								}else{
    									_temp = pageViewsRate;
    								}
    							if(_temp > _maxPer){
    								_maxPer = _temp;
    								}	
    								perArr.push(startTimesRate);
    								perArr.push(pageViewsRate);
    							return '<span style="float:left; width:55px; text-align:right; line-height:16px; font-size:11px;">'+row.startTimesRate+'%</span><span style="display:block; margin-left:60px"><span class="inlineBlock" style="vertical-align:middle; width:'+row.startTimesRate+'%; height:16px; background:#058DC7"></span></span>'
    								  +'<span style="clear:both; float:left; width:55px; text-align:right; line-height:16px; font-size:11px;">'+row.pageViewsRate+'%</span><span style="display:block; margin-left:60px"> <span class="inlineBlock" style="vertical-align:middle; width:'+row.pageViewsRate+'%; height:16px; background:#AADFF3"></span></span>';
    						}
    					}
    				];
    	}else{
    		var columns = [
    				        {field: 'durationClass', title: '时长', width: 40, align: 'left', formatter:function(row){
    				         		return '<b>'+row.durationClass+'</b>'
    				         	}
    			         	},
    			         	{field: 'startTimes', title: '启动次数', width: 80, align: 'left', formatter:function(row){
    				         		return formatNum(row.startTimes)
    				         	}
    			         	},
    						{field: 'pageViews', title: '浏览量', width: 80, align:'left', formatter:function(row){
    				         		return formatNum(row.pageViews)
    				         	}
    			         	},
    						{field: 'startUserRate', title: '用户比例', width: 80, align: 'left', formatter:function(row){
    			         		return row.startUserRate+'%';
    						}},
    						{field: 'startTimesRate', title: '占总数的百分比<br/><span class="inlineBlock" style="width:13px; height:13px; vertical-align:middle; background:#058DC7"></span> <font style="font-weight:normal">启动次数 </font><span class="inlineBlock" style="width:13px; height:13px; vertical-align:middle; background:#AADFF3"></span> <font style="font-weight:normal">浏览量</font>', width: 300, align: 'left', formatter:function(row){   
    								var startTimesRate = parseFloat(row.startTimesRate.split('%')[0]);
    							var pageViewsRate = parseFloat(row.pageViewsRate.split('%')[0]);
    							var _temp = 0;
    							if(startTimesRate > pageViewsRate){
    								_temp = startTimesRate
    								}else{
    									_temp = pageViewsRate;
    								}
    							if(_temp > _maxPer){
    								_maxPer = _temp;
    								}	
    								perArr.push(startTimesRate);
    								perArr.push(pageViewsRate);
    								return '<span style="float:left; width:55px; text-align:right; line-height:16px; font-size:11px;">'+row.startTimesRate+'%</span><span style="display:block; margin-left:60px"><span class="inlineBlock" style="vertical-align:middle; width:'+row.startTimesRate+'%; height:16px; background:#058DC7"></span></span>'
    									  +'<span style="clear:both; float:left; width:55px; text-align:right; line-height:16px; font-size:11px;">'+row.pageViewsRate+'%</span><span style="display:block; margin-left:60px"> <span class="inlineBlock" style="vertical-align:middle; width:'+row.pageViewsRate+'%; height:16px; background:#AADFF3"></span></span>';
    							}
    						}
    					];
    	}
    	var _maxPer = 0,perArr = [];
    	$('#ActionDataGrid').Datagrid({
    		url: projectName+'/appDurationImpalaAction.do?method=getAppDurationBy'+sqlMethod+'&reportName=appDurationDataMulti',
    		hasFirstCol: false,
    		dataParam: param,
    		columns: columns,
    		showFooter: false,
    		conDivAuto: true,	//自动行高
    		height:550,
    		dgAutoHeight: false,
    		dgResize: false,
    		dgHeaderHeight: 50,
    		ajaxCallback: function(data){
	    		$('#ActionDataGrid').css('padding-left','0');
	    		if(data.rows.length == 0){
	        		$('#ActionDataGrid').height(300).html('<div class="noDataAlert">没有相关数据!</div>');
	        	}else{
          	var prop = 0;
          	if(_maxPer){prop = 100/_maxPer}
          	$('.dgContentTable tbody .inlineBlock').each(function(i){
          		  $(this).width(prop*perArr[i]+'%');
          		});
          }
    		}
    	});
    }
    //用户行为--用户留存曲线
    function userLossLine(){
    	$('#LineCharts').html('<div class="loading"></div>');
    	$('.rzyBtn').hide();
    	$('#userLossLineBtn').show();
    	getTwoDaysInterval($('#userLossLineBtn'));  
    	$('.userLossBtn').show();  
    	getTwoDaysInterval($('.userLossBtn'));   	
    	var getMethod = $('#userLossLineBtn .btnPrimary').attr('index') == 'Week' ? 'Week':'Month';  
    	var _data = getAjaxParam(),_ne = '';
    	var reportName = 'multiRetentionUser', methodName;
    	var sqlMethod = $('#userLossLineBtn .btnPrimary').attr('index');
    	var _method = sqlMethod == 'Day' ? 'DAY' : sqlMethod == 'Week' ? 'WEEK' : 'MONTH';
    	var startDate = _data[0].startDate.split('=')[1], endDate = _data[0].endDate.split('=')[1];
    	if(sqlMethod == 'Week'){
    		startDate = getDateWeek(startDate);
    		endDate = getDateWeek(endDate);
    		_ne = '周留存';
    	}else if(sqlMethod == 'Month'){
    		startDate = getDateMonth(startDate);
    		endDate = getDateMonth(endDate);
    		_ne = '月留存';
    	}
    	var param = {'startDate': 'startDate=' + startDate, 'endDate': 'endDate=' + endDate};
    	param = $.extend('',_data[0],param);
		methodName = 'getMulti' + getMethod + 'NormTrend';
		var vcdz = getVCDZ();
		var rTableName = 'MULTI_' + _method + '_RETENTION_' +vcdz + '_ETL';
    	var nTableName = 'MULTI_' + _method + '_NEW_USER_NUM_' + vcdz;
    	$.extend(param, {'rTable': rTableName, 'nTable': nTableName});
    	var appVersion = $('#SingleNameHidden').val();
		appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		param.appVersion = 'appVersion='+appVersion;
    	$.ajax({
    		url: projectName+'/multiRetentionUserAction.do?method='+methodName+'&reportName=multiRetentionUser',
    		dataType: 'json',
    		data: param,
    		success: function(data){
    			$('#LineCharts .loading').remove();
    			if(!data || data.length ==0){
    				$('#LineCharts').height(300).html('<div class="noDataAlert">没有相关数据!</div>');          
    				return;
    			}
    			if(data.length==0){
    				$('#LineCharts').html('');
    				return;
    			}
    			var _dataX = [],_dataY = [];
    			for(var i=0;i<data.length;i++){
    				_dataX.push(data[i].date);
    				_dataY.push(data[i].num);		
    			}
    			var series = [{name:_ne,data:_dataY}];
    			var legendBox = {enabled: false};
        	$('#LineCharts').createLineChart({
    				type:'spline',
    				dataX: _dataX,
    				seriesData: series,
    				height: 360,
    				toolTipSuffix:'%',
    				legend:legendBox
    			});
    		}
    	});
    }
    //用户行为--用户留存表格
    function userLossDataGrid(){
    	$('.rzyBtn').hide();
    	$('.userLossBtn').show();
    	$('.lineChartBox').show();
    	var _data = getAjaxParam();
    	var reportName, methodName;
    	var sqlMethod = $('.userLossBtn .btnPrimary').attr('index');
    	var _method = sqlMethod == 'Day' ? 'DAY' : sqlMethod == 'Week' ? 'WEEK' : 'MONTH';
    	var startDate = _data[0].startDate.split('=')[1], endDate = _data[0].endDate.split('=')[1];
    	if(sqlMethod == 'Week'){
    		startDate = getDateWeek(startDate);
    		endDate = getDateWeek(endDate);
    	}else if(sqlMethod == 'Month'){
    		startDate = getDateMonth(startDate);
    		endDate = getDateMonth(endDate);
    	}
    	var param = {'startDate': 'startDate=' + startDate, 'endDate': 'endDate=' + endDate};
    	param = $.extend('',_data[0],param);
		actionName = 'multiRetentionUserAction';
		reportName = 'multiRetentionUser';
		methodName = 'getMulti' + sqlMethod + 'RetentionUser';
		var vcdz = getVCDZ();
		var rTableName = 'MULTI_' + _method + '_RETENTION_' +vcdz + '_ETL';
    	var nTableName = 'MULTI_' + _method + '_NEW_USER_NUM_' + vcdz;
    	$.extend(param, {'rTable': rTableName, 'nTable': nTableName});
		var appVersion = $('#SingleNameHidden').val();
		appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		param.appVersion = 'appVersion='+appVersion;
		var dd = 'date';
		if(getVCDZ().length > 2){
			reportName = 'dimenssionDataNew_impala';
			methodName = 'getMulti' + sqlMethod + 'RetentionUser_impala';
			var equalSymbol = {'appKey':1,'startDate':1,'endDate':1,'appVersion':1,'appModel':1,'appChannel':1,'appReg':1};
			for(var k in param){
				if(equalSymbol[k]){
					var equal = k.length+1;
					param[k] = param[k].substring(equal);
				}
			}
			dd = 'p_date';
		}
    	if(sqlMethod == 'Week'){
    		var columns = [
   			         	{field: 'peroidDate', title: '时间', width: 100, align: 'left'},
   			         	{field: 'newUserNum', title: '新用户', width: 40, align: 'left', formatter:function(row){
   								return formatNum(row.newUserNum);
   							}
   						},
   						{field: 'week_1', title: '1周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_1);
   							}
   						},
   						{field: 'week_2', title: '2周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_2);
   							}
   						},
   						{field: 'week_3', title: '3周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_3);
   							}
   						},
   						{field: 'week_4', title: '4周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_4);
   							}
   						},
   						{field: 'week_5', title: '5周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_5);
   							}
   						},
   						{field: 'week_6', title: '6周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_6);
   							}
   						},
   						{field: 'week_7', title: '7周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_7);
   							}
   						},
   						{field: 'week_8', title: '8周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_8);
   							}
   						},
   						{field: 'week_9', title: '9周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_9);
   							}
   						},
   						{field: 'week_10', title: '10周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_10);
   							}
   						},
   						{field: 'week_11', title: '11周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_11);
   							}
   						},
   						{field: 'week_12', title: '12周后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.week_12);
   							}
   						}
   					];
    	}else if(sqlMethod == 'Month'){
      		var columns = [
   			         	{field: 'peroidDate', title: '时间', width: 100, align: 'left'},
   			         	{field: 'newUserNum', title: '新用户', width: 40, align: 'left', formatter:function(row){
   								return formatNum(row.newUserNum);
   							}
   						},
   						{field: 'month_1', title: '1个月后', width: 40, align:'left', formatter: function(row){
   								return getVal(row.month_1);
   							}
   						},
   						{field: 'month_2', title: '2个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_2);
   							}
   						},
   						{field: 'month_3', title: '3个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_3);
   							}
   						},
   						{field: 'month_4', title: '4个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_4);
   							}
   						},
   						{field: 'month_5', title: '5个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_5);
   							}
   						},
   						{field: 'month_6', title: '6个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_6);
   							}
   						},
   						{field: 'month_7', title: '7个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_7);
   							}
   						},
   						{field: 'month_8', title: '8个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_8);
   							}
   						},
   						{field: 'month_9', title: '9个月后', width: 40, align:'left', formatter: function(row){
   							return getVal(row.month_9);
   							}
   						},
   						{field: 'month_10', title: '10个月后', width: 50, align:'left', formatter: function(row){
   							return getVal(row.month_10);
   							}
   						},
   						{field: 'month_11', title: '11个月后', width: 50, align:'left', formatter: function(row){
   							return getVal(row.month_11);
   							}
   						},
   						{field: 'month_12', title: '12个月后', width: 50, align:'left', formatter: function(row){
   							return getVal(row.month_12);
   							}
   						}
   					];
    	}else{
    		var columns = [
    			         	{field: dd, title: '时间', width: 30, align: 'left'},
    			         	{field: 'newUserNum', title: '新用户', width: 50, align: 'left', formatter:function(row){
    								return formatNum(row.newUserNum);
    							}
    						}, 
    						{field: 'day_1', title: '次日留存', width: 50, align:'left', formatter: function(row){
    							return getVal(row.day_1);
    							}
    						},
    						{field: 'day_7', title: '7日后留存', width: 50, align:'left', formatter: function(row){
    							return getVal(row.day_7);
    							}
    						},
    						{field: 'day_30', title: '30日后留存', width: 50, align:'left', formatter: function(row){
    							return getVal(row.day_30);
    							}
    						}
    					];
    	}
    	if($('#AppRegOpt .fixedText').html() != '所有'){
    		$.extend(_data[0], {'regDimension': 1});
    	}
    	$('#ActionDataGrid').Datagrid({
    		url: projectName+'/'+actionName+'.do?method='+methodName+'&reportName='+reportName,
    		hasFirstCol: true,
    		dataParam: param,
    		columns: columns,
    		showFooter: false,
    		conDivAuto: true,	
    		height:350,
    		dgAutoHeight: false,
    		dgResize: false,
    		ajaxCallback: function(data){
	    		if(!data || data.rows.length == 0){
	        		$('#ActionDataGrid').height(300).html('<div class="noDataAlert">没有相关数据!</div>');
	        	}
    			var tableTr = $('#ActionDataGrid .dgContentTable tr');
    			tableTr.each(function(i, v){
    				var thisTd = $(this).find('td');
    				thisTd.each(function(i,v){
    					if(i > 1){
    						var divHtml = $(this).find('div').html();
    						divHtml = divHtml.substring(0,3);
    						if(divHtml > 20){
    							$(this).css('background-color', '#C9D8EC')
    						}else if(divHtml > 0 && divHtml < 20){
    							$(this).css('background-color', '#EBF1F8')
    						}
    					}
    				})
    			});
    		}
    	});
    }
    //-------------------------------------------------------------------------用户来源----------------
    //用户来源-渠道+设备型号
    function getDataGridCharacter(_order,_type){
    	$('#DateGridPie').html('');
    	var _newUvSorttableType = '', _uvSorttableType = '',_startTimesSorttableType = '';
    	var _sortRule = 'desc';
    	if(_type == 'sortableasc'){
    		_sortRule = 'asc';
    	}
    	if(_order == undefined){
    		_order = 'newUv',
    		_newUvSorttableType = 'sortabledesc';
    	}else if(_order == 'newUv'){
    		_newUvSorttableType = _type;
    	}else if(_order == 'uv'){
    		_uvSorttableType = _type;
    	}else if(_order == 'startTimes'){
    		_startTimesSorttableType = _type;
    	}
    	var name = $('#SingleNameHidden').val();
    	var dataX = [], series = []; 
    	var _data = getAjaxParam();
    	if(IsAll()){
    		name = name != 'Other' ? replaceLast(name):'Other';
    		$.extend(_data[0], {'appVersion': 'appVersion='+name});
    	}else{
    		name = name != 'Other' ? replaceLast(name):'Other';
    		_data[0].tableName = 'REPORT_INTRO_MULTI_VCDZ_ETL';
    		$.extend(_data[0], {'appVersion': 'appVersion='+name});
    	}
    	var _idx = $('#CharacterCont .tabLine .active').attr('index');
    	var _method = _idx == 0 ? 'getVersionOfChannelChartSqlId' : 'getVersionOfAppModelChartSqlId';
    	var _normName = _idx == 0 ? '渠道' : '设备型号';
    	
    	var datagridColor = ['#2f7ed8', '#910000', '#8bbc21', '#0d233a', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    	var prop = 0, datagridIndex = 0; 
    	var columns = [
						{field: 'select', title: '<div style="padding-left:5px"><input type="checkbox" id="SelectAll" /></div>', width:40, align: 'left', formatter:function(row){
							datagridIndex++;
							if(datagridIndex == 11){
								datagridIndex = 1;
							}
							return '<div class="tableColor" style="padding-left:5px"><input type="checkbox" value="1" name="model" class="tableSelect" model="' +row.dimValue+'$$$$'+row.asName + '"/><div  class="colorBox" style="background:'+datagridColor[datagridIndex-1]+'"></div></div>';
							}
						},
							{field: 'dimValue', title: '<span style="padding-left:3px">'+_normName+'</span>', width: 100, align: 'left', formatter:function(row){
								
								return '<div class="tableColor" title="'+row.dimValue+'"><span>' + row.dimValue + '</span></div>';
							}
						}
    	               ];
	    	if(_idx == 0){
	    		columns.push({field: 'asName', title: '<div>别名</div>', width: 150, align: 'left'});
	    		}
	    	columns.push(
	    			{field: 'newUv', title: '<div filed="newUv" class="sortable '+_newUvSorttableType+'" >新用户<span style="font-weight:normal">(%)</span></div>', width: 80, align: 'left', formatter: function(row){
						  return '<div><span>'+formatNum(row.newUv)+'</span><br/><font style="color:#999" class="rateVal" val="'+row.newUvRate+'">('+row.newUvRate+'%)</font></div>';
						}
					},
					{field: 'uv', title: '<div filed="uv" class="sortable '+_uvSorttableType+'" >启动用户<span style="font-weight:normal;">(%)</span></div>', width: 100, align: 'left', formatter: function(row){
						  return formatNum(row.uv)+'<br/><font style="color:#999" class="rateVal" val="'+row.uvRate+'">('+row.uvRate+'%)</font>';
						}
					},
					{field: 'startTimes', title: '<div filed="startTimes"  class="sortable '+_startTimesSorttableType+'" >启动次数<span style="font-weight:normal">(%)</span></div>', width: 100, align: 'left', formatter: function(row){
						  return formatNum(row.startTimes)+'<br/><font style="color:#999" class="rateVal" val="'+row.startTimesRate+'">('+row.startTimesRate+'%)</font>';
						}
					},
					{field: 'proportion', title: '<span style="padding-left:10px;">占比</span>', width: 250, align: 'left', formatter: function(row){   		    	
							var value = '&nbsp;'+row.startTimesRate+'%';
       				var thisHtml = '<div class="rateBars" style="float:left; width:100%;"><div style="*float:left;padding:0 20px 0 5px">';
       					thisHtml += '<div class="rateBar" style="width:'+row.startTimesRate+'%; height:16px; background:'+datagridColor[datagridIndex-1]+';">';
       					thisHtml += '</div>';
       					thisHtml += '</div></div>';
       					thisHtml += '<span class="rateBarsPer" style="padding:5px 0 0 5px">'+value+'</span>';
       				return thisHtml;
						}
					}	
	    	);
    	$('#DateGridPie').DatagridContenter({
    		url: projectName+"/appVersionDimensionAction.do?method="+_method+"&reportName="+_data[1],
    		height: 500,
    		pageRowList: [10,20,30,50,100],
    		heightAdjust: false,
    		hasFirstCol: false,
    		dgAutoHeight: false,
    		conDivAuto: true,
    		dataParam: _data[0],
    		beforeAjax: function(){
    			prop = 0;
    		},
    		sortType: 'ajax',
	  		sortRule: _sortRule,
	  		sortOrderBy: _order,
	  		columns:columns,
    		ajaxCallback: function(data){
    			prop = 0;datagridIndex = 0;
    			if(data.rows.length == 0){$('#DateGridPie .dgContentTable tbody').height(465).css('text-align','center').html('<tr width="100%"><td colspan="6"><div class="noDataAlert">没有相关数据!</div></td></tr>');$('#ChannelLineChats').html('<div class="noDataAlert">没有相关数据!</div>');return;}
    			$('#DateGridPie .dgContentTable thead th').last().addClass('rateBarsHead');
    			$('#DateGridPie .rateBarsHead').hide();
    			$('#DateGridPie .rateBars').parent('td').hide();
    			$('#DateGridPie .dgContent').height(465).css('overflow','auto');
    			$('#DateGridPie .dgContentTable').height(465);
			$('#DateGridPie .dgContentTable tbody').height(433);
    			var _chose = 0;
    			var typeArr = {'newUv':0,'uv':1,'startTimes':2}
    			$('#DateGridPie thead .sortable').unbind('click');
    			if($('#DateGridPie thead .sortabledesc').length>0){
    				_chose = typeArr[$('#DateGridPie thead .sortabledesc').attr('filed')];
    				
    			}else if($('#DateGridPie thead .sortableasc').length>0){
    				_chose = typeArr[$('#DateGridPie thead .sortableasc').attr('filed')];
    			}
    			$('#poistionBtnOpt a').removeClass('btnPrimary');
    			$('#poistionBtnOpt a').eq(_chose).addClass('btnPrimary');
    			var rowspan = $('#DateGridPie .rowNum').val();
    			$('#DateGridPie .dgContentTable tbody tr').eq(0).append('<td class="pieTd" rowspan="'+rowspan+'" valign="middle" align="center" style="display:none;border:1px solid #E5E5E5; border-right:none; background:#fff; vertical-align: middle;"><div id="PieContenterPop" class="pieContenter" style="width:570px;"></div></td>');
    			$('#DateGridPie .dgContentTable thead th').css('padding','0');   			
    			$('#poistionBtnOpt a').live('click',function(){
    				$('#poistionBtnOpt a').removeClass('btnPrimary');
    				$(this).addClass('btnPrimary');
    				channelAndmodelPie();
    			});
    			channelAndmodelPie();
    			deviceModelArr = [];
    			var modelName = $('#DateGridPie .tableSelect').eq(0).attr('model');
				deviceModelArr.push(modelName);
				$('#DateGridPie .tableSelect').eq(0).prop('checked',true);
				channelAndmodelLine();
    		}
    	});
    }
  //用户来源--饼图
    function channelAndmodelPie(){
    	var dataRateTr = $('#DateGridPie .dgContentTable tbody tr');
		var pieData = [], pieRate = 0;
		var _type = $('#poistionBtnOpt .btnPrimary').attr('index');
		var _idx = $('#CharacterCont .tabLine .active').attr('index');
		if(_idx != 0 && _idx != '0'){_type = parseInt(_type) -1}
    	var _model = $('#CharacterCont .tableMode .active').attr('mode');
    	if( _model == 'performance'){
    		$('#poistionBtnOpt').show();
    		$('#DateGridPie .rateBarsHead').show();
				$('#DateGridPie .rateBars').parent('td').show();
				var _maxVal = 0;
    		$('#DateGridPie tbody tr').each(function(){
    			var _width = parseFloat($(this).find('td').eq(_type).find('.rateVal').attr('val'));
    			if(_width > _maxVal){
    				_maxVal = _width;
    				}
    		});
    		$('#DateGridPie tbody tr').each(function(){
    			var _width = parseFloat($(this).find('td').eq(_type).find('.rateVal').attr('val'));
    			 var proportion = 100;
					if(_width == 0.00){
						proportion = 0;
					}else{
							prop = 100/_maxVal;
							proportion = _width*prop;	
					}
					
    			$(this).find('.rateBars').find('.rateBar').width(proportion+'%');
    			$(this).find('.rateBarsPer').html(_width+'%');
    			});
    	}else if(_model == 'pie'){
    		$('#poistionBtnOpt').show();
    		$('#DateGridPie .pieTd').show();
    		dataRateTr.each(function(){
    			var _pieData = [];
    			_pieData.push($(this).find('td').eq(1).find('span').html());
    			var _thisRate = $(this).find('td').eq(_type).find('.rateVal').attr('val');
    			_thisRate = parseFloat(_thisRate);			
    			_pieData.push(_thisRate);
    			pieRate += _thisRate;
    			pieData.push(_pieData);
    		});
    		if(pieRate < 100){
    			pieData.push({
                    name: '其他',
                    y: parseFloat(100-pieRate),
                    color: '#AADFF3'
                });
    		}
    		new Highcharts.Chart({
    			chart: {
    				renderTo: 'PieContenterPop',
    				defaultSeriesType: 'pie',
    				width: 600,
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
    					return '<b>'+ this.point.name +'</b>: '+ this.y.toFixed(2) +' %';
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
    						formatter: function(){
    							var _text = this.point.name;
    							return '<b>'+ _text +'</b>: '+ this.y.toFixed(2) +' %';
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
    	}else{
    		
    	}
    }
//用户来源--趋势曲线
    function channelAndmodelLine(){
    	if(deviceModelArr.length==0){return;}
    	$('#ChannelLineChats').html('<div class="loading"></div>');
    	var _data = getAjaxParam();
    	var list = [],len = deviceModelArr.length;
    	var idx = $('#TrendLine .selected').attr('index');
    	for(var i =0;i<len;i++){
    		var ele = deviceModelArr[i].split("$$$$")[0];
    		list.push("'"+ele+"'");
    		//list.push("'"+deviceModelArr[i]+"\'");
    	}
    	list = list.toString();
    	var appVersion = $('#SingleNameHidden').val();
		appVersion = appVersion != 'Other' ? replaceLast(appVersion):'Other';
		var _dim = 'appModel';
		if($('#CharacterCont .tabLine .active').attr('index') == '0'){
			_dim = 'appChannel'
		}
		var _table = '';
		if(!IsAll()){
			_table = 'REPORT_INTRO_MULTI_VCD_ETL';
		}
    	var param = $.extend('',_data[0],{'appVersion':'appVersion='+appVersion,'list':'('+list+')','norm':idx,'dim':_dim,'table':_table});
    	
    	$.ajax({
    		url: projectName+"/appVersionDimensionAction.do?method=getCdTrendData&reportName="+_data[1],
    		data: param,
    		dataType : 'json',
    		success: function(data){
	    		if(data){
	    			var dataX = [], series = [];
					for(var j=0;j<len;j++){
						var _s={};
						var _nan = deviceModelArr[j].split("$$$$");
						var _left = _nan[0];
						var _right = _nan[1];
						//var model = deviceModelArr[j];
						if(_right == undefined || _right == 'undefined'){
							_s.name = _left;
						}else{
							_s.name = _right != '' ? _left+"("+_right+')' : _left;
						}
						var model = _left;
						if(data[model]!=undefined){
							_s.data = data[model][1];
							series.push(_s);
							if(j==0){
								dataX = data[model][0];
							}
						}
					}
					if(dataX.length == 0){
						$('#ChannelLineChats').html('<div class="noDataAlert">没有相关数据!</div>');
						return;
					}
					var normName = $('#TrendLine .selected a').html();
					$('#ChannelLineChats').createLineChart({
						type:'spline',
						dataX: dataX,
						seriesData: series,
						height: 300,
						normName:normName
					});
	    		}
    		}
    	});
    	
    }
   //----------------------------------------------------公用------------------------ 
    function getDateWeek(dateStr){
    	var dateStr = dateStr.replace("-","/").replace("-","/"),
    		d1 = new Date(Date.parse(dateStr)),
    		d2 = new Date(Date.parse(dateStr)),
    		year = d1.getFullYear();
    	d2.setMonth(0);
    	d2.setDate(1);
    	var d = d2.getDay();
    	(d == 0) && (d = 7);
    	d2.setDate(d2.getDate() - d);
    	var s1 = Math.ceil(Math.ceil((d1 - d2)/(24*60*60*1000))/7) - 1;
    	(d == 1) && s1++;
    	if(s1 == 0){
    		d1.setYear(d2.getFullYear());
    		d1.setMonth(11);
    		d1.setDate(31);
    		d2.setMonth(0);
    		d2.setDate(1);
    		d = d2.getDay();
    		(d == 0) && (d = 7);
    		d2.setDate(d2.getDate() - d + 7);
    		s1 = Math.ceil(Math.ceil((d1 - d2)/(24*60*60*1000))/7);
    		(d == 1) && s1++;
    		year = d2.getFullYear();
    	}
    	s1 = s1 < 10 ? '0'+s1 : s1;
    	return year+''+s1;
    }
    function getDateMonth(dateStr){
    	var dateArr = dateStr.split('-');
    	return dateArr[0] + dateArr[1];
    }
    //趋势对比
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
    function getOldDate(){	  	    	
    	var _temp = $("#DateList .selected").find('a').attr('dateinterval');
    	if(_temp == undefined){return;} 
    	 $('#DateList').html($('#DateListShow').html());
    	 var _dateinterval = $("#DateList .selected").find('a').attr('dateinterval');
    	 $('#DateCalendar').html('<input type="text" onkeydown="return false;" id="Calendar" class="calendar"><input type="hidden" id="FixedDate"/>');
		   $("#Calendar").Calendar({
	        single: false,
	        monthSize: 3,
	        showFooter: true,
	        offsetX: -340,
	        disableDate: startDate+'||'+date2Str(getPastDate(_date, 1)),
	        currentDate: getPastDate(_date, 1),
	        applyCallback: function () {
	    		if($('#ReportHelp').length > 0){
	    			$('#DateList .iconSelect').css('left', 880);
	    		}else{
	    			$('#DateList .iconSelect').css('left', 985);
	    		}
          $("#FixedDate").val($("#Calendar").val());
          $("#DateList dd").removeClass("selected");
          getMultiOpt();
	         }
	        });
		   getDateInterval("#FixedDate", _dateinterval);
	       $("#Calendar").val($("#FixedDate").val()); 
	     
    }
function dateReload(){
	 var idx = $('#ActionCont .tabLine .active').attr('idx');
		   if(idx != 0){
	      getOldDate();
	   }
	  var _dateinterval = $("#DateList .selected").find('a').attr('dateinterval');
		
		var _dateCount = 1;		
		var _checked = (idx == 1 ||idx == 2)
		var _yesterday = date2Str(getPastDate(_date, 1));
		var beforeyesterday = date2Str(getPastDate(_date, 2));
		var thisDate = $('#FixedDate').val();
		var _startDate = thisDate.split(' 至 ')[0];
		var _endDate = thisDate.split(' 至 ')[1];
		if(idx == 0){
			if($('#DateList dd').length == 2){
	   				
	   		}else if($('#DateList dd').length > 2){
	   			$('#DateList').html($('#DateListLoss').html());	 
	   		}
	   		if($("#DateList .selected").find('a').attr('dateinterval') == 90){
	   		_dateinterval = 90;
	   	}
		}else if(idx == 1 || idx == 2){
			_dateCount = 2;
			if(_dateinterval == '7'){
				_dateinterval = 8;
			}
		}
	   if($("#DateList .selected").length>0){
		   $('#DateCalendar').html('<input type="text" onkeydown="return false;" id="Calendar" class="calendar"><input type="hidden" id="FixedDate"/>');
		   $("#Calendar").Calendar({
	        single: false,
	        monthSize: 3,
	        showFooter: true,
	        offsetX: -340,
	        disableDate: startDate+'||'+date2Str(getPastDate(_date, _dateCount)),
	        currentDate: getPastDate(_date, 1),
	        applyCallback: function () {
	    		if($('#ReportHelp').length > 0){
	    			$('#DateList .iconSelect').css('left', 880);
	    		}else{
	    			$('#DateList .iconSelect').css('left', 985);
	    		}
	            $("#FixedDate").val($("#Calendar").val());
	            $("#DateList dd").removeClass("selected");
	            getMultiOpt();
	         }
	        });
		   getDateInterval("#FixedDate", _dateinterval);
	       $("#Calendar").val($("#FixedDate").val()); 
	   }else if(_checked){ 		   
		   if(_endDate == _yesterday && _startDate!=_endDate){
			   $('#DateCalendar').html('<input type="text" onkeydown="return false;" id="Calendar" class="calendar"><input type="hidden" id="FixedDate"/>');
			   $("#Calendar").Calendar({
		        single: false,
		        monthSize: 3,
		        showFooter: true,
		        offsetX: -340,
		        disableDate: startDate+'||'+date2Str(getPastDate(_date, 2)),
		        currentDate: getPastDate(_date, 1),
		        applyCallback: function () {
		    		if($('#ReportHelp').length > 0){
		    			$('#DateList .iconSelect').css('left', 880);
		    		}else{
		    			$('#DateList .iconSelect').css('left', 985);
		    		}
		            $("#FixedDate").val($("#Calendar").val());
		            $("#DateList dd").removeClass("selected");
		            getMultiOpt();
		         }
		        });
		   }
		   $("#FixedDate").val(_startDate + ' 至 ' +beforeyesterday);
	       $("#Calendar").val($("#FixedDate").val()); 
	   }
	
	 }
	function getVal(num){
		var val = formatPer(num);
		if(val == '0.00%' || val == '0.0%' ||val == '0%'){
			return '';
		}else{
			return formatNum(val);
		}
	}
	function formatPer(num){
		if(num.indexOf('%') > -1){
			return num;
		}else{
			return num + '%';
		}
	}
  function replaceLast(name){
	  var _temp = name.substring(name.lastIndexOf('('),name.lastIndexOf(')'));
		_temp =_temp.replace('(','__');
		name = name.substring(0,name.lastIndexOf('('))+_temp;
		return name;
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
	function getTwoDaysInterval(btns){
	var d1 = $('#FixedDate').val().split(' 至 ')[0],d2 = $('#FixedDate').val().split(' 至 ')[1];
	d1 = d1.replace(/-/g, "/"),d2 = d2.replace(/-/g, "/");
	var time = new Date(d2) - new Date(d1);
	var interval =  parseInt(time / (1000 * 60 * 60 * 24))+1;
	var _index = btns.find('.btnPrimary').attr('index');
	btns.find('.btnday').removeClass('radius');
	if(interval <7 ){
		  btns.find('.btnweek').hide().removeClass('btnPrimary');
	  	btns.find('.btnmonth').hide().removeClass('btnPrimary');
	  	btns.find('.btnday').addClass('btnLast');
	  	btns.find('.btnday').addClass('radius');
	  if(_index == 'Week' || _index == 'Month'){
	  	if(btns.find('a').length == 4){
	  		btns.find('a').eq(1).addClass('btnPrimary');
	    }else{
	    	btns.find('a').eq(0).addClass('btnPrimary');
	    	
	    }
	  }	
	}else if (interval<30){
		btns.find('.btnmonth').hide();
		btns.find('.btn').removeClass('btnLast');
		btns.find('.btnweek').show().addClass('btnLast');
		if( _index == 'Month'){
			btns.find('.btnmonth').hide().removeClass('btnPrimary');
			if(btns.find('a').length == 4){
	  		btns.find('a').eq(2).addClass('btnPrimary');
	  	}else{
	  		btns.find('a').eq(1).addClass('btnPrimary');
	  	}
		}
	}else{
			btns.find('.btn').removeClass('btnLast').show();
    	btns.find('a').last().addClass('btnLast');
    	btns.find('.btnday').removeClass('radius');
		}
}
    
