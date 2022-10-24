export default class Developer {
  constructor() {
    this.alpha = 0;
    this.canvas = document.querySelector("#ui");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1510;
    this.canvas.height = 870;


  }
  draw() {
    this.ctx.save();
    //보라색
    this.ctx.beginPath();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.font = "90pt Orbitron";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#49079E";
    this.ctx.fillText("Developer", this.canvas.width / 2 + 8, 190 + 8)
    this.ctx.closePath();

    //노랑색
    this.ctx.beginPath();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.font = "90pt Orbitron";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#FFFA1f"
    this.ctx.fillText("Developer", this.canvas.width / 2, 190)
    this.ctx.closePath();

    //초록색
    this.ctx.beginPath();
    this.ctx.font = "30pt Orbitron";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#EB5315";
    this.ctx.fillText("KIM KYUNG HWAN", this.canvas.width / 2+3, this.canvas.height / 2 + 140+3);
    this.ctx.fillText("HAN TAE HEE", this.canvas.width / 2+3, this.canvas.height / 2 + 190+3);
    this.ctx.fillText("LEE JUN HYUN", this.canvas.width / 2+3, this.canvas.height / 2 + 240+3);
    this.ctx.fillText("JEON JAE MIN", this.canvas.width / 2+3, this.canvas.height / 2 + 290+3);
    this.ctx.closePath();
    
    //핫핑크
    this.ctx.beginPath();
    this.ctx.font = "30pt Orbitron";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#30FFE0";
    this.ctx.fillText("KIM KYUNG HWAN", this.canvas.width / 2, this.canvas.height / 2 + 140);
    this.ctx.fillText("HAN TAE HEE", this.canvas.width / 2, this.canvas.height / 2 + 190);
    this.ctx.fillText("LEE JUN HYUN", this.canvas.width / 2, this.canvas.height / 2 + 240);
    this.ctx.fillText("JEON JAE MIN", this.canvas.width / 2, this.canvas.height / 2 + 290);
    this.ctx.closePath();
    this.ctx.restore();

      this.ctx.save();
      this.ctx.font = "50px Orbitron"
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("←",50,50);
      this.ctx.restore();
      
      
      
  }

  fadeIn(){
    
    if(this.alpha + 0.01 > 1){
      this.alpha = 1;
    }
    else{
     this.alpha +=0.01;
    }
  }

  fadeOut(){
        this.alpha =0;
  } 
}