var WRONG_COLOR = '#c0392b';
var DEFAULT_COLOR = '#1abc9c';
var POSSIBLE_TYPES = ['addition', 'subtraction', 'multiplication','division'];
var submitButton = $('input#submitButton');
var inputText = $('input[name=answer]');
var questionText = $('#question-text');
var headerContainer = $('.header-container');
var scoreContainer = $('.score-container');
var currentScore = $('.current-score');
var scoreText = $('.score-text');
var questionsAnswered = 0;
var questionsCorrect = 0;
var currentQuestion = {text: null, type: null, answer: null, incorrect: false};
var activeTypes = ['addition'];

function init(){
  generateQuestion();
	initListeners();
}

function initListeners(){
	submitButton.click(function(e){
    e.preventDefault();
		if (checkAnswer($('input[name=answer]').val())){
      inputText.css("border-top-color", '');
      inputText.val('');
      assessScore();
      generateQuestion();
		} else{
      inputText.css("border-top-color", WRONG_COLOR);
			inputText.effect( "shake" );
      assessScore();
		}
  });

  function assessScore() {
    var score = questionsCorrect/questionsAnswered;
    if(scoreText.hasClass('center-text')){
      scoreText.removeClass('center-text');
      scoreText.addClass('right-align-text');
      scoreText.addClass('score-text--percentage');
    }
    score *= 100;
    score = Math.round(score);
    if(score < 50){
      currentScore.css('background-color', WRONG_COLOR);
    } else {
      currentScore.css('background-color', DEFAULT_COLOR);
    }
    scoreText.html('Score: ' + score + '%');
    currentScore.css('width', score + '%');
    scoreText.css('right', (100 - score + 1) + '%');
  }

  submitButton.submit(function(e) {
    e.preventDefault(); // to stop the form from submitting
  });

  POSSIBLE_TYPES.forEach(function(type){
    $type = $('#'+type);
    $type.click(function(e){
      var $target = $(e.target);
      var targetId = $target.attr('id');
      if($target.hasClass('focus-button')){ //it is currently active
        $target.removeClass('focus-button');
        $target.addClass('hover');
        activeTypes.splice(activeTypes.indexOf(targetId), 1);
      } else { //it is not currently active
        $target.addClass('focus-button');
        $target.removeClass('hover');
        activeTypes.push(targetId);
      }
    });
  });

  window.addEventListener('scroll', function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;
    var shrinkOn = 50;
    if (distanceY > shrinkOn) {
      headerContainer.css('font-size', '1.5em');
    } else {
      headerContainer.css('font-size', '');
    }
  });
}

function generateQuestion(){
  currentQuestion.incorrect = false;
  currentQuestion.type = activeTypes[Math.floor((Math.random() * activeTypes.length))];
  var num1, num2, sign;
  switch (currentQuestion.type){
    case 'subtraction':
      num1 = Math.floor((Math.random() * 500) + 1);
      num2 = Math.floor((Math.random() * 500) + 1);
      currentQuestion.answer = Math.round(num1 - num2);
      sign = '-';
      break;
    case 'multiplication':
      num1 = Math.floor((Math.random() * 15) + 1);
      num2 = Math.floor((Math.random() * 50) + 1);
      currentQuestion.answer = Math.round(num1*num2);
      sign = '×';
      break;
    case 'division':
      currentQuestion.answer = Math.floor((Math.random() * 15) + 1);
      num2 = Math.floor((Math.random() * 50) + 1);
      num1 = Math.round(currentQuestion.answer*num2);
      sign = '÷';
      break;
    default:
      num1 = Math.floor((Math.random() * 500) + 1);
      num2 = Math.floor((Math.random() * 500) + 1);
      currentQuestion.answer = Math.round(num1 + num2);
      sign = '+';
      break;
  }
  var source = $("#math-question-template").html();
  var template = Handlebars.compile(source);
  var content = {num1: num1, num2: num2, sign: sign};
  var html = template(content);
  $("#math-question-placeholder").html(html);
}

function checkAnswer(inputAnswer){
  if (!currentQuestion.incorrect){
    questionsAnswered++;
  }
  var answerCorrect = parseInt(inputAnswer, 10) === currentQuestion.answer;
  if (!currentQuestion.incorrect && answerCorrect){
    questionsCorrect++;
  }
  currentQuestion.incorrect = !answerCorrect;
  return answerCorrect;
}

window.onload = function(){
	init();
};