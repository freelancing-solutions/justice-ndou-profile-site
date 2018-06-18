var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let ball = {
    radius: 10,
    ballcolour : "blue",
    x: canvas.width / 2,
    y: canvas.height -30,
    dx:1,
    dy: -1,
    maxspeed: 20,
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

function calculateX(w){
    return (canvas.width - w)/2
}

let dx = 2;
let dy = -2;
let pdx = 7;



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
        paddle.x += pdx;
    } else if((paddle.leftKeyPressed == true) && (paddle.x > 0)){
        paddle.x -= pdx;
    }
}

//use phaser js to build games
//

function startNewGame(){
    dx = 1;
    dy = 1;
}

function collisionDetection(){
    if (((ball.x + ball.dx) > (canvas.width - ball.radius)) || ((ball.x + ball.dx) < ball.radius)){
        ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius || (
    (ball.y + ball.dy > (canvas.height - paddle.w - ball.radius)) &&
    ((ball.x + ball.dx) > paddle.x) &&
((ball.x + ball.dx) < (paddle.x + paddle.w))
))    
    {
        ball.dy = -ball.dy;
    }else if (ball.y + ball.dy > canvas.height){
        startNewGame();
    }

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
    ctx.arc(ball.x, ball.y, ball.radius, 0, mypi);
    ctx.fillStyle = ball.ballcolour;
    ctx.fill();
    ctx.closePath();
}

function draw(){
    //do stuff
    ctx.clearRect(0,0, canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    collisionDetection();
    MakeMovement();
    ball.x += dx;
    ball.y += dy;
    //x += dx;
    //y += dy;    
    requestAnimationFrame(draw);    
}
requestAnimationFrame(draw);
