"use strict";

const result = document.querySelector(".calc__result");

let num1;
let num2;

let flag = true;
let typeTransaction = "";

const operationButtons = document.querySelectorAll("[data-operation]"),
  valueButtons = document.querySelectorAll("[data-value]");

function performNewOperation(dataAtribute) {
  switch (dataAtribute) {
    case "clear":
      result.textContent = "0";
      break;
    // case "sign-change":
    //   if (result.textContent[0] === "-") {
    //     result.textContent = result.textContent.slice(1);
    //   } else {
    //     result.textContent = "-" + result.textContent;
    //   }
    //   result.textContent = "0";
    //   break;
    case "addition":
      num1 = +result.textContent;
      flag = false;
      typeTransaction = "addition";
      break;
    case "subtraction":
      num1 = +result.textContent;
      flag = false;
      typeTransaction = "subtraction";
      break;
    case "multiplication":
      num1 = +result.textContent;
      flag = false;
      typeTransaction = "multiplication";
      break;
    case "division":
      num1 = +result.textContent;
      flag = false;
      typeTransaction = "division";
      break;
    case "equals":
      num2 = +result.textContent;
      switch (typeTransaction) {
        case "subtraction":
          result.textContent = num1 - num2;
          break;
        case "addition":
          result.textContent = num1 + num2;
          break;
        case "multiplication":
          result.textContent = num1 * num2;
          break;
        case "division":
          result.textContent = num1 / num2;
          if (result.textContent.length > 16) {
            result.textContent = result.textContent.substring(0, 16);
          }
          break;
      }

      flag = false;
      break;
  }
}
operationButtons.forEach((valueButton) => {
  valueButton.addEventListener("click", () => {
    performNewOperation(event.target.dataset.operation);
  });
});

valueButtons.forEach((valueButton) => {
  valueButton.addEventListener("click", () => {
    if (result.textContent[0] === "0") {
      result.textContent = "";
    }

    if (!flag) {
      result.textContent = "";
      flag = true;
    }

    if (result.textContent.length <= 14) {
      result.textContent += valueButton.textContent;
    }
  });
});
