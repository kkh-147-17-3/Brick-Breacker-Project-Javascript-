export default class Help {
    constructor() {
        this.canvas = document.querySelector("#ui");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1510;
        this.canvas.height = 870;
        this.alpha = 0;
    }
    draw(){
        this.ctx.globalAlpha = this.alpha;
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(300,300,300,300);
    }

    fadeOut(){
        if(this.alpha - 0.08 < 0){
            this.alpha = 0;
        }
        else{
            this.alpha -=0.08;
        }

      }

      fadeIn(){
           if(this.alpha + 0.04 > 1){
            this.alpha = 1;
        }
        else{
            this.alpha +=0.04;
        }
      }

}