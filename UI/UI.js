// import Title from "./Title.js";
import BackGround from "./background/Background.js";
import Setting from "./Page/Setting.js";
import MainMenu from "./MainMenu.js";
import Developer from "./Page/Developer.js";
import Start from "./Page/Start.js";
import Help from "./Page/Help.js"

export default class UI {
  constructor() {
    
    this.start = new Start();
    this.mainMenu = new MainMenu();
    this.backGround = new BackGround();
    this.setting = new Setting();
    this.help = new Help();
    this.developer = new Developer();
    //this.audio = new Audio("./sound/BackSound.mp3");
    this.status = "opening";
    this.main = null;
    // this.game = null;
    // this.gameStart = null;
    
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
    this.start.onClick = () => {
      this.pause();
      this.start.gameRun();
    }
    this.setting.onMouse = () => {
      this.setting.mouseHandler();
    }
    this.backGround.canvas.onkeydown = (e) =>{
        this.start.baby.stage.player1.keydownHandler(e);
        this.start.easy.stage.player1.keydownHandler(e);
        this.start.normal.stage.player1.keydownHandler(e);
        this.start.hard.stage.player1.keydownHandler(e);
        this.start.hell.stage.player1.keydownHandler(e);
    }
    this.backGround.canvas.onkeyup = (e) =>{
        this.start.baby.stage.player1.keyupHandler(e);
        this.start.easy.stage.player1.keyupHandler(e);
        this.start.normal.stage.player1.keyupHandler(e);
        this.start.hard.stage.player1.keyupHandler(e);
        this.start.hell.stage.player1.keyupHandler(e);
    }
    
  }
  
  pause(){
    clearTimeout(this.main);
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
          this.backGround.downSpeed();
          this.mainMenu.fadeIn();
          this.mainMenu.draw();
        }break;
        case "start":
        {
          this.mainMenu.fadeOut();
          this.mainMenu.draw();
          this.backGround.resize();
          this.backGround.upSpeed();

          if(!this.backGround.onReSize) {
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
        }
      }
      this.run();
    },17);

    // this.game = setTimeout(() =>{
    // UI가 게임을 컨트롤할지 미정.
    // });

  }
}


