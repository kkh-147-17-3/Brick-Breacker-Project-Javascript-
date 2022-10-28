import Button from "../Buttons/Button.js";
import ParticleContainer from "./ParticleContainer.js";

export default class VictoryEffect{

    constructor(str){
        this.canvas = document.querySelector("#ui");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.particles1 = new ParticleContainer(1200,450); 
        this.particles2 = new ParticleContainer(700,450);
        this.button = new Button("MainPage",800,800); 
        this.particles1.load(50,"right");
        this.particles2.load(50,"left");
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height/2;
        this.angle = Math.PI * 0.8; // radians
        this.radius = 200;
        this.str = str;
        this.alpha = 0;
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

        this.ctx.fillStyle = "rgb(0,0,0)";
        //this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.font = "78pt Lemon";
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

        this.ctx.save();
        this.particles1.drawAll(this.ctx);
        this.particles1.moveAll(this.ctx);
        this.particles2.drawAll(this.ctx);
        this.particles2.moveAll(this.ctx);
        this.ctx.restore();
        this.ctx.save();
        if(this.globalAlpha == 1)
            this.onMouse();
        this.globalAlpha = this.alpha;
        this.button.draw(this.ctx);
        this.ctx.restore();
        // setTimeout(()=>{
        //     this.run()
        // },17);
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

// let effect = new VictoryEffect("VICTORY");
// effect.run();

