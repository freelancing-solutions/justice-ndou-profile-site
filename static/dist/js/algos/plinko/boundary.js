




function Boundary(x,y,w,h)
    {
        let options = {
            isStatic: true
        };
        this.body = Bodies.rectangle( x,y,w,h,options);
        if (h === bucketheight){
            this.body.label = "bucket";
        }else{
            this.body.label = "wall";
        }

        this.w = w;
        this.h = h;
        World.add(world, this.body);

        Boundary.prototype.show = function () {
            fill(255);
            stroke(0);
            let pos = this.body.position;
            push();
            translate(pos.x,pos.y);
            rectMode(CENTER);
            rect(0,0,this.w,this.h);
            pop();
        }
    }