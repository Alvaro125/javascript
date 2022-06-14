var carros = [
  {
    id: 1,
    nome: "Renault Sandero RS 2.0",
    fabricante: "Renault",
    velocidade_max: 202,
    tempo_seg_0_a_100km: 8,
    url_img: "./img/Renault Sandero RS 2.0.jpg",
  },
  {
    id: 2,
    nome: "Peugeot 2008 Griffe THP 1.6 Turbo",
    fabricante: "Peugeot",
    velocidade_max: 209,
    tempo_seg_0_a_100km: 8.8,
    url_img: "./img/Peugeot 2008 Griffe THP 1.6 Turbo.jpeg",
  },
  {
    id: 3,
    nome: "Citroën C4 Cactus Shine THP 1.6 Turbo",
    fabricante: "Citroën",
    velocidade_max: 212,
    tempo_seg_0_a_100km: 7.3,
    url_img: "./img/Citroën C4 Cactus Shine THP 1.6 Turbo.jpeg",
  },
  {
    id: 4,
    nome: "Volkswagen Jetta GLI",
    fabricante: "Volkswagen",
    velocidade_max: 250,
    tempo_seg_0_a_100km: 6.8,
    url_img: "./img/Volkswagen Jetta GLI.jpeg",
  },
  {
    id: 5,
    nome: "Volvo S60 T4",
    fabricante: "Volvo",
    velocidade_max: 220,
    tempo_seg_0_a_100km: 7.1,
    url_img: "./img/Volvo S60 T4.jpg",
  },
];

const elm_car = document.querySelector("select#item");
const res_img = document.querySelector(".result img");
const res_text = document.querySelector(".result .text");

for (const key in carros) {
  elm_car.innerHTML += `<option value="${carros[key].id}">${carros[key].nome}</option>`;
}

elm_car.onchange = (e) => {
  let car = carros.find((elm) => elm.id == +e.target.value);
  res_img.src = car.url_img;
  res_text.innerHTML = `
    <h1>${car.nome}</h1>
    <h2>${car.fabricante}</h2>
    <p>Velocidade Maxima: ${car.velocidade_max}km/h</p>
    <p>Alcança a velocidade de 0 a 100km/h em ${car.tempo_seg_0_a_100km}segundos</p>
  `;
};
