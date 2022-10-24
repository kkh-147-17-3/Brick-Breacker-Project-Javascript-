// import Title from "./Title.js";
import BackGround from "./background/Background.js";
import Setting from "./Page/Setting.js";
import MainMenu from "./MainMenu.js";
import Developer from "./Page/Developer.js";
import Start from "./Page/Start.js";
class UI {
  constructor() {
    
    this.mainMenu = new MainMenu();
    this.backGround = new BackGround();
    //this.start = new Start();
    this.setting = new Setting();
    //this.help = new Help();
    this.developer = new Developer();
    this.audio = new Audio("./sound/BackSound.mp3");
    this.status = "opening";
    
    
    this.mainMenu.onOpeningFinished = () => {
      this.status = "ready";
    }
    this.mainMenu.onClick = () => {
      this.status = this.mainMenu.status;
    }
    this.mainMenu.onMouse = () => {
      this.mainMenu.mouseHandler();
    }
    this.setting.onMouse = () => {
      this.setting.mouseHandler();
    }
    
    
  }
  
  
  run() {

    this.backGround.draw();
    switch(this.status){
      case "opening":
      {
        this.mainMenu.opening();
      }break;
      case "ready": 
      {
        this.backGround.downSpeed();
        this.mainMenu.fadeIn();
        this.mainMenu.draw();
      }break;
      case "start":
      {
        this.mainMenu.fadeOut();
        this.backGround.upSpeed();
        this.start.draw();
      } break;
      case "setting" :
      {
        this.mainMenu.fadeOut();
        this.setting.on = this.status;
        this.setting.fadeIn();
        this.setting.draw();
      }break;
      case "help":
      {
        this.mainMenu.fadeOut();
        this.help.draw();
        this.help.run();
      }break;
      case "developer":
      {
        this.mainMenu.fadeOut();
        this.mainMenu.draw();
        
        this.developer.fadeIn();
        this.developer.draw();
      }
    }

    setTimeout(this.run.bind(this),17);
  }
}

let show = new UI();
show.run();
// show.audio.play();


