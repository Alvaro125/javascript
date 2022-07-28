class Player {
    #x
    #y
    #coin
    constructor(width, height, color, x, y, area) {
        this.width = width;
        this.height = height;
        this.#x = x;
        this.#y = y;
        this.color = color;
        this.ctx = area;
        this.#coin = 0;
    }
    update() {
        let ctx = this.ctx.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    get x() {
        return this.#x;
    }
    set x(_value){
        this.#x = _value;
        return this.x
    }
    set y(_value){
        this.#y = _value;
        return this.y
    }
    get y(){
        return this.#y
    }
    get coin() {
        return this.#coin;
    }
    set coin(_value){
        this.#coin += _value;
    }

    forward(_spd) {
        if (this.y > this.ctx.canvas.height - this.height - 2) {
            this.y = this.ctx.canvas.height - this.height;
        } else {
            this.y += _spd;
        }
    }
    back(_spd) {
        if (this.y < 2) {
            this.y = 0;
        } else {
            this.y -= _spd;
        }
    }
    right(_spd) {
        if (this.x > this.ctx.canvas.width - this.width - 2) {
            this.x = this.ctx.canvas.width - this.width;
        } else {
            this.x += _spd;
        }
    }
    left(_spd) {
        if (this.x < 2) {
            this.x -= 0;
        } else {
            this.x -= _spd;
        }
    }
}

class Coin {
    constructor(width, height, color, x, y, area, type) {
        this.type = type;
        if (type == 'image') {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.ctx = area;
        this.frame = 0;
        this.limitframe = 3;
    }
    update() {
        let ctx = this.ctx.context;
        if (this.type == 'image') {
            let frame = parseInt(this.frame/this.limitframe)
            ctx.drawImage(this.image,0, 8*frame, 8, 8, this.x, this.y, this.width, this.height);
            if (this.frame == 7*this.limitframe) {
                this.frame = 0;
            }else{
                this.frame+=1;
            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    colision(_play) {
        if (
            this.x < _play.x + _play.width &&
            this.x + this.width > _play.x &&
            this.y < _play.y + _play.height &&
            this.y + this.height > _play.y
        ) {
            return true;
        }
        return false;
    }
}
export { Player, Coin };
