import StarContainer from "./StarContainer.js";

class BackGround {
    constructor() {
    this.canvas = document.querySelector("#background");
    this.ctx = this.canvas.getContext("2d");
    
    this.canvas.width = 1510;
    this.canvas.height = 870;
    this.onUpSize = false;
    this.onDownSize = false;
    this.speed = 3;
    this.padding = 10;
    this.starParams = {speed : 1, number : 200, extinction : 4};
    this.starContainer = new StarContainer(this.starParams,1920,1080);
    this.starContainer.setupStars();
    this.count = 0;
    this.punc = "";
    }

    run(){
        if(this.onUpSize) {
            if(this.canvas.width>=1920)
                this.canvas.width = 1920;
            
            else 
                this.canvas.width+=this.speed;
                
            
            if(this.canvas.height >=1080)
                this.canvas.height = 1080;
            else 
                this.canvas.height+=this.speed;
            
        }

        if(this.onDownSize) {
            if(this.canvas.width<=1510)
                this.canvas.width = 1510;
            
            else 
                this.canvas.width-=this.speed;
                
            if(this.canvas.height <=870)
                this.canvas.height = 870;
            else
            this.canvas.height-=this.speed;
            
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
            console.log(this.starParams.speed);


    }
    upSize() {
        if(this.canvas.width>=1920 && this.canvas.height >=1080){
            this.count = 0;
            this.onUpSize = false;
        }

        
        else {
            this.onUpSize = true;
            this.onDownSize = false;
            this.ctx.save();
            this.ctx.font ="120px Orbitron";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "left";
            
            this.count ++;
            if (this.count % 15 == 0){
                this.punc += ".";
            }
            
            if (this.punc == "......"){
                this.punc = "";
                this.count = 0;
            }
            
            this.ctx.strokeStyle = "#36DCFF";
            this.ctx.strokeWeight = 10;
            this.ctx.strokeText("Stage Setting" + this.punc,this.canvas.width/2 - 500 + this.padding, 870/2 + this.padding);
            this.ctx.fillStyle = "#D0535E";
            this.ctx.fillText("Stage Setting" + this.punc ,this.canvas.width/2 - 500,870/2);
            this.ctx.restore();
        }
    }
    downSize() {
        if(this.canvas.width>1510 || this.canvas.height > 870){
            this.onDownSize = true;
            
        }

        
        else {
            this.onDownSize =false;
            
        }
    }
}export default new BackGround();