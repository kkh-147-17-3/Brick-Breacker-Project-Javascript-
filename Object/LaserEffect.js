import Effect from "./Effect.js";

export default class LaserEffect extends Effect{
    constructor(x,y){
        super(x,y);
        this.index = 0;
        this.alpha = 1;
        this.x = x;
        this.y = y;
    }
    
    draw(ctx){
        ctx.save();
        ctx.globalAlpha = this.alpha
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = this.index / 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.moveTo(0,this.y + 25);
        ctx.lineTo(500,this.y + 25);
        ctx.stroke();
        ctx.moveTo(this.x + 25,0);
        ctx.lineTo(this.x + 25,700);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        this.index++;
        this.alpha -=0.04;
    }
}