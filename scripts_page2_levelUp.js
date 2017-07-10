// Global Variables***************************************************
var guessButton = document.getElementById('guess');
var guessHTML = document.getElementById('guessNum');
var guessInput = document.getElementById('currGuess');
var min = localStorage.getItem("minimum");
var minHTML = document.getElementById('minRange');
var max = localStorage.getItem("maximum");
var maxHTML = document.getElementById('maxRange');
var resetButton = document.getElementById('reset');
var clearButton = document.getElementById('clear');
var levelUpButton = document.getElementById('levelUp');
var rangeUpdate = document.getElementById('increasedRange');
var targetNum = resetTargetNum();
var numWins = 0;


// console.log("Guess: ",guessInput);


// set min & max
minHTML.innerText = min;
maxHTML.innerText = max;

// disable guess and clear buttons
guessButton.disabled = true;
clearButton.disabled = true;

// event listeners
guessInput.addEventListener('input', enableGuessClear);
guessButton.addEventListener('click', validateInput);
clearButton.addEventListener('click', clearForm);
resetButton.addEventListener('click', goBackToPage1);
levelUpButton.addEventListener('click', levelUp);


// Functions***********************************************

// enable guess and clear buttons
function enableGuessClear(event){
  if (guessInput.value == ""){
    guessButton.disabled = true;
    clearButton.disabled = true;
  }
  else {
  guessButton.disabled = false;
  clearButton.disabled = false;
  }
}

// reset target number
function resetTargetNum() {
  targetNum = getRandomIntInclusive(min,max);
  return targetNum;
}

// get a random number between min & max
// getRandomIntInclusive from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// validate guess input
function validateInput(event){
  event.preventDefault();
  rangeUpdate.style.display = "none";
  var thisGuess = guessInput.value;
  var thisGuessINT = parseInt(thisGuess, 10);
    if (isNaN(thisGuessINT)) {
      window.alert(thisGuess + " is not a number. Please enter a number between " + min + " and " + max +".");
    }
    else if (thisGuessINT < min || thisGuessINT > max) {
      window.alert(thisGuess + " is out of range. Please enter a number between " + min + " and " + max +".")
    }
    else if (thisGuess != "") {
      guessHTML.innerText = thisGuessINT;
      isHighLowCorrect(thisGuessINT);
    }
}

// determine if guess is correct, high, or low
function isHighLowCorrect(numGuess){
  guessInput.value = "";
  guessButton.disabled = true;
  clearButton.disabled = true;
  var highLowCorrect = document.getElementById('highLowCorrect');
  var lastGuessHTML = document.getElementById('lastGuess');
  lastGuessHTML.innerText = "Your last guess was ";
  if (numGuess === targetNum){
    var correct = "Thank you for playing Number Guesser!";
    highLowCorrect.innerText = correct;
    winner();
  }
  else if (numGuess > targetNum){
    var high = "That is too high";
    highLowCorrect.innerText = high;
  }
  else {
    var low = "That is too low";
    highLowCorrect.innerText = low;
  }
}

// move to next level if guess is correct
function winner(){
  guessInput.value = "";
  numWins++;
  if (numWins < 3){
    var nextLevel = document.getElementById('lastGuess');
    nextLevel.innerText = "That's correct!";
    var clickLevelUp = document.getElementById('highLowCorrect');
    clickLevelUp.innerHTML = "<p>Click <span id=\"levUp\">Level Up</span> to proceed to Level " + (numWins+1) +".</p>";
    levelUpButton.style.display = "block";
  }
  else {
    var nextLevel = document.getElementById('lastGuess');
    nextLevel.innerText = "You win!";
  }
}

// increase range of numbers, disable guess and clear buttons, and welcome to new level
function levelUp(event){
  event.preventDefault();
  rangeUpdate.style.display = "block";
  levelUpButton.style.display = "none";
  if (numWins == 1) {
    increaseRange();
    var welcome = document.getElementById('lastGuess');
    welcome.innerText = "Welcome to Level 2!";

    var guessVal = document.getElementById('guessNum');
    guessVal.innerText = "?";

    minHTML.innerText = min;
    maxHTML.innerText = max;
    var newRange = document.getElementById('highLowCorrect');
    newRange.innerHTML = "<p id=\"highLowCorrect\">Enter a number between " + min + " and " + max + "!</p>";
  }
  else if (numWins == 2) {
    increaseRange();
    var welcome = document.getElementById('lastGuess');
    welcome.innerText = "Welcome to Level 3!";

    var guessVal = document.getElementById('guessNum');
    guessVal.innerText = "?";

    minHTML.innerText = min;
    maxHTML.innerText = max;
    var newRange = document.getElementById('highLowCorrect');
    newRange.innerHTML = "<p id=\"highLowCorrect\">Enter a number between " + min + " and " + max + "!</p>";
  }
}

// increase range of numbers to guess from
function increaseRange() {
  min = parseInt(min, 10) - 10;
  max = parseInt(max, 10) + 10;
  resetTargetNum();
}

// clear guess input
function clearForm(event){
  event.preventDefault();
  guessInput.value = "";
}

// go back to page one to restart game
function goBackToPage1(event){
  event.preventDefault();
  window.location.href="index_levelUp.html";
}
