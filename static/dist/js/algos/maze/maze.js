



function setup(){
    thismaze = new Maze();

    createCanvas(thismaze.mywidth,thismaze.myheight);
    thismaze.sidebar = createP(' ');
    thismaze.fr = createP(' ');
    thismaze.cols = floor(width/thismaze.resolution);
    thismaze.rows = floor(height/thismaze.resolution);
    frameRate(thismaze.speed);

    for (let j = 0; j < thismaze.rows; j++){
        for (let i = 0; i < thismaze.cols; i++){
            let cell = new Cell(i,j);
            thismaze.grid.push(cell);
        }
    }
    thismaze.current = thismaze.grid[0];

}



Maze = function () {

     this.mywidth =1000;
     this.myheight = 600;
     this.cols=0;
     this.rows=0;
     this.resolution = 10;
     this.speed = 100;

     this.current = NaN;

     this.stack = [];


     this.grid = [];

     this.fr = NaN;
     this.sidebar = NaN;

     this.sidebartext = `
                 <!-- Left side column. contains the sidebar -->
              <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                  <!-- Sidebar user panel -->
                  <div class="user-panel">
                    <div class="pull-left image">
                      <img src="/static/dist/img/justice.jpg" id="strSideUserImageID" class="img-circle" alt="SA-SMS">
                    </div>
                    <div class="pull-left info">
                        <p id="strSideUserNameID"><a href="/login">Please Login</a></p>
                    </div>
                  </div>
                  <!-- search form -->
                  <form action="#" method="get" class="sidebar-form">
                    <div class="input-group">
                      <input type="text" name="q" class="form-control" placeholder="Search...">
                          <span class="input-group-btn">
                            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                            </button>
                          </span>
                    </div>
                  </form>
                  <!-- /.search form -->
                  <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu">
                    <div id="SideBarMenu"><ul class="sidebar-menu">
                    <li class="header">J-Ndou</li>
                    <li class="treeview">
                      <li><a href="/" title="Justice Ndou"><i class="glyphicon glyphicon-home"></i> <strong>Home</strong></a></li>
                      <li><a href="/about" title="About Justice Ndou"><i class="glyphicon glyphicon-info-sign"></i> <strong>About</strong></a></li>
                      <li><a href="/contact" title="Contact Justice Ndou"><i class="glyphicon glyphicon-envelope"></i> <strong>Contact</strong></a></li>
                    </li>
                    <li>
                      <a href="/blog" title="Justice Ndou Personal Blog">
                        <i class="fa fa-book"> </i>
                        <strong> Blog</strong>
                      </a>
                    </li>
            <li>
              <a href="/games" title="Justice Ndou HTML Games">
                <i class="fa fa-gamepad"> </i>
                <strong> Games</strong>
              </a>
            </li>
            <li>
                <a href="/algorithms" title="Algorithms with Justice Ndou">
                  <i class="fa fa-code-fork"> </i>
                  <strong> Algorithms</strong>
                </a>
              </li>
            
            <li>
              <a href="/dashboard" title="Justice Ndou Personal Blog">
                <i class="fa fa-dashboard"> </i>
                <strong> Dashboard</strong>
              </a>
            </li>
            
            </ul></div>
                    </ul>
                </section>
                <!-- /.sidebar -->
              </aside>
     `;


     this.footertext =`
          <div class="control-sidebar-bg"></div>
           
        <footer class="main-footer">
            <div class="box box-footer with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong>Maze Generator Algorithm</strong></h3>                
            </div>
            
                <blockquote>
                    <ol class="small">
                        <li><small>Total Frames : ${frameCount}</small></li>
                        <li><small>width : ${this.mywidth}</small></li>
                        <li><small>height : ${this.myheight}</small></li>                    
                    </ol>
                </blockquote>
                
            <div class="box box-footer with-border">
                <div class="pull-right hidden-xs"><b> Design By </b> <a href="https://justicendou.site" title="Contact Justice Ndou for your own profile page development needs"><strong><i class="fa fa-user-secret"> </i> Justice Ndou</strong></a></div>
            <div class="pull-left hidden-xs"><strong>Copyright &copy; 2012-2018 <a href="http://blueitmarketing.site">Blue IT Marketing Pty LTD</a>.</strong></div> All rights reserved <small>reg: 2013/078651/07</small> <small><strong><a href="tel:+27790471559">Call Me : +2779 0471 559</a></strong>  <strong><a href="justice@justicendou.site"> Email Me: justice@justicendou.site </a> </strong></small>
        
        </footer>
        </div>

        </div>
     
    `;

     this.index = function (i,j) {
        if (i < 0 || j < 0 || i > thismaze.cols - 1 || j > thismaze.rows - 1){
            return -1;
        }

        return i + j * thismaze.cols;
     };
     
     this.removeWalls = function (a,b) {
            let x = a.i - b.i;
            if (x === 1){
                a.walls[3] = false;
                b.walls[1] = false;

            }else if (x === -1){
                a.walls[1] = false;
                b.walls[3] = false;
            }

             let y = a.j - b.j;
            if (y === 1){
                a.walls[0] = false;
                b.walls[2] = false;

            }else if (y === -1){
                a.walls[2] = false;
                b.walls[0] = false;
            }
     };
     
     this.UpdateScreen = function () {
         this.sidebar.html(this.sidebartext);
         this.fr.html(this.footertext);

     }
};


function draw(){
    background(51);
    for (let i = 0; i < thismaze.grid.length; i++){
        thismaze.grid[i].show();
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

    thismaze.UpdateScreen();

}




//constructor
function Cell(i,j){
    this.i = i;
    this.j = j;
                 //top,right,bottom,left
    this.walls = [true,true,true,true];

    this.visited = false;
    
    
    this.checkNeighbors = function () {
        let neighbors = [];
        let neighborgrids = [thismaze.grid[thismaze.index(i,j - 1)],thismaze.grid[thismaze.index(i+1,j)],thismaze.grid[thismaze.index(i,j + 1)],thismaze.grid[thismaze.index(i - 1,j)]];

        for (let i = 0; i < neighborgrids.length; i++){
            if (neighborgrids[i] && !neighborgrids[i].visited){
                neighbors.push(neighborgrids[i]);
            }
        }

        if (neighbors.length > 0){
            let r = floor(random(0,neighbors.length));
            return neighbors[r];

        }else{
            return undefined;
        }
    };
    this.myhighlight = function () {
        let x = this.i*thismaze.resolution;
        let y = this.j*thismaze.resolution;
        noStroke();
        fill(0,255,0,100);
        rect(x,y,thismaze.resolution,thismaze.resolution);

    };
    this.show =function () {
        let x = this.i*thismaze.resolution;
        let y = this.j*thismaze.resolution;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + thismaze.resolution, y);
        }
        if (this.walls[1]) {
            line(x + thismaze.resolution, y, x + thismaze.resolution, y + thismaze.resolution);
        }
        if (this.walls[2]) {
            line(x + thismaze.resolution, y + thismaze.resolution, x, y + thismaze.resolution);
        }
        if (this.walls[3]) {
            line(x, y + thismaze.resolution, x, y);
        }

        if (this.visited){
            noStroke();
            fill(255,0,255,100);
            rect(x,y,thismaze.resolution,thismaze.resolution);
        }


    };
}


