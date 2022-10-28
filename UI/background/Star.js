export default class Star {
    constructor(canvasWidth, canvasHeight, screen, starParams){
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.z = Math.random() * canvasWidth;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.screen = screen;
        this.starParams = starParams;
    }
    move() {
        this.z -= this.starParams.speed;
        if (this.z <= 0) {
            this.z = this.canvasWidth;
        }
    }
    show(ctx) {
        let x, y, rad, opacity;
        x = (this.x - this.screen.c[0]) * (this.canvasWidth / this.z);
        x = x + this.screen.c[0];
        y = (this.y - this.screen.c[1]) * (this.canvasWidth / this.z);
        y = y + this.screen.c[1];
        rad = this.canvasWidth / this.z;
        opacity = (rad > this.starParams.extinction) ? 1.5 * (2 - rad / this.starParams.extinction) : 1;


        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 190, " + opacity + ")";
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
    }
}