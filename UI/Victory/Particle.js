export default class Particle {
    constructor(x,y,vx,vy,fillStyle){
        this.alpha = 1;
        this.x =x;
        this.y =y;
        this.vx = vx;
        this.vy = vy;
        this.fillStyle = fillStyle;
    }

    draw(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.x,this.y,4,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.005;
        this.vy += 0.05;
    }
}