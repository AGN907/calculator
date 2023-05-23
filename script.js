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

const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const operation = {
  firstOperand: '',
  secondOperand: '',
  operator: '',
};

function findOperands(e) {
  const userValue = e.target.textContent;
  const operandBtn = e.target;

  if (!operation.operator) {
    if (userValue === '.') operandBtn.disabled = true;
    operation.firstOperand += userValue;
    displayResult(operation.firstOperand);
  } else {
    if (userValue === '.') operandBtn.disabled = true;
    operation.secondOperand += userValue;
    displayResult(operation.secondOperand);
  }
}

const operands = document.querySelectorAll('.operand');

operands.forEach((operand) => {
  operand.addEventListener('click', findOperands);
});

equalBtn.addEventListener('click', (e) => {
  const result = operate(operation);
  displayResult(result);
});
