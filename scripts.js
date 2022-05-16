const numberButtons = document.querySelectorAll("[number]");
const operationButtons = document.querySelectorAll("[operator]");
const equalsButton = document.querySelector("[equals]");
const deleteButton = document.querySelector("[delete]");
const firstOperator = document.querySelector("[firstOperator]");
const secondOperator = document.querySelector("[secondOperator]");
const operatorSinal = document.querySelector("[Sinal]");
const moreLess = document.querySelector("[moreLess]");
const mod = document.querySelector("[mod]");
const display = document.querySelector("[display]");

var elementColor = null;

class Calculator {
  constructor(first, Operador, second) {
    this.first = first;
    this.Operador = Operador;
    this.second = second;
    this.lastDigit = "";
  }

  clear() {
    this.firstElement = "";
    this.secondElement = "";
    this.OperadorElement = "";
  }

  updateDisplay() {
    this.first.innerText = this.firstElement;
    this.second.innerText = this.secondElement;
    this.Operador.innerText = this.OperadorElement;
  }

  Calcula() {
    const newValue1 = parseFloat(this.first.innerText);
    const newValue2 = parseFloat(this.second.innerText);

    switch (this.Operador.innerText) {
      case "+":
        this.result = newValue1 + newValue2;
        break;
      case "–":
        this.result = newValue1 - newValue2;
        break;

      case "x":
        this.result = newValue1 * newValue2;
        break;

      case "÷":
        this.result = newValue1 / newValue2;
        break;

      default:
        break;
    }
  }

  invertSignal(num) {
    return num * -1;
  }
  percentage(num) {
    return num / 100;
  }
  showResult() {
    this.first.innerText = this.result;
    return this.result;
  }
}

const calculator = new Calculator(firstOperator, operatorSinal, secondOperator);

deleteButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
  display.innerText = "0";
});

for (const number of numberButtons) {
  number.addEventListener("click", () => {
    if (elementColor !== null) {
      elementColor.classList.remove("changeColor");
    }

    if (calculator.lastDigit == "equals") {
      display.innerText = "0";
      calculator.result.innerText = "";
      calculator.first.innerText = "";
      calculator.second.innerText = "";
    }

    if (calculator.lastDigit == "operator") {
      display.innerText = "";
    }
    calculator.lastDigit = "number";

    if (calculator.Operador.innerText !== "") {
      if (
        calculator.second.innerText.includes(".") &&
        number.innerText == "."
      ) {
        return;
      } else {
        display.innerText += number.innerText;
        calculator.second.innerText += number.innerText;
      }
    } else {
      if (calculator.first.innerText.includes(".") && number.innerText == ".") {
        return;
      } else {
        if (display.innerText == "0") {
          display.innerText = "";
          display.innerText += number.innerText;
          calculator.first.innerText += number.innerText;
        } else {
          display.innerText += number.innerText;
          calculator.first.innerText += number.innerText;
        }
      }
    }
  });
}

for (const operator of operationButtons) {
  {
    operator.addEventListener("click", () => {
      operator.classList.add("changeColor");
      elementColor = operator;

      calculator.lastDigit = "operator";

      if (
        calculator.first.innerText !== "" &&
        calculator.second.innerText == ""
      ) {
        calculator.Operador.innerText = operator.innerText;
      } else {
        if (
          calculator.first.innerText !== "" &&
          calculator.second.innerText !== ""
        ) {
          calculator.Calcula();
          calculator.clear();
          calculator.updateDisplay();
          display.innerText = calculator.showResult();
          calculator.Operador.innerText = operator.innerText;
        }
      }
    });
  }
}

equalsButton.addEventListener("click", () => {
  calculator.lastDigit = "equals";
  calculator.Calcula();
  calculator.clear();
  calculator.updateDisplay();
  display.innerText = calculator.showResult();
});

moreLess.addEventListener("click", () => {
  display.innerText = calculator.invertSignal(display.innerText);
  calculator.first.innerText = display.innerText;
});

mod.addEventListener("click", () => {
  display.innerText = calculator.percentage(display.innerText);
  calculator.first.innerText = display.innerText;
});
