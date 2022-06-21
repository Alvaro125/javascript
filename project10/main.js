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
    lista.innerHTML += `
        <tr>
            <td onclick="View(${produtos[i].id})">${produtos[i].nome}</td>
            <td>${produtos[i].valor}</td>
            <td><button onclick="ViewEditar(${produtos[i].id})"><ion-icon name="create-outline"></ion-icon></button></td>
            <td><button onclick="Deletar(${produtos[i].id})"><ion-icon name="trash-outline"></ion-icon></button></td>
        </tr>
        `;
    i++;
  }
}
function Deletar(id) {
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
function ViewEditar(id) {
  let isTrue = false;
  let i = 0;
  let index;
  while (!isTrue) {
    if (produtos[i].id == id) {
      edit_nome.value = produtos[i].nome;
      edit_descricao.value = produtos[i].descricao;
      edit_valor.value = produtos[i].valor;
      ed_id = i;
      isTrue = true;
    } else {
      i++;
    }
    console.log(index);
  }
  ViewEdit()
}
function View(id) {
  let isTrue = false;
  let i = 0;
  while (!isTrue) {
    if (produtos[i].id == id) {
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
        ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
          ? (parseInt(d.getMinutes() / 5) * 5).toString()
          : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
        ":00";
      document.querySelector("section#list .view").innerHTML = `
        <p><strong>ID:</strong>${produtos[i].id}</p>
        <p><strong>Nome:</strong>${produtos[i].nome}</p>
        <p><strong>Descrição:</strong>${produtos[i].descricao}</p>
        <p><strong>Valor:</strong>${produtos[i].valor}</p>
        <p><strong>Data:</strong>${date_format_str}</p>
        `;
      isTrue = true;
    } else {
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
    include_valor.valueAsNumber
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
  ViewInclude();
};
document.querySelector("#viewEdit").onclick = () => {
  ViewEdit();
};
document.querySelector("#viewList").onclick = () => {
  ViewList();
};
