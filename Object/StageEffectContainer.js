import EffectContainer from "./EffectContainer.js";
import StageHitEffect from "./StageHitEffect.js";

export default class StageEffectContainer{
    constructor(stageHitEffectInfo){
        this.#stageHitEffects = new EffectContainer();
        this.#index = 0;
        this.#num = 15;
        for (let i = 0; i < this.#num; i ++){
            let effect = new StageHitEffect(0,0,null,stageHitEffectInfo);
            this.#stageHitEffects.add(effect);
        }
        this.stageHitEffectInfo = stageHitEffectInfo;
    }

    drawAll(ctx){
        this.#stageHitEffects.drawAll(ctx);
    }
    add(x,y,side){
        let effect = this.#stageHitEffects.get(this.#index);
        effect.reset(x,y,side);
        effect.isFinished = false;
        this.#index++;
        if (this.#index == this.#num){
            this.#index = 0;
        }
    }
    reset(){
        this.#index = 0;
        this.#stageHitEffects = new EffectContainer();
        for (let i = 0; i < this.#num; i ++){
            let effect = new StageHitEffect(0,0,null,this.stageHitEffectInfo);
            this.#stageHitEffects.add(effect);
        }
    }
    #stageHitEffects
    #index
    #num;
}