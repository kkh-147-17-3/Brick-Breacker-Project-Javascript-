import Ball from "./Ball.js";

export default class LaunchGuideline{
    constructor(x, y,ballRadius,canvasWidth, canvasHeight){
        this.guideline = [];
        this.guidelineLength = 90;
        this.radius = 2;
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ballRadius = ballRadius;
        this.color = "red";
    }
    setLine(dx,dy){
        this.guideline = [];
        for (let i = 0; i < this.guidelineLength; i++){
            let ball = new Ball(this.x, this.y, this.ballRadius, dx, dy,this.canvasWidth, this.canvasHeight);
            ball.radius = this.radius;
            this.guideline.push(ball);
            for (let guideBall of this.guideline){
                guideBall.hasHitStage();
                guideBall.move();
            }
        }
    }
    draw(ctx){
        if (this.guideline.length == 0)
            return
        ctx.save();
        for (let i = 0; i < this.guidelineLength; i+=2){
            let ball = this.guideline[i];
            ctx.fillStyle="orange";
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();
    }
}