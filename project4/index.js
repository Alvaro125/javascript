function IMC() {
  const peso = +document.querySelector('#imc input#peso').value;
  const altura = +document.querySelector('#imc input#altura').value;
  var res_imc = document.querySelector('#imc .result');

  if (isNaN(peso) || isNaN(altura)) {
    alert("A informação não é numerica")
  }else{
    let imc = peso/(altura**2)
    if(imc<=18.5){
      res_imc.innerHTML = `IMC=${imc}, Abaixo do peso`
    } else
    if(imc<25){
      res_imc.innerHTML = `IMC=${imc}, Peso normal`
    }else
    if(imc<30){
      res_imc.innerHTML = `IMC=${imc}, Sobrepeso`
    }else
    if(imc>=30){
      res_imc.innerHTML = `IMC=${imc}, Obesidade`
    }
  }
}
document.querySelector('#imc button').addEventListener('click', IMC)



function SorteioNumerico() {
  const min = document.querySelector('#sorteio_numero input#min').valueAsNumber;
  const max = document.querySelector('#sorteio_numero input#max').valueAsNumber;
  var res_sort_num = document.querySelector('#sorteio_numero .result');

  if(min >= max){
    alert("Numero minimo não pode ser maior ou igual Numero Maximo")
  } else {
    let interval = (parseInt(max)-parseInt(min))+1
    let num_random = (parseInt(min) + Math.floor(Math.random()*interval))
    res_sort_num.innerHTML = num_random
  }
}
document.querySelector('#sorteio_numero button').addEventListener('click', SorteioNumerico)


function ArredondarNumero() {
  const num = document.querySelector('#arredondar_numero input#num').valueAsNumber;
  var res_sort_num = document.querySelector('#arredondar_numero .result');
  
  let ar_cima = Math.ceil(num)
  let ar_baixo = Math.floor(num)

  res_sort_num.innerHTML = `${ar_cima}||${ar_baixo}`
}
document.querySelector('#arredondar_numero button').addEventListener('click', ArredondarNumero)



function IBGE() {
  var res_ibge = document.querySelector('#ibge .result');
  let idade_random = 0;
  let genero_random = (Math.ceil(Math.random()*1000))

  if (genero_random>517) {
    idade_random = (Math.ceil(Math.random()*517));
    if (idade_random>86) {
      res_ibge.innerHTML = `Mulher e Idosa`
    }else{
      res_ibge.innerHTML = `Mulher e Não-Idosa`
    }
  }else{
    idade_random = (Math.ceil(Math.random()*483));
    if (idade_random>81 ) {
      res_ibge.innerHTML = `Homem e Idoso`
    }else{
      res_ibge.innerHTML = `Homem e Não-Idoso`
    }
  }

  console.log(`${num_random}`)
}
document.querySelector('#ibge button').addEventListener('click', IBGE)