const res_cartas = document.querySelector("section#cartas h1");
const cards_elm = document.querySelectorAll("section#cartas ul li");
const cards_table = document.querySelector("section#cartas ul");
const deck = [
  { valor: 2, naipe: "Paus", img: "../imgs/2C.svg" },
  { valor: 3, naipe: "Paus", img: "../imgs/3C.svg" },
  { valor: 4, naipe: "Paus", img: "../imgs/4C.svg" },
  { valor: 5, naipe: "Paus", img: "../imgs/5C.svg" },
  { valor: 6, naipe: "Paus", img: "../imgs/6C.svg" },
  { valor: 7, naipe: "Paus", img: "../imgs/7C.svg" },
  { valor: 8, naipe: "Paus", img: "../imgs/8C.svg" },
  { valor: 9, naipe: "Paus", img: "../imgs/9C.svg" },
  { valor: 10, naipe: "Paus", img: "../imgs/TC.svg" },
  { valor: 11, naipe: "Paus", img: "../imgs/JC.svg" },
  { valor: 12, naipe: "Paus", img: "../imgs/QC.svg" },
  { valor: 13, naipe: "Paus", img: "../imgs/KC.svg" },
  { valor: 14, naipe: "Paus", img: "../imgs/AC.svg" },
  { valor: 2, naipe: "Ouro", img: "../imgs/2D.svg" },
  { valor: 3, naipe: "Ouro", img: "../imgs/3D.svg" },
  { valor: 4, naipe: "Ouro", img: "../imgs/4D.svg" },
  { valor: 5, naipe: "Ouro", img: "../imgs/5D.svg" },
  { valor: 6, naipe: "Ouro", img: "../imgs/6D.svg" },
  { valor: 7, naipe: "Ouro", img: "../imgs/7D.svg" },
  { valor: 8, naipe: "Ouro", img: "../imgs/8D.svg" },
  { valor: 9, naipe: "Ouro", img: "../imgs/9D.svg" },
  { valor: 10, naipe: "Ouro", img: "../imgs/TD.svg" },
  { valor: 11, naipe: "Ouro", img: "../imgs/JD.svg" },
  { valor: 12, naipe: "Ouro", img: "../imgs/QD.svg" },
  { valor: 13, naipe: "Ouro", img: "../imgs/KD.svg" },
  { valor: 14, naipe: "Ouro", img: "../imgs/AD.svg" },
  { valor: 2, naipe: "Espadas", img: "../imgs/2S.svg" },
  { valor: 3, naipe: "Espadas", img: "../imgs/3S.svg" },
  { valor: 4, naipe: "Espadas", img: "../imgs/4S.svg" },
  { valor: 5, naipe: "Espadas", img: "../imgs/5S.svg" },
  { valor: 6, naipe: "Espadas", img: "../imgs/6S.svg" },
  { valor: 7, naipe: "Espadas", img: "../imgs/7S.svg" },
  { valor: 8, naipe: "Espadas", img: "../imgs/8S.svg" },
  { valor: 9, naipe: "Espadas", img: "../imgs/9S.svg" },
  { valor: 10, naipe: "Espadas", img: "../imgs/TS.svg" },
  { valor: 11, naipe: "Espadas", img: "../imgs/JS.svg" },
  { valor: 12, naipe: "Espadas", img: "../imgs/QS.svg" },
  { valor: 13, naipe: "Espadas", img: "../imgs/KS.svg" },
  { valor: 14, naipe: "Espadas", img: "../imgs/AS.svg" },
  { valor: 2, naipe: "Copas", img: "../imgs/2H.svg" },
  { valor: 3, naipe: "Copas", img: "../imgs/3H.svg" },
  { valor: 4, naipe: "Copas", img: "../imgs/4H.svg" },
  { valor: 5, naipe: "Copas", img: "../imgs/5H.svg" },
  { valor: 6, naipe: "Copas", img: "../imgs/6H.svg" },
  { valor: 7, naipe: "Copas", img: "../imgs/7H.svg" },
  { valor: 8, naipe: "Copas", img: "../imgs/8H.svg" },
  { valor: 9, naipe: "Copas", img: "../imgs/9H.svg" },
  { valor: 10, naipe: "Copas", img: "../imgs/TH.svg" },
  { valor: 11, naipe: "Copas", img: "../imgs/JH.svg" },
  { valor: 12, naipe: "Copas", img: "../imgs/QH.svg" },
  { valor: 13, naipe: "Copas", img: "../imgs/KH.svg" },
  { valor: 14, naipe: "Copas", img: "../imgs/AH.svg" },
];
let naipeimg = ["C", "D", "S", "H"];
let naipe = ["Paus", "Ouro", "Espadas", "Copas"];
let valorimg = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
let valor = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let min = 0;
let max = 51;
let select = [];



function Aleatorio(arr) {
  for(let i=0; i<100; i++){
    let box;
    let x = Math.floor(Math.random() * (max - min + 1) + min);
    let y = Math.floor(Math.random() * (max - min + 1) + min);
    box = deck[x];
    deck[x] = deck[y];
    deck[y] = box;
  }
}

function Play() {
  let hist = [];
  let i = 0;
  select = [];
  while (i < 5) {
    let x = Math.floor(Math.random() * (max - min + 1) + min);
    let find = hist.find((elm) => elm == x);
    if (!find) {
      select.push(deck[x]);
      hist.push(x);
      i++;
    }
  }
  select = select.sort((a,b)=>{
    return a.valor - b.valor;
  });
  // select = [
  //   {valor: 3, naipe: 'Copas', img: '../imgs/3H.svg'},
  //   {valor: 4, naipe: 'Espadas', img: '../imgs/4S.svg'},
  //   {valor: 5, naipe: 'Copas', img: '../imgs/5H.svg'},
  //   {valor: 6, naipe: 'Copas', img: '../imgs/6H.svg'},
  //   {valor: 7, naipe: 'Copas', img: '../imgs/7H.svg'},
  // ]
  return select;
}


function Sequencia(arr) {
  let anterior = arr[0].valor;
  let isTrue=true;
  for(let i=1; i<arr.length; i++){
    let distancia = Math.abs(arr[i].valor-anterior);
    if (distancia==1 || distancia==9) {
      isTrue = true;
    }else{
      isTrue = false;
      break
    }
    anterior=arr[i].valor;
  }
  if(isTrue){return true}else{return false}
}



function Resultado() {
  let naipeR=[];
  let valorR=[];
  for (const obj of select) {
    let findV = valorR.find(e=> e[0]==obj.valor)
    let findN = naipeR.find(e=> e==obj.naipe)
    if (!findN) {
      naipeR.push(obj.naipe)
    }
    if (!findV) {
      valorR.push([obj.valor,1])
    }else{
      let pos = valorR.indexOf(findV)
      valorR[pos]=[obj.valor,valorR[pos][1]+1]
    }
  }
  if (naipeR.length==1) {
    if (Sequencia(select)) {
      return "Straight Flush";
    }
    return "Nada";
  }else{
    if (valorR.length==4) {
      return "Par"
    }
    if (valorR.length==3) {
      let trinca = valorR.find((elm)=>{
        if(elm[1]==3){return true}
      });
      if (trinca) {
        return "Trinca";
      }else{
        return "Dois pares";
      }
    }
    if (valorR.length==2) {
      let quadra = valorR.find((elm)=>{
        if(elm[1]==4){return true}
      });
      if (quadra) {
        return "Quadra";
      }else{
        return "Full House";
      }
    }
    if (Sequencia(select)) {
      return "Sequência";
    }

    return "Nada";
  }
}

document.querySelector("#play").addEventListener("click", (e) => {
  let isTrue = e.target.classList.toggle("show")
  if (isTrue) {
    Play();
    res_cartas.innerHTML = Resultado();
    cards_table.classList.toggle("animated");
    for (let i = 0; i < cards_elm.length; i++) {
      cards_elm[i].innerHTML = `<img src="${select[i].img}">`;
    }
    Aleatorio(deck)
  } else {
    cards_table.classList.toggle("animated");
  }
});
