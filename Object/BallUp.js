import ItemBrick from "./ItemBrick.js";
import Ball from "./Ball.js";

export default class BallUp extends ItemBrick{
    constructor(x,y,paddle){
        super(x,y,1);
        this.paddle = paddle;
    }



    activate(){
        let canvasWidth = this.paddle.canvasWidth;
        let canvasHeight = this.paddle.canvasHeight;
        let dx1 = -this.paddle.launchVelocity * 0.7071;
        let dy1 = -this.paddle.launchVelocity * 0.7071;
        let dx2 = -this.paddle.launchVelocity / 2;
        let dy2 = -this.paddle.launchVelocity * 0.86;
        let dx3 = this.paddle.launchVelocity * 0.7071;
        let dy3 = -this.paddle.launchVelocity * 0.7071;

        let speeds = [
                        [dx1,dy1],
                        [dx2,dy2],
                        [dx3,dy3],
                    ];



        for (let i = 0; i < 3; i++){
            let ball = new Ball(this.x + 25,this.y + 25,this.ballRadius,
                speeds[i][0],speeds[i][1],canvasWidth,canvasHeight,
                this.paddle.stageHitEffectInfo);
            ball.strokeImg = this.paddle.ballStrokeImg;
            ball.fullImg = this.paddle.ballFullImg;
            ball.paddlePos = {x: this.paddle.x, y: this.paddle.y};
            this.paddle.launchedBalls.push(ball);        
        }
        this.paddle.maxNumBalls += 3;
    }
    getMapIndex(){
       
    }
}