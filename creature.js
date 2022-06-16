class Creature{
    constructor(){//Each variable in the constructor section is available to be changed according to the user request.
        this.gender = allFuncs.choice(["male","female"]); //Gender is randomly determined as female or male.
        this.oppositeGender = this.gender=="male" ? "female" : "male";
        this.color = this.gender =="male" ? "rgb(40,80,250)" : "rgb(255,40,160)" // its color is determined by its gender.
        this.hunger = 0; 
        
        this.pos = new allFuncs.Vector(allFuncs.randomFloat(1,screen.width-1),allFuncs.randomFloat(1,screen.height-1)); 
        
        this.mom = 0; 
        this.dad = 0; 
        this.children = []; 
        this.DNA = { //Variables in this object will pass across generations
            strength: allFuncs.toInt(allFuncs.randomFloat(0,100+1)), // A strength value between 0 and 100 is randomly assigned.
            intelligence: allFuncs.toInt(allFuncs.randomFloat(0,20+1)), // An intelligence value of 0-20 is assigned. (First creatures 0-20 others 0-30).
            charm: undefined, //to be determined at the bottom (due to scope rules)
            visionRadius: undefined,// same reason as line 16
        };
        this.partner = 0 
        this.DNA.charm = allFuncs.yzdo(this.DNA.strength+this.DNA.intelligence*1.2,0,136); 
        // Creature's strength + intelligence * 1.2 is calculated. This value is calculated as a percentage between 0 and 136 (line 20).
        // Example: 50 + 15 * 1.2 = 68, the number 68 is half of 136 so the value of the charm is assigned as 50. (Line 20)

        this.DNA.visionRadius = 30 + this.DNA.intelligence/3;
        this.dir = this.createdir(); 
        this.dirCounter = 0; 
        this.formerPartners = [] 
        this.vitalActivity = true; //vital activities depend on this variable 
        this.age = 0;
        this.lifespan = allFuncs.toInt(allFuncs.randomFloat(120,150)) * 5
    }
    createdir(){
        let p = new allFuncs.Vector(allFuncs.choice([-1,0,1]),allFuncs.choice([-1,0,1])); //One of 9 different directon is randomly selected
        p.x==0&&p.y==0 ? p.x=allFuncs.choice([-1,1]) : null; 
        //If the direction is selected as (0,0), i.e. immobilization, then direction is re-selected in a random direction towards the x axis.
        return p //it returns this direction vector.
    }
    show(){
        //Stay in the screen
        this.pos.x = allFuncs.limit(this.pos.x,0+1,screen.width-11);
        this.pos.y = allFuncs.limit(this.pos.y,0+1,screen.height-11);

        //Visiual part
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,2*Math.PI)
        if (this.vitalActivity){
        ctx.fillStyle = this.color;
        }else {
        ctx.fillStyle = "rgb(255,255,0)";
        }
        ctx.fill();
        ctx.stroke();
        

        this.vision();
        
        //General behaviors
        if(this.vitalActivity){
        this.behaviours();
        this.hunger+=0.4;
        this.age+=0.025;
        }
        //Death check
        ((this.age > this.lifespan) || (this.hunger > 100+this.DNA.strength) ) && creatures.splice(creatures.findIndex(el => el==this),1) 

    }

    behaviours(){
        (this.hunger > 60) && this.searchForfood();
        (this.age > 15) && (this.gender=="male") && (this.partner == 0) && this.lookForPartner(); 
    }
    searchForfood(){
let foodTile = tiles[tiles.findIndex(elem => elem.x == allFuncs.nearestMultiple(this.pos.x + 5,tileSize,-1) && elem.y== allFuncs.nearestMultiple(this.pos.y + 5,tileSize,-1))];
//It calculates the grass tile that it is on top of it with an algorithm.
            if (foodTile.status < 1){ 
                //If the grass tile on which creature is on is inedible, it chooses a direction for itself. And for a certain time it moves in that direction.
                if (this.dirCounter % 15 == 0){
                    this.dir = this.createdir();
                }
                this.pos.add(this.dir)
                this.dirCounter++;
            }else{
                //If the grass tile on which creature is on is edible, then it eats the grass.
            this.eat(foodTile)
            this.dirCounter = 0;
            }
    }

    eat(tile){
        this.hunger = 0;
        tile.status--;
    }

    vision(){
        //This function shows the vision field of the creature when the user hovers on the creature.
        if (allFuncs.dist(Mouse.x,Mouse.y,this.pos.x,this.pos.y) < 5){
        ctx.beginPath();
        ctx.globalAlpha = 0.4;
        ctx.arc(this.pos.x,this.pos.y,this.DNA.visionRadius,0,2*Math.PI);
        ctx.fillStyle = 'rgb(80,80,80)';
        ctx.fill();
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = 1;
        ctx.stroke();
    }
    }

    lookForPartner(){
        //This function takes all the creatures in the field of view and selects a creature that meets certain conditions and makes that creature its partner.
        let creaturesInRange = []
        for(let i = 0; i < creatures.length;i++){
            if (allFuncs.dist(this.pos.x,this.pos.y,creatures[i].pos.x,creatures[i].pos.y) < this.DNA.visionRadius){ 
                creaturesInRange.push(creatures[i])
            }
        }
        for(let i = 0; i < creaturesInRange.length;i++){
        if(creaturesInRange[i].partner == 0 && creaturesInRange[i].gender == this.oppositeGender && !allFuncs.haveCommon(creaturesInRange,this.formerPartners) && !allFuncs.haveCommon(creaturesInRange,[this.mom,this.dad]) && !allFuncs.haveCommon(creaturesInRange,this.children)){
               this.partner = creaturesInRange[i];
               creaturesInRange[i].partner = this; // || this.partner.partner = this
               //Later, it reproduce with his partner with the probabilty of its charm value.(Therefore, the higher the charm value, the more likely the reproduction is.)
               if(allFuncs.probability(this.DNA.charm-15,true,false)){ //As the number extracted increases, the probability of reproduction decreases.This increases the likelihood that only attractive ones will continue their generations.
                   this.reproduce();
               }else {
                //If they cannot reproduce, they divorce :)
                this.partner.formerPartners.push(this)
                this.formerPartners.push(this.partner)
                this.partner.partner = 0;
                this.partner = 0;
               }
           }
        }
    }

    reproduce(){
        //Their vital activities stop during reproduction. (They do not look for food, do not starve, do not die)
        this.vitalActivity = false;
        this.partner.vitalActivity = false;
        //Partners come side by side.
        this.partner.pos.y = this.pos.y;
        //They are making children. And the variable named fp is assigned the value of the former partner.
        let fp = this.makeChild();
        //2 seconds later, both creatures vital activity becomes normal.
    setTimeout(()=>{
        fp.vitalActivity = true; 
        this.vitalActivity = true;
        },2000)
    }

    makeChild(){
        //These parameters and probabilities can be modified by user as desired.
        for (let i = 0; i < allFuncs.toInt(allFuncs.randomFloat(1,14+1)); i++){
        let child = new Creature();
        child.pos = new allFuncs.Vector(allFuncs.average(this.pos.x,this.partner.pos.x),this.pos.y + 15);
        child.dad = this.gender=="male" ? this : this.partner; //ternary not necessary but just in case...
        child.mom = this.gender=="female" ? this : this.partner; //ternary not ncessary but just in case...
        child.DNA.strength = allFuncs.probability(80,allFuncs.toInt(allFuncs.randomFloat(child.dad.DNA.strength-10,child.dad.DNA.strength+10)),allFuncs.toInt(allFuncs.randomFloat(0,100+1)));
        child.DNA.intelligence = allFuncs.probability(80,allFuncs.toInt(allFuncs.randomFloat(child.dad.DNA.intelligence-10,child.dad.DNA.intelligence+10)),allFuncs.toInt(allFuncs.randomFloat(0,30+1)));
        child.DNA.charm = allFuncs.yzdo(child.DNA.strength*0.4+child.DNA.intelligence*15,0,100*0.4+30*15);//Coefficients can be changed. These coefficients determine how indirectly the level of attraction will affect
        child.DNA.visionRadius = 30 + child.DNA.intelligence/3;
        
        //The child is added to the world.
        this.children.push(child);
        this.partner.children.push(child);
        creatures.push(child)
        }

        //They divorce after the reproduction
        this.partner.formerPartners.push(this)
        this.formerPartners.push(this.partner)
        let pf = this.partner
        this.partner.partner = 0;
        this.partner = 0;
        return pf
    }
}