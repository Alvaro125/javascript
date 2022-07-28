import { GerarCor, GerarNum } from './helpers.js';
import { Coin, Avatar, Cowboy, Attack, Boss } from './components.js';
let player, boss;
let coins = [];
let tiros = [];
let isize = 40;
let spdx = GerarNum(4)
let spdy = GerarNum(4)
let speedNormal = 10;
let gameover = false;
function createCoins() {
    for (let i = 0; i < 2; i++) {
        let coin = new Coin(
            20,
            20,
            './sprites/coin.png',
            GerarNum(screen.canvas.width - 20),
            GerarNum(screen.canvas.height - 20),
            screen,
            'image'
        );
        if(!coin.colision(boss)){
            coins.push(coin);
        }else{
            i--
        }

    }
    return coins;
}
function updateTiros() {
    for (let i = 0; i < tiros.length; i++) {
        if (tiros[i].hitTest(boss)) {
            boss.hp-=2;
            player.nBalas -=1;
        }
        tiros[i].tiro();
    }
}

function startGame() {
    screen.start();
    player = new Cowboy(
        isize,
        isize,
        './sprites/down.png',
        100,
        10,
        screen,
        'image'
    );
    boss = new Boss(isize, isize, GerarCor(), 100, 100, screen);
    createCoins();
    tiros = [];
}

var screen = {
    canvas: document.querySelector('canvas'),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        // console.log(this.context)
        this.interval = setInterval(Update, 20);

        window.addEventListener('keydown', function (e) {
            // console.dir(e.keyCode)
            screen.keys = screen.keys || [];
            screen.keys[e.keyCode] = e.type == 'keydown';
        });
        window.addEventListener('keyup', function (e) {
            screen.keys[e.keyCode] = e.type == 'keydown';
        });
        screen.canvas.addEventListener('mouseup', (e) => {
                let mouseX = e.clientX;
                let mouseY = e.clientY;
                let angle = Math.atan2(mouseY - player.y, mouseX - player.x);
                tiros.push(new Attack(tiros, player, screen, angle));
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};



function Update() {
    if (!gameover) {
        screen.clear();
        tiros.forEach((el,key)=>{
            if (el.hitTest(boss)) {
                tiros.splice(key,1)
                boss.hp-=player.dano;
                player.nBalas -=1;
            }
        })
        for (let i = 0; i < tiros.length; i++) {
        }
        if (coins.length) {
            coins.map((_coin, _key) => {
                if (_coin.colision(player)) {
                    coins.splice(_key, 1);
                    player.coin = 1;
                }
                _coin.update();
            });
        } else {
            createCoins();
        }
    
        if (screen.keys && screen.keys[65]) {
            player.color = './sprites/left.png';
            player.left(speedNormal);
        }
        if (screen.keys && screen.keys[68]) {
            player.color = './sprites/right.png';
            player.right(speedNormal);
        }
        if (screen.keys && screen.keys[87]) {
            player.color = './sprites/up.png';
            player.back(speedNormal);
        }
        if (screen.keys && screen.keys[83]) {
            player.color = './sprites/down.png';
            player.forward(speedNormal);
        }
        if (screen.keys && screen.keys[16]) {
            if(player.coin>=player.custoPower){
                player.coin = -player.custoPower;
                player.nBalas +=1;
            }
        }
        if(player.colision(boss)){
            player.hp -=1
        }
        // console.log(player.color)
        document.getElementById('x').innerText = player.x;
        document.getElementById('y').innerText = player.y;
        // let viewkey = []
        // for (let i = 0; i < screen.keys.length; i++) {
        //     if (screen.keys[i]) {
        //         viewkey.push(i)
        //     }
        // }
        // console.log(viewkey)
        document.getElementById('coins').innerText = player.coin;
        document.getElementById('balas').innerText = player.nBalas;
        player.hpbar();
        player.update();
        if (player.hp<=0) {
            gameover = true;
        }
        if(boss.hp>0){
            boss.move(spdx,spdy)
            boss.update();
            boss.hpbar();
        }else{
            boss = new Boss(isize, isize, GerarCor(), 100, 100, screen);
            spdx = GerarNum(4)
            spdy = GerarNum(4)
        }
        updateTiros();
    }else{
        screen.clear();
    }
}

window.addEventListener('load', startGame());
// console.dir(screen.canvas);
