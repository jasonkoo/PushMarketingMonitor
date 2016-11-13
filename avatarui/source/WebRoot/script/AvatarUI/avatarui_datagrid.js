/**
 * 表格组件
 * @Version: V2.0
 * @Author:  Rocky(296456018@qq.com)
 * @Date:    2011-02-14
 * 950修复带滚动条排序后列错乱的问题
 * 2014.3.7 hekui 修复前端与后端数据库字段名大小写不一致导致错误问题（匹配时均转换为小写）。
 */
 
define(function(require){
	require("avatarui_css/avatarui_datagrid.css");
	$.fn.Datagrid=function(u){var w={width:'',height:312,url:'',method:'POST',dataParam:{},columns:[],initCallback:function(a){},ajaxCallback:function(a,b){},pageRowList:[10,20,30,50,100],pageRowSelected:10,sortType:'ajax',sortRule:'desc',sortOrderBy:'',autoWidth:true,gapWidth:9,showFooter:true,colShow:false,colResize:true,dgResize:true,headerColspan:false,firstRowspan:false,loadingMsg:'数据加载中。。。',errorMsg:'服务器错误！',timeout:300,timeoutMsg:'数据量太大，暂时无法查询出来！',heightAdjust:true,dgHeaderHeight:false,hasFirstCol:true,firstColWidth:25,firstColHeaderName:'',firstColData:[],staticData:false,conDivAuto:false,dgAutoHeight:false,debugAjax:false};var x=$.extend({},w,u);var y=$(this);var z=[],widthSum=0,dgWidth=0,widthArrFixed=[],adjustAble=true;var A=null;y.addClass('dg').show();y.html('').removeAttr('inited').removeAttr('widtharrfixed').removeAttr('widthsum').height('');y.width(x.width);!x.dgAutoHeight&&y.height(x.height);y.append('<div class="dgLoading"><div class="dgLoadingCon">'+x.loadingMsg+'</div></div>');if(x.hasFirstCol){y.css('padding-left',x.firstColWidth);y.append('<div class="dgFirstCol"><table border="0" cellpadding="0" cellspacing="0" class="tableHeader"><tr><td></td></tr></table><div class="tableCon"><table border="0" cellpadding="0" cellspacing="0"></table></div><table border="0" cellpadding="0" cellspacing="0" class="tableFooter"><tr><td></td></tr></table></div>');if(x.headerColspan!==false){y.find('.tableHeader').addClass('tableHeaderColspan')}if(x.staticData!==false){y.find('.dgFirstCol .tableCon').addClass('tableConFirst')}y.find('.dgFirstCol').width(x.firstColWidth);y.find('.dgFirstCol td').width(x.firstColWidth);y.find('.dgFirstCol .tableHeader td').html(x.firstColHeaderName);if(x.showFooter){y.find('.dgFirstCol .tableFooter').show()}}var B='',colResizeStr='',leftStr=0,colShowStr='';for(var i=0;i<x.columns.length;i++){var C='',dataTypeStr='',widthStr='',titleStr='',alignStr='',sortableStr='',widthStaticStr='',isNull=false;$.each(x.columns[i],function(k,v){C+=k=='field'?' field="'+v+'"':'';titleStr+=k=='title'?v:'';alignStr+=k=='align'?' text-align:'+v+';':'';sortableStr+=k=='sortable'?' sortable':'';dataTypeStr+=k=='dataType'?' datatype="'+v+'"':'';if(k=='width'){if(x.autoWidth){z.push(v)}else{widthStr+=' width:'+v+'px;';if(v!=0){leftStr+=v+x.gapWidth}widthStaticStr=v}widthSum+=v;widthArrFixed.push(v)}if(v==0){isNull=true}});var D=isNull?' style="display:none;"':'';B+='<td'+C+dataTypeStr+D+'><div class="dgHeaderTdDiv'+sortableStr+'" style="'+widthStr+alignStr+'">'+titleStr+'</div></td>';if(x.colResize){if(!isNull){colShowStr+='<div'+C+' class="colShowItem"><input type="checkbox" checked="checked" />'+titleStr+'</div>'}var E='';if(!x.autoWidth){E='left:'+(leftStr-3)+'px'}colResizeStr+='<div'+C+' style="'+E+'" widthstatic="'+widthStaticStr+'"></div>'}};var F='';if(x.headerColspan!==false){for(var i=0;i<x.headerColspan.length;i++){var G=x.headerColspan[i];F+='<td colspan="'+G.colspan+'" align="'+G.align+'">'+G.title+'</td>'};F='<tr style="border-bottom:1px solid #ddd;">'+F+'</tr>'}var H='<div class="dgHeader"><table border="0" cellpadding="0" cellspacing="0">'+F+'<tr class="dgHeaderTr">'+B+'</tr></table><div class="colResize">'+colResizeStr+'</div>';y.append(H);if(x.dgHeaderHeight){y.find('.dgHeader').height(x.dgHeaderHeight);y.find('.dgHeader td').height(x.dgHeaderHeight)};if(x.headerColspan!==false){y.find('.dgHeader').addClass('dgHeaderColspan')}if(x.colShow){y.find('.dgHeader').append('<div class="colShow">'+colShowStr+'</div></div>')}x.autoWidth&&headerWidthSet();if(x.sortType=='ajax'){y.find('.dgHeader .dgHeaderTr td').each(function(){if($(this).attr('field')==x.sortOrderBy){$(this).find('.dgHeaderTdDiv').addClass('sortable'+x.sortRule);$(this).find('.dgHeaderTdDiv').attr('sortrule',x.sortRule)}})}y.append('<div class="dgContent"><table class="dgContentTable" border="0" cellpadding="0" cellspacing="0"></table></div>');var I='';$.each(x.pageRowList,function(a,b){if(b==x.pageRowSelected){I+='<option value="'+b+'" selected>'+b+'</option>'}else{I+='<option value="'+b+'">'+b+'</option>'}});y.append('<div class="dgFooter">'+'<div class="dgPage"><select class="rowNum">'+I+'</select>&nbsp;&nbsp;'+'<span><a href="javascript:;" class="pageFirst pageFirstAble">首页</a></span>'+'<span><a href="javascript:;" class="pagePrev pagePrevAble">上一页</a></span> '+'<input type="text" class="pageNow" value="0" /> / <b class="pageTotal"></b> '+'<span><a href="javascript:;" class="pageNext pageNextAble">下一页</a></span>'+'<span><a href="javascript:;" class="pageLast pageLastAble">末页</a></span>&nbsp;&nbsp;'+'转到 <input type="text" class="pageGo" value="1" size="3"/> '+'<a href="javascript:;" class="pageGoBtn">Go</a>'+'</div>'+'<div class="dgPageStatus">显示记录从<b class="itemStart"></b>到<b class="itemEnd"></b>, 总数 <b class="total"></b>条'+'</div></div>');if(x.showFooter){y.find('.dgFooter').show()}x.dgResize&&y.append('<div class="dgResize dgResizeRight" resize="right"></div><div class="dgResize dgResizeBottom" resize="bottom"></div><div class="dgResize dgResizeRightBottom" resize="rightBottom"></div>');if(x.colShow){$(document).mousedown(function(e){if($(e.target).closest('.dgHeader').is('div')){if(e.which==3){$(document).bind('contextmenu.right',function(){return false});e.stopPropagation();var a=$(e.target).closest('.dg').find('.colShow');var b=$(e.target).closest('.dgHeader');var c=e.pageX-b.offset().left;var d=e.pageY-b.offset().top;a.css({'left':c,'top':d});a.show();return false}}else{$(e.target).closest('.dg').find('.colShow').hide();$(document).unbind('.right')}});y.find('.colShowItem').click(function(){var a=$(this).attr('field');if($(this).find('input').prop('checked')==false){y.find('td').each(function(){if($(this).attr('field')==a){$(this).hide()}})}else{y.find('td').each(function(){if($(this).attr('field')==a){$(this).show()}})}return false});y.find('.dgHeader').die().live('mouseleave',function(){y.find('.colShow').hide()})}y.find('.dgContent').bind('scroll',function(){y.find('.dgHeader').css('margin-left',-$(this).scrollLeft());if(x.hasFirstCol){y.find('.dgFirstCol .tableCon table').css('top',-$(this).scrollTop())}});y.find('.dgPage span').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});y.find('.rowNum').change(function(){fillContent(1,y.find('.rowNum').val());return false});y.find('.pageFirstAble').click(function(){fillContent(1,y.find('.rowNum').val());return false});y.find('.pagePrevAble').click(function(){var a=y.find('.pageNow').val();if(a>1){fillContent(parseInt(a)-1,y.find('.rowNum').val())}else{fillContent(1,y.find('.rowNum').val())}return false});y.find('.pageNextAble').click(function(){var a=y.find('.pageNow').val();var b=y.find('.pageTotal').html();if(parseInt(a)<parseInt(b)){fillContent(parseInt(a)+1,y.find('.rowNum').val())}else{fillContent(b,y.find('.rowNum').val())}return false});y.find('.pageLastAble').click(function(){fillContent(parseInt(y.find('.pageTotal').html()),y.find('.rowNum').val());return false});y.find('.pageGoBtn').click(function(){var r=/^\+?[1-9][0-9]*$/;var a=y.find('.pageGo');if(r.test(a.val())==false){alert('页码输入格式出错！');a.val('1');return}if(a.val()>parseInt(y.find('.pageTotal').html())){alert('不能超出最大页码！');$(this).val('1');return}fillContent(parseInt(a.val()),y.find('.rowNum').val());return false});y.find('.sortable').click(function(){y.find('.sortable').removeClass('sortableasc sortabledesc');if($(this).attr('sortRule')=='desc'){$(this).removeClass('sortabledesc');$(this).addClass('sortableasc');$(this).attr('sortRule','asc');x.sortRule='asc'}else{$(this).removeClass('sortableasc');$(this).addClass('sortabledesc');$(this).attr('sortRule','desc');x.sortRule='desc'}x.sortOrderBy=$(this).parent().attr('field');if(x.sortType=='ajax'){fillContent(1,y.find('.rowNum').val())}else{var a=$(this).parent().attr('datatype');var b=y.find('.dgHeader .dgHeaderTr td').index($(this).parent());sortTableLocal(b,x.sortRule,a)}return false});function sortTableLocal(a,b,c){var d=[];var e=y.find('.dgContentTable tr');$.each(e,function(){d.push($(this).html())});judge(d,a,b,c)};function judge(a,b,c,d){if(A==b){a.reverse()}else{a.sort(getSort(b,c,d))}reCreateDom(a);A=b};function getSort(g,h,i){return function createSort(a,b){var c=$(a).eq(g).text();var d=$(b).eq(g).text();var e=convert(c,i);var f=convert(d,i);if(e<f){return h=='desc'?1:-1}else if(e>f){return h=='desc'?-1:1}else{return 0}};function convert(a,b){switch(b){case'int':return parseInt(a);break;case'float':return parseFloat(a);break;case'string':return a.toString();break;case'data':return new Date(Date.parse(a));break;default:return a.toString();break}}};function reCreateDom(c){var d=y.find('.dgContentTable tbody');d.html('');$.each(c,function(a,b){d.append('<tr>'+b+'</tr>')});d.find('tr').filter(':odd').addClass('trOdd')};if(x.dgResize){y.find('.dgResize').hover(function(){$(this).addClass('resizeHover')},function(){$(this).removeClass('resizeHover')});y.find('.dgResize').mousedown(function(e){$(this).addClass('resizeHover');var f=$(this);var g=true;var h=y.width();var i=y.height();if(g){var j=e.pageX;var k=e.pageY;window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();$(document).bind('mousemove.dgResize',function(e){if(g){var a=e.pageX;var b=e.pageY;var c=a-j;var d=b-k;if(f.attr('resize')=='right'){y.width(h+c);if(x.autoWidth){headerWidthSet();contentWidthSet()}}if(f.attr('resize')=='bottom'){y.height(i+d);y.find('.dgContent').css('height',parseInt(y.height())-J-K);if(x.hasFirstCol){y.find('.dgFirstCol .tableCon').css('height',parseInt(y.height())-J-K)}y.find('.dgResizeRight').css('height',parseInt(y.height()))}if(f.attr('resize')=='rightBottom'){y.width(h+c);y.height(i+d);y.find('.dgContent').css('height',parseInt(y.height())-J-K);if(x.hasFirstCol){y.find('.dgFirstCol .tableCon').css('height',parseInt(y.height())-J-K)}y.find('.dgResizeRight').css('height',parseInt(y.height()));if(x.autoWidth){headerWidthSet();contentWidthSet()}}firstColTdHeightResize()}});$(document).bind('mouseup.dgResize',function(){g=false;$(document).unbind('.dgResize')})}});y.find('.dgResize').mouseup(function(){$(this).removeClass('resizeHover')})}if(x.colResize){y.find('.dgHeader .colResize div').hover(function(){$(this).addClass('resizeHover')},function(){$(this).removeClass('resizeHover')});y.find('.dgHeader .colResize div').mousedown(function(e){$(this).addClass('resizeHover');var c=$(this).attr('field');var d=$(this);var f=$(this).index();var g=parseInt(d.css('left'));var h=[];y.find('.dgHeader .colResize div').each(function(a){h.push(parseInt($(this).css('left')))});var j=parseInt(d.attr('widthstatic'));var k=0;var l=true;if(l){var m=e.pageX;window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();$(document).bind('mousemove.colResize',function(e){if(l){var b=e.pageX;k=b-m;if(h[f]+k<h[f-1]+50){return}y.find('.dgHeader .colResize div').each(function(i){if(i>=f){$(this).css('left',h[i]+k+'px')}});d.attr('widthstatic',j+k);z=[];y.find('.colResize div').each(function(a){z.push($(this).attr('widthstatic'))});y.find('td').each(function(){if($(this).attr('field')==c){var a=$(this).find('div');a.width(j+k+'px')}});firstColTdHeightResize()}});$(document).bind('mouseup.colResize',function(){l=false;$(document).unbind('.colResize')})}});y.find('.dgHeader .colResize div').mouseup(function(){$(this).removeClass('resizeHover')})}y.attr('widtharrfixed',widthArrFixed);y.attr('widthsum',widthSum);$(window).unbind('resize.dgResize_'+y.attr('id')).bind('resize.dgResize_'+y.attr('id'),function(){contentWidthSet();if(x.autoWidth){firstColTdHeightResize();headerWidthSet()}});$('body').unbind('.dg').bind('click.dg',function(){y.find('.dgContentTable tr').removeClass('trClick');y.find('.dgFirstCol .tableCon table tr').removeClass('trClick')});if(!x.dgAutoHeight){var J=y.find('.dgHeader').outerHeight();var K=x.showFooter?y.find('.dgFooter').outerHeight():0;y.find('.dgContent').css('height',x.height-J-K);if(x.hasFirstCol){y.find('.dgFirstCol .tableCon').css({'height':x.height-J-K})}y.find('.dgResizeRight').css('height',x.height)}var L=[],formatterArr=[],alignArr=[];$.each(x.columns,function(a,b){var c=0;$.each(b,function(k,v){if(k=='field'){L.push(v)}if(k=='align'){alignArr.push(v)}if(k=='formatter'){formatterArr.push(v);c=1}});if(c==0){formatterArr.push(0)}});if(x.staticData!==false){var M=y.find('.dgFirstCol .tableCon table');$.each(x.firstColData,function(i,v){M.append('<tr><td width="'+x.firstColWidth+'">'+v+'</td></tr>')});var N=y.find('.dgContentTable');var O=y.find('.dgHeader .dgHeaderTr td .dgHeaderTdDiv');z=[];O.each(function(a){z.push(parseInt($(this).css('width')))});$.each(x.staticData,function(i,v){var c=$('<tr></tr>');N.append(c);$.each(v,function(a,b){c.append('<td><div class="dgContentInnerDiv" style="width:'+z[a]+'px; text-align:'+alignArr[a]+';">'+b+'</div></td>')})});dgTrColor();if(x.heightAdjust){adjustAble&&adjustHeight()}x.initCallback(y);return}fillContent(1,y.find('.rowNum').val(),true);x.initCallback(y);function adjustHeight(){var a=y.find('.dgHeader').outerHeight()+y.find('.dgContentTable').outerHeight();var b=y.find('.dgContentTable').outerWidth(),contentTableHeight=y.find('.dgContentTable').outerHeight(),contentWidth=y.find('.dgContent').outerWidth(),contentHeight=y.find('.dgContent').outerHeight();if(x.showFooter){a+=y.find('.dgFooter').outerHeight()}if(a<x.height){if(b>contentWidth){y.height(a+19);y.find('.dgContent').height(contentTableHeight+18)}else{y.height(a);y.find('.dgContent').height(contentTableHeight)}if(x.hasFirstCol){var c=y.find('.dgHeader').outerHeight();var d=x.showFooter?y.find('.dgFooter').outerHeight():0;if(x.hasFirstCol){y.find('.dgFirstCol .tableCon').css({'height':y.outerHeight()-c-d-3})}}}adjustAble=false};function headerWidthSet(){dgWidth=y.width()-18;var d=widthSum/dgWidth;widthArrNew=[];var e=0;$.each(widthArrFixed,function(a,b){if(x.autoWidth){var c=Math.floor(b/d)-x.gapWidth;c=c<b?b:c;e+=c+x.gapWidth}else{var c=b;e+=parseInt(c)+x.gapWidth}y.find('.dgHeader .dgHeaderTr td').eq(a).find('.dgHeaderTdDiv').width(c);y.find('.dgHeader .colResize div').eq(a).attr('widthstatic',c);y.find('.dgHeader .colResize div').eq(a).css('left',(e-3));widthArrNew.push(c)});z=widthArrNew}function contentWidthSet(){z=[];var b=y.find('.dgHeader .dgHeaderTr td .dgHeaderTdDiv');b.each(function(a){z.push(parseInt($(this).css('width')))});var c=y.find('.dgContentTable tr');c.each(function(a){$(this).find('td').each(function(i){$(this).find('.dgContentInnerDiv').width(z[i])})})}function dgTrColor(){var a=y.find('.dgFirstCol .tableCon tr');var b=y.find('.dgContentTable tr');a.filter(':odd').addClass('trOdd');b.filter(':odd').addClass('trOdd');a.hover(function(){$(this).addClass('trHover');b.eq(a.index($(this))).addClass('trHover')},function(){$(this).removeClass('trHover');b.eq(a.index($(this))).removeClass('trHover')});a.die().live('click',function(){$(this).addClass('trClick').siblings().removeClass('trClick');b.eq(a.index($(this))).addClass('trClick').siblings().removeClass('trClick')});b.hover(function(){$(this).addClass('trHover');a.eq(b.index($(this))).addClass('trHover')},function(){$(this).removeClass('trHover');a.eq(b.index($(this))).removeClass('trHover')});b.die().live('click',function(){$(this).addClass('trClick').siblings().removeClass('trClick');a.eq(b.index($(this))).addClass('trClick').siblings().removeClass('trClick')})};function firstColTdHeightResize(){var a=y.find('.dgContentTable tr'),firstColTd=y.find('.dgFirstCol .tableCon tr');var n=0;firstColTd.each(function(i,v){if($(this).attr('rowspan')&&$(this).attr('rowspan')!=1){n++;return true}$(this).height(a.eq(i-n).outerHeight())})};function fillContent(p,q,r){var s=y.find('.dgHeader .dgHeaderTr td .dgHeaderTdDiv');z=[];s.each(function(a){z.push(parseInt($(this).css('width')))});y.find('.dgHeader').css('margin-left','0px');y.find('.dgLoading').css({'width':y.outerWidth(),'height':y.outerHeight()}).show();var t={'page':p,'rows':q};if(x.dataParam){$.extend(t,x.dataParam)};if(x.sortType=='ajax'){$.extend(t,{'sortRule':x.sortRule,'sortOrderBy':x.sortOrderBy})}r&&$.extend(t,{'getDataTotal':1});$.ajax({url:x.url,type:x.method,data:t,dataType:'json',timeout:x.timeout*1000,success:function(e){x.debugAjax&&window.console&&console.log(e);var f='',dgFirstColTableStr='';var g=y.find('.rowNum').val(),rowspanName,rowspanMap={};$.each(e.rows,function(c,d){if(x.hasFirstCol){if(x.firstRowspan!==false){dgFirstColTableStr+='<tr>';rowspanName=d.firstRowspanName;if(rowspanMap[rowspanName]==undefined){rowspanMap[rowspanName]=1;dgFirstColTableStr+='<td width="80" row="'+rowspanName+'" rowspan="0">'+rowspanName+'</td>'}else{rowspanMap[rowspanName]=++rowspanMap[rowspanName]}dgFirstColTableStr+='<td width='+x.firstColWidth+'>'+d.firstCol+'</td>';dgFirstColTableStr+='</tr>'}else{dgFirstColTableStr+='<tr><td width='+x.firstColWidth+'>'+((p-1)*g+1+c)+'</td></tr>'}}f+='<tr>';for(var i=0;i<L.length;i++){var j=0;$.each(d,function(k,v){if(k.toLowerCase()==(L[i]).toLowerCase()){var a=(z[i]==0)?' style="display:none;"':'';var b=(formatterArr[i]==0)?v:formatterArr[i](d);f+='<td field="'+L[i]+'"'+a+'><div class="dgContentInnerDiv" style="width:'+z[i]+'px; text-align:'+alignArr[i]+';">'+b+'</div></td>';j=1}});if(j==0){f+='<td field="'+L[i]+'"><div class="dgContentInnerDiv" style="width:'+z[i]+'px; text-align:'+alignArr[i]+';">'+formatterArr[i](d)+'</div></td>'}}f+='</tr>'});y.find('.dgLoading').hide();y.find('.dgContentTable').html(f);if(x.hasFirstCol){y.find('.dgFirstCol .tableCon table').html(dgFirstColTableStr);var h=y.find('.dgFirstCol .tableCon td');h.each(function(i,v){if($(this).attr('row')){$(this).attr('rowspan',rowspanMap[$(this).attr('row')]);return}})};if(x.conDivAuto){y.find('.dgContentTable .dgContentInnerDiv').addClass('auto');firstColTdHeightResize();var l=y.find('.dgHeader').outerHeight();var m=x.showFooter?y.find('.dgFooter').outerHeight():0;if(x.hasFirstCol){y.find('.dgFirstCol .tableCon').css({'height':y.outerHeight()-l-m-3})}y.find('.dgResizeRight').css('height',y.outerHeight())};if(x.dgAutoHeight){var l=y.find('.dgHeader').outerHeight(),m=x.showFooter?y.find('.dgFooter').outerHeight():0,dgContentHeight=y.find('.dgContentTable').outerHeight();y.find('.dgContent').height(dgContentHeight);y.height(l+m+dgContentHeight);if(x.hasFirstCol){y.find('.dgFirstCol .tableCon').css({'height':y.outerHeight()-l-m-3})}};var n=r?e.total:y.find('.total').html();y.find('.pageNow').val(e.page);y.find('.total').html(n);y.find('.pageTotal').html(Math.ceil(n/g));y.find('.itemStart').html((p-1)*g+1);if(p*g<n){y.find('.itemEnd').html(p*g)}else{y.find('.itemEnd').html(n)}if(e.page==1){y.find('.pageFirst').removeClass('pageFirstAble');y.find('.pagePrev').removeClass('pagePrevAble')}else{y.find('.pageFirst').addClass('pageFirstAble');y.find('.pagePrev').addClass('pagePrevAble')}if(e.page==y.find('.pageTotal').html()){y.find('.pageNext').removeClass('pageNextAble');y.find('.pageLast').removeClass('pageLastAble')}else{y.find('.pageNext').addClass('pageNextAble');y.find('.pageLast').addClass('pageLastAble')}dgTrColor();A=null;if(x.heightAdjust){adjustAble&&adjustHeight()}var o=y.find('.dgContent').scrollLeft();if(o>1){y.find('.dgContent').scrollLeft(o-1);y.find('.dgContent').scrollLeft(o)}x.ajaxCallback(e,y)},error:function(a,b){if(b=='timeout'){alert(x.timeoutMsg)}y.find('.dgLoading').hide()}})}};
	
	/*2014.3.5 hekui 修复排序功能及Dom操作优化*/
	$.fn.DatagridContenter = function(q){var s={width:'',height:312,url:'',method:'POST',dataParam:{},columns:[],initCallback:function(a){},ajaxCallback:function(a,b){},pageRowList:[10,20,30,50,100],pageRowSelected:10,sortType:'ajax',sortRule:'desc',sortOrderBy:'',autoWidth:true,gapWidth:9,showFooter:true,colShow:false,colResize:false,dgResize:true,headerColspan:false,firstRowspan:false,loadingMsg:'数据加载中。。。',errorMsg:'服务器错误！',timeout:300,timeoutMsg:'数据量太大，暂时无法查询出来！',heightAdjust:true,dgHeaderHeight:false,hasFirstCol:true,firstColWidth:25,firstColHeaderName:'',firstColData:[],staticData:false,conDivAuto:false,dgAutoHeight:false,debugAjax:false,beforeAjax:function(){},ajaxData:''};var t=$.extend({},s,q);var u=$(this);var w=[],widthSum=0,dgWidth=0,widthArrFixed=[],adjustAble=true;var x=null;u.addClass('dg').show();u.html('').removeAttr('inited').removeAttr('widtharrfixed').removeAttr('widthsum').height('');u.width(t.width);u.append('<div class="dgLoading"><div class="dgLoadingCon">'+t.loadingMsg+'</div></div>');u.append('<div class="dgContent"><table class="dgContentTable" border="0" cellpadding="0" cellspacing="0" style="width:100%; background:#fff;"><thead class="dgHeader"><tr></tr></thead><tbody></tbody></table></div>');var y=[],formatterArr=[],alignArr=[],w=[],titleArr=[],sortArry=[];$.each(t.columns,function(b,c){var d=0,_sortHas=0;$.each(c,function(k,v){var a=false;if(k=='field'){y.push(v)}else if(k=='title'){titleArr.push(v)}else if(k=='align'){alignArr.push(v)}else if(k=='width'){w.push(v)}else if(k=='formatter'){formatterArr.push(v);d=1}else if(k=='sortable'){sortArry.push(v);_sortHas=1}});if(d==0){formatterArr.push(0)}if(_sortHas==0){sortArry.push(false)}});var z=0;for(var i=0,len=w.length;i<len;i++){z+=w[i]}for(var i=0,len=w.length;i<len;i++){w[i]=parseInt(w[i]/z*100)}var A=u.find('.dgContentTable thead tr');var B="";for(var i=0;i<y.length;i++){if(sortArry[i]==true){if(t.sortOrderBy==y[i]){B+='<th style="text-align:'+alignArr[i]+'" field="'+y[i]+'"><div class="sortable sortabledesc"  sortrule="desc">'+titleArr[i]+'</div></th>'}else{B+='<th style="text-align:'+alignArr[i]+'" field="'+y[i]+'"><div class="sortable">'+titleArr[i]+'</div></th>'}}else{B+='<th style="text-align:'+alignArr[i]+'" field="'+y[i]+'">'+titleArr[i]+'</th>'}}A.append(B);B="";var C='';$.each(t.pageRowList,function(a,b){if(b==t.pageRowSelected){C+='<option value="'+b+'" selected>'+b+'</option>'}else{C+='<option value="'+b+'">'+b+'</option>'}});u.append('<div class="dgFooter">'+'<div class="dgPage"><select class="rowNum">'+C+'</select>&nbsp;&nbsp;'+'<span><a href="javascript:;" class="pageFirst pageFirstAble">首页</a></span>'+'<span><a href="javascript:;" class="pagePrev pagePrevAble">上一页</a></span> '+'<input type="text" class="pageNow" value="0" /> / <b class="pageTotal"></b> '+'<span><a href="javascript:;" class="pageNext pageNextAble">下一页</a></span>'+'<span><a href="javascript:;" class="pageLast pageLastAble">末页</a></span>&nbsp;&nbsp;'+'转到 <input type="text" class="pageGo" value="0" size="3"/> '+'<a href="javascript:;" class="pageGoBtn">Go</a>'+'</div>'+'<div class="dgPageStatus">显示记录从<b class="itemStart"></b>到<b class="itemEnd"></b>, 总数 <b class="total"></b>条'+'</div></div>');if(t.showFooter){u.find('.dgFooter').show()}u.find('.dgPage span').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});u.find('.rowNum').change(function(){fillContent(1,u.find('.rowNum').val());return false});u.find('.pageFirstAble').click(function(){fillContent(1,u.find('.rowNum').val());return false});u.find('.pagePrevAble').click(function(){var a=u.find('.pageNow').val();if(a>1){fillContent(parseInt(a)-1,u.find('.rowNum').val())}else{fillContent(1,u.find('.rowNum').val())}return false});u.find('.pageNextAble').click(function(){var a=u.find('.pageNow').val();var b=u.find('.pageTotal').html();if(parseInt(a)<parseInt(b)){fillContent(parseInt(a)+1,u.find('.rowNum').val())}else{fillContent(b,u.find('.rowNum').val())}});u.find('.pageLastAble').click(function(){fillContent(parseInt(u.find('.pageTotal').html()),u.find('.rowNum').val());return false});u.find('.pageGoBtn').click(function(){var r=/^\+?[1-9][0-9]*$/;var a=u.find('.pageGo');if(r.test(a.val())==false){alert('页码输入格式出错！');a.val('1');return}if(a.val()>parseInt(u.find('.pageTotal').html())){alert('不能超出最大页码！');$(this).val('1');return}fillContent(parseInt(a.val()),u.find('.rowNum').val());return false});u.find('.sortable').click(function(){u.find('.sortable').removeClass('sortableasc sortabledesc');if($(this).attr('sortRule')=='desc'){$(this).removeClass('sortabledesc');$(this).addClass('sortableasc');$(this).attr('sortRule','asc');t.sortRule='asc'}else{$(this).removeClass('sortableasc');$(this).addClass('sortabledesc');$(this).attr('sortRule','desc');t.sortRule='desc'}t.sortOrderBy=$(this).parent().attr('field');if(t.sortType=='ajax'){fillContent(1,u.find('.rowNum').val())}else{var a=$(this).parent().attr('datatype');var b=u.find('.dgHeader .dgHeaderTr td').index($(this).parent());sortTableLocal(b,t.sortRule,a)}return false});fillContent(1,u.find('.rowNum').val(),true);t.initCallback(u);function fillContent(m,n,o){t.beforeAjax();u.find('.dgLoading').css({'width':u.outerWidth(),'height':u.outerHeight()}).show();if(m==1&&t.ajaxData!=''&&t.ajaxData.rows.length==n){loopData(t.ajaxData);return}var p={'page':m,'rows':n};if(t.dataParam){$.extend(p,t.dataParam)};if(t.sortType=='ajax'){$.extend(p,{'sortRule':t.sortRule,'sortOrderBy':t.sortOrderBy})}o&&$.extend(p,{'getDataTotal':1});$.ajax({url:t.url,type:t.method,data:p,dataType:'json',timeout:t.timeout*1000,success:function(a){loopData(a)},error:function(a,b){if(b=='timeout'){alert(t.timeoutMsg)}u.find('.dgLoading').hide()}});function loopData(e){var f='',dgFirstColTableStr='';var g=u.find('.rowNum').val(),rowspanName,rowspanMap={};$.each(e.rows,function(c,d){f+='<tr>';for(var i=0;i<y.length;i++){var j=0;$.each(d,function(k,v){if(k==y[i]){var a=(w[i]==0)?' style="display:none;"':'';var b=(formatterArr[i]==0)?v:formatterArr[i](d);f+='<td class="noBorder" field="'+y[i]+'"'+a+' style="width:'+w[i]+'%; text-align:'+alignArr[i]+'">'+b+'</td>';j=1}});if(j==0){f+='<td class="noBorder" field="'+y[i]+'" style="width:'+w[i]+'%; text-align:'+alignArr[i]+'">'+formatterArr[i](d)+'</td>'}}f+='</tr>'});u.find('.dgLoading').hide();u.find('.dgContentTable tbody').html(f);var h=o?e.total:u.find('.total').html();u.find('.pageNow').val(e.page);u.find('.total').html(h);u.find('.pageTotal').html(Math.ceil(h/g));u.find('.itemStart').html((m-1)*g+1);if(m*g<h){u.find('.itemEnd').html(m*g)}else{u.find('.itemEnd').html(h)}if(e.page==1){u.find('.pageFirst').removeClass('pageFirstAble');u.find('.pagePrev').removeClass('pagePrevAble')}else{u.find('.pageFirst').addClass('pageFirstAble');u.find('.pagePrev').addClass('pagePrevAble')}if(e.page==u.find('.pageTotal').html()){u.find('.pageNext').removeClass('pageNextAble');u.find('.pageLast').removeClass('pageLastAble')}else{u.find('.pageNext').addClass('pageNextAble');u.find('.pageLast').addClass('pageLastAble')}var l=u.find('.dgContentTable tbody tr');l.filter(':even').addClass('trOdd');t.ajaxCallback(e,u)}}};
	
});
