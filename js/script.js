var gameCanvas;
var ctx;
var canvasWidth = 800;
var canvasHeight = 600;
var numResources = 14; 
var loadProgress = 0;
var requestID;
var enemy1;
var enemy2;
var enemy3;
var player;
var bulletSpeed = -6;
var bulletArray = [];
var maxBullets = 10;
var score = 0;
var health = 3;

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

  for (var i = 0; i < maxBullets; i++) {
    bulletArray[i] = new bullet();
  }
 
  gameCanvas.addEventListener('click', function (event) {
    var bulletPos={x: player.x+player.width/2, y: player.y+player.height/2};
    for (var i = 0; i < maxBullets; i++) {
      if (!bulletArray[i].active) {
        bulletArray[i].y = bulletPos.y - bulletArray[i].height / 2;
        bulletArray[i].x = bulletPos.x - bulletArray[i].width / 2;
        bulletArray[i].active = true;
        break;
      }
    }
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
     this.flashPlayer = function () {
    player.playerInvulnerable = true;
    player.playerFlash = true;
    setTimeout(function () {
      player.playerFlash = false;
    }, 100);
    setTimeout(function () {
      player.playerFlash = true;
    }, 200);
    setTimeout(function () {
      player.playerFlash = false;
    }, 300);
    setTimeout(function () {
      player.playerFlash = true;
    }, 400);
    setTimeout(function () {
      player.playerFlash = false;
    }, 500);
    setTimeout(function () {
       player.playerFlash = true;
    }, 600);
    setTimeout(function () {
      player.playerFlash = false;
      player.playerInvulnerable = false;
    }, 700);
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
    if (!player.playerInvulnerable) {
      checkPlayerCollision(player, this);
    }
  };
    this.resetLocation = function () {
    this.x = Math.random() * canvasWidth -80;
    this.y = -80;
  };
}

function loadingUpdate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "60px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("Loading: " + loadProgress, 300, 400);
  ctx.rect(200, 450, 600, 50);
  ctx.stroke();
  ctx.fillStyle = 'green';
  ctx.fillRect(205,455,590*(loadProgress/numResources),40);
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
  for (var i = 0; i <  maxBullets; i++) {
    if (bulletArray[i].active) {
      bulletArray[i].update();
    }
  }
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("Health: " + health, canvasWidth - 140, 40);
  ctx.fillText("Score: " + player.score + "/180", 20, 40);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x:(evt.clientX-rect.left)/(rect.right-rect.left)*canvasWidth,
    y:(evt.clientY-rect.top)/(rect.bottom-rect.top)*canvasHeight};
}

function bullet() {
  this.image = new Image();

  this.image.onload = function () {
    loadProgress = loadProgress + 1;
    loadingUpdate();
  };

  this.image.src = "assets/graphics/bullet.png";
  this.x = 100;
  this.y = 100;
  this.width = 8;
  this.height = 8;
  this.speed = bulletSpeed;
  this.active = false;

  this.update = function () {
    this.y = this.y + this.speed;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    if (this.y < -10) {
      this.active = false;
    }
        checkEnemyCollision(enemy1, this);
  checkEnemyCollision(enemy2, this);
  checkEnemyCollision(enemy3, this);
  };
}

function checkEnemyCollision(object1, object2) {
  if ((object2.x + object2.width / 2 > object1.x) && (object2.x + object2.width / 2 < object1.x + object1.width) && (object2.y + object2.height / 2 > object1.y) && (object2.y + object2.height / 2 < object1.y + object1.height)) {
    object1.y = -200;
    object2.active = false;
    object1.x =30+Math.random()*(canvasWidth-object1.width-30);
     player.score = player.score + 1;
    if ((player.score % 20 == 0)) {
      enemy1.yspeed = enemy1.yspeed + 1;
      enemy2.yspeed = enemy2.yspeed + 1;
      enemy3.yspeed = enemy3.yspeed + 1;
    }
  }
}

function checkPlayerCollision(playerObject, enemyObject) {

  if ((playerObject.xcenter > enemyObject.x) && (playerObject.xcenter < enemyObject.x + enemyObject.width) && (playerObject.ycenter > enemyObject.y) && (playerObject.ycenter < enemyObject.y + enemyObject.height)) {
    enemyObject.resetLocation();
    playerObject.flashPlayer();
          health = health - 1;
    if (health == 0) {
      endGame();
    }
  }
}

function endGame() {
  cancelAnimationFrame(requestID);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "60px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("Game Over!", 200, 400);
}
