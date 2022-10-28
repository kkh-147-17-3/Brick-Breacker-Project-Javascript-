import BallContainer from "./Object/BallContainer.js";
import BrickContainer from "./Object/BrickContainer.js";
import Paddle from "./Object/Paddle.js";
import StageEffectContainer from "./Object/StageEffectContainer.js";
export default class Player{
    constructor(playerName, player,MAP){
        this.playerName = playerName;
        this.CANVAS = document.querySelector(`#${player}`);
        this.stageWidth = 500;
        this.stageHeight = 700;
        this.ctx = this.CANVAS.getContext("2d");

        
        let map = JSON.parse(MAP);
        this.#stageEffectContainer = new StageEffectContainer(map.stageHitEffectInfo);
        this.paddle = new Paddle(map.ballInfo, this.#stageEffectContainer);
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
                this.#stageEffectContainer.drawAll(this.ctx);
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
                if (this.brickContainer.hasNoMoreBrick()){
                    this.win();
                }
                
                    setTimeout(()=>{
                        let loadResult = this.brickContainer.loadNewBricks();
                        if(loadResult == false)
                            this.lose();
                        this.#stageEffectContainer.reset();
                    },2000);
                
                this.#status = "rearranging";
            break;
            case "rearranging":
                this.paddle.moveToNextPos();
                if(this.paddle.hasArrivedNewPosition()){
                    this.paddle.getRandomPos();
                    this.#status = "wait";
                }
            break;
            case "wait":
                this.readyToContinue();
            break;
        }

        this.ctx.translate(-20,-20);
    }

    set status(status){
        this.#status = status;
    }

    get status(){
        return this.#status;
    }

    quitTurn(){
        this.paddle.stopLaunching();
        this.#ballContainer.retriveAll();
    }

    fadeIn(){
        if(!this.alpha) {
            this.CANVAS.style.display = "";
            this.CANVAS.setAttribute("class","fade-in");
            console.log("check");
            this.alpha = 1;
        }
    }
    #status;
    #ballContainer
    #stageEffectContainer
}