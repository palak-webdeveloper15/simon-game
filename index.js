var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0

$(document).one("keydown", function (){
   nextSequence();
})


function nextSequence() {
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour); 
   $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
   playSound(randomChosenColour);
   level++ ;
   $("#" + "level-title").text("level " + level); 
}

$(".btn").on("click",function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern[userClickedPattern.length - 1], userClickedPattern.length - 1);
})

function playSound (name) {
 switch (name) {
         case 'blue':
            var blueSound = new Audio ("sounds/blue.mp3");
            blueSound.play ();
            break;

         case 'green':
            var greenSound = new Audio ("sounds/green.mp3");
            greenSound.play ();
            break;

         case 'red':
            var redSound = new Audio ("sounds/red.mp3");
            redSound.play ();
            break;

         case 'yellow':
            var yellowSound = new Audio ("sounds/yellow.mp3");
            yellowSound.play ();
            break;

         case 'wrong':
            var wrongSound = new Audio ("sounds/wrong.mp3");
            wrongSound.play ();
            break;
      
         default:
            console.log("error")
            break;
      }
}

function animatePress (currentColour) {
   $("#" + currentColour).addClass("pressed").delay(100).queue(function(next) {
      $("#" + currentColour).removeClass("pressed");
      next();
   })

}

function checkAnswer (currentLevel, currentIndex) {
   if (currentLevel == gamePattern[currentIndex]) {
      if (userClickedPattern.length == gamePattern.length) {
         setTimeout(function(){
            userClickedPattern.length = 0;
            nextSequence();
         }, 1000 );
   
      }
   } else {
      wrongAnswer("wrong");
   }
}

function wrongAnswer (chosenColour) {
   playSound(chosenColour);
   $("body").addClass("game-over");
   setTimeout(function(){
      $("body").removeClass("game-over")
   }, 200 );
   $("#" + "level-title").text("Game Over, press any key to restart");
   $(document).one("keydown", function(){
      startOver(0);
   })
   }

function startOver (newValue) {
   gamePattern.length = newValue;
   userClickedPattern.length = newValue;
   level = newValue;
   nextSequence();
}