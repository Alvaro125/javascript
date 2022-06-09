function NumNome() {
  const numero = document.querySelector("#num_nome input#num").valueAsNumber;
  var res_num_nome = document.querySelector("#num_nome .result");
  switch (numero) {
    case 0:
      res_num_nome.innerText = "Zero";
      break;
    case 1:
      res_num_nome.innerText = "Um";
      break;
    case 2:
      res_num_nome.innerText = "Dois";
      break;
    case 3:
      res_num_nome.innerText = "Três";
      break;
    case 4:
      res_num_nome.innerText = "Quatro";
      break;
    case 5:
      res_num_nome.innerText = "Cinco";
      break;
    case 6:
      res_num_nome.innerText = "Seis";
      break;
    case 7:
      res_num_nome.innerText = "Sete";
      break;
    case 8:
      res_num_nome.innerText = "Oito";
      break;
    case 9:
      res_num_nome.innerText = "Nove";
      break;
    case 10:
      res_num_nome.innerText = "Dez";
      break;
    default:
      alert("Numero não compativel");
      break;
  }
}
document.querySelector("#num_nome button").addEventListener("click", NumNome);

function DateIf() {
  const dt = document.querySelector("#date input#data");
  var res_dt = document.querySelector("#date .result");
  var data = new Date(dt.value);
  res_dt.innerText = "";
  res_dt.innerText += `Numero do Dia: ${data.getDate()}\n`;
  res_dt.innerText += `Numero do Mês: ${data.getMonth() + 1}\n`;
  res_dt.innerText += `Ano: ${data.getFullYear()}\n`;


  switch (data.getDay()) {
    case 0:
      res_dt.innerText += "Dia da Semana: Segunda";
      break;
    case 1:
      res_dt.innerText += "Dia da Semana:Terça";
      break;
    case 2:
      res_dt.innerText += "Dia da Semana:Quarta";
      break;
    case 3:
      res_dt.innerText += "Dia da Semana:Quinta";
      break;
    case 4:
      res_dt.innerText += "Dia da Semana:Sexta";
      break;
    case 5:
      res_dt.innerText += "Dia da Semana:Sabado";
      break;
    case 6:
      res_dt.innerText += "Dia da Semana:Domingo";
      break;
  }

  switch (data.getMonth() + 1) {
    case 1:
      res_dt.innerText += "\nMês: Janeiro";
      break;
    case 2:
      res_dt.innerText += "\nMês: Fevereiro";
      break;
    case 3:
      res_dt.innerText += "\nMês: Março";
      break;
    case 4:
      res_dt.innerText += "\nMês: Abril";
      break;
    case 5:
      res_dt.innerText += "\nMês: Maio";
      break;
    case 6:
      res_dt.innerText += "\nMês: Junho";
      break;
    case 7:
      res_dt.innerText += "\nMês: Julho";
      break;
    case 8:
      res_dt.innerText += "\nMês: Agosto";
      break;
    case 9:
      res_dt.innerText += "\nMês: Setembro";
      break;
    case 10:
      res_dt.innerText += "\nMês: Outubro";
      break;
    case 11:
      res_dt.innerText += "\nMês: Novembro";
      break;
    case 12:
      res_dt.innerText += "\nMês: Dezembro";
      break;
    default:
  }
  res_dt.innerText += `\nMilissegundos: ${data.getTime()}`;

}
document.querySelector("#date button").addEventListener("click", DateIf);



var produtos = [
  ["Bolo","https://img.freepik.com/vetores-gratis/item-de-jogo-de-bits-de-bolo-de-aniversario-de-pixel-art-em-fundo-branco_360488-38.jpg?w=2000"],
  ["Queijo","https://img.wattpad.com/bc41a8467790377934566b4ee9233ddcca88aae5/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4f346e4d32626257445a66416e513d3d2d3533303334383335352e313530666232656339643266623062633831313239303232323534332e6a7067?s=fit&w=720&h=720"],
  ["Leite", "https://img.myloview.com.br/fotomurais/vector-pixel-art-milk-bottle-700-167083236.jpg"],
  ["Ovo", "https://preview.pixlr.com/images/800wm/100/1/1001519939.jpg"],
  ["Morango", "https://i.pinimg.com/474x/f9/94/ac/f994acc677583d1d283f3c52a500facf.jpg"]
];

const elm_pdt = document.querySelector("#Produto #pdt");

for (const key in produtos) {
  elm_pdt.innerHTML += `<option value="${produtos[key][0]}">${produtos[key][0]}</option>`
}

function Product() {
  var res_pdt = document.querySelector("#Produto .result img");
  switch (elm_pdt.value) {
    case "Bolo":
      res_pdt.src = produtos[0][1];
      break;
    case "Queijo":
      res_pdt.src = produtos[1][1];
      break;
    case "Leite":
      res_pdt.src = produtos[2][1];
      break;
    case "Ovo":
      res_pdt.src = produtos[3][1];
      break;
    case "Morango":
      res_pdt.src = produtos[4][1];
      break;
  }

}
document.querySelector("#Produto button").addEventListener("click", Product);