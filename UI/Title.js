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

        this.dashLen = 300;
        this.dashOffset = this.dashLen;
        this.speed = 50;
        this.text = "BRICK BREAKER";
        this.x = 0;
        this.i = 0;
        this.count = 0;
    }

    //추가됨
    opening(){

        this.ctx.font = "120px Orbitron"; 
        this.ctx.lineWidth = 8; this.ctx.lineJoin = "round";
        let textLength = this.text.length;
        
        this.ctx.fillStyle="rgb(0,0,0)";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        let colorIndex = (++this.index)%2;
        // this.ctx.shadowBlur = 5;
        // this.ctx.shadowColor = 'white';
        // this.ctx.shadowOffsetX = 5;
        // this.ctx.shadowOffsetY = 5;
        this.ctx.strokeStyle = this.colors[colorIndex];
        if (this.i < textLength){
            if(this.dashOffset > 0){
                this.ctx.save();
                this.ctx.setLineDash([this.dashLen - this.dashOffset, this.dashOffset - this.speed]); // create a long dash mask
                this.dashOffset -= this.speed;                                         // reduce dash length
                this.ctx.strokeText(this.text[this.i], this.x + (this.canvas.width/2)-567, 275);
                this.ctx.restore();                               // stroke letter
            }
            else{
                this.dashOffset = this.dashLen;     
                this.x += this.ctx.measureText(this.text[this.i]).width;
                this.i++// prep next char
                // if (i < txt.length) requestAnimationFrame(loop);
                // else animate();
            }
        }
        else{
            setTimeout(()=>this.onOpeningFinished(),1000);
        }
        this.ctx.setLineDash([]);
        this.ctx.strokeText(this.text.slice(0,this.i),(this.canvas.width/2)-567, 275);
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

      }

      fadeIn(){
          this.canvas.style.display = "";
           if(this.alpha + 0.04 > 1){
            this.alpha = 1;
        }
        else{
            this.alpha +=0.04;
        }
      }

}