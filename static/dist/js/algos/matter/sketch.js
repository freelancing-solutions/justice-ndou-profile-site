//Module Aliases

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let boxes = [];
let world;
function setup()
    {
        createCanvas(1000,400);
        engine = Engine.create();
        world = engine.world;

        let options = {
            isStatic : true
        };
        ground = Bodies.rectangle(400,height,width,10 ,options);
        World.add(world,ground);
        Engine.run(engine);
    }

function mouseDragged()
    {
        mouseButton
        boxes.push(new Box(mouseX,mouseY,20,20));
    }

function draw()
    {
        //Engine.update(engine); or just run Engine.run(engine;
        background(0);

        for (let i = 0; i < boxes.length; i++){
            boxes[i].show();
        }

        fill(255);
        strokeWeight(20);
        stroke(50);
        rect(10,height,width,height);


    }