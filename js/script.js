const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal__content');
const modalClose = document.querySelector('.modal__close');

modalClose.addEventListener('click', () => {
  overlay.style.display = 'none';
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.style.display = 'none';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape' && overlay.style.display === 'block') {
    overlay.style.display = 'none';
  }
});

const result = document.querySelector('.calc__result');

let num1;
let num2;

let flag = true;
let typeTransaction = '';

const resultMaxLength = 14;

const operationButtons = document.querySelectorAll('[data-operation]');
const valueButtons = document.querySelectorAll('[data-value]');

function checkResultLength() {
  if (result.textContent.length > resultMaxLength) {
    overlay.style.display = 'block';
    if (+result.textContent % 1 === 0) {
      modalContent.textContent = 'Внимание, слишком большое число!';
    } else {
      modalContent.textContent = `Дробная часть числа будет состоять не более, чем из ${
        resultMaxLength - 2
      } знаков`;
    }
    result.textContent = result.textContent.substring(0, resultMaxLength);
  }
}

function performNewOperation(dataAtribute) {
  if (dataAtribute !== 'clear' && dataAtribute !== 'equals' && dataAtribute !== 'float') {
    num1 = +result.textContent;
    flag = false;
    typeTransaction = dataAtribute;

    if (dataAtribute === 'sign') {
      if (result.textContent.indexOf('-') === -1) {
        result.textContent = `-${result.textContent}`;
      } else {
        result.textContent = result.textContent.slice(1);
      }
    }
  } else if (dataAtribute === 'float') {
    if (result.textContent.indexOf('.') === -1) {
      result.textContent += '.';
    }
  } else if (dataAtribute === 'clear') {
    result.textContent = '0';
    num1 = 0;
    num2 = 0;
  } else if (dataAtribute === 'equals') {
    num2 = +result.textContent;
    switch (typeTransaction) {
      case 'subtraction':
        result.textContent = num1 - num2;
        break;
      case 'addition':
        result.textContent = num1 + num2;
        break;
      case 'multiplication':
        result.textContent = num1 * num2;
        break;
      case 'division':
        result.textContent = num1 / num2;
        break;
      case 'remainder':
        result.textContent = num1 % num2;
        break;
      default:
        break;
    }
    checkResultLength();
    flag = false;
  }
}

operationButtons.forEach((valueButton) => {
  valueButton.addEventListener('click', (event) => {
    performNewOperation(event.target.dataset.operation);
  });
});

valueButtons.forEach((valueButton) => {
  valueButton.addEventListener('click', () => {
    if (result.textContent[0] === '0' && result.textContent[1] !== '.') {
      result.textContent = '';
    }

    if (!flag) {
      result.textContent = '';
      flag = true;
    }

    if (result.textContent.length <= resultMaxLength) {
      result.textContent += valueButton.textContent;
    }
  });
});
