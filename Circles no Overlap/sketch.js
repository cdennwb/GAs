var circle = function(_x, _y, _r){
  var circ = {
    x: _x,
    y: _y,
    r: _r
  };
  return circ;
}

var makecolor = function(_r, _g, _b){
  var a = {
    r: _r,
    g: _g,
    b: _b
  };
  return a;
}

var colors = [
  makecolor(230, 57, 70), makecolor(241, 250, 238), makecolor(168, 218, 220),
  makecolor(69, 123, 157), makecolor(29, 53, 87)
]

var win = {
  x: 1920*3,
  y: 1080*3
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
  if(circ.r > 100){
    return false;
  }
  return true;
}

var display = function(circle){
  fill(255*circle.x/win.x, circle.y*255/win.y, 255*circle.x*circle.y/(win.y * win.y));
  ellipse(circle.x, circle.y, circle.r*2, circle.r*2);
}

var growCircle = function(current, circleList){
  if(notTouching(current, circleList)){
    current.r += 1;
  }else{
    if(current.r != 0){
      // var color = colors[parseInt(Math.random()*5)];
      // fill(color.r, color.g, color.b);
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
  createCanvas(win.x, win.y);
}
function draw(){
  growCircle(a, circles);
  display(a);
  if(growCircle(a, circles) == 0){
    a = makeCircle();
  }
}
