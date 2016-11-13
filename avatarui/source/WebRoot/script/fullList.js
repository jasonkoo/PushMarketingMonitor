define(function(require){
	 require('imitselect');
	window.S = {};
	$.extend(S, {
		_sart:9,
		_end:10,
		StorageList: null,
		isSupport:function(){
			if(window.localStorage){
				this.StorageList = window.localStorage;
				return 1;
			}else if(window.sessionStorage){
				this.StorageList = window.sessionStorage;
				return 1;
			}else{
				return 0;
			}
		},
		getToday:function(key){
			var _h =(new Date(_date)).getHours(),_flag = '';
			_flag = _h > 9 ? '10' : '9';
			return key + this.formatDates((new Date(_date)).getTime())+ _flag;
		},
		getStorageList	: function(key,type){
			var arr = '';
			if(this.isSupport()){
				this.removeStorageList(key);
				var today = this.getToday(key);
				if(this.StorageList.getItem(today)){
					arr = [];
					var vcd = JSON.parse(this.StorageList.getItem(today));
					switch (type){
						case 'V':arr = vcd.V;break;
						case 'C':arr = vcd.C;break;
						case 'D':arr = vcd.D;break;
						case 'All':arr = vcd;break;
						default:break;
					}
				}
			}
			return arr;
		},
		setStorageList : function(key,type,arr){
			if(this.isSupport()){
				var today = this.getToday(key);
				if(type == 'V' || type == 'C' ||type == 'D'){
					this.removeStorageList(key);
					var all = this.getStorageList(key, 'All');
					if(!all){
						all = {}
					}
					all[type] = arr;
					this.StorageList.setItem(today,JSON.stringify(all));
				}
			}
		},
		removeStorageList:function(k){
			if(this.isSupport()){
				for(var i=0;i<this.StorageList.length;i++){
					var _k = this.StorageList.key(i);
					if(_k.indexOf(k)> -1){
						if(_k != this.getToday(k)){
							this.StorageList.removeItem(_k);
						}
					}
				}
			}
		},
		formatDates:function(times){
			var _d = new Date(parseFloat(times));
			var _y = _d.getFullYear(),_m = _d.getMonth()+1,_dd = _d.getDate();
			_m < 10 ? '0'+_m : _m;
			_dd < 10 ? '0'+_dd : _dd;
			return _y+''+_m+''+_dd;
		}
	});
	window.fullListItemDefault = function(version,channel,model,reg){
		var vid = version ? version :'AppVersionOpt';
		var cid = channel ? channel :'AppChannelOpt';
		var did = model ? model :'AppModelOpt';
		var zid = reg ? reg :'AppRegOpt';
		var list = $('#'+vid).length + $('#'+cid).length+$('#'+did).length+$('#'+zid).length;
		if(!list){return;}
		var allReg = [{'id': 1, 'name': '注册'}, {'id': 0, 'name': '非注册'}];
		var _version = ['所有版本'];
		var _channel = ['所有渠道'];
		var _model = ['所有型号'];
		var _reg = ['所有'];
		
		bindChosen(vid,'V', '所有版本', 250, [], _version);
		bindChosen(cid,'C', '所有渠道', 200, [], _channel);
		bindChosen(did,'D', '所有型号', 200, [], _model);
		bindChosen(zid, 'Z','所有', 200, allReg, _reg);
	}
	window.fullListItem = function (fn,version,channel,model,reg){
		var vid = version ? version :'AppVersionOpt';
		var cid = channel ? channel :'AppChannelOpt';
		var did = model ? model :'AppModelOpt';
		var zid = reg ? reg :'AppRegOpt';
		var cid = channel ? channel :'AppChannelOpt';
		var _appKey = window.location.href.split('appkey=')[1];
		$('#'+vid).html('<div class="smallLoading"></div>');
		$('#'+cid).html('<div class="smallLoading"></div>');
		$('#'+did).html('<div class="smallLoading"></div>');
		$('#'+zid).html('<div class="smallLoading"></div>');
		var dateArr = getDateParam(),
		startDate = dateArr[0],
		endDate = dateArr[1],
		_data = {'appKey': 'appKey='+_appKey};
		
		var allVersion = S.getStorageList(_appKey,'V');
		var allChannel = S.getStorageList(_appKey,'C');
		var allModel = S.getStorageList(_appKey,'D');
		var allReg = [{'id': 1, 'name': '注册'}, {'id': 0, 'name': '非注册'}];
		var _version = ['所有版本'];
		var _channel = ['所有渠道'];
		var _model = ['所有型号'];
		var _reg = ['所有'];
		
		if(allVersion && allChannel && allModel){
			bindChosen(vid,'V', '所有版本', 250, allVersion, _version);
			bindChosen(cid,'C', '所有渠道', 200, allChannel, _channel);
			bindChosen(did,'D', '所有型号', 200, allModel, _model);
			bindChosen(zid, 'Z','所有', 200, allReg, _reg);
			$('.multiDataLoading').hide();
		}else{
			$.when(
					getMultiOptsData('getAppVersionDimenssionData', _data),
					getMultiOptsData('getChannelDimenssionData', _data),
					getMultiOptsData('getDeviceModelDimenssionData', _data)
			).done(function(Version, Channel, Model){
				$('.multiDataLoading').hide();
				allVersion = Version[0];
				allChannel = Channel[0];
				allModel = Model[0];
				S.setStorageList(_appKey,'V',allVersion);
				S.setStorageList(_appKey,'C',allChannel);
				S.setStorageList(_appKey,'D',allModel);	
				bindChosen(vid,'V', '所有版本', 200, allVersion, _version,fn);
				bindChosen(cid,'C', '所有渠道', 200, allChannel, _channel,fn);
				bindChosen(did,'D', '所有型号', 200, allModel, _model,fn);
				bindChosen(zid, 'Z','所有', 200, allReg, _reg,fn);
			});
		}
		function getMultiOptsData(_method, _data){
			return $.ajax({
				url: projectName+'/dimenssionDataAction.do?method='+_method+'&reportName=dimenssionDataNew',
				type: 'post',
				data: _data,
				dataType: 'json'
			});
		};
	}
	window.bindChosen=function(id, type,_name, _width, data, selectedVal,fn){
		var _appKey = window.location.href.split('appkey=')[1];
		var _data = {'appKey': 'appKey='+_appKey};
		var chosenOpt = {
			valueWidth: 'auto',
			chosenConWidth: _width,
			data: data,
			selectedVal: selectedVal,
			initCallback: function(_self){
				if(type == 'C'){
					_self.find('.dataListAll li').each(function(){
						var thisVal = $(this).attr('thisval');
						if(RegExp('未知渠道\\(旧sdk版本未采集\\)').test(thisVal)){
							$(this).attr('thisval', '未知渠道(旧sdk版本未采集)').html('未知渠道(旧sdk版本未采集)');
						}
					});
				}
			},
			beforeFillData: function(_self){
				_self.find('.dataListAll ul').append('<li thisval="'+_name+'" thisid="-1">'+_name+'</li>');
			},
			selectedCallback: function(a, name){
				if(typeof(fn) == 'function'){
					fn();
				}
			}
		};
		if(type == 'D'){
			$.extend(chosenOpt, {
				keywordsPlaceholder: '搜索更多设备型号...',
				ajaxData: _data,
				searchBack: true,
				searchAjaxURL: projectName+'/dimenssionDataAction.do?method=getDeviceModelDimenssionData&reportName=dimenssionDataNew'
			})
		}
		$('#'+id).Chosen(chosenOpt);
	}
	
});
