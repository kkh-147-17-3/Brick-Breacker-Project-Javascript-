import Table from "./Table.js";
import Brick from "./BrickCustom.js";
import TriangleBrick from "./TriangleBrickCustom.js";
import ItemCustom from "./ItemCustom.js";


export default class BrickSettings{
    constructor(){
        this.table = new Table();
        this.table.create(13,10);

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
        this.creator = "Anonymous"; 
        this.stageName = "No Name"; 
        this.difficulty = "Normal";
        this.ballNumber = "20";
        this.isGradientStroked=false 
        this.strokeGradientStart='#000' 
        this.strokeGradientEnd = '#000';
        this.isGradientFilled=false 
        this.fillGradientStart='#000' 
        this.fillGradientEnd = '#000';

        this.strokeImg 
        this.fullImg 
        this.particleImg 
        this.selectedType 
        this.imgWithHealth;
        this.stageFileName = 'stage.txt';

        this.square = new Brick(0,0,5);
        this.triangle1 = new TriangleBrick(0,0,50,1,5);
        this.triangle2 = new TriangleBrick(0,0,50,2,5);
        this.triangle3 = new TriangleBrick(0,0,50,3,5);
        this.triangle4 = new TriangleBrick(0,0,50,4,5);
        this.ballUp = new ItemCustom(0,0,"UP");
        this.laser = new ItemCustom(0,0,"L");
        this.bomb = new ItemCustom(0,0,"B");

        this.bricks = [this.square, this.triangle1, this.triangle2, this.triangle3, this.triangle4,this.ballUp,this.laser,this.bomb];
        
        this.canvases = document.getElementsByClassName('brick-canvas');
        this.ctxes = [];
        this.toDataURLCanvases = document.getElementsByClassName('to-data-url-canvas');

        // html 태그를 id에서 class로 바꾸니 복잡해짐 (22.10.22)
        // 구조화 시도하다가 망했음 (22.10.22)
        // 공모양 바꾸는 부분도 별도의 id를 부여해야 할 듯 함 (코드 재사용 불가)
        for (let canvas of this.toDataURLCanvases){
            canvas.width = 50;
            canvas.height = 50;
        }

        for(let i = 0; i < 8; i++){
            let canvas = this.canvases[i];
            canvas.width = 50;
            canvas.height = 50;
            canvas.addEventListener("dragstart", (e) =>{
                switch(i){
                    case 0:
                        this.selectedType = "square";
                    break; 
                    case 1:
                        this.selectedType  = "triangle1";
                    break; 
                    case 2:
                        this.selectedType  = "triangle2";
                    break; 
                    case 3:
                        this.selectedType  = "triangle3";
                    break; 
                    case 4:
                        this.selectedType  = "triangle4";
                    break; 
                    case 5:
                        this.selectedType  = "ballUp";
                    break; 
                    case 6:
                        this.selectedType  = "laser";
                    break; 
                    case 7:
                        this.selectedType  = "bomb";
                    break;  
                }
                this.strokeImg = this.bricks[i].getStrokeURL(this.toDataURLCanvases[i]);
                this.fullImg = this.bricks[i].getFullURL(this.toDataURLCanvases[i]);
                if (i <5){
                    this.particleImg = this.bricks[i].getParticleURL(this.toDataURLCanvases[i]);
                    this.imgWithHealth = this.bricks[i].getImgWithHealthURL(this.toDataURLCanvases[i]);
                }
                else{
                    this.particleImg = null;
                    this.imgWithHealth = null;
                }
                console.log((i+1) + "번 째 캔버스 드래그중");
                console.log("테두리 이미지: " + this.strokeImg);
                console.log("전체 이미지: " + this.fullImg);
                console.log("입자 이미지: " + this.particleImg);
                console.log("전체 이미지: " + this.imgWithHealth);
                this.table.brick = {type: this.selectedType, health:this.health,
                                    strokeImg: this.strokeImg, fullImg: this.fullImg, 
                                    particleImg: this.particleImg, imgWithHealth:this.imgWithHealth}
            });
            this.ctxes.push(canvas.getContext("2d"));
        }
        this.drawAllShape();

        const strokeStyleInput = document.getElementById("stroke-style");
        const strokeStyleVal = document.getElementById("stroke-style-value");
        
        strokeStyleInput.onchange = () => {
            this.strokeStyle = strokeStyleInput.value;
            strokeStyleVal.innerText = this.strokeStyle;
            console.log(this.strokeStyle);
            this.drawAllShape();
        }
        
        const strokeCheckBox = document.getElementById("stroke-check");
        
        strokeCheckBox.onchange = () => {
            if(strokeCheckBox.checked == true){
                this.isStroked = true;
            }
            else{
                this.isStroked = false;
            }
            this.drawAllShape();
        }
        
        const fillStyleInput = document.getElementById("fill-style");
        const fillStyleVal = document.getElementById("fill-style-value");
        
        fillStyleInput.onchange = () => {
            this.fillStyle = fillStyleInput.value;
            fillStyleVal.innerText = this.fillStyle;
            console.log(this.fillStyle);
            this.drawAllShape();
        }

        const fillCheckBox = document.getElementById("fill-check");
        
        fillCheckBox.onchange = () => {
            if(fillCheckBox.checked == true){
                this.isFilled = true;
            }
            else{
                this.isFilled = false;
            }
            this.drawAllShape();
        }
        
        const shadowCheckBox = document.getElementById("shadow-check");
            
        shadowCheckBox.onchange = () => {
            if(shadowCheckBox.checked == true){
                this.isShadowing = true;
            }
            else{
                this.isShadowing = false;
            }
            this.drawAllShape();
        }
        
        const shadowColorInput = document.getElementById("shadow-color");
        const shadowColorVal = document.getElementById("shadow-color-value");
        
        
        shadowColorInput.onchange = () => {
            this.shadowColor = shadowColorInput.value;
            shadowColorVal.innerText = this.shadowColor;
            console.log(this.shadowColor);
            this.drawAllShape();
        }
        
        const setAlphaInput = document.getElementById("set-alpha");
        const setAlphaVal = document.getElementById("alpha-value")

        setAlphaInput.onchange = () => {
            this.alpha = setAlphaInput.value;
            setAlphaVal.innerText = this.alpha;
            console.log(this.alpha);
            this.drawAllShape();
        }

        const shadowBlurInput = document.getElementById("shadow-blur");
        const shadowBlurVal = document.getElementById("shadow-blur-value");
        
        shadowBlurInput.onchange = () => {
            this.shadowBlur = document.getElementById("shadow-blur").value;
            shadowBlurVal.innerText = this.shadowBlur;
            console.log(this.shadowBlur);
            this.drawAllShape();
        }
        
        const healthInput = document.getElementById("health");
        
        healthInput.onchange = () => {
            this.health = healthInput.value;
            console.log(this.health);
            this.drawAllShape();
        }

        
        const overlayBtns = document.querySelectorAll('input[name="overlay"]');
        for (let radio of overlayBtns){
            radio.addEventListener("click", ()=>{
                if(radio.checked && radio['id']=='stroke-overlay'){
                    this.isStrokeOverFill = true;
                }
                else{
                    this.isStrokeOverFill = false;
                }
                this.drawAllShape();
                console.log(this.isStrokeOverFill);
            });
        }

        const creatorInput = document.getElementById("creator");
        
        creatorInput.onchange=() => {
            this.creator = creatorInput.value;
            console.log(this.creator);
        }

        const ballNumberInput = document.getElementById("ball-number");

        ballNumberInput.onchange=() => {
            this.ballNumber = ballNumberInput.value;
            console.log(this.ballNumber);
        }
        
        const stageNameInput = document.getElementById("stage-name");
        
        stageNameInput.onchange=() => {
            this.stageName = stageNameInput.value;
            console.log(this.stageName);
        }
        
        const difficultyInput = document.getElementById("difficulty");

        difficultyInput.onchange=() => {
            this.difficulty = difficultyInput.value;
            console.log(this.difficulty);
        }
        
        let strokeBtns = document.querySelectorAll('input[name="stroke"]');
        for (let radio of strokeBtns){
            radio.addEventListener("click", ()=>{
                if(radio.checked && radio['id']=='stroke-normal-check'){
                    this.isGradientStroked = false;
                }
                else{
                    this.isGradientStroked = true;
                }
                this.drawAllShape();
                console.log(this.isGradientStroked);
            });
        }
        
        
        let fillBtns = document.querySelectorAll('input[name="fill"]');
        for (let radio of fillBtns){
            radio.addEventListener("click", ()=>{
                if(radio.checked && radio['id']=='fill-normal-check'){
                    this.isGradientFilled = false;
                }
                else{
                    this.isGradientFilled = true;
                }
                this.drawAllShape();
                console.log(this.isGradientFilled);
            });
        }
        
        const strokeGradientStartInput = document.getElementById("stroke-gradient-start");
        const strokeGradientStartVal = document.getElementById("stroke-gradient-start-value");
        
        strokeGradientStartInput.onchange = () => {
            this.strokeGradientStart = strokeGradientStartInput.value;
            strokeGradientStartVal.innerText = this.strokeGradientStart;
            console.log(this.strokeGradientStart);
            this.drawAllShape();
        }

        const strokeGradientEndInput = document.getElementById("stroke-gradient-end");
        const strokeGradientEndVal = document.getElementById("stroke-gradient-end-value");
        
        strokeGradientEndInput.onchange = () => {
            this.strokeGradientEnd = strokeGradientEndInput.value;
            strokeGradientEndVal.innerText = this.strokeGradientEnd;
            console.log(this.strokeGradientEnd);
            this.drawAllShape();
        }
        
        const fillGradientStartInput = document.getElementById("fill-gradient-start");
        const fillGradientStartVal = document.getElementById("fill-gradient-start-value");
        
        fillGradientStartInput.onchange = () => {
            this.fillGradientStart = fillGradientStartInput.value;
            fillGradientStartVal.innerText = this.fillGradientStart;
            console.log(this.fillGradientStart);
            this.drawAllShape();
        }

        const fillGradientEndInput = document.getElementById("fill-gradient-end");
        const fillGradientEndVal = document.getElementById("fill-gradient-end-value");
        
        
        fillGradientEndInput.onchange = () => {
            this.fillGradientEnd = fillGradientEndInput.value;
            fillGradientEndVal.innerText = this.fillGradientEnd;
            console.log(this.fillGradientEnd);
            this.drawAllShape();
        }
    }

     drawAllShape(){
        this.drawSquare();
        for (let type = 1; type <= 4; type++){
            this.drawTriangle(type);
        }
        this.drawItmes();
    }

    drawItmes(){
        for (let i = 5; i <= 7; i++){
            this.ctxes[i].save();
            this.ctxes[i].fillStyle="black";
            this.ctxes[i].fillRect(0,0,50,50);
            this.bricks[i].fillColor =  this.fillStyle;
            this.bricks[i].strokeColor =  this.strokeStyle;
            this.bricks[i].shadowBlur =  this.shadowBlur;
            this.bricks[i].shadowColor =  this.shadowColor;
            this.bricks[i].isFilled =  this.isFilled;
            this.bricks[i].isStroked =  this.isStroked;
            this.bricks[i].isShadowing =  this.isShadowing;
            this.bricks[i].isStrokeOverFill =  this.isStrokeOverFill;
            this.bricks[i].isGradientFilled =  this.isGradientFilled;
            this.bricks[i].isGradientStroked =  this.isGradientStroked;
            this.bricks[i].strokeGradientStart =  this.strokeGradientStart;
            this.bricks[i].strokeGradientEnd =  this.strokeGradientEnd;
            this.bricks[i].fillGradientStart =  this.fillGradientStart;
            this.bricks[i].fillGradientEnd =  this.fillGradientEnd;
            this.bricks[i].alpha =  this.alpha;
            this.bricks[i].health =  this.health;
            this.bricks[i].draw(this.ctxes[i]);
            this.ctxes[i].restore();
            let result = this.canvases[i].toDataURL();
            console.log(result);
        }
    }

    drawSquare(){
        this.ctxes[0].save();
        this.ctxes[0].fillStyle="black";
        this.ctxes[0].fillRect(0,0,50,50);
        this.bricks[0].fillColor = this.fillStyle;
        this.bricks[0].strokeColor = this.strokeStyle;
        this.bricks[0].shadowBlur = this.shadowBlur;
        this.bricks[0].shadowColor =  this.shadowColor;
        this.bricks[0].isFilled =  this.isFilled;
        this.bricks[0].isStroked =  this.isStroked;
        this.bricks[0].isShadowing =  this.isShadowing;
        this.bricks[0].isStrokeOverFill =  this.isStrokeOverFill;
        this.bricks[0].isGradientFilled =  this.isGradientFilled;
        this.bricks[0].isGradientStroked =  this.isGradientStroked;
        this.bricks[0].strokeGradientStart =  this.strokeGradientStart;
        this.bricks[0].strokeGradientEnd =  this.strokeGradientEnd;
        this.bricks[0].fillGradientStart =  this.fillGradientStart;
        this.bricks[0].fillGradientEnd =  this.fillGradientEnd;
        this.bricks[0].alpha =  this.alpha;
        this.bricks[0].health =  this.health;
        this.bricks[0].draw(this.ctxes[0]);
        this.ctxes[0].restore();
    }

    drawTriangle(type){
        this.ctxes[type].save();
        this.ctxes[type].fillStyle="black";
        this.ctxes[type].fillRect(0,0,50,50);
        this.bricks[type].fillColor =  this.fillStyle;
        this.bricks[type].strokeColor =  this.strokeStyle;
        this.bricks[type].shadowBlur =  this.shadowBlur;
        this.bricks[type].shadowColor =  this.shadowColor;
        this.bricks[type].isFilled =  this.isFilled;
        this.bricks[type].isStroked =  this.isStroked;
        this.bricks[type].isShadowing =  this.isShadowing;
        this.bricks[type].isStrokeOverFill =  this.isStrokeOverFill;
        this.bricks[type].isGradientFilled =  this.isGradientFilled;
        this.bricks[type].isGradientStroked =  this.isGradientStroked;
        this.bricks[type].strokeGradientStart =  this.strokeGradientStart;
        this.bricks[type].strokeGradientEnd =  this.strokeGradientEnd;
        this.bricks[type].fillGradientStart =  this.fillGradientStart;
        this.bricks[type].fillGradientEnd =  this.fillGradientEnd;
        this.bricks[type].alpha =  this.alpha;
        this.bricks[type].health =  this.health;
        this.bricks[type].draw(this.ctxes[type]);
        this.ctxes[type].restore();
        let result = this.canvases[type].toDataURL();
        console.log(result);
    }
}