// import Title from "./Title.js";
import BackGround from "./background/Background.js";
import Setting from "./Page/Setting.js";
import MainMenu from "./MainMenu.js";
import Developer from "./Page/Developer.js";
import Start from "./Page/Start.js";
import Help from "./Page/Help.js"
import SoundContainer from "/sound/SoundContainer.js";
import Victory from "./Victory/VictoryEffect.js"
import Defeat from "./Defeat/DefeatEffect.js";
export default class UI {
  constructor() {
    
    this.start = new Start();
    // this.victory = new Victory("VICTORY");
    // this.defeat = new Defeat("DEFEAT");
    this.mainMenu = new MainMenu();
    this.backGround = BackGround;
    this.setting = new Setting();
    this.help = new Help();
    this.developer = new Developer();
    this.status = "opening";
    this.main = null;
    this.battleState = false;
    this.gameStart = false;
    SoundContainer.playBgm();
    
    this.mainMenu.onOpeningFinished = () => {
      this.status = "ready";
    }
    this.mainMenu.onClick = () => {
      this.status = this.mainMenu.status;
    }
    this.mainMenu.onMouse = () => {
      this.mainMenu.mouseHandler();
    }
    this.start.onMouse = () => {
      this.start.mouseHandler();
    }
    this.setting.onMouse = () => {
      this.setting.mouseHandler();
    }
    this.help.onMouse = () => {
      this.help.mouseHandler();
    }
    this.developer.onMouse = () => {
      this.developer.mouseHandler();
    }

    
    this.start.backOnClick = () => {
      this.status = "ready"
      this.start.canvas.width = 1510;
      this.start.canvas.height = 870;
    }
    this.setting.backOnClick = () => {
      this.status = "ready"
      this.setting.canvas.width = 1510;
      this.setting.canvas.height = 870;
    }
    this.developer.backOnClick = () => {
      this.status = "ready"
      this.developer.canvas.width = 1510;
      this.developer.canvas.height = 870;
    }
    this.help.backOnClick = () => {
      this.status = "ready"
      this.developer.canvas.width = 1510;
      this.developer.canvas.height = 870;
    }
    this.start.onClick = () => {
      this.gameStart = true;
          setTimeout(()=>{
            this.pause()},3000);
      
      this.start.gameRun();
    }
    this.start.win = (player) => {
      this.start.pause();
      this.victory = new Victory(player+"VICTORY");
      if(player != "")
        this.battleState= true;

      this.victory.onMouse = () => {
        this.victory.mouseHandler();
      }

      this.victory.backOnClick = () => {
        this.gameStart = false;
        this.status = "ready"
        if(this.battleState){
          this.start.battleCanvasOff();
        }
        else 
          this.start.gameCanvasOff();
          
        this.victory.canvas.width = 1510;
        this.victory.canvas.height = 870;
      }
      this.status = "victory";
      this.run();
    }
    this.start.lose = (player) => {
      this.start.pause();
      this.gameStart = false;
      this.defeat = new Defeat(player + "DEFEAT");
      this.defeat.onMouse = () => {
        this.defeat.mouseHandler();
      }
      
      this.defeat.backOnClick = () => {
        this.status = "ready"
        this.start.gameCanvasOff();
        this.defeat.canvas.width = 1510;
        this.defeat.canvas.height = 870;
      }
      this.status = "lose";
      this.run();
    }

    
  }
  
  pause(){
    clearTimeout(this.main);
    clearInterval(this.main);
    console.log("정지");
  }
  
  run() {
    this.main = setTimeout(()=>{

      this.backGround.run();
      switch(this.status){
        case "opening":
        {
          this.mainMenu.opening();
        }break;
        case "ready": 
        {

          this.mainMenu.fadeIn();
          //this.mainMenu.title.alpha = SoundContainer.getTitleEffectValue();
          this.mainMenu.draw();
          this.backGround.downSize();
          this.backGround.downSpeed();
          this.start.fadeOut();
          this.developer.fadeOut();
          this.setting.fadeOut();
        }break;
        case "start":
        {
          this.mainMenu.fadeOut();
          this.mainMenu.draw();
          this.backGround.upSize();
          if (!this.gameStart){
            this.backGround.upSpeed();
          }

          if(!this.backGround.onUpSize) {
            this.start.fadeIn();
            this.start.draw();
          }
        } break;
        case "setting" :
        {
          this.mainMenu.fadeOut();
          this.mainMenu.draw();
          this.setting.fadeIn();
          this.setting.draw();
        }break;
        case "help":
        {
          this.mainMenu.fadeOut();
          this.mainMenu.draw();
          this.help.fadeIn();
          this.help.draw();
        }break;
        case "developer":
        {
          this.mainMenu.fadeOut();
          this.mainMenu.draw();
          
          this.developer.fadeIn();
          this.developer.draw();
        }break;

        case "victory" :
        {
          this.victory.canvas.style.display = "";
          this.victory.fadeIn();
          this.victory.run();
        }break;
        case "lose" :
        {
          this.defeat.canvas.style.display = "";
          this.defeat.fadeIn();
          this.defeat.run();
        }break;
      }
      //console.log("main");
      this.run();
    },17);

  }
}


