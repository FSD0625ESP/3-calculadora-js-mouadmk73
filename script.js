const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let previous = null;
let operator = null;
let clearOnNext = false;

function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function product(a, b) {
  return a * b;
}
function division(a, b) {
  return b === 0 ? NaN : a / b;
}

function setDisplay(text) {
  display.value = text;
}
function getNumber() {
  const text = display.value.trim();
  return Number(text || "0");
}

function format(value) {
  if (!Number.isFinite(value)) return "Error";
  return String(Number(value.toFixed(10)));
}

function clear() {
  previous = null;
  operator = null;
  clearOnNext = false;
  setDisplay("0");
}

function inputDigit(d) {
  if (clearOnNext || display.value === "0" || display.value === "Error") {
    setDisplay(String(d));
    clearOnNext = false;
  } else {
    setDisplay(display.value + String(d));
  }
}

function applyOperator(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return product(a, b);
    case "/":
      return division(a, b);
    default:
      return b;
  }
}

function chooseOperator(op) {
  const current = getNumber();
  if (previous === null) {
    previous = current;
  } else if (operator) {
    const result = applyOperator(operator, previous, current);
    previous = result;
    setDisplay(format(result));
  }
  operator = op;
  clearOnNext = true;
}

function equals() {
  if (operator === null || previous === null) return;
  const current = getNumber();
  const result = applyOperator(operator, previous, current);
  setDisplay(format(result));
  previous = Number.isFinite(result) ? result : null;
  operator = null;
  clearOnNext = true;
}

keys.addEventListener("click", (e) => {
  const button = e.target && e.target.closest("button");
  if (!button) return;

  const digit = button.getAttribute("data-key");
  const op = button.getAttribute("data-op");
  const action = button.getAttribute("data-action");

  if (digit !== null) return inputDigit(digit);
  if (op !== null) return chooseOperator(op);
  if (action === "equals") return equals();
  if (action === "clear") return clear();
});

window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  if (e.key === "Enter" || e.key === "=") equals();
  if (e.key.toLowerCase() === "c") clear();
});

clear();
