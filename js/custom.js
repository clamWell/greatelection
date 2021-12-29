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

function checkMobile(){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
		isMobile = true;
		return true;
	}else{
		isMobile = false;
		return false;
	}
}
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
function isMobileSafari(){
    if(isSafari == true){
        screenHeight = $("#WIN_HEIGHT").height();
    }
}
checkMobile();
isMobileSafari();
$(".close-ie-block").on("click", function(){
    $(".ie-block").hide();
})

var ieUnder = false;
var isIe =false;
function checkIe(){
    var word;
    var agent = navigator.userAgent.toLowerCase();
    if (  (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1)|| (agent.indexOf("msie") !== -1)) {
        if (navigator.userAgent.indexOf("MSIE") >= 0) {
            isIe = true;
            ieUnder = true;
            //$(".ie-block-9").show();
        }else{

            isIe = true;
            //$(".ie-block-allie").show();
        }
        return true;
    }else {
        return false;
    }
}
checkIe();


//사용자의 선택 값을 담는 객체
var userSelectData = {
		"b2": {
			1: null,
			2: null
		},
		"b3":{
			1: null,
			2: null
		},
		"b4":{
			1: null,
			2: null
		},
		"b5":{
			1: null,
			2: null
		},
		"b6":{
			1: null,
			2: null
		},
		"b7":{
			1: null,
			2: null
		},
		"b8":{
			1: null,
			2: null
		}
	};

//테스트용
var userSelectData2 = {
		"b2": {
			1: null,
			2: null
		},
		"b3":{
			1: null,
			2: null
		},
		"b4":{
			1: null,
			2: null
		},
		"b5":{
			1: null,
			2: null
		},
		"b6":{
			1: null,
			2: null
		},
		"b7":{
			1: null,
			2: null
		},
		"b8":{
			1: null,
			2: null
		}
	};

function putRandVal(){
	var keys = Object.keys(userSelectData);
	for (i = 0; i < keys.length; i++) {
		var key = keys[i]
		var value = userSelectData[key]

		var	keys2 = Object.keys(value);
		for (k = 0; k < keys2.length; k++) {
			var key2 = keys2[k]
			userSelectData[key][key2] = randomRange(1,4);
		}
	}
	console.log(userSelectData)

};

var candName = ["이재명","윤석열","심상정","안철수"],
	candCountry = ["숭늉나라", "찌개나라","소보로나라", "파스타나라"],
	candthumb = ["lee", "yoon","sim", "ahn"],
	MatchCandIdxArr = new Array,
	UserMatchMaxVal,
	countArr;
function countUserSelect(){ //사용자 선택 값 체크해서 후보자별로 분류하고, 가장 높은 값 체크
	countArr = [0,0,0,0]; // 차례대로 이윤심안
	var keys = Object.keys(userSelectData);
	for (i = 0; i < keys.length; i++) {
		var key = keys[i]
		var value = userSelectData[key]

		var	keys2 = Object.keys(value);
		for (k = 0; k < keys2.length; k++) {
			var key2 = keys2[k]
			var v = userSelectData[key][key2];
			countArr[v-1] += 1;
		}
	}
	console.log( countArr);
	UserMatchMaxVal = countArr.reduce(function(a, b) {
		return Math.max(a, b);
	});
	console.log("매칭된 가장 높은 개수는 "+UserMatchMaxVal)

	for (i = 0; i < countArr.length; i++) {
		var vv =  countArr[i];
		if(vv == UserMatchMaxVal){
			MatchCandIdxArr.push( candName[i] )
		}
	}
	console.log(MatchCandIdxArr);
	return MatchCandIdxArr;
}



/******** 모바일 전용 조정 ********/
if(isMobile==true){
	$(".select-history-pc").remove();
	$(".chat-inner-btn.chat-return-btn").remove();
}else{
	$(".select-history-mobile").remove();
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


    //키보드 키 셋팅
    var KEY_CODES = {
        81: 'q',
        87: 'w',
        69: 'e',
        13: 'enter',
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    }

    var KEY_STATUS = {};
    for (code in KEY_CODES) {
      KEY_STATUS[KEY_CODES[code]] = false;
    }
    //console.log(KEY_STATUS);
    KEY_STATUS.double = false;
    KEY_STATUS.enterCheck = false;


    //전체 크기 설정 및 뷰포트 설정
	var GameSetting = {
		gameViewPortMode: "default",
		settingViewPort: function(){
			var gw, gh, mt_gap;
			var $gameVP = $(".script-width");
			if(isMobile==true){

				gw = screenWidth;
				gh = screenHeight;
                //if(isSafari = true){ gh = screenHeight- 70 }
				this.gameViewPortMode = "mobile";
				console.log(gw, gh, mt_gap);
				//$gameVP.css({"width": gw+"px", "height": gh+"px"});
                $gameVP.css({"width": gw+"px", "height": "100%"});
				$("html, body").css("font-size", (gw * 16 / 800) + "px");



				$(".game-screen-square").css({"width": gw+"px", "height": gw+"px"});
				/*var panel_width = (gw - gh)/2;
				$(".each-panel").css({"width": panel_width+"px"});*/

			}else{
				if(screenWidth < 1200){
					gw = screenWidth-50;
					gh = gw*2/3;
				}else if(screenWidth>=1200){
					gw = 1200;
					gh = gw*2/3;
					this.gameViewPortMode = "wider1200";
				}
				if(gh>screenHeight){
					gh = screenHeight-30;
					gw =gh*3/2;
					mt_gap = 20;
					this.gameViewPortMode = "narrow";
				}else{
					mt_gap = (screenHeight -gh)/2;
				}
				//console.log(gw, gh, mt_gap);
				$gameVP.css({"width": gw+"px", "height": gh+"px","top": mt_gap+"px"});
				$("html, body").css("font-size", (gw * 16 / 1200) + "px");

				var panel_width = (gw - gh)/2;
				$(".game-screen-square").css({"width": gh+"px", "height": gh+"px"});
				$(".each-panel").css({"width": panel_width+"px"});
			}

		}
	}


	$(window).resize(function() {
		//screenWidth = $(window).width();
		//screenHeight = $(window).height();
		//GameSetting.settingViewPort();
        //GameMap.scaleSetting();
	});

    //sound설정
    var gameSound = {
        bgm : null,
        walk: null,
        click: null,
		building: null,
		alert: null,

        settingSound: function(){
		    this.bgm = new Audio("sound/bgm.mp3");
            this.bgm.type = "audio/mp3";
            this.bgm.loop = true;
            this.bgm.load();
            this.bgm.volume = .4;

			this.building = new Audio("sound/b2_bgm.mp3");
            this.building.type = "audio/mp3";
			this.bgm.loop = true;
            this.building.volume = .4;
            this.building.load();

            this.walk = new Audio("sound/walk.mp3");
            this.walk.type = "audio/mp3";
            this.walk.volume = 1;
            this.walk.load();

            this.click = new Audio("sound/click.mp3");
            this.click.type = "audio/mp3";
            this.click.volume = .4;
            this.click.load();

            this.alert = new Audio("sound/alert.mp3");
            this.alert.type = "audio/mp3";
            this.alert.volume = .5;
            this.alert.load();
        }
	}




    var GameMap = {
        //지도에 추후 건물, NPC 추가
        map: [
		   //1,2,3,4,5,6,7,8,9,10 12  14  16  18  20  22  24  26  28  30  32  34  36  38  40  42  44  46  48  50
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //1
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //2
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //3
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1], //4
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1], //5
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,6,1,1,1,1,1], //6 //기지국
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,1,1], //7
			[1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,0,1,1,1,1], //8
			[1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,1,0,1,1,1,1,1,1], //9
			[1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,1,0,0,0,1,0,1,0,0,1,1,1], //10
			[1,1,1,1,2,0,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,1,0,1,1,0,0,0,1,0,1,1,1,1,0,1,1,1,1,1,1], //11
			[1,1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1], //12
			[1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,1,1], //13 //광장위
			[1,1,1,1,0,1,1,0,1,1,0,1,1,1,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1], //14
			[1,1,1,0,0,1,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,1,1,1], //15
			[1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1], //16
			[1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,4,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1], //17
			[1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,0,1,0,1,0,1,1,0,0,1,1,1], //18
			[1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1], //19 //아고라
			[1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1], //20
			[1,1,1,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1], //21
			[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1], //22
			[1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1], //23
			[1,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,0,0,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1], //24
			[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,1,1,7,1,1,1,1,1], //25 //아고라
			[1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,0,1,1], //26
			[1,1,1,0,0,0,0,0,0,1,1,0,3,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,0,1,1,1,1], //27 //여관
			[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,0,1,1,1,1,0,0,1,1,0,0,0,1,1,1], //28
			[1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,0,0,0,0,0,1,0,1,1,1], //29
			[1,1,1,1,1,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1], //30
			[1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,1,1,0,1,1,1], //31
			[1,1,1,1,1,1,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,1,1], //32
			[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1], //33 항구 벽돌
			[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,8,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1], //34
			[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1], //35
			[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1], //36
			[1,1,1,1,1,1,0,0,1,1,0,0,0,1,1,0,1,1,0,0,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //37
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //38 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //39 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //40 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1], //41 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1], //42 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //43 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //44 > 바다
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //45 > 바다
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //46 > 바다
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //47 > 바다
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //48 > 바다
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //49 > 바다
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //50 > 바다
        ],
        mapW: 0,
        mapH: 0,
        move: 0,
        playerX: 0, //사용자 X,Y초기 위치
        playerY: 0,
        myPoX: 0,
        myPoY: 0,
        completed: false,
        Xcompleted: false,
        freezed: true,
		multipleValue: (isMobile==true)? 7:9,
		adjustValue: (isMobile==true)? 3:4,
		move: 0,

        defaultPositionSetting: function(){
			/*
            this.mapW = $(".game-map").width() * 2500 / 500;
            this.mapH = $(".game-map").height() * 2500 / 500;
            this.move = $(".game-map").width() / 5;*/


			this.move = $(".game-map").width() / this.multipleValue;
			this.mapW = $(".game-map").width() * 50 / this.multipleValue;
            this.mapH = $(".game-map").height() * 50 / this.multipleValue;


            console.log(this.move);
            $(".map-img").css({"width": this.mapW, "height": this.mapH});
            $(".map-el-holder").css({"width": this.mapW, "height": this.mapH});
            $(".player-holder").css({"width": this.move, "height": this.move});
            $(".player-holder").css({"top": this.move*this.adjustValue+"px", "left": this.move*this.adjustValue+"px"});
			$(".game-map").css({"top": (this.move*this.adjustValue)+"px", "left": (this.move*this.adjustValue)+"px"});

			//포탈
			$(".portal").css({"width": this.move});
			$(".portal-b2").css({"top":10.5*this.move+"px", "left": 4*this.move+"px"}); // 11, 5
            $(".portal-b3").css({"top":26.5*this.move+"px", "left": 12*this.move+"px"}); //13, 27
            $(".portal-b5").css({"top":27.5*this.move+"px", "left": 27*this.move+"px"}); //28, 28
            $(".portal-b6").css({"top":5.5*this.move+"px", "left": 44*this.move+"px"}); //45, 6
            $(".portal-b7").css({"top":24.5*this.move+"px", "left": 44*this.move+"px"}); //45, 25

            //NPC
            $(".npc-01").css({"width": this.move, "top":12*this.move+"px", "left": 28*this.move+"px" });//원로
            $(".npc-02").css({"width": this.move, "top":16*this.move+"px", "left": 28*this.move+"px" });//광장
            $(".npc-03").css({"width": this.move*2, "top":32.5*this.move+"px", "left": 25.5*this.move+"px" });//선원
			$(".npc-04").css({"width": this.move*0.7, "top":14*this.move+"px", "left": 15.3*this.move+"px" });//무가당
			$(".npc-04-2").css({"width": this.move*0.7, "top":25*this.move+"px", "left": 4.3*this.move+"px" });//무가당
			$(".npc-04-3").css({"width": this.move*0.7, "top":34*this.move+"px", "left": 45.3*this.move+"px" });//무가당
			$(".npc-05").css({"width": this.move*1, "top":7*this.move+"px", "left": 23*this.move+"px" });//제작자
			$(".npc-06").css({"width": this.move*5, "top":38*this.move+"px", "left": 25.5*this.move+"px" });//배
			$(".btn-01").css({"width": this.move*3, "top":39*this.move+"px", "left": 27*this.move+"px" });//항해하기버튼
            $(".map-npc .question-icon").css({"width": this.move/3});


			//맵 초기 위치
            $(".map-img").css({left : "-=" + this.move * (21)+ "px", top : "-=" + this.move * (15)+ "px"});
            $(".map-el-holder").css({left : "-=" + this.move * (21)+ "px", top : "-=" + this.move * (15)+ "px"});

            GameMap.myPoX -= this.move *(21);
            GameMap.myPoY -= this.move *(15);
            this.playerX = 21;
            this.playerY = 15;

            $(".player-holder").fadeIn(1000, function(){
                GameMap.freezed = false;
            });
        },
        scaleSetting: function(){
			/*
            this.mapW = $(".game-map").width() * 2500 / 500;
            this.mapH = $(".game-map").height() * 2500 / 500;
            this.move = $(".game-map").width() * 2500 / 500 / 25;*/
			this.move = $(".game-map").width() / this.multipleValue;
			this.mapW = $(".game-map").width() * 50 / this.multipleValue;
            this.mapH = $(".game-map").height() * 50 / this.multipleValue;

            console.log(this.move);
            $(".map-img").css({"width": this.mapW, "height": this.mapH});
            $(".map-el-holder").css({"width": this.mapW, "height": this.mapH});
            $(".player-holder").css({"width": this.move, "height": this.move});
            $(".player-holder").css({"top": this.move*((this.multipleValue-1)/2)+"px", "left": this.move*((this.multipleValue-1)/2)+"px"});

        },
        moveleft: function(change){
            if (!isMuteOn ){  gameSound.walk.play(); }

            if (GameMap.map[GameMap.playerY][GameMap.playerX-1] != 1 && GameMap.freezed === false && GameMap.map[GameMap.playerY][GameMap.playerX-1] != undefined){

                GameMap.playerX -= 1;
                GameMap.myPoX += GameMap.move;
                $(".map-img").css("left", GameMap.myPoX);
                $(".map-el-holder").css("left", GameMap.myPoX);
				if(change==true)$(".player img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/char_03.gif");
				checkBuilding()
              //  GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        moveright: function(change){
            if (!isMuteOn ){  gameSound.walk.play(); }
           if (GameMap.map[GameMap.playerY][GameMap.playerX+1] != 1 && GameMap.freezed === false){
                GameMap.playerX += 1;
                GameMap.myPoX -= GameMap.move;
                $(".map-img").css("left", GameMap.myPoX);
                $(".map-el-holder").css("left", GameMap.myPoX);
                if(change==true)$(".player img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/char_04.gif");
				checkBuilding()
              //  GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        moveup: function(change){
            if (!isMuteOn ){  gameSound.walk.play(); }
            if (GameMap.map[GameMap.playerY-1][GameMap.playerX] != 1 && GameMap.freezed === false){
                GameMap.playerY -= 1;
                GameMap.myPoY += GameMap.move;
                $(".map-img").css("top", GameMap.myPoY);
                $(".map-el-holder").css("top", GameMap.myPoY);
                if(change==true)$(".player img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/char_02.gif");
				checkBuilding()
               // GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        movedown: function(change){
            if (!isMuteOn ){  gameSound.walk.play(); }
            if (GameMap.map[GameMap.playerY+1][GameMap.playerX] != 1 && GameMap.freezed === false){
                GameMap.playerY += 1;
                GameMap.myPoY -= GameMap.move;
                $(".map-img").css("top", GameMap.myPoY);
                $(".map-el-holder").css("top", GameMap.myPoY);
                if(change==true)$(".player img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/char_01_2.gif");
				checkBuilding()
               // GameMap.Xcompleted = GameMap.freezed = false;
            }

        }
    };

	var UserData = {
		pageStage:0,
		userName:"무가당"
	};

	// 오프닝
	$("#OPENING_START").on("click",function(){
		$(".opening-background-list .back-01").hide();
		$(".opening-background-list .back-02").fadeIn();
        gameSound.click.play();
		showOpeningStage();

	});
	function showOpeningStage(){
		$(".opening").hide();
		$(".opening-stage").show();
		UserData.pageStage = 1;
		$(".ment-box").slideDown(1000, "easeOutBounce", function(){
			var $eachPara = $(".ment-box .box-inner .box-txt p");
			for(o=0; o<$eachPara.length;o++){
				$eachPara.eq(o).delay(o*700).animate({"opacity":"1"}, 1200, "easeOutSine");
				if(o == $eachPara.length-1){
                    EnterPassStage = true;
					$(".opening-stage .btn-holder").delay(3000).fadeIn();
				}

			};
		});
	};

	$(".chat-input-txt").focus(function(){
		$(this).val("");
	});
	$("#START_GAME").on("click",function(){
        gameSound.click.play();
		$(".opening-stage-el--01").hide();
		$(".opening-stage-el--02").show();
		UserData.pageStage = 2;
	});
	// 오프닝



	$(".game-alert .close").on("click",function(){
		var closeAlertType = $(this).attr("data-btn-type");
		clsoeAlertLayer();
		if(closeAlertType=="stay-building" || closeAlertType=="exit-building"||closeAlertType=="accept-sail" || closeAlertType=="reject-sail"){
			afterCloseAlert(closeAlertType);
		}
		afterCloseAlert(alertLayerType);

 	});

	function clsoeAlertLayer(){
		gameSound.click.play();
		$(".alert-border").hide();
		$(".game-alert").hide();
		alertLayerOn = false;
	};

	function afterCloseAlert(type){
		var closeAlertType = type;
		if(closeAlertType == "play-manual"){//시작매뉴얼 닫기
			if(isMobile){$(".screen-bottom-panel").fadeIn();}

		}else if( closeAlertType == "enter-building"){ //빌딩입장
			enterBuilding(buildingIndex);
		}else if(closeAlertType == "stay-building"){//빌딩잔류
            if(isMobile){ $(".screen-bottom-panel").removeClass("screen-bottom-panel-block"); }

		}else if(closeAlertType == "exit-building"){//빌딩퇴장
			exitBuilding(buildingIndex, false);
		}else if(closeAlertType == "wait"){ //개발중
            GameMap.freezed = false;
			GameMap.movedown(true);
        }else if(closeAlertType == "block-building"){ //이미 완료가 장소
			GameMap.freezed = false;
			GameMap.movedown(true);
		}else if(closeAlertType == "chat-npc"){ //NPC와 채팅
			enterBuilding(buildingIndex);
            GameMap.freezed = false;
        }else if(closeAlertType=="sent-to-boat"){ //항구앞으로 보내짐
			sendUserToBoat();
		}else if(closeAlertType=="accept-sail"){ // 항해 떠남
			goSailingStage();
		}else if(closeAlertType=="reject-sail"){ // 항해 떠나지 않음

		}else if(closeAlertType=="close-mugadang" || closeAlertType=="speak-mugadang"){ //무가당과 대화마침
			$(".npc-04").find(".question-icon").hide();
		}

		//레이어 창 타입 전역 변수 초기화
		alertLayerType = null;


	}

	function sendUserToBoat(){
		$(".player-holder").hide();
		//맵 초기 위치
		//console.log(GameMap.move);
		$(".map-img").css({left : GameMap.move * (-31)+ "px", top :GameMap.move * (-40)+ "px"});
		$(".map-el-holder").css({left : GameMap.move * (-31)+ "px", top : GameMap.move * (-40)+ "px"});

		GameMap.myPoX = GameMap.move *(-31);
		GameMap.myPoY = GameMap.move *(-40);
		GameMap.playerX = 31;
		GameMap.playerY = 40;

		$(".player-holder").delay(500).fadeIn(1500, function(){
			$(".user-baloon").show();
			/*
			setTimeout(function(){
				$(".user-baloon").hide();
			}, 3000);*/
			GameMap.freezed = false;
		});
	}




	function enterBuilding(b){
		UserData.pageStage = 4;

		//채팅 인덱스값 초기화
		chatIndex = 0;

		//화면 요소 전환
		$(".screen-left-panel .map-info").hide();
		$(".screen-right-panel .select-history").hide();
		$(".building-exit").show();

		if (!isMuteOn ){
			gameSound.bgm.pause();
			gameSound.building.play();
		}


		drawBuildingEl(b); //건물 안 요소들 채우기
		drawChatBox(b, chatIndex) //대화내용 채우기
		animateChatBox(); //대화 박스 애니메이션

		if(isMobile){
			mobileBottomPanelSwitch();
		}

	}

	// 모바일 하단 패널 영역 교체
	function mobileBottomPanelSwitch(){
		if(UserData.pageStage==4){
			$(".keyboard-holder").hide();
		}else if(UserData.pageStage==3){
			$(".keyboard-holder").show();
		}

	}

	function drawBuildingEl(b){
		$(".inside-building .background").find("div").hide();
		$(".inside-building .background").find(".background-b"+b).show();



		if(b==7){ //아고라만 특수케이스
			$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/b"+b+"-npc-3.png");
			$(".npc-name p").html("시끄러워 보이는 사람들");
		}else{
			$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/b"+b+"-npc.png");
			$(".npc-name p").html(npcNameObj[b]);
		}

		$(".flag-panel .position-bottom").html(buildingNameObj[b]);
		$(".inside-building").fadeIn(1000);

	};

	//채팅 되돌리기 기능
	var chatReturnPoint = {
		"b2":[5, 12],
		"b3":[9, 15],
		"b4":[1, 10],
		"b5":[1, 9],
		"b6":[1, 10],
		"b7":[5, 10],
		"b8":[1, 10]
	};
	$(".chat-return-btn").on("click",function(){
		//console.log(phaseIndex, buildingIndex, chatIndex);
		$(".chat-return-btn").hide();
		var biStr = "b"+buildingIndex;
		var returnCI_Point =  chatReturnPoint[biStr][phaseIndex-1];
		console.log(returnCI_Point);
		chatIndex = returnCI_Point-1; //채팅인덱스값 재적용
		drawChatBox(buildingIndex,chatIndex);
		$(".bottom-option-panel-holder").removeClass("up");
	});
	//채팅 되돌리기 기능

	//채팅 내용을 담고 있는 객체
	//외부화

	var m_selectBottomOpt = false;

	function drawChatBox(bi,ci){
		var biStr = "b"+bi;
		var chatIndex = String(ci*1+1);
		var chatSetObj = chatData[biStr][chatIndex];

		//console.log(chatSetObj);


		var $npcChat = $(".npc-panel .chat-box .typed-holder");
		var $userChat = $(".user-panel .chat-box .typed-holder");

		$npcChat.html("");
		$userChat.html("");

		//console.log(chatSetObj);
		/*
		$npcChat.typed({strings: [ chatSetObj.msg[0]  ], typeSpeed: 30, callback: function(){
			$userChat.typed({strings: [ chatSetObj.msg[1] ], typeSpeed: 30});
		} });*/
		$npcChat.html("<p>"+chatSetObj.msgN+"</p>");
		if(isMobile==true){ //모바일인 경우 왼쪽, 오른쪽을 아래쪽으로 바꾸어야함
			chatSetObj.msgU = chatSetObj.msgU.replace("왼쪽", "아래쪽");
			chatSetObj.msgU = chatSetObj.msgU.replace("오른쪽", "아래쪽");
		}
		var msgUser = "<p>"+chatSetObj.msgU+"</p>";
		$userChat.typed({strings:[msgUser], typeSpeed: 0});

		var phase = chatSetObj.phase;
		phaseIndex = phase;
		if(chatSetObj.type == "normal"){
			EnterPassMsg = true;
			$(".user-chat-select").hide();
			$(".user-panel .chat-box .chat-next-btn").show();
			$(".chat-return-btn").hide();
		}else if(chatSetObj.type == "userSelect"){ // 사용자 선택
			EnterPassMsg = false;
			$(".chat-bottom-btn").hide();
			//사용자 채팅 내 선택 버튼 만들기
			if(isMobile){
				$(".opt-full-desc-panel .each-opt-desc-list ul").addClass("clickable");
				$(".bottom-option-panel-holder").addClass("up");
				$(".chat-return-btn").attr("data-phase", phaseIndex);
				$(".chat-return-btn").show();
				m_selectBottomOpt = true;

			}else{
				var optArr = chatSetObj.optStrList;
				makeUserChatSelectBtn(optArr, phase);
				console.log(optArr);
				$(".user-panel .chat-box .user-chat-select").show();
				$(".chat-return-btn").attr("data-phase", phaseIndex);
				$(".chat-return-btn").show();
			}
		}else if(chatSetObj.type == "userExit"){
			EnterPassMsg = false;
			$(".user-chat-select").hide();
			$(".building-exit").hide();
			$(".chat-return-btn").hide();
			$(".user-panel .chat-box .exit-building-btn").show();

		}

		if( chatSetObj.showItemPanel == true){
			//아이템 미리보기 패널
			makeItemPreviewPanel(bi,ci, phase);
			$(".user-select-preview").show();
			if(isMobile){ $(".bottom-option-panel-holder").show(); }
		}else if( chatSetObj.showItemPanel == false){
			$(".user-select-preview").hide();
			if(isMobile){ $(".bottom-option-panel-holder").hide(); }
		}

		if(biStr=="b7" && chatIndex =="5"){//아고라에서 원로위원 첫 등장
			$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/b7-npc.png");
			$(".npc-name p").html("현명해 보이는 노인");
		}else if(biStr=="b7" && chatIndex =="8"){//아고라에서 원로위원 앵그리 버전
			$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/b7-npc-2.png");
			$(".npc-name p").html("성미가 불같은 화내는 노인");
		}else if(biStr=="b7" && chatIndex =="10"){//아고라에서 다시 원래 원로위원 모습으로
			$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/b7-npc.png");
			$(".npc-name p").html("태세 전환이 빠른 노인");
		}


	}

	//아이템 미리보기 패널 채우기
	function makeItemPreviewPanel(bi,ci, phase){
		var biStr = "b"+bi;
		var chatIndex = String(ci*1+1);
		var phaseStr = "phase"+phase;
		var itemDataArr= itemData[biStr][phaseStr];

		$(".user-select-preview .select-preview-panel ul").html(""); //초기화
		$(".user-select-preview .select-preview-panel ul").attr("data-phase", phaseStr);
		itemDataArr.forEach(function(v,i,a){
			var $ItemHolder;
			if(isMobile){
				$ItemHolder = $(".bottom-option-panel").find(".select-preview-panel ul");
			}else{
				if(i<2){
					$ItemHolder = $(".user-select-preview-left").find(".select-preview-panel ul");
				}else{
					$ItemHolder =  $(".user-select-preview-right").find(".select-preview-panel ul");
				}
			}

			if( v.thumb == false || v.thumb == "FALSE"){
				var itemStr = "<li data-preview='"+ v.owner+"'><p class='opt-name'>"+ v.name+"</p><p class='opt-desc'>"+v.desc+"</p><div class='desc-more-btn'>설명 더보기</div><div class='cand_icon cand_icon_"+(i+1)+"'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/cand_icon_"+(i+1)+".png'><p>"+candCountry[i].replace('나라','')+"</p></div></li>";
			}else{
				var itemStr = "<li data-preview='"+ v.owner+"'><div class='opt-thumbs'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/"+v.thumb+"' alt=''></div><p class='opt-name'>"+ v.name+"</p><p class='opt-desc'>"+v.desc+"</p><div class='desc-more-btn'>설명 더보기</div><div class='cand_icon cand_icon_"+(i+1)+"'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/cand_icon_"+(i+1)+".png'><p>"+candCountry[i].replace('나라','')+"</p></div></li>";
			}

			$ItemHolder.append(itemStr);
		})
		if(isMobile){
		//	$(".user-select-preview .select-preview-panel ul li").css({"height":"auto" });
		}else{
			$(".user-select-preview .select-preview-panel ul li").css({"height":($(".user-select-preview").width()*1.25) +"px" });
		}

	};

	$(".user-select-preview .select-preview-panel ul").on("click", "li .desc-more-btn", function(e){
		e.preventDefault();
		var itemIdx = $(this).parent("li").attr("data-preview");
		var phaseIdx = $(this).parent("li").parent("ul").attr("data-phase");
		makeItemInfoPanel(buildingIndex,phaseIdx,itemIdx)
	});

	// 설명 더보기 아이템 창
	function makeItemInfoPanel(bi, pi, ii){
		EnterPassMsg= false
		var biStr = "b"+bi;
		var itemDataObj =itemData[biStr][pi][ii-1];
		if( itemDataObj.thumb == false || itemDataObj.thumb == "FALSE"){
			$(".item-more-info-layer .thumbs").hide();
			$(".item-more-info-layer .thumbs").find("img").attr("src", "");
		}else{
			$(".item-more-info-layer .thumbs").show();
			$(".item-more-info-layer .thumbs").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/"+itemDataObj.thumb);
		}
		$(".item-more-info-layer .name").html(itemDataObj.name);
		$(".item-more-info-layer .desc").html(itemDataObj.descFull);
		$(".item-more-info-layer").show();

	}

	$(".info-layer-close").on("click",function(e){
		e.preventDefault();
		$(".item-more-info-layer").hide();
		EnterPassMsg= true;
	});

	//설명 더보기 모바일 창
	$("#MORE_OPT_DESC_MOBILE").on("click", function(e){
		e.preventDefault();
		var phaseIdx = $(this).parent("div").siblings("ul").attr("data-phase");
		makeFullItemDescMobile(buildingIndex,phaseIdx)

	});

	function makeFullItemDescMobile(bi, pi){
		EnterPassMsg= false
		var biStr = "b"+bi;
		var itemDataObjArr =itemData[biStr][pi];
		$(".opt-full-desc-panel .each-opt-desc-list ul").html("");//초기화

		itemDataObjArr.forEach(function(v,i,a){
			if( v.thumb == false || v.thumb == "FALSE"){
				var itemStr = "<li><div class='inner-wrap'><p class='name'>"+v.name+"</p><div class='desc-full'>"+v.descFull+"</div></div></li>";
			}else{
				var itemStr = "<li><div class='inner-wrap'><div class='thumbs'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/"+ v.thumb +"' alt=''></div><p class='name'>"+v.name+"</p><div class='desc-full'>"+v.descFull+"</div></div></li>";
			}
			$(".opt-full-desc-panel .each-opt-desc-list ul").append(itemStr);
		})
		$(".opt-full-desc-panel .each-opt-desc-list ul li").eq(3).addClass("last");
		$(".script-width").addClass("game-holder-touch-block");
        $(".opt-full-desc-mobile-layer").show();
        $(".opt-full-desc-panel").scrollTop(0);
		$(".opt-full-desc-panel ul").scrollTop(0);

	};
	$(".opt-full-desc-close").on("click", function(e){ //닫기
		e.preventDefault();
        $(".script-width").removeClass("game-holder-touch-block");
		$(".opt-full-desc-mobile-layer").hide();
		$(".opt-full-desc-panel .each-opt-desc-list ul").html("");

	});



	//사용자 채팅 내 선택 버튼 만들기
	function makeUserChatSelectBtn(optArr, phase){
		var _optArr = optArr.split(",");
		console.log(_optArr);
		$(".user-chat-select ul").html("");//초기화
		$(".user-chat-select ul").attr("data-phase", phase);
		_optArr.forEach(function(v,i,a){
			var owner = (Number(i)+1);
			var optStr = "<li class='opt' data-opt='"+owner+"'>"+v+"</li>";
			$(".user-chat-select ul").append(optStr);
		})
        //랜덤으로 섞기
        var ul = document.querySelector(".user-chat-select ul");
        for (var i = ul.children.length; i >= 0; i--){
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }

	};


	//채팅 다음 버튼 클릭
	$(".chat-next-btn").on("click",function(e){
		e.preventDefault();
		gameSound.click.play();
		$(".chat-inner-btn").hide();
		chatIndex = chatIndex+1;
		drawChatBox(buildingIndex, chatIndex);

	});


	function putUserSelectOpt(usi, bi, pi){
		var biStr = "b"+bi;
		userSelectData[biStr][pi] = usi;
		console.log(userSelectData);
		return userSelectData;
	};

	//채팅 내 사용자 선택 클릭
	$(".user-chat-select").on("click","ul li",function(e){
		e.preventDefault();
		var userSelectIndex = $(this).attr("data-opt");
		var phaseIndex = $(this).parent("ul").attr("data-phase");
		//사용자의 선택 값 객체에 추가하기
		putUserSelectOpt(userSelectIndex, buildingIndex, phaseIndex);
		gameSound.click.play();
		$(".chat-inner-btn").hide();
		chatIndex = chatIndex+1;
		drawChatBox(buildingIndex, chatIndex);
	});

	//모바일 채팅 내 대신 하단의 옵션 선택하도록
	$(".bottom-option-panel .user-select-preview").on("click","ul li",function(e){
		e.preventDefault();
		if( m_selectBottomOpt == true){
			var userSelectIndex = $(this).attr("data-preview");
			var phaseIndex = $(this).parent("ul").attr("data-phase");
			phaseIndex = Number(phaseIndex.replace("phase",""))

			//사용자의 선택 값 객체에 추가하기
			putUserSelectOpt(userSelectIndex, buildingIndex, phaseIndex);
			gameSound.click.play();

			$(".opt-full-desc-panel .each-opt-desc-list ul").removeClass("clickable");
			$(".bottom-option-panel-holder").removeClass("up");
			m_selectBottomOpt = false;
			$(".chat-inner-btn").hide();
			chatIndex = chatIndex+1;
			drawChatBox(buildingIndex, chatIndex);
		}

	});






	//채팅 내 나가기 버튼 클릭
	$(".exit-building-btn").on("click",function(e){
		exitBuilding(buildingIndex, true);
	});

	function animateChatBox(){
		$(".npc-panel .npc-chat-box-holder .npc-holder").animate({"opacity":"1"}, 500);
		$(".npc-panel .npc-chat-box-holder .chat-box").delay(500).animate({"opacity":"1"}, 500);
		$(".user-panel .chat-box").delay(1000).animate({"opacity":"1"}, 500);
	}

	//화면 우측하단 나가기
	$(".building-exit, .building-exit-mobile").on("click",function(e){
		$(".game-alert").show();
		alertLayerType = "stayOrExit";
		alertLayerOn = false;
		$(".alert-exit-building").show();

        if(isMobile){  $(".screen-bottom-panel").addClass("screen-bottom-panel-block"); }
	});


    var QueDonLength = 0;
	// building 요소들 모두 초기화
	function exitBuilding(bi, questDone){

        if(questDone==true){
			if(bi==4){
				$(".npc-02").addClass("map-npc-done");
			}else if(bi==8){
				$(".npc-03").addClass("map-npc-done");
			}
            var biStr = "b"+bi;
			var checkObj = userSelectData[biStr];
            var values;
            if(isIe==true){
                values = Object.keys(checkObj).map(function(i) { return checkObj[i]; });
            }else{
                values =Object.values(checkObj);
            }
			if( values.indexOf(null) !== -1 ){ //완료되지 않음
			    //무언가 오류가 났다는 의미
			}else{ // 퀘스트 완료
                QueDonLength+=1;
                $(".select-history .index-number .now").html(QueDonLength);
			    console.log(bi+"번째 퀘스트완료")
                var q_list_index = (bi*1)-2;
                $(".select-history ul li").eq(q_list_index).addClass("done");
			}
        }
		var b = b || 2;
		setCharAfterExitBuilding(b);

		if (!isMuteOn ){
			gameSound.bgm.play();
			gameSound.building.pause();
		}

		UserData.pageStage = 3;
        if(isMobile){
            $(".screen-bottom-panel").removeClass("screen-bottom-panel-block");
            $(".bottom-option-panel-holder").removeClass("up");
            $(".bottom-option-panel-holder").hide();
        }
		$(".screen-left-panel .map-info").show();
		$(".screen-right-panel .select-history").show();
		$(".building-exit").hide();
		$(".user-select-preview .select-preview-panel ul").html("");
		$(".user-select-preview").hide();
		$(".user-chat-select ul").html("");
		$(".item-more-info-layer").hide();
		phaseIndex = 1;
		eraseBuilding();
		$(".inside-building").fadeOut(1000);
		mobileBottomPanelSwitch();
		checkAllQuestDone();

	};


	function checkAllQuestDone(){
		var keys = Object.keys(userSelectData);
		var checkV = 0;
		for (i = 0; i < keys.length; i++) {
			var key = keys[i]
			var value = userSelectData[key]

			var	keys2 = Object.keys(value);
			for (k = 0; k < keys2.length; k++) {
				var key2 = keys2[k]
				var value2 = value[key2]
				if(value2 == null){
					break;
				}else{
					checkV += 1;
				}
			}
		}

		if( checkV == 14){
			console.log("퀘스트 다깸")
			GameMap.freezed = true;
			showAllQuestDoneAlert();
			userClearQuest = true;
			$(".btn-01").show();
		}else{
			console.log("아직 남음")
		}
	};

	function showAllQuestDoneAlert(){
		console.log("퀘스트를 모두 완료")
        gameSound.alert.play();
		alertLayerOn = true;
		alertLayerType = "sent-to-boat";
		$(".game-alert").show();
        $(".alert-all-quest-done").show();
	};

	function setCharAfterExitBuilding(b){
		if(b==2){//제로웨이스트샵에서 나옴
			console.log(b+"건물을 나왔다.");
			$(".flag-panel .position-bottom").html("광장");
			GameMap.freezed = false;
			GameMap.movedown(true);
		}

	};

	function setChartAfterBlockSailing(){
		console.log("아직 항해를 떠날 수 없다.");
		GameMap.moveright(true);
		GameMap.freezed = false;
	};

	function eraseBuilding(){
		chatIndex = 0;
		$(".npc-panel .chat-box .typed-holder").html("");
		$(".user-panel .chat-box .typed-holder").html("");
		$(".user-panel .chat-box .chat-inner-btn").hide();
		$(".inside-building .background").find("div").hide();
		$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "");
		$(".flag-panel .position-bottom").html("광장");
		$(".npc-name P").html("NPC이름");
	};

    //사운드조절
	var isMuteOn = false;
	$(".mute").on("click",function(){
		$(".sound-panel p span").removeClass("on");
		$(this).addClass("on");
		isMuteOn = true;
		mute();
	});
	$(".muteoff").on("click",function(){
		$(".sound-panel p span").removeClass("on");
		$(this).addClass("on");
		isMuteOn = false;
		play();
	});

	function mute(){
		gameSound.bgm.pause();
		gameSound.building.pause();
	};
	function play(){
		if(UserData.pageStage==3){
			gameSound.bgm.play();
		}else if(UserData.pageStage==4){
			gameSound.building.play();
		}

	}
    //사운드조절

    //미니맵
    function checkMinimapUserPos(){
        var minimapMove =$(".game-screen-square").width()*0.9/50;
       // console.log(minimapMove);
        console.log(GameMap.playerX, GameMap.playerY);
        $(".minimap-layer .user-minimap").css({"left": (GameMap.playerX * minimapMove)+"px", "top": (GameMap.playerY * minimapMove)+"px"});
    };

	$(".map-panel").on("click",function(e){
        e.preventDefault();
		if( $(this).hasClass("panel-block") ){

        }else{
            $(this).addClass("panel-block");
            $(".history-panel").addClass("panel-block");
            checkMinimapUserPos();
            $(".minimap-layer").show();
			GameMap.freezed = true;
        }
	});
    $(".minimap-layer .minimap-close button").on("click",function(e){
        e.preventDefault();
        $(".map-panel").removeClass("panel-block");
        $(".history-panel").removeClass("panel-block");
        $(".minimap-layer").hide();
		GameMap.freezed = false;
    });
    //미니맵

	function checkUserId(id){
		//console.log(typeof(id));
		if(typeof(id) == "string"){
			if(id.length>10){
				window.alert("5자 이내로 입력해주세요");
			}else{
				makeUserId(id)
			}
		}else{
			return
		}
	}

	function makeUserId(id){
		var _id = id || "사용자";

		UserData.userName = _id;
		console.log(_id+"님 안녕하세요");
        $(".user-name").html(_id);
        $(".player-holder .userName").html(_id);

		startMainGame();

	}

	function startMainGame(){
		UserData.pageStage = 3;
		$(".opening-background-list div").fadeOut(1000);
		$(".opening-stage").hide();
		$(".main-stage").animate({"opacity":"1"},1000);
        $(".main-stage").addClass("main-stage-on");
        gameSound.bgm.play();

		// 게임시작 매뉴얼 레이어창
		alertLayerOn = true;
		alertLayerType = "play-manual";
		$(".alert-play-manual").show();
		$(".game-alert").show();

		console.log( "한칸의 크기:"+ GameMap.move)
		console.log( "시작점: "+((GameMap.playerX*1)+1), (GameMap.playerY*1)+1)
		console.log( "지도의 시작 위치:"+ GameMap.myPoX, GameMap.myPoY);
	};

	$("#USER_ID_CONF").on("click",function(){
		gameSound.click.play();
		if($("#userName").val() !== ""){
			checkUserId($("#userName").val());
		}else{
			window.alert("이름을 입력해주세요");
		}

	});
	/***** 오프닝 *****/


	function init(){
	    GameSetting.settingViewPort();
        GameMap.defaultPositionSetting();
        gameSound.settingSound();
	}

	init();
	$(".loading-page").fadeOut(1000, function(){
		$(".after-load").animate({"opacity":"1"}, 1000);
		mainGameIntroAnimation();
	});

	function mainGameIntroAnimation(){
		var $openCandImg = $(".open-cand-ani");
		for(o=0; o<$openCandImg.length;o++){
			$openCandImg.eq(o).delay(o*300).animate({"opacity":"1", "bottom":"0px"}, 700, "easeOutSine");
			if(o == $openCandImg.length-1){
				$(".game-title-holder").removeClass("game-title-holder-zoom");
				$("#OPENING_START").fadeIn(1500);
                EnterPassStage = true;
			}
		};
	};
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


	var questInfoData = [
	  {
		"queTitle": "제로웨이스트샵에서 책자 구매하기",
		"queThumb": "qu-info-b2.png",
		"queDesc": "<p>무가당 제로웨이스트 샵에 가서 점장과 대화하고 항해에 필요한 두 가지 장비를 구매해야 합니다. 뭘 사야 할지 아직 모르시겠다고요? 걱정하지 마세요. 점장이 친절히 소개해드립니다.</p>\n<p>무가당 제로웨이스트 샵은 지도의 왼편, 윗쪽에 있습니다.</p>"
	  },
	  {
		"queTitle": "여관 직원에게 부동산 정보 얻기",
		"queThumb": "qu-info-b3.png",
		"queDesc": "<p>항해를 떠나더라도 언젠가는 정착해야하는 당신, 부동산에 대한 관심을 빼놓을 수 없겠지요. 무가당섬의 여관이 부동산 정보가 가장 빠르다고 합니다. 여관에 방문해 직원으로부터 부동산에 대한 정보를 얻고 선택을 해야합니다. 아참! 그곳에서 깜박 잠들지 않게 잘 빠져나오셔야 합니다.</p>\n<p>여관은 지도의 왼편, 아래에 있습니다.</p>"
	  },
	  {
		"queTitle": "중앙광장에서 시민과 대화하기",
		"queThumb": "qu-info-b4.png",
		"queDesc": "<p>이곳 중앙광장에서는 매주 다양한 퍼레이드가 열립니다. 오늘은 어떤 퍼레이드가 열렸을까요? 광장에서 퍼레이드에 참석한 이들과 대화해보세요. 맛있는 다과와 차도 준비되어 있다고 합니다.</p>\n<p>중앙광장은 지도의 중앙, 윗쪽에 있습니다.</p>"
	  },
	  {
		"queTitle": "도서관에서 세미나 구경하기",
		"queThumb": "qu-info-b5.png",
		"queDesc": "<p>무가당 학생들은 사회 이슈에 관심이 많습니다. 무가당 도서관에서 학생들은 다양한 세미나를 개최하지요. 도서관에 방문해 학생들이 개최한 세미나에 대한 소개도 듣고 구경도 해보세요.</p>\n<p>도서관은 지도의 중앙, 아래에 있습니다.</p>"
	  },
	  {
		"queTitle": "비밀스러운 곳에서 요원의 얘기 들어주기",
		"queThumb": "qu-info-b6.png",
		"queDesc": "<p>기지국에서는 무가당 섬의 다양한 외교 정사를 책임지고 있습니다. 기지국의 비밀요원 K가 아무래도 당신을 찾고 있는 것 같아요. 무슨 일인지는 모르겠지만... 직접 가보시겠어요?</p>\n<p>기지국은 지도의 오른편, 윗쪽에 있습니다.</p>"
	  },
	  {
		"queTitle": "아고라에서 원로위원 만나기",
		"queThumb": "qu-info-b7.png",
		"queDesc": "<p>매일 원로위원들의 치열한 의견공방이 벌어지고 있는 무가당 아고라. 그곳에서 만난 원로위원이 당신의 항해를 도와줄 겁니다. 어떤 결정을 내리느냐에 따라 항해의 목적지가 달라질 수도 있어요! 어떻게 선택하느냐구요? 아마... 대화만 나눠도 바로 알 수 있으실겁니다.</p>\n<p>기지국은 지도의 오른편, 윗쪽에 있습니다.</p>"
	  },
	  {
		"queTitle": "항구에서 동료 찾기",
		"queThumb": "qu-info-b8.png",
		"queDesc": "<p>항해에는 선원이 필요하죠! 동료를 찾기 위해 항구의 마당발을 만나야 합니다. 밀짚모자를 쓴 선원이 당신에게 다양한 동료들을 소개시켜줄거에요.</p>\n<p>그들은 지도의 왼편, 아래 항구 인근에 있습니다.</p>"
	  }
	];

    //퀘스트
    function makeQuestInfoLayer(qi){
		var qData = questInfoData[qi];
        $(".quest-title").html(qData.queTitle);
        $(".quest-thumb").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/"+qData.queThumb);
        $(".quest-desc").html(qData.queDesc);
		$(".quest-info-layer .warp").attr("data-warp-bi", (Number(qi)+2));
        $(".quest-info-layer").show();
    };

	$(".select-history ul li").on("click",function(e){
        e.preventDefault();
		if( $(this).hasClass("done") ){

        }else{
            //var qi = $(this).attr("data-q-index");
			var qi = $(this).index();
            $(".map-panel").addClass("panel-block");
            $(".history-panel").addClass("panel-block");
            makeQuestInfoLayer(qi)

			GameMap.freezed = true;

        }
	});
    $(".quest-info-close .close").on("click",function(e){
        e.preventDefault();
        $(".history-panel").removeClass("panel-block");
        $(".quest-info-layer").hide();
		if(!isMobile){
			GameMap.freezed = false;
			$(".map-panel").removeClass("panel-block");
		}
    });

	//워프효과
	var warpPoint = {
		"b2":[5,13],
		"b3":[13,29],
		"b4":[29,19],
		"b5":[28,30],
		"b6":[44,8],
		"b7":[45,27],
		"b8":[26,35]
	}
	 $(".quest-info-close .warp").on("click",function(e){
        e.preventDefault();

		if(isMobile){
			$(".select-history-back").hide();
			$(".select-history").hide();
			$(".map-panel").addClass("panel-block");
			$(".history-panel").addClass("panel-block");
		}
        $(".quest-info-layer").hide();
        var bi = $(this).attr("data-warp-bi");
		var biStr = "b"+bi;
		GameMap.freezed = true;
		$(".player-holder .userName").fadeOut();
		$(".player-holder .player").animate({"opacity":"0", "top":"-100px"},700, "easeOutSine", function(){
			var wpX = warpPoint[biStr][0]-1,
				wpY = warpPoint[biStr][1]-1;

			$(".map-img").css({left : GameMap.move * (-1*wpX)+ "px", top :GameMap.move * (-1*wpY)+ "px"});
			$(".map-el-holder").css({left : GameMap.move * (-1*wpX)+ "px", top : GameMap.move * (-1*wpY)+ "px"});

			GameMap.myPoX = GameMap.move *(-1*wpX);
			GameMap.myPoY = GameMap.move *(-1*wpY);
			GameMap.playerX = wpX;
			GameMap.playerY = wpY;

			currentKey = 40;
			$(".player img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/char_01_2.gif");
			$(".player-holder .player").delay(800).animate({"opacity":"1", "top":"0px"},700, "easeOutSine", function(){
				$(".player-holder .userName").fadeIn();
				GameMap.freezed = false;
				$(".history-panel").removeClass("panel-block");
				$(".map-panel").removeClass("panel-block");

			});

		});
    });
	//워프효과

	 $(".quest-panel").on("click",function(e){
        e.preventDefault();
		$(".map-panel").addClass("panel-block");
		GameMap.freezed = true;
		$(".select-history-back").show();
		$(".select-history").show();


    });
	$(".history-panel .quest-list-close").on("click",function(e){
        e.preventDefault();
		$(".map-panel").removeClass("panel-block");
		GameMap.freezed = false;
		$(".select-history-back").hide();
		$(".select-history").hide();
    });

    //퀘스트

	//퀘스트완료-항해
    $(".map-button").on("click",function(e){
        e.preventDefault();
        var bi = $(this).attr("data-npc-index");
		if( bi=="222"||bi ==222){
			if(userClearQuest == true){
				$(".user-baloon").hide();
				showBeforeSailingAlert();
			}
        }
	});

	function showBeforeSailingAlert(){
        gameSound.alert.play();
		alertLayerOn = true;
		alertLayerType = "before-go-sail";
		$(".game-alert").show();
        $(".alert-before-go-sailing").show();
	};

	function goSailingStage(){
        countUserSelect();//사용자 선택 체크
		console.log("항해시작");
        mute();

		$(".game-map").hide();
		$(".player-holder").hide();
		$(".each-panel").fadeOut();
		$(".screen-bottom-panel").fadeOut();
		$(".sailing-scene").fadeIn(1000);
		$(".sailing-scene-wrap .user-boat").delay(500).animate({"left":"-20%"},4000, "swing", function(){

			checkUserSelectDouble();

		});
	}

	function checkUserSelectDouble(){

		if(MatchCandIdxArr.length == 1){ //한가지 국가
			var c_idx = candName.indexOf(MatchCandIdxArr[0])
            endSailingStage(c_idx);
        }else{ //여러가지 국가 나옴
			var number = MatchCandIdxArr.length;
			showChoiceStage(number)
		}
	};

	function showChoiceStage(n){
		console.log("사용자 선택");
		$(".sailing-scene").hide();
		if(n==2){
			$(".user-choice-panel .desc-para-box .para-holder .numb").html("두");
			$(".sailing-choice-scene .select-btn-holder").addClass("select-btn-holder-col-2");
		}else if(n==3){
			$(".user-choice-panel .desc-para-box .para-holder .numb").html("세");
			$(".sailing-choice-scene .select-btn-holder").addClass("select-btn-holder-col-3");

		}
		$(".sailing-choice-scene .select-btn-holder").html("");

		MatchCandIdxArr.forEach(function(v,i,a){

			var c_temp ="";
			if(v=="이재명"){
				c_temp = "<div class='select-btn' data-usersel='0'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/lee-pixel.png' alt=''></div></div><div class='cand-info-bottom'><p class='flag-name'>숭늉나라</p><p class='nametag'>지도자 <span class='cand-name'>이재명</span></p><p></p></div></div>";
			}else if(v=="윤석열"){
				c_temp = "<div class='select-btn' data-usersel='1'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/yoon-pixel.png' alt=''></div></div><div class='cand-info-bottom'><p class='flag-name'>찌개나라</p><p class='nametag'>지도자 <span class='cand-name'>윤석열</span></p><p></p></div></div>";
			}else if(v=="심상정"){
				c_temp = "<div class='select-btn' data-usersel='2'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/sim-pixel.png' alt=''></div></div><div class='cand-info-bottom'><p class='flag-name'>소보로나라</p><p class='nametag'>지도자 <span class='cand-name'>심상정</span></p><p></p></div></div>";
			}else if(v=="안철수"){
				c_temp = "<div class='select-btn' data-usersel='3'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/ahn-pixel.png' alt=''></div></div><div class='cand-info-bottom'><p class='flag-name'>파스타나라</p><p class='nametag'>지도자 <span class='cand-name'>안철수</span></p><p></p></div></div>";
			}
			$(".sailing-choice-scene .select-btn-holder").append(c_temp);
		});

		$(".sailing-choice-scene").fadeIn(1000);

	};
	var userMatchedCand;
	var allCandMathPer;
	$(".sailing-choice-scene").on("click", ".select-btn-holder .select-btn", function(e){
		var u = $(this).attr("data-usersel");
		userMatchedCand = u;
		endSailingStage(u);

	});

	function endSailingStage(usi){
		console.log("항해끝");
		console.log(usi); // 매칭 후보 정해짐
		$(".sailing-scene").hide();
		$(".sailing-choice-scene").hide();
		$(".alert-arriving-desc").find(".flag-name").html(candCountry[usi]);
		$(".alert-arriving-desc").find(".pre-name").html(candName[usi]);
		$(".arriving-people").find("img").attr("src", "https://img.khan.co.kr/spko/storytelling/2022/greatelection/people-"+candthumb[usi]+".gif");
		$(".arriving-scene").fadeIn(1000);
		$(".arriving-scene-wrap .go-ending-page-btn button").delay(500).fadeIn();
		$(".arriving-scene-wrap .go-ending-page-btn button").attr("data-btn-ui", usi)

	}


	$("#GO_ENDING").on("click",function(e){
		$(".arriving-scene").hide();
		$(".main-stage").hide();
		$(".main-stage").removeClass("main-stage-on");
		var u = $(this).attr("data-btn-ui");
		console.log(u);
		drawResultPage(u) //결과 후보자에 따라서 화면 그려주는 함수 따로 필요함

	});

	function drawResultPage(u){
		console.log(u+"번째로 화면 그림");
		//나라명, 후보자명
		$(".user-result-panel .user-matched-candidate").find("#FLAG_NAME").html(candCountry[u]);
		$(".user-result-panel .user-matched-candidate").find("#PRE_NAME").html(candName[u]);

		//후보자 매칭율
		allCandMathPer = countArr.map( function(x){
			return (x/14*100).toFixed(1);
		});
		console.log(allCandMathPer);
		console.log(u);
		var matchPercent = allCandMathPer[u];
		console.log(matchPercent);
		$(".user-result-panel .user-matched-candidate").find("#MATCH_PER").html(matchPercent+"%");

		$(".other-candidate-score-list ul").html("");
		countArr.forEach(function(v,i,a){
			if(i==u){ //매칭된 후보
				$(".matched-candidate-info").html("");
				var str = "<div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/"+candthumb[i]+"-pixel.png' alt=''></div><p class='nametag'>"+candName[i]+"</p></div><div class='cand-match-score'><p class='head'>매칭율 <span class='score-value'><em id='MATCH_VALUE'>0</em>%</span></p></div>"
				$(".matched-candidate-info").html(str);
			}else{ //나머지 후보자들
				var tmpStr = getCandBoxStr(i);
				$(".other-candidate-score-list ul").append(tmpStr);
			}

		});
		$(".ending-stage .go-to-candidates-page").attr("onclick", "window.open('https://news.khan.co.kr/kh_storytelling/2022/candidates/"+candthumb[u]+".html', '_blank');")

		AnimateResultPage(u, matchPercent);
	};

	function AnimateResultPage(u, p){
		$(".ending-stage").show();
		$(".cand-matched-info").slideDown(1000, "easeOutBounce", function(){
			var $candBox = $(".cand-info-box");
			for(o=0; o<$candBox.length;o++){
				$candBox.eq(o).delay(o*700).animate({"opacity":"1", "top":"0px"}, 1200, "easeOutSine");
				if(o == $candBox.length-1){
					animateValue("MATCH_VALUE", 0, p, 1500);
				}

			};
		});
	};

	function getCandBoxStr(i){
		var str;
		switch(i){
			case 0:
				str = "<li><div class='other-candidate-info cand-info-box'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/lee-pixel.png' alt=''></div><p class='nametag'>이재명</p></div><div class='cand-match-score'><p class='head'>매칭율 <span class='score-value'id='OTHER_VALUE_01'>"+allCandMathPer[i]+"%</span></p></div></div></li>";
				return str;
				break;
			case 1:
				str = "<li><div class='other-candidate-info cand-info-box'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/yoon-pixel.png' alt=''></div><p class='nametag'>윤석열</p></div><div class='cand-match-score'><p class='head'>매칭율 <span class='score-value'id='OTHER_VALUE_02'>"+allCandMathPer[i]+"%</span></p></div></div></li>";
				return str;
				break;
			case 2:
				str = "<li><div class='other-candidate-info cand-info-box'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/sim-pixel.png' alt=''></div><p class='nametag'>심상정</p></div><div class='cand-match-score'><p class='head'>매칭율 <span class='score-value'id='OTHER_VALUE_03'>"+allCandMathPer[i]+"%</span></p></div></div></li>";
				return str;
				break;
			case 3:
				str = "<li><div class='other-candidate-info cand-info-box'><div class='cand-thumb-box'><div class='thumb-img'><img src='https://img.khan.co.kr/spko/storytelling/2022/greatelection/ahn-pixel.png' alt=''></div><p class='nametag'>안철수</p></div><div class='cand-match-score'><p class='head'>매칭율 <span class='score-value'id='OTHER_VALUE_04'>"+allCandMathPer[i]+"%</span></p></div></div></li>";
				return str;
				break;
		}

	}

	function animateValue(id, start, end, duration) {
		var range = end - start;
		var current = start;
		var increment = end > start ? 1 : -1;
		var stepTime = Math.abs(Math.floor(duration / range));
		var obj = document.getElementById(id);
		var timer = setInterval(function(){
			  current = Number((current + increment).toFixed(1));
			  obj.innerHTML = current;
			  if (current == Math.floor(end)) {
				 increment = increment / 10;
			  }
			  if (current == end) {
				 clearInterval(timer);
			  }
		   }, stepTime);
	 }
	//퀘스트완료-항해


    // 빌딩 검사 관련
	var buildingIndex;
	var chatIndex = 0;
	var phaseIndex = 1;
	var userClearQuest = false;
	var buildingNameObj = {
		2: "제로웨이스트샵",
		3: "호텔을 꿈꾸는 여관",
		4: "중앙광장",
		5: "도서관",
		6: "비밀스러운 기지국",
		7: "아고라",
		8: "항구"
	};

	var npcNameObj = {
		2: "기후위기에 진심인 점장",
		3: "벨보이",
		4: "염색이 꽤 잘 나온 시민",
		5: "이론에 빠삭해보이는 학생",
		6: "요원-K",
		7: "아리무가당텔레스",
		8: "말랑말랑해 보이는 선원"
	};



    $(".map-npc").on("click",function(e){
        e.preventDefault();
        var bi = $(this).attr("data-npc-index");
		if( $(this).hasClass("map-npc-done") ){

        }else{
			if(bi=="111"||bi ==111){ //무가당
				alertLayerOn = true;
				alertLayerType = "speak-mugadang";
				$(".game-alert").show();
				$(".alert-mugadang1").show();

			}else if(bi=="112"||bi ==112){ //무가당2
				alertLayerOn = true;
				alertLayerType = "speak-mugadang";
				$(".game-alert").show();
				$(".alert-mugadang2").show();

			}else if(bi=="113"||bi ==113){ //무가당3
				alertLayerOn = true;
				alertLayerType = "speak-mugadang";
				$(".game-alert").show();
				$(".alert-mugadang3").show();

			}else if(bi=="333"||bi ==333){ //제작자
				alertLayerOn = true;
				alertLayerType = "speak-maker";
				$(".game-alert").show();
				$(".alert-maker").show();

			}else if(bi=="7"||bi ==7){ //원로위원 -> 치트키
				putRandVal();
				console.log("치트키")
				GameMap.freezed = true;
				showAllQuestDoneAlert();
				userClearQuest = true;
				$(".btn-01").show();



			}else if(bi=="9"||bi ==9){ //배

				console.log("배가 떠있다.")


			}else{
				GameMap.freezed = false;
				showChatNpcAlert(bi);

			}

        }
	});

    function showChatNpcAlert(bi){
		if(bi==8){
			$(".alert-chat-npc .npc-name").html("항구의 선원들");
		}else{
			$(".alert-chat-npc .npc-name").html( npcNameObj[bi]);
		}

        gameSound.alert.play();
		alertLayerOn = true;
		alertLayerType = "chat-npc";
        $(".alert-chat-npc").attr("data-building-idx", bi);
		buildingIndex = bi;
		$(".game-alert").show();
        $(".alert-chat-npc").show();
    }

	function checkBuilding(){

		//건물 2~8
		if(GameMap.map[GameMap.playerY][GameMap.playerX]>=2 && GameMap.map[GameMap.playerY][GameMap.playerX]<9){

            /* 개발중에 잠시 막음
			GameMap.freezed = true;

			var map_idx = GameMap.map[GameMap.playerY][GameMap.playerX];

			//이미 퀘스트 완료가 된 공간인지 체크
			var biStr = "b"+map_idx;
			var checkObj = userSelectData[biStr];
			if( Object.values(checkObj).includes(null) ){ //완료되지 않음
				buildingIndex = map_idx;
				showEnterBuildingAlert(buildingIndex);

			}else{ // 퀘스트 완료
				showBlockBuildingAlert(map_idx);
			} */
            //if(GameMap.map[GameMap.playerY][GameMap.playerX]==2 || GameMap.map[GameMap.playerY][GameMap.playerX]==3 ){
			if(true){
                GameMap.freezed = true;
                var map_idx = GameMap.map[GameMap.playerY][GameMap.playerX];

                //이미 퀘스트 완료가 된 공간인지 체크
                var biStr = "b"+map_idx;
                var checkObj = userSelectData[biStr];
                var values;
                if(isIe==true){
                    values = Object.keys(checkObj).map(function(i) { return checkObj[i]; });
                }else{
                    values =Object.values(checkObj);
                }
                if( values.indexOf(null) !== -1  ){ //완료되지 않음
                    buildingIndex = map_idx;
					if(buildingIndex==8){
						showChatNpcAlert(buildingIndex);
					}
                    showEnterBuildingAlert(buildingIndex);

                }else{ // 퀘스트 완료
                    showBlockBuildingAlert(map_idx);
                }

            }

		}else if(GameMap.map[GameMap.playerY][GameMap.playerX]== 9){
			GameMap.freezed = true;
			showBlockSailingAlert();
		}else{
			GameMap.freezed = false;
		}
	}


    /*function showAlertWaiting(bi){
		gameSound.alert.play();
		$(".game-alert").show();
		$(".alert-enter-building").attr("data-building-idx", bi);
		alertLayerType = "wait";
		$(".alert-waiting").show();

	};*/


	function showEnterBuildingAlert(bi){
		var buildingName = buildingNameObj[bi];
		$(".alert-enter-building .building-name").html(buildingName);
		gameSound.alert.play();
		$(".game-alert").show();
		alertLayerType = "enter-building";
		$(".alert-enter-building").attr("data-building-idx", bi);
		$(".alert-enter-building").show();
		alertLayerOn = true;
	};

	function showBlockBuildingAlert(map_idx){
		gameSound.alert.play();
		$(".game-alert").show();
		alertLayerType = "block-building";
		$(".alert-block-enter-building").show();
		setCharAfterExitBuilding(map_idx);
	};

	function showBlockSailingAlert(){
		window.alert("아직 준비가 되지 않았습니다.");
		setChartAfterBlockSailing();
	};


	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();

	});


   var currentKey = 40; // 디폴트는 아래
   var isChrDirChange = false;
   var EnterPassMsg = true;
   var alertLayerOn = false;
   var alertLayerType;
   var EnterPassStage = false;

   $(window).keydown(function(e){
		//console.log("키누름");

        //처음 시작 전
		if(UserData.pageStage == 0 && event.keyCode == 13 && EnterPassStage==true){
            EnterPassStage=false;
			$(".opening-background-list .back-01").hide();
			$(".opening-background-list .back-02").fadeIn();
			gameSound.click.play();
			showOpeningStage();
		}else if(UserData.pageStage == 1&& event.keyCode == 13&& EnterPassStage==true){
			gameSound.click.play();

			$(".opening-stage-el--01").hide();
			$(".opening-stage-el--02").show();
			UserData.pageStage = 2;

		}else if(UserData.pageStage == 2&& event.keyCode == 13 && ($("#userName").val() !== "")){
			gameSound.click.play();
			checkUserId($("#userName").val());

		}else if(UserData.pageStage == 3){//게임 맵 있는 스테이지
            if (KEY_STATUS.double === true || isMobile === true) return;

            var keyCode = (e.keyCode) ? e.keyCode : e.charCode;

            //key코드에 있는 키값이 입력되었을 때만 동작
            if (KEY_CODES[keyCode]) {
		        e.preventDefault();
				console.log(keyCode);
				if(currentKey==keyCode){
					isChrDirChange = false;

				}else{
					isChrDirChange = true;
					currentKey = keyCode;
				}

                KEY_STATUS[KEY_CODES[keyCode]] = true;
		        KEY_STATUS.double = true;

                if (KEY_STATUS.left || KEY_STATUS.right ||KEY_STATUS.down || KEY_STATUS.up || KEY_STATUS.space) {

                    if (KEY_STATUS.left) {
                        GameMap.moveleft(isChrDirChange);
                    } else if (KEY_STATUS.right) {
                        GameMap.moveright(isChrDirChange);
                    } else if (KEY_STATUS.up) {
                        GameMap.moveup(isChrDirChange);
                    } else if (KEY_STATUS.down) {
                        GameMap.movedown(isChrDirChange);
                    }
					console.log( (GameMap.playerX*1+1)+", "+(GameMap.playerY*1+1) +"로 이동");
					console.log( GameMap.map[GameMap.playerY][GameMap.playerX] )

                }
				if(keyCode ==13 && alertLayerOn==true){ //엔터
					clsoeAlertLayer();
					afterCloseAlert(alertLayerType);
				}
            }

        }else if(UserData.pageStage == 4&& event.keyCode == 13 &&EnterPassMsg==true ){ //유저 대화중
			EnterPassMsg= false;
			gameSound.click.play();
			$(".chat-inner-btn").hide();
			chatIndex = chatIndex+1;
			drawChatBox(buildingIndex, chatIndex);

		}

	});

    //keyup시 홀드 해제
    $(window).keyup(function(e){
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        if (KEY_CODES[keyCode]) {
            e.preventDefault();
            KEY_STATUS[KEY_CODES[keyCode]] = false;
            KEY_STATUS.double = false;
        }

    });

	//모바일 이동
	$(".keyboard-holder .key-btn").on("click touchstart", function(e){
		e.preventDefault();
		if(UserData.pageStage == 3 &&  GameMap.freezed == false){
			var keyCode = $(this).attr("data-key");

			console.log(keyCode);
			if(currentKey==keyCode){
				isChrDirChange = false;
			}else{
				isChrDirChange = true;
				currentKey = keyCode;
			}

			if(keyCode == "38"){
				GameMap.moveup(isChrDirChange);
			}else if(keyCode == "40"){
				GameMap.movedown(isChrDirChange);
			}else if(keyCode == "37"){
				 GameMap.moveleft(isChrDirChange);
			}else if(keyCode == "39"){
				GameMap.moveright(isChrDirChange);
			}
		}
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
