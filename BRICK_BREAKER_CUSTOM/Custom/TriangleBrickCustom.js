import GameObject from "../../Object/GameObject.js";

export default class TriangleBrick extends GameObject{
    constructor (x,y, size, triangleType, health){
        super(x,y);
        let vertices = [];
        
        //vertices[0]에는 직각을 품은 꼭지점이 항상 저장된다.
        switch(triangleType){
            case 1: //  |-/
                vertices.push({x: x, y : y});
                vertices.push({x: x, y: y + size});
                vertices.push({x: x + size, y: y});
            break; //   \-|
            case 2:
                vertices.push({x: x + size, y: y});
                vertices.push({x: x, y : y});
                vertices.push({x: x + size, y: y + size});
            break;
            case 3: // |_\
                vertices.push({x: x, y: y + size});
                vertices.push({x: x, y : y});
                vertices.push({x: x + size, y: y + size});
            break;
            case 4://   /_|
                vertices.push({x: x + size, y: y + size});
                vertices.push({x: x, y : y + size});
                vertices.push({x: x + size, y: y});
            break;
        }
        
        this.size = size;
        this.vertices = vertices;
        this.triangleType = triangleType || 1;
        this.health = health || 10;
        this.effectIndex = 10;
        this.slope = (vertices[2].y - vertices[1].y) / (vertices[2].x - vertices[1].x);
        this.yIntercept = -this.slope * this.vertices[1].x + this.vertices[1].y;
        this.padding = 4;
        this.alpha = 1;
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
        ctx.strokeStyle = this.strokeColor;
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
            ctx.strokeStyle = gradient;
        }
        let v1,v2,v3;
        switch(this.triangleType){
            case 1:
                v1 = {x: this.vertices[0].x + this.padding, y:this.vertices[0].y + this.padding };
                v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y - this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y + this.padding};
            break;
            case 2:
                v1 = {x: this.vertices[0].x - this.padding, y:this.vertices[0].y + this.padding};
                v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y + this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y - this.padding};
            break;
            case 3:
                v1 = {x: this.vertices[0].x + this.padding, y:this.vertices[0].y - this.padding};
                v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y + this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y - this.padding};
            break;
            case 4:
                v1 = {x: this.vertices[0].x - this.padding, y:this.vertices[0].y - this.padding};
                v2 = {x:this.vertices[1].x + this.padding, y:this.vertices[1].y - this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y + this.padding};
            break;
        }
        ctx.moveTo(v1.x,v1.y);
        ctx.lineTo(v2.x,v2.y);
        ctx.lineTo(v3.x,v3.y);
        ctx.lineTo(v1.x,v1.y);
        ctx.stroke();
        ctx.restore();        
    }

    drawFill(ctx){
        if(!this.isFilled){
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = this.fillColor;
        ctx.globalAlpha = this.alpha;
        if(this.isShadowing){
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowColor = this.shadowColor;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        let gradient;
        
        let v1,v2,v3;
        switch(this.triangleType){
            case 1:
                v1 = {x: this.vertices[0].x + this.padding, y:this.vertices[0].y + this.padding };
                v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y - this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y + this.padding};
            break;
            case 2:
                v1 = {x: this.vertices[0].x - this.padding, y:this.vertices[0].y + this.padding};
                v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y + this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y - this.padding};
            break;
            case 3:
                v1 = {x: this.vertices[0].x + this.padding, y:this.vertices[0].y - this.padding};
                v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y + this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y - this.padding};
            break;
            case 4:
                v1 = {x: this.vertices[0].x - this.padding, y:this.vertices[0].y - this.padding};
                v2 = {x:this.vertices[1].x + this.padding, y:this.vertices[1].y - this.padding};
                v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y + this.padding};
            break;
        }

        if (this.isGradientFilled){
            gradient = ctx.createLinearGradient(0,0,50,50);
            gradient.addColorStop(0,this.fillGradientStart);
            gradient.addColorStop(1,this.fillGradientEnd);
            ctx.fillStyle = gradient;
        }

        ctx.moveTo(v1.x,v1.y);
        ctx.lineTo(v2.x,v2.y);
        ctx.lineTo(v3.x,v3.y);
        ctx.lineTo(v1.x,v1.y);
        ctx.fill();
        ctx.restore();      
    }

    drawHealth(ctx){
        ctx.save();
        ctx.font = "10pt Orbitron";
        ctx.fillStyle="white";
        let x,y;
        switch(this.triangleType){
            case 1:
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                x = this.vertices[0].x + 5;
                y = this.vertices[0].y + 5;
                break;
            case 2:
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                x = this.vertices[0].x - 5;
                y = this.vertices[0].y + 5;
                break;
            case 3:
                ctx.textAlign = 'left';
                ctx.textBaseline = 'buttom';
                x = this.vertices[0].x + 5;
                y = this.vertices[0].y - 5;
                break;
            case 4:
                ctx.textAlign = 'right';
                ctx.textBaseline = 'buttom';
                x = this.vertices[0].x - 5;
                y = this.vertices[0].y - 5;
                break;
        }
        ctx.fillText(this.health,x,y);
        ctx.restore();
    }

    getStrokeURL(canvas){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,50,50);
        if (this.isStroked){
            this.drawStroke(ctx);
        }
        else{
            ctx.save();
            ctx.lineWidth = 2;
            ctx.fillStyle = this.fillColor;
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
            let v1,v2,v3;
            switch(this.triangleType){
                case 1:
                    v1 = {x: this.vertices[0].x + this.padding, y:this.vertices[0].y + this.padding };
                    v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y - this.padding};
                    v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y + this.padding};
                break;
                case 2:
                    v1 = {x: this.vertices[0].x - this.padding, y:this.vertices[0].y + this.padding};
                    v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y + this.padding};
                    v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y - this.padding};
                break;
                case 3:
                    v1 = {x: this.vertices[0].x + this.padding, y:this.vertices[0].y - this.padding};
                    v2 = {x: this.vertices[1].x + this.padding, y:this.vertices[1].y + this.padding};
                    v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y - this.padding};
                break;
                case 4:
                    v1 = {x: this.vertices[0].x - this.padding, y:this.vertices[0].y - this.padding};
                    v2 = {x:this.vertices[1].x + this.padding, y:this.vertices[1].y - this.padding};
                    v3 = {x: this.vertices[2].x - this.padding, y: this.vertices[2].y + this.padding};
                break;
            }
            ctx.moveTo(v1.x,v1.y);
            ctx.lineTo(v2.x,v2.y);
            ctx.lineTo(v3.x,v3.y);
            ctx.lineTo(v1.x,v1.y);
            ctx.stroke();
            ctx.restore();
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