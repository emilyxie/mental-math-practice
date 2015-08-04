var WRONG_COLOR = '#c0392b';
var POSSIBLE_TYPES = ['addition', 'subtraction', 'multiplication','division'];
var submitButton = $('input#submitButton');
var inputText = $('input[name=answer]');
var questionText = $('#question-text');
var headerContainer = $('.header-container');
var currentQuestion = {text: null, type: null, answer: null};
var activeTypes = ['addition'];

function init(){
  generateQuestion();
	initListeners();
}

function initListeners(){
  submitButton.mousedown(function(e){
    submitButton.removeClass('hover');
    submitButton.addClass('focus-button');
  });

  $(document).mouseup(function(){
      submitButton.addClass('hover');
      submitButton.removeClass('focus-button');
  });
	submitButton.click(function(e){
    e.preventDefault();
		if (checkAnswer($('input[name=answer]').val())){
      inputText.css("border-top-color", '');
      inputText.val('');
      generateQuestion();
		} else{
      inputText.css("border-top-color", WRONG_COLOR);
			inputText.effect( "shake" );
		}
  });

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

  currentQuestion.text = [num1, sign, num2].join(" ");
  questionText.html(currentQuestion.text);
}

function checkAnswer(inputAnswer){
  return parseInt(inputAnswer, 10) === currentQuestion.answer;
}

window.onload = function(){
	init();
};