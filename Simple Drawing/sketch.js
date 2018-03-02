var paths = [];
var newPath = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  var drawing = false;
  var pt = {
    x: mouseX,
    y: mouseY
  };
  if(mouseIsPressed){
    drawing = true;
    newPath.push(pt);
    if(dist(mouseX, mouseY, newPath[newPath.length-1].x, newPath[newPath.length-1].y) > 5){
      newPath.push(pt);
    }
  }
  else if(!mouseIsPressed){
    drawing = false;
    paths.push(newPath);
    newPath = [];
    console.log(newPath.length);
  }
  clear();
  if(newPath.length > 1){
    stroke(0);
    for (var i = 2; i < newPath.length+1; i++){
      line(newPath[i-2].x,newPath[i-2].y,newPath[(i-1)%(newPath.length-1)].x,newPath[(i-1)%(newPath.length-1)].y);
    }
    // stroke(200);
    // line(newPath[newPath.length-1].x,newPath[newPath.length-1].y, newPath[0].x,newPath[0].y)
  }
  for(var j = 0; j < paths.length; j++){
    for (var i = 2; i < paths[j].length+1; i++){
      line(paths[j][i-2].x,paths[j][i-2].y,paths[j][(i-1)%(paths[j].length-1)].x,paths[j][(i-1)%(paths[j].length-1)].y);
    }
  }
}
