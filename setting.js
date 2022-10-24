import Slider from "./slider.js"
import Button from "./button.js"
import SoundText from "./soundText.js"

export default class Setting{
  constructor(){
    this.canvas = document.getElementById("setting");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1510;
    this.canvas.height = 870;
    this.canvas.onmousedown = (e) => {
      let x = e.x;
      let y = e.y;
      
      this.sliderEffect.mousedownHandler(x,y);
      this.sliderBackground.mousedownHandler(x,y);
      this.buttonEffect.mousedownHandler(x,y);
      this.buttonBackground.mousedownHandler(x,y);
    }   
    this.canvas.onmousemove = (e) => {

      let x = e.x;
      let y = e.y;

      this.sliderEffect.mouseMoveHandler(x,y);
      this.sliderBackground.mouseMoveHandler(x,y);
      
    }
    this.canvas.onmouseup = () => {
      this.sliderEffect.mouseupHandler();
      this.sliderBackground.mouseupHandler();

    }
    this.buttonBackground = new Button(500- 70,425 - 50);
    this.buttonEffect = new Button(500 - 70,625 - 50);
    this.sliderBackground = new Slider(570,425);
    this.sliderEffect = new Slider(570,625);
    this.soundTest = new SoundText(this.canvas);
  }




  draw(){

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    // 슬라이더 그리기
    this.sliderBackground.draw(this.ctx);
    this.sliderEffect.draw(this.ctx);
    this.soundTest.draw(this.ctx);
    
    // 음소거 버튼 그리기
    // this.ctx.strokeStyle="red";
    // this.ctx.strokeRect(200,200,this.img.width/10,this.img.height/10);
    this.buttonBackground.draw(this.ctx);
    this.buttonEffect.draw(this.ctx);

  }

  run(){
    this.draw();
    setTimeout(this.run.bind(this),17);
  }
}