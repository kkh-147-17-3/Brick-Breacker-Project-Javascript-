import ItemBrick from "./ItemBrick.js";
import LaserEffect from "./LaserEffect.js";
import ObjectEffectConatiner from "./EffectContainer.js";
import SoundContainer from "../sound/SoundContainer.js";

export default class Laser extends ItemBrick{
    constructor(x,y,health,brickArr){
        super(x,y,health);
        this.health = 3;
        this.brickArr = brickArr;
        this.laserEffects = new ObjectEffectConatiner();
        this.hitEffects = {count:0, audios:[]};
        for (let i = 0; i < 3; i++){
            this.hitEffects.audios.push(new Audio('../sound/laser.mp3'));
        }
        this.damage = 3;
    }
    draw(ctx){
        super.draw(ctx);
        this.laserEffects.drawAll(ctx);
    }

    activate(){
        let index = this.getMapIndex();
        let laserRow = index.row;
        let laserCol = index.col;
        SoundContainer.playSfx("laser");
        this.laserEffects.add(new LaserEffect(this.x,this.y));

        for (let row = 0; row < 13; row ++){
            if (row == laserRow){
                continue;
            }
            if (this.brickArr[row][laserCol] != null){
                this.brickArr[row][laserCol].getHit(this.damage);
            }
        }

        for (let col = 0; col < 10; col++){
            if (col == laserCol){
                continue;
            }
            if (this.brickArr[laserRow][col] != null){
                this.brickArr[laserRow][col].getHit(this.damage);
            }
        }
    }

    getMapIndex(){
        let row = Math.floor(this.y / 50);
        let col = Math.floor(this.x / 50);
        return {row : row, col : col};
    }
}