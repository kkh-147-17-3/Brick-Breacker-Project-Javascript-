export default class Developer {
  constructor() {
      let canvas = document.createElement("canvas");
      canvas.setAttribute("id", "develop");
      document.getElementById("page").insertAdjacentElement("afterbegin",canvas);
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = 1510;
      this.canvas.height = 870;
      this.alpha =0;
      this.canvas.style.display = "none";

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
  draw() {
      //this.ctx.fillRect(100,100,100,100);
     this.ctx.save();
      this.ctx.beginPath();
      this.ctx.globalAlpha = this.alpha;
      this.ctx.font = "90pt Orbitron";
      this.ctx.textAlign = "center";
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeText("Developer", this.canvas.width / 2, 200)
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.font = "30pt Orbitron";
      this.ctx.textAlign = "center";
      this.ctx.strokeStyle = "pink";
      this.ctx.strokeText("PARK JUN YOUNG", this.canvas.width / 2, this.canvas.height / 2 + 100);
      this.ctx.strokeText("KIM KYUNG HWAN", this.canvas.width / 2, this.canvas.height / 2 + 150);
      this.ctx.strokeText("HAN TAE HEE", this.canvas.width / 2, this.canvas.height / 2 + 200);
      this.ctx.strokeText("LEE JUN HYUN", this.canvas.width / 2, this.canvas.height / 2 + 250);
      this.ctx.strokeText("JEON JAE MIN", this.canvas.width / 2, this.canvas.height / 2 + 300);
      this.ctx.closePath();
     this.ctx.restore();

      //this.ctx.save();
      this.ctx.font = "50px Orbitron"
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("←",50,50);
      //this.ctx.restore();
      
      
      
  }

  fadeIn(){
    
    if(this.alpha + 0.01 > 1){
      this.alpha = 1;
    }
    else{
     this.canvas.style.display = "";
     this.alpha +=0.01;
    }
  }

  fadeOut(){
        this.canvas.style.display = "none";
        this.alpha =0;
  } 
}