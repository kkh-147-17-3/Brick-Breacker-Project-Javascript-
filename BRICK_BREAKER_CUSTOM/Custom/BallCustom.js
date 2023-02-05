import MoveableObject from "../../Object/MoveableObject.js";
export default class Ball extends MoveableObject{
    constructor(x,y){
        super(x,y);
        this.alpha = 1;
        this.shadowBlur = null;
        this.shadowColor = null;
        this.isFilled = true;
        this.isStroked = true;
        this.isShadowing = false;
        this.isGradient = false;
        this.isStrokeOverFill = true;
        this.radius = 10;
    }

    draw(ctx) {
        if (this.isStrokeOverFill){
            this.drawFill(ctx);
            this.drawStroke(ctx);
        }
        else{
            this.drawStroke(ctx);
            this.drawFill(ctx);
        }
    }

    drawStroke(ctx){
        if(!this.isStroked){
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.alpha;
        if(this.isShadowing){
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowColor = this.shadowColor;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        let gradient;
        if (this.isGradientStroked){
            gradient = ctx.createLinearGradient(0,0,30,30);
            gradient.addColorStop(0,this.strokeGradientStart);
            gradient.addColorStop(1,this.strokeGradientEnd);
            this.strokeColor = gradient;
        }
        ctx.strokeStyle = this.strokeColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawFill(ctx){
        if(!this.isFilled){
            return;
        }
        ctx.save();
        ctx.beginPath();
        let gradient;
        ctx.globalAlpha = this.alpha;
        if(this.isShadowing){
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowColor = this.shadowColor;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        if (this.isGradientFilled){
            gradient = ctx.createLinearGradient(0,0,30,30);
            gradient.addColorStop(0,this.fillGradientStart);
            gradient.addColorStop(1,this.fillGradientEnd);
            this.fillColor = gradient;
        }
        ctx.fillStyle = this.fillColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    getStrokeURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,30,30);
        if (this.isStroked){
            this.drawStroke(ctx);
        }
        else{
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.fillStyle;
            ctx.globalAlpha = this.alpha;
            if(this.isShadowing){
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowColor = this.shadowColor;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
            let gradient;
            if (this.isGradientFilled){
                gradient = ctx.createLinearGradient(0,0,30,30);
                gradient.addColorStop(0,this.fillGradientStart);
                gradient.addColorStop(1,this.fillGradientEnd);
                ctx.strokeStyle = gradient;
            }
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.stroke();
            ctx.closePath();
        }
        let result = canvas.toDataURL();
        console.log(result);
        ctx.clearRect(0,0,30,30);
        return result;
    }

    getFullURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,30,30);
        if (this.isStrokeOverFill){
            this.drawFill(ctx);
            this.drawStroke(ctx);
        }
        else{
            this.drawStroke(ctx);
            this.drawFill(ctx);
        }
        let result = canvas.toDataURL();
        console.log(result);
        ctx.clearRect(0,0,30,30);
        return result;
    }

    #paddleMidX
    #paddleMidY
    #status;
    #effectIndex;

    getGradientStroke(){
        return this.strokeColor;
    }

    getGradientFill(){
        return this.fillColor;
    }
}