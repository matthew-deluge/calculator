//TODO: create functions for each of: subtract, add multiply, divide
//Create a function called operate that takes an operator and two numbers and calls one of the above functions
function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b){//returns an alert if divide by zero, then resets the current Value
    if (b==0) {
        alert("you can't divide by zero!");
        return a;
    }
    else {
        return a/b;
    }
    
}
function operate(a, b, operator) {//takes two numbers (float or int) and an operator and returns the appropiate result.
    if (operator == "+") {
        return add(a,b);
    }
    if (operator=="-") {
        return subtract(a,b);
    }
    if (operator == "*") {
        return multiply (a,b);
    }
    if (operator == "/") {
        return divide(a,b);
    }
}
function updateDisplay(value) { //grabs the display element and updates with passed value
   display = document.querySelector(".display");
   display.textContent = value;
}

let currentValue = ""; //variables used within calculations. Values need to be strings until they are passed through the display; otherwise they won't add together correctly
let secondValue = "";
let currentOperator = "";
let operating = false; //starts off as false, helps let site know if you are continuing to enter a current value or adding a second value

function reset() { //sets everything back to the beginning EXCEPT for currentValue
    secondValue = "";
    currentOperator = "";
    operating = false;
}
const numbers = Array.from(document.querySelectorAll(".number"));
numbers.forEach(button => {button.addEventListener("click", function() { //connects buttons to display, returns number as string to display and number to currentValue
    if (!operating) {
        updateDisplay(currentValue + button.innerHTML);
        currentValue = Number(currentValue + button.innerHTML);
    }
    else if (operating&&secondValue=="") {
        secondValue = Number(button.innerHTML);
        updateDisplay(secondValue);
    }
    else if (operating&&!secondValue=="") {
        updateDisplay(secondValue+button.innerHTML);
        secondValue = Number(secondValue + button.innerHTML);
    }
    }       
)})

const operators = Array.from(document.querySelectorAll(".operator"));
operators.forEach(button => { button.addEventListener("click", function() { //makes buttons return appropriate operator
    currentOperator = button.innerHTML;
    operating = true;
    console.log(currentOperator);
})})

const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", function() { //makes the equal sign operate if user has pressed a value, an operator, and a value, else it just waits.
    if (secondValue == NaN) {
        updateDisplay(currentValue);
    }
    else if (!operating) {
        updateDisplay(currentValue)
    }
    else{
       currentValue = operate(currentValue, secondValue, currentOperator);
       updateDisplay(currentValue);
       reset();

    }
})

const clearElement = document.querySelector(".clear");
clearElement.addEventListener("click", function(){ //clears and resets display
    reset();
    currentValue = "";
    updateDisplay(0);
})


//TODO: figure out how to fix issues with numbers that are too large (it eventually displays NaN)
//TODO: add keyboard functionality

