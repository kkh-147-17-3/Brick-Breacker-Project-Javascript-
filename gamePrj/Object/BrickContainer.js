import Brick from "./Brick.js";
// import TriangleBrick from "./TriangleBrick.js";
export default class BrickContainer{
    constructor(numRow, numCol, map, width = 50, height = 50){
        this.numRow = numRow;
        this.numCol = numCol;
        this.bricks = [];
        for (let r = 0; r < numRow; r++){
            this.bricks[r] = [];
        }
        this.width = width;
        this.height = height;
        this.map = map || this.getDefaultMap();
        this.endOfStage = this.map.length;
        this.currentRow = 0;
        this.currentEndRow = 14;
        this.loadNewBricks();
    }
    loadNewBricks(){
        while (this.currentRow != this.currentEndRow){
            if (this.bricks.length == this.numRow){
                this.bricks.pop();
            }
            let newBricks = [];
            let currentRowInMap = this.map.pop();
            for (let col in currentRowInMap){
                if(currentRowInMap[col] == 0)
                    newBricks[col] = null;
                else {
                    let x = this.width * col;
                    let y = 0;
                    let health = currentRowInMap[col];
                    let brick = null;
                    let type = Math.floor(Math.random()*5 + 1);
                    if (type == 5)
                        brick = new Brick(x,y,this.width,this.height,health);
                    else
                        brick = new TriangleBrick({x:x, y:y},50,type,health);
                    // let brick = new Brick(x,y,this.width,this.height,health);
                    newBricks[col] = brick;
                }
            }
            this.updateLocation();
            this.bricks.unshift(newBricks);
            this.currentRow ++;
        }
        if (this.currentEndRow < this.map.length - 1)
            this.currentEndRow++;
    }
    updateLocation(){
        for (let bricksInRow of this.bricks){
            for (let brick of bricksInRow){
                if (brick == null)
                    continue;
                if (brick instanceof Brick){
                    brick.y += this.height;
                }
                else if (brick instanceof TriangleBrick){
                    brick.update();
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
        for(let r = 0; r < this.numRow; r++){
            for (let c = 0; c < this.numCol; c++){
                if (this.bricks[r][c] == null)
                    continue;
                this.bricks[r][c].draw(ctx);
            }
        }
    }
}