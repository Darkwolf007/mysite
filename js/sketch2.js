

var blobs = [] //binary large objects
var colors; //color
var colorCol = [] //color collection
let variation = 0; //number of patterns to draw
let colVariation = 0; //number of colors collection to draw
let xScale, yScale; // to maintain a same scale in x and y
let centerX, centerY;
let numCase = 7;
let canv;


// auto change
let changeDuration = 3000; // 3seconds
let lastChange = 0; //init value of 0 seconds



function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("home-bg");
  // createLoop({duration:12, gif:true})
  // createCanvas(100, 300);
  // maintain the same xScale in yScale
  xScale = width / 20;
  yScale = height / 20 * (width/height);

  centerX = width/2;
  centerY = height/2;

  noCursor();

  colors = [color("#27187E"), color("#758BFD"), color("#AEB8FE"), color("#F1F2F6"), color("#FF8600")]
  colorCol.push(colors)

  colors = [color("#ED6A5A"), color("#F4F1BB"), color("#9BC1BC"), color("#E6EBE0"), color("#36C9C6")]
  colorCol.push(colors)

  // colors = [color("#F5C425"), color("#24231F"), color("#6E6032"), color("#EBCC6A"), color("#36342D")]
  // colorCol.push(colors)

  colors = [color("#BF1111"), color("#F76F07"), color("#C44A1D"), color("#630202"), color("#B38900")]
  colorCol.push(colors)



}

function keyReleased(){
  if (key == "c"){
    colVariation++;
    colVariation = colVariation % (colorCol.length);


  }
  if (key == "e"){
    saveFrames('out', 'png', 1, 60);
  }
  if (key == "d"){
    blobs = [];
  }
  if (key == "r"){
    saveCanvas(canv, 'myCanvas', 'png');
  }
}

function getXPos(x){
  // dist btw center and x + random(-100, 100)/xScale
  return (x - centerX)/xScale
}
function getYPos(y){
  return (y - centerY)/yScale
}

  // put the xcoordinates to the original scale
  // reverse of getXPos after change
function getXPrint(x){
  return xScale * x + centerX;
}
  // put the ycoordinates to the original scale
  // reverse of getYPos after change
function getYPrint(y){
  return yScale * y + centerY;
}


function draw() {

  // Create the interaction when the mouse is pressed
  if(mouseIsPressed){
    //for the number of particles to draw at once (i.e.20)
       for(let i = 0; i < 20; i++){
         let x = mouseX + random(-150, 150);
         let y = mouseY + random(-150, 150);
         // Create Variable blob (a point) with params
         var blob = {
           x : getXPos(x),
           y : getYPos(y),
           size: random(1, 5),
           lastX: x,
           lastY: y,

           color: colorCol[colVariation][floor(random(colors.length))],
           direction: random(0.1, 1) * (random() > 0.5 ? 1: -1) // -1 to 1 excluding -0.1 to 0.1

         };
         blobs.push(blob); //add variable (blob) to the Array blobs.
         // print(blobs)
       }
     }



  //Slowly make the tails disappear.
  noStroke();
  // fill(26, 6, 51, 10)
  // fill(173, 170, 191, 10)
  // fill(49, 38, 62, 10)
  // fill(140, 15, 49, 10)
  fill(20, 10, 27, 10)
  // fill(26, 41, 64,10)
  rect(0,0, width, height);

  //auto change mechanics
  let time = millis(); //time in milliseconds since the start of the project
  if (time - lastChange > changeDuration){
    lastChange = time;
    variation++; // increment the variation count
    variation = variation % (numCase);

    // colVariation++;
    // colVariation = colVariation % (colorCol.length);

  }




  var stepSize = deltaTime * 0.002; // how long you will draw in each line (how wide in each step)
  //iterate blobs from backward e.g.20 -> 0 to 19
  var length = blobs.length;
  for(let i = length -1; i >= 0; i--){
    let blob = blobs[i];
    var x = getSlopeX(blob.x, blob.y);
    var y = getSlopeY(blob.x, blob.y);
    blob.x += blob.direction * x * stepSize;
    blob.y += blob.direction * y * stepSize;

    x = getXPrint(blob.x);
    y = getYPrint(blob.y);
    stroke(blob.color);
    strokeWeight(blob.size);
    line(x, y, blob.lastX, blob.lastY);


    blob.lastX = x;
    blob.lastY = y;

    // if the coordinate goes beyond the border, splices replaces 1 element at index i with nothing -> remove the blob
    const border = 100;
    if (x < -border  || y < -border || x > width+border || y > height+border)
      blobs.splice(i, 1);

  }


}
function getSlopeY(x, y){
  switch(variation){
    case 0: return Math.cos(y);
    case 1: return Math.cos(x*y);
//     case 1: return -y*0.5;
    case 2: return Math.sin(y);
//     case 2: return Math.sin(y)*Math.cos(x);
//     case 3: return Math.cos(y/4)* Math.sin(x/4);
    case 3: return (-x + y)*0.25
    case 4: return Math.cos(y)* Math.sin(x);
    case 5: return Math.log(Math.abs(x)) * Math.log(Math.abs(y));
    case 6: return Math.cos(y/10)* Math.sin(x/10);


  }
}


// THIS PART IS COPY and PASTE to be changed in my own variation
function getSlopeX(x, y){
  switch(variation){
    case 0: return Math.sin(x);
    case 1:
    case 2:
    case 3:
    case 4:
    case 5: return 1;
    case 6: return Math.sin(x/10)* Math.cos(y/10);


  }
}









