import Particle from "./Particle.js";

export default class ParticleContainer{
    constructor(x,y){
        this.particles=[];
        this.x = x;
        this.y = y;
    }
    load(numOfParticles,dir){
        for (let i = 0; i < numOfParticles; i++){
            let r = Math.random()*255;
            let g = Math.random()*255;
            let b = Math.random()*255;
            let vx,vy;
            if (dir == "left"){
                vx= -6 * Math.random();
                vy= -6 * Math.random();
            }
            else{
                vx = 6 * Math.random();
                vy= -6 * Math.random();
            }

            let fillStyle = `rgb(${r},${g},${b})`;
            this.particles.push(
                new Particle(this.x,this.y,vx,vy,fillStyle));
        }
    }

    drawAll(ctx){
        for (let particle of this.particles){
            particle.draw(ctx);
        }
    }

    moveAll(){

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
}