import Particle from "./ParticleR.js";

export default class ParticleRContainer{
    constructor(x,y){
        this.particles=[];
        this.x = x;
        this.y = y;
        this.status = "spiral";
        this.alpha = 0;
    }
    load(numOfParticles){
        for (let i = 0; i < numOfParticles; i++){
            let r = Math.random()*255;
            let g = Math.random()*255;
            let b = Math.random()*255;

            let fillStyle = `rgb(${r},${g},${b})`;
            this.particles.push(
                new Particle(fillStyle));
        }
    }

    drawAll(ctx){
        if (this.status == "spiral"){
            this.alpha += 0.01;
        }
        else{
            if (this.alpha > 0.1)
            this.alpha -= 0.1;
        }
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "black";
        ctx.arc(960,540,5,0,Math.PI*2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = "blue"
        ctx.fill();
        ctx.closePath();
        for (let particle of this.particles){
            particle.draw(ctx);
        }
    }

    moveAll(){
        if (this.status == "burst"){
            return;
        }
        for (let i = this.particles.length - 1; i > -1; i--){
            let particle = this.particles[i];
            if (particle.alpha <= 0.1){
                this.particles.splice(particle, 1);
            }
        }

        for (let particle of this.particles){
            particle.move();
        }
    }

    burst(ctx){
        if (this.status == "spiral"){
            return;
        }
        for (let particle of this.particles){
           particle.burst();
        }
    }

    checkAll(){
        for (let particle of this.particles){
            if (particle.orbitRadius > 3)
                return;
         }
         this.change();
    }
    change(){
        this.status = "burst";
    }
}