var circles = [];

function setup() {
  createCanvas(500, 500);
  for(var i = 0; i < 500; i++){
    var circle = {
      x: random(500),
      y: random(500),
      r: 0
    }
    var overlap = false;
    while(circle.r < 250 && !overlap){
      console.log(circle.r);
      for (var j = 0; j < circles.length; j++){
        temp = circles[j];
        d2 = dist(circle.x, circle.y, temp.x, temp.y);
        if(d2 < circle.r + temp.r || circle.x + circle.r > 500){
          overlap = true;
          console.log(2);
          break;
        }
      }
      circle.r = circle.r + 1;
    }
    if(circle.r > 5){
      circle.r = circle.r - 1;
      circles.push(circle);
    }
  }
  for(var i = 0; i < circles.length; i++){
    noFill();
    ellipse(circles[i].x, circles[i].y, circles[i].r*2, circles[i].r*2);
  }
}

function draw() {

}
