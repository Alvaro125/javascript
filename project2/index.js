const elm_num1 = document.querySelector("#comparador_numeros .form #num1");
const elm_num2 = document.querySelector("#comparador_numeros .form #num2");
const but_comparador_num = document.querySelector("#comparador_numeros button");
const res_comparador_num = document.querySelector(
  "#comparador_numeros .result"
);

but_comparador_num.onclick = (e) => {
  res_comparador_num.innerText = Comparador_Numeros(
    elm_num1.valueAsNumber,
    elm_num2.valueAsNumber
  );
};

function Comparador_Numeros(a = 0, b = 0) {
  if (a < b) {
    return `${a} é Menor que ${b}`;
  }
  if (a == b) {
    return `${a} é Igual a ${b}`;
  }
  if (a > b) {
    return `${a} é Maior que ${b}`;
  }
}




const elm_str1 = document.querySelector("#comparador_strings .form #string1");
const elm_str2 = document.querySelector("#comparador_strings .form #string2");
const but_comparador_str = document.querySelector("#comparador_strings button");
const res_comparador_str = document.querySelector(
  "#comparador_strings .result"
);

but_comparador_str.onclick = (e) => {
  res_comparador_str.innerText = Comparador_Strings(
    elm_str1.value,
    elm_str2.value
  );
};

function Comparador_Strings(a, b) {
  if (a.length < b.length) {
    return `"${a}", com ${a.length} caracteres,\né Menor que \n"${b}", com ${b.length} caracteres`;
  }
  if (a.length == b.length) {
    return `"${a}", com ${a.length} caracteres,\né Igual a \n"${b}", com ${b.length} caracteres`;
  }
  if (a.length > b.length) {
    return `"${a}", com ${a.length} caracteres,\né Maior que \n"${b}", com ${b.length} caracteres`;
  }
}






const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];


const elm_dia = document.querySelector('#day_death .form #dia');
const elm_mes = document.querySelector('#day_death .form #mes');
const elm_ano = document.querySelector('#day_death .form #ano');
const elm_gen = document.querySelector('#day_death .form #gen');
const but_day_death = document.querySelector('#day_death button');
const res_day_death = document.querySelector('#day_death .result');
meses.forEach(m => {
    elm_mes.innerHTML += `<option value="${m}">${m}</option>`
});

but_day_death.onclick = (e) => {
    res_day_death.innerText = Day_Death(
        elm_dia.valueAsNumber,
        meses.indexOf(elm_mes.value)+1,
        elm_ano.valueAsNumber,
        elm_gen.value
    )
};
function Day_Death(dia,mes,ano,gen){
    let dmes,ddia,dano;
    let addmes=0;
    let addano=0;
    if (gen == "Homem") {
        ddia = dia+7
        if(ddia>30){
            ddia = ddia%30
            addmes = 1
        }
        dmes = mes+addmes+1
        if (dmes>12) {
            dmes = dmes%12
            addano = 1
        }
        dano = ano+73+addano
        return `DATA DA MORTE\n${ddia}/${dmes}/${dano}`
    }
    if (gen == "Mulher") {
        ddia = dia+7
        if(ddia>30){
            ddia = ddia%30
            addmes = 1
        }
        dmes = mes+addmes+1
        if (dmes>12) {
            dmes = dmes%12
            addano = 1
        }
        dano = ano+80+addano
        return `DATA DA MORTE\n${ddia}/${dmes}/${dano}`
    }
}