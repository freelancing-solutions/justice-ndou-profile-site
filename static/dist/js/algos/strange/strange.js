
let attractors =[];
let particles =[];
let particle_limit = 100;
let attractor_limit = 4;

function setup()
    {
        createCanvas(1600,600);

        for (let i = 0; i < particle_limit; i++)
            {
                particles.push(new Particle(400,300));
            }
        myx = width;
        myy = height;
        for (let i = 0; i < attractor_limit; i++)
            {
                let xv = floor(600);
                xv = constrain(xv,height/2,width/2);
                xv = xv + 100*i;
                let yv = floor(300);
                if (i % 2 === 0){
                    yv = yv + i * 30
                }
                yv = constrain(yv,height/2,width/2);
                attractors.push( createVector(xv, yv));
            }
        fr = createP(' ');
        background(51);
    }

function draw()
    {
background(51);
        stroke(230,45,67,255,100);
        strokeWeight(15);

        for (let i = 0; i < attractors.length; i++)
            {
                point(attractors[i].x, attractors[i].y);
            }

        for (let i = 0; i < particles.length; i++)
            {
                let particle = particles[i];

                for (let j = 0; j < attractors.length; j++)
                    {
                        particle.attracted(attractors[j]);
                    }

                particle.update();
                particle.show();
            }


        let footertemp = `
                      <div class="control-sidebar-bg"></div>
               
            <footer class="main-footer">
            <div class="box box-footer with-border">
            <div class="box box-header with-border">
                <h3 class="box-title"><strong>Strange Attractors Algorithm</strong></h3>                
            </div>            
                <blockquote>
                    <ol class="small">
                        <li><small>Frame rate : ${floor(frameRate())} f/s</small></li>
                        <li><small>Total Frames : ${frameCount}</small></li>
                        <li><small>Particles : ${particle_limit}</small></li>
                        <li><small>Attractors : ${attractor_limit}</small></li>
                        <li><small>Width : ${width}</small></li>
                        <li><small>Height : ${height}</small></li>                                   
                    </ol>
                </blockquote>
                
            <div class="box box-footer with-border">
                <div class="pull-right hidden-xs"><b> Design By </b> <a href="https://justicendou.site" title="Contact Justice Ndou for your own profile page development needs"><strong><i class="fa fa-user-secret"> </i> Justice Ndou</strong></a></div>
            <div class="pull-left hidden-xs"><strong>Copyright &copy; 2012-2018 <a href="http://blueitmarketing.site">Blue IT Marketing Pty LTD</a>.</strong></div> All rights reserved <small>reg: 2013/078651/07</small> <small><strong><a href="tel:+27790471559">Call Me : +2779 0471 559</a></strong>  <strong><a href="justice@justicendou.site"> Email Me: justice@justicendou.site </a> </strong></small>
            
            </footer>
            </div>

            </div>
         
        
        `
        fr.html(footertemp);

    }