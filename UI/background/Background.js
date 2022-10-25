import StarContainer from "./StarContainer.js";

export default class BackGround {
    constructor() {
    this.canvas = document.querySelector("#background");
    this.ctx = this.canvas.getContext("2d");
    
    this.canvas.width = 1510;
    this.canvas.height = 870;
    this.onReSize = false;
    this.speed = 3;
    this.starParams = {speed : 1, number : 200, extinction : 4};
    this.starContainer = new StarContainer(this.starParams,1920,1080);
    this.starContainer.setupStars();
    }

    run(){
        if(this.onReSize) {
            if(this.canvas.width>=1920){
                this.canvas.width = 1920;
            }
            else 
            this.canvas.width+=this.speed;
            
            if(this.canvas.height >=1080)
                this.canvas.height = 1080;
            else
            this.canvas.height+=this.speed;
            
        }
        this.starContainer.updateStars(this.ctx);
        
        // setTimeout(this.run.bind(this),17);
    }

    upSpeed() {
        if(this.starParams.speed >= 70) {
            // console.log("check");
            return
        }
        else 
            this.starParams.speed+=0.5;
    }

    downSpeed() {
        if(this.starParams.speed <= 1) {
            return
        }
        else 
            this.starParams.speed-=0.5;


    }
    resize() {
        if(this.canvas.width>=1920 && this.canvas.height >=1080)
            this.onReSize = false;

        
        else {
            this.onReSize = true;
            this.ctx.save();
            this.ctx.font ="100px Orbitron";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            
            this.ctx.fillStyle = "#d0535e";
            //this.ctx.shadowBlur = 30;
            //this.ctx.shadowColor = "purple";
    
            //this.ctx.shadowBlur = 30;
            //this.ctx.shadowColor = "#c542cb";
            this.ctx.fillText("Stage Setting...",this.canvas.width/2+ this.padding, 870/2 + this.padding);
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Stage Setting...",this.canvas.width/2,870/2);
            this.ctx.restore();
        }


    }
}