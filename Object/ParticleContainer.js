import Particle from "./Particle.js";

export default class ParticleContainer{
    constructor(img){
        this.particles=[];
        this.particleImg = img;
    }
    load(x,y,numOfParticles){
        for (let i = 0; i < numOfParticles; i++){
            this.particles.push(
                new Particle(x,y,
                Math.floor(Math.random()*2 + 2.1), this.particleImg, 2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5)));
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

    updateAll(){
        for (let particle of this.particles){
            particle.updateLocation();
        }
    }
}