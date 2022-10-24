import Slider from "../Buttons/Sound/Slider.js"
import Button from "../Buttons/Sound/Button.js"
import SoundText from "../Buttons/Sound/SoundText.js"

export default class Setting{
  constructor(){
    this.canvas = document.getElementById("ui");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1510;
    this.canvas.height = 870;
    this.alpha = 0;
    this.buttonBackground = new Button(500- 70,425 - 50);
    this.buttonEffect = new Button(500 - 70,625 - 50);
    this.sliderBackground = new Slider(570,425);
    this.sliderEffect = new Slider(570,625);
    this.soundTest = new SoundText(this.canvas);

    
    
  }

  mouseHandler() {
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
  }


  draw(){

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.globalAlpha = this.alpha;

    // 슬라이더 그리기
    this.sliderBackground.draw(this.ctx);
    this.sliderEffect.draw(this.ctx);
    this.soundTest.draw(this.ctx);
    
    // 음소거 버튼 그리기
    // this.ctx.strokeStyle="red";
    // this.ctx.strokeRect(200,200,this.img.width/10,this.img.height/10);
    this.buttonBackground.draw(this.ctx);
    this.buttonEffect.draw(this.ctx);
    if(this.ctx.globalAlpha == 1){
      this.onMouse();
    }

  }
  fadeOut(){
    if(this.alpha - 0.08 < 0){
        this.alpha = 0;
    }
    else{
        this.alpha -=0.08;
    }

  }

  fadeIn(){
    //   this.canvas.style.display = "";
       if(this.alpha + 0.04 > 1){
        this.alpha = 1;
    }
    else{
        this.alpha +=0.04;
    }
  }

  // run(){
  //   this.draw();
  //   setTimeout(this.run.bind(this),17);
  // }
}