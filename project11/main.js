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
  {
    id: 1,
    nome: "Sobrecoxa 1kg",
    descricao: "Carne de Frango!",
    valor: 18,
    incluidoEm: Date.now(),
  },
];
var generate_id = 1;
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
    ViewList();
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
            <td>${produtos[i].valor.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</td>
            <td><button onclick="ViewEditar(${
              produtos[i].id
            })"><ion-icon name="create-outline"></ion-icon></button></td>
            <td><button onclick="Deletar(${
              produtos[i].id
            })"><ion-icon name="trash-outline"></ion-icon></button></td>
        </tr>
        `;
    i++;
  }
}
function Deletar(id) {
  let isTrue = false;
  let i = 0;
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].id == id) {
      produtos.splice(i, 1);
    }
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
    let index;
    for (const item of produtos) {
      if (item.id == id) {
        item.nome = nome;
        index = item.id;
        item.descricao = descricao;
        item.valor = valor;
      }
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
    ViewList();
    document.querySelector("#viewInclude").classList.remove("show");
    document.querySelector("#viewEdit").classList.remove("show");
    document.querySelector("#viewList").classList.add("show");
  } catch (err) {
    console.error(err);
    document.querySelector(".alert").style.display = "flex";
    document.querySelector(".confirm").style.display = "none";
    document.querySelector(".alert p").innerHTML = err.message;
  }
}
function ViewEditar(id) {
  for (const item_view of produtos) {
    if (item_view.id == id) {
      edit_nome.value = item_view.nome;
      edit_descricao.value = item_view.descricao;
      edit_valor.value = item_view.valor;
      ed_id = produtos.indexOf(item_view);
    }
  }
  document.querySelector("#viewInclude").classList.remove("show");
  document.querySelector("#viewEdit").classList.add("show");
  document.querySelector("#viewList").classList.remove("show");
  ViewEdit();
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
      document.querySelector(".view").style.display = "flex";
      document.querySelector("section#list .view .text").innerHTML = `
        <p><strong>ID:</strong>${produtos[i].id}</p>
        <p><strong>Nome:</strong>${produtos[i].nome}</p>
        <p><strong>Descrição:</strong>${produtos[i].descricao}</p>
        <p><strong>Valor:</strong>${produtos[i].valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}</p>
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
  document.querySelector("#viewInclude").classList.add("show");
  document.querySelector("#viewEdit").classList.remove("show");
  document.querySelector("#viewList").classList.remove("show");
  ViewInclude();
};
document.querySelector("#viewEdit").onclick = () => {
  document.querySelector("#viewInclude").classList.remove("show");
  document.querySelector("#viewEdit").classList.add("show");
  document.querySelector("#viewList").classList.remove("show");
  ViewEdit();
};
document.querySelector("#viewList").onclick = () => {
  document.querySelector("#viewInclude").classList.remove("show");
  document.querySelector("#viewEdit").classList.remove("show");
  document.querySelector("#viewList").classList.add("show");
  ViewList();
};
function WriteList(obj) {
  let preco = obj.valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  lista.innerHTML += `
      <tr>
      <td onclick="View(${obj.id})">${obj.nome}</td>
      <td>${preco}</td>
      <td><button onclick="ViewEditar(${obj.id})"><ion-icon name="create-outline"></ion-icon></button></td>
      <td><button onclick="Deletar(${obj.id})"><ion-icon name="trash-outline"></ion-icon></button></td>
      </tr>
    `;
}

function Crescente(type, prop) {
  let ordem;
  switch (type) {
    case "String":
      ordem = produtos.sort((a, b) => {
        let fa = a[prop].toLowerCase();
        let fb = b[prop].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      break;
    case "Number":
      ordem = produtos.sort((a, b) => {
        return a[prop] - b[prop];
      });

      break;
    default:
      break;
  }
  lista.innerHTML = "";
  for (const object of ordem) {
    WriteList(object);
  }
}
function Decrescente(type,prop) {
  let ordem;
  switch (type) {
    case "String":
      ordem = produtos.sort((a, b) => {
        let fa = a[prop].toLowerCase();
        let fb = b[prop].toLowerCase();

        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      });

      break;
    case "Number":
      ordem = produtos.sort((a, b) => {
        return b[prop] - a[prop];
      });

      break;
    default:
      break;
  }
  lista.innerHTML = "";
  for (const object of ordem) {
    WriteList(object);
  }
}
document.querySelector("#up_nome").addEventListener("click", () => {
  Crescente("String", "nome");
});
document.querySelector("#down_nome").addEventListener("click", () => {
  Decrescente("String", "nome");
});
document.querySelector("#up_valor").addEventListener("click", () => {
  Crescente("Number", "valor");
});
document.querySelector("#down_valor").addEventListener("click", () => {
  Decrescente("Number", "valor");
});

const elm_search = document.querySelector(".ctn_search input#pesquisa");
const btn_search = document.querySelector(".ctn_search button#search");

btn_search.addEventListener('click', ()=>{
  let filtro;
  let pesquisa = elm_search.value;
  var myRe = new RegExp(pesquisa, "gi");
  filtro = produtos.filter(elm=>{
    if (myRe.exec(elm.nome) || myRe.exec(elm.descricao)) {
      return true
    }
  })
  console.log(filtro)
  lista.innerHTML = "";
  for (const object of filtro) {
    WriteList(object);
  }
})