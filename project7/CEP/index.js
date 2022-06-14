const elm_cep = document.querySelector("section input#cep");
const res = document.querySelector("section .result");

elm_cep.addEventListener("keydown", (e) => {
  if (e.target.value.length < 9) {
    if (e.key.match(/[0-9]/gi)) {
      if (e.target.value.length == 5) {
        e.target.value += "-";
      }
    } else if (e.key.match(/Backspace/gi)) {
      res.innerHTML = e.target.value;
    } else {
      e.preventDefault();
    }
  } else {
    if (e.key.match(/Backspace/gi)) {
    } else {
      e.preventDefault();
    }
  }
});
elm_cep.addEventListener("keyup", (e) => {
  res.innerHTML = e.target.value;
  if (e.target.value.length == 9) {
    let str_cep = e.target.value.split("-").join("");
    let json = fetch("https://viacep.com.br/ws/"+str_cep+"/json/")
      .then((T) => T.json())
      .then((resquest)=>res.innerHTML="<pre>"+JSON.stringify(resquest, null,2)+"</pre>");
  }
});
// elm_cep.onchange=(e)=>{
//   res.innerHTML = e.target.value
// }
