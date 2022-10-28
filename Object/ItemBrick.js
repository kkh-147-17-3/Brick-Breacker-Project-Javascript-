import Brick from "./Brick.js"

export default class ItemBrick extends Brick{
    constructor(x,y,health){
        super(x,y,health);
        if (this.helath == 5){
            this.health = 1;
        } 
    }
    getHit(damage){
        if(!this.isBroken){
            super.getHit(damage);
            this.activate();
        }
    }

    draw(ctx){
        this.drawBrick(ctx);
        this.drawHitEffect(ctx);
        this.drawShrinking(ctx);
    }
    // particle을 가지고 있지 않기때문에 재정의
    // 각 아이템 벽돌별로 활성화되는 기능은 세부 class에서 각자 구현
    activate(){};
}