export default class Title {
    constructor() {
        this.colors = ["#c542cb","#d0535e"];
        this.padding = 5;
        this.index = 0;
    }

    draw(ctx) {
        let colorIndex = (++this.index)%2;
        // let textWidth = ctx.measureText("BRICK BREAKER").width;
        // console.log(textWidth);
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "120px Orbitron";
        ctx.globalAlpha = this.alpha;

        ctx.fillStyle = "white";
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.colors[colorIndex];
        ctx.fillText("BRICK BREAKER", 775+this.padding, 155+this.padding);
        
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.colors[colorIndex];
        ctx.fillStyle = this.colors[colorIndex];
        
        ctx.fillText("BRICK BREAKER", 775, 155);
        
        ctx.restore();
    }
}