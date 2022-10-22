export default class Baby{
    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
        this.padding = 5;
        this.isOnMouse = false;
        this.isOnClick = false;

    }

    draw(ctx){
        if(this.isOnMouse){
            ctx.font ="100px Orbitron";
            ctx.textBaseline = "top";
            
            
            ctx.shadowBlur = 30;
            ctx.shadowColor = "#c542cb";
            ctx.fillStyle = "white";
            ctx.fillText("Baby",this.x,this.y);
            ctx.fillStyle = "#d0535e";
            ctx.shadowBlur = 30;
            ctx.shadowColor = "purple";
            ctx.fillText("Baby", this.x+ this.padding, this.y + this.padding);
        }
        else {

            ctx.font ="100px Orbitron";
            ctx.textBaseline = "top";
            
            
            ctx.shadowBlur = 30;
            ctx.fillStyle = "#d0535e";
            ctx.shadowColor = "purple";
            ctx.fillText("Baby",this.x,this.y);
            
            ctx.shadowBlur = 30;
            ctx.shadowColor = "#c542cb";
            ctx.fillStyle = "white";
            ctx.fillText("Baby", this.x+ this.padding, this.y + this.padding);

        }
    }
    
    update(x,y,ctx){
        let textSize = ctx.measureText("Baby").width;
        let maxX = textSize+this.x;
        let minX = this.x;
        let maxY = 100+this.y;
        let minY = this.y;

        if(x>=minX && x<=maxX && y>=minY && y<=maxY)
            this.isOnMouse = true;
        else 
            this.isOnMouse = false;
    }
}