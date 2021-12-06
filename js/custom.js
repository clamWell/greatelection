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
		},
	}


	$(window).resize(function() {
		screenWidth = $(window).width();
		screenHeight = $(window).height();
		GameSetting.settingViewPort();
        GameMap.scaleSetting();
	});

    //sound설정
    var gameSound = {
        bgm : null,
        walk: null,
        click: null,
            
        settingSound: function(){
            this.bgm = new Audio("sound/spring.mp3");
            this.bgm.type = "audio/mp3";
            this.bgm.loop = true;
            this.bgm.load();
            this.bgm.volume = .25;

            this.walk = new Audio("sound/walk.mp3");
            this.walk.type = "audio/mp3";
            this.walk.volume = .9;
            this.walk.load();

            this.click = new Audio("sound/click.mp3");
            this.click.type = "audio/mp3";
            this.click.volume = .25;
            this.click.load();
        }
	}

    var GameMap = {
        //지도에 추후 건물, NPC 추가
        map: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //1
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //2
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //3
            [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //4
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //5
            [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //6
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //7
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //8
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //9
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //10
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //11
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //12
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //13
			[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //14
			[1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //15
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //16
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //17
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //18
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //19
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //20
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //21
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //22
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //23
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //24
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //25
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //26
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //27
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //28
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //29
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //30
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //31
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //32
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //33
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //34
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //35
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //36
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //37
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //38 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //39 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //40 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //41 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //42 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //43 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //44 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //45 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //46 > 바다
			[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //47 > 바다
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
		multipleValue: 7,

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
            $(".npc-holder").css({"width": this.mapW, "height": this.mapH});
            $(".player-holder").css({"width": this.move, "height": this.move});
            $(".player-holder").css({"top": this.move*((this.multipleValue-1)/2)+"px", "left": this.move*((this.multipleValue-1)/2)+"px"});

            //맵 초기 위치
            $(".map-img").css({left : "-=" + this.move * 30+ "px", top : "-=" + this.move * 13 + "px"});
            $(".npc-holder").css({left : "-=" + this.move * 30+ "px", top : "-=" + this.move * 13 + "px"});
            GameMap.myPoX -= this.move * (30 - 3);
            GameMap.myPoY -= this.move * (13 - 3);
            this.playerX = 30;
            this.playerY = 13;
            
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
            $(".npc-holder").css({"width": this.mapW, "height": this.mapH});
            $(".player-holder").css({"width": this.move, "height": this.move});
            $(".player-holder").css({"top": this.move*((this.multipleValue-1)/2)+"px", "left": this.move*((this.multipleValue-1)/2)+"px"});

        },
        moveleft: function(){
            gameSound.walk.play();
            if (GameMap.map[GameMap.playerY][GameMap.playerX-1] != 1 && GameMap.freezed === false && GameMap.map[GameMap.playerY][GameMap.playerX-1] != undefined){

                GameMap.playerX -= 1;
                GameMap.myPoX += GameMap.move;
                $(".map-img").css("left", GameMap.myPoX);
                $(".npc-holder").css("left", GameMap.myPoX);
                $(".player img").attr("src", "img/char_03.gif");
                GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        moveright: function(){
            gameSound.walk.play();
           if (GameMap.map[GameMap.playerY][GameMap.playerX+1] != 1 && GameMap.freezed === false){
                GameMap.playerX += 1;
                GameMap.myPoX -= GameMap.move;
                $(".map-img").css("left", GameMap.myPoX);
                $(".npc-holder").css("left", GameMap.myPoX);
                $(".player img").attr("src", "img/char_04.gif");
                GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        moveup: function(){
            gameSound.walk.play();
            if (GameMap.map[GameMap.playerY-1][GameMap.playerX] != 1 && GameMap.freezed === false){
                GameMap.playerY -= 1;
                GameMap.myPoY += GameMap.move;
                $(".map-img").css("top", GameMap.myPoY);
                $(".npc-holder").css("top", GameMap.myPoY);
                $(".player img").attr("src", "img/char_02.gif");
                GameMap.Xcompleted = GameMap.freezed = false;
            }

        },
        movedown: function(){
            gameSound.walk.play();
            if (GameMap.map[GameMap.playerY+1][GameMap.playerX] != 1 && GameMap.freezed === false){
                GameMap.playerY += 1;
                GameMap.myPoY -= GameMap.move;
                $(".map-img").css("top", GameMap.myPoY);
                $(".npc-holder").css("top", GameMap.myPoY);
                $(".player img").attr("src", "img/char_01.gif");
                GameMap.Xcompleted = GameMap.freezed = false;
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
		$(".game-alert").hide();
	});


	
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

	function checkBuilding(){
	
	}

	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
	
	});

   
   $(window).keydown(function(e){
		console.log("키누름");
        
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
            //console.log(keyCode);
                
            //key코드에 있는 키값이 입력되었을 때만 동작
            if (KEY_CODES[keyCode]) {
		        e.preventDefault();
                KEY_STATUS[KEY_CODES[keyCode]] = true;
		        KEY_STATUS.double = true;

                if (KEY_STATUS.left || KEY_STATUS.right ||KEY_STATUS.down || KEY_STATUS.up || KEY_STATUS.space) {
					console.log(GameMap.playerX+", "+GameMap.playerY +"에서");
                    if (KEY_STATUS.left) {
                        GameMap.moveleft();
                    } else if (KEY_STATUS.right) {
                        GameMap.moveright();
                    } else if (KEY_STATUS.up) {
                        GameMap.moveup();
                    } else if (KEY_STATUS.down) {
                        GameMap.movedown();
                    }
					console.log(GameMap.playerX+", "+GameMap.playerY +"로 이동");
					
                }
            }

        }

	});

    //keyup시 홀드 해제
    $(window).keydown(function(e){
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
