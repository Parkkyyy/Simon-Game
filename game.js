buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPatterm = [];

var started = false;
var level = 0;

$(document).keydown(function (e) {
  if (!started) {
    $("body").removeClass("game-over");
    nextSquence();
    started = true;
  }
});

document.querySelector("body").addEventListener("touchstart", function () {
  if (!started) {
    $("body").removeClass("game-over");
    nextSquence();
    started = true;
  }
});

$(".btn").click(function () {
  var userColorChosen = this.id;
  userClickedPatterm.push(userColorChosen);

  playSound(userColorChosen);
  animatePress(userColorChosen);

  checkAnswer(userClickedPatterm.length - 1);

});

function nextSquence() {
  userClickedPatterm = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPatterm[currentLevel]) {
    console.log("success");
    if (userClickedPatterm.length === gamePattern.length) {
      setTimeout(function () {
        nextSquence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    gamOver();
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 150);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function gamOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 3000);
}
