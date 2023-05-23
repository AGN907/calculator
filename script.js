/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (a === 0 || b === 0) return 'LMAO!';
  return a / b;
}

function operate(mathObj) {
  const a = +mathObj.firstOperand;
  const { operator } = mathObj;
  const b = +mathObj.secondOperand;

  let result = 0;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;

    case '-':
      result = subtract(a, b);
      break;

    case '*':
      result = multiply(a, b);
      break;

    case '/':
      result = divide(a, b);
      break;

    default:
      return 'You did\'nt specify an operator';
  }
  mathObj.firstOperand = result;
  mathObj.secondOperand = '';

  return result;
}

function displayResult(result) {
  let operationResult = result;
  const displayScreen = document.querySelector('.calculator-display');

  if (Number.isSafeInteger()) operationResult = Math.round(operationResult * 10) / 10;
  displayScreen.textContent = operationResult;
}

function getOperand(evtValue, mathObj) {
  if (Number(evtValue) || evtValue === '.') {
    if (evtValue === '.') document.querySelector('.operand:focus').disabled = true;
    if (!mathObj.operator) {
      mathObj.firstOperand += evtValue;
      displayResult(mathObj.firstOperand);
    } else {
      mathObj.secondOperand += evtValue;
      displayResult(mathObj.secondOperand);
    }
  }
}

function getOperator(evtValue, operator, mathObj) {
  if (evtValue === operator) {
    const floatingPointBtn = document.querySelector('.operand:disabled');

    if (floatingPointBtn) floatingPointBtn.disabled = false;
    if (mathObj.firstOperand && mathObj.secondOperand) {
      const result = operate(mathObj);
      displayResult(result);
      mathObj.operator = evtValue;
    } else if (mathObj.firstOperand) {
      mathObj.operator = evtValue;
    }
  }
}

function getOperation(e, mathObj) {
  const eventValue = (e.type === 'click') ? e.target.textContent : e.key;
  const operators = ['+', '-', '/', '*'];

  getOperand(eventValue, mathObj);

  operators.forEach((operator) => getOperator(eventValue, operator, mathObj));
}

const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const operation = {
  firstOperand: '',
  secondOperand: '',
  operator: '',
};

// Find clicked operands
const calcItems = document.querySelectorAll('.calc-item');

calcItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    getOperation(e, operation);
  });
});

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  getOperation(e, operation);
});

// Clear all variables and display default result
clearBtn.addEventListener('click', () => {
  const keys = Object.keys(operation);
  keys.forEach((key) => {
    operation[key] = '';
  });
  displayResult(0);
});

document.addEventListener('keydown', (e) => {
  if (e.key === '=' || e.key === 'Enter') {
    const result = operate(operation);
    displayResult(result);
  } else if (e.key === 'c') {
    const keys = Object.keys(operation);
    keys.forEach((key) => {
      operation[key] = '';
    });
    displayResult(0);
  }
});

equalBtn.addEventListener('click', () => {
  const result = operate(operation);
  displayResult(result);
});
