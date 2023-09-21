var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keydown", handleKeydown);

//.log($("h1").text());

function handleKeydown(event) {
    if (started == false) {
        nextSequence();
        started = true;
         $("h1").text("Level 0");
    }
}

$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    //console.log("G: " + gamePattern);
    //console.log("U: " + userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
 });

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var colorId = "#" + randomChosenColor;
    $(colorId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}

function playSound(currentColor) {
    var buttonAudio = new Audio("sounds/" + currentColor + ".mp3");
    buttonAudio.play();

}

function animatePress(currentColor) {
    var colorId = "#" + currentColor;
    $(colorId).addClass("pressed");
    setTimeout(function () {
        $(colorId).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);      
        }
    } else {
        //console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    } 
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
