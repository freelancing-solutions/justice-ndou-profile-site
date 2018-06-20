



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


let ball = {
    radius: 10,
    ballcolour : "blue",
    x: canvas.width / 2,
    y: canvas.height -30,
    dx:2,
    dy: -2,
    maxspeed: 20,
    pi: Math.PI * 2,
    score: 0,
    player: "joe",
}
let mypi = Math.PI * 2;

let paddle = {
    
    h: 10,
    w: 120,
    x: (canvas.width - 120) / 2,
    colour: 'red',
    rightKeyPressed: false,
    leftKeyPressed: false,
    pdx: 7,
}

let bullets = {
    radius: 10,
    colour: "black",
    gun1: paddle.x,
    gun2: paddle.x + paddle.w,
    gun1_x: paddle.x,
    gun1_y: paddle.h,
    gun2_x: paddle.x + paddle.w,
    gun2_y: paddle.h,
    dx:4,
    dy:-4,
    pi: Math.PI*2,
}

let fame = {
    score: 0,
    gameNumber:0,
}

high_scores = [];

function calculateX(w){
    return (canvas.width - w)/2
}



function displayScore(){
    document.getElementById('scoreid').innerHTML = ball.score;
    //document.getElementById('playernameid').innerHTML = ball.player;
}


function keyDownHandler(event){
    if (event.keyCode == 39){
        paddle.rightKeyPressed = true;
    }else if(event.keyCode == 37){
        paddle.leftKeyPressed = true;
    }
}

function keyUpHandler(event){
    if (event.keyCode == 39){
        paddle.rightKeyPressed = false;

    }else if (event.keyCode == 37){
        paddle.leftKeyPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler,false);
document.addEventListener('keyup', keyUpHandler, false);

function MakeMovement(){
    if((paddle.rightKeyPressed == true) && ((paddle.x + paddle.w) < canvas.width)){
        paddle.x += paddle.pdx;
    } else if((paddle.leftKeyPressed == true) && (paddle.x > 0)){
        paddle.x -= paddle.pdx;
    }
}

//use phaser js to build games
//

function startNewGame(){
    let colourRanges = ["orange", "yellow", "blue"];
    i = 0;
    ball.dx = 1;
    ball.dy = -1;
    ball.x = canvas.width/2;
    ball.y = canvas.height - 30;
    ball.ballcolour = colourRanges[i];
    ball.score = 0;
    if (i < 3){
        i += 1;
    }else{
        i = 0;
    }    
}

function collisionDetection(){
    if (((ball.x + ball.dx) > (canvas.width - ball.radius)) || ((ball.x + ball.dx) < ball.radius)){
        ball.dx = -ball.dx;
        ball.score += 10;
    }

    if (ball.y + ball.dy < ball.radius || (
    (ball.y + ball.dy > (canvas.height - paddle.h - ball.radius)) &&
    ((ball.x + ball.dx) > paddle.x) &&
((ball.x + ball.dx) < (paddle.x + paddle.w))
))    
    {
        ball.dy = -ball.dy;
        ball.score += 15;
    }else if (ball.y + ball.dy > canvas.height){
        startNewGame();
    }

}

function drawArena(){
    ctx.fillStyle = '#000'; //try a fill of white
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x,canvas.height - paddle.h,paddle.w,paddle.h);
    ctx.fillStyle = paddle.colour;
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, ball.pi);
    ctx.fillStyle = ball.ballcolour;
    ctx.fill();
    ctx.closePath();
    //Move ball to the enxt coordinates
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function drawBullet(){
    ctx.beginPath();
    ctx.arc(bullets.gun1_x,bullets.gun1_y,bullets.radius,0,bullets.pi);
    ctx.fillStyle = bullets.colour;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(bullets.gun2_x,bullets.gun2_y,bullets.radius,0,bullets.pi);
    ctx.fillStyle = bullets.colour;
    ctx.fill();
    ctx.closePath();
}

function draw(){
    //do stuff
    drawArena();
    drawBall();
    drawPaddle();
    //drawBullet();
    collisionDetection();
    MakeMovement();
    displayScore();



    //bullets.gun1_x += bullets.dx;
    //bullets.gun1_y += bullets.dy;

    //x += dx;
    //y += dy;    
    requestAnimationFrame(draw);    
}
requestAnimationFrame(draw);
