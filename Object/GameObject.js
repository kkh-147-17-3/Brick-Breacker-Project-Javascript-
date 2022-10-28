export default class GameObject {
    #x;
    #y;
    #STAGE_WIDTH;
    #STAGE_HEIGHT;
    #alpha;
    
    constructor(x=0,y=0) {
        this.#x = x;
        this.#y = y;
        this.#STAGE_HEIGHT = 700;  
        this.#STAGE_WIDTH = 500;
        // this.#strokeColor = "red";
        // this.#fillColor = "blue";
    }

    set x(x){
        this.#x = x;
    }

    get x(){
        return this.#x;
    }

    set y(y){
        this.#y = y;
    }

    get y(){
        return this.#y;
    }

    // get strokeColor(){
    //     return this.#strokeColor;
    // }

    // set strokeColor(color){
    //     this.#strokeColor = color;
    // }

    // get fillColor(){
    //     return this.#fillColor;
    // }

    // set fillColor(color){
    //     this.#fillColor = color;
    // }

    get alpha(){
        return this.#alpha;
    }

    set alpha(alpha){
        this.#alpha = alpha;
    }

    get STAGE_HEIGHT(){
        return this.#STAGE_HEIGHT;
    }

    get STAGE_WIDTH(){
        return this.#STAGE_WIDTH;
    }
}