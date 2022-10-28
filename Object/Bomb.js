import BombEffect from "./BombEffect.js";
import ItemBrick from "./ItemBrick.js";
import EffectConatiner from "./EffectContainer.js";
import SoundContainer from "../sound/SoundContainer.js";


export default class BombBrick extends ItemBrick{
    constructor(x,y,health, brickArr){
        super(x,y,health);
        this.brickArr = brickArr;
        this.bombEffects = new EffectConatiner();
        this.hitEffects = {count:0, audios:[]};
        for (let i = 0; i < 3; i++){
            this.hitEffects.audios.push(new Audio('../sound/bomb.mp3'));
        }
        this.damage = 5;
    }
    draw(ctx){
        super.draw(ctx);
        this.bombEffects.drawAll(ctx);
    }

    move(){
        super.move();
    }

    activate(){
        let index = this.getMapIndex();
        let row = index.row;
        let col = index.col;
        this.bombEffects.add((new BombEffect(this.x,this.y)));
        SoundContainer.playSfx("bomb");
        for (let i = 0; i < 4; i++){
            let targetUpRow = row - i;
            if (targetUpRow < 0){
                continue;
            }

            for (let j = 0; j < 4 - i; j++){
                let targetRightCol = col + j;
                if (i == 0 && j == 0){
                    continue;
                }
                if (targetRightCol > this.brickArr[i].length){
                    continue;
                }
                if (this.brickArr[targetUpRow][targetRightCol] != null){
                    this.brickArr[targetUpRow][targetRightCol].getHit(this.damage);
                }
            }

            for (let j = 0; j < 4 - i; j++){
                let targetLeftCol = col - j;
                if (i == 0 && j == 0){
                    continue;
                }
                if (targetLeftCol < 0){
                    continue;
                }    
                if (this.brickArr[targetUpRow][targetLeftCol] != null){
                    this.brickArr[targetUpRow][targetLeftCol].getHit(this.damage);
                }
            }

            let targetDownRow = row + i;
            if (targetDownRow >= this.brickArr.length){
                continue;
            }
            for (let j = 0; j < 4 - i; j++){
                let targetRightCol = col + j;
                if (i == 0 && j == 0){
                    continue;
                }
                if (targetRightCol > this.brickArr[i].length){
                    continue;
                }
                if (this.brickArr[targetDownRow][targetRightCol] != null){
                    this.brickArr[targetDownRow][targetRightCol].getHit(this.damage);
                }
            }

            for (let j = 0; j < 4 - i; j++){
                let targetLeftCol = col - j;
                if (i == 0 && j == 0){
                    continue;
                }
                if (targetLeftCol < 0){
                    continue;
                }    
                if (this.brickArr[targetDownRow][targetLeftCol] != null){
                    this.brickArr[targetDownRow][targetLeftCol].getHit(this.damage);
                }
            }

        }

    }
    getMapIndex(){
        let row = Math.floor(this.y / 50);
        let col = Math.floor(this.x / 50);
        return {row : row, col : col};
    }

}