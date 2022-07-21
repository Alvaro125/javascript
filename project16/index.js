const elm_cep = document.querySelector("input#cep");
const res = document.querySelector(".result");
const btn = document.querySelector("#consulta");
const btn_view = document.querySelector("#vermapa");
const googlemaps = document.querySelector("iframe#googlemaps");
let url;

elm_cep.addEventListener("keydown", (e) => {
  if (e.target.value.length < 9) {
    if (e.key.match(/[0-9]/gi)) {
      if (e.target.value.length == 5) {
        e.target.value += "-";
      }
    } else if (!e.key.match(/Backspace/gi)) {
      e.preventDefault();
    }
  } else {
    if (!e.key.match(/Backspace/gi)) {
      e.preventDefault();
    }
  }
});
btn.addEventListener('click', function(){
  // let url = "https://cep.awesomeapi.com.br/json/79800970";
  url = "https://cep.awesomeapi.com.br/json/"+elm_cep.value.split('-').join('');
  getData(url, function(_data){
    res.innerHTML = `
    <h2>CEP:${_data.cep.slice(0,5)}-${_data.cep.slice(5,9)}</h2>
            <p><strong>Endereço: </strong>${_data.address}</p>
            <p><strong>Bairro: </strong>${_data.district}</p>
            <p><strong>Cidade: </strong>${_data.city}</p>
            <p><strong>Estado: </strong>${_data.state}</p>
            <p><strong>Latitude: </strong>${_data.lat}</p>
            <p><strong>Longitude: </strong>${_data.lng}</p>
            <p><strong>DDD: </strong>${_data.ddd}</p>
            <p><strong>Cidade no IBGE: </strong>${_data.city_ibge}</p>`
    
    btn_view.classList.add('show')
  })
})
btn_view.addEventListener('click', function(){
  getData(url,function(_data){
  googlemaps.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14754.03440933826!2d${_data.lng}!3d${_data.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1657114209457!5m2!1spt-BR!2sbr`;
  googlemaps.classList.add('show')
});
})
function getData(_url, _cb) {
  fetch(_url)
    .then((response) => {
      if (response.ok) {
        document.body.style.cursor = 'wait';
        return response.json();
      }
      document.body.style.cursor = 'wait';
      return Promise.reject("Deu Ruim, CEP não encontrado, volte outro dia.");
    })
    .then(result => _cb(result))
    .catch((err)=>{
      console.error(err);
      res.innerHTML=err
    })
    .finally(()=>{
      document.body.style.cursor = 'default';
    });
}