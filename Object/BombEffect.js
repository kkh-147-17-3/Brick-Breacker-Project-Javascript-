export default class BombEffect{
    constructor(x,y){
        this.index = 0;
        this.alpha = 1;
        this.x = x;
        this.y = y;
    }
    
    draw(ctx){
        if (this.alpha > 0){
            let padding = 4 * this.index;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.strokeStyle =   (this.index < 5)?  "#0066ff" : 
                                (this.index < 15) ? "yellow" : 
                                (this.index < 20) ? "orange" :
                                "red";
            ctx.lineWidth = 50;
            ctx.shadowBlur = 5;
            ctx.shadowColor = "red";
            ctx.beginPath();
            ctx.arc(this.x+25,this.y+25,padding,0,Math.PI*2);   
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            this.index++;
            this.alpha -=0.04;
        }
    }
}