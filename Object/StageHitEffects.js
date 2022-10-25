export default class StageHitEffects{
    constructor(){
        this.effects = [];
    }
    
    drawAll(ctx){
        for (let effect of this.effects){
            effect.draw(ctx);
            if (effect.index == 20){
                this.effects.splice(effect,1);
            }
        }
    }
}
