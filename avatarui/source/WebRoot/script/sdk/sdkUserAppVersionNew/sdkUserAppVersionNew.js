define(function(require){
	window.startDate = '2012-08-19';
    require('common');
    require('calendar');
    require('calendar_compare');
    require('datagrid');
    require('imitselect');
    require('dialog');
    require('tipbox');
    require('createLineChartCompare');
    require('highcharts_3.0.1');
    var sortAble = 'pv@desc';
    var _cacheGridData = '';
    $(function(){
    	$('#SingleNameHidden').val('');
    	var aibei = _appKey == 'QDLENGR0KOUD' ? true : false;
    	var letongbu = _appKey == 'PJPRUFMX2B3H' ? true : false;
    	var lejishi= _appKey == '9PZJIUIQ0S5Q' ? true : false;
    	if(letongbu || aibei || lejishi){
			$('#RegOpt').show();
		}
		$(window).resize(function(){
			var spacing = $('#LeftSideMenu').is(':visible') ? 240 : 28;
			pannelWidth = $(document.body).width() - spacing;
			if(pannelWidth < 900){pannelWidth = 900;}
			var itemLen = $('#Pannel .pannelContainer .pannelItem').length;
			$('#Pannel').width(pannelWidth);
			$('#Pannel .pannelContainer').width(pannelWidth*itemLen);
			$('#Pannel .pannelContainer .pannelItem').width(pannelWidth);				
			if(_pannelIndex == 1){
				$('#Pannel .pannelContainer').css({'left': -pannelWidth});
			}
			if($('#TrendCompareWrap').is(':visible')){
				var _width = $('.rightSide').width() - 2;
				$('#TrendCompareWrap').show().css({'width': _width});
			}
			if($('#DateList .selected').length <1){
				var _left = parseInt($('#Pannel').width()) -400;
	    		$('#DateList .iconSelect').css('left', _left+'px');
			}
		});
		$('#ReportHelp').click(function(){
			$.Dialog({
				width: 700,
				title: '报表解读',
				contentDom: '#Help'
			});
		});
		$('.narrow').live('click',function(){
			if($(this).find('i').hasClass('extendBox')){
				$('#ChooseContent').animate({'top':'-320px'});
				$(this).html('展开<i class="closeBox"></i>');
			}else{
				$('#ChooseContent').animate({'top':'0'});
				$(this).html('收起<i class="extendBox"></i>');
			}
			
		});
		//对比
		$('#CompareClear').click(function(){
			$('.compareList li .txt').html('');
			$('.compareList li').addClass('noValue');
			$('#CompareList').val('');
			
			$('.addToCompare').each(function(){
				$(this).val('加入对比').removeClass('addCompareDisable');
				$(this).parents('tr').removeClass('trActive');
			});
			
			$('#CompareBtn').attr('disabled', 'disabled');
		});
		
		$('.compareList li').live('mouseover', function(){
			$(this).addClass('hover');
		})
		$('.compareList li').live('mouseout', function(){
			$(this).removeClass('hover');
		});
		
		$('.compareDel').live('click', function(){
			var _val = $(this).parent().find('span').html();
			$(this).parents('li').remove();
			$('.compareList ul').append('<li class="noValue"><div class="txt"></div><div class="placeholder">空</div></li>');
			
			var _compareList = $('#CompareList').val().split('||');
			_compareList.remove(_val);
			
			$('.addToCompare').each(function(){
				var thisVal = $(this).attr('thisval');
				if(thisVal == _val){
					$(this).val('加入对比').removeClass('addCompareDisable');
					$(this).parents('tr').removeClass('trActive');
				}
			});
			$('#CompareList').val(_compareList.join('||'));
			
			if($('#CompareList').val().split('||').length == 1){
				$('#CompareBtn').attr('disabled', 'disabled');
			}
		});
		
		$('#CompareBtn').click(function(){
			$.Dialog({
				width: 1180,
				height: 550,
				title: '趋势对比',
				contentDom: '#TrendCompare',
				initCallback: function(){
					$('#GlobalTabCompare .single').hide();
					if(!IsAll()){
						$('#GlobalTabCompare .single').hide();
						if(thisIndexCompare == 5 || thisIndexCompare == 6 || thisIndexCompare == 7){
							thisIndexCompare = 0;
							$('#GlobalTabCompare li').removeClass('selected');
							$('#GlobalTabCompare li').eq(0).addClass('selected');
						}
					}else{
							$('#GlobalTabCompare li').eq(5).show();
							$('#GlobalTabCompare li').eq(6).show();
							$('#GlobalTabCompare li').eq(7).show();
					}
					
					$('#DateListCompare').html($('#DateList').html());
								
					var _startDate = typeof startDate !== 'undefined' ? startDate : '2010-01-01';
					$("#DateListCompare a").die().live("click", function () {
				        $("#CalendarCompare").val("");
				        $(this).parent().addClass("selected").siblings().removeClass("selected");
				        if ($(this).attr("dateInterval") == "all"){
				        	getDateInterval("#FixedDateCompare", "all");
				        }else{
				        	getDateInterval("#FixedDateCompare", $(this).attr("dateInterval"));
				        }
				        $("#CalendarCompare").val($("#FixedDateCompare").val());
				        getTrendCompare('', 'all');
				    });
					
					$("#CalendarCompare").val($('#FixedDate').val());
					$("#FixedDateCompare").val($('#FixedDate').val());
				    $("#CalendarCompare").Calendar({
				        single: false,
				        monthSize: 3,
				        showFooter: true,
				        offsetX: -340,
				        disableDate: startDate+'||'+date2Str(getPastDate(_date, 1)),
				        currentDate: getPastDate(_date, 1),
				        applyCallback: function () {
				            $("#FixedDateCompare").val($("#CalendarCompare").val());
				            $("#DateListCompare dd").removeClass("selected");
				            getTrendCompare('', 'all');
				        }
				    });
					getAppVersion();
				}
			});
		});
		//对比趋势tab切换
	    $('#GlobalTabCompare li').click(function(){
	    	$('#GlobalTabCompare li').removeClass('selected');
	    	$(this).addClass('selected');
	    	thisIndexCompare = $(this).attr('index');
	    	getTrendCompare('', 'all');
	    });
		//关闭对比选择框
		$('#CompareClose').click(function(){
			$('#Compare').animate({'margin-left': 0, left: '100%'}, 300, function(){
				$('#CompareHidden').animate({bottom: 0}, 300)
			})
		});
		
		//显示对比选择框
		$('#CompareHidden').click(function(){
			$('#Compare').animate({'margin-left': -425, left: '50%'}, 300, function(){
				$('#CompareHidden').animate({bottom: -24}, 300)
			})
		});
		//整体分析tab切换
		$('#MainTab li').click(function(){
			keywords = '';
			$('.searchContent').val('');
			if($(this).hasClass('more')){
				return;
			}
			$('#MainTab li').removeClass('selected');
			$(this).addClass('selected');
			var idx = $(this).attr('index');
			if(idx == 'all'){
				$('#ExcelExport').show();
			}else{
				$('#ExcelExport').hide();
			}
			thisIndex = idx;
			$('#MainTab .tabMoreBtn .moreMenu .checkBoxs').removeClass('checked');
			$('#MainTab .tabMoreBtn .moreMenu .tab'+idx).addClass('checked');
			getAllData();
		});
		$('#SingleTable .tableMode a').click(function(){
	    	var thisMode = $(this).attr('mode');
	    	$('#SingleTable .tableMode a').removeClass('active');
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
		
		$('#CharacterCont .tableMode a').click(function(){
			var thisMode = $(this).attr('mode');
			if(thisMode == 'export'){return;}
	    	
	    	$('#CharacterCont .tableMode a').removeClass('active');
	    	$(this).addClass('active');	  
	    	$('#poistionBtnOpt').show();
	    	if(thisMode == 'performance'){
	    		$('#DateGridPie .pieTd').hide();
	    		$('#DateGridPie .rateBarsHead').show();
    			$('#DateGridPie .rateBars').parent('td').show();	
	    	}else if(thisMode == 'data'){
	    		$('#poistionBtnOpt').hide();
	    		$('#DateGridPie .pieTd').hide();
	    		$('#DateGridPie .rateBarsHead').hide();
    			$('#DateGridPie .rateBars').parent('td').hide();
	    	}else if(thisMode == 'pie'){
	    		$('#DateGridPie .pieTd').show();
	    		$('#DateGridPie .rateBarsHead').hide();
    			$('#DateGridPie .rateBars').parent('td').hide();
	    	}
	    	channelAndmodelPie();
	    });
		
		//top5趋势
		$('#Top5Tab li').click(function(){
			$('#Top5Tab li').removeClass('selected');
			$(this).addClass('selected');
			top5Index = $(this).attr('index');
			top5Trend(top5Index);
		});
		//数据趋势，用户行为，用户来源tab切换
		$('.analysisTab li').click(function(){
			$('.analysisTab li').removeClass('selected');
			$(this).addClass('selected');
			$('.analysisTab .l_line').show();
			var _idx = $(this).attr('index');
			if(_idx == 'DeepCont'){
				$('.analysisTab .l_line').eq(1).hide();
			}else if(_idx == 'CharacterCont'){
				$('.analysisTab .l_line').eq(2).hide();
			}
			$('.deepAnalysis .maxTable').hide();
			$('#' + _idx).show();
			eval(_idx+'()');
		});
		//每项分析tab切换
		$('.tabLine li').click(function(){
			if($(this).hasClass('more')){
				return;
			}
			var _idx = $(this).parents('.maxTable').attr('id');
			$('#' + _idx + ' .tabLine li').removeClass('active');
			$(this).addClass('active');
			if(_idx == 'DeepCont'){
				$('#DeepCont .tabMoreBtn .moreMenu .checkBoxs').removeClass('checked');
				var idx = $(this).attr('index');
				$('#DeepCont .tabMoreBtn .moreMenu .tab'+idx).addClass('checked');
				thisIndexSingle = idx;
			}
			eval(_idx+'()');
		});
		//数据趋势tab切换'更多'
		$('#DeepCont .tabMoreBtn .moreMenu .checkBoxs').click(function(e){
			$('#DeepCont .tabMoreBtn .moreMenu .checkBoxs').removeClass('checked');
			$(this).addClass('checked');
			stopBubble(e);
			var idx = $(this).attr('index');					
			$('#DeepCont .tabLine li').removeClass('active');
            if($('#DeepCont .tabLine li.tabTitle'+idx)){
            	$('#DeepCont .tabLine li.tabTitle'+idx).addClass('active');
            }
		      thisIndexSingle = idx;
		      DeepCont();
		});
		
		$('.tabMoreBtn').hover(function(){
			$(this).find('.moreMenu').show();
		},function(){
			window.setTimeout(function(){
				if(tabFlag){
					$('.tabMoreBtn').find('.moreMenu').hide();
				}
			},50);
		});
		$('.tabMoreBtn').find('.moreMenu').hover(function(){
			$(this).show();
			tabFlag = false;
		},function(){
			$(this).hide();
			tabFlag = true;
		});
		$('.tabMoreBtn').click(function(){
			$(this).find('.moreMenu').show();
			});

	   //指标依据
		$('#IndicatorsBtn').hover(function(){
			$('#ChooseContent .indicatorsMenu').show();
		},function(){
			window.setTimeout(function(){
				if(IndicatorsFlag){
				$('#ChooseContent .indicatorsMenu').hide();
				}
			},200);
		});
		$('#ChooseContent .indicatorsMenu').hover(function(){
			$(this).show();
			IndicatorsFlag = false;
		},function(){
			$(this).hide();
			IndicatorsFlag = true;
		});
		$('#ChooseContent .indicatorsMenu .menuBoxs').click(function(){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked');
			}else{
				$(this).addClass('checked');
			}
			var src = '';
			$('#ChooseContent .indicatorsMenu .menuBoxs').each(function(){
				if($(this).hasClass('checked')){
					src += $(this).find('span').html()+',';
				}
			});
			$('#IndicatorsAllChecked').html(src.substring(0, src.length-1));
		});
	    //搜索
		$('.searchBoxBtn').click(function(){
			keywords = $(this).parent().find('.searchContent').val();
			getAllData();
	  	}); 
	  //查询
		$('#SearchBtn').click(function(){
			if(IsAll()){
				$('.updateUser').show();
				$('.firstVersion').show();	
			}else{
				if(top5Index == 5 || top5Index == 6 || top5Index == 7){
					top5Index = 0;
					$('#Top5Tab li').removeClass('selected');
					$('#Top5Tab li').eq(0).addClass('selected');
				}
				var _mainTabIndex = $('#MainTab .selected').attr('index');
				if(_mainTabIndex == 'updateUser' || _mainTabIndex == 'extantUser' || _mainTabIndex == 'first_version_usernum'){
					thisIndex = 'all';
					$('#MainTab li').removeClass('selected');
					$('#MainTab li').eq(0).addClass('selected');
				}
				$('.updateUser').hide();
				$('.firstVersion').hide();	
			}
			if($('#SingleNameHidden').val()){
				closeFn();
				var _idx = $('.analysisTab li.selected').attr('index');
		    eval(_idx+'()');
			}else{
				getAllData();
				top5Trend(top5Index);
			}
						
		});
		//数据趋势对比
		$('#TrendCompareSwitch').click(function(){
			$('#NormSelect1 .btn').val('请选择维度一');
			$('#NormSelect2 .btn').val('请选择维度二');
			
			$('#Norm1').val(0);
			$('#Norm2').val(0);
			
			var _width = $('.rightSide').width() - 2;
			$('#TrendCompareWrap').show().css({'width': _width, 'right': -_width});
			var _yesterday = getPastDate(_date, 1);
			var _lastSevenDay = date2Str(getPastDate(_date, 7)) + ' 至 ' + date2Str(getPastDate(_date, 1));
			$('#TrendCompareWrap').animate({'right': 0}, 300, function(){
				$('#TrendCompareCalendar').CalendarCompare({
					offsetX: -552,
					offsetY: 3,
					currentDate:_yesterday,
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
		$('#CloseTrendCompare').click(function(){
			var _width = $('.rightSide').width() - 2;
			$('#TrendCompareWrap').animate({'right': -_width}, 200, function(){
				$('#TrendCompareCalendar').removeClass('calendarCompareActive').find('.originDate').remove('interval').val('');
				$('#TrendCompareCalendar').find('.compareDateWrap').hide();
				$('#TrendCompareCalendar').find('.compareDate').remove('interval').val('');
				$('#TrendCompareWrap').hide();
				DeepCont();
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
		
		$('.normSelect .dropDownMenu a').live('click', function(){
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
		//留存用户趋势周，月
		$('#userLossLineBtn a').click(function(){
			$('#userLossLineBtn a').removeClass('btnPrimary');
			$(this).addClass('btnPrimary');
			userLossLine();
		});
		//留存用户日，周
		$('.userLossBtn a').click(function(){
			$('.userLossBtn a').removeClass('btnPrimary');
			$(this).addClass('btnPrimary');
			userLossDataGrid();
		});
		//使用频率日，周，月
		$('.userFrequency a').click(function(){
			$('.userFrequency a').removeClass('btnPrimary');
			$(this).addClass('btnPrimary');
			userFrequencyDataGrid();
		});
		//使用时长日，周，月
		$('.userDuration a').click(function(){
			$('.userDuration a').removeClass('btnPrimary');
			$(this).addClass('btnPrimary');
			userDurationDataGrid();
		});
		//用户来源渠道，设备型号饼图排序
		$('#DateGridPie thead .sortable').live('click',function(){
			var _type = '';
			if($(this).hasClass('sortabledesc')){
				$(this).removeClass('sortabledesc');
				$(this).addClass('sortableasc');
				_type = 'sortableasc';
			}else if($(this).hasClass('sortableasc')){
				$(this).removeClass('sortableasc');
				$(this).addClass('sortabledesc');
				_type = 'sortabledesc';
			}else{
				$(this).addClass('sortabledesc');
				_type = 'sortabledesc';
			}
			var _sortableOrder = $(this).attr('filed'); 
			getDataGridCharacter(_sortableOrder, _type);
		});
		//用户来源渠道，设备型号全选
		$('#SelectAll').live('click', function(){
			if($(this).prop('checked')){
				var tableSelect = $('#DateGridPie .tableSelect');
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
				$('#DateGridPie .tableSelect').prop('checked', false);
				$('#DateGridPie .tableSelect').removeAttr('disabled');
				deviceModelArr = [];
			}
			if(deviceModelArr.length > 0){
				$('#DrawLineChart').addClass('btnPrimary');
			}else{
				$('#DrawLineChart').removeClass('btnPrimary');
			}
		});
//		用户来源渠道，设备型号单选
		$('#DateGridPie .tableSelect').live('click', function(){
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
				$('#DateGridPie .tableSelect').removeAttr('disabled');
				$('#SelectAll').prop('checked', false);
			}else{
				$('#SelectAll').prop('checked', true);
				$('#DateGridPie .tableSelect').each(function(){
					if(!$(this).prop('checked')){
						$(this).attr('disabled','disabled');
					}
				})
			}
		});
//		用户来源渠道，设备型号趋势图
		$('#DrawLineChart').click(function(){
			channelAndmodelLine();
		});
		$('#TrendLine  li').click(function(){
		    	$('#TrendLine  li').removeClass('selected');
		    	$(this).addClass('selected');
		    	channelAndmodelLine();
	    });
		$('#Back').click(function(){
    		if($('#TrendCompareWrap').is(':visible')){
	    		var _width = $('.rightSide').width() - 2;
				$('#TrendCompareWrap').animate({'right': -_width}, 200, function(){
					$('#TrendCompareCalendar').removeClass('calendarCompareActive').find('.originDate').remove('interval').val('');
					$('#TrendCompareCalendar').find('.compareDateWrap').hide();
					$('#TrendCompareCalendar').find('.compareDate').remove('interval').val('');
					$('#TrendCompareWrap').hide();
					
				});
			}
    		_pannelIndex = 0;
    		$('#Pannel .pannelContainer').animate({'left': 0}, 300);
    		$('#SingleName').html('');
	    	$('#SingleNameHidden').val('');
	    	$('#MutilNotice').hide();
	    	getOldDate();
    	});
//		时间控制
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
					keywords = '';
					$('.searchContent').val('');
				  	$('#MutilNotice').hide();
				  	thisIndex = 'all';
				  	$('#MainTab li').removeClass('selected');
				  	$('#MainTab li').eq(0).addClass('selected');
					getMultiOpt();
	    });
	    $("#Calendar").Calendar({
	        single: false,
	        monthSize: 3,
	        showFooter: true,
	        offsetX: -340,
	        disableDate: startDate+'||'+date2Str(getPastDate(_date, 1)),
	        currentDate: getPastDate(_date, 1),
	        applyCallback: function () {
	    		var _left = parseInt($('#Pannel').width()) -400;
	    		$('#DateList .iconSelect').css('left', _left+'px');
	            $("#FixedDate").val($("#Calendar").val());
	            $("#DateList dd").removeClass("selected");
				keywords = '';
				$('.searchContent').val('');
				thisIndex = 'all';
			  	$('#MainTab li').removeClass('selected');
			  	$('#MainTab li').eq(0).addClass('selected');
				getMultiOpt();
	        }
	    });
	  //初始化时间默认为七天
	    getDateInterval("#FixedDate", 7);
	    $("#Calendar").val($("#FixedDate").val());
		getMultiOpt();
		fullListItem();
	    //导出excel
		$("#ExcelExport").click(function(){
			var _data = getAjaxParam();
			var _url, excelColName, exportColumns;
			var  _sqlId = 'appVersionDatagridSqlIdExcel';
			var _tableNames = '';
			if(_data[0].model){
				var _mutil = _data[0].model;
				if(_mutil.indexOf('7day') > -1){
					var _m = _mutil.split('7day')[1];
					if(_m){
						if(_m == 'VD'){
							_tableNames = 'REPORT_INTRO_MULTI_DEVICEMODEL_VD_ETL_7DAY'
							_sqlId = 'vdDaysSqlIdExcel';
						}else if(_m == 'VC'){
							_tableNames = 'REPORT_INTRO_MULTI_CHANNEL_VC_ETL_7DAY';
							_sqlId = 'vcDaysSqlIdExcel';
						}else if(_m == 'VCD'){
							_tableNames = 'REPORT_INTRO_MULTI_CHANNEL_VCD_ETL_7DAY';
							_sqlId = 'vcdDaysSqlIdExcel';
						}
					}else{
						_tableNames = 'REPORT_VERSION_STAT_ETL_7DAY';
						_sqlId = 'appVersion7daysSqlIdExcel';
					}
				}else if(_mutil.indexOf('allday') > -1){
					var _m = _mutil.split('allday')[1];
					if(_m){
						if(_m == 'VD'){
							_tableNames = 'REPORT_INTRO_MULTI_DEVICEMODEL_VD_ETL_ALLDAY'
							_sqlId = 'vdDaysSqlIdExcel';
						}else if(_m == 'VC'){
							_tableNames = 'REPORT_INTRO_MULTI_CHANNEL_VC_ETL_ALLDAY';
							_sqlId = 'vcDaysSqlIdExcel';
						}else if(_m == 'VCD'){
							_tableNames = 'REPORT_INTRO_MULTI_CHANNEL_VCD_ETL_ALLDAY';
							_sqlId = 'vcdDaysSqlIdExcel';
						}
					}else{
						_tableNames = 'REPORT_VERSION_STAT_ETL_ALLDAY';
						_sqlId = 'appVersionDaysSqlIdExcel';
					}
					
				}
			}
			var dataParam = _data[0];
			if(IsAll()){
//				excelColName = '版本名称,版本号,浏览量,浏览量比例,启动次数,启动次数比例,启动用户,启动用户比例,新用户,新用户比例,升级用户,升级用户比例,现存用户,现存用户比例,首次版本新用户,累计用户,累计用户比例,';
//				exportColumns = 'appVersionName,dimValue,pv,pvRate,startTimes,startTimesRate,uv,uvRate,newUv,newUvRate,updateUser,updateUserRate,extantUser,extantUserRate,fvun,totalUv,totalUvRate';
				excelColName = '版本名称,版本号,首次新用户,首次新用户比例,新用户,新用户比例,现存用户,现存用户比例,升级用户,升级用户比例,启动用户,启动用户比例,启动次数,启动次数比例,浏览量,浏览量比例,累计用户,累计用户比例';
				exportColumns = 'appVersionName,dimValue,fvun,fvunRate,newUv,newUvRate,extantUser,extantUserRate,updateUser,updateUserRate,uv,uvRate,startTimes,startTimesRate,pv,pvRate,totalUv,totalUvRate';
				var dateArr = getDateParam(),
					startDate = dateArr[0],
					endDate = dateArr[1];
				_url = projectName+'/excelAction.do?method=write2Excel&reportName='+_data[1]
				 +'&startDate='+startDate+'&endDate='+endDate+'&appKey='+appKey
				 +'&sqlId='+_sqlId+'&exportColumns='+exportColumns;
				if($('.searchContent').val() != ''){
					_url += '&appVersionName=appVersionName=' + encodeURIComponent('%' + $('.searchContent').val() + '%');
				}
				
				_url += '&tableName=' + _tableNames;
			}else{
//				excelColName = '版本名称,版本号,浏览量,浏览量比例,启动次数,启动次数比例,启动用户,启动用户比例,新用户,新用户比例,累计用户,累计用户比例';
//				exportColumns = 'appVersionName,dimValue,pv,pvRate,startTimes,startTimesRate,uv,uvRate,newUv,newUvRate,totalUv,totalUvRate';
				excelColName = '版本名称,版本号,新用户,新用户比例,启动用户,启动用户比例,启动次数,启动次数比例,浏览量,浏览量比例,累计用户,累计用户比例';
				exportColumns = 'appVersionName,dimValue,newUv,newUvRate,uv,uvRate,startTimes,startTimesRate,pv,pvRate,totalUv,totalUvRate';
				
				_url = projectName+'/excelAction.do?method=write2Excel&reportName='+_data[1]
				 +'&startDate='+dataParam.startDate+'&endDate='+dataParam.endDate+'&tableName='+_tableNames+'&appKey='+appKey
				 +'&sqlId='+_sqlId+'&exportColumns='+exportColumns;
				if(dataParam.appChannel){
					_url += '&appChannel='+dataParam.appChannel;
				}
				if(dataParam.appModel){
					_url += '&appModel='+dataParam.appModel;
				}
				if(dataParam.appReg){
					_url += '&appReg='+dataParam.appReg;
				}
				if($('.searchContent').val() != ''){
					_url += '&appVersionName=appVersionName=' + encodeURIComponent('%' + $('.searchContent').val() + '%');
				}
			}
			$.exportExcel({
				url: _url,
				fileName: $('#ReportAnchor').html()+'__版本透视__明细数据---'+$("#FixedDate").val(),
				excelColName: excelColName
			});
		});
		//数据趋势导出
		$('#DeepContExcel').click(function(){
			var _data = getAjaxParam(),tableName = '', sqlId = 'trendGridSqlId';
			var excelColName = '', exportColumns = '';	
			var appVersion = '';
			if(IsAll()){
				excelColName = '时间,新用户,升级用户,现存用户,首次版本新用户,累计用户,启动用户,启动次数,浏览量,单次用户PV,单次启动PV,单用户启动次数,启动新用户占比(%)';
				exportColumns = 'date,newUserNum,updateUser,extantUser,firstVerUser,accumUserNum,startUserNum,startTimeNum,pv,userPerPv,startPerPv,userPerTimes,userPerNew';
				if(_data[0].model == '7day'){
					sqlId = 'trendGrid7day'
				}else if(_data[0].model == 'allday'){
					sqlId = 'trendGridSqlId';
				}
				appVersion = '&appVersion=appVersion='+$('#SingleNameHidden').val();
			}else{
				var name = $('#SingleNameHidden').val();
				name = name != 'Other' ? replaceLast(name):'Other';
				appVersion = '&appVersion=appVersion='+name
				sqlId = 'trendGridSqlId';
				tableName = _data[0].tableName;
				excelColName = '时间,新用户,累计用户,启动用户,启动次数,浏览量,单次用户PV,单次启动PV,单用户启动次数,启动新用户占比(%)';
				exportColumns = 'date,newUserNum,accumUserNum,startUserNum,startTimeNum,pv,userPerPv,startPerPv,userPerTimes,userPerNew';
				
			}
			var _url = projectName+'/excelAction.do?method=write2Excel&reportName='+_data[1]+'&sqlId='+sqlId+'&tableName='+tableName+'&exportColumns='+exportColumns
			           +getExcelParam(_data[0])+appVersion;
			$.exportExcel({
				url: _url,
				fileName: $('#ReportAnchor').html()+'__版本透视__数据趋势__明细数据---'+$("#FixedDate").val(),
				excelColName: excelColName
			});	
		});
		//用户行为
		$('#ActionContExcel').click(function(){
			var idx = $('#ActionCont .tabLine .active').attr('idx');
			var _data = getAjaxParam(),tableName = '', sqlId = '';
			var excelColName = '', exportColumns = '', type = '',reportName = _data[1];
			var sortOrderBy = '', sortRule = '';
			var name = $('#SingleNameHidden').val();
				name = name != 'Other' ? replaceLast(name):'Other';;
			var appVersion = '&appVersion=appVersion='+name;
			var f_method = 'appFrequencyImpalaAction.do';  
		
			//30天，90天末次版本流失
			if(idx == 1 || idx == 2){
				reportName = 'appVersionDimensionDataNew';
				sqlId = 'lastVersionGridSqlId';
				excelColName = '日期,流失率(%),新增流失用户,用户净增长率(%)';
				exportColumns = 'date,lossRate,newLossUser,newUserRiseRate';
				if(idx == 1){
					type = '30天末次版本流失率';
					tableName = 'REPORT_MORE_DIMENSION_LASTUSER_LOSS_ALLNUM_MONTH_V';
				}else{
					type = '90天末次版本流失率';
					tableName = 'REPORT_MORE_DIMENSION_LASTUSER_LOSS_ALLNUM_THREEMONTH_V';
				}
				sortOrderBy = '&sortOrderBy=date',sortRule = '&sortRule=desc'
				if($('#ActionDataGrid .dgHeader  .sortabledesc').length > 0){
					sortOrderBy = '&sortOrderBy='+$('#ActionDataGrid .dgHeader .sortabledesc').parents('td').attr('field');
					sortRule = '&sortRule=desc';
				}else if($('#ActionDataGrid .dgHeader .sortableasc').length > 0){
					sortOrderBy = '&sortOrderBy='+$('#ActionDataGrid .dgHeader .sortableasc').parents('td').attr('field');
					sortRule = '&sortRule=asc';
				}
			
			}else if(idx == 3){
				//使用频率
				excelColName = '频次,启动次数,浏览量,用户比例,占总数的百分比(启动次数),占总数的百分比(浏览量)';
				exportColumns = 'startFrequency,startTimes,pageViews,startUserRate,startTimesRate,pageViewsRate';
				var _days = $('#ActionCont .userFrequency').find('.btnPrimary').attr('index');
				sqlId = 'appFrequencyBy'+_days+'SqlId'; 
				if(IsAll()){
					if(_data[0].model == '7day' || _data[0].model == 'allday' ){
						tableName = 'REPORT_START_FREQUENCY_V_BY_'+_days.toUpperCase()+'_ETL'; 
					}else{
						tableName = 'REPORT_START_FREQUENCY_MULTI_BY_'+_days.toUpperCase()+'_ETL';
					}
				}else{
					tableName = 'REPORT_START_FREQUENCY_MULTI_BY_'+_days.toUpperCase()+'_ETL';
				}
				type = '使用频率('+_days+')';
				reportName ='appFrequencyDataMulti';
			}else if(idx == 4){
				f_method = 'appDurationImpalaAction.do'; 
				//使用时长	
				var _days = $('#ActionCont .userDuration').find('.btnPrimary').attr('index');
				sqlId = 'getAppDurationBy'+_days+'SqlId';
				excelColName = '时长,启动次数,浏览量,用户比例,占总数的百分比(启动次数),占总数的百分比(浏览量)';
				exportColumns = 'durationClass,startTimes,pageViews,startUserRate,startTimesRate,pageViewsRate';
				if(IsAll()){
					if(_days == 'Single'){
						tableName = 'REPORT_MORE_DIMENSION_V_VTIME_DAY_CLASS';
					} else if (_days == 'Day') {
						tableName = 'REPORT_MORE_DIMENSION_V_UTIME_DAY_CLASS';
					}else{
						tableName = 'REPORT_MORE_DIMENSION_V_UTIME_MULTI_'+_days.toUpperCase()+'_ETL';
					}
				}else{
					if(_days == 'Single'){
						tableName = 'REPORT_MORE_DIMENSION_VTIME_DAY_CLASS';
					} else if (_days == 'Day') {
						tableName = 'REPORT_MORE_DIMENSION_UTIME_DAY_CLASS';
					}else{
						tableName = 'REPORT_MORE_DIMENSION_UTIME_MULTI_'+_days.toUpperCase()+'_ETL';
					}
				}
				if(_days == 'Single'){
					excelColName = '时长,启动次数,浏览量,占总数的百分比(启动次数),占总数的百分比(浏览量)';
					exportColumns = 'durationClass,startTimes,pageViews,startTimesRate,pageViewsRate';
				}
				type = '使用时长('+_days+')';
				reportName = 'appDurationDataMulti';
			}else if(idx == 0){
			  //用户留存
				var _days = $('#ActionCont .userLossBtn').find('.btnPrimary').attr('index');
				sqlId = 'multi'+_days+'RetentionUserNumSql';
				reportName = 'multiRetentionUser';
				type = '用户留存('+_days+')';
				if(_days == 'Week'){
					excelColName = '时间,新用户,1周后,2周后,3周后,4周后,5周后,6周后,7周后,8周后,9周后,10周后,11周后,12周后';
					exportColumns = 'peroidDate,newUserNum,week_1,week_2,week_3,week_4,week_5,week_6,week_7,week_8,week_9,week_10,week_11,week_12';
				    
				}else if(_days == 'Month'){
					excelColName = '时间,新用户,1个月后,2个月后,3个月后,4个月后,5个月后,6个月后,7个月后,8个月后,9个月后,10个月后,11个月后,12个月后';
					exportColumns = 'peroidDate,newUserNum,month_1,month_2,month_3,month_4,month_5,month_6,month_7,month_8,month_9,month_10,month_11,month_12';
				}else{
					excelColName = '时间,新用户,次日留存,7日后留存,30日后留存';
					exportColumns = 'date,newUserNum,day_1,day_7,day_30';
				}
				var vcdz = getVCDZ();
				tableName = 'MULTI_' + _days.toUpperCase() + '_RETENTION_' +vcdz + '_ETL_NEW+&tableReg=\\$\\{t\\}'
			}
			var _url = projectName+'/excelAction.do?method=write2Excel&reportName='+reportName+'&sqlId='+sqlId+'&tableName='+tableName+'&exportColumns='+exportColumns
	           +getExcelParam(_data[0], _days)+appVersion + sortOrderBy + sortRule;
			if(idx == 3 || idx == 4){
				_url = projectName+'/'+f_method+'?method=write2Excel&reportName='+reportName+'&sqlId='+sqlId+'&tableName='+tableName+'&exportColumns='+exportColumns
		           +getExcelParamDuration(_data[0], _days,appVersion) + sortOrderBy + sortRule;
			}
			$.exportExcel({
				url: _url,
				fileName: $('#ReportAnchor').html()+'__版本透视__用户行为__'+type+'---'+$("#FixedDate").val(),
				excelColName: excelColName
			});
		});
		//用户来源
		$('#CharacterContExcelGrid').click(function(){
			var idx = $('#CharacterCont .tabLine .active').attr('index'); //渠道
			var _data = getAjaxParam(),tableName = '', sqlId = '';
			var	type = '';	
			if(idx == '0' || idx == 0){
				type = '渠道'
			}else{
				type = '设备型号';
			}
			var excelColName = type+',新用户,新用户比例(%),启动用户,启动用户比例(%),启动次数,启动次数比例(%)';
			var exportColumns = 'dimValue,newUv,newUvRate,uv,uvRate,startTimes,startTimesRate';
			var name = $('#SingleNameHidden').val();
					name = name != 'Other' ? replaceLast(name):'Other';
			var appVersion = '&appVersion=appVersion='+name;
			if(IsAll()){
				if(_data[0].model == '7day'){
					if(idx == '0' || idx == 0){
						sqlId = 'versionChannelChartDays';
						tableName = 'REPORT_INTRO_MULTI_CHANNEL_VC_ETL_7DAY';
					}else{
						sqlId = 'versionAppModelChartDays';
						tableName = 'REPORT_INTRO_MULTI_DEVICEMODEL_VD_ETL_7DAY';
					}
				}else if(_data[0].model == 'allday'){
					if(idx == '0' || idx == 0){
						sqlId = 'versionChannelChartDays';
						tableName = 'REPORT_INTRO_MULTI_CHANNEL_VC_ETL_ALLDAY';
					}else{
						sqlId = 'versionAppModelChartDays';
						tableName = 'REPORT_INTRO_MULTI_DEVICEMODEL_VD_ETL_ALLDAY';
					}
				}else{
					if(idx == '0' || idx == 0){
						sqlId = 'versionChannelChartSqlId';
					}else{
						sqlId = 'versionAppModelChartSqlId';
					}
					tableName = _data[0].tableName;
					tableName = 'REPORT_INTRO_MULTI_VCD_ETL';
				}	
			}else{
				if(_data[0].model == '7day'){
					tableName = 'REPORT_INTRO_MULTI_CHANNEL_VCD_ETL_7DAY ';
					if(idx == '0' || idx == 0){
						sqlId = 'vdVersionChannelChart';						
					}else{
						sqlId = 'vcVersionAppModelChart';						
					}
				}else if(_data[0].model == 'allday'){
					tableName = 'REPORT_INTRO_MULTI_CHANNEL_VCD_ETL_ALLDAY ';
					if(idx == '0' || idx == 0){
						sqlId = 'vdVersionChannelChart';	
					}else{
						sqlId = 'vcVersionAppModelChart';
					}
				}else{
					if(idx == '0' || idx == 0){
						sqlId = 'versionChannelChartSqlId';
					}else{
						sqlId = 'versionAppModelChartSqlId';
					}
					tableName = _data[0].tableName;
					tableName = 'REPORT_INTRO_MULTI_VCD_ETL';
				}	
			}
			var sortOrderBy = 'newUv', sortRule = 'desc';
			if($('#DateGridPie .dgContentTable thead .sortabledesc').length > 0){
				sortOrderBy = $('#DateGridPie .dgContentTable thead .sortabledesc').attr('filed');
				sortRule = 'desc';
			}else if($('#DateGridPie .dgContentTable thead .sortableasc').length > 0){
				sortOrderBy = $('#DateGridPie .dgContentTable thead .sortableasc').attr('filed');
				sortRule = 'asc';
			}
			var _url = projectName+'/appVersionDimensionAction.do?method=write2Excel&reportName='+_data[1]+'&sqlId='+sqlId+'&tableName='+tableName+'&exportColumns='+exportColumns
	                 + '&sortOrderBy='+sortOrderBy+'&sortRule='+sortRule 
			         + getExcelParam(_data[0])+appVersion;
				$.exportExcel({
					url: _url,
					fileName: $('#ReportAnchor').html()+'__版本透视__用户来源__'+type+'---'+$("#FixedDate").val(),
					excelColName: excelColName
				});
		});
    });
	 window.getDateInterval = function(bindDom, n){
		 var yesterday = getPastDate(_date,1),
	 	 yestedayStr = date2Str(yesterday);
		 if($('.analysisTab .selected').attr('index') == 'ActionCont' && $('#SingleNameHidden').val()){			 
			 var idx = $('#ActionCont .tabLine .active').attr('idx');
			 if((idx == 1 || idx == 2)&& n !=1){
				 yesterday = getPastDate(_date,2);
				 yestedayStr = date2Str(yesterday);
				 if(n=='7'){
					 n = 8;
				 }
				
			 }
		 }
	    if(n == 'all'){
	        $(bindDom).val(startDate+' 至 '+ yestedayStr);
	    }else{
	        $(bindDom).val(date2Str(getPastDate(_date,n)) + ' 至 ' + yestedayStr);
	    }
	 }
	    function getExcelParamDuration(dataParam, days,appVersion){
	    	var dateArr = getDateParam(),startDate = dateArr[0].split('=')[1],endDate = dateArr[1].split('=')[1];
	    	var param = '&'+dataParam.appKey;
			if(days == 'Day' || days == 'Single'){
	    		param += '&startDate='+startDate+'&endDate='+endDate;
	    	}else if(days == 'Week'){
	    		startDate = getDateWeek(startDate);
	    		endDate = getDateWeek(endDate);
	    		param += '&startWeek='+startDate+'&endWeek'+endDate;
	    	}else if(days == 'Month'){
	    		startDate = getDateMonth(startDate);
	    		endDate = getDateMonth(endDate);
	    		param += '&startMonth='+startDate+'&endMonth'+endDate;
	    	}
			param += '&appVersion='+appVersion.split('=')[2];
			if(dataParam.appModel){
				param += '&'+dataParam.appModel;
			}
			if(dataParam.appChannel){
				param += '&'+dataParam.appChannel;
			}
			if(dataParam.appReg){
				param += '&'+dataParam.appReg;
			}
			return param;
	    }
	function getExcelParam(dataParam, days){
		var idx = $('#ActionCont .tabLine .active').attr('idx');
		var dateArr = getDateParam(),startDate = dateArr[0],endDate = dateArr[1];
		var param = '&startDate='+startDate+'&endDate='+endDate+'&appKey='+dataParam.appKey;
		if (days=='Week') {
			param = '&startDate=startDate='+getDateWeek(startDate.split('=')[1])
								+'&endDate=endDate='+getDateWeek(endDate.split('=')[1])+'&appKey='+appKey;
		}else if (days=='Month') {
			param = '&startDate=startDate='+getDateMonth(startDate.split('=')[1])
					+'&endDate=endDate='+getDateMonth(endDate.split('=')[1])+'&appKey='+appKey;
		}
		if(dataParam.appChannel){
			param += '&appChannel='+dataParam.appChannel;
		}
		if(dataParam.appModel){
			param += '&appModel='+dataParam.appModel;
		}
		if(dataParam.appReg){
			param += '&appReg='+dataParam.appReg;
		}
		return param;
	}
    function pannelDefine(){
    	var spacing = $('#LeftSideMenu').is(':visible') ? 240 : 28;   	
    	pannelWidth = $(document.body).width() - spacing;
    	if(pannelWidth < 900){pannelWidth = 900;}
    	var itemLen = $('#Pannel .pannelContainer .pannelItem').length;
    	$('#Pannel').width(pannelWidth);
    	$('#Pannel .pannelContainer').width(pannelWidth*itemLen);
    	$('#Pannel .pannelContainer .pannelItem').width(pannelWidth);
    	
    	if(_pannelIndex == 1){
    		$('#Pannel .pannelContainer').css({'left': -pannelWidth});
    	}
    	
    }
    function stopBubble(e){
    	if(e&&e.stopPropagation){
    		e.stopPropagation();
    	}else{
    		window.event.cancelBubble = true;
    	}
    }
    function getMultiOpt(){
    	closeFn();
    	if($('#DateList dd').length != 2){
    		$('#DateListShow').html($('#DateList').html());
		}
    	if($('#SingleNameHidden').val()){
			closeFn();
			var _idx = $('.analysisTab li.selected').attr('index');
	    	eval(_idx+'()');
		}else{
			getAllData();
			top5Trend(top5Index);
		} 
    }
    function getAllData(){
    	if(thisIndex == 'all'){
    		$('#AllTable').show();
    		$('#SingleTable').hide();
    		getAllDataGrid();
    	}else{
    		
    		$('#AllTable').hide();
    		$('#SingleTable').show();
    		getDataSingle();
    	}	
    }
    //整体分析
    function getAllDataGrid(){
    	pannelDefine();
    	_cacheGridData = '';
    	var _data = getAjaxParam();
    	var columns = [
   		         	{field: 'appVersionName', title: '版本名称', width: 90, sortable: true, align: 'left', formatter: function(row){
   		         		return '<a href="javascript:;" onclick="showDeepAnalysis(\''+row.appVersionName+'('+row.dimValue+')\')">'+row.appVersionName+'</a>'
	         			}
   		         	},
   		         	{field: 'dimValue', title: '版本号', width: 50, sortable: true, align: 'left'}
   				];
    	if(IsAll()){
    		columns.push(
    				{field: 'fvun', title: '首次新用户', width: 82, align: 'left', sortable: true, formatter:function(row){
    					return formatNum(row.fvun)+'<br/><font style="color:#999">('+row.fvunRate+')</font>';
						}
    				}
   				);
    	}
    	columns.push(
					{field: 'newUv', title: '新用户(%)', width: 70, align: 'left', sortable: true, formatter:function(row){
							return formatNum(row.newUv)+'<br/><font style="color:#999">('+row.newUvRate+')</font>';
						}
					}
				);
	   	if(IsAll()){
	   		columns.push(
	   						
	   						{field: 'extantUser', title: '现存用户', width: 70, align: 'left', sortable: true, formatter:function(row){
	   								if(row.extantUser == 0){
	   									return '—';
	   								}else{
	   									return formatNum(row.extantUser)+'<br/><font style="color:#999">('+row.extantUserRate+')</font>';
	   								}
	   							}
	   						},
	   						{field: 'updateUser', title: '升级用户', width: 70, align: 'left', sortable: true, formatter:function(row){
	   								if(row.updateUser == 0){
	   									return '—';
	   								}else{
	   									return formatNum(row.updateUser)+'<br/><font style="color:#999">('+row.updateUserRate+')</font>';
	   								}
   								}
	   						}
	   					);
	   	}
	   	if($.trim(_date[0]) == $.trim(_date[1])){
	   		columns.push(
	   						{field: 'uv', title: '启动用户(%)', width: 80, align: 'left', sortable: true, formatter:function(row){
	   								return formatNum(row.uv)+'<br/><font style="color:#999">('+row.uvRate+')</font>';
	   							}
	   						}
	   					);
	   	}else{
	   		columns.push(
	   						{field: 'uv', title: '启动用户比例', width: 88, align: 'left', sortable: true, formatter:function(row){
	   								return formatNum(row.uvRate);
	   							}
	   						}
	   					);
	   	}
   	

	   	columns.push(
			   			{field: 'startTimes', title: '启动次数(%)', width: 82, sortable: true, align:'left', formatter:function(row){
								return formatNum(row.startTimes)+'<br/><font style="color:#999">('+row.startTimesRate+')</font>';
							}
						},
						{field: 'pv', title: '浏览量(%)', width: 90, align: 'left', sortable: true, formatter: function(row){
   							return formatNum(row.pv)+'<br/><font style="color:#999">('+row.pvRate+')</font>';
   							}
						},
	   					{field: 'totalUv', title: '累计用户(%)', width: 82, align: 'left', sortable: true, formatter:function(row){
	   							return formatNum(row.totalUv)+'<br/><font style="color:#999">('+row.totalUvRate+')</font>';
	   						}
	   					},
	   					{field: 'manage', title: '操 作', width: 100, align: 'center', formatter:function(row){
							return '<div style="height:24px;"><input type="button" class="btn btnSmall addToCompare" value="加入对比" thisval="'+row.appVersionName+'('+row.dimValue+')" onclick="addCompare(\''+row.appVersionName+'('+row.dimValue+')\', this)" />'+
							'&nbsp;&nbsp;<input type="button" class="btn btnSmall" value="详情" onclick="showDeepAnalysis(\''+row.appVersionName+'('+row.dimValue+')\')" /></div>';
	   						}
	   					}
	   				);
    	$('#DetailDatagrid').Datagrid({
    		url: projectName+'/appVersionDimensionAction.do?method=getAppVersionDatagrid&reportName='+_data[1],
    		dataParam: _data[0],
    		conDivAuto: true,
    		height: 500,
    		heightAdjust: false,
    		dgAutoHeight: false,
    		hasFirstCol: true,
    		columns:columns ,
    		sortType: 'ajax',
	  		sortRule: 'desc',
	  		sortOrderBy: 'pv',
    		ajaxCallback: function(data, self){  
    				if($('#DetailDatagrid .sortabledesc').length>0){
						sortAble = $('#DetailDatagrid .sortabledesc').parents('td').attr('field')+'@desc';
					}else if($('#DetailDatagrid .sortableasc').length>0){
						sortAble = $('#DetailDatagrid .sortableasc').parents('td').attr('field')+'@asc';
					}
					if(data.rows.length == 0){$('#DetailDatagrid .dgContent').html('<div class="noDataAlert">没有相关数据!</div>');}											
					_cacheGridData = data; 
					$('.multiDataLoading').fadeOut('fast');
					var _compareVal = $('#CompareList').val().split('||');
					$('.addToCompare').each(function(){
						var _thisVal = $(this).attr('thisval');
						if(_compareVal.indexOf(_thisVal) > -1){
							$(this).val('取消对比').addClass('addCompareDisable');
							$(this).parents('tr').addClass('trActive');
						}
					});
    		}
    	});
    }
    //整体分析-单个指标
    function getDataSingle(){
    	var _data = getAjaxParam();
    	var datagridColor = ['#2f7ed8', '#910000', '#8bbc21', '#0d233a', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    	var prop = 0, datagridIndex = 0;   
    	var _sortRule = sortAble.split('@')[1],_sortOrderBy = sortAble.split('@')[0];
    	$('#Datagrid').DatagridContenter({
    		url: projectName+'/appVersionDimensionAction.do?method=getAppVersionDatagrid&reportName='+_data[1]+'&sortOrderBy='+thisIndex,
    		//ajaxData: _cacheGridData,
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
    		sortRule: 'desc',
    		sortOrderBy: _sortOrderBy,
    		columns: [
    		         	{field: 'dimValue', title: '版本', width: 150, align: 'left', formatter:function(row){
    							datagridIndex++;
    							if(datagridIndex == 11){
    								datagridIndex = 1;
    							}
    							return '<div style="display:inline-block; *display:inline; *zoom:1; width:13px; height:13px; margin-left:10px; vertical-align:middle; background:'+datagridColor[datagridIndex-1]+'"></div>&nbsp;<span>' + row.appVersionName + '(' + row.dimValue + ')</span>';
    						}
    					},
    		         	{field: 'proportion', title: singleName[thisIndex], width: 150, align: 'left', formatter: function(row){
    							var rowProp = row[thisIndex + 'Rate'];
    							rowProp = rowProp.substring(0, rowProp.lastIndexOf('%'))
    							var proportion = 100;
    							if(rowProp == 0.00){
    								prop = 0;
    								proportion = 0;
    							}else{
    								if(prop == 0){
    									prop = 100/rowProp;
    								}else{
    									proportion = rowProp*prop;
    								}
    							}
    		         			var value = formatNum(row[thisIndex]) + '<font style="color:#999">(' + rowProp + '%)</font>';
    	         				var thisHtml = '<div style="float:left; width:90%;"><div style="*float:left; padding:0 20px 0 5px;">';
    	         					thisHtml +='<div class="rateBar" style="display:none;" val="'+rowProp+'"><div class="barPercent" style="height:16px; background:#528DDD;width:'+rowProp+'%"></div><div style="margin:0;">'+value+'</div></div>'
    	         					thisHtml += '</div></div>';
    	         					thisHtml += '<span class="rateVal" val="'+rowProp+'">'+value+'</span>';
    	         				return thisHtml;
    						}
    					}
    				],
    		ajaxCallback: function(data){
    			$('.multiDataLoading').fadeOut('fast');
    			if(data.rows.length == 0){$('#Datagrid .dgContent').height(465);$('#Datagrid .dgContentTable tbody').height(425).css('text-align','center').html('<tr width="100%"><td colspan="2"><div class="noDataAlert">没有相关数据!</div></td></tr>');return;}
    			$('#Datagrid .dgContent').height(465).css('overflow','auto');
    			$('#Datagrid .dgContentTable').height(465);
			$('#Datagrid .dgContentTable tbody').height(433);
    			var _maxRate = 0;
    			$('#Datagrid .rateBar').each(function(){
    				 var _temp = parseFloat($(this).attr('val'));
    				_maxRate = _temp>_maxRate ? _temp : _maxRate
    			});
    			if(_maxRate!=0){
    				$('#Datagrid .rateBar').each(function(){
    					var prop = 100/ _maxRate;
    					var _temp = parseFloat($(this).attr('val'));
    				$(this).find('.barPercent').width(_temp*prop+'%');
    				
    			});
    				}
    			var tableModes = $('#SingleTable .tableMode a'),thisMode;
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
    				_pieData.push($(this).find('td').eq(0).find('span').html());
    				var _thisRate = $(this).find('td').eq(1).find('.rateVal').attr('val');
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
    								if(_text != '其他'){
    									_text = _text.substring(0, _text.lastIndexOf('('));
    								}
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
    	if(IsAll()){
    		$.extend(_data[0], {'norm': singleDim[norm]});
    		if($('#DateList .selected').find('a').attr('dateinterval') == '7'){
    			_data[0].norm = singleDimSeven[norm];
    		}
    	}else{
    		$.extend(_data[0], {'norm': multiDim[norm]});
    	}
    	$.ajax({
    		url: projectName+'/appVersionDimensionAction.do?method=getNormTop5Trend&reportName='+_data[1],
    		data: _data[0],
    		dataType: 'json',
    		success: function(data){
    			if(!data){return;}
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
    			if(dataX.length == 0){$('#Top5Trend').html('<div class="noDataAlert">没有相关数据!</div>');return;}   			
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

    window.showDeepAnalysis = function(name){
    	_pannelIndex = 1;
    	$('#Pannel .pannelContainer').animate({'left': -pannelWidth}, 300);	
    	var _idx = $('.analysisTab li.selected').attr('index');
    	$('#SingleName').html(name);
    	$('#SingleNameHidden').val(name);
    	if(!IsAll()){
    		$('#MutilNotice').fadeIn();
    		}
    	eval(_idx+'()');
    }
    window.addCompare = function(appVersionName,n){
    	if($(n).hasClass('addCompareDisable')){
    		$(n).val('加入对比').removeClass('addCompareDisable');
    		$(n).parents('tr').removeClass('trActive trClick');
    		
    		$('.compareList li').each(function(){
    			var thisVal = $(this).find('.name').html();
    			if(thisVal == appVersionName){
    				$(this).remove();
    				$('.compareList ul').append('<li class="noValue"><div class="txt"></div><div class="placeholder">空</div></li>');
    				return false;
    			}
    		});
    		
    		var _compareList = $('#CompareList').val().split('||');
    		_compareList.remove(appVersionName);
    		$('#CompareList').val(_compareList.join('||'));
    		
    		if($('#CompareList').val().split('||').length == 1){
    			$('#CompareBtn').attr('disabled', 'disabled');
    		}
    	}else{
    		var _next = 1;
    		var _compareList = $('#CompareList').val();
    		if(_compareList.length == ''){
    			$('#Compare').animate({bottom: 0}, 300);
    			$('#CompareList').val(appVersionName);
    		}else{
    			if(_compareList.split('||').length < 5){
    				$('#CompareList').val(_compareList + '||' + appVersionName);
    			}else{
    				_next = 0;
    				alert('最多选择5个！');
    			}
    		}
    		if(_next){
    			$('#Compare .noValue').eq(0).find('.txt').append('<span class="name">'+appVersionName+'</span><a href="javascript:;" class="compareDel">删除</a>');
    			$('#Compare .noValue').eq(0).removeClass('noValue');
    			
    			if($('#CompareHidden').css('bottom') == '0px'){
    				$('#Compare').animate({'margin-left': -425, left: '50%'}, 300, function(){
    					$('#CompareHidden').animate({bottom: -24}, 300)
    				})
    			}
    			$(n).val('取消对比').addClass('addCompareDisable');
    			$(n).parents('tr').addClass('trActive');
    			if($('#CompareList').val().split('||').length > 1){
    				$('#CompareBtn').removeAttr('disabled');
    			}
    		}
    	}
    }
    function getTrendCompare(name,type){
    	$('#LineChartCompare').html('<div class="loading"></div>');
    	var _data = getAjaxParam();
    	if(_data[0].model){
    		var _mulit = _data[0].model.split('day')[1];
    		if($('#DateListCompare .selected').find('a').attr('dateinterval') == '7'){
    			_data[0].model = '7day'+ _mulit;
    		}else if($('#DateListCompare .selected').find('a').attr('dateinterval') == 'all'){
    			_data[0].model = 'allday'+ _mulit;
    		}else{
    			_data[0].model = '';
    		}
    	}
    	var isSub = IsAll();
    	if(type == "remove"){
    		for(var i = 0; i < series.length; i++){
    			if(series[i].name == name){
    				series.remove(series[i]);
    			}
    		}
    		bindLineChart();
    	}else if(type == "all"){
    		if($("#AppVersionList .fixedVal").val() != ""){
    			var nameArr = $("#AppVersionList .fixedVal").val().split("||");
    			dataX = [];
    			var seriesList = {}, len = nameArr.length, _success = 0;
    			
    			var array = $('#FixedDateCompare').val().split('至');
    		    var startDate = 'startDate='+array[0].trim();
    		    var endDate = 'endDate='+array[1].trim();
    		    
    		    _data[0].startDate = startDate;
    		    _data[0].endDate = endDate;
    			
    			for(var i = 0; i < nameArr.length; i++){
    				var thisName = nameArr[i];
    				if(thisName == '选择其他版本'){
    					continue;
    				}
    				if(IsAll()){
    					$.extend(_data[0], {'appVersion': 'appVersion='+thisName, 'norm': singleDim[thisIndexCompare]});
    					if($('#DateListCompare .selected').find('a').attr('dateinterval') == '7'){
    						_data[0].norm = singleDimSeven[thisIndexCompare];
    					}
    				}else{
    					var _thisName = '';
    					if(thisName != null && thisName != 'Other'){
								_thisName = replaceLast(thisName);
    						}else{
    						_thisName = 'Other'	
    						}
    				//	var _thisName = thisName != 'Other' ? thisName.replace('(','__').substring(0,thisName.indexOf(')')+1):'Other';
    					$.extend(_data[0], {'appVersion': 'appVersion='+_thisName, 'norm': multiDim[thisIndexCompare]});
    				}
    				
    				(function(thisName){
    					var index = $('#GlobalTabCompare li.selected').attr('index');
    					var isNextOpt = index == 8 || index == 9 || index == 10;
    					
    					$.ajax({
    						url: projectName+"/appVersionDimensionAction.do?method=getNormTrend&reportName="+_data[1],
    						data: _data[0],
    						async: false,
    						dataType : 'json',
    						success: function(data){
    							_success++;
    							var dataY = [], dataXHas = dataX.length > 0;
    							for(var j = 0; j < data.length; j++){
    								if(!dataXHas){
    									dataX.push(data[j].date.trim());
    								}
    								
    								if(isNextOpt){
    									dataY.push(parseFloat((data[j].num/100).toFixed(2)));
    								}else{
    									dataY.push(parseFloat(data[j].num));
    								}
    							}
    							
    							var enabled = dataY.length < 200 ? true : false;
    							
    							seriesList[thisName] = {
    								name: thisName,
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
    							};
    								
    							if(_success == len - 1){
    								series = [];
    								for(var i = 0; i < len; i++){
    									if(nameArr[i] == '选择其他版本'){
    										continue;
    									}
    									series.push(seriesList[nameArr[i]])
    								}
    								bindLineChart();
    							}
    						}
    					});
    				})(thisName);
    			}
    		}
    	}else{
    		var array = $('#FixedDateCompare').val().split('至');
    	    var startDate = 'startDate='+array[0].trim();
    	    var endDate = 'endDate='+array[1].trim();
    	    _data[0].startDate = startDate;
    	    _data[0].endDate = endDate;
    		
    		if(IsAll()){
    			$.extend(_data[0], {'appVersion': 'appVersion='+name, 'norm': singleDim[thisIndexCompare]});
    			if($('#DateListCompare .selected').find('a').attr('dateinterval') == '7'){
    						_data[0].norm = singleDimSeven[thisIndexCompare];
    					}
    		}else{
    		//	var thisName = name != 'Other' ? name.replace('(','__').substring(0,name.indexOf(')')+1) : 'Other';
    			var thisName = '';
					if(name != null && name != 'Other'){
						thisName = replaceLast(name)
						}else{
						thisName = 'Other'	
					}
    			$.extend(_data[0], {'appVersion': 'appVersion=' + thisName, 'norm': multiDim[thisIndexCompare]});
    		}
    		$.ajax({
    			url: projectName+"/appVersionDimensionAction.do?method=getNormTrend&reportName="+_data[1],
    			data: _data[0],
    			dataType : 'json',
    			success: function(data){
    				var dataY = [];
    				dataX = [];
    				for(var j = 0; j < data.length; j++){
    					dataX.push(data[j].date.trim());
    					dataY.push(parseFloat(data[j].num));
    				}
    				var enabled = dataY.length < 200 ? true : false;
    				series.push({
    					name: name,
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
    				bindLineChart();
    			}
    		});
    	}
    }
    //绑定线型图数据
	function bindLineChart(){
		$("#LineChartCompare").html('');
		if(series.length == 0){
			return;
		}
		var index = $('#GlobalTabCompare li.selected').attr('index');
		var _toolTipSuffix = index == 11 ? '%' : '';
		$('#LineChartCompare').createLineChart({
			type: 'spline',
			dataX: dataX,
			seriesData: series,
			normName: $('#GlobalTabCompare li.selected a').html(),
			height: 400,
			toolTipSuffix: _toolTipSuffix
		});
		
	}
    function getAppVersion(){
    	var array = $('#FixedDateCompare').val().split('至');
        var startDate = 'startDate='+array[0].trim();
        var endDate = 'endDate='+array[1].trim();
    	var _dataParam = {'startDate': startDate, 'endDate': endDate, 'appKey': appKey};
    	
    	$.ajax({
    		url: projectName+'/dimenssionDataAction.do?method=getAppVersionDimenssionData&reportName=dimenssionDataNew',
    		data: _dataParam,
    		type: 'post',
    		dataType: 'json',
    		success: function(data){
    			$('#AppVersionList').html('');
    			var _selectedVal = $('#CompareList').val().split('||');
    			_selectedVal.push('选择其他版本');
    			
    			$('#AppVersionList').Chosen({
    				valueWidth: 250,
    				maxSize: 6,
    				maxSizeTip: '最多只能选择5个版本进行对比！',
    				multi: true,
    				multiCol: false,
    				data: data,
    				joinChar: '||',
    				selectedVal: _selectedVal,
    				beforeFillData: function(_self){
    					_self.find('.dataListAll ul').append('<li thisval="选择其他版本" thisid="0" style="display:none">选择其他版本</li>');
    				},
    				initCallback: function(_self){
    					_self.find('.dataSelectedCon .delItem:last').remove();
//    					_self.find('.dataListAll li').each(function(){
//    						var thisVal = $(this).attr('thisval');
//    						if(RegExp('[&]').test(thisVal)){
//    							$(this).remove();
//    						}
//    					});
    					getTrendCompare('', 'all');
    				},
    				selectedCallback: function(id, name){
    					var itemArr = $('#AppVersionList .dataSelectedCon .item');
    					var len = $('#AppVersionList .dataSelectedCon .item').size();
    					itemArr.eq(len-2).insertAfter(itemArr.eq(len - 1));
    					getTrendCompare(name);
    				},
    				removeCallback: function(id,name){
    					getTrendCompare(name, 'remove');
    				}				
    			});
    		}
    	});
    }
});
