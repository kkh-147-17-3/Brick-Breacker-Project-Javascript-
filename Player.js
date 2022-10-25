import BallContainer from "./Object/BallContainer.js";
import BrickContainer from "./Object/BrickContainer.js";
import Paddle from "./Object/Paddle.js";
import MAP from "./ItemMap.js";
export default class Player{
    constructor(playerName, player){
        this.playerName = playerName;
        this.CANVAS = document.querySelector(`#${player}`);
        
        this.stageWidth = 500;
        this.stageHeight = 700;
        this.ctx = this.CANVAS.getContext("2d");
        this.alpha = 0;
        let map = JSON.parse(MAP);
        this.paddle = new Paddle(map.ballInfo, map.stageHitEffectInfo,this.stageWidth, this.stageHeight);
        this.brickContainer = new BrickContainer(map.brickInfo,this.paddle);
        this.#ballContainer = new BallContainer(this.stageHeight);
        this.#ballContainer.balls = this.paddle.launchedBalls;
        this.count = 0;

     
        // this.brickContainer.map = map;
        this.brickContainer.loadNewBricks();
        this.score = 0;
        this.#status = "ready";
        this.isPressingLeft = false;
        this.isPressingRight = false;
    }

    run(){
        
        this.count++;
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0,0.5)';
        this.ctx.fillRect(0,0,this.CANVAS.width, this.CANVAS.height);
        this.ctx.restore();
        this.ctx.translate(20,20);
        this.ctx.strokeStyle ="grey";
        this.ctx.strokeRect(0,0,500,700);
        this.paddle.draw(this.ctx, this.#status);
        this.brickContainer.drawAll(this.ctx);
        switch(this.#status){
            case "ready":
                this.paddle.reload();
                if(this.isPressingLeft){
                    this.paddle.decreaseAngle();
                }
                if(this.isPressingRight){
                    this.paddle.increaseAngle();
                }
            break;
            case "launching":
                this.paddle.launchBall();
                this.#ballContainer.moveAll();
                this.#ballContainer.drawAll(this.ctx);
                this.#ballContainer.checkStageHit(this.ctx);
                this.#ballContainer.checkBrickHit(this.brickContainer);
                this.#ballContainer.deleteArrivedBall();
                if(this.count % 300 == 0){
                    this.#ballContainer.increaseSpeed();
                }
                 if(this.paddle.numLaunchedBalls != 0 && this.#ballContainer.isEmpty()){
                     this.#status="finished";
                 }
            break;
            case "finished":
                this.count = 0;
                this.paddle.reload();
                if (this.brickContainer.hasNoMoreBrick()){
                    console.log("승리!");
                }
                setTimeout(()=>{
                    this.brickContainer.loadNewBricks();
                },2000);
                this.#status = "rearranging";
            break;
            case "rearranging":
                this.paddle.moveToNextPos();
                if(this.paddle.hasArrivedNewPosition()){
                    this.paddle.getRandomPos();
                    this.#status = "ready";
                }
            break;
        }
        this.ctx.translate(-20,-20);
        // console.log(this.CANVAS.style);
        //window.requestAnimationFrame(this.run.bind(this));
    }

    set status(status){
        this.#status = status;
    }

    fadeIn(){
        if(this.alpha + 0.04 > 1){
         this.alpha = 1;
        }
        else{
         this.alpha +=0.04;
         this.CANVAS.style.display = "";
        }
      }
      // 뒤로 가기 버튼을 눌렀을 때 디스플레이 넌.

    #status;
    #ballContainer
}