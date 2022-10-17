import Moveable from "./Moveable.js";

export default class Ball extends Moveable{
    constructor(pos,size,color,speed,canvas){
        super(pos,size,color,speed);
        this.size = size || {radius : 7};
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }

    draw(ctx){
        ctx.beginPath(ctx);
        ctx.strokeStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.size.radius, 0, Math.PI*2);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.size.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    update(){
        super.update();
    }

    hasHitBoundary(){
        if (this.pos.y + this.speed.vy < 0 || this.pos.y + this.speed.vy > this.canvasHeight) {  // y의 원점보다 작을 시 양수=>음수, 음수=>양수로 전환시키기
            this.speed.vy = -this.speed.vy;
        } else if (this.pos.x + this.speed.vx < 0 || this.pos.x + this.speed.vx > this.canvasWidth) { //y 값이 canvas의 높이값을 넘어섰을 때 위와 같이 처리.
            this.speed.vx = -this.speed.vx;
        }
    }

    getXOfNextFrame() {
        return this.pos.x + this.speed.vx;
    }

    getYOfNextFrame() {
        return this.pos.y + this.speed.vy;
    }

    // brick은 brick.position = {x: value, y: value}
    // brick.size = {width: value, height: value}
    hasHitBrick(brick) {
        if (brick.isBroken)
            return;
    
        let nextX = this.getXOfNextFrame();
        let nextY = this.getYOfNextFrame();
        let leftXOfBrick = brick.pos.x;
        let rightXOfBrick = brick.pos.x + brick.size.width;
        let topYOfBrick = brick.pos.y;
        let bottomYOfBrick = brick.pos.y + brick.size.height;
        if (!(nextX >= leftXOfBrick && nextX <= rightXOfBrick &&
            nextY >= topYOfBrick && nextY <= bottomYOfBrick)) {
            return;
        }

        if (this.pos.x < leftXOfBrick)
            this.speed.vx *= -1;

        if (this.pos.x > rightXOfBrick)
            this.speed.vx *= -1;

        if (this.pos.y < topYOfBrick)
            this.speed.vy *= -1;

        if (this.pos.y > bottomYOfBrick)
            this.speed.vy *= -1;

        brick.getHit();
    }
}