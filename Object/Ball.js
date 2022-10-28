import MoveableObject from "./MoveableObject.js";
import Brick from "./Brick.js";
import TriangleBrick from "./TriangleBrick.js";
import StageHitEffect from "./StageHitEffect.js";
import ObjectEffectConatiner from "./EffectContainer.js";

export default class Ball extends MoveableObject{
    #angle
    #stageHitEffects
    constructor(x,y,radius,vx,vy, stageEffectContainer){
        super(x,y,vx,vy);
        this.radius = radius;
        this.isFinished = false;
        this.#status = "launched";
        this.#effectIndex = 0;
        this.strokeImg = new Image();
        this.fullImg = new Image();
        this.#paddlePos = {x: this.x, y:this.y};
        this.#angle = 0;
        this.padding = 9;
        this.stageEffectContainer = stageEffectContainer;
        this.damage = 1;
    }

    draw(ctx){
      if (this.#effectIndex != 0){
        this.drawHitEffect(ctx);
      }
      this.drawBall(ctx);
    }

    drawBall(ctx){
        ctx.drawImage(this.fullImg,this.x-15,this.y-15);
    }

    drawHitEffect(ctx){
        let padding = 3 * Math.floor(this.#effectIndex / 10);
        ctx.drawImage(this.strokeImg, 0,0,30,30,this.x-15 - padding,this.y-15 - padding ,30+2 * padding,30+ 2 * padding);
        this.#effectIndex--;
    }

    move(){
        // 공 복귀버튼 또는 스테이지 바닥에 닿았을 때 (returning), 
        if(this.#status == "returning"){
            // 공의 x위치가 paddle과 완전히 가까워졌을 때
            console.log(this.x);

            if (Math.abs(this.x - this.#paddlePos.x) <= Math.abs(this.vx)){
                this.x = this.#paddlePos.x;
                this.vx = 0;
            }
            // 공의 y위치가 paddle과 완전히 가까워졌을 때
            if (Math.abs(this.y - this.#paddlePos.y) <= Math.abs(this.vy)){
                this.y = this.#paddlePos.y;
                this.vy = 0;
            }
            // 공이 paddle에 도착했을 때
            if (this.vx == 0 && this.vy == 0){
                this.status = "arrived";
            }
        }
        super.move();
    }
    


    hasHitStage(ctx){
        if (this.y + this.vy - this.radius< 0){ // stage 위쪽
            this.vy = -this.vy;
            if (ctx != null){
                this.stageEffectContainer.add(this.x,this.y,"up");
            }
        }
        if (this.y + this.vy + this.radius> this.STAGE_HEIGHT){ //stage아래쪽
            this.vy = -this.vy;
            if (ctx != null){
                this.stageEffectContainer.add(this.x,this.y,"down");
            }
        } 
        if (this.x + this.vx - this.radius < 0){ // stage 왼쪽
            this.vx = -this.vx;
            if (ctx != null){
                this.stageEffectContainer.add(this.x,this.y,"left");
            }
        } 
        if (this.x + this.vx + this.radius> this.STAGE_WIDTH){ // stage 오른쪽
            this.vx = -this.vx;
            if (ctx != null){
                this.stageEffectContainer.add(this.x,this.y,"right");
            }
        }
    }

    getXOfNextFrame() {
        return this.x + this.vx;
    }

    getYOfNextFrame() {
        return this.y + this.vy;
    }

    // brick은 brick.position = {x: value, y: value}
    // brick.size = {width: value, height: value}
    hasHitBricks(brickContainer){

        if (this.status == "returning"){
            return;
        }

        let brickArr = brickContainer.bricks;
        let numRow = brickContainer.numRow;
        let numCol = brickContainer.numCol;
        let indexOfBallOnMap = this.getMapIndex();
        let rowOfBall = indexOfBallOnMap.row;
        let colOfBall = indexOfBallOnMap.col;

        if (rowOfBall < 0 || rowOfBall >= numRow || colOfBall < 0 || colOfBall >= numCol)
            return;

        let hitExpectedBricks = [];
        let brickOnCurrentIndex = brickArr[rowOfBall][colOfBall];
        hitExpectedBricks.push(brickOnCurrentIndex);

        // 공의 위치를 기준으로 북서,북,북동 확인 
        if (this.vx == 0 && this.vy < 0){
            // 북쪽
            if (rowOfBall != 0){
                let downBrick = brickArr[rowOfBall-1][colOfBall];
                hitExpectedBricks.push(downBrick);
            }
            // 북서
            if (rowOfBall != 0 && colOfBall != 0 ){
                let rightBrick = brickArr[rowOfBall-1][colOfBall - 1];
                hitExpectedBricks.push(rightBrick);
            }
            // 북동
            if (rowOfBall != 0 && colOfBall != numCol - 1){
                let downRightBrick = brickArr[rowOfBall-1][colOfBall+1];
                hitExpectedBricks.push(downRightBrick);
            }
        }

        // 공의 위치를 기준으로 남서,남,남동 확인
        else if (this.vx == 0 && this.vy > 0){
            //남
            if (rowOfBall != numRow - 1){
                let downBrick = brickArr[rowOfBall+1][colOfBall];
                hitExpectedBricks.push(downBrick);
            }
            // 남서
            if (rowOfBall != numRow - 1 && colOfBall != 0){
                let rightBrick = brickArr[rowOfBall+1][colOfBall-1];
                hitExpectedBricks.push(rightBrick);
            }
            // 남동
            if (rowOfBall != numRow - 1 && colOfBall != numCol - 1){
                let downRightBrick = brickArr[rowOfBall+1][colOfBall+1];
                hitExpectedBricks.push(downRightBrick);
            }
        }

        // 공의 위치를 기준으로 남서, 서, 북서 확인 
        else if (this.vy == 0 && this.vx < 0){
            //남
            if (rowOfBall != numRow - 1){
                let downBrick = brickArr[rowOfBall+1][colOfBall];
                hitExpectedBricks.push(downBrick);
            }
            // 남서
            if (rowOfBall != numRow - 1 && colOfBall != 0){
                let rightBrick = brickArr[rowOfBall+1][colOfBall - 1];
                hitExpectedBricks.push(rightBrick);
            }
            // 북서
            if (rowOfBall != 0 && colOfBall != 0){
                let downRightBrick = brickArr[rowOfBall-1][colOfBall-1];
                hitExpectedBricks.push(downRightBrick);
            }
        }

        // 공의 위치를 기준으로 남동, 동, 북동 확인
        else if (this.vy == 0 && this.vx > 0){
            // 동쪽
            if (colOfBall != numCol - 1){
                let downBrick = brickArr[rowOfBall][colOfBall+1];
                hitExpectedBricks.push(downBrick);
            }
            // 남동
            if (rowOfBall != numRow -1 && colOfBall != numCol - 1 ){
                let rightBrick = brickArr[rowOfBall+1][colOfBall+1];
                hitExpectedBricks.push(rightBrick);
            }
            // 북동
            if (rowOfBall != 0 && colOfBall != numCol - 1){
                let downRightBrick = brickArr[rowOfBall-1][colOfBall+1];
                hitExpectedBricks.push(downRightBrick);
            }
        }

        // 공의 위치를 기준으로 남, 남동, 동쪽만 확인
        if (this.vx >= 0 && this.vy >= 0){
            if (rowOfBall != numRow - 1){
                let downBrick = brickArr[rowOfBall+1][colOfBall];
                hitExpectedBricks.push(downBrick);
                
            }

            if (colOfBall != numCol - 1){
                let rightBrick = brickArr[rowOfBall][colOfBall + 1];
                hitExpectedBricks.push(rightBrick);
                
            }

            if (colOfBall != numCol - 1 && rowOfBall != numRow - 1){
                let downRightBrick = brickArr[rowOfBall+1][colOfBall+1];
                hitExpectedBricks.push(downRightBrick);
            }

        }

        // 공의 위치를 기준으로 서, 남서, 남쪽만 확인
        else if (this.vx <= 0 && this.vy >= 0){
            if (rowOfBall != numRow - 1){
                let downBrick = brickArr[rowOfBall+1][colOfBall];
                hitExpectedBricks.push(downBrick);
                
            }

            if (colOfBall != 0){
                let leftBrick = brickArr[rowOfBall][colOfBall-1];
                hitExpectedBricks.push(leftBrick);
                
            }

            if (colOfBall != 0 && rowOfBall != numRow - 1){
                let downLeftBrick = brickArr[rowOfBall+1][colOfBall-1];
                hitExpectedBricks.push(downLeftBrick);
            }
        }

        // 공의 위치를 기준으로 서, 북서, 북쪽만 확인
        else if (this.vx <= 0 && this.vy <= 0){
            if (rowOfBall != 0){
                let upBrick = brickArr[rowOfBall-1][colOfBall];
                hitExpectedBricks.push(upBrick);
                
            }

            if (colOfBall != 0){
                let leftBrick = brickArr[rowOfBall][colOfBall-1];
                hitExpectedBricks.push(leftBrick);
                
            }

            if (rowOfBall != 0 && colOfBall != 0){
                let upLeftBrick = brickArr[rowOfBall-1][colOfBall-1];
                hitExpectedBricks.push(upLeftBrick);
            }
        }

        // 공의 위치를 기준으로 동,북동, 북쪽만 확인
        else {
            if (rowOfBall != 0){
                let upBrick = brickArr[rowOfBall-1][colOfBall];
                hitExpectedBricks.push(upBrick);
                
            }
            if (colOfBall != numCol - 1){
                let rightBrick = brickArr[rowOfBall][colOfBall + 1];
                hitExpectedBricks.push(rightBrick);
                
            }

            if (rowOfBall != 0 && colOfBall != this.numCol - 1){
                let upRightBrick = brickArr[rowOfBall-1][colOfBall+1];
                hitExpectedBricks.push(upRightBrick);
            }
        }


        Checking:
        for (let brick of hitExpectedBricks){
            if (brick == null)
                continue;
            if (brick instanceof Brick){
                if (this.hasHitBrick(brick)){
                    // break Checking;
                }
            }
            if (brick instanceof TriangleBrick){
                if (this.hasHitTriangleBrick(brick)){
                    // break Checking;
                }
            }
        }
    }
    hasHitTriangleBrick(brick){
        if (brick == null || brick.isBroken)
            return;
        
        let nextX = this.getXOfNextFrame();
        let nextY = this.getYOfNextFrame();
        let leftXOfBrick = brick.getLeftBoundary();
        let rightXOfBrick = brick.getRightBoundary();
        let upYOfBrick = brick.getUpBoundary();
        let downYOfBrick = brick.getDownBoundary();

        if (!(nextX >= leftXOfBrick - this.padding && nextX <= rightXOfBrick + this.padding && 
            nextY >= upYOfBrick - this.padding && nextY <= downYOfBrick + this.padding)){
            return false;
        }  
        let m = brick.slope;
        let n = brick.yIntercept;
        // 공의 다음 프레임에서의 중심점 x좌표값을 갖는 삼각형 빗변 위의 y 좌표 계산
        let nextYOnHypo = m*nextX+n;
        let currYOnHypo = m*this.x+n; 

        switch(brick.triangleType){
            case 1:
                if (this.x + this.padding <= leftXOfBrick){
                    this.vx *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if (this.y + this.padding <= upYOfBrick){
                    this.vy *= -1;
                    brick.getHit(this.damage);
                    return true;
                }
                if ((nextYOnHypo >= nextY - this.padding && currYOnHypo <= this.y - this.padding) || 
                    (currYOnHypo <= this.y && nextX - this.padding <= leftXOfBrick) || 
                    (currYOnHypo <= this.y && nextY - this.padding <= upYOfBrick)){
                    let vx = this.vx;
                    let vy = this.vy;
                    this.vx = -vy;
                    this.vy = -vx;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
            break;
            case 2:
                if (this.y <= upYOfBrick - this.padding){
                    this.vy *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if (this.x >= rightXOfBrick + this.padding){
                    this.vx *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if ((nextYOnHypo >= nextY - this.padding && currYOnHypo <= this.y - this.padding) || 
                    (currYOnHypo <= this.y && nextX + this.padding >= rightXOfBrick) || 
                    (currYOnHypo <= this.y && nextY - this.padding <= upYOfBrick)){
                    let vx = this.vx;
                    let vy = this.vy;
                    this.vx = vy;
                    this.vy = vx;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
            break;  
            case 3:
                if (this.x <= leftXOfBrick - this.padding){
                    this.vx *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if (this.y >= downYOfBrick + this.padding){
                    this.vy *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if ((nextYOnHypo <= nextY + this.padding && currYOnHypo >= this.y + this.padding) || 
                    (currYOnHypo >= this.y && nextX - this.padding <= leftXOfBrick) || 
                    (currYOnHypo >= this.y && nextY + this.padding >= downYOfBrick)){
                    let vx = this.vx;
                    let vy = this.vy;
                    this.vx = vy;
                    this.vy = vx;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
            break;  
            
            case 4:
                if (this.x >= rightXOfBrick + this.padding){
                    this.vx *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if (this.y >= downYOfBrick + this.padding){
                    this.vy *= -1;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
                if ((nextYOnHypo <= nextY + this.padding && currYOnHypo >= this.y + this.padding) || 
                    (currYOnHypo >= this.y && nextX + this.padding >= rightXOfBrick) || 
                    (currYOnHypo >= this.y && nextY + this.padding >= downYOfBrick)){
                    let vx = this.vx;
                    let vy = this.vy;
                    this.vx = -vy;
                    this.vy = -vx;
                    brick.getHit(this.damage);
                    this.#effectIndex = 20;
                    return true;
                }
            break;  
        }
    }


    hasHitBrick(brick){
        if (brick.isBroken == true || this.isFinished == true)
            return;
        
        let nextX = this.getXOfNextFrame();
        let nextY = this.getYOfNextFrame();
        let leftXOfBrick = brick.x - this.radius;
        let rightXOfBrick = brick.x + brick.width + this.radius;
        let topYOfBrick = brick.y - this.radius;
        let bottomYOfBrick = brick.y + brick.height + this.radius;

        if (!(nextX >= leftXOfBrick && nextX <= rightXOfBrick && 
            nextY >= topYOfBrick && nextY <= bottomYOfBrick)){
            return false;
        }  
        if (this.x <= leftXOfBrick)
            this.vx *= -1;
        
        if (this.x >= rightXOfBrick)
            this.vx *= -1;
        
        if (this.y <= topYOfBrick)
            this.vy *= -1;
        
        if (this.y >= bottomYOfBrick)
            this.vy *= -1;
        this.effectIndex = 0;
        brick.getHit(this.damage);
        this.#effectIndex = 20;

        return true;
    }

    quitMoving(){
        if (this.#status == "returning"){
            return;
        }
        
        this.#status = "returning";
        if (this.#paddlePos.x != this.x){
            this.vx = (this.#paddlePos.x - this.x) / 30;
        }
        if (this.#paddlePos.y != this.y){
            this.vy = (this.#paddlePos.y - this.y) / 30;
        }
    }

    moveToPaddle(){
        if (this.#status == "returning"){
            return;
        }
        
        this.#status = "returning";
        if (this.#paddlePos.x != this.x){
            this.vx = 10* (this.#paddlePos.x - this.x) / Math.abs((this.#paddlePos.x - this.x));
        }
        if (this.#paddlePos.y != this.y){
            this.vy = 10 * (this.#paddlePos.y - this.y) / Math.abs((this.#paddlePos.y - this.y));
        }
        
        
            // this.x = this.#paddleMidX;
            // this.vx = 0;
        
        
       
        //     this.y = this.#paddleMidY;
        //     this.vy = 0;
        // }
    }

    set paddlePos(pos){
        this.#paddlePos = pos;
    }

    get paddlePos(){
        return this.#paddlePos;
    }

    getMapIndex(){
        let row = Math.floor(this.y / 50);
        let col = Math.floor(this.x / 50);
        return {row : row, col : col};
    }

    #status;
    #effectIndex;
    #paddlePos
    #direction;
}