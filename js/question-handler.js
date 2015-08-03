
var submitButton = $('input#submitButton');


function init(){
	console.log('ready!');
	initClickListeners();
}

function initClickListeners(){
	submitButton.click(function(e){
		console.log('hi');
	});
}

function generateQuestion(){

}

window.onload = function(){
	init();
};