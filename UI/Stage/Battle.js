
import Player from "../../Player.js";
import Stage1 from '../Stage/Hell/Stairs.js';

export default class Battle {
    constructor(){
        this.player1 = new Player("kkh","player1",Stage1);
        this.player2 = new Player("hth","player2",Stage1);
        this.player1.keydownHandler = function(e) {
            switch(e.code) {
                case "KeyA" :
                    this.isPressingLeft = true;
                    console.log("check");
                    break;
                case "KeyD" :
                    this.isPressingRight = true;
                    break;
                case "KeyS" :
                    this.status = "launching";
                    break;
                case "Backquote":
                    this.quitTurn();
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
        this.player2.keydownHandler = function(e) {
            switch(e.code){
                case "KeyL" :
                    this.isPressingLeft = true;
                    break;
                case "Quote" :
                    this.isPressingRight = true;
                    break;
                case "Semicolon" :
                    this.status = "launching";
                    break;
                case "Backslash":
                    this.quitTurn();
                break;

            }
        }
        this.player2.keyupHandler = function(e){
            switch(e.code) {
                case "KeyL" :
                    this.isPressingLeft = false;
                break;
                case "Quote":
                    this.isPressingRight = false;
                break;
            }
        }
        this.player1.readyToContinue = () => {
            if (this.player1.status == "wait" && this.player2.status == "wait"){
                this.player1.status = "ready";
                this.player2.status = "ready";
            }
        }
        this.player2.readyToContinue = () => {
            if (this.player1.status == "wait" && this.player2.status == "wait"){
                this.player1.status = "ready";
                this.player2.status = "ready";
            }
        }



        this.player1.win = () => {
            this.win("1P ");
            this.player1.fadeOut();
            this.player2.fadeOut();        
        }
        this.player2.win = () => {
            this.win("2P ");
            this.player1.fadeOut();
            this.player2.fadeOut();        
        }
        this.player1.lose = () => {
            this.win("2P ");
            this.player1.fadeOut();
            this.player2.fadeOut();

        }
        this.player2.lose = () => {
            this.win("1P ");
            this.player1.fadeOut();
            this.player2.fadeOut();
        }

    }
    gameCanvasOff() {
        this.player1.CANVAS.style.display = "none";
        this.player2.CANVAS.style.display = "none";
    }

    run(){
        this.player1.fadeIn();
        this.player2.fadeIn();
        this.player1.run();
        this.player2.run();
    }

}