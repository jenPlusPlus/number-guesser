// Global Variables*********************************************
var min = document.getElementById('minimum');
var max = document.getElementById('maximum');
var enterButton = document.getElementById('enter');
var resetButton = document.getElementById('reset');

// disable buttons
resetButton.disabled = true;
enterButton.disabled = true;

// event listeners
min.addEventListener('input', enableEnterClear);
max.addEventListener('input', enableEnterClear);
enterButton.addEventListener('click', validateMin);
resetButton.addEventListener('click', resetValues);


// Functions***********************************************

// enable enter and clear buttons
function enableEnterClear(event) {
  if (min.value != "" && max.value != ""){
    enterButton.disabled = false;
    resetButton.disabled = false;
  }
  else if (min.value == "" || max.value == ""){
  enterButton.disabled = true;
  resetButton.disabled = false;
  }
  else {
    enterButton.disabled = true;
    resetButton.disabled = true;
  }
}

// validate minimum entry
function validateMin(event){
  event.preventDefault();
  var rangeMin = min.value;
  var rangeMinINT = parseInt(rangeMin, 10);
    if (isNaN(rangeMinINT)) {
      window.alert(rangeMin + " is not a number. Please enter a number.");
    }
    else {
      validateMax();
    }
}

// validate maximum entry
function validateMax(){
  event.preventDefault();
  var rangeMax = max.value;
  var rangeMaxINT = parseInt(rangeMax, 10);
    if (isNaN(rangeMaxINT)) {
      window.alert(rangeMax + " is not a number. Please enter a number.");
    }
    else {
      isMinLessThanMax(min.value, max.value);
    }
}

// make sure minimum is less than maximum
function isMinLessThanMax(minEntry, maxEntry) {
  if (minEntry === maxEntry) {
    alert("Minimum is equal to maximum. Please enter two different numbers.");
  }
  else if(minEntry > maxEntry){
    var temp = minEntry;
    minEntry = maxEntry;
    maxEntry = temp;
    localStorage.setItem('minimum', minEntry);
    localStorage.setItem('maximum', maxEntry);
    startGame();
  }
  else {
    localStorage.setItem('minimum', min.value);
    localStorage.setItem('maximum', max.value);
    startGame();
  }
}

// go to page 2 to start game
function startGame(){
  window.location.href="page2_levelUp.html";
}

// clear guess input
function clearForm(event){
  event.preventDefault();
  guessInput.value = "";
}

// reset min and max inputs; disable enter and reset button
function resetValues(event) {
  event.preventDefault();
  min.value ="";
  max.value ="";
  enterButton.disabled = true;
  resetButton.disabled = true;
}
