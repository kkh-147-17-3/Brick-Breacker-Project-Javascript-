import ItemBrick from "./ItemBrick.js";
import Ball from "./Ball.js";
import SoundContainer from "../sound/SoundContainer.js";

export default class BallUp extends ItemBrick{
    constructor(x,y,paddle){
        super(x,y,1);
        // 공 발사 후 paddle로 돌아가기 위해서 필요함.
        // paddle에 공 이미지 정보, 공 발사 갯수 등이 있으므로 paddle을 가져와야 함
        this.paddle = paddle;
        this.newBalls = [];
        for (let i = 0; i < 3; i++){
            let ball = new Ball(this.x + 25,this.y + 25,this.paddle.ballRadius,
                null,null, this.paddle.stageEffectContainer);
            ball.strokeImg = this.paddle.ballStrokeImg;
            ball.fullImg = this.paddle.ballFullImg;
            this.newBalls.push(ball);
        }
    }



    activate(){
        // 벽돌 중앙에서 북쪽 진행방향을 기준으로 왼쪽으로 30', 45', 오른쪽으로 45' 로 진행하는 공을 발사한다.
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
            let ball = this.newBalls[i];
            ball.vx = speeds[i][0];
            ball.vy = speeds[i][1]; 
            ball.paddlePos = {x: this.paddle.x, y: this.paddle.y};
            this.paddle.launchedBalls.push(ball);        
        }
        this.paddle.maxNumBalls += 3;
        SoundContainer.playSfx("ballup");
    }

    move(){
        super.move();
        for (let ball of this.newBalls){
            ball.y += 50;
        }
    }
}