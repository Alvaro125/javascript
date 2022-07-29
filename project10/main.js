const include_nome = document.querySelector("section#include .form input#nome");
const include_descricao = document.querySelector(
  "section#include .form textarea#descricao"
);
const include_valor = document.querySelector(
  "section#include .form input#valor"
);
const include_button = document.querySelector("section#include .form button");

const lista = document.querySelector("section#list table tbody");

const edit_nome = document.querySelector("section#edit .form input#nome");
const edit_descricao = document.querySelector(
  "section#edit .form textarea#descricao"
);
const edit_valor = document.querySelector("section#edit .form input#valor");
const edit_button = document.querySelector("section#edit .form button");

const produtos = [
  {
    id: 0,
    nome: "Chocolate",
    descricao: "Doce muito bom!",
    valor: 6.0,
    incluidoEm: Date.now(),
  },
];
var generate_id = 0;
var ed_id;

function Incluir(nome, descricao, valor) {
  try {
    if (typeof nome !== "string" || nome == "") {
      throw new Error("Nome invalido");
    }
    if (typeof descricao !== "string" || descricao == "") {
      throw new Error("Descrição invalida");
    }
    // validação está legal. Único ponto cego que percebi são valores negativos
    // (a validação não os proíbe)
    if (typeof valor !== "number" || isNaN(valor)) {
      throw new Error("Valor invalida");
    }
    generate_id++;
    let obj = {
      id: generate_id,
      nome: nome,
      descricao: descricao,
      valor: valor,
      incluidoEm: Date.now(),
    };
    produtos.push(obj);
    document.querySelector(".confirm").style.display = "flex";
    document.querySelector(
      ".confirm p"
    ).innerHTML = `Produto ${obj.nome} incluído
    com sucesso!`;
    Listar();
    ViewList()
} catch (err) {
    console.error(err);
    document.querySelector(".alert").style.display = "flex";
    document.querySelector(".confirm").style.display = "none";
    document.querySelector(".alert p").innerHTML = err.message;
  }
}
function Listar() {
  let i = 0;
  lista.innerHTML = "";
  while (i < produtos.length) {
    // legal a ideia do toLocaleString ! Eu não conhecia
    lista.innerHTML += `
        <tr>
            <td onclick="View(${produtos[i].id})">${produtos[i].nome}</td>
            <td>${produtos[i].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
            <td><button onclick="ViewEditar(${produtos[i].id})"><ion-icon name="create-outline"></ion-icon></button></td>
            <td><button onclick="Deletar(${produtos[i].id})"><ion-icon name="trash-outline"></ion-icon></button></td>
        </tr>
        `;
    i++;
  }
}
function Deletar(id) {
  // esta variável poderia ter um nome mais semântico.
  // Ela começa como false e troca pra true no momento em que
  // vc encontra o elemento com o id buscado. Então a variável
  // poderia chamar "found" (de "encontrado").
  // O mesmo comentário se aplica a outras funções que têm uma 
  // variável "isTrue"
  let isTrue = false;
  let i = 0;
  while (!isTrue) {
    if (produtos[i].id == id) {
      produtos.splice(i, 1);
      isTrue = true;
    }
    i++;
  }
  Listar();
}
function Editar(nome, descricao, valor, id) {
  try {
    if (typeof nome !== "string" || nome == "") {
      throw new Error("Nome invalido");
    }
    if (typeof descricao !== "string" || descricao == "") {
      throw new Error("Descrição invalida");
    }
    if (typeof valor !== "number" || isNaN(valor)) {
      throw new Error("Valor invalida");
    }
    let isTrue = false;
    let j = 0;
    let index = 0;
    while (!isTrue) {
      if (produtos[j].id == id) {
        produtos[j].nome = nome;
        index = produtos[j].id;
        produtos[j].descricao = descricao;
        produtos[j].valor = valor;
        isTrue = true;
      }
      j++;
    }
    edit_nome.value = "";
    edit_descricao.value = "";
    edit_valor.value = "";
    document.querySelector(".confirm").style.display = "flex";
    document.querySelector(
      ".confirm p"
    ).innerHTML = `Produto de id:${index} incluído
    com sucesso!`; // não faz mais sentido "Produto de id:<x> EDITADO com sucesso" ??
    Listar();
    ViewList()
    document.querySelector("#viewInclude").classList.remove("show")
    document.querySelector("#viewEdit").classList.remove("show")
    document.querySelector("#viewList").classList.add("show")
  } catch (err) {
    console.error(err);
    document.querySelector(".alert").style.display = "flex";
    document.querySelector(".confirm").style.display = "none";
    document.querySelector(".alert p").innerHTML = err.message;
  }
}
function ViewEditar(id) {
  let isTrue = false;
  let i = 0;
  let index;
  while (!isTrue) {
    if (produtos[i].id == id) {
      edit_nome.value = produtos[i].nome;
      edit_descricao.value = produtos[i].descricao;
      edit_valor.value = produtos[i].valor;
      // bug !!! Deveria ser "ed_id = id;"
      // Esse bug pode quebrar a aplicação: pense que há 2 produtos
      // e você deleta o primeiro. Daqui pra frente, nenhum produto
      // (existente ou futuramente criado) poderá mais ser editado
      // corretamente
      ed_id = i;
      isTrue = true;
    } else {
      i++;
    }
    console.log(index);
  }
  document.querySelector("#viewInclude").classList.remove("show")
  document.querySelector("#viewEdit").classList.add("show")
  document.querySelector("#viewList").classList.remove("show")
  ViewEdit()
}
function View(id) {
  let isTrue = false;
  let i = 0;
  while (!isTrue) {
    if (produtos[i].id == id) {
      // este "d" é criado como variável global desnecessariamente, ele poderia ser uma variável local:
      // const d = new Date(...);
      d = new Date(produtos[i].incluidoEm);
      var date_format_str =
      (d.getDate().toString().length == 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
        "-" +
        ((d.getMonth() + 1).toString().length == 2
          ? (d.getMonth() + 1).toString()
          : "0" + (d.getMonth() + 1).toString()) +
        "-" +
        d.getFullYear().toString() +
        " " +
        (d.getHours().toString().length == 2
          ? d.getHours().toString()
          : "0" + d.getHours().toString()) +
        ":" +
        ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 // por que /5 e *5 ? 
                                                                   // isso arredonda para múltiplos de 5 minutos,
                                                                   // mas não vejo por que fazer isso em vez de mostrar
                                                                   // o real minuto
          ? (parseInt(d.getMinutes() / 5) * 5).toString()
          : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
        ":00";
        document.querySelector(".view").style.display = "flex";
      document.querySelector("section#list .view .text").innerHTML = `
        <p><strong>ID:</strong>${produtos[i].id}</p>
        <p><strong>Nome:</strong>${produtos[i].nome}</p>
        <p><strong>Descrição:</strong>${produtos[i].descricao}</p>
        <p><strong>Valor:</strong>${produtos[i].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        <p><strong>Data:</strong>${date_format_str}</p>
        `;
      isTrue = true;
    } else { // não precisava do else aqui. Poderia fazer igual ao que fez na função Deletar (i++ fora do else)
      i++;
    }
  }
}
Listar();

edit_button.addEventListener("click", () => {
  Editar(
    edit_nome.value,
    edit_descricao.value,
    edit_valor.valueAsNumber,
    ed_id
  );
});
include_button.onclick = function () {
  Incluir(
    include_nome.value,
    include_descricao.value,
    include_valor.valueAsNumber  // legal ! não sabia que isto existia (valueAsNumber)
  );
};
function ViewInclude() {
  document.querySelector("section#include").classList.add("show");
  document.querySelector("section#edit").classList.remove("show");
  document.querySelector("section#list").classList.remove("show");
}
function ViewEdit() {
  document.querySelector("section#include").classList.remove("show");
  document.querySelector("section#edit").classList.add("show");
  document.querySelector("section#list").classList.remove("show");
}
function ViewList() {
  document.querySelector("section#include").classList.remove("show");
  document.querySelector("section#edit").classList.remove("show");
  document.querySelector("section#list").classList.add("show");
}

document.querySelector("#viewInclude").onclick = () => {
  document.querySelector("#viewInclude").classList.add("show")
  document.querySelector("#viewEdit").classList.remove("show")
  document.querySelector("#viewList").classList.remove("show")
  ViewInclude();
};
document.querySelector("#viewEdit").onclick = () => {
  document.querySelector("#viewInclude").classList.remove("show")
  document.querySelector("#viewEdit").classList.add("show")
  document.querySelector("#viewList").classList.remove("show")
  ViewEdit();
};
document.querySelector("#viewList").onclick = () => {
  document.querySelector("#viewInclude").classList.remove("show")
  document.querySelector("#viewEdit").classList.remove("show")
  document.querySelector("#viewList").classList.add("show")
  ViewList();
};
