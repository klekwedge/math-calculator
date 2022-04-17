"use strict";

const result = document.querySelector(".calc__result");

let num1;
let num2;

let flag = true;
let typeTransaction = "";

const operationButtons = document.querySelectorAll("[data-operation]"),
  valueButtons = document.querySelectorAll("[data-value]");

function checkResultLength() {
  if (result.textContent.length > 16) {
    // if (result % 1 == 0){
    result.textContent = result.textContent.substring(0, 16);
    // }
  }
}

function performNewOperation(dataAtribute) {
  if (dataAtribute !== "clear" && dataAtribute !== "equals") {
    num1 = +result.textContent;
    flag = false;
    typeTransaction = dataAtribute;
  } else if (dataAtribute === "clear") {
    result.textContent = "0";
    num1 = 0;
    num2 = 0;
  } else if (dataAtribute === "equals") {
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
        break;
      case "remainder":
        result.textContent = num1 % num2;
        break;
    }
    checkResultLength();
    flag = false;
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
