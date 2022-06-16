//The functions commonly used in the code are compiled on this page and stored in the object named allFuncs.
//If desired, this object can be exported and used as a module in other projects.
const allFuncs = {
  noLoop: (anim) => {
    cancelAnimationFrame(anim);
    return anim
  },//This function stops the loops and returns it.
  limit: (n, min, max) => Math.max(Math.min(n, max), min), //This function keeps and returns the value n between the maximum and minimum parameters entered.
  dist: (x1,y1,x2,y2) => Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2)), //This function returns the distance between 2 coordinates in the 2D plane.
  nearestMultiple: (current,aim,dir) => {
    current = allFuncs.toInt(current);
    while (current%aim!=0){
      current+=dir
    }
    return current;
  },// This function returns the nearest multiple of the integer entered, upwards or downwards as desired.
  toInt: (n) => n-n%1, //Bu function returns the integer part of the number entered.
  runForArr: (arr,funcName) => {
      for(let i = 0; i < arr.length; i++){
          eval("arr[i]."+funcName+"();")
      }
  },//This function performs the entered function for an array entered 
  yzdo: (n, start1, stop1) => ((n - start1) * 100) / (stop1 - start1), 
  //This function remaps the entered parameter from one range(between start-end parameters) to another(between 0-100).
  choice: (arr) => {
    let len = Math.floor(Math.random()*(arr.length))
    return arr[len]
},//This function returns a random element from the given array
  probability: (percentage,will,willnot) => {
  let f = []
  let t = []
for (i = 0; i < 100-percentage;i++){
  f.push(willnot)
}
for (i = 0; i < percentage;i++){
  t.push(will)
}

  return allFuncs.choice(f.concat(t))
},//This function returns the 2nd parameter with the given percentage probability. If parameter 2 is not selected, parameter 3 is returned.

  average: (...args) => {
  var sum = 0;
    for (let i = 0; i < args.length;i++){
    sum += args[i]
    }
  return sum / args.length
},//This function returns the average of the numbers entered.

haveCommon: (arr1,arr2) => arr1.some(elem => arr2.includes(elem)), //This function returns true if there are common elements between the two arrays, otherwise false.

Vector: class {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.type = "vector"
  };
  add(v) { 
      if (!v.type || v.type != "vector") { 
          throw "TypeError: add function requires a vector"
      }else {
          this.x = this.x+v.x;
          this.y = this.y+v.y;
          return this;
      }
      };
},//This object was written for vectors such as position and direction used in the code.
randomFloat: (min,max) => Math.random() * (max-min) + min //This function returns a random float number between the two numbers entered.
}
