import SoundContainer from "../../../sound/SoundContainer.js";

export default class Slider {


    constructor(x, y,type,button) {
        this.minRange = 0;
        this.maxRange = 10;
        this.step = 1;
        this.x = x;
        this.y = y;
        this.ball = { x: 500, radius: 18, status: "stop" }
        this.width = 500;
        this.height = 5;
        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
        this.button = button; 
        this.type = type;
    }

    draw(ctx) {
        this.drawRect(ctx);
        if (this.button.status == "Off"){
            this.drawMute(ctx);
        }
        else{
            this.drawBall(ctx);
        }
    }

    drawRect(ctx) {
        //배경음
        // ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#49079E";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        // ctx.restore();

        //효과음
        // ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle = "#49079E";
        // ctx.fillRect(this.x, this.y+100, this.width, this.height);
        // ctx.closePath();
        // ctx.restore();
    }
    drawMute(ctx){
        ctx.beginPath();
        ctx.fillStyle = "#FFFA1F";
        ctx.arc(this.x, (this.height / 2 + this.y), this.ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    drawBall(ctx) {
        // ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#FFFA1F";
        ctx.arc(this.ball.x + this.x, (this.height / 2 + this.y), this.ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        // ctx.restore();

        // ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle = "#FFFA1F";
        // ctx.arc(this.ball.x + this.x, (this.height / 2 + this.y)+100, this.ball.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.restore();
    }

    mousedownHandler(x, y) {
        let ballMinX = this.x + this.ball.x - this.ball.radius;
        let ballMaxX = this.x + this.ball.x + this.ball.radius;

        let ballMinY = this.y + this.height / 2 - this.ball.radius;
        let ballMaxY = this.y + this.height / 2 + this.ball.radius;
        if (ballMinX <= x && ballMaxX >= x && ballMinY <= y && ballMaxY >= y) {
            this.ball.status = "moving";
            return;
        }
        if (x <= this.maxX && x >= this.x && y <= this.maxY && y >= this.y) {
            // console.log("찍혔다.");
            this.ball.x = x - this.x;
            if (this.type == "bgm" && this.button.status == "On"){
                SoundContainer.adjustBGMVolume(this.getVolume());
            }
            if (this.type == "sfx" && this.button.status == "On"){
                SoundContainer.adjustSFXVolume(this.getVolume());
                SoundContainer.playBallUp();
            }
            return;
        }

    }

    mouseMoveHandler(x, y) {
        if (x <= this.maxX && x >= this.x  && this.ball.status == "moving" && this.button.status == "On") {
            // console.log("움직인다.");
            this.ball.x = x - this.x;
            if (this.type == "bgm"){
                SoundContainer.adjustBGMVolume(this.getVolume());
            }
            else{
                SoundContainer.adjustSFXVolume(this.getVolume());
            }
        }
        else {
            // console.log("안움직인다.");
            // return false;
        }
    }

    mouseupHandler() {
        if(this.ball.status == "moving" && this.type == "sfx" && !SoundContainer.isSfxMuted){
            SoundContainer.playBallUp();
        }
        this.ball.status ="stop";
    }
    getVolume(){
        console.log(this.ball.x/5);
        return this.ball.x/5;
    }
}