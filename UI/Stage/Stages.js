import Button from "../Buttons/Button.js";
import Hard from "./Hard.js";
import Baby from "./Baby.js";
import Easy from "./Easy.js";
import Hell from "./Hell.js";
import Normal from "./Normal.js";

export default class Stages extends Button{
    constructor(text,x=0,y=0) {
      super(text,x,y);
      switch(this.text) {
        case "BABY" :
          this.stage = new Baby();
          break
        case "EASY" :
          this.stage = new Easy();
          break;
        case "NORMAL" :
          this.stage = new Normal();
          break;
        case "HARD" :
          this.stage = new Hard();
          break;
        case "HELL" :
          this.stage = new Hell();
          break;
      };
    }

    run(ctx){
      this.stage.run();;
    };  
}