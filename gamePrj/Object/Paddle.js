import Moveable from "./Moveable.js";
import Ball from "./Ball.js";

export default class Paddle extends Moveable{
    constructor(pos, size, color, speed, launchedBalls, launchVelocity = 7, maxNumBalls = 20){
        super(pos, size, color, speed);
        this.launchAngle = 0;
        this.launchedBalls = launchedBalls;
        this.maxAngle = 80;
        this.launchVelocity = launchVelocity;
        this.launchSpeed = {vx: 0, vy: -this.launchVelocity};
        this.numLaunchedBalls = 0;
        this.maxNumBalls = maxNumBalls;
        this.launchDelay = 10;
        this.count = 0;
    }

    plusLaunchAngle(){
        if(this.launchAngle == this.maxLaunchAngle){
            return;
        }

        this.launchAngle++;
        this.setLaunchDirection();
    }
    
    minusLaunchAngle(){
        if(this.launchAngle == -this.maxLaunchAngle){
            return;
        }        

        this.launchAngle--;
        this.setLaunchDirection();
    }

    setLaunchDirection(){
        let rad = this.launchAngle * Math.PI/180;
        let tan = Math.tan(rad);
        let ux = tan/Math.sqrt(1+tan**2);
        let uy = -1/Math.sqrt(1+tan**2);
        this.launchSpeed.vx = ux * this.launchVelocity;
        this.launchSpeed.vy = uy * this.launchVelocity;

    }

    draw(ctx){
        this.drawPaddle(ctx);
        this.drawGuideline(ctx);
    }

    drawPaddle(ctx){
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    drawGuideline(ctx){
        ctx.beginPath();
        ctx.strokeStyle = "red";
        let paddleMidPos = {x: this.pos.x + this.size.width / 2, y : this.pos.y};
        ctx.moveTo(paddleMidPos.x, paddleMidPos.y);
        ctx.lineTo(paddleMidPos + this.launchSpeed, paddleMidPos + this.launchSpeed);
        ctx.stroke();
        ctx.closePath();
    }

    update(){

    }

    launchBall(){
        if(this.numLaunchedBalls == this.maxNumBalls){
            return;
        }
        this.count++;
        if (this.count % 10 == 0){
            let paddleMidPos = {x: this.pos.x + this.size.width / 2, y : this.pos.y};
            let ball = new Ball(paddleMidPos, null, null, this.launchSpeed, null);
            this.launchBalls.push(ball);
            this.numLaunchedBalls++;
        }
           
    }
      
}