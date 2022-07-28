import { Bingo } from './bingo.mjs';
import { Raffle } from './raffle.mjs';
const numeroSorteio = document.querySelector('#numero_sorteio');
const ctn = document.querySelector('.ctn');
const Cards = [
    new Bingo(),
    new Bingo(),
    new Bingo(),
    new Bingo(),
    new Bingo(),
]
const raffle = new Raffle(1, 75);
Cards.forEach((_cards,_key)=>{
    const card = document.createElement('div');
    card.classList.add('card')
    const h3 = document.createElement('h3');
    h3.innerText = `Carleta ${_key+1}`
    const ul = document.createElement('ul');
    ul.classList.add('listCard')
    _cards.list().forEach((_n) => {
        const li = document.createElement('li');
        li.classList.add('num');
        li.innerText = _n.value;
        ul.appendChild(li);
    });
    card.appendChild(h3);
    card.appendChild(ul);
    ctn.appendChild(card);
})
const timer = function (_num) {
    const time = setInterval(() => {
        let numero = raffle.draw();
        if(numero != null){
            let ball = document.createElement('span');
            ball.classList.add('ball');
            ball.innerText = numero
            numeroSorteio.appendChild(ball);
            document.querySelectorAll('span.ball').forEach((_el) => {
                if (_el.innerText == `${numero}`) {
                    _el.classList.add('view');
                }
            });
            Cards.forEach((_card,key)=>{
                document.querySelectorAll('li.num').forEach((_el) => {
                    _el.addEventListener('click', e=>{
                        if (raffle.hasDraw(Number(e.target.innerText))) {
                            _card.numMark(numero);
                            e.target.classList.add('mark');
                        }
                    })
                });
                if (_card.fullMark()) {
                    document.querySelectorAll('.listCard')[key].classList.add('win')
                    clearInterval(time);
                }
            })
        }else{
            clearInterval(time);
        }
    }, 5000);
    return time;
};
document.querySelector('button#init').addEventListener("click",(e)=>{
    timer()
})
