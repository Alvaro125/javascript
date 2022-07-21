const root = document.querySelector("#root");

function createNode(_el) {
  return document.createElement(_el)
}
function append(_parent, _el) {
  return _parent.appendChild(_el);
}

let Estados = new Promise((resolve, reject)=>{
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`)
    .then((response) => {
      if (response.status == 200) {
        resolve(response.json());
      }else{
        new Promise.reject("Deu Ruim Promise rejeitada");
      }
    })
    .then(data=>{
      resolve(data)
    })
    .catch(err=>{
      reject(err)
    })
})
let Cidades = function(_id){
  return new Promise(function(resolve, reject){
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${_id}/distritos`)
    .then((response) => {
      if (response.status == 200) {
        resolve(response.json());
      }else{
        new Promise.reject("Deu Ruim Promise rejeitada");
      }
    })
    .then(data=>{
      resolve(data[_id])
    })
    .catch(err=>{
      reject(err)
    })
  })
}
let Tempo = function(_id){
  return new Promise(function(resolve, reject){
    fetch(`https://apiprevmet3.inmet.gov.br/previsao/${_id}`)
    .then((response) => {
      if (response.status == 200) {
        resolve(response.json());
      }else{
        new Promise.reject("Deu Ruim Promise rejeitada");
      }
    })
    .then(data=>{
      resolve(data._id)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
let el_estados = createNode('select')
let el_cidades = createNode('select')
Estados.then((_data)=>{
  _data.forEach(_dt=>{
    let op = createNode('option');
    op.innerText = _dt.nome;
    op.value = _dt.id;
    append(el_estados,op);
  })
}).catch(err=>{
  let erro = createNode('p');
  erro.style.background = "red";
  erro.style.color = "white";
  erro.innerText = err;
  append(root,erro);
})
append(root, el_estados);



let btn_estado = createNode('button')
let btn_cidade = createNode('button')
btn_estado.innerText = "OK";
btn_cidade.innerText = "OK";
append(root, btn_estado)

btn_estado.onclick= (e)=>{
  el_cidades.innerHTML = '';
  Cidades(el_estados.value).then(_data=>{
  _data.forEach(_dt=>{
    let op = createNode('option');
    op.innerText = _dt.nome;
    op.value = _dt.municipio.id;
    append(el_cidades,op);
  })
})
append(root, el_cidades)
append(root, btn_cidade)
}
let ctn = createNode('div');
ctn.className = "ctn";
btn_cidade.onclick= (e)=>{
  ctn.innerHTML = '';
  Tempo(el_cidades.value).then((_data)=>{
    let data = _data[el_cidades.value]
    let dias = Object.keys(data);
    let ul = createNode('ul');
    for(let i = 0; i<2; i++){
      let dia = data[dias[i]];
      let li = createNode('li')
      let h1 = createNode('h1')
      let row = createNode('div');
      row.className = "row";
      h1.innerText = `${dias[i]} - ${data[dias[i]].manha["dia_semana"]}`;
      let turnos = Object.keys(dia)
      append(li, h1)
      for(let j = 0; j<turnos.length; j++){
        let card = createNode('div');
        card.className = 'card'
        let turno = createNode('h2');
        turno.innerHTML = turnos[j];
        let resumo = createNode('h3');
        resumo.innerText = data[dias[i]][turnos[j]].resumo;
        let icone = createNode('img');
        icone.src = data[dias[i]][turnos[j]].icone;
        let tempMax = createNode('p');
        tempMax.innerHTML = `Maxima: ${data[dias[i]][turnos[j]].temp_max}°C`;
        let tempMin = createNode('p');
        tempMin.innerHTML = `Minima: ${data[dias[i]][turnos[j]].temp_min}°C`;
        append(card,turno)
        append(card,icone)
        append(card,resumo)
        append(card,tempMax)
        append(card,tempMin)
        append(row, card)
      }
      append(li, row)
      append(ul, li)
    }
    for(let i = 2; i<4; i++){
      let dia = data[dias[i]];
      let li = createNode('li')
      let h1 = createNode('h1')
      h1.innerText = `${dias[i]} - ${data[dias[i]]["dia_semana"]}`;
      let card = createNode('div');
      card.className = 'card'
      let turno = createNode('h2');
      turno.innerHTML = "Manhã";
      let resumo = createNode('h3');
      resumo.innerText = data[dias[i]].resumo;
      let icone = createNode('img');
      icone.src = data[dias[i]].icone;
      let tempMax = createNode('p');
      tempMax.innerHTML = `Maxima: ${data[dias[i]].temp_max}°C`;
      let tempMin = createNode('p');
      tempMin.innerHTML = `Minima: ${data[dias[i]].temp_min}°C`;
      append(card,turno)
      append(card,icone)
      append(card,resumo)
      append(card,tempMax)
      append(card,tempMin)
      append(li, h1)
      append(li, card)
      append(ul, li)
    }
    append(ctn, ul)
  
    append(root, ctn);
  })
}
