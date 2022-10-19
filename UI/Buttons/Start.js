export default class Start{
    constructor(id){
        this.id = id;
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.color = "white";
        this.text = this.id.toUpperCase();
        this.padding = 5;
        this.isOnMouse = false;

        this.canvas.onmouseenter = function(){
            // console.log("check");
            this.isOnMouse = true;
          }.bind(this);
  
          this.canvas.onmouseout = function() {
            this.isOnMouse =false;
          }.bind(this);
  
          this.canvas.onmousedown = function() {
            this.padding = 0;
          }.bind(this);
  
          this.canvas.onmouseup = function() {
            this.padding = 5;
          }.bind(this);
    }

    draw() {
        if(this.isOnMouse) {
            this.ctx.save();
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    
            this.ctx.font ="50px Orbitron";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center"
            
            
            this.ctx.shadowBlur = 30;
            this.ctx.shadowColor = "#c542cb";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.text,this.canvas.width/2,this.canvas.height/2);
            this.ctx.fillStyle = "#d0535e";
            this.ctx.shadowBlur = 30;
            this.ctx.shadowColor = "purple";
            this.ctx.fillText(this.text, this.canvas.width/2+ this.padding, this.canvas.height/2 + this.padding);
            this.ctx.restore();
          }
          else {
            this.ctx.save();
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.font ="50px Orbitron";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center"
            
            this.ctx.fillStyle = "#d0535e";
            this.ctx.shadowBlur = 30;
            this.ctx.shadowColor = "purple";
    
            this.ctx.shadowBlur = 30;
            this.ctx.shadowColor = "#c542cb";
            this.ctx.fillText(this.text, this.canvas.width/2+ this.padding, this.canvas.height/2 + this.padding);
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.text,this.canvas.width/2,this.canvas.height/2);
            this.ctx.restore();
          }
    }
}