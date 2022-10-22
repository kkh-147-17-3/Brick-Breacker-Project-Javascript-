import Title from "./Title.js";
import Button from "./Buttons/Button.js";
import BackGround from "./background/Background.js";
import Developer from "./Buttons/Developer.js";
import Start from "./Buttons/Start.js";


class MainMenu {
  constructor() {
    
    this.status = "ready";
    this.title = new Title();
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
    this.title.draw();

    switch(this.status){
      case "ready": 
      {
        this.title.fadeIn();
        
        this.startBtn.draw();
        this.settingBtn.draw();
        this.developerBtn.draw();
        this.helpBtn.draw();
      }
      break;
      case "start":
      {
        this.title.fadeOut();
        // this.start.update();
        this.start.fadeIn();
        this.start.draw();
        this.backGround.upSpeed();
        // this.title.draw(color);
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

        }break;




    }
    
    
    
    
    setTimeout(this.display.bind(this),17);
  }
}

let show = new MainMenu();
show.display();
//show.audio.play();


