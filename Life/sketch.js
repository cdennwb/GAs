var cellSize = 5;
var winSize = 600;

function cell(){
  this.x;
  this.y;
  this.len;
  this.state;
}

function display(cell){
  if(cell.state){
    fill(255,255,255);
  }else{
    fill(0,0,0);
  }
  noStroke();
  rect(cell.x, cell.y, cell.len, cell.len);
}

function displayAll(cells){
  console.log(cells.length);
  for(var i = 0; i < cells.length; i++){
    display(cells[i]);
  }
}

function makePop(){
  var grid = [];
  for(var i = 0; i < winSize/cellSize; i++){
    for(var j = 0; j < winSize/cellSize; j++){
      newCell = new cell;
      newCell.x = j*cellSize;
      newCell.y = i*cellSize;
      newCell.len = cellSize;
      newCell.state = false;
      grid.push(newCell);
    }
  }
  return grid;
}

function nextPop(cells){
  newPop = [];
  for(var i = 0; i < cells.length; i++){
    newCell = cells[i];
    neighbors = 0;
    for(var j = -1; j < 2; j++){
      neighbors = (cells[(i-winsize-j)%winSize].state ? neighbors + 1 : neighbors);
      neighbors = (cells[(i+winsize-j)%winSize].state ? neighbors + 1 : neighbors);
    }
    if(i % winSize != 0){
      neighbors = (cells[(i-1)%winSize].state ? neighbors + 1 : neighbors);
    }
    if( i% winSize != winSize-1){
      neighbors = (cells[(i+j)%winSize].state ? neighbors + 1 : neighbors);
    }
    if(newCell.state){
      newCell.state = neighbors >= 2 && neighbors < 4;
    }else{
      newCell.state = neighbors == 3;
    }
    newPop.push(newCell);
  }
  return newPop;
}

function life(list){
  displayAll(list);
  list = newPop(list);
}
function setup(){
  createCanvas(winSize, winSize);
}
function draw(){
  life();
}
