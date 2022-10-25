import ItemBrick from "./ItemBrick.js";
import LaserEffect from "./LaserEffect.js";

export default class Laser extends ItemBrick{
    constructor(x,y,health,brickArr){
        super(x,y,health);
        this.health = 3;
        this.brickArr = brickArr;
        this.laserEffects = []; 
    }
    draw(ctx){
        super.draw(ctx);
        for (let effect of this.laserEffects){
            if (effect.alpha > 0){
                effect.draw(ctx);
            }
        }
    }

    activate(){
        let index = this.getMapIndex();
        let laserRow = index.row;
        let laserCol = index.col;
        this.laserEffects.push(new LaserEffect(this.x,this.y));

        for (let row = 0; row < 13; row ++){
            if (row == laserRow){
                continue;
            }
            if (this.brickArr[row][laserCol] != null){
                this.brickArr[row][laserCol].getHit();
            }
        }

        for (let col = 0; col < 10; col++){
            if (col == laserCol){
                continue;
            }
            if (this.brickArr[laserRow][col] != null){
                this.brickArr[laserRow][col].getHit();
            }
        }
    }

    getMapIndex(){
        let row = Math.floor(this.y / 50);
        let col = Math.floor(this.x / 50);
        return {row : row, col : col};
    }
}