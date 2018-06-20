let snake;
let scl = 20;
let food;
let eatfruitsound;
let gameoversound;
let runningsound;

function preload () {
  eatfruitsound = loadSound('/static/dist/sound/eat-fruit.mp3');
  gameoversound = loadSound('/static/dist/sound/die.mp3');
  runningsound = loadSound('/static/dist/sound/eating.mp3');
}

function setup () {
  createCanvas(
    800,
    600);
  snake = new Snake();
  frameRate(snake.speed);
  pickLocation();
}

function pickLocation () {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw () {
  background(51, 91);
  snake.gameover();
  snake.updated();

  snake.show();
  

  if (snake.eat(food)) {
    eatfruitsound.play();
    pickLocation();
  }


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed () {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}
