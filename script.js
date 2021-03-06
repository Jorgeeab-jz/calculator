///////////////////////////// All the references to buttons and screen
const calcCase = document.querySelector('.case');
const body = document.querySelector('body');
const display = document.getElementById('display');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const backSpaceBtn = document.getElementById('back-space');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('equal-btn');
const pwrBtn = document.querySelector('.on-off-btn');
const screen = document.querySelector('.screen');
const resultScrn = document.querySelector('.result');
const darkBtn = document.querySelector('.dark-btn');
const smartBtn = document.querySelector('.smart-btn');
const dumbBtn = document.querySelector('.dumb-btn');
const numKeys = document.querySelector('.numbers');
///////////////////////////// Variables for buttons to change
let smartCheck = true;
let darkCheck = false;
let power = false;
let operatorCheck = false;
let resultCheck = false;
let signCheck = false;
let floatCheck = false;
let operator;
let num1;
let num2;
let result;
/////////////////////////////
function displayResult(target){
   if(result !== undefined){
    target.textContent = result;
}
}
function clearDisplay(){ //Clears the screen
    display.textContent = ''
    signCheck = false;
}
function clearAll(){//Clears all data
    clearDisplay();
    resultDisplay.textContent = ''
    num1 = undefined;
    num2 = undefined;
    result = undefined;
    operatorCheck = false;
    resultCheck = false;
}
function storeNumber(){//Stores the string on screen as a number
    if(!num1){
        num1 = Number(display.textContent);
    }else{
        num2 = Number(display.textContent);
}
}
function typeNumber(btn){
    if(power){
        if(operatorCheck){
            clearDisplay();
        }
        if(display.textContent.length < 13){
            display.textContent += btn.textContent;
            operatorCheck = false;
        }
    }
}
function setNumberBtn(){ //Adds click and keyboard access to number buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(){
            typeNumber(button);
    })
    })
    buttons.forEach(button => {
        document.addEventListener('keydown', function(e){
            if(e.key === button.textContent){
                typeNumber(button);
            }
        })
    })
}
function typeOperator(btn){
    if(power){
        storeNumber();
   if(!operatorCheck){
       operate();
   }
   displayResult(resultDisplay);
   clearDisplay();
   display.textContent = btn.textContent;
   operatorCheck = true;
   operator = btn.textContent;
   }
}
function setOperatorBtn(){//Adds click and keyboard access to operator buttons
    operators.forEach(operatorBtn => {
        operatorBtn.addEventListener('click',function(){
           typeOperator(operatorBtn);
            })
        })
    operators.forEach(operatorBtn => {
        document.addEventListener('keydown', (e) => {
            if(e.key === operatorBtn.textContent){
               typeOperator(operatorBtn);
            }
        })
    })
}
function setEquals(){//Displays final result
    storeNumber();
    operate();
    displayResult(display);
    operatorCheck = true;
    resultDisplay.textContent = '';
}
function backSpace(){
    display.textContent = display.textContent.slice(0,-1)
    number = Number(display.textContent);
}
///////////////////////////// Operations
function add(n1,n2){
    if(smartCheck){
        return n1 + n2;
    }else{
        return n1 + (n2 - (Math.floor(Math.random() * n2)));
    }
}
function substract(n1,n2){
    if(smartCheck){
        return n1 - n2;
    }else{
        return n1 - (n2 - (Math.floor(Math.random() * n2)));
    }
}
function multipy(n1,n2){
    if(smartCheck){
        return n1 * n2;
    }else{
        return n1 * (n2 - (Math.floor(Math.random() * n2)));
    }
}
function divide(n1,n2){
    if(smartCheck){
        return n1 / n2;
    }else{
        return n1 / (n2 - (Math.floor(Math.random() * n2)))
    }
}   
/////////////////////////////
function operate(){
    if(num2 === 0){
        display.textContent = "plsDon't"
    }
    if(result == undefined && num1 && num2){
        switch(operator){
            case '+':
            result = add(num1,num2);
            break;

            case '-':
            result = substract(num1,num2);
            break;

            case '*':
            result = multipy(num1,num2);
            break;

            case '/':
            result = divide(num1,num2);
        }
    }else if(result !== undefined){
        switch(operator){
            case '+':
            result = add(result,num2);
            break;
            
            case '-':
            result = substract(result,num2);
            break;

            case '*':
            result = multipy(result,num2);
            break;

            case '/':
            result = divide(result,num2);
        }
    }
}
function signChange(){//Adds or delete '-' sign for negative numbers
    if(!signCheck){
        display.textContent = '-' + display.textContent;
    }else{
        display.textContent = display.textContent.slice(1);
    }
    signCheck = !signCheck;
}
function addDot(){//Adds a dot if there isn't one yet
    if(power){
        if(operatorCheck){
            clearDisplay();
        }
        let dotFinder = display.textContent.search(/\./);
        if(dotFinder == -1){
        display.textContent += '.';
        operatorCheck = false;
    }
    }
    
}
pwrBtn.addEventListener('click',function(){
    if(!power){
        pwrBtn.style.cssText = 'text-shadow: 0 0 3px #4cd137; color: #4cd137;';
        screen.style.background = '#33d9b2';
        resultScrn.style.background = '#218c74';
    }else{
        pwrBtn.style.cssText = 'text-shadow: 0 0 0; color: black;';
        screen.style.background = 'rgba(10,10,10,1)';
        resultScrn.style.background = 'rgba(0,0,0,0.8)';
    }
    power = !power;
    clearAll();
})
backSpaceBtn.addEventListener('click',backSpace);
equalBtn.addEventListener('click', setEquals);
darkBtn.addEventListener('click', function(){
    const allBtns = document.querySelectorAll('.ld');
    if(!darkCheck){
        allBtns.forEach(btn => {
            btn.style.color = 'white';
        })
        calcCase.style.background = 'rgba(0,0,0,0.6)';
        body.style.background = 'rgba(0,0,0,0.8)';
        darkCheck = true;
    }else{
        allBtns.forEach(btn => {
            btn.style.color = 'black';
        })
        calcCase.style.background = 'rgba(0,0,0,0.05)';
        body.style.background = 'white';
        darkCheck = false;
    }
})
smartBtn.addEventListener('click',function(){
    smartCheck = true;
    smartBtn.style.color = '#7efff5';
    smartBtn.style.textShadow = '0 0 5px #18dcff';
    dumbBtn.style.color = 'white';
    dumbBtn.style.textShadow = '0 0 0px white';
})
dumbBtn.addEventListener('click',function(){
    smartCheck = false;
    dumbBtn.style.color = '#fffa65';
    dumbBtn.style.textShadow = '0 0 5px #fff200';
    smartBtn.style.color = 'white';
    smartBtn.style.textShadow = '0 0 0px white';
})
document.addEventListener('keydown', function(e){
    e.preventDefault();
    switch(e.key){
        case 'Enter':
            setEquals();
            break;
        case 'Backspace':
            backSpace();
            break;
        case '.':
            addDot();
    }
})
setNumberBtn();
setOperatorBtn();

