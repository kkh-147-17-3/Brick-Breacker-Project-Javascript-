import BombBrick from "./Bomb.js";
import Brick from "./Brick.js";
import TriangleBrick from "./TriangleBrick.js";
import BallUp from "./BallUp.js";
import Laser from "./Laser.js";

export default class BrickContainer{
    constructor(brickInfo,paddle){
        this.currentEndRow = 13;
        this.numRow = 13;
        this.numCol = 10;
        this.bricks = [];
        for (let r = 0; r < this.currentEndRow; r++){
            this.bricks[r] = [];
        }
        this.width = 50;
        this.height = 50;
        this.endOfStage = brickInfo.numRow;
        this.map = brickInfo.map; 
        this.currentRow = 0;
        this.difficulty;
        this.creator;
        this.stageName;
        this.paddle = paddle;
    }
    loadNewBricks(){
        while (this.currentRow != this.currentEndRow){
            let remainBricks = this.bricks.pop();
            for (let remains of remainBricks){
                if (remains == null){
                    continue;
                }

                if (remains.health > 0){
                    this.updateLocation();
                    return false;
                }
            }
            let newBricks = [];
            let currentRowInMap = this.map.shift();
            if (currentRowInMap != undefined){
                for (let col = 0; col < this.numCol; col++){
                    if(currentRowInMap[col] == null || currentRowInMap[col] == undefined)
                        newBricks[col] = null;
                    else {
                        let x = this.width * col;
                        let y = 0;
                        let health = currentRowInMap[col].health;
                        let type = currentRowInMap[col].type;
                        let strokeImg = currentRowInMap[col].strokeImg;
                        let fullImg = currentRowInMap[col].fullImg;
                        let particleImg = currentRowInMap[col].particleImg;
                        let brick;
                        switch(type){
                            case "square":
                                brick = new Brick(x,y,health);
                                break;
                            case "triangle1":
                                brick = new TriangleBrick(x,y,1,health);
                                break;
                            case "triangle2":
                                brick = new TriangleBrick(x,y,2,health);
                                break;
                            case "triangle3":
                                brick = new TriangleBrick(x,y,3,health);
                                break;
                            case "triangle4":
                                brick = new TriangleBrick(x,y,4,health);
                                break;
                            case "ballUp":
                                brick = new BallUp(x,y,this.paddle);
                                break;
                            case "laser":
                                brick = new Laser(x,y,health,this.bricks);
                                break;
                            case "bomb":
                                brick = new BombBrick(x,y,health,this.bricks);
                                break;
                        
                        }
                        brick.strokeImg.src = strokeImg;
                        brick.fullImg.src = fullImg;
                        if (type != "ballUp" && type != "laser" && type != "bomb"){
                            let image = new Image();
                            image.src = particleImg;
                            brick.loadParticles(image);
                        }
                        newBricks[col] = brick;
                        
                    }
                }
            }
            else{
                for (let col = 0; col < this.numCol; col++){
                    newBricks[col] = null;
                }
            }
            this.updateLocation();
            this.bricks.unshift(newBricks);
            this.currentRow ++;
        }
        this.currentEndRow++;
        return true;
    }
    updateLocation(){
        for (let bricksInRow of this.bricks){
            for (let brick of bricksInRow){
                if (brick == null)
                    continue;
                if (brick instanceof Brick){
                    brick.move()
                }
                else if (brick instanceof TriangleBrick){
                    brick.move();
                }
                brick.resetAppearEffectIndex();
            }
        }
    }
    getDefaultMap(){
        let map = [];
        for(let r = 0; r < this.numRow + 20; r++){
            map[r] = [];
            for (let c = 0; c < this.numCol; c++){
                if (r < 24){
                    map[r][c] = Math.floor(Math.random() * 3 + 1);
                }
                else map[r][c] = 0;
            }
        }
        return map;
    }
    drawAll(ctx){
        for(let r = 0; r < this.bricks.length; r++){
            for (let c = 0; c < this.numCol; c++){
                if (this.bricks[r][c] == null)
                    continue;
                this.bricks[r][c].draw(ctx);
            }
        }
    }
    hasNoMoreBrick(){
        if (this.map.length != 0){
            return false;
        }

        for (let i = 0; i < this.numRow; i++){
            for (let j = 0; j < this.numCol; j++){
                let remainBrick = this.bricks[i][j];
                if(remainBrick == null){
                    continue;
                }
                if (remainBrick.health > 0){
                    return false;
                }
            }
        }
        return true;
    }
}