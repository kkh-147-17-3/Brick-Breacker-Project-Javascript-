import Player from "../../Player.js";
import Button from "../Buttons/Button.js";
import Stage1 from "./Hell/Stairs.js";
import Stage2 from "./Hell/ThingsWelove.js";
import Stage3 from "./Hell/XX.js";

export default class Hell {
    constructor(){
        this.canvas = document.querySelector("#ui");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.button1 = new Button("stage1", 500, 800);
        this.button2 = new Button("stage2", 800, 800);
        this.button3 = new Button("stage3", 1100, 800);
        this.backBtn = new Button("←",this.canvas.width-100, 50);
        this.buttons = [this.button1,this.button2,this.button3,this.backBtn];
        this.alpha = 0;
        this.stage = "";
    }
    mouseHeandler() {
        this.canvas.onmousemove = (e) => {
            this.button1.onMouse(e.x,e.y,this.ctx);
            this.button2.onMouse(e.x,e.y,this.ctx);
            this.button3.onMouse(e.x,e.y,this.ctx);
            this.backBtn.onMouse(e.x,e.y,this.ctx);
        }
        this.canvas.onmousedown = (e) => {
            if(this.button1.onClick(e.x,e.y,this.ctx)){
                this.stage = this.button1.status;
                this.stageSetting();
                this.gameOnClick();
            };
            if(this.button2.onClick(e.x,e.y,this.ctx)){
                this.stage = this.button2.status;
                this.stageSetting();
                this.gameOnClick();
            };
            if(this.button3.onClick(e.x,e.y,this.ctx)){
                this.stage = this.button3.status;
                this.stageSetting();
                this.gameOnClick();
            };
            if(this.backBtn.onClick(e.x,e.y,this.ctx)){
                this.onClick();
            };
        }
    }

    draw(){
        if(this.ctx.globalAlpha == 1) 
            this.onMouse();
        this.ctx.save();
        //모드이름
        //하늘색 그림자
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.font = "75pt Orbitron";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#94FFFE";
        this.ctx.fillText("HELLMODE", 320, 90);
        this.ctx.closePath();
        //주황색
        this.ctx.beginPath();
        this.ctx.font = "75pt Orbitron";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#FF7729";
        this.ctx.fillText("HELLMODE", 330, 100);
        this.ctx.closePath();

        //제작자이름
        //하늘색 그림자
        this.ctx.beginPath();
        this.ctx.font = "40pt Orbitron";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#94FFFE";
        this.ctx.fillText("Creator: JEON JAE MIN", this.canvas.width - 376, 325);
        this.ctx.closePath();
        //주황색
        this.ctx.beginPath();
        this.ctx.font = "40pt Orbitron";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#FF7729";
        this.ctx.fillText("Creator: JEON JAE MIN", this.canvas.width - 370, 330);
        this.ctx.closePath();


        //중간선
        this.ctx.strokeStyle = "#FFFA1f";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 360);
        this.ctx.lineTo(this.canvas.width, 360);
        this.ctx.stroke();
        this.ctx.closePath();

        //스테이지 사각형
        this.ctx.beginPath();
        this.ctx.roundRect(this.canvas.width / 3 - 150, this.canvas.height - 330, 260, 150, [20]);
        this.ctx.fillStyle = "#49079E";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.roundRect(this.canvas.width / 3 + 150, this.canvas.height - 330, 270, 150, [20]);
        this.ctx.fillStyle = "#49079E";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.roundRect(this.canvas.width / 3 + 450, this.canvas.height - 330, 270, 150, [20]);
        this.ctx.fillStyle = "#49079E";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.restore();
        // this.button1.draw();
        //this.button2.draw();
        //this.button3.draw();
        for(let button of this.buttons)
            button.draw(this.ctx);
    }
    fadeIn() {
        if(this.alpha + 0.01 > 1){
            this.alpha = 1;
           }
           else{
             this.alpha +=0.01;
           }
    }
    stageSetting() {
        switch(this.stage) {
            case "stage1" :
                this.player1 = new Player("kkh","player1",Stage1);
            break;
            case "stage2" :
                this.player1 = new Player("kkh","player1",Stage2);
            break;
            case "stage3" :
                this.player1 = new Player("kkh","player1",Stage3);
            break;
        }


        this.player1.keydownHandler = function(e) {
            switch(e.code) {
                case "KeyA" :
                    this.isPressingLeft = true;
                    console.log("check");
                    break;
                case "KeyD" :
                    this.isPressingRight = true;
                    break;
                case "KeyS" :
                    this.status = "launching";
                    break;
                case "Backquote":
                    this.quitTurn();
                break;
            }
        }
        this.player1.keyupHandler = function(e){
            switch(e.code) {
                case "KeyA" :
                    this.isPressingLeft = false;
                break;
                case "KeyD":
                    this.isPressingRight = false;
                break;
            }
        }
        this.player1.readyToContinue = () => {
            this.player1.status = "ready";
        }
        this.player1.win = () => {
            this.player1.fadeOut();
            this.win("");
        }
        this.player1.lose = () => {
            this.player1.fadeOut();
            this.lose("");
        }
    }

    run(){
        this.player1.fadeIn();
        this.player1.run();
    }
    gameCanvasOff() {
        this.player1.CANVAS.style.display = "none";
    }
}