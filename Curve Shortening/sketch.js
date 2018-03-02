var paths = [];
var newPath = [];
var segLength = 5;
var dt = 1;

var manageCurves = function(curves){
  for(var j = 0; j < curves.length; j++){
    if(curves[j].length < 5) curves.splice(j,1);
    if(j == curves.length) break;
    var curve = curves[j];

    //Kill points with infinite coordinates
    for(var i = 0; i < curve.length; i++){
      var a = curve[i];
      if(!(isFinite(a.x) && isFinite(a.y))){
        curve.splice(i--, 1);
      }
    }

    //Redistributes points evenly along curve
    for (var i = 0; i < curve.length; i++){
      var a = curve[i];
      var bi = (i < curve.length - 1 ? i+1 : 0), b = curve[bi];
      var dx = b.x - a.x;
      var dy = b.y - a.y;

      var dr2 = dx*dx + dy*dy;
      if(dr2 > 4*segLength*segLength){
        var dr = Math.pow(dr2, 1/2);
        curve.splice(i+1, 0, {
          x: a.x + segLength * dx/dr,
          y: a.y + segLength * dy/dr
        });
      }
      else if(curve.length > 4 && dr2 * 4 < segLength * segLength){
        curve.splice(i--,1);
      }
    }

    //Calculate Curvature
    var maxK = 0;
    var mean = {x: 0, y: 0};
    for(var i = 0; i < curve.length; i++){
      var a = curve[i];
      var bi = (i < curve.length-1 ? i+1 : 0), b = curve[bi];
      var ci = (i < curve.length-2 ? i+2 : i+2 - curve.length), c = curve[ci];

      var dx = b.dx = .5*(c.x - a.x);
      var dy = b.dy = .5*(c.y - a.y);
      var ddx = b.ddx = c.x - 2*b.x + a.x;
      var ddy = b.ddy = c.y - 2*b.y + a.y;

      var dr2 = b.dr2 = dx*dx + dy*dy;

      if(dr2 == 0){
        curve.splice(i--,2);
        continue;
      }

      var k = b.k = (dx*ddy - dy*ddx)/Math.pow(dr2,3/2);

      if(Math.abs(k) > maxK) maxK = Math.abs(k);

      mean.x += b.x;
      mean.y += b.y;
    }
    mean.x /= curves.length;
    mean.y /= curves.length;

    //Making the New Boi!
    var newCurve = JSON.parse(JSON.stringify(curve));
    for(var i = 0; i < curve.length; i++){
      var b = curve[i];

      var dx = b.dx;
      var dy = b.dy;
      var dr2 = b.dr2;
      var k = b.k;

      newCurve[i] = {
        x: b.x + b.ddx * dt / (dr2 * maxK),
        y: b.y + b.ddy * dt / (dr2 * maxK),
        k: k
      };
      //Killing the curve if the new curve goes out of bounds (Which it shouldnt)
      if (newCurve[i].x > windowWidth + 1
                    || newCurve[i].x < -1
                    || newCurve[i].y > windowHeight +1
                    || newCurve[i].y < -1) {
                newCurve.splice(i,1);
                curve.splice(i--,1);
}
    }
    curve = curves[j] = newCurve;
  }
}

var csf = function(){
  var drawing = false;
  //easily call mouse position in a tuple
  var pt = {
    x: mouseX,
    y: mouseY
  };
  //drawing and logging the path the user is drawing
  if(mouseIsPressed){
    drawing = true;
    newPath.push(pt);
    if(dist(mouseX, mouseY, newPath[newPath.length-1].x, newPath[newPath.length-1].y) >= segLength){
      newPath.push(pt);
    }
  }
  //adding the newly drawn path to the path list
  else if(!mouseIsPressed){
    if(drawing = true){
       paths.push(newPath);
    }
    drawing = false;
    newPath = [];
  }
  clear();
  //drawing the new path and the other paths
  if(newPath.length > 1){
    stroke(1);
    for (var i = 2; i < newPath.length+1; i++){
      line(newPath[i-2].x,newPath[i-2].y,newPath[(i-1)%(newPath.length-1)].x,newPath[(i-1)%(newPath.length-1)].y);
    }
  }
  for(var j = 0; j < paths.length; j++){
    for (var i = 2; i < paths[j].length+1; i++){
      stroke(255,0,150,100);
      strokeWeight(3);
      line(paths[j][i-2].x,paths[j][i-2].y,paths[j][(i-1)%(paths[j].length-1)].x,paths[j][(i-1)%(paths[j].length-1)].y);
    }
  }
  //do stuff!
  manageCurves(paths);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  csf();
}
