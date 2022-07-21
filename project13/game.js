const boxs = document.querySelectorAll("#game button");
const btn_reset = document.querySelector("button#reset");
let draw = "X";
let jogo = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
const winningConditions = [
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]],
];
let arrayBox = [[],[],[]]

let playWon = "";
let won = false;
let jogadas = 0;

btn_reset.addEventListener('click',()=>{
    Limpar()
})
for (let i = 0; i < boxs.length; i++) {
  if (i>=6) {
    boxs[i].dataset.row = 2;
    boxs[i].dataset.col = i%3;
    arrayBox[2].push(boxs[i])
  }else if(i>=3){
    boxs[i].dataset.row = 1;
    boxs[i].dataset.col = i%3;
    arrayBox[1].push(boxs[i])
  }else{
    boxs[i].dataset.row = 0;
    boxs[i].dataset.col = i%3;
    arrayBox[0].push(boxs[i])
  }
  boxs[i].dataset.id = i;
  boxs[i].dataset.draw;
  boxs[i].dataset.fill = "false";
  boxs[i].addEventListener("click", (e) => {
    if (!won) {
      Draw(e);
    }
    if (won) {
      if (playWon == "X") {
        document.querySelector(`#X`).classList.add("win");
        document.querySelector(`#O`).classList.add("lose");
      }
      if (playWon == "O") {
        document.querySelector(`#O`).classList.add("win");
        document.querySelector(`#X`).classList.add("lose");
      }
    }
    if (jogadas == 9 && !won) {
      document.querySelector("#O").classList.add("lose");
      document.querySelector("#X").classList.add("lose");
    }
  });
}




function Draw(btn) {
  if (btn.target.dataset.fill == "false") {
    btn.target.innerHTML = draw;
    btn.target.dataset.draw = draw;
    let index = Number(btn.target.dataset.id);
    jogo[btn.target.dataset.row][btn.target.dataset.col] = draw;
    if (draw == "X") {
      draw = "O";
    } else {
      draw = "X";
    }
    btn.target.dataset.fill = "true";
    jogadas++;
  }
  won = Win();
}



function Win() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    let winCondition = winningConditions[i];
    let a = jogo[winCondition[0][0]][winCondition[0][1]];
    let b = jogo[winCondition[1][0]][winCondition[1][1]];
    let c = jogo[winCondition[2][0]][winCondition[2][1]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      arrayBox[winCondition[0][0]][winCondition[0][1]].classList.add("green");
      arrayBox[winCondition[1][0]][winCondition[1][1]].classList.add("green");
      arrayBox[winCondition[2][0]][winCondition[2][1]].classList.add("green");
      roundWon = true;
      playWon = b;
      break;
    }
  }
  if (roundWon) {
    return true;
  } else {
    return false;
  }
}



function Limpar() {
  for (let i = 0; i < boxs.length; i++) {
    boxs[i].classList.remove("green");
    boxs[i].classList.remove("lose");
    boxs[i].classList.remove("win");
    boxs[i].dataset.draw = "";
    boxs[i].innerHTML = "";
    boxs[i].dataset.fill = "false";
  }
  document.querySelector(`#O`).classList.remove("win");
  document.querySelector(`#X`).classList.remove("win");
  document.querySelector(`#O`).classList.remove("lose");
  document.querySelector(`#X`).classList.remove("lose");
  jogo = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  playWon = "";
  won = false;
  jogadas = 0;
}
