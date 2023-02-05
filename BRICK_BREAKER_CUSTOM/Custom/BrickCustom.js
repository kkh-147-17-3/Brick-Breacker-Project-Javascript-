import MovingObject from "../../Object/MoveableObject.js";

export default class BrickCustom extends MovingObject {
    constructor(x,y,health) {
        super(x,y);
        this.width = 50;
        this.height = 50;
        this.vy = this.height;
        this.health = health;
        this.padding = 4 // 나중에 변수로 바꿔야함
        this.alpha = 1;
        this.shadowBlur = null;
        this.shadowColor = null;
        this.isFilled = true;
        this.isStroked = true;
        this.isShadowing = false;
        this.isGradient = false;
        this.isStrokeOverFill = true;
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
        this.drawHealth(ctx);
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
            gradient = ctx.createLinearGradient(0,0,50,50);
            gradient.addColorStop(0,this.strokeGradientStart);
            gradient.addColorStop(1,this.strokeGradientEnd);
            this.strokeColor = gradient;
        }
        ctx.strokeStyle = this.strokeColor;
        ctx.roundRect(this.x + this.padding, this.y + this.padding,
            this.width - 2 * this.padding, this.height - 2 * this.padding, 5);
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
            gradient = ctx.createLinearGradient(0,0,50,50);
            gradient.addColorStop(0,this.fillGradientStart);
            gradient.addColorStop(1,this.fillGradientEnd);
            this.fillColor = gradient;
        }
        ctx.fillStyle = this.fillColor;
        ctx.roundRect(this.x + this.padding, this.y + this.padding,
            this.width - 2 * this.padding, this.height - 2 * this.padding, 5);    
        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }

    drawHealth(ctx){
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = 10 + "pt " + "Orbitron";
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = "white"
        // ctx.strokeText(this.health,this.x + 24, this.y + 32);
        ctx.fillStyle="white";
        ctx.fillText(this.health,this.x + 24, this.y + 30);
        ctx.restore();
    }

    drawParticle(ctx){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(25, 25, 5, 0, Math.PI * 2)

        if(!this.isFilled){
            ctx.strokeStyle = this.strokeColor;
            ctx.stroke();
        }
        else{
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        }
        ctx.restore();
    }

    getStrokeURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,50,50);
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
                gradient = ctx.createLinearGradient(0,0,50,50);
                gradient.addColorStop(0,this.fillGradientStart);
                gradient.addColorStop(1,this.fillGradientEnd);
                ctx.strokeStyle = gradient;
            }
            ctx.roundRect(this.x + this.padding, this.y + this.padding,
                this.width - 2 * this.padding, this.height - 2 * this.padding, 5);
            ctx.stroke();
            ctx.closePath();
        }
        let result = canvas.toDataURL();
        console.log(result);
        ctx.clearRect(0,0,50,50);
        return result;
    }

    getParticleURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,50,50);
        if (this.isStrokeOverFill){
            this.drawParticleFill(ctx);
            this.drawParticleStroke(ctx);
        }
        else{
            this.drawParticleStroke(ctx);
            this.drawParticleFill(ctx);
        }
        let result = canvas.toDataURL();
        console.log(result);
        ctx.clearRect(0,0,50,50);
        return result;
    }

    drawParticleStroke(ctx){
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
            gradient = ctx.createLinearGradient(0,0,50,50);
            gradient.addColorStop(0,this.strokeGradientStart);
            gradient.addColorStop(1,this.strokeGradientEnd);
            this.strokeColor = gradient;
        }
        ctx.strokeStyle = this.strokeColor;
        ctx.arc(25, 25, 20, 0, Math.PI * 2)
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawParticleFill(ctx){
        if(!this.isFilled){
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
        if (this.isGradientFilled){
            gradient = ctx.createLinearGradient(0,0,50,50);
            gradient.addColorStop(0,this.fillGradientStart);
            gradient.addColorStop(1,this.fillGradientEnd);
            this.fillColor = gradient;
        }
        ctx.fillStyle = this.fillColor;
        ctx.arc(25, 25, 20, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }


    getFullURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,50,50);
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
        ctx.clearRect(0,0,50,50);
        return result;
    }

    getImgWithHealthURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,50,50);
        if (this.isStrokeOverFill){
            this.drawFill(ctx);
            this.drawStroke(ctx);
        }
        else{
            this.drawStroke(ctx);
            this.drawFill(ctx);
        }
        this.drawHealth(ctx);
        let result = canvas.toDataURL();
        console.log(result);
        ctx.clearRect(0,0,50,50);
        return result;
    }
}