export default class StageHitEffect{
    constructor(x,y,side,stageHitEffectInfo){
        this.side = side;
        this.index = 0;
        this.alpha = 1;
        this.x = x;
        this.y = y;
        this.stageHitEffectInfo = stageHitEffectInfo;
    }
    
    draw(ctx){
        let padding = 3* this.index;
        ctx.save();
        ctx.globalAlpha = this.alpha
        // ctx.translate(-20,-20);
        ctx.strokeStyle = this.stageHitEffectInfo.stageHitEffectStrokeStyle;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.stageHitEffectInfo.stageHitEffectShadowColor;
        ctx.beginPath();
        switch(this.side){
            case "left":{
                ctx.arc(0, this.y,padding,Math.PI/2,Math.PI*3/2);
                ctx.stroke();
            }
            break;
            case "right":{
                ctx.arc(500, this.y,padding,Math.PI/2,Math.PI*3/2,true);
                ctx.stroke();
            }
            break;
            case "up":{
                ctx.arc(this.x,0,padding,Math.PI,0);
                ctx.stroke();
            }
            break;
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        this.index++;
        this.alpha -=0.01;
    }
}