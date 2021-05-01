
function setup(){
    thismaze = new Maze();

    createCanvas(thismaze.mywidth,thismaze.myheight);
    thismaze.sidebar = createP(' ');
    thismaze.fr = createP(' ');
    frameRate(thismaze.speed);
    for (let j = 0; j < thismaze.rows; j++){
        let Pcols = new Array(thismaze.cols);
        for (let i = 0; i < thismaze.cols; i++){
            let cell = new Cell(j,i);
            Pcols[i] = cell;

        }
        thismaze.grid[j] = Pcols;
    }

    console.log(thismaze.grid);



    thismaze.current = thismaze.grid[0][0];
    console.log(thismaze.current);
    thismaze.w = width/thismaze.cols;
    thismaze.h = height/thismaze.rows;
}

Maze = function () {

    this.mywidth = 800;
    this.myheight = 600;
    this.cols = 20;
    this.rows = 20;
    //this.resolution = 20; //Influences size of maze
    this.speed = 100;

    this.current = NaN;

    this.stack = [];


    this.grid = new Array(this.rows);

    this.pathspace = [];


    this.OpenSet = [];
    this.closedSet = [];
    this.start = undefined;
    this.end = undefined;

    this.w = 0;
    this.h = 0;

    this.path = [];

    this.solverfirstrun = true;



    this.removeCurrent = function (arr, elem) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === elem) {
                arr.splice(i, 1);
            }
        }

    };

    this.heuristic = function (a, b) {
        //let d = dist(a.i,a.j,b.i,b.j);
        // let d = abs(a.i - b.i) + abs(a.j - b.j);
        return dist(a.i, a.j, b.i, b.j);
    };

    this.evaluatePath = function () {
        this.path = [];

        let temp = this.current;
        this.path.push(temp);
        while (temp.previous) {
            this.path.push(temp.previous);
            temp = temp.previous;
        }
    };

    this.visualpath = function () {
        for (let i = 0; i < this.cols; i++) for (let j = 0; j < this.rows; j++) this.grid[i][j].showPath(color(255));
        for (let i = 0; i < this.closedSet.length; i++) this.closedSet[i].showPath(color(255, 0, 0));
        for (let i = 0; i < this.OpenSet.length; i++) this.OpenSet[i].showPath(color(0, 255, 0));
        for (let i = 0; i < this.path.length; i++) this.path[i].showPath(color(0, 0, 255));
    };


    this.fr = NaN;
    this.sidebar = NaN;


    this.sidebartext = `
     `;


    this.footertext = ``;

    // this.index = function (i, j) {
    //     if (i < 0 || j < 0 || i > thismaze.cols - 1 || j > thismaze.rows - 1) {
    //         return -1;
    //     }
    //
    //     return i + j * thismaze.cols;
    // };

    this.removeWalls = function (a, b) {
        let x = a.i - b.i;
        if (x === 1) {
            a.walls[3] = false;
            b.walls[1] = false;

        } else if (x === -1) {
            a.walls[1] = false;
            b.walls[3] = false;
        }

        let y = a.j - b.j;
        if (y === 1) {
            a.walls[0] = false;
            b.walls[2] = false;

        } else if (y === -1) {
            a.walls[2] = false;
            b.walls[0] = false;
        }
    };

    this.UpdateScreen = function () {
        this.sidebar.html(this.sidebartext);
        this.fr.html(this.footertext);

    };


    this.AStarSolver = function () {
        if (this.OpenSet.length > 0) {

            let winner = 0;
            for (let i = 0; i < this.OpenSet.length; i++) if (this.OpenSet[i].f < this.OpenSet[winner].f) winner = i;

            this.current = this.OpenSet[winner];

            if (this.current === this.end) {
                //find the path
                this.evaluatePath();
                noLoop();
                console.log('done!');
            }

            this.removeCurrent(this.OpenSet, this.current);
            this.closedSet.push(this.current);


            let neighbors = this.current.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                if (!this.closedSet.includes(neighbor)) {
                    let tempG = this.current.g + 1;

                    let newPath = false;
                    if (this.OpenSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } else {
                        neighbor.g = tempG;
                        newPath = true;
                        this.OpenSet.push(neighbor);
                    }
                    if (newPath) {
                        neighbor.h = this.heuristic(neighbor, this.end);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = this.current;
                    }
                }
            }

        } else {
            noLoop();
            return;
        }


        this.evaluatePath();
        this.visualpath();
    };
};

function draw(){
    background(51);
    for (let i = 0; i < thismaze.cols; i++){
        for (let j = 0; j < thismaze.rows; j++){
            thismaze.grid[i][j].show();
        }

    }

    thismaze.UpdateScreen();

    thismaze.current.visited = true;
    thismaze.current.myhighlight();



    let next = thismaze.current.checkNeighbors();

    if (next){
        next.visited = true;

        thismaze.stack.push(thismaze.current);

        thismaze.removeWalls(thismaze.current,next);

        thismaze.current = next;
    }else if (thismaze.stack.length > 0){
        thismaze.current = thismaze.stack.pop();
    }


    if (thismaze.stack.length === 0)
    {
        if (thismaze.solverfirstrun)
            {

                //for (let i = 0; i < thismaze.cols; i++) for (let j = 0; j < thismaze.rows; j++) thismaze.grid[i][j].addNeighbors(thismaze.grid);


                thismaze.start = thismaze.grid[0][0];
                thismaze.end = thismaze.grid[thismaze.cols - 1][thismaze.rows - 1];
                thismaze.start.wall = false;
                thismaze.end.wall = false;


                thismaze.OpenSet.push(thismaze.start);

                thismaze.solverfirstrun = false;

            }

        thismaze.AStarSolver();
    }

    thismaze.UpdateScreen();
}
//constructor
function Cell(i,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.previous = undefined;
    this.neighbors = [];
                 //top,right,bottom,left
    this.walls = [true,true,true,true];

    this.visited = false;


    this.checkNeighbors = function () {
        let neighbors = [];
        if (i < 0 || j < 0 || i > thismaze.cols - 1 || j > thismaze.rows - 1){
            return -1;
        }

        let neighborgrids = [];

       try{
           //neighborgrids.push(thismaze.grid[i][j - 1]);
       }catch(err) {
           //
           console.log(err);
       }

       try{
            neighborgrids.push(thismaze.grid[i+1][j]);
       }catch (err) {
           // no need
           //console.log(err);
       }

       try{
        neighborgrids.push(thismaze.grid[i][j + 1]);
       }catch(err){
           //console.log(err);
       }

       try{
            neighborgrids.push(thismaze.grid[i - 1][j]);
       }catch(err){
           //left = undefined;
           //console.log(err);
       }
        //neighborgrids = [thismaze.grid[i][j - 1],thismaze.grid[i+1][j],thismaze.grid[i][j + 1],thismaze.grid[i - 1][j] ];
        for (let i = 0; i < neighborgrids.length; i++){
            if (neighborgrids[i] && !neighborgrids[i].visited){
                neighbors.push(neighborgrids[i]);
            }
        }
        //console.table(neighbors);

        this.neighbors = neighbors;

        if (neighbors.length > 0){
            let r = floor(random(0,neighbors.length));
            return neighbors[r];

        }else{
            return undefined;
        }
    };



    this.myhighlight = function () {
        let x = this.i*thismaze.w;
        let y = this.j*thismaze.h;
        noStroke();
        fill(0,130,0,100);
        rect(this.i * this.w,this.j * this.h,this.w - 1,this.h -1);

    };
    this.show =function () {
        let x = this.i*thismaze.w;
        let y = this.j*thismaze.h;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + thismaze.w, y);
        }
        if (this.walls[1]) {
            line(x + thismaze.w, y, x + thismaze.w, y + thismaze.h);
        }
        if (this.walls[2]) {
            line(x + thismaze.w, y + thismaze.h, x, y + thismaze.h);
        }
        if (this.walls[3]) {
            line(x, y + thismaze.h, x, y);
        }

        if (this.visited){
            noStroke();
            fill(255,0,255,100);
            rect(x,y,thismaze.w ,thismaze.h );
        }

    };

    this.showPath = function ()
    {
        fill(0);
        noStroke();
        rect(this.i*thismaze.w,this.j*thismaze.h, thismaze.w - 1,thismaze.h - 1);

    };

     this.addNeighbors = function (grid)
         {
                let i = this.i;
                let j = this.j;
                //top,right,bottom,left
                for (i = 0; i < this.walls.length; i++)
                    {
                        if (!this.walls[i])
                            {
                                if (i === 0){
                                    this.neighbors.push(grid[i][j+1]);
                                    // this.neighbors.push(grid[i][j+1]);
                                }
                                if (i === 1){
                                    this.neighbors.push(grid[i+1][j]);
                                    // this.neighbors.push(grid[i+1][j]);
                                }
                                if (i === 2){
                                    this.neighbors.push(grid[i][j - 1]);
                                    // this.neighbors.push(grid[i][j-1]);
                                }
                                if (i === 3){
                                    this.neighbors.push(grid[i-1][j]);
                                    // this.neighbors.push(grid[i - 1][j]);
                                }
                            }
                    }
         }
}


