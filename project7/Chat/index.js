const screen = document.querySelector("section textarea#screen");
const envio = document.querySelector("section button#envio");
const clean = document.querySelector("section button#clean");
const msg = document.querySelector("section input#msg");

function Enviar() {
  if (msg.value.length > 0) {
    screen.value += "+" + msg.value + "\n";
    msg.value = "";
    screen.scrollTop = screen.scrollHeight;
  }
}
screen.addEventListener("keydown", (e) => {
  e.preventDefault();
});
msg.addEventListener("keydown", (e) => {
  if (e.key.match(/Enter/gi)) {
    Enviar();
  }
});
window.addEventListener("keyup", (e) => {
    if (e.key.match(/escape/gi)) {
        screen.value = "";
      }
  });
envio.onclick = () => {
  Enviar();
};
clean.onclick = () => {
  screen.value = "";
};
