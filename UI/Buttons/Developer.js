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
      // console.log("check");
  }
  fadeIn(){
    if(this.alpha + 0.01 > 1){
     this.alpha = 1;
    }
    else{
     this.alpha +=0.01;
    }
  }
}