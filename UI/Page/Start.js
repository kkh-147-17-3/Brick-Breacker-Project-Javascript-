import Stages from "../Stage/Stages.js";

export default class Start{
  constructor() {
    this.canvas = document.querySelector("#ui");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.baby = new Stages("baby",70,490);
    this.easy = new Stages("easy",450,490);
    this.normal = new Stages("normal",800,490);
    this.hard = new Stages("hard",1230,490);
    this.hell = new Stages("hell",1650,490);
    this.status = "ready"; 
    this.alpha =0;   

    // 뒤로 가기 기능 추가.
    // this.canvas.onclick = function(e) {
    //   let textSize = this.ctx.measureText("←").width;
    //   let maxX = textSize+50;
    //   let minX = 50;
    //   let maxY = 50+50;
    //   let minY = 50;
      
    //   if(e.x>=minX && e.x<=maxX && e.y>=minY && e.y<=maxY) {
    //     this.backBtnClick();
    //   }
    // }.bind(this); 
  
  }

  mouseHandler() {
    //마우스가 올라가면 버튼 색 변경.
    this.canvas.onmousemove = (e) => {
        this.baby.onMouse(e.x,e.y,this.ctx);
        this.easy.onMouse(e.x,e.y,this.ctx);
        this.normal.onMouse(e.x,e.y,this.ctx);
        this.hard.onMouse(e.x,e.y,this.ctx);
        this.hell.onMouse(e.x,e.y,this.ctx);
    }
    //마우스가 눌렸을때 버튼 디자인 변경.
    this.canvas.onmousedown = (e) => {
        if(this.baby.onClick(e.x,e.y,this.ctx)){
            this.status = this.baby.status;
            this.onClick();
        };
        if(this.easy.onClick(e.x,e.y,this.ctx)){
            this.status = this.easy.status;
            this.onClick();
        };
        if(this.normal.onClick(e.x,e.y,this.ctx)){
            this.status = this.normal.status;
            this.onClick();
        };
        if(this.hard.onClick(e.x,e.y,this.ctx)){
            this.status = this.hard.status;
            this.onClick();
        }
        if(this.hell.onClick(e.x,e.y,this.ctx)){
          this.status = this.hell.status;
          this.onClick();
      }
    }
  }

  draw(){
    if(this.ctx.globalAlpha == 1) 
      this.onMouse();

    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

    this.baby.draw(this.ctx);
    this.easy.draw(this.ctx);
    this.normal.draw(this.ctx);
    this.hard.draw(this.ctx);
    this.hell.draw(this.ctx);
    this.ctx.restore();
  }
  gameRun(){
    let game = setTimeout(()=>{
      switch(this.status){
        case "baby": 
        {
          this.canvas.style.display = "none";
          this.baby.run();
        }break;
        case "easy":
        {
          this.canvas.style.display = "none";
          this.easy.run();
        } break;
        case "normal" :
        {
          this.canvas.style.display = "none";
          this.normal.run();
        }break;
        case "hard":
        {
          this.canvas.style.display = "none";
          this.hard.run();
        }break;
        case "hell":
        {
          this.canvas.style.display = "none";
          this.hell.run();
        }        
      }
      this.gameRun();
    });

  }

  fadeIn(){
    if(this.alpha + 0.01 > 1){
     this.alpha = 1;
    }
    else{
      this.canvas.width = 1920;
      this.canvas.heigh = 1080;
     this.alpha +=0.01;
    }
  }
  // 뒤로 가기 버튼을 눌렀을 때 디스플레이 넌.
  fadeOut(){
    this.alpha =0;
  } 

}