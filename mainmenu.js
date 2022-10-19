import StarContainer from "./StarContainer.js";

let audio = new Audio("./sound/BackSound.mp3");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = [
"#c542cb",
"#d0535e"];

// let linePos = 0,
// rAF;

canvas.width = 1510;
canvas.height = 870;

let starParams = {speed : 30, number : 200, extinction : 4};
let starContainer = new StarContainer(starParams,canvas.width,canvas.height);
starContainer.setupStars();

function backGround() {
    starContainer.updateStars(ctx);
}

function mainTexts(color) {
    ctx.save();
    ctx.font = "120px Orbitron";
    
    ctx.fillStyle = "white";
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    
    // console.log(ctx.measureText("BRICK BREAKER"));
    ctx.fillText("BRICK BREAKER", (canvas.width/2)-567, 275);
    
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    
    ctx.fillText("BRICK BREAKER", (canvas.width/2)-567+5, 275+5);
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.restore();
  }

  function choiceText(color){
    ctx.save();
    ctx.font = "50px Orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.fillStyle = "white";
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillText("START", 160, 755,275);
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    ctx.fillText("START", 160+5, 755+5);



    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    ctx.fillText("SETTING", 160+5+400, 755+5);

    ctx.fillStyle = "white";
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillText("SETTING", 160+400, 755);
    
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    ctx.fillText("HELP", 160+5+800, 755+5);


    ctx.fillStyle = "white";
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillText("HELP", 160+800, 755);

    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    ctx.fillText("DEVELOP", 160+5+1170, 755+5);


    ctx.fillStyle = "white";
    ctx.shadowBlur = 30;
    ctx.shadowColor = color;
    ctx.fillText("DEVELOP", 160+1170, 755);
    ctx.restore();
  }

  let index = 0;
  function main() {
    let color = (++index)%2;
 
    
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    backGround();
    mainTexts(colors[color]);
    choiceText(colors[color]);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "none";
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    setTimeout(main,17);
  }

  main();
  canvas.onclick = function(e) { // canvas 마우스 이벤트 찾기.
    audio.play();
    
    // if(e.x===110&&e.x===210)
  }