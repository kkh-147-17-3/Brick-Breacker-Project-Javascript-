// import Developer from "./Buttons/Developer.js";

export default class Title {
    constructor() {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "title");
        document.getElementById("ui").insertAdjacentElement("afterbegin",canvas);
        this.canvas = canvas;
        // this.canvas = document.querySelector("#title");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1510;
        this.canvas.height = 870;
        this.colors = ["#c542cb","#d0535e"];
        this.padding = 5;
        this.appearIndex = 25;
        this.alpha =0;
        this.index =0;
    }

    draw() {
        let colorIndex = (++this.index)%2;
        let textWidth = (this.canvas.width/2)-567;
        // console.log(test);
        this.ctx.save();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font = "120px Orbitron";
        this.ctx.globalAlpha = this.alpha;

        this.ctx.fillStyle = "white";
        this.ctx.shadowBlur = 30;
        this.ctx.shadowColor = this.colors[colorIndex];
        this.ctx.fillText("BRICK BREAKER", textWidth+this.padding, 275+this.padding);
        
        this.ctx.shadowBlur = 30;
        this.ctx.shadowColor = this.colors[colorIndex];
        this.ctx.fillStyle = this.colors[colorIndex];
        
        this.ctx.fillText("BRICK BREAKER", textWidth, 275);
        
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.restore();
      }

      fadeOut(){
        if(this.alpha - 0.08 < 0){
            this.canvas.style.display = "none";
        }
        else{
            this.alpha -=0.08;
        }

        //   if(this.appearIndex < 25){
        //     this.appearIndex++;
        //     this.alpha -=0.04;

        // }
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