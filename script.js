const display = document.getElementById('display');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const backSpaceBtn = document.getElementById('back-space');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('equal-btn');
let operatorCheck = false;
let resultCheck = false;
let signCheck = false;
let floatCheck = false;
let operator;
let num1;
let num2;
let result;

function displayResult(target){
   if(result){
    target.textContent = result;
}
}
function clearDisplay(){
    display.textContent = ''
    signCheck = false;
}
function clearAll(){
    clearDisplay();
    resultDisplay.textContent = ''
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    operatorCheck = false;
    resultCheck = false;
}
function storeNumber(){
    if(!num1){
        num1 = Number(display.textContent);
    }else{
        num2 = Number(display.textContent);
}
}
function typeNumber(){
    buttons.forEach(button => {
        button.addEventListener('click', function(){
            if(operatorCheck){
                clearDisplay();
            }
            if(display.textContent.length < 13){
                display.textContent += button.textContent;
                operatorCheck = false;
            }
        })
    })
}
function typeOperator(){
    operators.forEach(operatorBtn => {
        operatorBtn.addEventListener('click',function(){
            storeNumber();
            if(!operatorCheck){
                operate();
            }
            displayResult(resultDisplay);
            clearDisplay();
            display.textContent = operatorBtn.textContent;
            operatorCheck = true;
            operator = operatorBtn.textContent;
        })
    })
}
function backSpace(){
    display.textContent = display.textContent.slice(0,-1)
    number = Number(display.textContent);
}
//////////////////////// Opertions
function add(n1,n2){
    return n1 + n2;
}
function substract(n1,n2){
    return n1 - n2;
}
function multipy(n1,n2){
    return n1 * n2;
}
function divide(n1,n2){
    return n1 / n2;
}
////////////////////////
function operate(){
    if(num2 === 0){
        
    }
    if(!result && num1 && num2){
        switch(operator){
            case '+':
            result = add(num1,num2);
            break;

            case '-':
            result = substract(num1,num2);
            break;

            case 'x':
            result = multipy(num1,num2);
            break;

            case '/':
            result = divide(num1,num2);
        }
    }else if(result){
        switch(operator){
            case '+':
            result = add(result,num2);
            break;
            
            case '-':
            result = substract(result,num2);
            break;

            case 'x':
            result = multipy(result,num2);
            break;

            case '/':
            result = divide(result,num2);
        }
    }
}
function signChange(){
    if(!signCheck){
        display.textContent = '-' + display.textContent;
    }else{
        display.textContent = display.textContent.slice(1);
    }
    signCheck = !signCheck;
}
function addDot(){
    let dotFinder = display.textContent.search(/\./);
    if(dotFinder == -1){
        display.textContent += '.';
    }
    
}
backSpaceBtn.addEventListener('click',backSpace);
equalBtn.addEventListener('click', function(){
    storeNumber();
    operate();
    displayResult(display);
    operatorCheck = true;
    resultDisplay.textContent = '';
})
typeNumber()
typeOperator()