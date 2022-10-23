import Title from "./Title.js";
import Button from "./Buttons/Button.js";
import BackGround from "./background/Background.js";
import Developer from "./Buttons/Developer.js";
import Start from "./Buttons/Start.js";


class MainMenu {
  constructor() {
    
    this.status = "opening";
    this.title = new Title();
    this.title.onOpeningFinished = () => {
      this.status = "ready";
    }
    this.backGround = new BackGround();
    this.startBtn = new Button("start");
    this.start = new Start();
    this.settingBtn = new Button("setting");
    this.helpBtn = new Button("help");
    this.developerBtn = new Button("developer");
    this.developer = new Developer();
    this.startBtn.canvas.addEventListener("click",()=>{this.status = "start"});
    this.settingBtn.canvas.addEventListener("click",()=>{this.status = "setting"});
    this.helpBtn.canvas.addEventListener("click",()=>{this.status = "help"});
    this.developerBtn.canvas.addEventListener("click",()=>{this.status = "developer"});
    this.index =0;
    this.audio = new Audio("./sound/BackSound.mp3");
    
    // this.audio.autoplay = true;
    // this.audio.src = "./sound/BackSound.mp3";
    

  }
  
  
  display() {
    
    this.backGround.draw();
    
    switch(this.status){
      case "opening":
        {
          this.title.opening();
        }
        break;
        case "ready": 
        {
        this.title.draw();
        this.title.fadeIn();
          // 처음 화면을 뛰울때 모든 버튼 on.
        this.startBtn.on();
        this.settingBtn.on();
        this.developerBtn.on();
        this.helpBtn.on();

        this.startBtn.draw();
        this.settingBtn.draw();
        this.developerBtn.draw();
        this.helpBtn.draw();
      }
      break;
      case "start":
      {
        this.title.fadeOut();
        this.start.fadeIn();
        this.start.draw();
        this.backGround.upSpeed();
        // 다른 화면으로 넘어갈때 모든 버튼 off.
        this.startBtn.off();
        this.settingBtn.off();
        this.developerBtn.off();
        this.helpBtn.off();
        // 뒤로 가기 버튼을 눌렀을때 status 값을 바꾸며, 현재 캔버스는 페이드 아웃(페이드아웃 기능이 잘 안먹혀서 일단 캔버스를 끄는걸로함)
        this.start.backBtnClick = function() {
          this.start.fadeOut();
          this.status = "ready";
        }.bind(this);

      } break;
      case "setting" :
      {
        console.log("sett")
      }break;
      case "help":
      {
        console.log("he");
      }break;
      case "developer":
        {          
          this.title.fadeOut();
          this.developer.fadeIn();
          this.developer.draw();
          // 다른 화면으로 넘어갈때 모든 버튼 off.
          this.startBtn.off();
          this.settingBtn.off();
          this.developerBtn.off();
          this.helpBtn.off();
          // 뒤로 가기 버튼을 눌렀을때 status 값을 바꾸며, 현재 캔버스는 페이드 아웃(페이드아웃 기능이 잘 안먹혀서 일단 캔버스를 끄는걸로함)
          this.developer.backBtnClick = function() {
            this.developer.fadeOut();
            this.status = "ready";
          }.bind(this);
          
        }break;
        
        
        
        
      }
      
    
    
    
    setTimeout(this.display.bind(this),17);
  }
}

let show = new MainMenu();
show.display();
// show.audio.play();


