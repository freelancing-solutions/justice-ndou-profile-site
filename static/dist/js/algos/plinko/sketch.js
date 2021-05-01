let Engine = Matter.Engine,
    //Render = Matter.Render, // using P5 Render
    Events = Matter.Events,
    World = Matter.World,
    Bodies = Matter.Bodies;


let engine;
let world;
let particles = [];

let plinkos = [];
let walls = [];
let cols = 8;
let rows = 10;
let speed = 40;
let gravity = 1;
//let spacing = NaN;

let ding;
let dong;

let nullsounds = [];

let bucketheight = 50;

function preload() {
    ding = loadSound('/static/dist/sound/plinko/collide.mp3');
    dong = loadSound('/static/dist/sound/plinko/dong.mp3');
}

function mousePressed(){
    ding.play();
}


function newParticle()
    {
        let p = new Particle(floor(random(width)), 0, 10);
        particles.push(p);
    }


function collision(event)
    {
        let pairs = event.pairs;

        //console.log(pairs);
        let idA;
        let idB;
        let labelB;
        let labelA;
        for (let i = 0; i < pairs.length; i++) {
            labelA = pairs[i].bodyA.label;
            idA = pairs[i].bodyA.id;
            labelB = pairs[i].bodyB.label;
            idB = pairs[i].bodyB.id;
        }
            //console.log(labelA);
            let dontplay = false;
            if (idB === "wall") {
                for (i = 0; i < nullsounds.length; i++) {
                    if (idB === nullsounds[i]) {
                        dontplay = true;
                    }
                }
            }

                if (!dontplay) {
                    if (labelA === "plinko" && labelB === "particle") ding.play();
                    if (labelA === "wall" && labelB === "particle") dong.play();
                } else {
                    if (labelA === "wall") {
                        nullsounds.push(idB);
                    }
                }
    }

function setup(){
    createCanvas(floor(displayWidth/2),(displayHeight-200));
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = gravity;

    //set collision bounds
    world.bounds.max.x = width;
    world.bounds.min.x = 0;
    world.bounds.max.y = height;
    world.bounds.min.y = 0;


    //setup events


    //newParticle();

    Events.on(engine,'collisionStart', collision);



    let spacing = width/cols;
    for (let j= 0; j < rows; j++){
        for (let i = 0; i < cols; i++){

            let x = spacing / 2 + i * spacing;
            if (j % 2 === 0){
                x += spacing/2;
            }
            let y = spacing + j * spacing;
            let p = new Plinko(x, y,4);
            plinkos.push(p);
        }
    }
    // Engine.run(engine);
    let wall = new Boundary((width/2),(height + 50),width,100);
    walls.push(wall);

    for (let i = 0; i < cols + 1; i++){
        let x = i * spacing;
        let h = bucketheight;
        let w = 10;
        let y = height - h /2;
        let bucket = new Boundary(x,y,w,h);
        walls.push(bucket);

    }
    Engine.run(engine);
}

function draw() {

    background(0);
    if (frameCount % speed === 0)
    {
        newParticle();
    }


    //Engine.update(engine);

    for (i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i] && particles[i].offScreen()){
            World.remove(world,particles[i].body);
            particles.splice(i,1);
            i--;
        }


    }

    for (i = 0; i < plinkos.length; i++) {
        plinkos[i].show();
    }

    for (i = 0; i < walls.length; i++) {
        walls[i].show();
    }








}