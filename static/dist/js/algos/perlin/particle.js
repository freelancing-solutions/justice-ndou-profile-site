

function Particle(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 4;
    this.previousPosition = this.pos.copy();


    this.setColour = function (colourcode) {

        this.red = colourcode.r;
        this.green = colourcode.g;
        this.blue = colourcode.b;

    };

    this.myUpdate = function(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    this.applyForce = function(force){
        this.acc.add(force);
    };

    this.Show = function () {
        stroke(this.red,this.green,this.blue,5);

        strokeWeight(1);
        line(this.pos.x, this.pos.y,this.previousPosition.x,this.previousPosition.y);
        point(this.pos.x, this.pos.y);
        this.updatePrev();

    };
    
    this.updatePrev= function () {
        this.previousPosition.x = this.pos.x;
        this.previousPosition.y = this.pos.y;
    };
    
    this.Edges = function () {
        if (this.pos.x > width) {

            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    };
    
    this.followfield = function (vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }
}