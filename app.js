var state = {
  countToVal: 5,
  currentNum: 1
};

//================================================================================
// Navigation functions 
//================================================================================

function giveDirections() {
  $('#play-btn-container').addClass('hidden');
  $('#directions').removeClass('hidden');
}

function askForCount() {
  state.countToVal = 0;
  state.currentNum = 1;
  $('#count-to-form')[0].reset();
  $('#directions').addClass('hidden');
  $('#count-to-container').removeClass('hidden');
  $('#count-to').focus();
}

function startGame() {
  $('#count-to-container').addClass('hidden');
  $('#game-content').removeClass('hidden');

  // Resets stats and last game's results
  $('#goal').text(state.countToVal);
  $('#current-num').text(state.currentNum);
  $('#remaining').text(state.countToVal - state.currentNum + 1);
  $('#game-content-form')[0].reset();
  $('.js-results').empty();
  $('.js-replay-btn').addClass('hidden');

  $('#title h1').css({'font-size': "22px"});
  $('#user-answer').attr('size', $('#user-answer').attr('placeholder').length);
  $('#user-answer').focus();
}

function nextNumber() {
  state.currentNum++;
  $('#remaining').text(state.countToVal - state.currentNum + 1);
  $('#current-num').text(state.currentNum);
  $('#game-content-form')[0].reset();
  $('#user-answer').focus();
}

function display(content) {
  $result = $(`<div class="fizz-buzz-item">
                <span>${content}</span>
              </div>`);
  (typeof content == 'string') ? $result.addClass(content): null;
  $result.appendTo('.js-results');
  $('#results').removeClass('hidden');
}

function finish() {
  $('#game-content').addClass('hidden');
  $('.js-replay-btn').removeClass('hidden');
}

//================================================================================
// Validation functions
//================================================================================
function checkUserAnswer(userAnswer) {
    var num = state.currentNum;
    userAnswer = userAnswer.toLowerCase();
    var answer = fizzbuzz(num);
    
    userAnswer == answer ? correctHandler(answer) : incorrectHandler();
}

//
// Handler for correct answer
//
function correctHandler(answer) {
  display(answer);
  state.currentNum == state.countToVal ? finish() : nextNumber();
}

function incorrectHandler() {
  $('.js-try-again').removeClass('hidden');
}


//
// Checks if number is a multiple of 3,5, or both
//
function fizzbuzz(num) {
  if (num % 5 === 0 && num % 3 === 0) {
    return 'fizzbuzz';
  } else if (num % 3 === 0) {
    return 'fizz';
  } else if (num % 5 === 0) {
    return 'buzz';
  } else {
    return num;
  }
}




//================================================================================
// Event Listeners
//================================================================================
function playGameClick() {
  $('.js-play-btn').click(function(e) {
    e.preventDefault();
    giveDirections();
  });
}

function directionsClick() {
  $('#got-it-btn').click(function(e) {
    e.preventDefault();
    askForCount();
  });
}

function getCountToNumber() {
  $('#count-to-form').submit(function(e) {
    e.preventDefault();
    state.countToVal = $('#count-to').val();
    startGame();
  })
}

function getUserAnswer() {
  $('#game-content-form').submit(function(e) {
    e.preventDefault();
    var user_answer = $('#user-answer').val();
    $('.js-try-again').addClass('hidden');
    checkUserAnswer(user_answer);
  });
}

function playAgainClick() {
  $('.js-replay-btn').click(function(e) {
    e.preventDefault();
    $('#results').addClass('hidden');

    askForCount();
  });
}



//================================================================================
// Main entry
//================================================================================
$(function() {
  playGameClick();
  directionsClick();
  getCountToNumber();
  getUserAnswer();
  playAgainClick();
  
  // startGame(); // remove for user input
});






