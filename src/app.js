import { Calculatrice } from "./calculatrice.js";

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const calculator = new Calculatrice();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");

      if (value === "C") {
        display.value = "";
      } else if (value === "clear-history") {
        calculator.clearHistory();
        updateHistory(calculator);
      } else if (value === "=") {
        try {
          const expression = display.value;
          display.value = evaluateExpression(expression, calculator);
          updateHistory(calculator);
        } catch (error) {
          display.value = error.message;
        }
      } else {
        let newExpression = display.value + value;

        const numberCount = (newExpression.match(/-?\d+(\.\d+)?/g) || [])
          .length;
        const operatorCount = (
          newExpression.match(/(?<!^)[+x/](?!-)/g) || []
        ).length;

        if (numberCount <= 2 && operatorCount <= 1) {
          display.value = newExpression;
        }
      }
    });
  });
});

function evaluateExpression(expression, calculator) {
  if (expression.includes("--")) {
    expression = expression.replace("--", "+");
  }

  const regex = /^(-?\d+(\.\d+)?)\s*([+-x/])\s*(-?\d+(\.\d+)?)$/;

  const match = expression.match(regex);

  if (!match) {
    throw new Error("Invalid expression");
  }

  const [, num1, , op, num2] = match;
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  switch (op) {
    case "+":
      return calculator.add(a, b);
    case "-":
      return calculator.subtract(a, b);
    case "x":
      return calculator.multiply(a, b);
    case "/":
      if (b === 0) throw new Error("Division by zero");
      return calculator.multiply(a, 1 / b);
    default:
      throw new Error("Unsupported operator");
  }
}

function updateHistory(calculator) {
  const historyDisplay = document.getElementById("history");
  const history = calculator.getHistory();
  historyDisplay.innerHTML = "";
  history.forEach((entry) => {
    const historyItem = document.createElement("div");
    historyItem.textContent = `${entry.operation} = ${entry.result}`;
    historyDisplay.appendChild(historyItem);
  });
}
