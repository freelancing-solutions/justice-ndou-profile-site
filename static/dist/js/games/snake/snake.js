function Snake () {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.speed = 6;
  this.runningSoundInterval = 2;

  this.updated = function () 
  {
    frameRate(this.speed);
    if (this.total === this.tail.length) 
    {
      for (let i = 0; i < this.tail.length - 1; i++)
      {
        this.tail[i] = this.tail[i + 1];
      }
  }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);

    if (frameCount % round(this.speed/this.runningSoundInterval) === 0)
    {
      runningsound.play();
    }

  };

  this.show = function () {
    fill(254);
    if (this.total > 0) {
      for (let i = 0; i < this.total; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
    }else {
      rect(this.x, this.y, scl, scl);
    }
  };
  this.direction = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };
  this.eat = function (pos) {
    let distance = dist(this.x, this.y, pos.x, pos.y);

    if (distance < 1) {
      this.total += 1;
      if (this.total === 10) {
        this.speed += 4;
      }else if (this.total === 20) {
        this.speed += 2;
      }else if (this.total === 30) {
        this.speed += 2;
      }
      return true;
    }else {
      return false;
    }
  };

  this.gameover = function () 
  {
    for (let i = 0; i < this.tail.length; i++)
    {
      let pos = this.tail[i];
      let distance = dist(this.x, this.y, pos.x, pos.y);
      if (distance < 1) 
      {
        console.log('Game Over');
        this.total = 0;
        this.tail = [];
        this.speed = 2;
        gameoversound.play();
      }
    }
  }
}
