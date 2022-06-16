const screen = document.getElementById("screen"); 
    const ctx = screen.getContext("2d");
    const tileSize = 40; 
    let t; 
    const tiles = [];
    const creatures = [];
    let firstD; 
    const Mouse = {
        x:0,
        y:0
    };
    let population = 50; //the population of the first generation
    
    const setup = () => {
        firstD = new Date();
        
        for(let i = 0; i < screen.width/tileSize; i++){
            for(let j = 0; j < screen.height/tileSize; j++){
                tiles.push(new Tile(i*tileSize,j*tileSize));
            }
        }//this code pushed all the grass tiles in the array "tiles" to fit the size of the screen.
        
        for (let i = 0; i < population; i++){
            creatures.push(new Creature());
        }
        console.log("Setup done."); 
    }
    let loop = () => {
        ctx.clearRect(0,0,screen.width,screen.heigth);
        allFuncs.runForArr(tiles,"draw"); 
        allFuncs.runForArr(creatures,"show"); 
        t = requestAnimationFrame(loop) 
    }
    setup(); 
    requestAnimationFrame(loop); 
    onmousemove = (e) => {Mouse.x = e.clientX-8;Mouse.y = e.clientY-8};
    