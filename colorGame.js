var numSquares = 6;
var colors = [];
var squares = document.getElementsByClassName("square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.getElementsByClassName("mode");


function init(){

	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function(e){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			e.target.classList.add("selected");

			if(e.target.dataset){
				numSquares = e.target.dataset.mode;
			} else {
				// IE<11
				numSquares = e.target.getAttribute('data-mode');
			}
			reset();
		});
	};

	resetButton.addEventListener("click",function(){
		reset();
	});

	for(var i=0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(e){
			//grab color of picked square
			var clickedColor = e.target.style.backgroundColor;
	
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				//do something
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			}
			else{
				e.target.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
	
		});
	}

	reset();
}


function reset() {

  messageDisplay.textContent = "";
  messageDisplay.textColor = 'red';
  resetButton.textContent = "New Colors";

  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //Change colorDisplay to match picked Color
  colorDisplay.textContent = pickedColor;
  //Change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
  for (var i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = color;
  }

}
function pickColor() {
  var random = Math.floor(Math.random()*colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors in array
  for (var i = 0; i < num; i++) {
    arr[i] = randomColor();
  }
  //return array
  return arr;
}

function randomColor() {
  //pick a "red" from 0-255
   var r = Math.floor(Math.random()*256);
  //pick a "green"from 0-255
  var g = Math.floor(Math.random()*256);
  //pick a "blue"from 0-255
  var b= Math.floor(Math.random()*256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

//start game
init();
