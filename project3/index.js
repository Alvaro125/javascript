const elm_operando1 = document.querySelector('input#operando1');
const elm_operando2 = document.querySelector('input#operando2');
const elm_operador = document.querySelector('select#operador');
const elm_button = document.querySelector('button#operar');
const elm_res = document.querySelector('.result');

elm_button.onclick = ()=>{
  elm_res.innerHTML = Calcular(
    elm_operando1.valueAsNumber,
    elm_operando2.valueAsNumber,
    elm_operador.value
  )
  elm_res.classList.add("show");
  console.dir(elm_res.classList)
}

const operators = [
  "Soma",
  "Subtração",
  "Multiplicação",
  "Divisão"
]
for (const key in operators) {
  elm_operador.innerHTML += `<option value="${operators[key]}">${operators[key]}</option>`
}

function Calcular(a,b,operador) {
  switch (operador) {
    case "Soma":
      return `${a}+${b}=${(a+b)}`;
    break;
    case "Subtração":
      return `${a}-${b}=${(a-b)}`;
    break;
    case "Multiplicação":
      return `${a}&#215;${b}=${(a*b)}`;
    break;
    case "Divisão":
      return `${a}&#247;${b}=${(a/b)}`;
    break;
    default:
    break;
  }
}