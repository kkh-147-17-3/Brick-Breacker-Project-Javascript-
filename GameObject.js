export class GameObject{
    constructor(position, size){
        this.position = position;
        this.size = size;
        this.isPenetratable = false;
    }
}

export class Marble extends GameObject{
    constructor(position,size,speed){
        super(position,size);
        this.speed = speed;
    }
    updatePosition(){
        this.position.x += this.speed.dx;
        this.position.y += this.speed.dy;
    }
}