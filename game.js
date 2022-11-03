var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;	
var randomChosenColour;
var once = false;
var level = 1;

function nextSequence() { //biramo random broj 0-3 
    randomNumber = Math.floor(Math.random() * 4);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour); //dodajemo random boju u game pattern niz
	$("h1").text("Level " + level);
	level++;
	select();
}

function select() { //animacija na random izabrani dugmic
    var temp = $("#" + randomChosenColour);
    temp.animate({ opacity: 0.1 }, "fast");
    temp.animate({ opacity: 1 }, "fast");
    var aud = "sounds/" + randomChosenColour + ".mp3";
	// console.log(aud);
    playSound(aud);
}


$(".btn").on("click", handler); //animaciaj i zvuk kad kliknemo na dugmic
function handler(event) {
	var userChosenColor = event.target.id;
	userClickedPattern.push(userChosenColor);
	var aud = "sounds/" + userChosenColor + ".mp3";
	playSound(aud);
	animatePress(userChosenColor);
	checkAnswer();
}
function playSound(name) { //zvuk
	var aud = new Audio(name);
	aud.volume = 0.2;
	aud.play();
}
function animatePress(currentColor) { //animacija
	$("#" + currentColor).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

$(".startBtn").on("click", gameStart);

$(document).on("keydown", gameStart);
function gameStart() {
	if(once == false) {
		nextSequence();
		// select();
		once = true;
	}
}

function checkAnswer() {
	var temp = false;
	for(var i=0; i<userClickedPattern.length; i++) {
		if(userClickedPattern[i] === gamePattern[i]) {
			console.log("correct");
		} else {
			temp = true;
			$("h1").text("GAME OVER, Press Any Key To Restart");
			playSound("sounds/wrong.mp3");
			$("body").addClass("game-over");
			setTimeout(() => {
				$("body").removeClass("game-over");
			}, 200);
			startOver();
			break;
		}
	}
	if(gamePattern.length === userClickedPattern.length) {
		if(temp === true) {
			// $("h1").text("GAME OVER");
		} else {
			userClickedPattern = [];
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	}
}

function startOver() {
	level = 1;
	userClickedPattern = [];
	gamePattern = [];
	once = false;
}