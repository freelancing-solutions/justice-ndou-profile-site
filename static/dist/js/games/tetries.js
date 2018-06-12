const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20,20);
 const arena = createMatrix(12, 20);
 console.log(arena);
 console.table(arena);

 const player = {
     pos: {
         x: 0,
         y: 0
     },
     matrix:null,
     pieceindex: 0,
     score:0,
     name:"mobius-crypt",
     rowCount:1,
     powerup:1,
     dropInterval:1000,
 }

colours = [
    null,
    '#FF0D72',
    '#ODE2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

function arenaSweep(){

    outer : for (let y = arena.length - 1; y > 0; --y){
        for (let x = 0; x < arena[y].length; ++x){
            if (arena[y][x] === 0){
                continue outer;
            }
            
        }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
        ++y;
        if(player.rowCount === 10){
            player.powerup = player.powerup * 2;
            player.score += player.rowCount * 10 * player.powerup;
            player.dropInterval = player.dropInterval - 50;
            player.rowCount  = 1;
        }else{
            player.score += player.rowCount * 10;
            player.rowCount  += 1;
        }
    }
}

function collide(arena,player){
    const [m,p] = [player.matrix,player.pos];
    for (let y = 0; y < m.length; ++y){
        for (let x = 0; x < m[y].length; ++x){
            if (m[y][x] !== 0 && 
                (arena[y + p.y] &&
                    arena[y + p.y][x + p.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w,h){
    const matrix = [];
    while (h--){
        matrix.push(new Array(w).fill(0))
    }
    return matrix
}

function createPiece(type){
    if (type === "T"){
        return [
               [0, 0, 0], [1, 1, 1], [0, 1, 0],
        ];
    }else if (type === "O"){
        return [
            [2,2],[2,2],
        ];
    } else if (type === "L") {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === "J") {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === "I") {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === "S") {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === "Z") {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function draw(){
    context.fillStyle = '#000'; //try a fill of white
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x:0,y:0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix,offset){
    matrix.forEach((row,y) =>{
        row.forEach((value,x) => {
            if (value !== 0){
                context.fillStyle = colours[value];
                context.fillRect(x + offset.x , y + offset.y , 1, 1);
            }
        });
    });
}

function merge(arena,player){
    player.matrix.forEach((row,y) => {
        row.forEach((value,x) => {
            if (value !== 0 ){
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });

}

function playerDrop(){
        player.pos.y++; //move down
        if(collide(arena,player) == true){

            player.pos.y--;
            merge(arena,player);
            playerReset();
            arenaSweep();
            updateDisplay();
            
        }
        dropCounter = 0;    
}
function playerMove(dir){
    player.pos.x += dir;
    if (collide(arena, player)){
        player.pos.x -= dir;

    }
}

function playerReset(){
    const pieces = 'ILJOTSZ';
    //player.matrix = createPiece(pieces[(pieces.length + Math.random() | 0)-1]);
    player.matrix = createPiece(pieces[player.pieceindex])
    
    if (player.pieceindex == (pieces.length - 1)){
        player.pieceindex = 0;

    }else{
        player.pieceindex++;
    }

    player.pos.y = 0;
    player.pos.x = ((arena[0].length / 2) | 0) - ((player.matrix[0][0].length / 2) | 0);

    if (collide(arena,player)){
        arena.forEach(row => row.fill(0));
        player.score = 0;
        player.dropInterval = 1000;
        player.powerup = 1;
    }
}

function playerRotate(dir){
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix,dir);
    while (collide(arena, matrix)){
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length){
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }

    }


}

function rotate(matrix,dir){
    for (let y= 0; y < matrix.length; ++y){
        for (let x = 0; x < y; ++x){
            [
                matrix[x][y],
                matrix[y][x],
            ]=[
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0){
        matrix.forEach(row => row.reverse());
    }else{
        matrix.reverse();
    }
}
let dropCounter = 0;

let lasttime = 0;

function update(time= 0){
    //console.log(time);
    const deltaTime = time - lasttime;
    lasttime = time;
    dropCounter += deltaTime;
    if (dropCounter > player.dropInterval){
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);    
}

function updateDisplay(){

    let display = 'score : ' + player.score + ' Player : ' + player.name;
    document.getElementById('display').innerHTML =display;
     
}

document.addEventListener('keydown', event => {
    console.log(event);
    if (event.keyCode == 37){
        playerMove(-1);
    }else if (event.keyCode == 39){
        playerMove(1);
    }else if (event.keyCode == 40){
        playerDrop();
    }else if (event.keyCode == 81){
        playerRotate(-1);
    }else if (event.keyCode == 38){
        playerRotate(1);
    }
})
playerReset();
updateDisplay();
update();