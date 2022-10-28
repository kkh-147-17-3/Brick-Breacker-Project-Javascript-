import MoveableObject from "./MoveableObject.js";
import ParticleContainer from "./ParticleContainer.js";

export default class TriangleBrick extends MoveableObject{
    constructor (x,y, triangleType, health){
        super(x,y);
        let vertices = [];
        let size = 50;
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
        this.vy = size;
        this.vertices = vertices;
        this.triangleType = triangleType || 1;
        this.health = health || 10;
        this.isBroken = false;
        this.effectIndex = 10;
        this.slope = (vertices[2].y - vertices[1].y) / (vertices[2].x - vertices[1].x);
        this.yIntercept = -this.slope * this.vertices[1].x + this.vertices[1].y;
        this.numOfParticle = 15;
        this.appearEffectIndex;
        this.resetAppearEffectIndex();
        this.padding = 3;
        this.strokeColor = "rgb(53,210,153)";
        this.alpha = 0;
        this.strokeImg = new Image();
        this.fullImg = new Image();
        this.particles = null;
        this.loadParticles();
        this.shrinkingIndex = 0;
    }

    getHit(damage){
        if (this.isBroken){
            return true;
        }
        this.health-=damage;
        if (this.health <= 0){
            this.isBroken = true;
        }
        this.effectIndex = 0;
    }
    
    getLeftBoundary(){
        return this.vertices[1].x;
    }

    getRightBoundary(){
        return this.vertices[2].x;
    }

    getUpBoundary(){
        if (this.triangleType < 3)
            return this.vertices[0].y;
        else 
            return this.vertices[0].y - this.size;
    }

    getDownBoundary(){
        if (this.triangleType < 3)
            return this.vertices[0].y + this.size;
        else 
            return this.vertices[0].y;
    }
    resetAppearEffectIndex(){
        this.appearEffectIndex = Math.floor(-30*Math.random());
    }

    draw(ctx){
        this.drawBrick(ctx);
        this.drawHealth(ctx);
        this.drawHitEffect(ctx);
        this.drawShrinking(ctx);
    }

    drawBrick(ctx){
        if (this.isBroken && this.particles != null){
            this.particles.drawAll(ctx);
            this.particles.moveAll();
            return;
        }
        if (this.appearEffectIndex < 30){
            ctx.save();
            ctx.globalAlpha = this.appearEffectIndex * 0.033;
            this.appearEffectIndex++;
        }
        ctx.drawImage(this.fullImg,this.x,this.y);
        ctx.restore();
    }

    move(){
        super.move();
        this.vertices[0].y += this.size;
        this.vertices[1].y += this.size;
        this.vertices[2].y += this.size;
        this.yIntercept += this.size;
        this.particles.updateAll();
        // this.yIntercept += -this.slope * this.vertices[1].x + this.vertices[1].y;
    }

    drawHealth(ctx){
        if(!this.isBroken){
            ctx.save();
            ctx.font = (19 - this.effectIndex).toString() + "pt " + "Orbitron";
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
                    ctx.textBaseline = 'bottom';
                    x = this.vertices[0].x + 5;
                    y = this.vertices[0].y - 5;
                    break;
                case 4:
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'bottom';
                    x = this.vertices[0].x - 5;
                    y = this.vertices[0].y - 5;
                    break;
            }
            ctx.fillText(this.health,x,y);
            ctx.restore();
        }
    }

    drawShrinking(ctx){
        if (this.isBroken && this.shrinkingIndex != 12){
            this.shrinkingIndex++;
            ctx.save();
            let padding = 2 * this.shrinkingIndex;        

            let x,y;
            switch(this.triangleType){
                case 1:
                    x = this.x + padding;
                    y = this.y + padding;
                break;                    
                case 2:
                    x = this.x + 2.414 * padding;
                    y = this.y + padding;
                break;
                case 3:
                    x = this.x + padding;
                    y = this.y + 2.414*padding;
                break;
                case 4:
                    x = this.x + 2.414*padding;
                    y = this.y + 2.414*padding;
                break;
            }
            let w = 50 - 3.414 * padding;
            let h = 50 - 3.414 * padding;
            ctx.drawImage(this.strokeImg, 0,0,50,50,x,y,w,h);      
            ctx.restore();
        }
        // ctx.roundRect(this.x + this.padding, this.y + this.padding,
            // this.width - 2 * this.padding, this.height - 2 * this.padding, 4);
    }
    drawHitEffect(ctx){
        if (this.effectIndex < 10){
            ctx.save();
            this.alpha = ((10 - this.effectIndex)/10);
            ctx.globalAlpha = this.alpha;
            let padding = this.effectIndex * 2;
            
            let x,y;
            switch(this.triangleType){
                case 1:
                    x = this.x - padding;
                    y = this.y - padding;
                break;                    
                case 2:
                    x = this.x - 2.414 * padding;
                    y = this.y- padding;
                break;
                case 3:
                    x = this.x - padding;
                    y = this.y-2.414*padding;
                break;
                case 4:
                    x = this.x-2.414*padding;
                    y = this.y-2.414*padding;
                break;
            }

            let w = 50 + 3.414 * padding;
            let h = 50 + 3.414 * padding;
            ctx.drawImage(this.strokeImg, 0,0,50,50,x,y,w,h);            
            this.effectIndex++;
            ctx.restore();        
        }
    }
    loadParticles(particleImg){
        this.particles = new ParticleContainer(particleImg); 
        let x,y;
        switch(this.triangleType){
            case 1:
                x = this.vertices[0].x + 50 / 3.4142135;
                y = this.vertices[0].y + 50 / 3.4142135;
            break;                    
            case 2:
                x = this.vertices[0].x - 50 / 3.4142135;
                y = this.vertices[0].y + 50 / 3.4142135;
            break;
            case 3:
                x = this.vertices[0].x + 50 / 3.4142135;
                y = this.vertices[0].y - 50 / 3.4142135;
            break;
            case 4:
                x = this.vertices[0].x - 50 / 3.4142135;
                y = this.vertices[0].y - 50 / 3.4142135;
            break;
        }
        this.particles.load(x,y,this.numOfParticle);
    }
}