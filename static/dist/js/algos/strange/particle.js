function Particle(x,y)
    {
        this.pos = createVector(x,y);
        this.prev = createVector();
        this.vel = p5.Vector.random2D();
        this.acc = createVector();


        this.update = function ()
            {
                this.pos.add(this.vel);
                this.vel.add(this.acc);
                this.acc.mult(0);

            };
        this.show = function()
            {
                stroke(255,100);
                strokeWeight(10);
                line(this.pos.x,this.pos.y,this.prev.x,this.prev.y);
                this.prev.x = this.pos.x;
                this.prev.y = this.pos.y;
            };


        this.attracted = function (target)
            {
                let force = p5.Vector.sub(target,this.pos);
                let dsquared = force.magSq();
                dsquared = constrain(dsquared,25,500);
                let G = 6.6740823453234;
                let strength = G/dsquared;
                //strength = constrain(strength,0.001,0.1);
                force.setMag(strength);
                this.acc.add(force);
            };
    }
