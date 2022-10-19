import Start from "./Start.js"
import Setting from "./Setting.js"
import Help from "./Help.js"
import Developer from "./Developer.js"

export default class Buttons{
    constructor(){
      this.startBtn = new Start("start");
      this.settingBtn = new Setting("setting");
      this.helpBtn = new Help("help");
      this.developerBtn = new Developer("developer");

    }

    drawAll(){

      this.startBtn.draw();
      this.settingBtn.draw();
      this.helpBtn.draw();
      this.developerBtn.draw();

    }

    // onClick() {
    //   if(this.startBtn.isOnMouse)
    // }
  }