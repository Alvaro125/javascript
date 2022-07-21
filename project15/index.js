import { helpers } from "./fuctions.js";
const atual = document.querySelector("#result h1");
const tbody = document.querySelector("#result table tbody");
const select_coin = document.querySelector("#coins");
const date_start = document.querySelector("#start");
const date_end = document.querySelector("#end");

document.querySelector("button#act_coin").addEventListener("click", (e) => {
  try {
    e.target.style.cursor = 'wait';
    if (
      date_end.value == "" ||
      date_start.value == "" ||
      date_start.value.split("-").join("") >= date_end.value.split("-").join("")
    ) {
      throw new Error("Preencha todos os campos corretamente");
    }
    tbody.innerHTML = '';

    let quantidade = helpers.converterDays(date_end.valueAsNumber-date_start.valueAsNumber);
    
    cotacao(
      select_coin.value,
      date_start.value.split("-").join(""),
      date_end.value.split("-").join(""),
      quantidade,
      e
    );
  } catch (err) {
    e.target.style.cursor = 'default';
    console.error(err);
  }
});

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch("https://economia.awesomeapi.com.br/json/all")
.then(res=>{
  if (res.ok) {
    return res.json()
  }
  return Promise.reject("Deu Ruim volte outro dia.")
})
.then(data=>{
  let moedas = Object.keys(data);
  moedas.forEach((moeda) => {
    let op = createNode("option");
    op.value = `${data[moeda].code}-${data[moeda].codein}`;
    op.innerHTML = `${data[moeda].name}`;
    append(select_coin, op);
  });
})
.catch((err)=>{
  console.error(err)
})





function cotacao(coin, start, end, qtd, el) {
  fetch(`https://economia.awesomeapi.com.br/json/last/${coin}`)
  .then(res=> res.json())
  .then(data=>{
    let moeda = Object.keys(data);
    atual.innerHTML = `${data[moeda[0]].name} = ${helpers.converterReal(data[moeda[0]].bid)}`
  })
  fetch(
    `https://economia.awesomeapi.com.br/json/daily/${coin}/${qtd}?start_date=${start}&end_date=${end}`
  )
    .then((res) => res.json())
    .then(function (data) {
      data.forEach(c =>{
        let date = Date((c.timestamp));
        console.log(date)
        tbody.innerHTML += `<tr>
        <td>${helpers.dataHora(new Date(Number(c.timestamp)*1000))}</td>
        <td>${helpers.converterReal(c.bid)}</td>
        <td>${helpers.converterReal(c.ask)}</td>
        <td>${c.varBid}</td>
        <td>${c.pctChange}%</td>
        <td>${helpers.converterReal(c.high)}</td>
        <td>${helpers.converterReal(c.low)}</td>
    </tr>`;
      })
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(()=>{
    el.target.style.cursor = 'default';
});
}
