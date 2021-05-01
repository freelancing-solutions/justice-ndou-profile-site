

function Box(x,y,w,h){
 this.body = Bodies.rectangle(x,y,w,h);
 this.body.friction = 0;
 this.body.restitution = 1;
 this.w = w;
 this.h = h;
 World.add(world, this.body);
 this.show = function () {
     let pos = this.body.position;
     let angle = this.body.angle;

     push();
     translate(pos.x,pos.y);
     rotate(angle);
     rectMode(CENTER);
     stroke(160);
     strokeWeight(2);
     fill(70);
     rect(0,0,this.w,this.h);
     pop();
 }
}