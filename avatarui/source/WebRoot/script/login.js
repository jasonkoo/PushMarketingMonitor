var timeID = 0 ,Interval = 7500 , opTime = 1100; 
$(function(){
	$('.sub').css('margin-left','-0.5px');
	clearLabel();
	setTimeout(clearLabel,800);
	setTimeout(showPicInterval , Interval);
	
	$('label').mousedown(function(){
		var id=$(this).next().attr('id');
		$('#'+id).focus();
	}); 
 //输入框判断	
	$('.text').focus(function(){
		$(this).prev().hide();
		$(this).attr("class","text focus") ;
	});
	$('.text').blur(function(){
		if($(this).val()){
		}else{
		  $(this).attr("class","text") ;
		  $(this).prev().show();
		}
	});
//验证码判断	 
	$('.code').focus(function(){
		$('#codeLabel').hide()
		$(this).attr("class","code codeFocus") ;
	});

	$('.code').blur(function(){
		if($(this).val()){
		}else{
		$(this).attr("class","code") ;
		$('#codeLabel').show();
		}
	});
 //左右按钮
	$('.leftBtn , .rightBtn').click(function(){
		clearTimeout(timeID);
		showPicInterval();
	});
   
 });
	function showPicInterval(){
		clearLabel();
		var idx = $('.show').attr('id').toString().substring(3);
		var showIdx= parseInt(idx)+1;
		if(showIdx == 2 ){
			showIdx = 0;
		}
		 $('#showPic'+idx).stop().animate({opacity: '0'},opTime);   
		 $('#showPic'+showIdx).stop().animate({opacity: '1'},opTime);  
		 $('.picBtns').find('a').attr("class","hide") ;
		 $('#pic'+showIdx).attr("class","show") ;
		 timeID = setTimeout(function(){
				showPicInterval();
		  },Interval);
	}
	function clearLabel(){
		$('.text').each(function(){
		if($(this).val()){
			$(this).prev().hide();
			}			 
		 });
		if($('.code').val()){
			$('#codeLabel').hide();
		}
		var ua = navigator.userAgent; 
		if(ua.indexOf("Windows NT 5.1")!=-1){ 
			$('#ie9').hide();
		}
	}