import StarContainer from "./StarContainer.js";

export default class BackGround {
    constructor(canvas,ctx) {
    this.canvas = document.querySelector("#background");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1510;
    this.canvas.height = 870;
    this.starParams = {speed : 1, number : 200, extinction : 4};
    this.starContainer = new StarContainer(this.starParams,this.canvas.width,this.canvas.height);
    this.starContainer.setupStars();
    }

    draw(){
        this.starContainer.updateStars(this.ctx);
    }

    upSpeed() {
        if(this.starParams.speed >= 70) {
            return
        }
        else 
            this.starParams.speed+=0.5;
    }

    downSpeed() {
        if(this.starParams.speed <= 1) {
            return
        }
        else 
            this.starParams.speed-=0.5;
    }
}