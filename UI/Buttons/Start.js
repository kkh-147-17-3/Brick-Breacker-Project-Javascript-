import Stages from "../Stage/Stages.js";

export default class Start{
    constructor() {
      let canvas = document.createElement("canvas");
      canvas.setAttribute("id", "start");
      document.getElementById("page").insertAdjacentElement("afterbegin",canvas);
      this.canvas = canvas
      this.canvas.width = 1510;
      this.canvas.height = 870;
      this.stage = new Stages(this.canvas);
      this.stages = []; 
      this.alpha =0;     
    }
    draw(){
      this.stage.ctx.globalAlpha = this.alpha;
      this.stage.draw();
    }

    fadeIn(){
      if(this.alpha + 0.01 > 1){
       this.alpha = 1;
      }
      else{
       this.alpha +=0.01;
      }
    }

}