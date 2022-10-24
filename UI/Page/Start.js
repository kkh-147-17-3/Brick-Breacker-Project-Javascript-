import Stages from "../Stage/Stages.js";

export default class Start{
    constructor() {
      this.canvas = document.querySelector("#ui");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = 1510;
      this.canvas.height = 870;
      this.stage = new Stages(this.canvas);
      this.stages = []; 
      this.alpha =0;    

      // 뒤로 가기 기능 추가.
      this.canvas.onclick = function(e) {
        let textSize = this.ctx.measureText("←").width;
        let maxX = textSize+50;
        let minX = 50;
        let maxY = 50+50;
        let minY = 50;
        
        if(e.x>=minX && e.x<=maxX && e.y>=minY && e.y<=maxY) {
          this.backBtnClick();
        }
      }.bind(this); 


    }
    draw(){
      this.stage.ctx.globalAlpha = this.alpha;
      this.stage.draw();

      this.ctx.font = "50px Orbitron"
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("←",50,50);
    }

    fadeIn(){
      if(this.alpha + 0.01 > 1){
       this.alpha = 1;
      }
      else{
       this.alpha +=0.01;
      }
    }
    // 뒤로 가기 버튼을 눌렀을 때 디스플레이 넌.
    fadeOut(){
      this.alpha =0;
    } 

}