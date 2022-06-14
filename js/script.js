var gameCanvas;
var ctx;
var canvasWidth = 800;
var canvasHeight = 600;
var numResources = 4; 
var loadProgress = 0;
var requestID;
var enemy1;
var enemy2;
var enemy3;
var player;


window.onload = function () {
        gameCanvas = document.getElementById("gameCanvas");
        gameCanvas.width = canvasWidth; 
        gameCanvas.height = canvasHeight; 
        ctx = gameCanvas.getContext("2d");
    enemy1=new enemy("enemy.png", Math.random()*canvasWidth, -80, 80, 80, 2000);
  enemy2=new enemy("enemy.png", Math.random()*canvasWidth, -80, 80, 80, 3000);
  enemy3=new enemy("enemy.png", Math.random()*canvasWidth, -80, 80, 80, 10000);

 player=new playerPlane("player.png", canvasWidth / 2, 560, 32, 32);
 
  gameCanvas.addEventListener('mousemove', function (event) { 
    var mousePos = getMousePos(gameCanvas, event);
    //player.y = mousePos.y - player.height / 2;
    player.x = mousePos.x - player.width / 2;
  }, false);    

};

function playerPlane(file, x, y, width, height) {
  this.health = 3;
  this.score = 0;
  this.playerFlash = false;
  this.playerInvulnerable = false;
  this.image = new Image();
  this.image.onload = function () {
    loadProgress = loadProgress + 1;
    loadingUpdate();
  };

  this.image.src = "assets/graphics/" + file;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xdistance = 0;
  this.ydistance = 0;
  this.xm = 0;
  this.ym = 0;
  this.xcenter = 0;
  this.ycenter = 0;

  this.update = function () {
    this.xcenter = this.x + this.width / 2;
    this.ycenter = this.y + this.height / 2;
    if (!this.playerFlash) {
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
  };
}

function enemy(file, x, y, width, height, wait) {
  this.wait = wait;
  this.x = x;
  this.y = y;
  this.yspeed = 0;
  this.timeout = false;
  this.xspeed = 0;
  this.width = width;
  this.height = height;
  this.image = new Image();
 
  this.image.onload = function () {
    loadProgress = loadProgress + 1;
    loadingUpdate();
  };
 
  this.image.src = "assets/graphics/" + file;
 
  this.update = function () {
    this.y = this.y + this.yspeed;
    this.x = this.x + this.xspeed;
    if ((this.y > canvasHeight) && (!this.timeout)) {
      var self = this;
      setTimeout(function () {
        self.y = -100 - self.height;
        self.x =30+Math.random()*(canvasWidth-self.width);
        self.timeout = false;
      }, self.wait);
      this.timeout = true;
    } else {
       ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
  };
}

function loadingUpdate() {
  if (loadProgress == numResources) {
    requestID = requestAnimationFrame(updateGame);
     setTimeout(function () {
      enemy1.yspeed = 3;
    }, 4000);
    setTimeout(function () {
      enemy2.yspeed = 4;
    }, 6000);
    setTimeout(function () {
      enemy3.yspeed = 5;
    }, 8000);
  }
}

function updateGame() {
  requestID = requestAnimationFrame(updateGame);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  enemy1.update();
  enemy2.update();
  enemy3.update();
  player.update();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x:(evt.clientX-rect.left)/(rect.right-rect.left)*canvasWidth,
    y:(evt.clientY-rect.top)/(rect.bottom-rect.top)*canvasHeight};
}
