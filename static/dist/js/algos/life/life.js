
let grid;
let next;
let fr;
let cols;
let rows;
let widthsize = 800;
let heightsize = 800;
let speed = 6;
let resolution = 20;
let livecells = 0;

let cellcolour =
    {
        r: 255,
        g: 255,
        b: 255,
        
        setRGB : function (red,green,blue) {
            this.r = red;
            this.g = green;
            this.b = blue;
        }
    };

let Cell =
    {
        value : 0,
        duration : 0,
        colour : cellcolour,

        setValue: function(value){
            if ((value === 0) || (value === 1)){
                this.value = value;
            }
        },

        setDuration : function (duration) {
          if (duration > 0){
              this.duration = duration;
          }
        },

        setColour : function (cellColour) {
            this.colour = cellColour;
        },
        
        makeCell : function () {
            this.setValue(floor(random(2)));
            this.setDuration(1);
            if (this.value === 1)
            {
                newColour = new cellcolour.setRGB(255,255,255);
                this.setColour(newColour);
            }
        }
    };

function setup()
    {
        createCanvas(widthsize,heightsize);

        frameRate(speed);

        cols = width/ resolution;
        rows = height / resolution;

        grid = make2DArray();
        next = make2DArray();
        fr = createP(' ');

        for (let i = 0; i < cols; i++){
            for (let j = 0; j < rows; j++){
                num = floor(random(15));
                if (num === 1){
                    grid[i][j] = 1;
                }else{
                    grid[i][j] = 0;
                }

            }
        }
    }


function make2DArray()
    {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++){
            arr[i] = new Array(rows);
        }
        return arr;
    }

    
function countNeighbors(grid,x,y)
    {
        let sum = 0;
        for (let i = -1; i < 2; i++){
            for (let j = -1; j < 2; j++){
                let col = (x + i + cols) % cols;
                let row = (y + j + rows) % rows;

                sum += grid[col][row];
            }
        }
        sum -= grid[x][y];
        return sum;
    }

function draw()
    {
        background(0);
        for (let i = 0; i < cols; i++){
            for (let j = 0; j < rows; j++){
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j] === 1){
                    fill(255,255,255);
                    stroke(0);
                    rect(x,y,resolution - 1,resolution - 1);
                }
            }
        }

        // Compute Next Based on Grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++)
            {
                let state = grid[i][j];

                // Count Live Neighbours
                let sum = 0;
                let neighbors = countNeighbors(grid, i ,j);


                if (state === 0 && neighbors === 3){
                    next[i][j] = 1;
                } else if ((state === 1) && (neighbors < 2 || neighbors > 3)){
                    next[i][j] = 0;
                }else{
                    next[i][j] = state;
                }

            }
        }

        grid = next;

let     footertemp =
        `
              <div class="control-sidebar-bg"></div>
               
<footer class="main-footer">
            <div class="box box-footer with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong>Perlin Flow Algorithm</strong></h3>                
            </div>
            
                <blockquote>
                    <ol class="small">
                        
                        <li><small>Total Frames : ${frameCount}</small></li>
                        
                        <li><small>width : ${width}</small></li>
                        <li><small>height : ${height}</small></li>                    
                    </ol>
                </blockquote>
                
            <div class="box box-footer with-border">
                <div class="pull-right hidden-xs"><b> Design By </b> <a href="https://justicendou.site" title="Contact Justice Ndou for your own profile page development needs"><strong><i class="fa fa-user-secret"> </i> Justice Ndou</strong></a></div>
            <div class="pull-left hidden-xs"><strong>Copyright &copy; 2012-2018 <a href="http://blueitmarketing.site">Blue IT Marketing Pty LTD</a>.</strong></div> All rights reserved <small>reg: 2013/078651/07</small> <small><strong><a href="tel:+27790471559">Call Me : +2779 0471 559</a></strong>  <strong><a href="justice@justicendou.site"> Email Me: justice@justicendou.site </a> </strong></small>
            </footer>
            </div>
            </div>         
        `;
        fr.html(footertemp);
    }

    function mousePressed ()
        {
           // grid[mouseX / resolution][mouseY / resolution] = 1;
            console.log(mouseX,mouseY);
        }
