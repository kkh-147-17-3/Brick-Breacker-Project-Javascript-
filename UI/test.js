// class Stage {
//     constructor(canvas) {
//       this.canvas = canvas;
//       this.ctx = this.canvas.getContext("2d");
//       this.x = 50;
//       this.y = 50;
//       this.width = 50;
//       this.height = 50;
//     }

//     draw() {
//         // this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
//         this.ctx.fillStyle = "red"
//         this.ctx.fillRect(this.x,this.y,this.width,this.height);
//         this.ctx.fill();
//       }
  
//     update() {
//         this.test++;
//      }
// }



// class start {
//     constructor() {
//         this.canvas = document.getElementById("background");
//         this.canvas.width =1510;
//         this.canvas.height = 870;
//         this.stages = [];
//         this.stage = new Stage(this.canvas);
//         // this.padding = 5;   
//         for(let i =0; i<4; i++) {
//             let temp = [];
//             let xGap = 5;
//             let yGap = 5;
//             if(i>=1)
//                 yGap += 55;
//             for(let j=0; j<5; j++){
//                 if(i>=1){
//                     this.stages.y += yGap;
//                 }
//                 temp.push(this.stage);
//                 this.stage = new Stage(this.canvas);
//                 this.stage.x += xGap;
//                 xGap += 55;
//             }
            
//             this.stages[i] = temp;
//         }
//     }

//     draw(){
//         let ctx = this.canvas.getContext("2d");
//         ctx.font = "100px arial";
//         ctx.fillStyle = "red"
//         ctx.fillText("Baby",100,100);
//         ctx.fill();
        
//         console.log(ctx.measureText("Hell").width);        
        
//     }
// }

// let test = new start();

// test.draw();

