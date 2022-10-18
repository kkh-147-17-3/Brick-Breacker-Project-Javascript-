import BallContainer from "./Object/BallContainer.js";
import BrickContainer from "./Object/BrickContainer.js";
import Paddle from "./Object/Paddle.js";

export default class Player{
    constructor(){
        this.paddle = new Paddle();
        this.brickContainer = new BrickContainer();
        this.ballContainer = new BallContainer();
        this.score = 0;
        this.status = "ready";
    }
}