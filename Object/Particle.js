export default class Particle{
    constructor(x,y,radius, particleImg,dx,dy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
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
        this.x += this.dx;
        // this.dy += 0.03;
        this.y += this.dy;
        this.alpha -= 0.01;
    }
}