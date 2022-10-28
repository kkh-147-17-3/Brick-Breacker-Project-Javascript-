import BrickContainer from "./BrickContainer.js";

export default class BallContainer{
    constructor(canvasHeight){
        this.#balls = [];
        this.#canvasHeight = canvasHeight;
    }

    moveAll(){
        for (let ball of this.#balls){
            ball.move();
        }
    }

    drawAll(ctx){
        for (let ball of this.#balls){
            ball.draw(ctx);
        }
    }

    increaseSpeed(){
        for (let ball of this.#balls){
            ball.vx *= 1.1;
            ball.vy *= 1.1;
        }
    }

    checkBrickHit(BrickContainer){
        for (let ball of this.#balls){
            ball.hasHitBricks(BrickContainer)
        }
    }

    checkStageHit(ctx){
        for (let ball of this.#balls){
            if (ball.y + ball.vy > this.#canvasHeight - 20){
                ball.moveToPaddle(); 
            }
            ball.hasHitStage(ctx);
        }
    }

    deleteArrivedBall(){
        for (let i = this.#balls.length - 1; i > -1; i--){
            let ball = this.#balls[i];
            if (ball.status == "arrived"){
                this.#balls.splice(i,1);
            }
        }
    }

    retriveAll(){
        for (let ball of this.#balls){
            ball.quitMoving();
            ball.status = "returning";
        }
    }
    
    getNumOfBall(){
        return this.#balls.length;
    }

    isEmpty(){
        if(this.#balls.length == 0){
            return true;
        }

        else{ 
            return false;
        }
    }

    get balls(){
        return this.#balls;
    }

    set balls(balls){
        this.#balls = balls;
    }

    #balls;
    #canvasHeight;
}