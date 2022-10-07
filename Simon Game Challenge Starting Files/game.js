var gamePattern = [];

var buttonColors = ['red', 'blue', 'green', 'yellow'];

var userClickedPattern = [];

var level = 0;

///////////////////////////////// FUNCTION FOR PLAYING SOUNDS/////////////////////////////////////////

function playAudio(colourButton) {
  new Audio('sounds/' + colourButton + '.mp3').play();
}

//////////////////////////////// FUNCTION FOR FADE IN AND OUT AND CALLING PLAY SOUND ////////////////

function fadeInAndOut(colour) {
  $('#' + colour).fadeOut(100).fadeIn(100); //Fades in and out the chosen button colour.

  playAudio(colour);
}

///////////////////////////////FUNCTION FOR NEXT SEQUENCE /////////////////////////////////////////
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); //console.log(randomNumber);

  var randomChosenColour = buttonColors[randomNumber]; //console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);

  fadeInAndOut(randomChosenColour);

  $('#level-title').text('Level ' + level);

  level++;

  userClickedPattern = [];

}

//////////////////////////////////////FOR USER CLICKS/////////////////////////
$('.btn').click(function() {
  var userChosenColour = $(this).attr('id'); //console.log(userChosenColour);

  fadeInAndOut(userChosenColour);

  userClickedPattern.push(userChosenColour); //console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);

})

/////////////////////////////////// TO START THE GAME! ///////////////////////
var started = 'no';
$(document).keypress(function(event) {
  //console.log(event.key);
  while (started === 'no') {
    setTimeout(nextSequence,300);
    
    started = 'yes';
  }

});

////////////////////////CHECKS ANSWER, CONTINUES OR STOPS! /////////////////////////////

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    //console.log('Succes!');

  }

  else {
    console.log('Wrong!!');

    playAudio('wrong');

    $('body').addClass('game-over')

    setTimeout(function(){
      $('body').removeClass('game-over')
    },300)

    $('#level-title').text('Game Over, Press Any Key to Restart');

    starOver();

  }

  if (userClickedPattern.length == gamePattern.length){
    setTimeout(nextSequence,1000);
  }
}

function starOver(){
  level = 0;

  gamePattern = [];

  started = 'no';

}
