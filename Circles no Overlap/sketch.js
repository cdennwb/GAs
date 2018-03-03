var circle = function(_x, _y, _r){
  var circ = {
    x: _x,
    y: _y,
    r: _r
  };
  return circ;
}

var allCircles = [];

var display = function(shapes){
  clear();
  for(var i = 0; i < shapes.length; i++){
    ellipse(shapes[i].x, shapes[i].y, shapes[i].r*2, shapes[i].r*2);
  }
}

var notInside = function(circ, circles){
  for(var i = 0; i < circles.length; i++){
    if(circ.x < circles[i].x - circles[i].r
       && circ.y < circles[i].y - circles[i].r
       && circ.x > circles[i].x + circles[i].r
       && circ.y > circles[i].y + circles[i].r){
         return false;
       }
  }
  return true;
}

var notTouching = function(circ, circles){
  for(var i = 0; i < circles.length; i++){
    if(dist(circ.x, circ.y, circles[i].x, circles[i].y) < circ.r + circles[i].r){
      return false;
    }
  }
  return true;
}
var manageCircs = function(circles){
  var newCircle = circle(random(windowWidth), random(windowHeight), 0);
  console.log(newCircle.x, newCircle.y, newCircle.r);
  if(notInside(newCircle, circles)){
    while(notTouching){
      newCircle.r += 1;
      ellipse(newCircle.x, newCircle.y, newCircle.r*2, newCircle.r*2);
      display(circles);
    }
    circles.push(newCircle);
  }
}

function setup(){
  createCanvas(windowWidth, windowHeight);
}
function draw(){
  manageCircs(allCircles);
}
