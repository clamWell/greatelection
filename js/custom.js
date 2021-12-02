var ieTest = false,
	screenWidth = $(window).width(),
	screenHeight = $(window).height(),
	imgURL = "http://img.khan.co.kr/spko/storytelling/2022/greatelection/",
	isMobile = screenWidth <= 800 && true || false,
	isNotebook = (screenWidth <= 1380 && screenHeight < 750) && true || false,
	isMobileLandscape = ( screenWidth > 400 && screenWidth <= 800 && screenHeight < 450 ) && true || false;
	window.onbeforeunload = function(){ window.scrollTo(0, 0) ;}
var randomRange = function(n1, n2) {
	return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
};





/******** 모바일 전용 조정 ********/
if(isMobile==true){
	
}else{

}
/******** 모바일 전용 조정 ********/


$(function(){


    var ieUnder = false;
	var isIe =false;
    function checkIe(){
        var word;
		var agent = navigator.userAgent.toLowerCase(); 
        if (  (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1)|| (agent.indexOf("msie") !== -1)) {
			if (navigator.userAgent.indexOf("MSIE") >= 0) { 
				isIe = true;
				ieUnder = true;
			}else{
				isIe = true;
			}
            return true;
        }else {
            return false;
        }
    }
    checkIe();


	/*								*/
	/*------  INTRO ANIMATION	-----*/
	/*								*/




	/*								*/
	/*------  INTRO ANIMATION	-----*/
	/*								*/


	var GameSetting = {
		settingViewPort: function(){
			var gw, gh, mt_gap;
			var $gameVP = $(".script-width");
			if(screenWidth < 1200){
				gw = screenWidth-50;
				gh = gw*2/3;
			}else if(screenWidth>=1200){
				gw = 1200;
				gh = gw*2/3;
			}
			if(gh>screenHeight){
				gh = screenHeight-30;
				gw =gh*3/2;
				mt_gap = 20;
			}else{
				mt_gap = (screenHeight -gh)/2;
			}
			console.log(gw, gh, mt_gap);
			$gameVP.css({"width": gw+"px", "height": gh+"px","top": mt_gap+"px"});
			$("html, body").css("font-size", (gw * 16 / 1200) + "px");
		},
		gameViewPortMode: "default",
	}

	GameSetting.settingViewPort();
	$(window).resize(function() {
		screenWidth = $(window).width();
		screenHeight = $(window).height();
		GameSetting.settingViewPort();
	});

	var UserGameData = {
		stage:0,
		userName:"모이모이"
	};
		
	function init(){
        if(isMobile==true){

        }else{

        }		

	}

	/***** 오프닝 *****/
	$("#OPENING_START").on("click",function(){
		$(".opening").fadeOut(1000);
		$(".opening-stage").delay(1400).fadeIn(1000);
		UserGameData.stage = 1; 
	});
	$(".chat-input-txt").focus(function(){
		$(this).val("");
	});
	$("#START_GAME").on("click",function(){
		$(".opening-stage-el--01").hide();
		$(".opening-stage-el--02").show();
		UserGameData.stage = 2; 
	});

	$("#USER_ID_CONF").on("click",function(){
		$(".opening-stage").fadeOut(1000);
		UserGameData.userName = $("#userName").val();
		console.log(UserGameData.userName+"님 안녕하세요");
		UserGameData.stage = 3; 
		$(".main-stage").delay(1400).fadeIn(1000);
	});
	/***** 오프닝 *****/



	init();
	$(".loading-page").fadeOut(1000, function(){
		$(".after-load").animate({"opacity":"1"}, 1000);
	});

	var titleAniDone = false;
	function activTitlePathAni(){
		var $titlePath = $("#PAGE_TITLE path");
		for(t=0; t<$titlePath.length;t++){
			$titlePath.eq(t).delay(t*50).animate({"stroke-dashoffset":"0", "fill-opacity":"1"}, 4500);
			if(t == $titlePath.length-1){
				titleAniDone = true;
			}
		};
	}


	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
	
	});


});



function sendSns(s) {
  var url = encodeURIComponent(location.href),
	  txt = encodeURIComponent($("title").html());
  switch (s) {
    case 'facebook':
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
      break;
    case 'twitter':
      window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
      break;
  }
}
