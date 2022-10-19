import Title from "./Title.js";
import Buttons from "./Buttons/Buttons.js";
import BackGround from "./background/Background.js";

class MainMenu {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1510;
    this.canvas.height = 870;
    this.title = new Title(this.canvas,this.ctx);
    this.backGround = new BackGround(this.canvas,this.ctx);
    this.buttons = new Buttons();
    this.index =0;
  }


  display() {
    setTimeout(this.display.bind(this),17);

    let color = (++this.index)%2;
    this.backGround.draw();
    this.title.draw(color);
    this.buttons.drawAll();
  }
}

let show = new MainMenu();

show.display();


// let audio = new Audio("./sound/BackSound.mp3");

