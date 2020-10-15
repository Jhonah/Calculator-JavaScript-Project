const operators = document.querySelectorAll('.btn-yellow');
const numbers = document.querySelectorAll('.btn-grey');
const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.screen');
const btnEqual = document.querySelector('.btn-equal');
const btnClear = document.querySelector('.btn-clear');

/* buttons of math operators */
operators.forEach((element) => {
    element.addEventListener('click', (e) => {

        const num = e.target.dataset.num;

        handleOperator(num);
    })
})

/* buttons of numbers */
numbers.forEach((element) => {
    element.addEventListener('click', (e) => {

        const num = e.target.dataset.num;

        if (num === undefined) {
            console.log('undefined');
        } else {
            inputDigit(num);
        }
    })
})

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        const num = e.target.dataset.num;

        updateDisplay();

    })
})

btnEqual.addEventListener('click', () => {    
    handleOperator('=');

    updateDisplay();
})

btnClear.addEventListener('click', () => {
    // reset calculator
    resetCalculator();

    updateDisplay();
})

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function resetCalculator() {
    calculator.displayValue = 0;
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {

    const display = document.querySelector('.screen');

    display.value = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {

    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function handleOperator(nextOperator) {

    /* Destructure the properties on the calculator object */
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = displayValue;

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    /* verify that `firstOperand` is null and that the `inputValue`
    is not a`NAN` value */
    if (firstOperand === null && !isNaN(inputValue)) {
        // Update the firstOperand property
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {

    if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '+') {
        return firstOperand + secondOperand;
    }

    return secondOperand;
}
