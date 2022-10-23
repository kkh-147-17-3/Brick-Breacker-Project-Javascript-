import Baby from "./Baby.js";
import Easy from "./Easy.js";
import Hard from "./Hard.js";
import Hell from "./Hell.js";
import Nomal from "./Nomal.js";

export default class Stages {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.baby =new Baby(60,100);
      this.easy =new Easy(580,100);
      this.nomal =new Nomal(1100,100);
      this.hard =new Hard(330,400);
      this.hell =new Hell(910,400);
      this.alpha =0;
      this.stages = [];
      this.canvas.onmousemove = this.mouseHandler.bind(this);



    }
    mouseHandler(e) {
      this.baby.update(e.x,e.y,this.ctx);
      this.easy.update(e.x,e.y,this.ctx);
      this.nomal.update(e.x,e.y,this.ctx);
      this.hard.update(e.x,e.y,this.ctx);
      this.hell.update(e.x,e.y,this.ctx);
    }


    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.baby.draw(this.ctx);
        this.easy.draw(this.ctx);
        this.nomal.draw(this.ctx);
        this.hard.draw(this.ctx);
        this.hell.draw(this.ctx);
      }


  
}