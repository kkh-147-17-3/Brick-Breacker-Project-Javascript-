import { GameObject } from "./GameObject.js";
import { Marble } from "./GameObject.js";
import { GameObjectLinkedList } from "./GameObjectList.js";
import { Node } from "./GameObjectList.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 1920;
const CANVAS_HEIGHT = canvas.height = 1080;

let marbleList = new GameObjectLinkedList();
let brickList = new GameObjectLinkedList();

let marbles = [];
for (let i=0; i< 10; i++){
    let launchPosition = {x : 200, y : 700};
    marbles[i] = new Marble(launchPosition, {radius : 10}, {dx : -5, dy : -5});
}

// 이차원 배열의 행을 2로 지정
const ROW = 5;
const COLUMN = 4;

let bricks = new Array(ROW);  // [empty x 2]

// 이차원 배열의 열을 2로 지정 
for (var i = 0; i < ROW; i++) {
    bricks[i] = new Array(COLUMN);
}
for (let i = 0; i <5; i++){
    for (let j = 0; j < 4; j++){
        let brickPosition = {x : 50 * i, y : 50 * j};
        bricks[i][j] = new GameObject(brickPosition, {width : 50, height : 50});
    }
}

console.log(bricks);

for (let i = 0; i < 5; i ++){
    for (let j = 0; j <4; j++){
        brickList.insertAt(bricks[i][j],0);
    }
}

let index = 0;
let count = 0;
function animate2(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.strokeRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    if (index < 10 && count % 10 == 0){
        marbleList.insertAt(marbles[index],0);
        index++;
    }

    for (let i = 0; i < brickList.size; i++){
        let brick = brickList.getAt(i).data;
        let xCordinate = brick.position.x;
        let yCordinate = brick.position.y;
        let width = brick.size.width;
        let height = brick.size.height;
        ctx.lineWidth = 4;
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.strokeRect(xCordinate,yCordinate,width,height);
    }



    for (let i = 0; i < marbleList.size; i++){
        let marble = marbleList.getAt(i).data;
        let xCordinate = marble.position.x;
        let yCordinate = marble.position.y;
        let dx = marble.speed.dx;
        let dy = marble.speed.dy;
        
        if (xCordinate + dx > CANVAS_WIDTH - 20 || xCordinate + dx < 0){
            if (xCordinate + dx > CANVAS_WIDTH - 20)
                marble.position.x = CANVAS_WIDTH - 20;
            else
                marble.position.x = 0;
            marble.speed.dx = -dx;
        }
        if (yCordinate + dy > CANVAS_HEIGHT - 20 || yCordinate + dy < 0){
            if (yCordinate + dy > CANVAS_HEIGHT - 20){
                marbleList.removeAt(i);
                continue;
            }
            else {
                marble.position.y = 0;
            }
                marble.speed.dy = -dy;
        }
        marble.updatePosition();
    }
    marbleList.drawListData(ctx);
    count++;
    // let position = Math.floor(gameFrame/staggerFrames) %10;
    // frameX = spriteWidth * position;
    
    // ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    // gameFrame++;
    requestAnimationFrame(animate2);
};
// animate2();

let screen, starsElements, starsParams = { speed: 2, number: 300, extinction: 4 };
setupStars();
updateStars();

function Star() {
    this.x = Math.random() * CANVAS_WIDTH;
    this.y = Math.random() * CANVAS_HEIGHT;
    this.z = Math.random() * CANVAS_WIDTH;

    this.move = function() {
        this.z -= starsParams.speed;
        if (this.z <= 0) {
            this.z = CANVAS_WIDTH;
        }
    }
    this.show = function() {
        let x, y, rad, opacity;
        x = (this.x - screen.c[0]) * (CANVAS_WIDTH / this.z);
        x = x + screen.c[0];
        y = (this.y - screen.c[1]) * (CANVAS_WIDTH / this.z);
        y = y + screen.c[1];
        rad = CANVAS_WIDTH / this.z;
        opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 190, " + opacity + ")";
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
    }
}

function setupStars() {
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
    };
    window.cancelAnimationFrame(updateStars);
    starsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();
    }
}

function updateStars() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    starsElements.forEach(function (s) {
        s.show();
        s.move();
    });
    window.requestAnimationFrame(updateStars);
}


let starSpeedDx = 4;
let starSpeedDy = 2;
let xStar = 100;
let yStar = 100;
function animateBackground(){
    ctx.setColor = "black";
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    drawStar(xStar,yStar,5,5,10);
    xStar+=starSpeedDx;
    yStar+=starSpeedDy;
    requestAnimationFrame(animateBackground);
}

function drawStar(cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    ctx.beginPath();
    ctx.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y)
      rot+=step
    }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='blue';
    ctx.stroke();
    ctx.fillStyle='skyblue';
    ctx.fill();
  }


// animateBackground();

