$(function(){
$('#ReportList').find('li').show();
$('.leftSide').show();
$('.leftSide').find('dl').show();
$('.leftSide').find('.secondLevel').show();
$('.leftSide').find('li').show();
$('.leftSide').show();
var timerChannel, channel = $("#Channel");
		channel.hover(function () {
		        clearInterval(timerChannel);
		        timerChannel = setTimeout(function () {
		        	channel.css('z-index',999999); 
		        	channel.find("ul").show();
		        	channel.find(".channelSwitch").addClass("channelSwitchHover")
		        }, 150)
		    }, function () {
		        clearInterval(timerChannel);
		        timerChannel = setTimeout(function () {
		        	channel.css('z-index',0); 
		        	channel.find("ul").hide();
		        	channel.find(".channelSwitch").removeClass("channelSwitchHover")
		        }, 300)
		    });
		//链接的hover效果
	    $('.hoverSpan').hover(function(){
	    	$(this).stop().animate({opacity:0},"fast");
	    },function(){
	    	$(this).stop().animate({opacity:1},"fast");
	    });
$(".leftSide dt").live('click', function () {
		        $(this).parent().find("dd").slideToggle(150)
		    });
		    $('#LeftSideMenu dl .title').live('click', function(){
		        var thisDl = $(this).parent();
		        thisDl.find('ul').slideToggle(200);
		        
		        var thisArrow = $(this).find('span');
		        if(thisArrow.hasClass('arrowBottom')){
		            thisArrow.removeClass('arrowBottom').addClass('arrowRight');
		        }else{
		            thisArrow.removeClass('arrowRight').addClass('arrowBottom');
		        };
		    });
});