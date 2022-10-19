export default class Title {
    constructor(canvas,ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.colors = ["#c542cb","#d0535e"];
        this.padding = 5;
    }

    draw(index) {
        let textWidth = (this.canvas.width/2)-567;
        // console.log(test);
        this.ctx.save();
        this.ctx.font = "120px Orbitron";
        
        this.ctx.fillStyle = "white";
        this.ctx.shadowBlur = 30;
        this.ctx.shadowColor = this.colors[index];
        this.ctx.fillText("BRICK BREAKER", textWidth+this.padding, 275+this.padding);
        
        this.ctx.shadowBlur = 30;
        this.ctx.shadowColor = this.colors[index];
        this.ctx.fillStyle = this.colors[index];
        
        this.ctx.fillText("BRICK BREAKER", textWidth, 275);
        
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.restore();
      }

}