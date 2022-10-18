export default class BallContainer{
    constructor(){
        this.launchedBalls = [];
    }

    updateAll(){
        for (let ball of this.launchedBalls){
            ball.update();
        }
    }

    drawAll(ctx){
        for (let ball of this.launchedBalls){
            ball.draw(ctx);
        }
    }

    checkBrickHit(){
        for (let ball of this.launchedBalls){
            ball.hasHitBrick();
        }
    }

    checkStageHit(){
        for (let ball of this.launchedBalls){
            ball.hasHitStage();
        }
    }

    
    get numOfBalls(){
        return this.launchedBalls.length;
    }
}