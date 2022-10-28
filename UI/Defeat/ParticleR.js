export default class ParticleR {
    constructor(fillStyle){
        this.theta = Math.floor(Math.random()*360);
        this.fillStyle = fillStyle;
        this.radius = Math.floor(Math.random()*5);
        this.angleSpeed = -Math.floor(Math.random()*10 + 18);
        // this.orbitRadius = 200;
        this.orbitRadius = Math.floor(Math.random()*300);
        let rad = Math.PI/180*this.theta;
        this.alpha = 1;
        this.x =this.orbitRadius * Math.cos(rad) + 960;
        this.y =this.orbitRadius * Math.sin(rad) + 540;
        this.status = "spiral";
    }

    draw(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "white";
        ctx.shadowColor = "blue";
        ctx.shadowBlur = "5";
        // ctx.fillStyle = this.fillStyle;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    move(){
        this.theta += this.angleSpeed;
        if (this.theta >= 360){
            this.theta -= 360;
        }
        let rad = Math.PI/180 * this.theta;
        if (this.orbitRadius > 0){
            this.orbitRadius -= 3;
        }
        this.x = this.orbitRadius* Math.cos(rad) + 960;
        this.y = this.orbitRadius* Math.sin(rad) + 540;
        // this.x += this.vx;
        // this.y += this.vy;
    }

    burst(){
        if (this.status == "spiral"){
            this.vx = -50 * Math.random() + 25;
            this.vy = -50 * Math.random() + 25;
            this.status = "burst";
        }

        if (this.status == "burst"){
            this.x += this.vx;
            this.y += this.vy;
            if (this.alpha - 0.04 > 0)
                this.alpha -= 0.04;
        }
    }
}