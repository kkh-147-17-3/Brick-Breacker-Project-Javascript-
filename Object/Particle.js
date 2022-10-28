import MoveableObject from "./MoveableObject.js";


export default class Particle extends MoveableObject{
    constructor(x,y,radius, particleImg,vx,vy){
        super(x,y,vx,vy);
        this.radius = radius;
        this.alpha = Math.random() + 0.5;
        this.particleImg = particleImg;
    }

    draw(ctx){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.particleImg,0,0,50,50,this.x+this.radius,this.y+this.radius,2*this.radius,2*this.radius);
        ctx.restore();
    }
    updateLocation(){
        this.y += 50;
    }

    move(){
        this.x += this.vx;
        // this.dy += 0.03;
        this.y += this.vy;
        this.alpha -= 0.01;
    }
}