import Ball from "./Ball.js";
import LaunchGuideline from "./LaunchGuideline.js";
import MoveableObject from "./MoveableObject.js";
import StageEffectContainer from "./StageEffectContainer.js";

export default class Paddle extends MoveableObject{
    #loadedBalls;
    constructor(ballInfo, StageEffectContainer){
        // paddle의 초기 속도는 오른쪽 방향으로 4(속도는 부호만 바뀔뿐 절대값이 변경되지 않음)
        super(0,0,4,0);
        
        // 시작위치는 스테이지의 중간 아래쪽
        this.x = this.STAGE_WIDTH/2;
        this.y = this.STAGE_HEIGHT - 20;
        // 발사각도는 -80' ~ 80'
        this.#launchAngle = 0;
        this.#maxAngle = 80;

        this.#launchedBalls = [];
        this.#loadedBalls = [];


        // 공속도
        this.#launchVelocity = 13;
        this.#stageEffectContainer = StageEffectContainer;
        // 초기 발사각도는 위쪽(정북쪽)
        this.#launchVx = 0;
        this.#launchVy = -this.#launchVelocity;
        this.#numLaunchedBalls = 0;
        this.#count = 0;
        
        // 값이 클 수록 발사되는 공의 간격이 커짐
        this.#launchDelay = 10;
        
        // paddle이 움직일 수 있는 범위는 스테이지 기준 1/7 ~ 6/7 범위
        this.#moveableRange = {min : this.STAGE_WIDTH/7, max : 6*this.STAGE_WIDTH/7};
        this.#nextXPos;
        this.getRandomPos();
        // paddle에서 공 생성할 때 공의 이미지 정보
        this.ballStrokeImg = new Image();
        this.ballFullImg = new Image();

        // 최대공발사갯수, 스테이지에 부딫쳤을 때 effect 색 정보, 공 크기, 공 이미지를 MAP에서 가져옴
        this.#currentMaxNumBalls = parseInt(ballInfo.ballNumber);
        this.#maxNumBalls = this.#currentMaxNumBalls;

        this.ballRadius = parseInt(ballInfo.ballRadius);
        this.ballStrokeImg.src = ballInfo.ballStrokeImg;
        this.ballFullImg.src = ballInfo.ballFullImg;

        // 발사방향을 표시해주는 가이드선 생성
        this.#launchGuideline = new LaunchGuideline(this.x, this.y,this.ballRadius);
    
    }


    moveToNextPos(){
        if (Math.abs(this.x - this.#nextXPos) > Math.abs(this.vx)){
            this.x += this.vx;
        }
        else{
            this.x = this.#nextXPos;
            this.#launchGuideline.x = this.x;
        }
    }

    hasArrivedNewPosition(){
        if(this.x == this.#nextXPos){
            this.#currentMaxNumBalls = this.#maxNumBalls;
            return true;
        }
        else{
            return false;
        }
    }
    
    getRandomPos(){
        let pos = Math.random() * (this.#moveableRange.max - this.#moveableRange.min) + this.#moveableRange.min;
        if (this.x > pos && this.vx > 0 || this.x < pos && this.vx < 0){
            this.vx *= -1;
        }
        this.#nextXPos = pos;
    }

    increaseAngle(){
        if(this.#launchAngle == this.#maxAngle){
            return;
        }
        
        this.#launchAngle++;
        this.setLaunchDirection();
    }
    
    decreaseAngle(){
        if(this.#launchAngle == -this.#maxAngle){
            return;
        }        
        
        this.#launchAngle--;
        this.setLaunchDirection();
    }
    
    setLaunchDirection(){
        let rad = this.#launchAngle * Math.PI/180;
        let tan = Math.tan(rad);
        let ux = tan/Math.sqrt(1+tan**2);
        let uy = -1/Math.sqrt(1+tan**2);
        this.#launchVx = ux * this.#launchVelocity;
        this.#launchVy = uy * this.#launchVelocity;
    }
    
    draw(ctx,playerStatus){
        this.drawPaddle(ctx);
        if (playerStatus == "ready"){
            this.#launchGuideline.setLine(this.#launchVx, this.#launchVy);
            this.#launchGuideline.draw(ctx);
        }
        this.drawNumBalls(ctx);
    }
    
    drawPaddle(ctx){
        ctx.drawImage(this.ballFullImg , this.x- 15,this.y - 15);
    }
    
    update(){
        
    }
    
    launchBall(){
        if(this.#numLaunchedBalls == this.#currentMaxNumBalls){
            return;
        }
        this.#count++;
        if (this.#count % this.#launchDelay == 0){
            let ball = this.#loadedBalls.pop();
            ball.vx = this.#launchVx;
            ball.vy = this.#launchVy;
            this.launchedBalls.push(ball)
            this.#numLaunchedBalls++;
        }
        
    }
    

    stopLaunching(){
        this.#numLaunchedBalls = this.#currentMaxNumBalls;
    }


    getMiddle(){
        let x = this.x + this.#width / 2;
        let y = this.y + this.#height / 2;
        return {x : x, y : y};
    }

    drawNumBalls(ctx){
        let remainedBalls = this.#currentMaxNumBalls - this.#numLaunchedBalls;
        ctx.save();
        ctx.font = "15pt Orbitron";
        ctx.fillStyle = 'white';
        ctx.fillText("x"+remainedBalls, this.x +15 ,this.y - 15);
        ctx.restore();
    }
    
    set launchVelocity(velocity){
        this.launchVelocity = velocity;
    }
    
    set width(width){
        this.#width = width;
    }
    
    set height(height){
        this.#height = height;
    }
    
    get launchedBalls(){
        return this.#launchedBalls;
    }
    
    get numLaunchedBalls(){
        return this.#numLaunchedBalls;
    }
    
    set nextXPos(pos){
        console.log(pos);
    }
    reload(){
        this.#numLaunchedBalls = 0;
        for (let i = 0; i < this.#currentMaxNumBalls; i++){
            let ball = new Ball(this.x,this.y,this.ballRadius,
                null,null,
                this.#stageEffectContainer);
            ball.strokeImg = this.ballStrokeImg;
            ball.fullImg = this.ballFullImg;
            this.#loadedBalls.push(ball);        
        }
    }

    get launchVelocity(){
        return this.#launchVelocity;
    }

    set maxNumBalls(num){
        this.#maxNumBalls = num;
    }

    get maxNumBalls(){
        return this.#maxNumBalls;
    }

    get stageEffectContainer(){
        return this.#stageEffectContainer;
    }


    #launchAngle
    #launchedBalls
    #maxAngle 
    #launchVelocity
    #launchVx
    #launchVy 
    #numLaunchedBalls 
    #maxNumBalls
    #currentMaxNumBalls
    #launchGuideline
    #count 
    #launchDelay 
    #moveableRange 
    #nextXPos 
    #width
    #height
    #stageEffectContainer
}