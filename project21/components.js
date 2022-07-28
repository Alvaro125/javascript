class Avatar {
    #x;
    #y;
    #coin;
    #color;
    constructor(width, height, color, x, y, area, type) {
        this.type = type;
        this.#color = color;
        this.width = width;
        this.height = height;
        this.#x = x;
        this.#y = y;
        this.#coin = 0;
        this.ctx = area;
        this.frame = 0;
        this.limitframe = 10;
        this.sizeframe = 32;
        this.hp = 10;
        this.row = 1;
        this.col = 5;
        this.dano = 1;
        this.custoPower = 0;
    }
    update() {
        let ctx = this.ctx.context;
        if (this.type == 'image') {
            let img = new Image();
            img.src = this.color;
            let frametime = parseInt(this.frame / this.limitframe);
            if (this.col == 1) {
                ctx.drawImage(
                    img,
                    0,
                    this.sizeframe * frametime,
                    this.sizeframe,
                    this.sizeframe,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                if (this.frame == (this.row - 1) * this.limitframe) {
                    this.frame = 0;
                } else {
                    this.frame += 1;
                }
            } else if (this.row == 1) {
                if (this.frame == (this.col - 1) * this.limitframe) {
                    this.frame = 0;
                } else {
                    this.frame += 1;
                }
                ctx.drawImage(
                    img,
                    this.sizeframe * frametime,
                    0,
                    this.sizeframe,
                    this.sizeframe,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    hpbar() {
        let ctx = this.ctx.context;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, this.width * (this.hp / 10), 5);
    }

    get x() {
        return this.#x;
    }
    set x(_value) {
        this.#x = _value;
    }
    get y() {
        return this.#y;
    }
    set y(_value) {
        this.#y = _value;
    }
    get coin() {
        return this.#coin;
    }
    set coin(_value) {
        this.#coin += _value;
    }
    get color() {
        return this.#color;
    }
    set color(_value) {
        this.#color = _value;
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
    colision(_ob) {
        if (
            this.x < _ob.x + _ob.width &&
            this.x + this.width > _ob.x &&
            this.y < _ob.y + _ob.height &&
            this.y + this.height > _ob.y
        ) {
            return true;
        }
        return false;
    }
}

class Coin extends Avatar {
    constructor(width, height, color, x, y, area, type) {
        super(width, height, color, x, y, area, type);
        this.frame = 0;
        this.limitframe = 3;
        this.sizeframe = 8;
        this.hp = 10;
        this.row = 8;
        this.col = 1;
    }
}

class Cowboy extends Avatar {
    #angle;
    constructor(width, height, color, x, y, area, type) {
        super(width, height, color, x, y, area, type);
        this.tirox = this.x;
        this.tiroy = this.y;
        this.range = 200;
        this.nBalas = 11;
        this.#angle = 0;
        this.dano = 2;
        this.custoPower = 1;
    }
    tiro(_array) {
        if (!_array) {
            this.tirox = super.x;
            this.tiroy = super.y;
        } else {
            if (this.nBalas) {
                let ctx = this.ctx.context;
                ctx.fillStyle = 'black';
                ctx.fillRect(this.tirox, this.tiroy, 5, 5);
                this.tirox += Math.cos(this.angle) * 3;
                this.tiroy += Math.sin(this.angle) * 3;
                this.range -= 3;
                if (this.range <= 0) {
                    this.tirox = this.x;
                    this.tiroy = this.y;
                    _array.splice(this, 1);
                    this.nBalas -= 1;
                    this.range = 200;
                }
            }
        }
    }
    get angle() {
        return this.#angle;
    }
    set angle(_value) {
        this.#angle = _value;
    }
}

class Attack extends Avatar {
    #angle;
    constructor(array, obj, area, angle) {
        super(area);
        this.color = 'black';
        this.size = 5;
        this.area = area;
        this.#angle = angle;
        this.x = obj.x + obj.width / 2;
        this.y = obj.y + obj.height / 2;
        this.range = 300;
        this.obj = obj;
        this.dirX = Math.cos(this.angle);
        this.dirY = Math.sin(this.angle);
        this.array = array;
        this.spd = 10;
    }
    tiro() {
        if (this.obj.nBalas) {
            let ctx = this.area.context;
            this.move(this.array);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    preda() {
        if (this.obj.nBalas) {
            let ctx = this.area.context;
            this.move(this.array);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    fogo
    move() {
        if (this.obj.nBalas) {
            this.x += this.dirX * this.spd;
            this.y += this.dirY * this.spd;
            this.range -= this.spd;
            if (this.range <= 0) {
                this.array.splice(this);
                this.obj.nBalas -= 1;
                return;
            }
        }
    }
    hitTest(_ob) {
        if (
            this.x < _ob.x + _ob.width &&
            this.x + this.size > _ob.x &&
            this.y < _ob.y + _ob.height &&
            this.y + this.size > _ob.y
        ) {
            return true;
        }
        return false;
    }

    get angle() {
        return this.#angle;
    }
    set angle(_value) {
        this.#angle = _value;
    }
}
class Boss extends Avatar {
    constructor(width, height, color, x, y, area, type) {
        super(width, height, color, x, y, area, type);
        this.boox = 1;
        this.booy = 1;
    }
    hpbar() {
        let ctx = this.ctx.context;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, this.width * (this.hp / 10), 10);
    }
    move(_x, _y) {
        this.x += _x * this.boox;
        this.y += _y * this.booy;
        if (this.y > this.ctx.canvas.height - this.height - 2 || this.y < 2) {
            this.booy *= -1;
        }
        if (this.x > this.ctx.canvas.width - this.width - 2 || this.x < 2) {
            this.boox *= -1;
        }
    }
}
export { Avatar, Coin, Cowboy, Attack, Boss };
