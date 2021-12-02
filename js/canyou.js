var filter = "win16|win32|win64|mac|macintel";
var isMobile;
var winX = $(window).width();
var winY = $(window).height();

if (navigator.platform){
	if (filter.indexOf(navigator.platform.toLowerCase()) < 0 ){
		isMobile = true;
	} else {
		isMobile = false;
	}
}

var KEY_CODES = {
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
KEY_STATUS.double = false;

var myGame = {
	msv: 0,
	key: false,
	seq: 0, // 첫번째, 두번째 게임 구분, 0은 시작 전
	// 스크린 세로가 화면을 넘치면 세로 꽉 차고 가로 비 조절, 반대로 세로가 모자라면 세로를 꽉 채우고 가로 길이 비를 조절한다
	screenW: winX * 42 / 31 > winY ? (winY - 80) * 31 / 42 : winX,
	screenH: winX * 42 / 31 > winY ? winY - 80 : winX * 42 / 31,

	init: function(){
		// 스크린과 글꼴 크기를 세팅한다
		$(".width_holder").css({"width": this.screenW, "height": this.screenH});
		$("html, body").css("font-size", (this.screenW * 16 / 620) + "px");
	}
};

var gameMaze = {
	map: [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
		[1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[4,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
		[4,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
		[1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
		[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,1,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,2,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1]
	],
	mapW: 0,
	mapH: 0,
	move: 0,
	playerX: 1,
	playerY: 6,
	myPoX: 0,
	myPoY: 0,
	completed: false,
	Xcompleted: false,
	freezed: false,

	start: function(){
		this.mapW = $(".maze-map").width() * 2500 / 500;
		this.mapH = $(".maze-map").height() * 2500 / 500;
		this.move = $(".maze-map").width() * 2500 / 500 / 25;

		$(".map-img").css({"width": this.mapW, "height": this.mapH});
		$(".player-holder").css({"width": this.move, "height": this.move});
		$(".player-holder").css({"top": this.move * 2, "left": this.move * 2});
		$(".map-img").css({left : "+=" + this.move + "px"});
		$(".map-img").css({top : "-=" + this.move * 4 + "px"});
		gameMaze.myPoX += this.move;
		gameMaze.myPoY -= this.move * 4;

		$(".key-left").on("click", this.moveleft);
		$(".key-right").on("click", this.moveright);
		$(".key-up").on("click", this.moveup);
		$(".key-down").on("click", this.movedown);

		this.interval = setInterval(this.updateGame, 500);

	},


	moveleft: function(){

		if (gameMaze.map[gameMaze.playerY][gameMaze.playerX-1] != 1 && gameMaze.freezed === false && gameMaze.map[gameMaze.playerY][gameMaze.playerX-1] != undefined){
			gameMaze.playerX -= 1;
			gameMaze.myPoX += gameMaze.move;
			$(".map-img").css("left", gameMaze.myPoX);
			$(".player img").attr("src", "img/player-left-move.gif");
			gameMaze.Xcompleted = gameMaze.freezed = false;
		}

	},
	moveright: function(){
		if (gameMaze.map[gameMaze.playerY][gameMaze.playerX+1] != 1 && gameMaze.freezed === false){
			gameMaze.playerX += 1;
			gameMaze.myPoX -= gameMaze.move;
			$(".map-img").css("left", gameMaze.myPoX);
			$(".player img").attr("src", "img/player-right-move.gif");
			gameMaze.Xcompleted = gameMaze.freezed = false;

		}

	},
	moveup: function(){

		if (gameMaze.map[gameMaze.playerY-1][gameMaze.playerX] != 1 && gameMaze.freezed === false){
			gameMaze.playerY -= 1;
			gameMaze.myPoY += gameMaze.move;
			$(".map-img").css("top", gameMaze.myPoY);
			$(".player img").attr("src", "img/player-back-move.gif");
			gameMaze.Xcompleted = gameMaze.freezed = false;
		}

	},
	movedown: function(){
		if (gameMaze.map[gameMaze.playerY+1][gameMaze.playerX] != 1 && gameMaze.freezed === false){
			gameMaze.playerY += 1;
			gameMaze.myPoY -= gameMaze.move;
			$(".map-img").css("top", gameMaze.myPoY);
			$(".player img").attr("src", "img/player-move.gif");
			gameMaze.Xcompleted = gameMaze.freezed = false;
		}

	},

	updateGame: function(){
		myGame.msv += 0.01;
		myGame.msv = Number(parseFloat(myGame.msv).toFixed(2));
		$(".rad-numb").html(myGame.msv);

		if (gameMaze.map[gameMaze.playerY][gameMaze.playerX] === 2 && gameMaze.Xcompleted === false){

			gameMaze.Xcompleted = true;
			gameMaze.freezed = true;

			$(".game-modal .txt-box p").html("정확한 지점이 맞습니까?<br>여기는 아닌 듯 합니다.").queue(function(){
				$(".modal-confirm").show();
				$(".modal-yes, .modal-no").hide();
				$(".game-modal").delay(500).fadeIn(function(){
					$(".modal-confirm").on("click", function(){
						$(".game-modal").hide();
						$(".modal-confirm").off("click");
						gameMaze.freezed = false;
					});
				});
				$(".game-modal .txt-box p").dequeue();
			});

		} else if (gameMaze.map[gameMaze.playerY][gameMaze.playerX] === 3 && gameMaze.completed === false){

			gameMaze.completed = true;
			gameMaze.freezed = true;
			clearInterval(gameMaze.interval);

			$(".game-modal .txt-box p").html("연료봉이 떨어진 지점에<br>도착했습니다!").queue(function(){
				$(".modal-confirm").show();
				$(".modal-yes, .modal-no").hide();
				$(".game-modal").delay(500).fadeIn(function(){
					$(".modal-confirm").on("click", function(){
						$(".game-modal").hide();
						$(".seq03").fadeOut(function(){

							$(".seq04").fadeIn(function(){
								$(".game-catch").fadeIn(function(){
									$(".play-manual-close").on("click", function(){
										$(".game-catch").hide();
										myGame.seq = 2;
										gameCatch.start();
										$(".play-manual-close").off("click");
									});
									$(".play-jump").on("click", function(){
										$(".game-catch").hide(function(){
											$(".seq4").fadeOut(function(){
												$(".featureStory").fadeIn();
											});
										});
										$(".play-jump").off("click");
									});
								});
							});

						});
						$(".modal-confirm").off("click");
					});
				});
				$(".game-modal .txt-box p").dequeue();
			});

		} else if (gameMaze.map[gameMaze.playerY][gameMaze.playerX] === 4 && gameMaze.Xcompleted === false ){

			gameMaze.freezed = true;
			gameMaze.Xcompleted = true;

			$(".game-modal .txt-box p").html("작업을 중단하고<br>나가시겠습니까?").queue(function(){
				$(".modal-confirm").hide();
				$(".modal-yes, .modal-no").show();
				$(".game-modal").fadeIn(function(){
					$(".modal-yes").on("click", function(){
						$(".game-modal").hide();
						$(".seq03").fadeOut(function(){
							$(".featureStory").fadeIn();
						});
						$(".modal-confirm").off("click");
					});
					$(".modal-no").on("click", function(){
						$(".game-modal").hide();
						$(".modal-confirm").off("click");
						gameMaze.freezed = false;
					});
				});
				$(".game-modal .txt-box p").dequeue();
			});


		}

	}

};

var gameCatch = {
	completed: false,
	moveleft: function(){
	},
	moveright: function(){
	},
	moveup: function(){
	},
	movedown: function(){
	},
	start: function(){

	}
};

document.onkeydown = function(e) {

	if (myGame.seq === 0 || KEY_STATUS.double === true || isMobile === true) return;

	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;

  if (KEY_CODES[keyCode]) {
		e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
		KEY_STATUS.double = true;

		if (KEY_STATUS.left || KEY_STATUS.right ||
				KEY_STATUS.down || KEY_STATUS.up) {

			if (myGame.seq === 1){

				if (KEY_STATUS.left) {
					gameMaze.moveleft();
				} else if (KEY_STATUS.right) {
					gameMaze.moveright();
				} else if (KEY_STATUS.up) {
					gameMaze.moveup();
				} else if (KEY_STATUS.down) {
					gameMaze.movedown();
				}

			} else if (myGame.seq === 2){

				if (KEY_STATUS.left) {
					gameCatch.moveleft();
				} else if (KEY_STATUS.right) {
					gameCatch.moveright();
				} else if (KEY_STATUS.up) {
					gameCatch.moveup();
				} else if (KEY_STATUS.down) {
					gameCatch.movedown();
				}

			}

		}
  }
}

document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
		KEY_STATUS.double = false;

  }
}


$(document).ready(function(){

	myGame.init();

  //새로고침시 최상단
  window.onbeforeunload = function(){ window.scrollTo(0,0); }

  //IE8 경고문
  $(".backLayer").fadeTo(0, 0.8);
  $(".backLayer").height($(window).height());

  // Intro FadeIn
  $(".page-title").fadeIn(2000, 'swing');
  $(".startBtn").delay(1000).fadeIn(1000);

	//Intro > Seq01 경고문
	$(".startBtn").on("click",function(){
		$(".opening").fadeOut(1000);
		$(".seq01").delay(1400).fadeIn(1000);
		$(".alert-seq01-01").delay(3000).show();
//		$(".txt-box p").delay(4000).typed({strings: ["당신은 대한민국 원전의 연료팀 직원이다."],showCursor: false,typeSpeed: 50 });
//		$(".seq03").show();
		myGame.seq = 1;
		gameMaze.start();
	});


	//Seq01 Start
	$(".close01-01").on("click",function(){
		$(".alert-seq01-01").hide();
		$(".cover-shadow2").hide();
		$(".msg-box").show();
		$(".msg-box .msg-00").show();
		$(".click-txt").show();
		$(".person-me").show();
	});

	//Seq01 Screen
	$(".screen-click").on("click",function(){
		$(this).hide();
		$(".msg-box").hide();
		$(".msg-box .msg-00").hide();
		$(".person-me").fadeOut();
		$(".cover-shadow2").fadeIn();
		$(".seq01-bg").addClass("seq01-bg-blur");
		$(".des-screen").delay(1000).fadeIn();
		$(".screen-img .img-holder .screen-img01").delay(1500).show();
		$(".screen-txt .txt-holder .txt-01").delay(1500).show();
		$(".screen-txt .screen-txt-next-01").delay(1500).show();
	});

	//Seq01 Screen Next Button Event
	$(".screen-txt-next-01").on("click",function(){
		$(this).hide();
		$(".screen-img .img-holder .screen-img01").hide();
		$(".screen-txt .txt-holder .txt-01").hide();

		$(".screen-txt .screen-txt-next-02").show();
		$(".screen-img .img-holder .screen-img02").show();
		$(".screen-txt .txt-holder .txt-02-01").show();
	});
	$(".screen-txt-next-02").on("click",function(){
		$(this).hide();
		$(".screen-txt .txt-holder .txt-02-01").hide();
		$(".screen-img .img-holder .screen-img02").hide();

		$(".screen-txt .screen-txt-next-03").show();
		$(".screen-img .img-holder .screen-img02-2").show();
		$(".screen-txt .txt-holder .txt-02-02").show();
	});
	$(".screen-txt-next-03").on("click",function(){
		$(this).hide();
		$(".screen-img .img-holder .screen-img02-2").hide();
		$(".screen-txt .txt-holder .txt-02-02").hide();

		$(".screen-txt .screen-txt-next-04").show();
		$(".screen-img .img-holder .screen-img03").show();
		$(".screen-txt .txt-holder .txt-03").show();
	});
	$(".screen-txt-next-04").on("click",function(){
		$(this).hide();
		$(".screen-img .img-holder .screen-img03").hide();
		$(".screen-txt .txt-holder .txt-03").hide();

		$(".screen-txt .screen-txt-next-05").show();
		$(".screen-img .img-holder .screen-img04").show();
		$(".screen-txt .txt-holder .txt-04-01").show();
	});
	$(".screen-txt-next-05").on("click",function(){
		$(this).hide();
		$(".screen-txt .txt-holder .txt-04-01").hide();

		$(".screen-txt .screen-txt-next-06").show();
		$(".screen-txt .txt-holder .txt-04-02").show();
	});
	$(".screen-txt-next-06").on("click",function(){
		$(".des-screen").fadeOut();
		$(".cover-shadow2").fadeOut();
		$(".seq01-bg").removeClass("seq01-bg-blur");
		$(".person-me").delay(1000).fadeIn();
		$(".msg-box").delay(1500).fadeIn();
		$(".msg-box .msg-01").delay(1500).fadeIn();
		$(".msg-next-01").delay(2000).fadeIn();
	});

	//Seq01 >Seq02
	$(".msg-next-01").on("click",function(){
		$(".seq01").fadeOut(1000);
		$(".msg-box").hide();
		$(".msg-next-01").hide();
		$(".person-me").hide();

		$(".cover-shadow2").show();
		$(".seq02").delay(1400).fadeIn(1000);
		$(".alert-seq02-01").delay(3000).show();
	});

	//Seq02 Start
	$(".close02-01").on("click",function(){
		$(".alert-seq02-01").hide();
		$(".cover-shadow2").hide();
		$(".msg-box").delay(1000).show();
		$(".msg-box-person .bos").delay(1000).show();
		$(".msg-box .msg-02").delay(1200).show();
		$(".msg-next-02").delay(1200).fadeIn();
	});
	$(".msg-next-02").on("click",function(){
		$(this).hide();
		$(".msg-02").hide();
		$(".msg-03").show();
		$(".msg-next-03").fadeIn();
	});

	$(".msg-next-03").on("click",function(){
		$(this).hide();
		$(".msg-03").hide();
		$(".msg-box").hide();
		$(".msg-box-person .bos").hide();
		$(".seq02-bg").hide();
		$(".redlight").hide();
		$(".seq02-bg-02").fadeIn(1500);
		$(".seq02 .camera").delay(1000).fadeIn(1000);
		$(".seq02 .camera").delay(2000).css({"bottom":"0"});
		$(".alert-seq02-02").delay(5500).show();
	});

	//Seq02 카메라 내부
	$(".close02-02").on("click",function(){
		$(".alert-seq02-02").hide();
		$(".camera-screen").fadeIn(1000);
		$(".msg-box").delay(1000).show();
		$(".msg-04").delay(1000).show();
		$(".msg-next-04").delay(1000).fadeIn();
	});

	// Seq02 작업반장 멘트
	$(".msg-next-04").on("click",function(){
		$(this).hide();
		$(".msg-04").hide();
		$(".seq02 .camera").hide();
		$(".camera-screen").hide();
		$(".seq02-bg-02").hide();

		$(".redlight").fadeIn(1500);
		$(".seq02-bg").fadeIn(1500);
		$(".msg-box").delay(2000).show();
		$(".msg-box-person .bos").delay(2000).show();
		$(".msg-box .msg-05").delay(2000).show();
		$(".msg-next-05").delay(2000).show();
	});
	$(".msg-next-05").on("click",function(){
		$(this).hide();
		$(".msg-05").hide();
		$(".msg-06").show();
		$(".msg-next-06").show();
	});

	// Seq02 방사능 피폭 독백
	$(".msg-next-06").on("click",function(){
		$(this).hide();
		$(".msg-06").hide();
		$(".msg-box").hide();
		$(".msg-box-person .bos").hide();
		$(".mono").fadeIn(1500);
		$(".mono-01").delay(1500).fadeIn(2000);
		$(".mono-02").delay(3500).fadeIn(2000);
		$(".msg-next-07").delay(4000).fadeIn(1500);
	});

	// Seq02 다시 작업반장 멘트
	$(".msg-next-07").on("click",function(){
		$(this).hide();
		$(".mono").fadeOut();
		$(".msg-box").delay(2000).show();
		$(".msg-box-person .bos").delay(2000).show();
		$(".msg-box .msg-07").delay(2000).show();
		$(".put-demo").delay(2000).show();
		$(".msg-next-08").delay(2000).show();
	});
	$(".msg-next-08").on("click",function(){
		$(this).hide();
		$(".msg-07").hide();
		$(".put-demo").hide();
		$(".msg-08").show();
		$(".msg-next-09").show();
	});
	$(".msg-next-09").on("click",function(){
		$(this).hide();
		$(".msg-08").hide();
		$(".msg-09").show();
		$(".msg-next-10").show();
	});

	// Seq02 나 고민
	$(".msg-next-10").on("click",function(){
		$(this).hide();
		$(".msg-09").hide();
		$(".msg-box-person .bos").hide();
		$(".seq02 .person-me").show();
		$(".msg-10").show();
		$(".msg-next-11").show();
	});
	$(".msg-next-11").on("click",function(){
		$(this).hide();
		$(".msg-10").hide();
		$(".seq02 .person-me").hide();
		$(".msg-box-person .bos").show();
		$(".msg-11").show();
		$(".msg-next-12").show();
	});

	// Seq02 Yes/no
	$(".msg-next-12").on("click",function(){
		$(this).hide();
		$(".msg-11").hide();
		$(".msg-box").hide();
		$(".msg-box-person .bos").hide();
		$(".alert-seq02-03").fadeIn(1000);
	});

	// Seq02 Yes/no
	$(".txtNext-yes").on("click",function(){
		$(".alert-seq02-03").hide();
		$(".msg-box-person .bos").show();
		$(".msg-box").delay(1000).show();
		$(".msg-12-yes").delay(1000).show();
		$(".msg-next-13").delay(1000).show();
	});
	$(".txtNext-no").on("click",function(){
		$(".alert-seq02-03").hide();
		$(".msg-box-person .bos").show();
		$(".msg-box").delay(1000).show();
		$(".msg-12-no").delay(1000).show();
		$(".msg-next-13").delay(1000).show();
	});
	$(".msg-next-13").on("click",function(){
		$(this).hide();
		$(".msg-12-no").hide();
		$(".msg-12-yes").hide();
		$(".msg-13").show();
		$(".msg-next-14").show();
	});

	// Seq02 연습
	$(".msg-next-14").on("click",function(){
		$(this).hide();
		$(".msg-13").hide();
		$(".msg-box").hide();
		$(".msg-box-person .bos").hide();
		$(".practice").fadeIn(1500);
		$(".practice-txt-01").delay(1500).fadeIn(2000);
		$(".practice-txt-02").delay(3500).fadeIn(2000);
		$(".practice-txt-03").delay(5000).fadeIn(2000);
		$(".msg-practice-end").delay(5500).fadeIn(1000);
	});
	$(".msg-practice-end").on("click",function(){
		$(this).hide();
		$(".practice").fadeOut();
		$(".msg-box").delay(2000).show();
		$(".msg-box-person .bos").delay(2000).show();
		$(".msg-box .msg-14").delay(2000).show();
		$(".msg-next-15").delay(2000).show();
	});
	$(".msg-next-15").on("click",function(){
		$(this).hide();
		$(".msg-14").hide();
		$(".msg-box").hide();
		$(".msg-box-person .bos").hide();
		$(".door-open").fadeIn(1000);
		$(".alert-seq02-04").delay(2500).show();
	});

	// Seq03 시작
	$(".alert-seq02-04").on("click",function(){
		$(this).hide();
		$(".door-open").fadeOut(1000);
		$(".seq02").fadeOut(1000);
		$(".seq03").delay(3000).fadeIn(1000);
	});


});



// 공유

function sendSns(sns)
{

  var url = encodeURIComponent(location.href);
  var txt = encodeURIComponent($("title").html());


    switch(sns)
    {
      case 'facebook':
        window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
          break;

      case 'twitter':
          window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
          break;

  }

}
