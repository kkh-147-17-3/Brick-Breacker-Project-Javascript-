import Star from "./Star.js";

export default class StarContainer{
  constructor(starParams, canvasWidth, canvasHeight){
    this.starElements = [];
    this.starParams = starParams;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.screen = {
      w: window.innerWidth,
      h: window.innerHeight,
      c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
    };
  }
  setupStars() {
    // window.cancelAnimationFrame(this.updateStars(ctx));
    for (let i = 0; i < this.starParams.number; i++) {
        this.starElements[i] = new Star(this.canvasWidth, this.canvasHeight, this.screen, this.starParams);
    }
  }

  updateStars(ctx) {
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.starElements.forEach((s) => {
        s.show(ctx);
        s.move();
    });
  }
}