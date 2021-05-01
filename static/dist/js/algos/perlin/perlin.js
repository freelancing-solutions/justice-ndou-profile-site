
let noisefactor = 10;
let inc = 0.004;
let scl = 10;
let cols,rows;
let zoff = 0;
let goff = 0;
let fr;
let partlimit = 2500;

let mywidth = 1280;
let myheight = 600;

let particles = [];
let flowField ;
let colourChangeInterval = 800;
let totalframes = 0;

let MyColour = {
            r: 45,
            g: 100,
            b :120
        };

function setup(){
    createCanvas(mywidth,myheight);

    cols = floor(width /scl);
    rows = floor(height / scl);
    fr = createP(' ');

    flowField = new Array(cols*rows);

    for (let i = 0; i < partlimit; i++){
        particles[i] = new Particle();
    }
background(250);
}

function draw() {


    let yoff = 0;

    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = (x + y * cols);
            let angle = noise(xoff, yoff, zoff,goff) * TWO_PI * noisefactor;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(2);
            flowField[index] = v;
            xoff += inc;
        }

        yoff += inc;
        zoff += 0.004;
    }
    goff += inc;

    if (colourChangeInterval === totalframes){
        MyColour.r  = 25;
        MyColour.g = floor(random(255));
        MyColour.b = floor(random(255));
        totalframes = 0;
        //inc += random(0.001);
    for (let i = 0; i < partlimit; i++){
        thisparticle = new Particle();
        thisparticle.x = random(width);
        thisparticle.y = random(height);

        particles[i] = thisparticle;
    }
        background(250);
    }else{
        totalframes += 1;
        //inc -= random(0.001);
    }



    for (let i = 0; i < particles.length; i++) {

        particles[i].followfield(flowField);
        particles[i].setColour(MyColour);
        particles[i].myUpdate();
        particles[i].Edges();
        particles[i].Show();
    }

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
                        <li><small>frame rate : ${floor(frameRate())} f/s</small></li>
                        <li><small>Total Frames : ${frameCount}</small></li>
                        <li><small>Particles : ${partlimit}</small></li>
                        <li><small>width : ${mywidth}</small></li>
                        <li><small>height : ${myheight}</small></li>                    
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