
class Button{
  constructor(text,x=0,y=0){
      this.x = x;
      this.y = y;
      this.status = "";
      this.text = text.toUpperCase();
      this.color = "white";
      this.padding = 5;
      this.isOnMouse = false;
    }
    onMouse(x,y,ctx) {
      ctx.font = "50px Orbitron";
      let textSize = ctx.measureText(this.text).width;
      // console.log(textSize);
      let maxX = textSize+this.x;
      let minX = this.x;
      let maxY = 50+this.y;
      let minY = this.y;

      if(x>=minX && x<=maxX && y>=minY && y<=maxY) {
        this.isOnMouse = true;
      }
      else 
        this.isOnMouse = false;
      
    }

    onClick(x,y,ctx) {
      ctx.font = "50px Orbitron";
      let textSize = ctx.measureText(this.text).width;
      let maxX = textSize+this.x;
      let minX = this.x;
      let maxY = 50+this.y;
      let minY = this.y;

      if(x>=minX && x<=maxX && y>=minY && y<=maxY) {
        this.padding = 0;
        this.status = this.text.toLowerCase();
        return this.status;
      }
    }

    draw(ctx){
      if(this.isOnMouse) {
        ctx.save();
        ctx.font ="50px Orbitron";
        ctx.textBaseline = "top";

        ctx.shadowBlur = 30;
        ctx.shadowColor = "#c542cb";
        ctx.fillStyle = "white";
        ctx.fillText(this.text,this.x,this.y);
        ctx.fillStyle = "#d0535e";
        ctx.shadowBlur = 30;
        ctx.shadowColor = "purple";
        ctx.fillText(this.text, this.x + this.padding, this.y + this.padding);
        ctx.restore();
      }
      else {
        ctx.save();
        ctx.font ="50px Orbitron";
        ctx.textBaseline = "top";

        
        ctx.fillStyle = "#d0535e";
        ctx.shadowBlur = 30;
        ctx.shadowColor = "purple";

        ctx.shadowBlur = 30;
        ctx.shadowColor = "#c542cb";
        ctx.fillText(this.text, this.x+ this.padding, this.y + this.padding);
        ctx.fillStyle = "white";
        ctx.fillText(this.text,this.x,this.y);
        ctx.restore();
      }
  }
}export default Button;