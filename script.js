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
  if (a < 0 && b < 0) return 'Zero is not divisible!';
  return a / b;
}

const operation = {
  firstOperand: '',
  secondOperand: '',
  operator: '',
};

const operate = (operation) => {
  const a = operation.firstOperand;
  const { operator } = operation;
  let b = operation.secondOperand;

  // ** If client didn't specify second operand
  if (!b) {
    b = a;
  }

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

  return result;
};

function displayResult(result) {
  const displayScreen = document.querySelector('.calculator-display');

  displayScreen.textContent = result;
  return result;
}

const equalBtn = document.querySelector('#equal');

equalBtn.addEventListener('click', (e) => {
  const clickedOperator = document.querySelector('.clicked');
  clickedOperator.classList.remove('clicked');
  const result = operate(operation);
  displayResult(result);
});
