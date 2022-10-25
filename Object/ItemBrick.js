import Brick from "./Brick.js"

export default class ItemBrick extends Brick{
    constructor(x,y,health){
        super(x,y,health);
        if (this.helath == 5){
            this.health = 1;
        } 
    }
    draw(ctx){
        super.drawBrick(ctx);
        super.drawHitEffect(ctx);
        super.drawShrinking(ctx);
    }
    getHit(){
        this.health --;
        if(this.health <= 0){
            this.isBroken = true;
        }
        this.effectIndex = 0;
        let audios = this.hitEffects.audios;
        // audios.play();
        this.activate();
    }
    activate(){

    }
}