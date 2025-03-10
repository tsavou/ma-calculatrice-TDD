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
          display.value = error;
        }
      } else {
        display.value += value;
      }
    });
  });
});

function evaluateExpression(expression, calculator) {
  const operators = ["+", "-", "x", "/"];
  let operator = null;
  for (const op of operators) {
    if (expression.includes(op)) {
      operator = op;
      break;
    }
  }

  if (!operator) {
    throw new Error("Invalid expression");
  }

  const [a, b] = expression.split(operator).map(Number);
  switch (operator) {
    case "+":
      return calculator.add(a, b);
    case "-":
      return calculator.subtract(a, b);
    case "x":
      return calculator.multiply(a, b);
    case "/":
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
