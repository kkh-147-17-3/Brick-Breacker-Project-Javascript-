export default class GameObject {
    constructor(pos= {x : 0, y : 0}, size={width : 100, height : 100}, color="white") {
        this.pos = pos;
        this.size = size;
        this.color = color
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        ctx.stroke();
        ctx.closePath();
    }
}