export default class EffectContainer{
    constructor(){
        // effects의 element는 ObjectEffect class임
        this.effects = [];
        this.index = 0;
    }

    add(effect){
        this.effects.push(effect);
    }
    
    drawAll(ctx){
        for (let effect of this.effects){
            if (!effect.isFinished){
                effect.draw(ctx);
            }
            if (effect.alpha < 0){
                effect.isFinished = true;
                // this.effects.splice(effect,1);
            }
        }
    }
    get(index){
        return this.effects[index];
    }
}