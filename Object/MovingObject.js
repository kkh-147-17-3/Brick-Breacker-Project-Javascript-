import GameObject from "./GameObject.js";

export default class MovingObject extends GameObject {
    #vx;
    #vy;
    constructor(x,y,vx=0,vy=0) {
        super(x,y);
        this.#vx = vx;
        this.#vy = vy;
    }

    move(){
        this.x += this.#vx;
        this.y += this.#vy;
    }

    get vx(){
        return this.#vx;
    }

    get vy(){
        return this.#vy;
    }

    set vx(vx){
        this.#vx = vx;
    }

    set vy(vy){
        this.#vy = vy;
    }
}