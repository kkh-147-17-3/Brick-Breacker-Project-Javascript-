import Player from "../../Player.js";

export default class Baby {
    constructor(){
        this.player1 = new Player("kkh","player1");

        this.player1.keydownHandler = function(e) {
            switch(e.code) {
                case "KeyA" :
                    this.isPressingLeft = true;
                    break;
                case "KeyD" :
                    this.isPressingRight = true;
                    break;
                case "KeyS" :
                    this.status = "launching";
                    break;
                case "Backquote":
                    this.ballContainer.retriveAll();
                    this.paddle.stopLaunching();
                break;
            }
        }
        this.player1.keyupHandler = function(e){
            switch(e.code) {
                case "KeyA" :
                    this.isPressingLeft = false;
                break;
                case "KeyD":
                    this.isPressingRight = false;
                break;
            }
        }
    }

    run(){
        this.player1.fadeIn();
        this.player1.run();
    }
}