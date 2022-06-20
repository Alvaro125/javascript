const num1 = document.querySelector("section#operadores #num1");
const num2 = document.querySelector("section#operadores #num2");
const op = document.querySelector("section#operadores #operador");
const res = document.querySelector("section#operadores .result");
function Soma(a, b) {
  try {
    if (typeof a !== "number" || a < 0 || a % 1 != 0) {
      throw new Error(`[sum] Impossible to sum "${a}" + ${b}`);
    }
    if (typeof b !== "number" || b < 0 || b % 1 != 0) {
      throw new Error(`[sum] Impossible to sum ${a} + "${b}"`);
    }
    return a + b;
  } catch (err) {
    console.error(err);
    res.classList.remove("correct");
    res.classList.add("wrong");
    return (res.innerHTML = `${err.message}`);
  }
}

function Subtracao(a, b, count = 0) {
  try {
    if (typeof a !== "number" || a < 0 || a % 1 != 0) {
      throw new Error(`[subtract] Impossible to subtract "${a}" - ${b}`);
    }
    if (typeof b !== "number" || b < 0 || b % 1 != 0) {
      throw new Error(`[subtract] Impossible to subtract ${a} - "${b}"`);
    }
    if (a == Soma(b, count)) {
      return count;
    } else {
      return Subtracao(a, b, Soma(count, 1));
    }
  } catch (err) {
    console.error(err);
    res.classList.remove("correct");
    res.classList.add("wrong");
    return (res.innerHTML = `${err.message}`);
  }
}

function Multiplicacao(a, b, count = 0, produto = 0) {
  try {
    if (typeof a !== "number" || a < 0 || a % 1 != 0) {
      throw new Error(`[multiply] Impossible to multiply "${a}" * ${b}`);
    }
    if (typeof b !== "number" || b < 0 || b % 1 != 0) {
      throw new Error(`[multiply] Impossible to multiply ${a} * "${b}"`);
    }
    if (a == count) {
      return produto;
    } else {
      produto = Soma(produto, b);
      return Multiplicacao(a, b, Soma(count, 1), produto);
    }
  } catch (err) {
    console.error(err);
    res.classList.remove("correct");
    res.classList.add("wrong");
    return (res.innerHTML = `${err.message}`);
  }
}

function Exponencial(a, b, count = 0, produto = 1) {
  try {
    if (typeof a !== "number" || a < 0 || a % 1 != 0) {
      throw new Error(`[multiply] Impossible to multiply "${a}" ^ ${b}`);
    }
    if (typeof b !== "number" || b < 0 || b % 1 != 0) {
      throw new Error(`[multiply] Impossible to multiply ${a} ^ "${b}"`);
    }
    if (b == count) {
      return produto;
    } else {
      produto = Multiplicacao(a, produto);
      return Exponencial(a, b, Soma(count, 1), produto);
    }
  } catch (err) {
    console.error(err);
    res.classList.remove("correct");
    res.classList.add("wrong");
    return (res.innerHTML = `${err.message}`);
  }
}

function Divisao(a, b, count = 0, resto = a) {
  try {
    if (typeof a !== "number" || a < 0 || a % 1 != 0) {
      throw new Error(`[divide] Impossible to divice "${a}" / ${b}`);
    }
    if (typeof b !== "number" || b < 0 || b % 1 != 0) {
      throw new Error(`[divide] Impossible to divice ${a} / "${b}"`);
    }
    if (resto < b) {
      return count;
    } else {
      return Divisao(a, b, Soma(count, 1), Subtracao(resto, b));
    }
  } catch (err) {
    console.error(err);
    res.classList.remove("correct");
    res.classList.add("wrong");
    return (res.innerHTML = `${err.message}`);
  }
}

document.querySelector("section#operadores button").onclick = () => {
  try {
    res.classList.remove("wrong");
    res.classList.remove("correct");
    res.classList.add("correct");
    switch (op.value) {
      case "+":
        res.innerHTML = `${Soma(num1.valueAsNumber, num2.valueAsNumber)}`;
        break;
      case "-":
        res.innerHTML = `${Subtracao(num1.valueAsNumber, num2.valueAsNumber)}`;
        break;
      case "*":
        res.innerHTML = `${Multiplicacao(
          num1.valueAsNumber,
          num2.valueAsNumber
        )}`;
        break;
      case "/":
        res.innerHTML = `${Divisao(num1.valueAsNumber, num2.valueAsNumber)}`;
        break;
      case "^":
        res.innerHTML = `${Exponencial(
          num1.valueAsNumber,
          num2.valueAsNumber
        )}`;
        break;

      default:
        throw new Error(`Opção "${op.value}" invalido`);
        break;
    }
  } catch (err) {
    console.error(err);
    return (res.innerHTML = `${err.message}`);
  }
};
