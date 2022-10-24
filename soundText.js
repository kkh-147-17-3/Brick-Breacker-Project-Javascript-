export default class SoundText {

    constructor(canvas) {
        // let canvas = document.getElementById("canvas");
        // ctx =   canvas.getContext("2d");
        this.canvas = canvas;
        this.canvas.width = 1510;
        this.canvas.height = 870;

    }

    draw(ctx) {

        ctx.save();
        //보라색
        ctx.beginPath();
        ctx.font = "90pt Orbitron";
        ctx.textAlign = "center";
        ctx.fillStyle = "#49079E";
        ctx.fillText("Setting", this.canvas.width / 2 + 8, 190 + 8)
        ctx.closePath();

        //노랑색

        ctx.beginPath();
        ctx.font = "90pt Orbitron";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFA1F"
        ctx.fillText("Setting", this.canvas.width / 2, 190)
        ctx.closePath();

        //보라색
        ctx.beginPath();
        ctx.font = "60pt Orbitron";
        ctx.textAlign = "center";
        ctx.fillStyle = "#49079E";
        ctx.fillText("BGM:", this.canvas.width / 5+5, this.canvas.height / 2+12+5)
        ctx.closePath();

        //노랑색
        ctx.beginPath();
        ctx.font = "60pt Orbitron";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFA1F"
        ctx.fillText("BGM:", this.canvas.width / 5, this.canvas.height / 2+12)
        ctx.closePath();

        //보라색
        ctx.beginPath();
        ctx.font = "60pt Orbitron";
        ctx.textAlign = "center";
        ctx.fillStyle = "#49079E";
        ctx.fillText("SFX:", this.canvas.width / 5+5, this.canvas.height / 2+215+5)
        ctx.closePath();
        ctx.restore();

        //노랑색
        ctx.beginPath();
        ctx.font = "60pt Orbitron";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFA1F"
        ctx.fillText("SFX:", this.canvas.width / 5, this.canvas.height / 2+215)
        ctx.closePath();
    }













}