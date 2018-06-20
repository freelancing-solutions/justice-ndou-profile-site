let streams = [];
let symbolSize =24;
let mytheme;
let themetime = 600;
let chartype = true;


function preload(){
    mytheme = loadSound('/static/dist/sound/matrix/matrix1.mp3');
    mytheme.play();
}

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight,
        
    );
    background(0,91);

    var x = 0;
    
    for (var i = 0; i <= width / symbolSize; i++){
        var stream = new Stream();
        stream.generateSymbols(x,random(-1000,0));
        streams.push(stream);
        x += symbolSize;
    }
    
    textSize(symbolSize);
}

function draw() {
    background(5, 91);
    if (themetime % frameCount == 0){
        mytheme.play();
    }
    streams.forEach(function(stream){
        stream.render();
    });
}

function Symbol(x, y,speed,first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2,20));
    this.first = first;
    


    this.setToRandomSymbol = function () {
        //use unicode to represent matrix code which is katakana
        let chartype = round(random(0, 4)) == 1;
        if (frameCount % this.switchInterval == 0){
        if (chartype == true){        
        this.value = String.fromCharCode(
            0x30A0 + round(random(0, 96)) // there are 96 katakana codes available
        );
        }else{
        this.value = String.fromCharCode(
            0x30A0 + round(random(61, 72)) // there are 96 katakana codes available
        );            
        }
        }
    }
    this.render = function () {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain();
        this.setToRandomSymbol();
    }
    this.rain = function(){        
        this.y = (this.y >= height) ? 0 : this.y += this.speed;

    }
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(10,60));
  this.speed = random(2,24);

  this.generateSymbols = function(x,y){
      let first = round(random(0,2)) ==1;
      for (var i = 0; i <= this.totalSymbols; i++){
          symbol = new Symbol(x,y,this.speed,first);
          symbol.setToRandomSymbol();
          this.symbols.push(symbol);
          y -= symbolSize;
          first = false;
      }

  }
  this.render = function(){
      
      this.symbols.forEach(function(symbol)
      {
        if (symbol.first){
            fill(180,255,180);
        }else{
        fill(0, 255, 70);
        }
        
        text(symbol.value, symbol.x, symbol.y);
        symbol.rain();
        symbol.setToRandomSymbol();
      });
  }
}
