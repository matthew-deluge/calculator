let currentValue = ""; //variables used within calculations. Values need to be strings until they are passed through the display; otherwise they won't add together correctly
let secondValue = "";
let currentOperator = "";
let operating = false; //starts off as false, helps let site know if you are continuing to enter a current value or adding a second value
function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    console.log(a);
    console.log(b);
    return a*b;
}
function divide(a,b){//returns an alert if divide by zero, then resets the current Value
    if (b==0) {
        updateDisplay("Oh Behave!");
        //return a;
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
function reset() { //sets everything back to the beginning EXCEPT for currentValue
    secondValue = "";
    currentOperator = "";
    operating = false;
}
function shorten(value) { //code to shorten decimals, need to work out the exponential part of it
    if (value.toString().length>10&&value.toString().includes(".")) {
        value =  value.toFixed(6);
    }
    if (value.toString().length>10&&!value.toString().includes(".")) {
        value = value.toExponential();
    }
    return value;
}
const numbers = Array.from(document.querySelectorAll(".number"));
numbers.forEach(button => {button.addEventListener("click", function() { //connects buttons to display, returns number as string to display and number to currentValue
    if (!operating&&currentValue.toString().length <15) {
        currentValue = Number(currentValue + button.innerHTML);
        updateDisplay(currentValue.toString());
        console.log(currentValue);
    }
    else if (operating&&secondValue==="") {
        secondValue = Number(button.innerHTML);
        updateDisplay(secondValue.toString());
    }
    else if (operating&&!secondValue===""&&secondValue.toString().length<15) {
        secondValue = Number(secondValue + button.innerHTML);
        updateDisplay(secondValue);
    }
    }       
)})

const operators = Array.from(document.querySelectorAll(".operator"));
operators.forEach(button => { button.addEventListener("click", function() { //makes buttons return appropriate operator
    
    if(!operating) {
    currentOperator = button.innerHTML;
    operating = true;
    console.log(currentOperator);
    }
    if (operating && secondValue==="") {
        updateDisplay(currentValue)
        currentOperator = button.innerHTML;
    }
    if (operating && !secondValue==="") {
        currentValue = shorten(operate(currentValue, secondValue, currentOperator));
        if (currentValue.toString().length<15) {
        updateDisplay(currentValue);
        currentOperator = button.innerHTML;
        secondValue = "";
        }
    }
})})

const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", function() { //makes the equal sign operate if user has pressed a value, an operator, and a value, else it just waits.
    if (secondValue === "") {
        updateDisplay(currentValue);
    }
    else if (!operating) {
        updateDisplay(currentValue)
    }
    else{
       currentValue = shorten(operate(currentValue, secondValue, currentOperator));
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

const decimalElement = document.querySelector(".decimal");
decimalElement.addEventListener("click", function(){
    if (!operating&&!currentValue.toString().includes(".")){
        currentValue=currentValue+".";
        updateDisplay(currentValue);
    }
    else if (operating&&!secondValue.toString().includes(".")) {
        secondValue = secondValue + ".";
        updateDisplay(secondValue);
    }
})

const plusMinusElement = document.querySelector("#plus-minus");
plusMinusElement.addEventListener("click", function() {//makes number negative or positive
    if (!operating&&currentValue!=0){
        currentValue=currentValue*-1;
        updateDisplay(currentValue);
    }
    else if (operating&&!secondValue=="") {
        secondValue = secondValue*-1;
        updateDisplay(secondValue);
}
})

const backSpaceElement = document.querySelector(".backspace") 
backSpaceElement.addEventListener("click", function() {//deletes the last typed number
    if (!operating&&currentValue.toString().length>1){
        console.log(currentValue.toString().length);
        currentValue = currentValue.toString();
        console.log(currentValue);
        currentValue = currentValue.slice(0, currentValue.length - 1);
        currentValue = Number(currentValue);
        updateDisplay(currentValue);
    }
    else if (!operating&&currentValue.toString().length == 1) {
        currentValue = 0;
        updateDisplay(currentValue);
    }
    else if (operating&&!secondValue==="") {
        secondValue = secondValue.toString();
        secondValue = secondValue.slice(0, secondValue.length - 1);
        secondValue = Number(secondValue);
        updateDisplay(secondValue);
}
    else if (!operating&&currentValue.toString().length == 1) {
        secondValue = 0;
        updateDisplay(secondValue);
    }
})


//this is the code to add keyboard functionality
var allButtons = numbers.concat([equalElement, clearElement, decimalElement, plusMinusElement, backSpaceElement]);
allButtons = allButtons.concat(operators);
console.log(allButtons);

document.addEventListener("keyup", function (event) {
    allButtons.forEach(button => {
        console.log(event.key);
        console.log(button.getAttribute("value"));
        if (event.key == button.getAttribute("value")) {
            button.click();
        }
           
})})

