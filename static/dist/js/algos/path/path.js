
function Path(){

     this.mywidth =800;
     this.myheight = 600;
     this.speed = 100;
     this.cols = 100;
     this.rows = 100;

     this.grid = new Array(this.cols);

     this.openSet = [];
     this.closedSet = [];
     this.start = NaN;
     this.end = NaN;

     this.w = 0;
     this.h = 0;
     this.path = [];
     this.current = NaN;


     
     this.removeCurrent = function (arr,elem) {

         for (let i = arr.length-1; i >=0; i--){
             if (arr[i] === elem){
                arr.splice(i,1);
             }
         }
     };

     this.heuristic = function (a,b) {
         //let d = dist(a.i,a.j,b.i,b.j);
         // let d = abs(a.i - b.i) + abs(a.j - b.j);
         return dist(a.i,a.j,b.i,b.j);
     };
     
     this.evaluatePath = function () {
            this.path = [];

            let temp = this.current;
            this.path.push(temp);
            while (temp.previous){
                this.path.push(temp.previous);
                temp = temp.previous;
            }
     };

     this.visualpath = function ()
     {
        for (let i = 0; i < this.cols; i++) for (let j = 0; j < this.rows; j++) this.grid[i][j].show(color(255));
        for (let i = 0; i < this.closedSet.length; i++) this.closedSet[i].show(color(255,0,0));
        for (let i = 0; i < this.openSet.length; i++) this.openSet[i].show(color(0,255,0));
        for (let i = 0; i < this.path.length; i++) this.path[i].show(color(0,0,255));
     };
}


function Spot(i,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.previous = undefined;

    this.wall = random(1) < 0.5;
    
    this.show = function (col)
    {
        if (!this.wall) {
            fill(col);
        } else {
            fill(0);
        }
        noStroke();
        rect(this.i*thispath.w,this.j*thispath.h, thispath.w - 1,thispath.h - 1);
    };
    
    this.addNeighbors = function (grid) {
        let i = this.i;
        let j = this.j;

        if (i < thispath.cols - 1){
            this.neighbors.push(grid[i+1][j]);
        }

        if (i > 0){
            this.neighbors.push(grid[i - 1][j]);
        }

        if (j < thispath.rows -1 ){
            this.neighbors.push(grid[i][j+1]);
        }

        if (j > 0){
            this.neighbors.push(grid[i][j-1]);
        }

        if (i > 0 && j > 0){
            this.neighbors.push(grid[i - 1][j - 1]);

        }
        if (i < thispath.cols - 1 && j > 0){
            this.neighbors.push(grid[i + 1][j - 1]);

        }
        if (i > 0   && j < thispath.rows -1 ){
            this.neighbors.push(grid[i - 1][j + 1]);

        }
        if (i < thispath.cols -1  && j < thispath.rows - 1){
            this.neighbors.push(grid[i + 1][j + 1]);

        }

    }
}

function setup(){
    thispath = new Path();
    createCanvas(thispath.mywidth,thispath.myheight);
    frameRate(thispath.speed);
    for (let i = 0; i < thispath.cols; i++){
        thispath.grid[i] = new Array(thispath.rows);
        for (let j = 0; j < thispath.rows; j++) thispath.grid[i][j] = new Spot(i, j);
    }
    for (let i = 0; i < thispath.cols; i++) for (let j = 0; j < thispath.rows; j++) thispath.grid[i][j].addNeighbors(thispath.grid);

    thispath.start = thispath.grid[0][0];
    thispath.end = thispath.grid[thispath.cols-1][thispath.rows-1];
    thispath.start.wall = false;
    thispath.end.wall = false;

    thispath.openSet.push(thispath.start);

    thispath.w = width/thispath.cols;
    thispath.h = height/thispath.rows;

    //console.table(thispath.grid)
}




function draw(){
    if (thispath.openSet.length > 0)
    {

        let winner = 0;
        for (let i = 0; i < thispath.openSet.length; i++) if (thispath.openSet[i].f < thispath.openSet[winner].f) winner = i;

        thispath.current = thispath.openSet[winner];

        if (thispath.current === thispath.end)
            {
                //find the path
                thispath.evaluatePath();
                noLoop();
                console.log('done!');
            }

        thispath.removeCurrent(thispath.openSet,thispath.current);
        thispath.closedSet.push(thispath.current);


        let neighbors = thispath.current.neighbors;
        for (let i =0; i < neighbors.length; i++)
        {
            let neighbor = neighbors[i];
            if (!thispath.closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = thispath.current.g + 1;

                let newPath = false;
                if (thispath.openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    thispath.openSet.push(neighbor);
                }
                if (newPath){
                    neighbor.h = thispath.heuristic(neighbor, thispath.end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = thispath.current;
                }
            }
        }

    }else{
        noLoop();
        return;
    }

    background(0);
    thispath.evaluatePath();
    thispath.visualpath();
}