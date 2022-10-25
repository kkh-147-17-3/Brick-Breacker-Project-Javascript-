import Player from './Player.js'
import Background from './UI/Background/Background.js'
// import UI from './UI/UI.js';
import UI from "./UI/UI.js"

window.onload = function(){
    let game = new UI();
    game.run();
    // const player1 = new Player("kkh","player1");
    // player1.keydownHandler = function(e) {
    //     switch(e.code) {
    //         case "KeyA" :
    //             this.isPressingLeft = true;
    //             break;
    //         case "KeyD" :
    //             this.isPressingRight = true;
    //             break;
    //         case "KeyS" :
    //             this.status = "launching";
    //             break;
    //         case "Backquote":
    //             this.ballContainer.retriveAll();
    //             this.paddle.stopLaunching();
    //         break;
    //     }
    // }

    // player1.keyupHandler = function(e){
    //     switch(e.code) {
    //         case "KeyA" :
    //             player1.isPressingLeft = false;
    //         break;
    //         case "KeyD":
    //             player1.isPressingRight = false;
    //         break;
    //     }
    // }
    
    // const player2 = new Player("kkh","player2");

    // player2.keyupHandler = function(e){
    //     switch(e.code) {
    //         case "KeyL" :
    //             player2.isPressingLeft = false;
    //         break;
    //         case "Quote":
    //             player2.isPressingRight = false;
    //         break;
    //     }
    // }
    
    // player2.keydownHandler = function(e) {
    //     switch(e.code){
    //         case "KeyL" :
    //             this.isPressingLeft = true;
    //             break;
    //         case "Quote" :
    //             this.isPressingRight = true;
    //             break;
    //         case "Semicolon" :
    //             this.status = "launching";
    //             break;
    //         case "Backquote":
    //             player2.ballContainer.retriveAll();
    //             player2.paddle.stopLaunching();
    //         break;
            
    //     }
        // player1.run();
        // player2.run();
    // }


    // background.canvas.onkeydown = (e) =>{
    //     player1.keydownHandler(e);
    //     player2.keydownHandler(e);
    // }

    // background.canvas.onkeyup = (e) =>{
    //     console.log(e.code)
    //     player1.keyupHandler(e);
    //     player2.keyupHandler(e);
    // }
    // let background = new Background(1510,870);
    // let ui = new UI();
    // player1.run();
    // player2.run();
    // let status = ui.run();
    // console.log(status);

    
    // background.run();
    // setTimeout(background.resize(),1000);

}