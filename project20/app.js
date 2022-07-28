import { GerarCor, GerarNum } from './helpers.js';
import { Coin, Player } from './components.js';
let player;
let coins = [];
let isize = 40;
let speedNormal = 10;
let img = new Image();
img.src = './sprites/coin.png';
function createCoins(){
    for (let i = 0; i < 10; i++) {
        let coin = new Coin(20,20,'./sprites/coin.png', GerarNum(screen.canvas.width-20),GerarNum(screen.canvas.height-20),screen, "image");
        coins.push(coin)
    }
    return coins;
}
function startGame() {
    screen.start();
    player = new Player(isize, isize, GerarCor(), 100, 10, screen);
    createCoins()
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
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};

function Update() {
    screen.clear();
    if (coins.length) {
        coins.map((_coin,_key)=>{
            if (_coin.colision(player)) {
                coins.splice(_key,1)
                player.coin = 1
            }
            _coin.update()
        })
    }else{
        createCoins()
    }
    if (screen.keys && screen.keys[65]) {
        player.left(speedNormal)
    }
    if (screen.keys && screen.keys[68]) {
        player.right(speedNormal)
    }
    if (screen.keys && screen.keys[87]) {
        player.back(speedNormal)
    }
    if (screen.keys && screen.keys[83]) {
        player.forward(speedNormal)
    }
    // console.log(player.speedX, player.speedY)
    document.getElementById('x').innerText = player.x;
    document.getElementById('y').innerText = player.y;
    // let viewkey = []
    // for (let i = 0; i < screen.keys.length; i++) {
    //     if (screen.keys[i]) {
    //         viewkey.push(i)
    //     }
    // }
    document.getElementById('coins').innerText = player.coin;
    player.update();
}

window.addEventListener('load', startGame());
// console.dir(screen.canvas);
