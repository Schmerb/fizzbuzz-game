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
  $('#directions').addClass('hidden');
  $('#count-to-container').removeClass('hidden');
}

function startGame() {
  $('#count-to-container').addClass('hidden');
  $('#game-content').removeClass('hidden');
  $('#title h1').css({'font-size': "22px"});
  $('#goal').text(state.countToVal);
  $('#remaining').text(state.countToVal - state.currentNum + 1);
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



//================================================================================
// Main entry
//================================================================================
$(function() {
  playGameClick();
  directionsClick();
  getCountToNumber();
  getUserAnswer();
  
  // startGame(); // remove for user input
});






