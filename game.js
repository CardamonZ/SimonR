var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

//Start with any key
$(document).keydown(function() {
  if(!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});

//Start with a button
$(".btn-start").on("click", function() {
  if(!started) {
  var startId = this.id;
  animateStart();
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});


function nextSequence() {
userClickedPattern = [];
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

// blinking
$("#" + randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

console.log(gamePattern);

// level+1
level++;
$("#level-title").text("Level " + level);
};

// Function to detect and effect triggered button
$(".btn").click(function() {
var userChosenColour = this.id;
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length - 1);
});

// audio for buttons
function playSound(name) {
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
};

// animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout (function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  };

  // animation for start button
  function animateStart() {
    $(".btn-start").addClass("pressed");
    setTimeout (function() {
      $(".btn-start").removeClass("pressed");
    }, 100);
    };

  // check answer Function

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("Success");
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout (function() {
          nextSequence();
        }, 1000);
        }
    }
    else {
      playWrongSound();
      animateWrong();
      $("h1").text("Game Over, Press a Button or Any Key to Restart");
      startOver();
      }
  };

  // audio for wrong answer
  function playWrongSound() {
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  };

  // animation for wrong answer
  function animateWrong() {
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);
    };

    // restart Function
    function startOver() {
      gamePattern = [];
      started = false;
      level = 0;
    }
