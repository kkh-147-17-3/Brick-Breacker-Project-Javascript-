import Button from "../Buttons/Button.js";

export default class Help {
    constructor() {
        this.canvas = document.querySelector("#ui");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1510;
        this.canvas.height = 870;
        this.alpha = 0;
        this.img1 = new Image();
        this.img1.src = "UI/image/image.png"
        this.img2 = new Image();
        this.img2.src = "UI/image/help2.png"
        this.img3 = new Image();
        this.img3.src = "UI/image/help1.png"
        this.img4 = new Image();
        this.img4.src = "UI/image/2pkey.png"
        this.img5 = new Image();
        this.img5.src = "UI/image/1p.png"
        this.img6 = new Image();
        this.img6.src = "UI/image/2p.png"

        this.backBtn = new Button("←", 50, 50);
    }
    mouseHandler() {
        this.canvas.onmousedown = (e) => {
            let x = e.x;
            let y = e.y;
            if (this.backBtn.onClick(x, y, this.ctx)) {
                this.backOnClick();
            }
        }
        this.canvas.onmousemove = (e) => {
            let x = e.x;
            let y = e.y;

            this.backBtn.onMouse(x, y, this.ctx);

        }
    }
    draw() {
        if (this.ctx.globalAlpha == 1)
            this.onMouse();
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.drawImage(this.img2, 140, 120, 300, 300); // DAS
        this.ctx.drawImage(this.img1, 500, 80); // STAGE
        this.ctx.drawImage(this.img3, 1050, 80); // ITEM
        this.ctx.drawImage(this.img4, 140, 470, 300, 300); // L';
        this.ctx.drawImage(this.img5, 40, 140); // 1P
        this.ctx.drawImage(this.img6, 40, 490); // 2P
        
        
        this.ctx.restore();
        this.backBtn.draw(this.ctx);

    }

    fadeOut() {
        if (this.alpha - 0.08 < 0) {
            this.alpha = 0;
        }
        else {
            this.alpha -= 0.08;
        }

    }

    fadeIn() {
        if (this.alpha + 0.04 > 1) {
            this.alpha = 1;
        }
        else {
            this.alpha += 0.04;
        }
    }

}