import Background from "../background/Background.js";
import Button from "../Buttons/Button.js";
import Battle from "../Stage/Battle.js";
import Stage from "../Stage/Stage.js";


export default class Start{
  constructor() {
    this.canvas = document.querySelector("#ui");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.background = Background;
    this.babyBtn = new Button("baby",70,490);
    this.easyBtn = new Button("easy",450,490);
    this.normalBtn = new Button("normal",800,490);
    this.hardBtn = new Button("hard",1230,490);
    this.hellBtn = new Button("hell",1650,490);
    this.battleBtn = new Button("battle",this.canvas.width/2,this.canvas.height/2+100)
    this.backBtn = new Button("←",50,50);
    this.buttons = [this.babyBtn,this.easyBtn,this.normalBtn,this.hardBtn,this.hellBtn,this.battleBtn,this.backBtn];
    this.status = "ready";
    this.battleState = false;
    this.game = null;
    this.alpha =0;   

    
  }
  pause() {
    clearTimeout(this.game);
    //clearInterval(this.game);
    console.log("hi");
  }
  setBattle () {
      this.battle = new Battle();
      this.background.canvas.onkeydown = (e) =>{
        this.battle.player1.keydownHandler(e);
        this.battle.player2.keydownHandler(e);
      }
    
      this.background.canvas.onkeyup = (e) =>{
        this.battle.player1.keyupHandler(e);
        this.battle.player2.keyupHandler(e);
      }
    
      this.battle.win = (player) => {
        this.win(player);
      }
  }

  setDifficult (){
    switch(this.status){
      case "baby" :
        this.stage = new Stage(this.status);
        break;
      case "easy" :
        this.stage = new Stage(this.status);
        break;
      case "normal" :
        this.stage = new Stage(this.status);
        break;
      case "hard" :
        this.stage = new Stage(this.status);
        break;
      case "hell" :
        this.stage = new Stage(this.status);
        break;        
    }
    this.stage.backOnClick = () => {
      this.status = "ready";
    }
    this.stage.gameOnClick = () => {
      this.onClick();
      this.status = this.stage.stageNum;
    }
    this.background.canvas.onkeydown = (e) =>{
      this.stage.difficult.player1.keydownHandler(e);
    }

    this.background.canvas.onkeyup = (e) =>{
      this.stage.difficult.player1.keyupHandler(e);
    }

    this.stage.win = (player) => {
      this.win(player);
    }
    this.stage.lose = (player) => {
      this.lose(player);
    }
  }
  gameCanvasOff() {
    this.stage.gameCanvasOff();
  }
  battleCanvasOff() {
    this.battle.gameCanvasOff();
  }
  mouseHandler() {
    //마우스가 올라가면 버튼 색 변경.
    this.canvas.onmousemove = (e) => {
        this.babyBtn.onMouse(e.x,e.y,this.ctx);
        this.easyBtn.onMouse(e.x,e.y,this.ctx);
        this.normalBtn.onMouse(e.x,e.y,this.ctx);
        this.hardBtn.onMouse(e.x,e.y,this.ctx);
        this.hellBtn.onMouse(e.x,e.y,this.ctx);
        this.battleBtn.onMouse(e.x,e.y,this.ctx);
        this.backBtn.onMouse(e.x,e.y,this.ctx);
    }
    //마우스가 눌렸을때 버튼 디자인 변경.
    this.canvas.onmousedown = (e) => {
        if(this.babyBtn.onClick(e.x,e.y,this.ctx)){
            this.status = this.babyBtn.status;
            this.setDifficult();
            // this.onClick();
        };
        if(this.easyBtn.onClick(e.x,e.y,this.ctx)){
            this.status = this.easyBtn.status;
            this.setDifficult();
            // this.onClick();
        };
        if(this.normalBtn.onClick(e.x,e.y,this.ctx)){
            this.status = this.normalBtn.status;
            this.setDifficult();
            // this.onClick();
        };
        if(this.hardBtn.onClick(e.x,e.y,this.ctx)){
            this.status = this.hardBtn.status;
            this.setDifficult();
            // this.onClick();
        }
        if(this.hellBtn.onClick(e.x,e.y,this.ctx)){
          this.status = this.hellBtn.status;
          this.setDifficult();
          // this.onClick();
        }
        if(this.battleBtn.onClick(e.x,e.y,this.ctx)){
          this.status = this.battleBtn.status;
          this.setBattle();
          this.onClick();
        }
        if(this.backBtn.onClick(e.x,e.y,this.ctx)){
          this.status = this.backBtn.status;
          this.backOnClick();
        }
    }
    this.canvas.onmouseup = () => {
      this.babyBtn.onMouseUp();
      this.easyBtn.onMouseUp();
      this.normalBtn.onMouseUp();
      this.hardBtn.onMouseUp();
      this.hellBtn.onMouseUp();
      this.battleBtn.onMouseUp();
    }
  }

  draw(){
    if(this.ctx.globalAlpha == 1) 
      this.onMouse();

    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    switch(this.status) {
      case "baby" :
        this.stage.subStage();
        break;
      case "easy" :
        this.stage.subStage();
        break;
      case "normal" :
        this.stage.subStage();
        break;
      case "hard" :
        this.stage.subStage();
        break;
      case "hell" :
        this.stage.subStage();
        break;
      default :
        for(let button of this.buttons)
          button.draw(this.ctx); 
    

    this.ctx.restore();
  }
  }


  gameRun(){
    this.game = setTimeout(()=>{
      this.gameRun();
      this.background.downSpeed();
      switch(this.status){
        case "stage1": 
        {
          this.canvas.style.display = "none";
          this.stage.run();
        }break;
        case "stage2":
        {
          this.canvas.style.display = "none";
          this.stage.run();
        } break;
        case "stage3" :
        {
          this.canvas.style.display = "none";
          this.stage.run();
        }break;
        case "battle" :
          this.canvas.style.display = "none";
          this.battle.run();      
      }
      // console.log("check");
    },17);
  }


  fadeIn(){
    if(this.alpha + 0.01 > 1){
     this.alpha = 1;
    }
    else{
      this.alpha +=0.01;
      this.canvas.width = 1920;
      this.canvas.height = 1080;
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

}