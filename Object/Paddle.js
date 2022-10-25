import Ball from "./Ball.js";
import LaunchGuideline from "./LaunchGuideline.js";
import MovingObject from "./MovingObject.js";

export default class Paddle extends MovingObject{
    #loadedBalls;
    constructor(ballInfo, stageHitEffectInfo, canvasWidth, canvasHeight){
        super(canvasWidth/2, canvasHeight - 30, 4, 0);
        this.#launchAngle = 0;
        this.#launchedBalls = [];
        this.#loadedBalls = [];
        this.#maxAngle = 80;
        this.#launchVelocity =4;
        this.#launchVx = 0;
        this.#launchVy = -this.#launchVelocity;
        this.#numLaunchedBalls = 0;
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
        this.#count = 0;        
        this.#launchDelay = 6;
        this.#moveableRange = {min : this.#canvasWidth/7, max : 6*this.#canvasWidth/7};
        this.#nextXPos;
        this.getRandomPos();
        this.#maxNumBalls = parseInt(ballInfo.ballNumber);
        this.stageHitEffectInfo = stageHitEffectInfo;
        this.ballRadius = parseInt(ballInfo.ballRadius);
        this.ballStrokeImg = new Image();
        this.ballFullImg = new Image();
        this.ballStrokeImg.src = ballInfo.ballStrokeImg;
        this.ballFullImg.src = ballInfo.ballFullImg;
        this.#launchGuideline = new LaunchGuideline(this.x, this.y,this.ballRadius, canvasWidth, canvasHeight);
    
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
        if(this.#numLaunchedBalls == this.#maxNumBalls){
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
        this.#numLaunchedBalls = this.#maxNumBalls;
    }


    getMiddle(){
        let x = this.x + this.#width / 2;
        let y = this.y + this.#height / 2;
        return {x : x, y : y};
    }

    drawNumBalls(ctx){
        let remainedBalls = this.#maxNumBalls - this.#numLaunchedBalls;
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
        for (let i = 0; i < this.#maxNumBalls; i++){
            let ball = new Ball(this.x,this.y,this.ballRadius,
                null,null,this.#canvasWidth,this.#canvasHeight,
                this.stageHitEffectInfo);
            ball.strokeImg = this.ballStrokeImg;
            ball.fullImg = this.ballFullImg;
            this.#loadedBalls.push(ball);        
        }
    }

    get canvasHeight(){
        return this.#canvasHeight;
    }

    get canvasWidth(){
        return this.#canvasWidth;
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


    #launchAngle
    #launchedBalls
    #maxAngle 
    #launchVelocity
    #launchVx
    #launchVy 
    #numLaunchedBalls 
    #maxNumBalls
    #canvasWidth
    #canvasHeight
    #launchGuideline
    #count 
    #launchDelay 
    #moveableRange 
    #nextXPos 
    #width
    #height

}