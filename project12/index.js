const num_fatorial = document.querySelector("section#fatorial input#num");
const btn_fatorial = document.querySelector("section#fatorial button");
const result_fatorial = document.querySelector("section#fatorial p.result");
const result_euler = document.querySelector("section#fatorial p#euler");
let sin = 1;
function Fatorial(num) {
  let produto = 1n;
  for (let i = 1n; i <= num; i++) {
    produto *= i;
  }
  return BigInt(produto);
}

function Euler() {
  let x = 10n ** 1020n;
  let e = x;

  for (let i = 1; i < 1500; i++) {
    e += x/Fatorial(i);
  }
  e = e / 10n ** 20n;
  return e;
}

btn_fatorial.addEventListener("click", () => {
  result_fatorial.innerHTML = Fatorial(num_fatorial.valueAsNumber);
  result_euler.innerHTML = Euler(num_fatorial.valueAsNumber);
});
num_fatorial.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    result_fatorial.innerHTML = Fatorial(num_fatorial.valueAsNumber);
    result_euler.innerHTML = Euler(num_fatorial.valueAsNumber);
  }
});
