var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("tap", function () {
  if (!started) {
    started = true;
    nextSequence()

  }

})

// listen for color clicks
$(".btn").click(function(e) {
  var userChosenColor = e.currentTarget.classList[1];
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

})

//listen for any key to Start
$(document).keydown(function () {
  if (!started) {
    started = true;
    nextSequence()

  }

})

$(document).click(function () {
  if (!started) {
    started = true;
    nextSequence()

  }

})

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];

  gamePattern.push(randomColor);
  console.log(gamePattern);
  console.log(userClickedPattern);

  setTimeout(function () {

    // play color sound
    playSound(randomColor);

    // flash the button
    animatePress(randomColor);
  }, 1000);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("right");
    if (currentLevel === (level - 1)) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over");
    setTimeout(function () {
      $("h1").text("Press Any Key to Start");
    }, 3000);
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
