define(function(require){
	$(function(){	
	$('#Tab li').click(function(){
		$('#Tab li').removeClass('current currentIndex1');
		$(this).addClass('current');
		
		var idx = $(this).attr('page');
		if(idx == 'old'){		
			$('#RegPage').html('');
			$('#Page').html(tempHtmlOld);
				$('#Page').show();
			$('#RegPage').hide();
			var d = new Date();
			require.async('sdk/sdkInterview.js?'+d.getTime());
			$('#oldPages').attr('data-main','script/sdk/sdkInterview.js'+d.getTime());
		}else{
			$('#Page').html('');
			$('#RegPage').html(tempHtmlNew);
			var d = new Date();
			require.async('sdk/sdkInterviewReg.js?'+d.getTime());
			$('#Page').hide();
			$('#RegPage').show();
			$('#oldPages').attr('data-main','script/sdk/sdkInterviewReg.js?'+d.getTime());			
		}
	});
	});
});