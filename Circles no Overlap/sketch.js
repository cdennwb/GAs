var circle = function(_x, _y, _r){
  var circ = {
    x: _x,
    y: _y,
    r: _r
  };
  return circ;
}

var win = {
  x: 5000,
  y: 3000
};

var notTouching = function(circ, list){
  if(dist(circ.x, circ.y, 0, circ.y) <= circ.r ||
    dist(circ.x, circ.y, win.x, circ.y) <= circ.r ||
    dist(circ.x, circ.y, circ.x, 0) <= circ.r ||
    dist(circ.x, circ.y, circ.x, win.y) <= circ.r){
      return false;
  }
  if(list.length != 0){
    for(var i = 0; i < list.length; i++){
      if(dist(circ.x, circ.y, list[i].x, list[i].y) <= circ.r + list[i].r){
        return false;
      }
    }
  }
  return true;
}

var display = function(circle){
  ellipse(circle.x, circle.y, circle.r*2, circle.r*2);
}

var growCircle = function(current, circleList){
  if(notTouching(current, circleList)){
    current.r += .01;
  }else{
    if(current.r != 0){
      circleList.push(current);
    }return 0;
  }
}

var makeCircle = function(){
  return circle(Math.random()*win.x, Math.random()*win.y,0);
}

var a = makeCircle();
var circles = [];


function setup(){
  //frameRate(30);
  strokeWeight(0);
  createCanvas(win.x, win.y);
}
function draw(){
  growCircle(a, circles);
  display(a);
  if(growCircle(a, circles) == 0){
    a = makeCircle();
  }
}
