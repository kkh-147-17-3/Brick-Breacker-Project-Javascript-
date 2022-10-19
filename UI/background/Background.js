import StarContainer from "./StarContainer.js";

export default class BackGround {
    constructor(canvas,ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.starParams = {speed : 30, number : 200, extinction : 4};
    this.starContainer = new StarContainer(this.starParams,this.canvas.width,this.canvas.height);
    this.starContainer.setupStars();
    }

    draw(){
        this.starContainer.updateStars(this.ctx);
    }
}