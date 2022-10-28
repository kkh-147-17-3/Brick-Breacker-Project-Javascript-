import Button from "../Buttons/Button.js";
import ParticleRContainer from "./ParticleRContainer.js"

export default class DefeatEffect{
    constructor(str){
        this.canvas = document.querySelector("#ui");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.ctx = this.canvas.getContext("2d");
        this.alpha =0;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height/2;
        this.button = new Button("MainPage", 800,700);
        this.angle = Math.PI * 0.7; // radians
        this.radius = 200;
        this.str = str;
        this.ctx = this.canvas.getContext("2d");
        this.particles = new ParticleRContainer(); 
        this.particles.load(50);
        this.str = str;
    }

    mouseHandler() {
        this.canvas.onmousedown = (e) => {
          let x = e.x;
          let y = e.y;     
          if(this.button.onClick(x,y,this.ctx)){
            this.backOnClick();
          }
        }   
        this.canvas.onmousemove = (e) => {
          let x = e.x;
          let y = e.y;
    
          this.button.onMouse(x,y,this.ctx);
          
        }
        
      }
    run(){
        if(this.ctx.globalAlpha == 1) 
            this.onMouse();

        this.ctx.save();
        this.ctx.fillStyle = "rgba(0,0,0,0.3)";
        //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        //this.ctx.fillRect(0,0,1920,1080);
        this.particles.drawAll(this.ctx);
        this.particles.moveAll(this.ctx);
        this.particles.checkAll();
        this.particles.burst(this.ctx);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.button.draw(this.ctx);
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.font = "80pt Lemon";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#FFFA1f";
        this.ctx.rotate(-1 * this.angle / 2);
        this.ctx.rotate(-1 * (this.angle / this.str.length) / 2);
        for (let n = 0; n < this.str.length; n++) {
            this.ctx.rotate(this.angle / this.str.length);
            this.ctx.save();
            this.ctx.translate(0, -1 * this.radius);
            let char = this.str[n];
            this.ctx.fillText(char, 0, 0);
            this.ctx.fillStyle = "#49079E"
            this.ctx.fillText(char, 4, 4);
            this.ctx.restore();
        }

        
        this.ctx.restore();
        // setTimeout(this.run.bind(this),17);
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