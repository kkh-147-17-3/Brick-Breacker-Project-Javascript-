import GameObject from "./GameObject.js";

export default class Moveable extends GameObject {
    constructor(pos, size, color, speed = { vx: 3, vy: 3 }) {
        super(pos, size, color);
        this.speed = speed;
    }
    update(){
        this.pos.x += this.speed.vx;
        this.pos.y += this.speed.vy;
    }
}