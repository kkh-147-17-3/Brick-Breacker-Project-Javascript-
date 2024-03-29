import SoundContainer from "../../../sound/SoundContainer.js";

export default class Button{

    
    constructor(x,y,type){
        this.x = x; // x == 500
        this.y = y; // y == 400
        this.img = new Image();
        this.img.src = "./UI/image/VolumeON.png";
        this.img.width = 569;
        this.img.height = 449;
        this.width = this.img.width/5;
        this.height = this.img.height/5;
        this.maxX = this.x + this.width; // 500 + 500
        this.maxY = this.y + this.height;// 400 + 30
        this.status = "On";
        this.type = type;
    }
  
    
    draw(ctx){
        //배경음
        ctx.drawImage(this.img,0,0,this.img.width,this.img.height,
            this.x,this.y,this.width,this.height);
        
        //효과음
        // ctx.drawImage(this.img,0,0,this.img.width,this.img.height,
        //     430,475,this.img.width/5,this.img.height/5);    
    }
  
  
    mousedownHandler(x,y){
        // x,y는 마우스가 찍힌 좌표 maxX는 찍힌 좌표 + 슬라이더의 폭
        if(x <=this.maxX && x >= this.x && y<=this.maxY && y>= this.y){
            // console.log("찍혔다.");
            // this.ball.x = x - this.x;
            // return true;
                if(this.status == "Off"){
                    this.img.src = "./UI/image/VolumeON.png";
                    this.status = "On";
                    // console.log("이미지가 찍혔다.");
                    if (this.type == "bgm"){
                        SoundContainer.resumeBgm();
                    }
                    else{
                        SoundContainer.isSfxMuted = false;
                        console.log(SoundContainer.isSfxMuted);
                    }
                }
                else{
                    this.img.src = "./UI/image/VolumeOff.png";
                    this.status = "Off";    
                    if (this.type == "bgm"){
                        SoundContainer.pauseBgm();
                    }
                    else{
                        SoundContainer.isSfxMuted = true;
                        console.log(SoundContainer.isSfxMuted);
                    }
                }
        }
        else{
            // console.log("안찍혔다.");
            // return false;
        }

    }
  }
  