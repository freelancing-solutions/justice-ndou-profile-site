
let attractors =[];
let particles =[];
function setup(){
    createCanvas(1600,1000);
    for (let i = 0; i < 2500; i++){
        particles.push(new Particle(random(width),random(height)));
    }
    myx = width;
    myy = height;
    for (let i = 0; i < 50; i++) {
        let xv = random(myx);
        //xv = constrain(xv,800,500);
        let yv = random(myy);
        //yv = constrain(yv,400,200);

        attractors.push( createVector(xv, yv));

    }

}

function draw(){
    background(51);
    stroke(255,100);
    strokeWeight(1);
    for (let i = 0; i < attractors.length; i++) {
        point(attractors[i].x, attractors[i].y);
    }

    for (let i = 0; i < particles.length; i++){
        let particle = particles[i];
        for (let j = 0; j < attractors.length; j++) {
            particle.attracted(attractors[j]);
        }


        particle.update();
        particle.show();

    }

}