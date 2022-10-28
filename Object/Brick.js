import MoveableObject from "./MoveableObject.js";
import ParticleContainer from "./ParticleContainer.js";
import SoundContainer from "../sound/SoundContainer.js"

export default class Brick extends MoveableObject {
    constructor(x,y,health) {
        super(x,y);
        this.width = 50;
        this.height = 50;
        this.vy = this.height;
        this.resetAppearEffectIndex(); 
        this.health = health;
        this.isBroken = false;
        this.effectIndex = 10;
        this.shrinkingIndex = 0;
        this.numOfParticle = 15;
        this.alpha = 1;
        this.strokeImg = new Image();
        this.fullImg = new Image();
        this.particles = null;
        this.hitEffects = {count:0, audios:[]};
    }
    draw(ctx) {
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

        if (this.isBroken){
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

    drawHealth(ctx){
        if (this.isBroken){
            return;
        }
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = (19 - this.effectIndex).toString() + "pt " + "Orbitron";
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = "white"
        // ctx.strokeText(this.health,this.x + 24, this.y + 32);
        ctx.fillStyle="white";
        ctx.fillText(this.health,this.x + 24, this.y + 30);
        ctx.restore();
       
    }

    drawShrinking(ctx){
        if (this.isBroken && this.shrinkingIndex != 12){
            this.shrinkingIndex++;
            ctx.save();
            let padding = 2 * this.shrinkingIndex;        
            ctx.drawImage(this.strokeImg, 0,0,50,50,this.x+padding,this.y+padding,this.width-2*padding,this.height-2*padding);

            // ctx.roundRect(this.x + this.padding, this.y + this.padding,
                // this.width - 2 * this.padding, this.height - 2 * this.padding, 4);
            ctx.restore();
        }
    }

    drawHitEffect(ctx){
        if (this.effectIndex < 10){
            ctx.save();
            let padding = this.effectIndex * 1.5;
            ctx.globalAlpha  = ((10 - this.effectIndex)/10);
            ctx.drawImage(this.strokeImg, 0,0,50,50,this.x-padding,this.y-padding,this.width+2*padding,this.height+2*padding);

            // ctx.roundRect(this.x - padding,this.y - padding,this.width + 2 * padding,this.height + 2 * padding, 5);
            ctx.restore();
            this.effectIndex++;
        }
    }

    move() {
        super.move();
        if (this.particles != null){
            this.particles.updateAll();
        }
    }

    getHit(damage){
        if (this.isBroken){
            return;
        }
        this.health -= damage;
        if(this.health <= 0){
            this.isBroken = true;
        }
        this.effectIndex = 0;
        let count = this.hitEffects.count;
        let audios = this.hitEffects.audios;
        SoundContainer.playSfx("brick");
    }

    resetAppearEffectIndex(){
        this.appearEffectIndex = Math.floor(-15* Math.random() - 30);
    }
    loadParticles(particleImg){
        this.particles = new ParticleContainer(particleImg); 
        let x = this.x + 25;
        let y = this.y + 25; 
        this.particles.load(x,y,this.numOfParticle);
    }
}