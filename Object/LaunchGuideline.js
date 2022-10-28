import Ball from "./Ball.js";
import GameObject from "./GameObject.js";

export default class LaunchGuideline extends GameObject{
    constructor(x, y,ballRadius){
        super(x,y);
        this.guideline = [];
        this.#length = 34;
        this.radius = 2;
        this.x = x;
        this.y = y;
        this.ballRadius = ballRadius;
        this.color = "red";
    }
    setLine(vx,vy){
        this.guideline = [];
        for (let i = 0; i < this.#length ; i++){
            let ball = new Ball(this.x, this.y, this.ballRadius, vx, vy);
            ball.radius = this.radius;
            this.guideline.push(ball);
            for (let guideBall of this.guideline){
                guideBall.hasHitStage();
                guideBall.move();
            }
        }
    }
    draw(ctx){
        if (this.guideline.length == 0){
            return
        }
        ctx.save();
        for (let i = 0; i < this.#length ; i+=2){
            let ball = this.guideline[i];
            ctx.fillStyle="orange";
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();
    }

    set length(length){
        this.#length = length;
    }

    #length;
}