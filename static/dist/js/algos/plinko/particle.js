


function Particle(x,y,r)
    {
        let options = {
            restitution :  1,
            friction: 0
        };
        this.hu = random(360);
        x += random(-1,1);
        this.body = Bodies.circle(x,y,r,options);
        this.body.label = "particle";
        this.r = r;
        World.add(world, this.body);
        
        Particle.prototype.offScreen = function () {
            let x = this.body.position.x;
            return (x < -20 || x > width + 20);
        };
        
        Particle.prototype.show = function () {
            fill(this.hu,255,255);
            noStroke();
            let pos = this.body.position;
            push();
            translate(pos.x,pos.y);
            ellipse(0,0,this.r * 2);
            pop();
        }
    }