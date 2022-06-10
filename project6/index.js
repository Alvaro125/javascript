const bomba = document.querySelector("#bomba img");
const timer_view = document.querySelector("#bomba #time");
const aud_exp = document.querySelector("#bomba audio#explosao");
const aud_beep = document.querySelector("#bomba audio#beep");
const time = 60;
const time_back = time * 1000;
var cont_time = time;

timer_view.innerHTML = cont_time--;

const detonacao = setTimeout(() => {
  aud_exp.play();
  bomba.src = "img/explosao.jpg";
  clearInterval(timer_boom);
  clearInterval(timer_beep);
  timer_view.innerHTML = cont_time--;
}, time_back);

const timer_boom = setInterval(() => {
  timer_view.innerHTML = cont_time--;
}, 1000);
var t = 1000;
const timer_beep = setInterval(() => {
  if (cont_time > 10) {
    aud_beep.currentTime = 0;
    aud_beep.play();
    t = 1000;
  } else {
    aud_beep.currentTime = 0.1;
    aud_beep.play();
    t = 500;
  }
}, t);
bomba.onclick = () => {
  clearTimeout(detonacao);
  clearInterval(timer_boom);
  clearInterval(timer_beep);
  bomba.src = "img/bomba_desativada.png";
};

const elm_minutos = document.querySelector("#temporizador select#minuto");
const elm_segundos = document.querySelector("#temporizador select#segundo");
const crono = document.querySelector("#temporizador button");
const tela = document.querySelector("#temporizador #tela");
var on = true;

for (let i = 0; i < 60; i++) {
  elm_minutos.innerHTML += `<option value="${i}">${i}</option>`;
  elm_segundos.innerHTML += `<option value="${i}">${i}</option>`;
}

crono.onclick = () => {
  if (on) {
    let m = +elm_minutos.value;
    let s = +elm_segundos.value;
    let cont = m * 60 + s;
    let vm = parseInt(cont / 60);
    let vs = parseInt(cont % 60);
    tela.innerHTML = `${vm}min ${vs}s`;
    var contador = setInterval(() => {
      if (cont == 0) {
        clearInterval(contador);
        aud_beep.play();
      } else {
        cont--;
        vm = parseInt(cont / 60);
        vs = parseInt(cont % 60);
        tela.innerHTML = `${vm}min ${vs}s`;
      }
    }, 1000);
    on=false
  }else{
    clearInterval(contador);
    on=true
  }
};
