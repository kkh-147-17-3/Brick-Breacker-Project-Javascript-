// import Developer from "./Buttons/Developer.js";
// import Button from "./Buttons/Button"

import Button from "./Buttons/Button.js";
import Title from "./Title.js"
import SoundContainer from "/sound/SoundContainer.js";

    


export default class MainMenu {
    constructor() {
        this.canvas = document.querySelector("#ui");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1510;
        this.canvas.height = 870;
        this.alpha = 0;
        this.title = new Title();
        this.startBtn = new Button("start",50,700);
        this.settingBtn = new Button("setting",370,700);
        this.helpBtn = new Button("help",770,700);
        this.developerBtn = new Button("developer",1100,700);
        this.buttons = [this.startBtn,this.settingBtn,this.helpBtn,this.developerBtn];
        this.status = "opening";


        
        //오프닝 멤버 변수.
        this.index = 0;
        this.dashLen = 300;
        this.dashOffset = this.dashLen;
        this.speed = 50;
        this.text = "BRICK BREAKER";
        this.x = 0;
        this.i = 0;
        this.count = 0;
    }

    mouseHandler() {

        //마우스가 올라가면 버튼 색 변경.
        this.canvas.onmousemove = (e) => {
            this.startBtn.onMouse(e.x,e.y,this.ctx);
            this.helpBtn.onMouse(e.x,e.y,this.ctx);
            this.settingBtn.onMouse(e.x,e.y,this.ctx);
            this.developerBtn.onMouse(e.x,e.y,this.ctx);
        }
        //마우스가 눌렸을때 버튼 디자인 변경.
        this.canvas.onmousedown = (e) => {
            if(this.startBtn.onClick(e.x,e.y,this.ctx)){
                this.status = this.startBtn.status;
                this.onClick();
            };
            if(this.helpBtn.onClick(e.x,e.y,this.ctx)){
                this.status = this.helpBtn.status;
                this.onClick();
            };
            if(this.settingBtn.onClick(e.x,e.y,this.ctx)){
                this.status = this.settingBtn.status;
                this.onClick();
            };
            if(this.developerBtn.onClick(e.x,e.y,this.ctx)){
                this.status = this.developerBtn.status;
                this.onClick();
            }
        }
        this.canvas.onmouseup = () => {
            this.startBtn.onMouseUp();
            this.helpBtn.onMouseUp();
            this.settingBtn.onMouseUp();
            this.developerBtn.onMouseUp();
        }
    }


    //추가됨
    opening(){

        this.ctx.font = "120px Orbitron"; 
        this.ctx.lineWidth = 8; this.ctx.lineJoin = "round";
        let textLength = this.text.length;
        let colors = ["#c542cb","#d0535e"];

        this.ctx.fillStyle="rgb(0,0,0)";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        let colorIndex = (++this.index)%2;

        this.ctx.strokeStyle = colors[colorIndex];
        if (this.i < textLength){
            if(this.dashOffset > 0){
                this.ctx.save();
                this.ctx.setLineDash([this.dashLen - this.dashOffset, this.dashOffset - this.speed]); // create a long dash mask
                this.dashOffset -= this.speed;                                         // reduce dash length
                this.ctx.strokeText(this.text[this.i], this.x + (this.canvas.width/2)-567, 275);
                this.ctx.restore();                               // stroke letter
            }
            else{
                this.dashOffset = this.dashLen;     
                this.x += this.ctx.measureText(this.text[this.i]).width;
                this.i++// prep next char

            }
        }
        else{
            setTimeout(()=>this.onOpeningFinished(),1000);
        }
        this.ctx.setLineDash([]);
        this.ctx.strokeText(this.text.slice(0,this.i),(this.canvas.width/2)-567, 275);
    }


    draw() {
        this.ctx.save();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.globalAlpha = this.alpha;
        if (this.status == "opening"){
            this.title.alpha = SoundContainer.getTitleEffectValue();
        }
        else{
            this.title.alpha = this.alpha;
        }
        this.title.draw(this.ctx);
        // this.startBtn.draw(this.ctx);
        // this.settingBtn.draw(this.ctx);
        // this.helpBtn.draw(this.ctx);
        // this.developerBtn.draw(this.ctx);
        for(let button of this.buttons)
            button.draw(this.ctx);
        this.ctx.restore();
        if(this.ctx.globalAlpha == 1) {
            this.onMouse();
        }
      }

      fadeOut(){
        this.status = "fade-out";

        if(this.alpha - 0.08 < 0){
            this.alpha = 0;
        }
        else{
            this.alpha -=0.08;
        }

      }

      fadeIn(){
        this.status = "opening";
           if(this.alpha + 0.04 > 1){
            this.alpha = 1;
        }
        else{
            this.alpha +=0.04;
        }
      }

}