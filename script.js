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

const firstOperand = 0;
const secondOperand = 0;
const operator = '';

const operate = (a, b, operation) => {
  let result = 0;
  switch (operation) {
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
  const displayScreen = document.querySelector('calculator-display');

  displayScreen.textContent = result;
}
