export default class ObjectEffect{
    // 위치값, 투명도, index를 기본으로 갖음
    constructor(x,y){
        this.index = 0;
        this.alpha = 1;
        this.x = x;
        this.y = y;
    }

    reset(x,y){
        this.x = x;
        this.y = y;
        this.index = 0;
        this.alpha = 1;
    }
    draw(ctx){}
}