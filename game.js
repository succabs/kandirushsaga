// Menu scene creation
const MenuScene = {
  key: "menu",
  preload: function () {
    // if menu needs assets to preload, lets keep this for now
  },
  create: createMenu,
  update: function () {
    // if menu needs logic (for animations etc), lets keep this for now
  },
};
// Main game scene creation
const MainScene = {
  key: "main",
  preload: preload,
  create: createMain,
  update: updateMain,
}; // Game Over scene creation
const GameOverScene = {
  key: "gameover",
  create: createGameOver,
};
// Game Complete scene creation
const GameCompleteScene = {
  key: "gamecomplete",
  create: createGameCompleted,
};

// Configuring the game
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: "0x5C5C5C",
  scene: [MenuScene, MainScene, GameOverScene, GameCompleteScene],
};

let game = new Phaser.Game(config);
game.scene.start("menu"); // start the game with the menu scene

// initialize variables
let player;
let bullets;
let enemies;
let beers;
let plagiarisms;
let safeArea;
let score = 0;
let health = 0;
let gpa = 0;
let courseCount = 0;
let courseNumbers = 0;
let gpaText;
let scoreText;
let healthText;
let lastFired = 0;

// Menu creation function
function createMenu() {
  // Add a black background
  this.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0);

  // Add the game title
  this.add
    .text(config.width / 2, 100, "Kandi Rush Saga", {
      fontSize: "64px",
      fill: "#fff",
    })
    .setOrigin(0.5);

  // Add the new game button
  const button = this.add
    .text(config.width / 2, 300, "New Game", {
      fontSize: "32px",
      fill: "#fff",
    })
    .setOrigin(0.5);
  button.setInteractive();
  button.on("pointerdown", () => {
    health = 2;
    gpa = 0;
    courseCount = 0;
    score = 0;
    this.scene.start("main");
  });
}

function createGameOver() {
  // Add text to tell the player how much of a failure he is in academic world
  this.add
    .text(
      game.config.width / 2,
      game.config.height / 2,
      "You failed to get your Bachelors' degree.",
      {
        fontSize: "24px",
        fill: "#fff",
      }
    )
    .setOrigin(0.5);
  this.add
    .text(
      game.config.width / 2,
      game.config.height / 2 + 50,
      "Off to Kela you go.",
      {
        fontSize: "24px",
        fill: "#fff",
      }
    )
    .setOrigin(0.5);

  // Add button for new game
  const newGameButton = this.add
    .text(game.config.width / 2, game.config.height / 2 + 100, "[N]ew Game", {
      fontSize: "24px",
      fill: "#fff",
    })
    .setOrigin(0.5);
  newGameButton.setInteractive();
  newGameButton.on(
    "pointerdown",
    function () {
      this.scene.start("main");
    },
    this
  );

  // Add button for main menu
  const mainMenuButton = this.add
    .text(game.config.width / 2, game.config.height / 2 + 150, "[M]ain Menu", {
      fontSize: "24px",
      fill: "#fff",
    })
    .setOrigin(0.5);
  mainMenuButton.setInteractive();
  mainMenuButton.on(
    "pointerdown",
    function () {
      this.scene.start("menu");
    },
    this
  );

  // Add keyboard input
  const keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  keyN.on(
    "down",
    function () {
      this.scene.start("main");
    },
    this
  );

  const keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  keyM.on(
    "down",
    function () {
      this.scene.start("menu");
    },
    this
  );
}
function createGameCompleted() {
  // Display "Game Complete" text
  let text = this.add.text(400, 200, "Congratulations!", {
    fontSize: "32px",
    fill: "#000000",
  });
  text.setOrigin(0.5);
  let text2 = this.add.text(400, 250, "You are now a bachelor!", {
    fontSize: "32px",
    fill: "#000000",
  });
  text2.setOrigin(0.5);

  // Display player score
  let scoreText = this.add.text(400, 300, "Opintopisteet: " + score, {
    fontSize: "32px",
    fill: "#000000",
  });
  scoreText.setOrigin(0.5);
  // Display player score
  let gpaText = this.add.text(400, 350, "Keskiarvo: " + gpa.toFixed(2), {
    fontSize: "32px",
    fill: "#000000",
  });
  gpaText.setOrigin(0.5);

  // Add "New Game" button
  let newGameButton = this.add.text(400, 400, "New Game", {
    fontSize: "32px",
    fill: "#0000ff",
  });
  newGameButton.setOrigin(0.5);
  newGameButton.setInteractive();
  newGameButton.on("pointerdown", () => {
    this.scene.start("main");
  });

  // Add "Main Menu" button
  let mainMenuButton = this.add.text(400, 450, "Main Menu", {
    fontSize: "32px",
    fill: "#0000ff",
  });
  mainMenuButton.setOrigin(0.5);
  mainMenuButton.setInteractive();
  mainMenuButton.on("pointerdown", () => {
    this.scene.start("menu");
  });
}

// preload the game assets
function preload() {
  this.load.image("player", "images/playerhat.png");
  this.load.image("bullet", "images/bullet.png");
  this.load.image("beer", "images/beer.png");
  this.load.image("plagiarism", "images/loading.png");
  this.load.image("safeArea", "images/safe.png");
  this.load.image("enemy1", "images/1p.png");
  this.load.image("enemy2", "images/2p.png");
  this.load.image("enemy3", "images/3p.png");
  this.load.image("enemy4", "images/4p.png");
  this.load.image("enemy5", "images/5p.png");

  this.load.spritesheet("kaboom", "images/kaboom.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
}

// Main game creation function
function createMain() {
  graphics = this.add.graphics();
  // Define the colors to use in the gradient
  var colors = [0x3498db, 0x5dade2, 0x85c1e9, 0xaed6f1, 0xd6eaf8];

  // Create the five gradient areas
  for (var i = 0; i < 5; i++) {
    // Calculate the color of the current area based on the index
    var color = colors[i];

    // Create the graphics object for the current area
    var area = this.add.graphics();

    // Set the fill color to the calculated color
    area.fillStyle(color);

    // Draw a rectangle for the current area at the top of the screen
    area.fillRect(0, i * 105, game.config.width, 105);

    // Add the graphics object to the scene
    this.add.existing(area);
  }

  this.anims.create({
    key: "kaboom",
    frames: this.anims.generateFrameNumbers("kaboom", { start: 0, end: 7 }),
    frameRate: 30,
    repeat: 0,
    hideOnComplete: true,
  });
  // Create player sprite
  player = this.physics.add.sprite(
    config.width / 2,
    config.height - 20,
    "player"
  );
  player.setCollideWorldBounds(true);
  player.setScale(0.15, 0.15);

  // Create bullet group
  bullets = this.physics.add.group({
    defaultKey: "bullet",
    repeat: 9,
    setXY: { x: -1000, y: -1000 },
    velocityY: -500,
    allowGravity: false,
    setScale: (0.1, 0.1),
  });

  // Create enemy group
  enemies = this.physics.add.group();
  // Add collisions between bullet and enemy groups
  this.physics.add.collider(bullets, enemies, bulletHitEnemy, null, this);
  // Add collisions between player and enemy groups
  this.physics.add.collider(player, enemies, playerHitEnemy, null, this);

  // Create beer group
  beers = this.physics.add.group();
  // Add collisions between player and beer groups
  this.physics.add.collider(player, beers, playerDrankBeer, null, this);

  // Create plagiarism group
  plagiarisms = this.physics.add.group();
  // Add collisions between player and plagiarism groups
  this.physics.add.collider(player, plagiarisms, playerPlagiarized, null, this);

  // Create score text
  scoreText = this.add.text(16, 16, "Opintopisteet: " + score + "/180", {
    fontSize: "16px",
    fill: "#fff",
  });

  // Create health text
  healthText = this.add.text(
    config.width - 200,
    16,
    "Tukikuukaudet: " + health,
    {
      fontSize: "16px",
      fill: "#fff",
    }
  );

  // Create GPA text
  gpaText = this.add.text(350, 16, "Keskiarvo: " + gpa, {
    fontSize: "16px",
    fill: "#fff",
  });

  // Create enemy timer
  this.time.addEvent({
    delay: 10000,
    loop: true,
    callback: spawnEnemy,
  });
  // Create beer timer
  this.time.addEvent({
    delay: 10000,
    loop: true,
    callback: spawnBeer,
  });
  // Create plagiarism accusation timer
  this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: spawnPlagiarism,
  });
}
// Main game update function, logic, buttons
function updateMain() {
  // Move player left and right
  if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) {
    player.setVelocityX(-500);
  } else if (
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown
  ) {
    player.setVelocityX(500);
  } else {
    player.setVelocityX(0);
  }

  if (
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown &&
    this.time.now > lastFired + 300 // limit firing rate to once every 200ms
  ) {
    fireBullet();
    lastFired = this.time.now;
  }
  enemies.getChildren().forEach(function (enemy) {
    if (enemy.y - 20 >= this.game.canvas.height) {
      // Decrease health of player
      health--;
      healthText.setText("Tukikuukaudet: " + health);
      // Kill enemy and play explosion animation
      enemy.y = 0;
      enemy.disableBody(true, true);
    }
  }, this);
  if (health <= 0) {
    // Check if player has run out of health
    this.scene.stop("main");
    this.scene.start("gameover");
  }
  if (score >= 5) {
    this.scene.stop("main");
    this.scene.start("gamecomplete");
  }
}

// Function to create and spawn enemies
function spawnBeer() {
  let beerX = Phaser.Math.Between(0 + 40, config.width - 40);
  let beerY = -50;
  let beerSpeed = 250;
  let beer = beers.create(beerX, beerY, "beer");
  beer.setScale(0.1, 0.1);
  beer.setVelocityY(beerSpeed);
}

// Function to create and spawn enemies
function spawnPlagiarism() {
  let plagiarismX = 0;
  let plagiarismY = -50;
  let plagiarismSpeed = 250;
  let plagiarism = plagiarisms.create(plagiarismX, plagiarismY, "plagiarism");
  plagiarism.setDisplaySize(game.config.width * 2, plagiarism.height / 6);
  plagiarism.setVelocityY(plagiarismSpeed);
  let safeX = Phaser.Math.Between(0 + 40, config.width - 40);
  let safe = plagiarisms.create(safeX, plagiarismY + 2, "safeArea");
  safe.setDisplaySize(game.config.width / 4, plagiarism.height / 6);
  safe.setVelocityY(plagiarismSpeed);
}

// Function to create and spawn enemies
function spawnEnemy() {
  let enemyNumber = Phaser.Math.Between(1, 5);
  let enemyX = Phaser.Math.Between(0 + 40, config.width - 40);
  let enemyY = -50;
  let enemySpeed = enemyNumber * 20 + 250;
  if (score > 20 && score < 80) {
    enemySpeed = enemyNumber * 20 + 300;
  }
  if (score > 80 && score < 140) {
    enemySpeed = enemyNumber * 20 + 350;
  }
  if (score > 140 && score < 180) {
    enemySpeed = enemyNumber * 20 + 400;
  }
  let enemy = enemies.create(enemyX, enemyY, "enemy" + enemyNumber);
  enemy.setVelocityY(enemySpeed);
  enemy.setData("value", enemyNumber);
}
// Function for firing bullets
function fireBullet() {
  let bullet = bullets.get(player.x, player.y - 20);
  if (bullet) {
    bullet.key = "bullet";
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.enableBody(true, player.x, player.y - 50, true, true);
    bullet.body.velocity.y = -500;
  }
}

// Function for calculating the GPA
function addGpa(enemy) {
  courseNumbers += calculateGrade(enemy);
  gpa = courseNumbers / courseCount;
  gpaText.setText("Keskiarvo: " + gpa.toFixed(2));
}

// Function for calculating enemy grade according to its y position
function calculateGrade(enemy) {
  console.log(enemy.y);
  if (enemy.y <= 105) {
    return 5;
  }
  if (enemy.y <= 210) {
    return 4;
  }
  if (enemy.y <= 315) {
    return 3;
  }
  if (enemy.y <= 420) {
    return 2;
  } else return 1;
}

// Function for bullet hitting an enemy
function bulletHitEnemy(bullet, enemy) {
  // Increase score
  let enemyValue = enemy.getData("value");
  courseCount += 1;
  score += enemyValue;
  scoreText.setText("Opintopisteet: " + score + "/180");
  addGpa(enemy);

  let kaboom = this.add.sprite(enemy.x, enemy.y, "kaboom").setScale(0.5);
  kaboom.anims.play("kaboom");

  // Destroy bullet and enemy
  bullet.disableBody(true, true);
  enemy.disableBody(true, true);
}

//Function for player touching enemy
function playerHitEnemy(player, enemy) {
  // Decrease health
  health--;
  healthText.setText("Tukikuukaudet: " + health);

  // Destroy enemy
  enemy.disableBody(true, true);
}

//Function for player touching beer
function playerDrankBeer(player, beer) {
  // Decrease health
  health += 3;
  healthText.setText("Tukikuukaudet: " + health);

  // Destroy enemy
  beer.disableBody(true, true);
}

//Function for player touching plagiarism accusation
function playerPlagiarized(player, object) {
  if (object.texture.key === "safeArea") {
    health += 1;
    healthText.setText("Tukikuukaudet: " + health);
  } else {
    health = 0;
  }
  plagiarisms.getChildren().forEach(function (plagiarism) {
    plagiarism.disableBody(true, true);
  }, this);
}
