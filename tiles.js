class Tile{
    constructor(x,y){
        this.x = x; 
        this.y = y; 
        this.w = tileSize; 
        this.h = tileSize; 
        this.status = 3; 
        this.r = 0; //r stands for the red in the rgb
        this.g = 153; //g stands for the green in the rgb
        this.growthPerc = 1; 
        this.growthRate = 0.2; 
        this.isGrown = allFuncs.toInt(allFuncs.randomFloat(50,70));
    }

    draw(){
        this.grow();
        this.controlStatus(); 
        ctx.fillStyle = `rgb(${this.r},${this.g},0)`;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.fillStyle = "#000000";
    }
    
    controlStatus(){
        if (this.status == 3){
            this.r = 0;
            this.g = 153;
        }else if (this.status == 2){
            this.r = 76;
            this.g = 153; 
        }else if (this.status == 1){
            this.r = 153;
            this.g = 153;
        }else if (this.status == 0){
            this.r = 153;
            this.g = 76;
        } 
    }

    grow(){
        if (this.status < 3){
            if (this.growthPerc >= this.isGrown){
                this.status++;
                this.growthPerc = 1;
            }else {
                this.growthPerc += this.growthRate;
            }
        }
    }
}