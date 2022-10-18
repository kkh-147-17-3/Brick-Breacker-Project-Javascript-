import StarContainer from "./StarContainer.js";

export default class Background{
    constructor(CANVAS_WIDTH, CANVAS_HEIGHT){
        this.canvas = document.getElementById("background");
        this.ctx = this.canvas.getContext("2d");
        this.CANVAS_HEIGHT = this.canvas.width = CANVAS_WIDTH;
        this.CANVAS_WIDTH = this.canvas.height = CANVAS_HEIGHT;
        this.starsParams = {speed : 10, number : 200, extinction : 4};
        this.starContainer = new StarContainer(this.starsParams, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.starContainer.setupStars();
    }
    run(){
        this.starContainer.updateStars(this.ctx);
        setTimeout(this.run.bind(this), 17);
    }
}
// const canvas = document.getElementById("background");
// const ctx = canvas.getContext("2d");

// const CANVAS_WIDTH = canvas.width = 1920;
// const CANVAS_HEIGHT = canvas.height = 1200;

// let screen, starsElements, starsParams = { speed: 2, number: 1000, extinction: 4 };
// let starContainer = new StarContainer(starsParams, CANVAS_WIDTH, CANVAS_HEIGHT);
// ;

// window.onload = run;

// function run(){
    
// };

let background = new Background(1510,870);
background.run();