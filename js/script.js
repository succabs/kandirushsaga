//initialize variables
var gameCanvas;
var ctx;
var canvasWidth = 800;
var canvasHeight = 600;
var numResources = 16;
var loadProgress = 0;
var requestID;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var player;
var bulletSpeed = -10;
var bulletArray = [];
var maxBullets = 10;
var score = 0;
var ka = 0;
var health = 32;
var canShoot = true;
var courseNumber = 0;
var newGame = false;
window.onload = function () {
        gameCanvas = document.getElementById("gameCanvas");
    document.getElementById("gameCanvas").focus();
    gameCanvas.width = canvasWidth; 
        gameCanvas.height = canvasHeight; 
        ctx = gameCanvas.getContext("2d");
enemy1=new enemy("1op.png", Math.random()*canvasWidth, -80, 80, 80, 2000);
enemy2=new enemy("2op.png", Math.random()*canvasWidth, -80, 80, 80, 3000);
enemy3=new enemy("3op.png", Math.random()*canvasWidth, -80, 80, 80, 10000);
player=new playerPlane("playerhat.png", canvasWidth / 2, 560, 48, 48); 
enemy4=new enemy("4op.png", Math.random()*canvasWidth, -80, 80, 80, 12000);
enemy5=new enemy("5op.png", Math.random()*canvasWidth, -80, 80, 80, 20000);
  //handles the number of bullets on the screen  
  for (var i = 0; i < maxBullets; i++) {
    bulletArray[i] = new bullet();
  }
//listen for keypresses
gameCanvas.addEventListener("keydown", keyDownHandler, false);
gameCanvas.addEventListener("keyup", keyUpHandler, false);

};

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        player.speed = 0;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        player.speed = 0;
    }

    if(e.key === ' ' || e.key === 'Spacebar')  {
canShoot = true;
}
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        player.speed = 7;    
    }

    else if(e.key == "Left" || e.key == "ArrowLeft") {
        player.speed = -7;
    }
    else if((e.key === ' ' || e.key === 'Spacebar') && (canShoot == true))  {

    var bulletPos={x: player.x+player.width/2, y: player.y+player.height/2};
    for (var i = 0; i < maxBullets; i++) {
      if (!bulletArray[i].active) {
        bulletArray[i].y = bulletPos.y - bulletArray[i].height / 2;
        bulletArray[i].x = bulletPos.x - bulletArray[i].width / 2;
        bulletArray[i].active = true;
        break;
      }
    }
    canShoot = false;
 e.preventDefault(); 
    }
    else if((e.key === 'n' || e.key === 'N') && (newGame == true))  {
    player.score = 0;
    player.ka = 0;
    player.courseNumber = 0;
        updateGame();
    }
}

function playerPlane(file, x, y, width, height) {
  this.health = 0;
  this.score = 0;
  this.ka = 0;
  this.courseNumber = 0;
  this.speed = 0;
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
this.x = this.x + this.speed;
if (this.x <= 0) // Keep player within the screen
					this.x = 0;
    if (this.x >= canvasWidth-32)
					this.x = canvasWidth -32;
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

//function of enemy
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
this.points = 0;
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
      enemy1.yspeed = 2;
         enemy1.points = 1;
    }, 4000);
    setTimeout(function () {
      enemy2.yspeed = 2;
      enemy2.points = 2;
    }, 5000);
    setTimeout(function () {
      enemy3.yspeed = 3;
        enemy3.points = 3;
    }, 8000);
    setTimeout(function () {
      enemy4.yspeed = 4;
        enemy4.points = 4;
    }, 10000);
    setTimeout(function () {
      enemy5.yspeed = 5;
        enemy5.points = 5;
    }, 12000);
    }
}
//function to update the game state
function updateGame() {
  requestID = requestAnimationFrame(updateGame);
 ctx.clearRect(0, 0, canvasWidth, canvasHeight);
   ctx.fillStyle = "#F4BFBF";
ctx.fillRect(0, 0, canvasWidth, 100); 
   ctx.fillStyle = "#FFD9C0";
ctx.fillRect(0, 100, canvasWidth, 100); 
   ctx.fillStyle = "#FAF0D7";
ctx.fillRect(0, 200, canvasWidth, 100); 
   ctx.fillStyle = "#8CC0DE";
ctx.fillRect(0, 300, canvasWidth, 100); 
  enemy1.update();
  enemy2.update();
  enemy3.update();
  enemy4.update();
  enemy5.update();
  player.update();
  for (var i = 0; i <  maxBullets; i++) {
    if (bulletArray[i].active) {
      bulletArray[i].update();
    }
  }
  ctx.font = "24px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("Tukikuukaudet: " + health, canvasWidth - 220, 40);
  ctx.fillText("Opintopisteet: " + player.score + "/180", 20, 40);
  ctx.fillText("Keskiarvo: " + (player.ka / player.courseNumber).toFixed(2) , 300, 40);
}

//function for bullet
function bullet() {
  this.image = new Image();

  this.image.onload = function () {
    loadProgress = loadProgress + 1;
    console.log(loadProgress);
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
  checkEnemyCollision(enemy4, this);
  checkEnemyCollision(enemy5, this);
  };
}

//function for checkin the enemy collision
function checkEnemyCollision(object1, object2) {
  if ((object2.x + object2.width / 2 > object1.x) && (object2.x + object2.width / 2 < object1.x + object1.width) && (object2.y + object2.height / 2 > object1.y) && (object2.y + object2.height / 2 < object1.y + object1.height)) {
     player.ka += calculateGrade(object1); 
    object1.y = -200;
    object2.active = false;
    object1.x =30+Math.random()*(canvasWidth-object1.width-30);
     player.courseNumber += 1;
      player.score = player.score + object1.points;
    if ((player.score % 20 == 0)) {
      enemy1.yspeed = enemy1.yspeed + 1;
      enemy2.yspeed = enemy2.yspeed + 1;
      enemy3.yspeed = enemy3.yspeed + 1;
      enemy4.yspeed = enemy4.yspeed + 1;
      enemy5.yspeed = enemy5.yspeed + 1;
    }
   if(player.score >= 180) {
       endGame(0);
  }
  }
}
function calculateGrade(enemy) {
console.log(enemy.y);
if(enemy.y <= 20) {
    return 5;
}
if(enemy.y <= 120) {
    return 4;
}
if(enemy.y <= 220) {
    return 3;
}
if(enemy.y <= 320) {
    return 2;
}
if(enemy.y >= 321) {
    return 1;
}

}
//function for player and enemy collision
function checkPlayerCollision(playerObject, enemyObject) {
  if ((playerObject.x > enemyObject.x) && (playerObject.x < enemyObject.x + enemyObject.width) && (playerObject.y > enemyObject.y) && (playerObject.y < enemyObject.y + enemyObject.height)) {
    enemyObject.resetLocation();
    playerObject.flashPlayer();
          health = health - 1;
    if (health <= 0) {
      endGame(1);
    }
  }
}

//function for ending the game
function endGame(number) {
  newGame = true;
  cancelAnimationFrame(requestID);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "24px Arial";
  ctx.fillStyle = 'black';
  if (number == 0) {
  ctx.fillText("Congratulations!", 200, 250);
  ctx.fillText("You finished in time!", 200, 300);
  ctx.fillText("Study credits acquired: " + player.score, 200, 350);
  ctx.fillText("GPA: " + (player.ka / player.courseNumber).toFixed(2), 200, 400);
  }
 else if (number == 1) {
  ctx.fillText("Game over! You failed to get your Bachelors' degree.", 200, 400);
 }
}

//JOS AMPUU ENNEN EKAN VIHUN TULOA, PISTEITA EI TULE JA VIHUT TULEE SAMAAN AIKAAN! VIHUT MENEE ULOS REUNOILTA!
