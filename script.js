const display = document.getElementById("display");
let a = "";
let b = "";
let op = "";
let reset = false;
function add(x, y) {
  return x + y;
}
function substract(x, y) {
  return x - y;
}
function product(x, y) {
  return x * y;
}
function division(x, y) {
  return y === 0 ? "Error" : x / y;
}
function clear() {
  a = b = op = "";
  display.value = "";
}
document.querySelector(".keys").onclick = (e) => {
  const t = e.target;
  if (t.dataset.key) {
    if (reset) {
      clear();
      reset = false;
    }
    if (!op) {
      a += t.dataset.key;
      display.value = a;
    } else {
      b += t.dataset.key;
      display.value = b;
    }
  }
  if (t.dataset.op) {
    if (a) op = t.dataset.op;
  }
  if (t.dataset.action === "clear") {
    clear();
  }
  if (t.dataset.action === "equals") {
    if (a && b && op) {
      let x = Number(a),
        y = Number(b),
        r;
      if (op === "+") r = add(x, y);
      if (op === "-") r = substract(x, y);
      if (op === "*") r = product(x, y);
      if (op === "/") r = division(x, y);
      display.value = r;
      reset = true;
    }
  }
};
