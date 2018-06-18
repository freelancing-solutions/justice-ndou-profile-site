
let boardCanvas = d3.select("#checkersBoard");

function Init(){
 startGame({
     x: 0,
     y: 0
 }, 70, boardCanvas);
}

Init();


document.getElementById('startGameButt').addEventListener("click", function(){
startGame({
    x: 0,
    y: 0
}, 70, boardCanvas);
});

//replayAll({x: 0, y: 0}, 70, boardCanvas)

document.getElementById('btnReplay').addEventListener("click", function(){
    replayAll({
        x: 0,
        y: 0
    }, 70, boardCanvas);
});