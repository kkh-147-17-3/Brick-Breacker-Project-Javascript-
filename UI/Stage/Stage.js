import Hard from "./Hard.js";
import Baby from "./Baby.js";
import Easy from "./Easy.js";
import Hell from "./Hell.js";
import Normal from "./Normal.js";
import Background from "../background/Background.js";

export default class Stages{
    constructor(text) {
      this.backClick = "";
      this.stageNum = "";
      //this.difficult = new Baby();
      switch(text) {
        case "baby" :
          this.difficult = new Baby();
          break
        case "easy" :
          this.difficult = new Easy();
          break;
        case "normal" :
          this.difficult = new Normal();
          break;
        case "hard" :
          this.difficult = new Hard();
          break;
        case "hell" :
          this.difficult = new Hell();
          break;
      };
      this.difficult.onMouse = ()=>{
        this.difficult.mouseHeandler();
      }
      this.difficult.onClick = ()=>{
        this.backOnClick();
      }
      this.difficult.gameOnClick = () =>{
        this.stageNum = this.difficult.stage;
        this.gameOnClick();
      }
      this.difficult.win = (player) => {        
        this.win(player);
      }
      this.difficult.lose = (player) => {
        this.lose(player);
      }
      
    }
    gameCanvasOff() {
      this.difficult.gameCanvasOff();
    }
    run(){          
      this.difficult.run();
    };
    subStage(){
      this.difficult.fadeIn();
      this.difficult.draw();
      //console.log(this.difficult);
    }  
}