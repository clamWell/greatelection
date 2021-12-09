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
checkMobile();


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
    console.log(KEY_STATUS);
    KEY_STATUS.double = false;
    KEY_STATUS.enterCheck = false;


    //전체 크기 설정 및 뷰포트 설정
	var GameSetting = {
		gameViewPortMode: "default",
		settingViewPort: function(){
			var gw, gh, mt_gap;
			var $gameVP = $(".script-width");
			if(isMobile==true){
				gh = screenWidth-30;
				gw = gh*3/2;
				mt_gap = 15;
				this.gameViewPortMode = "mobile";
				console.log(gw, gh, mt_gap);
				$gameVP.css({"width": gw+"px", "height": gh+"px","top": mt_gap+"px"});
				$("html, body").css("font-size", (gw * 16 / 1200) + "px");

				var panel_width = (gw - gh)/2;
				$(".game-screen-square").css({"width": gh+"px", "height": gh+"px"});
				$(".each-panel").css({"width": panel_width+"px"});
				
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
				console.log(gw, gh, mt_gap);
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
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1], //4
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1], //5
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,6,1,1,1,1,1], //6 //기지국
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1], //7
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1], //8
			[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1], //9
			[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,1,1], //10
			[1,1,1,1,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1], //11
			[1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,1,1,1,1,1,1], //12
			[1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //13 //광장위
			[1,1,1,1,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,4,4,4,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //14
			[1,1,1,1,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,4,4,4,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //15
			[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //16
			[1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //17
			[1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //18
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1], //19 //아고라지붕
			[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1], //20
			[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1], //21
			[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1], //22
			[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1], //23
			[1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1], //24
			[1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,7,1,1,1,1,1], //25 //아고라
			[1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1], //26
			[1,1,1,0,0,0,0,0,1,1,1,1,3,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1], //27 //여인숙
			[1,1,1,0,0,1,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,5,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1], //28
			[1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1], //29
			[1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1], //30
			[1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //31
			[1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //32 // 밑으로 항구벽돌
			[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1], //33 // 항구 벽돌
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //34
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //35
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //36
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //37
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //38 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //39 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1], //40 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1], //41 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1], //42 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //43 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //44 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //45 > 바다
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
		multipleValue: 9,
		adjustValue: 4,

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

			//웨이스트제로샵
			$(".b2").css({"width": this.mapW *198/2500});
			$(".b2").css({"top":2*this.move+"px", "left": 2.5*this.move+"px"});
			$(".portal").css({"width": this.move});
			$(".portal-b2").css({"top":10.5*this.move+"px", "left": 4*this.move+"px"});
           
			
			//맵 초기 위치
            $(".map-img").css({left : "-=" + this.move * (28)+ "px", top : "-=" + this.move * (15)+ "px"});
            $(".map-el-holder").css({left : "-=" + this.move * (28)+ "px", top : "-=" + this.move * (15)+ "px"});

            GameMap.myPoX -= this.move *(28);
            GameMap.myPoY -= this.move *(15);
            this.playerX = 28;
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
            gameSound.walk.play();
            if (GameMap.map[GameMap.playerY][GameMap.playerX-1] != 1 && GameMap.freezed === false && GameMap.map[GameMap.playerY][GameMap.playerX-1] != undefined){

                GameMap.playerX -= 1;
                GameMap.myPoX += GameMap.move;
                $(".map-img").css("left", GameMap.myPoX);
                $(".map-el-holder").css("left", GameMap.myPoX);
				if(change==true)$(".player img").attr("src", "img/char_03.gif");
				checkBuilding()
              //  GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        moveright: function(change){
            gameSound.walk.play();
           if (GameMap.map[GameMap.playerY][GameMap.playerX+1] != 1 && GameMap.freezed === false){
                GameMap.playerX += 1;
                GameMap.myPoX -= GameMap.move;
                $(".map-img").css("left", GameMap.myPoX);
                $(".map-el-holder").css("left", GameMap.myPoX);
                if(change==true)$(".player img").attr("src", "img/char_04.gif");
				checkBuilding()
              //  GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        moveup: function(change){
            gameSound.walk.play();
            if (GameMap.map[GameMap.playerY-1][GameMap.playerX] != 1 && GameMap.freezed === false){
                GameMap.playerY -= 1;
                GameMap.myPoY += GameMap.move;
                $(".map-img").css("top", GameMap.myPoY);
                $(".map-el-holder").css("top", GameMap.myPoY);
                if(change==true)$(".player img").attr("src", "img/char_02.gif");
				checkBuilding()
               // GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        movedown: function(change){
            gameSound.walk.play();
            if (GameMap.map[GameMap.playerY+1][GameMap.playerX] != 1 && GameMap.freezed === false){
                GameMap.playerY += 1;
                GameMap.myPoY -= GameMap.move;
                $(".map-img").css("top", GameMap.myPoY);
                $(".map-el-holder").css("top", GameMap.myPoY);
                if(change==true)$(".player img").attr("src", "img/char_01.gif");
				checkBuilding()
               // GameMap.Xcompleted = GameMap.freezed = false;
            }

        }
    };

	var UserData = {
		pageStage:0,
		userName:"모이모이"
	};
		
	/***** 오프닝 *****/
	$("#OPENING_START").on("click",function(){
        gameSound.click.play();
		$(".opening").hide();
		$(".opening-stage").show();
		UserData.pageStage = 1; 
	});
	$(".chat-input-txt").focus(function(){
		$(this).val("");
	});
	$("#START_GAME").on("click",function(){
        gameSound.click.play();
		$(".opening-stage-el--01").hide();
		$(".opening-stage-el--02").show();
		UserData.pageStage = 2; 
	});

	$(".game-alert .close").on("click",function(){
		gameSound.click.play();
		var closeAlertType = $(this).attr("data-btn-type");
		
		if( closeAlertType == "enter-building"){
			enterBuilding(buildingIndex);
		}else if(closeAlertType == "stay-building"){

		
		}else if(closeAlertType == "exit-building"){
			exitBuilding(buildingIndex);
		}
		
		$(this).parent("div").parent(".alert-border").hide();
		$(".game-alert").hide();

		
 	});


	
	function enterBuilding(b){
		UserData.pageStage = 4; 
		
		//채팅 인덱스값 초기화
		chatIndex = 0;

		//화면 요소 전환 
		$(".screen-left-panel .map-info").hide();
		$(".screen-right-panel .select-history").hide();
		$(".building-exit").show();
		gameSound.bgm.pause();
		gameSound.building.play();

		drawBuildingEl(b); //건물 안 요소들 채우기
		drawChatBox(b, chatIndex) //대화내용 채우기 
		animateChatBox(); //대화 박스 애니메이션 
		
	}

	function drawBuildingEl(b){
		$(".inside-building .background").find("div").hide();
		$(".inside-building .background").find(".background-b"+b).show();
		$(".npc-panel .npc-holder .npc-thumbs").find("img").attr("src", "img/b"+b+"-npc.png");
		$(".flag-panel .position-bottom").html(buildingNameObj[b]);
		$(".npc-name p").html(npcNameObj[b]);
		$(".inside-building").fadeIn(1000);
	
	};
	
	
	//채팅 내용을 담고 있는 객체 
	var chatData = {
		"b2": {
			1: {
				msg: ["<p>아이고~ 어서 오시게나. 행색을 보아하니 다른 나라로 떠나는 여행자인 것 같은데... 쉬어 갈텐가? 하루 숙박은 300골드라네!</p>","<p>쉬는 건 차차 생각해볼텐데… 왜 반말을 하시지요?</p>"],
				type: "normal",
				phase:1,
				showItemPanel: false

			},
			2: {
				msg: ["<p>게임 컨셉에 몰두하다보니 실례를 범했습니다. 우선 짐부터 내려놓으셔요.</p>","<p>마을에 민가가 별로 없어 여기서 쉴 것 같긴 한데… 다른 나라도 비슷한가 보죠?</p>"],
				type: "normal",
				phase:1,
				showItemPanel: false
			},
			3: {
				msg: ["<p>주먹만한 섬마을에 민가가 있어야 얼마나 있겠습니까. G4는 각각 다르다고는 하는데, 거기도 사정들이 다 복잡한가봐요. 집 지을 땅 찾는 게 어디 쉽습니까?</p>","<p>소개 좀 해주세요.</p>"],
				type: "normal",
				phase:1,
				showItemPanel: false
			},
			4: {
				msg: ["<p>좋소~ 자...명재국부터 알려드리지요. 명재국은 5년 안에 주택 250만호 공급, 무주택자면 누구나 입주할 수 있는 집을 짓겠다고 합디다. ‘기본주택’이라는 건데 30년 이상 임대할 수 있는 것도 있고, 토지는 공공이 보유하고 주택만 분양하는 형태도 있다더라구요.</p>","<p>명재국이라... 자세한 정보는 왼쪽에서 확인해야겠다</p>"],
				type: "normal",
				phase:1,
				showItemPanel: true,
			},
			5: {
				msg: ["<p>열석국은 현재 5%인 장기 공공임대주택을 5년 내 20%까지 늘려 집 없는 가구 44% 중 절반이 공공주택에서 살게 한다고 합니다. 집을 소유하고 싶으면 ‘토지임대부’로 공공자가주택을 이용하면 되고 집을 빌린 사람들이 계속 거주할 권리(계약갱신청구권)를 넓히고, 임대료 상한제 적용도 확대한다고 들었습니다.</p>","<p>열석국이라... 자세한 정보는 왼쪽에서 확인해야겠다.</p>"],
				type: "normal",
				phase:1,
				showItemPanel: true
			},
			6: {
				msg: ["<p>안수국도 5년 안에 250만호를 공급한다고 합니다. 그 중 30만호는 시세보다 싸게 분양해 ‘원가주택’이라고 부른다네요. 거주 5년차부터는 원할 경우 국가에 되팔고 차익 70%이상을 가져갈 수 있답니다. 다른 20만호는 청년·신혼부부, 무주택자들에겐 역세권에 공공분양주택으로 제공할하고, 이들에겐 주택담보대출비율도 80%로 완화한다더라구요.</p>","<p>안수국이라... 자세한 정보는 오른쪽에서 확인해야겠다</p>"],
				type: "normal",
				phase:1,
				showItemPanel: true
			},
			7: {
				msg: ["<p>상심국은 향후 5년동안 수도권에 150만호, 전국 250만호를 공급한다고 합니다. 이 중 100만호를 토지임대부 안심주택으로 하고, 그 중 절반인 50만호를 청년들에게 우선 공급한다네요. 무주택 실소유자들에겐 45년 초장기로 이용할 수 있는 모기지론도 도입한답니다.</p>","<p>상심국이라... 자세한 정보는 오른쪽에서 확인해야겠다.</p>"],
				type: "normal",
				phase:1,
				showItemPanel: true
			},
			8: {
				msg: ["<p>어떻소, 이 중 어떤 나라의 상황이 가장 좋은 것 같소?</p>","<p>나는...(선택은 번복할 수 없다. 신중히 결정하자)</p>"],
				type: "userSelect", //userselect 타입에서는 다음 버튼 사라지고, 4개의 선택 버튼 뜨도록.
				showItemPanel: true,
				phase:1,
				optStrList: [
					{
						owner: 1,
						opt: "명재국 - 기본주택"
					},
					{
						owner: 2,
						opt: "열석국 - 장기공공임대"
					},
					{
						owner: 3,
						opt: "안수국 - 원가주택"
					},
					{
						owner: 4,
						opt: "상심국 - 토지임대부 안심주택"
					}
				]
			},
			9: {
				msg: ["<p>지당한 선택이십니다. 자자, 이제 어떤 방에 묵으실...</p>","<p>주택 정책에는 공급만 있는 게 아닌데. 혹시 부동산 세금 제도도 좀 아십니까?</p>"],
				type: "normal", 
				phase:2,
				showItemPanel: false
			},
			10: {
				msg: ["<p>아이고 손님~ 얘기만 하다 날밤 새겠습니다. 잠은 언제 주무시려고…</p>","<p>날도 좋은데 오늘은 구름 덮고 별 보면서 자야지요.</p>"],
				type: "normal",
				phase:2,
				showItemPanel: false
			},
			11: {
				msg: ["<p>제가 또 관련업에 종사하다보니 정보가 좀 있습니다. 이거는 아무한테나 안 알려드리는 건데…</p>","<p>이게 다 무엇이죠?</p>"],
				type: "normal",
				phase:2,
				showItemPanel: true
			},
			12: {
				msg: ["<p>G4에서 목숨 걸고 빼돌린 부동산 세제 기밀문서입니다. 어디 함부로 꺼낼 물건들이 아닌데 특별히 관심이 있어보이시니…</p>","<p>한번 설명을 해주시지요.</p>"],
				type: "normal",
				phase:2,
				showItemPanel: true
			},
			13: {
				msg: ["<p>○○국에서 가져온 ‘국토보유세의 서’입니다. 0.17% 수준인 부동산 보유 실효세율을 1%까지 끌어올려 투기 수요를 억제하는 방안이 담겨 있습니다.</p>","<p>(‘국토보유세의 서’라… 자세한 정보는 왼쪽에서 확인해야겠다.)</p>"],
				type: "normal",
				phase:2,
				showItemPanel: true
			},
			14: {
				msg: ["<p> □□국에서 가져온 ‘세 부담 완화의 서’입니다. 토지·주택에 매기는 종합부동산세, 집 팔 때 내는 양도소득세 등을 낮추는 방안이 담겨있습니다.</p>","<p>(‘세 부담 완화의 서’라… 자세한 정보는 왼쪽에서 확인해야겠다.)</p>"],
				type: "normal",
				phase:2,
				showItemPanel: true
			},
			15: {
				msg: ["<p>△△국에서 가져온 ‘토지초과이득세의 서’입니다. 2주택부터 세금 중과, 3주택 이상은 임대사업등록을 의무화하고 땅값이 올라 이득을 보면 토지초과이득세를 내는 방안입니다.</p>","<p>(‘토지초과이득세의 서’라… 자세한 정보는 오른쪽에서 확인해야겠다.)</p>"],
				type: "normal",
				phase:2,
				showItemPanel: true
			},
			16: {
				msg: ["<p>마지막으로 ◇◇국에서 가져온 ‘$$$%%의 서’입니다. 내용 보충</p>","<p>(‘$$$%%의 서’라… 자세한 내용은 오른쪽에서 확인해야겠다.)</p>"],
				type: "normal",
				phase:2,
				showItemPanel: true
			},
			17: {
				msg: ["<p>손님께서는 어떤 기밀문서에 가장 혹하시오?</p>","<p>나는...(선택은 번복할 수 없다. 신중히 결정하자)</p>"],
				type: "userSelect", //userselect 타입에서는 다음 버튼 사라지고, 4개의 선택 버튼 뜨도록.
				showItemPanel: true,
				phase:2,
				optStrList: [
					{
						owner: 1,
						opt: "국토보유세의 서"
					},
					{
						owner: 2,
						opt: "세 부담 완화의 서"
					},
					{
						owner: 3,
						opt: "토지초과이득세의 서"
					},
					{
						owner: 4,
						opt: "$$$%%의 서"
					}
				]
			},
			18: {
				msg: ["<p>어찌 도움이 좀 되셨을까요? 그럼 이제 방은 309호로…</p>","<p>아이고! 내 정신 좀 봐. 밥부터 먹고 온다는 걸 깜박했네! 이거 미안합니다. 내 금방 볼일 보고 돌아올게요!</p>"],
				type: "normal",
				phase:3,
				showItemPanel: false
			},
			19: {
				msg: ["<p>거, 거기 서!!!</p>","<p>(도망가자!!!!)</p>"],
				type: "userExit", // 여기서는 다음이 사라지고 퇴장으로 or 다음버튼이 퇴장기능
				phase:3,
				showItemPanel: false
			}
		}

	};

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
			2: null,
			3: null
		},
		"b6":{
			1: null,
			2: null,
			3: null
		},
		"b7":{
			1: null,
			2: null,
			3: null
		},
		"b8":{
			1: null,
			2: null,
			3: null
		}
	};

	var ItemData = {
		"b2":{
			"phase1": [
				{
					owner:1,
					name:"기본주택",
					thumb:false,
					desc:"국가로부터 주택을 30년 이상 임대받을 수 있다. 단, 토지는 공공이 보유한다.",
					descFull:"기본주택에 대한 긴 설명. 임기 내 주택 250만호를 공급하고 그중 100만호를 중산층을 포함한 무주택자 누구에게나 공급하는 '기본주택'을 공약했다. 이는 중산층까지 거주할 수 있는 공공임대주택을 값싸게 공급하는 것을 목표로 한다. 시세 절반 이하인 건설원가 수준의 저렴한 임대료로 30년 이상 살 수 있는 양질의 공공주택을 공급하면 주거 불안이 해소된다고 주장한다. 공공임대는 13평 정도였다면 33평형까지 해서 네 가족이 평생 역세권에서, 지금 금액으로 하면 월세 60만여 원 정도로 원하면 얼마든지 살 수 있을 것."
				},
				{
					owner:2,
					name:"장기공공임대",
					thumb:false,
					desc:"십년 이상 살 수 있는 장기 공공 임대 주택을 20%까지 늘린다. 전체 국민의 절반이 공공주택에 살게한다.",
					descFull:"장기공공임대에 대한 설명. 거주할 수 있는 공공임대주택을 값싸게 공급하는 것을 목표로 한다. 시세 절반 이하인 건설원가 수준의 저렴한 임대료로 30년 이상 살 수 있는 양질의 공공주택을 공급하면 주거 불안이 해소된다고 주장한다. 공공임대는 13평 정도였다면 33평형까지 해서 네 가족이 평생 역세권에서, 지금 금액으로 하면 월세 60만여 원 정도로 원하면 얼마든지 살 수 있을 것."
				},
				{
					owner:3,
					name:"원가주택",
					thumb:false,
					desc:"5년 안에 250만호를 공급하고 이중 30만호를 시세보다 싸게 분양한다. 청년, 신혼부부는 주택 가격의 80%까지 돈을 빌려준다.",
					descFull:"원가주택에 대한 설명. 거주할 수 있는 공공임대주택을 값싸게 공급하는 것을 목표로 한다. 시세 절반 이하인 건설원가 수준의 저렴한 임대료로 30년 이상 살 수 있는 양질의 공공주택을 공급하면 주거 불안이 해소된다고 주장한다. 공공임대는 13평 정도였다면 33평형까지 해서 네 가족이 평생 역세권에서, 지금 금액으로 하면 월세 60만여 원 정도로 원하면 얼마든지 살 수 있을 것."
				},
				{
					owner:4,
					name:"토지임대부 안심주택",
					thumb:false,
					desc:"무주택 실소유자들에겐 45년 초장기로 이용할 수 있는 모기지론 도입한다.",
					descFull:"토지임대부 안심주택에 대한 설명. 거주할 수 있는 공공임대주택을 값싸게 공급하는 것을 목표로 한다. 시세 절반 이하인 건설원가 수준의 저렴한 임대료로 30년 이상 살 수 있는 양질의 공공주택을 공급하면 주거 불안이 해소된다고 주장한다. 공공임대는 13평 정도였다면 33평형까지 해서 네 가족이 평생 역세권에서, 지금 금액으로 하면 월세 60만여 원 정도로 원하면 얼마든지 살 수 있을 것"
				}
			
			],
			"phase2": [
				{
					owner:1,
					name:"국토보유세의 서",
					thumb:"b2-pha2-item01.png",
					desc:"국가로부터 주택을 30년 이상 임대받을 수 있다. 단, 토지는 공공이 보유한다.",
					descFull:"국토보유세의 서에 대한 설명. 명재국은 5년 안에 주택 250만호를 공급한다. 무주택자면 누구나 입주할 수 있는 집으로 국민이 국가로부터 30년 이상 임대할 수 있는 것도 있고, 토지는 공공이 보유하고 주택만 분양하는 형태도 있다."
				},
				{
					owner:2,
					name:"세 부담 완화의 서",
					thumb:"b2-pha2-item01.png",
					desc:"십년 이상 살 수 있는 장기 공공 임대 주택을 20%까지 늘린다. 전체 국민의 절반이 공공주택에 살게한다.",
					descFull:"세 부담 완화의 서에 대한 설명. 명재국은 5년 안에 주택 250만호를 공급한다. 무주택자면 누구나 입주할 수 있는 집으로 국민이 국가로부터 30년 이상 임대할 수 있는 것도 있고, 토지는 공공이 보유하고 주택만 분양하는 형태도 있다."
				},
				{
					owner:3,
					name:"토지초과이득세의 서",
					thumb:"b2-pha2-item01.png",
					desc:"5년 안에 250만호를 공급하고 이중 30만호를 시세보다 싸게 분양한다. 청년, 신혼부부는 주택 가격의 80%까지 돈을 빌려준다.",
					descFull:"토지초과이득세의 서에 대한 설명. 명재국은 5년 안에 주택 250만호를 공급한다. 무주택자면 누구나 입주할 수 있는 집으로 국민이 국가로부터 30년 이상 임대할 수 있는 것도 있고, 토지는 공공이 보유하고 주택만 분양하는 형태도 있다."
				},
				{
					owner:4,
					name:"$$$%%의 서",
					thumb:"b2-pha2-item01.png",
					desc:"무주택 실소유자들에겐 45년 초장기로 이용할 수 있는 모기지론 도입한다.",
					descFull:"$$$%%의 서에 대한 설명. 명재국은 5년 안에 주택 250만호를 공급한다. 무주택자면 누구나 입주할 수 있는 집으로 국민이 국가로부터 30년 이상 임대할 수 있는 것도 있고, 토지는 공공이 보유하고 주택만 분양하는 형태도 있다"
				}
			
			]
		
		}
	
	}

	function drawChatBox(bi,ci){
		var biStr = "b"+bi;
		var chatIndex = String(ci*1+1);
		var chatSetObj = chatData[biStr][chatIndex];

		//console.log(chatSetObj);

		
		var $npcChat = $(".npc-panel .chat-box .typed-holder");
		var $userChat = $(".user-panel .chat-box .typed-holder");
		
		$npcChat.html("");
		$userChat.html("");

		/*
		
		$npcChat.typed({strings: [ chatSetObj.msg[0]  ], typeSpeed: 30, callback: function(){
			$userChat.typed({strings: [ chatSetObj.msg[1] ], typeSpeed: 30});
		} });*/
		$npcChat.html(chatSetObj.msg[0]);
		$userChat.typed({strings: [ chatSetObj.msg[1] ], typeSpeed: 0});

		var phase = chatSetObj.phase;
		if(chatSetObj.type == "normal"){
			EnterPassMsg = true;
			$(".user-chat-select").hide();
			$(".user-panel .chat-box .chat-next-btn").show();
		}else if(chatSetObj.type == "userSelect"){ // 사용자 선택 
			EnterPassMsg = false;
			$(".chat-bottom-btn").hide();
			//사용자 채팅 내 선택 버튼 만들기
			var optArr = chatSetObj.optStrList;
			makeUserChatSelectBtn(optArr, phase);
			$(".user-panel .chat-box .user-chat-select").show();
		}else if(chatSetObj.type == "userExit"){
			EnterPassMsg = false;
			$(".user-chat-select").hide();
			$(".exit-panel").hide();
			$(".user-panel .chat-box .exit-building-btn").show();
			
		}
		
		if( chatSetObj.showItemPanel == true){
			//아이템 미리보기 패널
			makeItemPreviewPanel(bi,ci, phase);
			$(".user-select-preview").show();
		}else if( chatSetObj.showItemPanel == false){
			$(".user-select-preview").hide();
		}

	}

	//아이템 미리보기 패널 채우기
	function makeItemPreviewPanel(bi,ci, phase){
		var biStr = "b"+bi;
		var chatIndex = String(ci*1+1);
		var phaseStr = "phase"+phase;
		var itemDataArr= ItemData[biStr][phaseStr];
	
		$(".user-select-preview .select-preview-panel ul").html(""); //초기화
		$(".user-select-preview .select-preview-panel ul").attr("data-phase", phaseStr);
		itemDataArr.forEach(function(v,i,a){
			var $ItemHolder;
			if(i<2){
				$ItemHolder = $(".user-select-preview-left").find(".select-preview-panel ul");
			}else{
				$ItemHolder =  $(".user-select-preview-right").find(".select-preview-panel ul");
			}
			if( v.thumb == false || v.thumb == "FALSE"){
				var itemStr = "<li data-preview='"+ v.owner+"'><p class='opt-name'>"+ v.name+"</p><p class='opt-desc'>"+v.desc+"</p><div class='desc-more-btn'>설명 더보기</div></li>";
			}else{
				var itemStr = "<li data-preview='"+ v.owner+"'><div class='opt-thumbs'><img src='img/"+v.thumb+"' alt=''></div><p class='opt-name'>"+ v.name+"</p><p class='opt-desc'>"+v.desc+"</p><div class='desc-more-btn'>설명 더보기</div></li>";
			}
			
			$ItemHolder.append(itemStr);
		})

		$(".user-select-preview .select-preview-panel ul li").css({"height":  ($(".user-select-preview").width()*1.25) +"px" });
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
		var itemDataObj =ItemData[biStr][pi][ii-1];
		if( itemDataObj.thumb == false || itemDataObj.thumb == "FALSE"){
			$(".item-more-info-layer .thumbs").hide();
			$(".item-more-info-layer .thumbs").find("img").attr("src", "");
		}else{
			$(".item-more-info-layer .thumbs").show();
			$(".item-more-info-layer .thumbs").find("img").attr("src", "img/"+itemDataObj.thumb);
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


	//사용자 채팅 내 선택 버튼 만들기
	function makeUserChatSelectBtn(optArr, phase){
		var _optArr = optArr;
		$(".user-chat-select ul").html("");//초기화
		$(".user-chat-select ul").attr("data-phase", phase);
		_optArr.forEach(function(v,i,a){
			var optStr = "<li class='opt' data-opt='"+v.owner+"'>"+v.opt+"</li>";
			$(".user-chat-select ul").append(optStr);
		})
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



	//채팅 내 나가기 버튼 클릭
	$(".exit-building-btn").on("click",function(e){
		exitBuilding(buildingIndex);
	});

	function animateChatBox(){
		$(".npc-panel .npc-chat-box-holder .npc-holder").animate({"opacity":"1"}, 500);
		$(".npc-panel .npc-chat-box-holder .chat-box").delay(500).animate({"opacity":"1"}, 500);
		$(".user-panel .chat-box").delay(1000).animate({"opacity":"1"}, 500);
	}
	
	//화면 우측하단 나가기
	$(".building-exit").on("click",function(e){
		$(".game-alert").show();
		$(".alert-exit-building").show();
	});

	// building 요소들 모두 초기화
	function exitBuilding(b){
		
		var b = b || 2;
		setCharAfterExitBuilding(b);
		
		gameSound.bgm.play();
		gameSound.building.pause();
		
		UserData.pageStage = 3;

		$(".screen-left-panel .map-info").show();
		$(".screen-right-panel .select-history").show();
		$(".building-exit").hide();
		$(".user-select-preview .select-preview-panel ul").html("");
		$(".user-select-preview").hide();
		$(".user-chat-select ul").html("");
		$(".item-more-info-layer").hide();

		eraseBuilding();
		$(".inside-building").fadeOut(1000);
	
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
		$(".flag-panel .position-bottom").html("건물명");
		$(".npc-name P").html("NPC이름");
	};


	$(".mute").on("click",function(){
		 mute();
	});
	$(".muteoff").on("click",function(){
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
		$(".opening-stage").fadeOut(1000);
		$(".main-stage").animate({"opacity":"1"},1000);
        $(".main-stage").addClass("main-stage-on");
        gameSound.bgm.play();
		
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
	
	var buildingIndex;
	var chatIndex = 0;
	var userClearQuest = false; 
	var buildingNameObj = {
		2: "모이모이 제로웨이스트샵",
		3: "모이모이 여인숙",
		4: "모이모이 광장",
		5: "모이모이 도서관",
		6: "모이 기지국",
		7: "모이고라",
		8: "모이포구"
	};

	var npcNameObj = {
		2: "툰베리",
		3: "벨보이 잭",
		4: "커플 A",
		5: "오티스",
		6: "요원K",
		7: "아리스토텔레스",
		8: "루피"
	};


	function checkBuilding(){

		//건물 2~8
		if(GameMap.map[GameMap.playerY][GameMap.playerX]>=2 && GameMap.map[GameMap.playerY][GameMap.playerX]<9){

		   // GameMap.Xcompleted = GameMap.freezed = false;
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
			}  
			
		}else if(GameMap.map[GameMap.playerY][GameMap.playerX]== 9){
			GameMap.freezed = true;
			showBlockSailingAlert();
		}else{
			GameMap.freezed = false;
		}
	}

	function showEnterBuildingAlert(bi){
		var buildingName = buildingNameObj[bi];
		$(".alert-enter-building .building-name").html(buildingName);
		gameSound.alert.play();
		$(".game-alert").show();
		$(".game-alert").show();
		$(".alert-enter-building").attr("data-building-idx", bi);
		$(".alert-enter-building").show();
	};

	function showBlockBuildingAlert(map_idx){
		gameSound.alert.play();
		$(".game-alert").show();
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

   $(window).keydown(function(e){
		//console.log("키누름");
        
        //처음 시작 전
		if(UserData.pageStage == 0 && event.keyCode == 13){
			gameSound.click.play();
			$(".opening").hide();
			$(".opening-stage").show();
			UserData.pageStage = 1; 
		}else if(UserData.pageStage == 1&& event.keyCode == 13){
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
				//console.log(keyCode);
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
