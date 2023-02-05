import Ball from './BallCustom.js'

export default class BallSettings{
    constructor(){


        this.strokeStyle = "#1e44dc" 
        this.fillStyle ="#000"
        this.shadowColor = "#000"
        this.shadowBlur = 0;
        this.alpha = 1;
        this.health = 5; 
        this.shadowCheck = false;
        this.isFilled = true, 
        this.isStroked = true, 
        this.isShadowing = false 
        this.isStrokeOverFill = true;
        this.creator; 
        this.stageName; 
        this.difficulty;
        this.isGradientStroked=false 
        this.strokeGradientStart= '#000'; 
        this.strokeGradientEnd = '#000';
        this.isGradientFilled= false;
        this.fillGradientStart='#000' 
        this.fillGradientEnd = '#000';
        this.radius = 10;

        this.strokeImg;
        this.fullImg;

        this.ball = new Ball(15,15);

        
        this.canvas = document.getElementById('ball');
        this.toDataURLCanvas = document.getElementById('ball-to-data-url');
        this.canvas.width = 30;
        this.canvas.height = 30;
        this.toDataURLCanvas.width = 30;
        this.toDataURLCanvas.height = 30; 
        this.ctx = this.canvas.getContext("2d");

        // html 태그를 id에서 class로 바꾸니 복잡해짐 (22.10.22)
        // 구조화 시도하다가 망했음 (22.10.22)
        // 공모양 바꾸는 부분도 별도의 id를 부여해야 할 듯 함 (코드 재사용 불가)
      
        this.drawBall();
        
        const ballStrokeStyleInput = document.getElementById("ball-stroke-style");
        const ballStrokeStyleVal = document.getElementById("ball-stroke-style-value");

        ballStrokeStyleInput.onchange = () => {
            this.strokeStyle = ballStrokeStyleInput.value;
            ballStrokeStyleVal.innerText = this.strokeStyle;
            console.log(this.strokeStyle);
            this.drawBall();
        }
        
        const ballStrokeCheckBox = document.getElementById("ball-stroke-check");

        ballStrokeCheckBox.onchange = () => {
            if(ballStrokeCheckBox.checked == true){
                this.isStroked = true;
            }
            else{
                this.isStroked = false;
            }
            this.drawBall();
        }
        
        const ballFillStyleInput = document.getElementById("ball-fill-style");
        const ballFillStyleVal = document.getElementById("ball-fill-style-value");
        
        ballFillStyleInput.onchange = () => {
            this.fillStyle = ballFillStyleInput.value;
            ballFillStyleVal.innerText = this.fillStyle;
            console.log(this.fillStyle);
            this.drawBall();
        }
        
        const ballFillCheckBox = document.getElementById("ball-fill-check");

        ballFillCheckBox.onchange = () => {
            if(ballFillCheckBox.checked == true){
                this.isFilled = true;
            }
            else{
                this.isFilled = false;
            }
            this.drawBall();
        }
        
        const ballShadowCheckBox = document.getElementById("ball-shadow-check");

            
        ballShadowCheckBox.onchange = () => {
            if(ballShadowCheckBox.checked == true){
                this.isShadowing = true;
            }
            else{
                this.isShadowing = false;
            }
            this.drawBall();
        }
        
        const ballShadowColorInput = document.getElementById("ball-shadow-color");
        const ballShadowColorVal = document.getElementById("ball-shadow-color-value");
        
        ballShadowColorInput.onchange = () => {
            this.shadowColor = ballShadowColorInput.value;
            ballShadowColorVal.innerText = this.shadowColor;
            console.log(this.shadowColor);
            this.drawBall();
        }
        
        const ballSetAlphaInput = document.getElementById("ball-set-alpha");
        const ballSetAlphaVal = document.getElementById("ball-alpha-value");
        
        ballSetAlphaInput.onchange = () => {
            this.alpha = ballSetAlphaInput.value;
            ballSetAlphaVal.innerText = this.alpha;
            console.log(this.alpha);
            this.drawBall();
        }

        const ballShadowBlurInput = document.getElementById("ball-shadow-blur");
        const ballShadowBlurVal = document.getElementById("ball-shadow-blur-value");
        
        ballShadowBlurInput.onchange = () => {
            this.shadowBlur = ballShadowBlurInput.value;
            ballShadowBlurVal.innerText = this.shadowBlur;
            console.log(this.shadowBlur);
            this.drawBall();
        }
        
        const ballOverlayBtns = document.querySelectorAll('input[name="ball-overlay"]');
        for (let radio of ballOverlayBtns){
            radio.addEventListener("click", ()=>{
                if(radio.checked && radio['id']=='ball-stroke-overlay'){
                    this.isStrokeOverFill = true;
                }
                else{
                    this.isStrokeOverFill = false;
                }
                this.drawBall();
                console.log(this.isStrokeOverFill);
            });
        }
        
        const ballStrokeBtns = document.querySelectorAll('input[name="ball-stroke"]');
        for (let radio of ballStrokeBtns){
            radio.addEventListener("click", ()=>{
                if(radio.checked && radio['id']=='ball-stroke-normal-check'){
                    this.isGradientStroked = false;
                }
                else{
                    this.isGradientStroked = true;
                }
                this.drawBall();
                console.log(this.isGradientStroked);
            });
        }
        
        
        const ballFillBtns = document.querySelectorAll('input[name="ball-fill"]');
        for (let radio of ballFillBtns){
            radio.addEventListener("click", ()=>{
                if(radio.checked && radio['id']=='ball-fill-normal-check'){
                    this.isGradientFilled = false;
                }
                else{
                    this.isGradientFilled = true;
                }
                this.drawBall();
                console.log(this.isGradientFilled);
            });
        }
        
        const ballStrokeGradientStartInput = document.getElementById("ball-stroke-gradient-start");
        const ballStrokeGradientStartVal = document.getElementById("ball-stroke-gradient-start-value");


        ballStrokeGradientStartInput.onchange = () => {
            this.strokeGradientStart = ballStrokeGradientStartInput.value;
            ballStrokeGradientStartVal.innerText = this.strokeGradientStart;
            console.log(this.strokeGradientStart);
            this.drawBall();
        }
        
    
        const ballStrokeGradientEndInput = document.getElementById("ball-stroke-gradient-end");
        const ballStrokeGradientEndVal = document.getElementById("ball-stroke-gradient-end-value");

        ballStrokeGradientEndInput.onchange = () => {
            this.strokeGradientEnd = ballStrokeGradientEndInput.value;
            ballStrokeGradientEndVal.innerText = this.strokeGradientEnd;
            console.log(this.strokeGradientEnd);
            this.drawBall();
        }
        
        const ballFillGradientStartInput = document.getElementById("ball-fill-gradient-start");
        const ballFillGradientStartVal = document.getElementById("ball-fill-gradient-start-value");
        
        
        ballFillGradientStartInput.onchange = () => {
            this.fillGradientStart = ballFillGradientStartInput.value;
            ballFillGradientStartVal.innerText = this.fillGradientStart;
            console.log(this.fillGradientStart);
            this.drawBall();
        }

        const ballFillGradientEndInput = document.getElementById("ball-fill-gradient-end");
        const ballFillGradientEndVal = document.getElementById("ball-fill-gradient-end-value");
        
        ballFillGradientEndInput.onchange = () => {
            this.fillGradientEnd = ballFillGradientEndInput.value;
            ballFillGradientEndVal.innerText = this.fillGradientEnd;
            console.log(this.fillGradientEnd);
            this.drawBall();
        }



        const setBallSizeInput = document.getElementById("set-ball-size");
        const setBallSizeVal = document.getElementById("ball-size-value");


        setBallSizeInput.onchange = () => {
            this.radius = setBallSizeInput.value;
            setBallSizeVal.innerText = this.radius;
            console.log(this.fillGradientEnd);
            this.drawBall();
        }

    }

    drawBall(){
        this.ctx.save();
        this.ctx.fillStyle="black";
        this.ctx.fillRect(0,0,30,30);
        this.ball.fillColor = this.fillStyle;
        this.ball.strokeColor = this.strokeStyle;
        this.ball.shadowBlur = this.shadowBlur;
        this.ball.shadowColor =  this.shadowColor;
        this.ball.isFilled =  this.isFilled;
        this.ball.isStroked =  this.isStroked;
        this.ball.isShadowing =  this.isShadowing;
        this.ball.isStrokeOverFill =  this.isStrokeOverFill;
        this.ball.isGradientFilled =  this.isGradientFilled;
        this.ball.isGradientStroked =  this.isGradientStroked;
        this.ball.strokeGradientStart =  this.strokeGradientStart;
        this.ball.strokeGradientEnd =  this.strokeGradientEnd;
        this.ball.fillGradientStart =  this.fillGradientStart;
        this.ball.fillGradientEnd =  this.fillGradientEnd;
        this.ball.alpha =  this.alpha;
        this.ball.radius = this.radius;
        this.ball.draw(this.ctx);
        this.ctx.restore();
        this.strokeImg = this.ball.getStrokeURL(this.toDataURLCanvas);
        this.fullImg = this.ball.getFullURL(this.toDataURLCanvas);
    }

}