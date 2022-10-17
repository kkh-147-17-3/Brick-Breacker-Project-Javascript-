import Moveable from "./Moveable.js";

export default class Brick extends Moveable {
    constructor(pos, size, color, health = 1) {
        super(pos, size, color);
        this.speed = { vx: 0, vy: this.size.height }
        this.health = health;
        this.isBroken = false;
        this.padding = 7 // 나중에 변수로 바꿔야함
    }
    draw(ctx) {
        this.drawBrick(ctx);
        this.drawHealth(ctx);
    }

    drawBrick(ctx){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(123,123,123,0.1)";
        ctx.strokeRect(this.pos.x + this.padding, this.pos.y + this.padding,
            this.size.width - 2 * this.padding, this.size.height - 2 * this.padding);
        ctx.storke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "rgb(123,123,123,0.1)";
        ctx.fillRect(this.pos.x + this.padding, this.pos.y + this.padding,
            this.size.width - 2 * this.padding, this.size.height - 2 * this.padding);
        ctx.closePath();
    }

    drawHealth(ctx){

    }

    update() {
        super.update();

    }

    getHit(){
        this.health --;
        if(this.health <= 0){
            this.isBroken = true;
        }
    }
}