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

// Define the instructions scene
const InstructionScene = {
  key: "instructions",
  preload: preloadInstructions,
  create: function () {
    // Add background image
    this.add
      .rectangle(0, 0, config.width, config.height, 0x000000)
      .setOrigin(0);
    // Add instructions texts
    this.add
      .text(config.width / 2, 50, "Instructions", {
        fontSize: "48px",
        fill: "#fff",
      })
      .setOrigin(0.5);
    this.add
      .text(config.width / 2, 100, "Use left and right arrows to move.", {
        fontSize: "16px",
        fill: "#fff",
      })
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        120,
        "Spacebar to shoot. M to mute/unmute audio.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(config.width / 2, 160, "Numbers are student points.", {
        fontSize: "16px",
        fill: "#fff",
      })
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        180,
        "The higher you shoot them, the more points you get.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    numberPicture = this.add.image(35, 35, "enemy3").setScale(0.8);
    this.add.line(70, 65, 60, 30, 180, 150, 0x6666ff);
    this.add
      .text(
        config.width / 2,
        220,
        "Since beer is healthy, it gives you 1 student allowance month.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    beerPicture = this.add.image(30, 100, "beer").setScale(0.1);
    this.add.line(50, 165, 40, 0, 110, 100, 0x6666ff);
    this.add
      .text(
        config.width / 2,
        260,
        "Shoot selvityspyyntö five times and it disappears.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        280,
        "Don't let it past you and don't get hit by it.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        300,
        "If you do, you lose 25 student credits and 10 allowance months.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        340,
        "You can do nothing about plagiointisyytös.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        360,
        "Well, you can pass it in the safe pink area somewhere inside it.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        380,
        "If you get hit by it, you will lose the game.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(config.width / 2, 420, "Moodlen käyttökatko can hit you anytime.", {
        fontSize: "16px",
        fill: "#fff",
      })
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        440,
        "During that, you can't move or shoot for 4 seconds.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        480,
        "Oh, and if the game wasn't hard enough already..",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        config.width / 2,
        500,
        ".. you lose one student allowance month every 10 seconds.",
        {
          fontSize: "16px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);

    // Add back button
    const backButton = this.add
      .text(config.width / 2, 540, "[B]ack", {
        fontSize: "32px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    backButton.setInteractive();
    backButton.on("pointerdown", () => {
      this.scene.start("menu");
    });
    // Add keyboard input
    const keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keyB.on(
      "down",
      function () {
        initializeGame();
        this.scene.start("menu");
      },
      this
    );
  },
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
  scene: [
    MenuScene,
    MainScene,
    GameOverScene,
    GameCompleteScene,
    InstructionScene,
  ],
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
let selvitys;
let selvitysHealth = 4;
let score = 0;
let health = 0;
let gpa = 0;
let courseCount = 0;
let courseNumbers = 0;
let gpaText;
let scoreText;
let healthText;
let lastFired = 0;
let canShoot = true;
let nextHealthLoss;
let loadingBar;
let progress;

function initializeGame() {
  health = 32;
  gpa = 0;
  courseCount = 0;
  courseNumbers = 0;
  score = 0;
  canShoot = true;
  selvitysHealth = 4;
  lastFired = 0;
}
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
    .text(config.width / 2, 490, "[N]ew Game", {
      fontSize: "32px",
      fill: "#fff",
    })
    .setOrigin(0.5);
  button.setInteractive();
  button.on("pointerdown", () => {
    initializeGame();
    this.scene.start("main");
  });
  // Add the instructions button
  const instructionsButton = this.add
    .text(config.width / 2, 540, "[I]nstructions", {
      fontSize: "32px",
      fill: "#fff",
    })
    .setOrigin(0.5);
  instructionsButton.setInteractive();
  instructionsButton.on("pointerdown", () => {
    initializeGame();
    this.scene.start("instructions");
  });

  // Add keyboard input
  const keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  keyN.on(
    "down",
    function () {
      initializeGame();
      this.scene.start("main");
    },
    this
  );

  // Add keyboard input
  const keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
  keyI.on(
    "down",
    function () {
      initializeGame();
      this.scene.start("instructions");
    },
    this
  );
}

function createGameOver() {
  this.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0);
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
    .text(game.config.width / 2, 490, "[N]ew Game", {
      fontSize: "36px",
      fill: "#fff",
    })
    .setOrigin(0.5);
  newGameButton.setInteractive();
  newGameButton.on(
    "pointerdown",
    function () {
      initializeGame();
      this.scene.start("main");
    },
    this
  );

  // Add button for main menu
  const mainMenuButton = this.add
    .text(game.config.width / 2, 540, "[M]ain Menu", {
      fontSize: "36px",
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
      initializeGame();
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
  this.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0);
  // Display "Game Complete" text
  let text = this.add.text(400, 200, "Congratulations!", {
    fontSize: "32px",
    fill: "#fff",
  });
  text.setOrigin(0.5);
  let text2 = this.add.text(400, 250, "You are now a bachelor!", {
    fontSize: "32px",
    fill: "#fff",
  });
  text2.setOrigin(0.5);

  // Display player score
  let scoreText = this.add.text(400, 300, "Opintopisteet: " + score, {
    fontSize: "32px",
    fill: "#fff",
  });
  scoreText.setOrigin(0.5);
  // Display player score
  let gpaText = this.add.text(400, 350, "Keskiarvo: " + gpa.toFixed(2), {
    fontSize: "32px",
    fill: "#fff",
  });
  gpaText.setOrigin(0.5);
  this.gaudeamus = this.sound.add("gaudeamus");
  this.gaudeamus.play();

  // Add "New Game" button
  let newGameButton = this.add.text(400, 400, "[N]ew Game", {
    fontSize: "32px",
    fill: "#fff",
  });
  newGameButton.setOrigin(0.5);
  newGameButton.setInteractive();
  newGameButton.on("pointerdown", () => {
    initializeGame();
    this.scene.start("main");
  });

  // Add "Main Menu" button
  let mainMenuButton = this.add.text(400, 450, "[M]ain Menu", {
    fontSize: "32px",
    fill: "#fff",
  });
  mainMenuButton.setOrigin(0.5);
  mainMenuButton.setInteractive();
  mainMenuButton.on("pointerdown", () => {
    this.scene.start("menu");
  });

  // Add keyboard input
  const keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  keyN.on(
    "down",
    function () {
      initializeGame();
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

// preload the game assets
function preloadInstructions() {
  this.load.image("beer", "images/beer.png");
  this.load.image("plagiarism", "images/plagiointi.png");
  this.load.image("selvitys", "images/selvitys.png");
  this.load.image("safeArea", "images/selitys.png");
  this.load.image("enemy3", "images/3p.png");
}

// preload the game assets
function preload() {
  this.load.image("player", "images/playerhat.png");
  this.load.image("bullet", "images/bullet.png");
  this.load.image("beer", "images/beer.png");
  this.load.image("plagiarism", "images/plagiointi.png");
  this.load.image("selvitys", "images/selvitys.png");
  this.load.image("safeArea", "images/selitys.png");
  this.load.image("enemy1", "images/1p.png");
  this.load.image("enemy2", "images/2p.png");
  this.load.image("enemy3", "images/3p.png");
  this.load.image("enemy4", "images/4p.png");
  this.load.image("enemy5", "images/5p.png");

  this.load.audio("shoot", "sounds/shoot.wav");
  this.load.audio("explosion", "sounds/explosion.wav");
  this.load.audio("drink", "sounds/drink.wav");
  this.load.audio("warning", "sounds/warning.ogg");
  this.load.audio("gaudeamus", "sounds/gaudeamus.m4a");

  this.load.spritesheet("kaboom", "images/kaboom.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
}

// Main game creation function
function createMain() {
  // Create the background
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

  // Create the explosion animation
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

  // Create plagiarism group
  selvitys = this.physics.add.group();
  // Add collisions between player and selvitys
  this.physics.add.collider(player, selvitys, playerHitSelvitys, null, this);
  this.physics.add.overlap(bullets, selvitys, bulletHitSelvitys, null, this);

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
    delay: Phaser.Math.Between(2000, 3000),
    loop: true,
    callback: spawnEnemy,
  });
  // Create beer timer
  this.time.addEvent({
    delay: Phaser.Math.Between(5000, 7000),
    loop: true,
    callback: spawnBeer,
  });
  // Create plagiarism accusation timer
  this.time.addEvent({
    delay: Phaser.Math.Between(15000, 20000),
    loop: true,
    callback: spawnPlagiarism,
  });
  // Create selvitys tirme
  this.time.addEvent({
    delay: Phaser.Math.Between(25000, 30000),
    loop: true,
    callback: spawnSelvitys,
  });
  // Moodlekatko
  this.time.addEvent({
    delay: Phaser.Math.Between(45000, 60000), // Random delay between 10 and 20 seconds
    loop: true,
    callback: disablePlayer,
    callbackScope: this,
  });

  nextHealthLoss = 10000; // the time (in milliseconds) until the next health loss
  // create the circular loading bar
  loadingBar = this.add.graphics({
    lineStyle: {
      width: 3,
      color: 0xffffff,
    },
  });

  // Lose allowance month every 10 seconds
  this.time.addEvent({
    delay: 10000,
    loop: true,
    callback: function () {
      loseHealth();
      nextHealthLoss = 10000;
    },
  });

  // Add sounds
  this.shootSound = this.sound.add("shoot");
  this.explosionSound = this.sound.add("explosion");
  this.drinkSound = this.sound.add("drink");
  this.warningSound = this.sound.add("warning", { loop: true });
}
// Main game update function, logic, buttons
function updateMain() {
  nextHealthLoss -= this.game.loop.delta;
  progress = nextHealthLoss / 10000;
  loadingBar.clear();
  loadingBar.beginPath();
  loadingBar.arc(
    775,
    23,
    8,
    Phaser.Math.DegToRad(-90),
    Phaser.Math.DegToRad(progress * 360 - 90),
    false
  );
  loadingBar.strokePath();
  this.input.keyboard.on("keydown-M", function () {
    if (game.sound.mute) {
      game.sound.setMute(false);
    } else {
      // if the sound is not muted, mute it
      game.sound.setMute(true);
    }
  });
  if (canShoot) {
    // Move player left and right
    if (
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown
    ) {
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
      this.shootSound.play();
      fireBullet();
      lastFired = this.time.now;
    }
  }
  enemies.getChildren().forEach(function (enemy) {
    if (enemy.y - 20 >= this.game.canvas.height) {
      // Decrease health of player
      health--;
      healthText.setText("Tukikuukaudet: " + health);
      enemy.y = 0;
      enemy.disableBody(true, true);
    }
  }, this);
  selvitys.getChildren().forEach(function (enemy) {
    if (enemy.y - 20 >= this.game.canvas.height) {
      // Decrease health of player
      health -= 10;
      healthText.setText("Tukikuukaudet: " + health);
      if (score <= 25) {
        score = 0;
      }
      if (score > 25) {
        score -= 25;
      }
      scoreText.setText("Opintopisteet: " + score + "/180");
      enemy.y = 0;
      selvitysHealth = 4;
      enemy.disableBody(true, true);
    }
  }, this);
  if (health <= 0) {
    // Check if player has run out of health
    this.scene.stop("main");
    this.scene.start("gameover");
  }
  if (score >= 180) {
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
  let plagiarismSpeed = 150;
  let plagiarism = plagiarisms.create(plagiarismX, plagiarismY, "plagiarism");
  plagiarism.setDisplaySize(game.config.width * 2, plagiarism.height);
  plagiarism.setVelocityY(plagiarismSpeed);
  let safeX = Phaser.Math.Between(0 + 40, config.width - 40);
  let safe = plagiarisms.create(safeX, plagiarismY + 2, "safeArea");
  safe.setDisplaySize(game.config.width / 5, plagiarism.height);
  safe.setVelocityY(plagiarismSpeed);
}

// Function to create and spawn selvitys
function spawnSelvitys() {
  let selvitysX = Phaser.Math.Between(0 + 40, config.width - 40);
  let selvitysY = -50;
  let selvitysSpeed = 180;
  let selvitysP = selvitys.create(selvitysX, selvitysY, "selvitys");
  selvitysP.setVelocityY(selvitysSpeed);
  selvitysP.setScale(0.5, 0.5);
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
  let bullet = bullets.get(player.x, player.y - 30);
  if (bullet) {
    bullet.key = "bullet";
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.enableBody(true, player.x, player.y - 30, true, true);
    bullet.body.velocity.y = -1000;
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
  this.explosionSound.play();
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
  health += 1;
  healthText.setText("Tukikuukaudet: " + health);
  this.drinkSound.play();
  // Destroy enemy
  beer.disableBody(true, true);
}

//Function for player touching plagiarism accusation
function playerPlagiarized(player, object) {
  if (object.texture.key !== "safeArea") {
    health = 0;
  }
  plagiarisms.getChildren().forEach(function (plagiarism) {
    plagiarism.disableBody(true, true);
  }, this);
}

// Function for bullet hitting an enemy
function bulletHitSelvitys(bullet, selvitys) {
  // Increase score
  selvitysHealth -= 1;
  bullet.disableBody(true, true);
  if (selvitysHealth <= 0) {
    let kaboom = this.add
      .sprite(selvitys.x, selvitys.y, "kaboom")
      .setScale(1.5);
    this.explosionSound.play();
    kaboom.anims.play("kaboom");
    // Destroy bullet and enemy
    selvitys.disableBody(true, true);
    selvitysHealth = 4;
  }
}

//Function for player touching enemy
function playerHitSelvitys(player, selvitys) {
  // Decrease health
  health -= 10;
  healthText.setText("Tukikuukaudet: " + health);
  score -= 25;
  scoreText.setText("Opintopisteet: " + score + "/180");
  //Destroy enemy
  selvitys.disableBody(true, true);
}

function loseHealth() {
  health -= 1;
  healthText.setText("Tukikuukaudet: " + health);
}

function disablePlayer() {
  player.setTint(0xff0000); // Change the player's color to red to indicate they are disabled
  player.setVelocity(0, 0); // Stop the player's movement
  canShoot = false; // Set the canShoot variable to false to prevent the player from shooting
  this.warningSound.play();
  // Set a timer to re-enable the player after 5 seconds
  // Create the flashing text
  let disabledText = this.add.text(400, 300, "MOODLEN KÄYTTÖKATKO", {
    fontFamily: "Arial",
    fontSize: 48,
    color: "#ff0000",
  });
  disabledText.setOrigin(0.5);

  // Make the text flash using a tween
  this.tweens.add({
    targets: disabledText,
    alpha: 0,
    duration: 500,
    yoyo: true,
    repeat: -1,
  });

  this.time.addEvent({
    delay: 3500,
    callback: function () {
      player.setTint(0xffffff); // Reset the player's color
      canShoot = true; // Allow the player to shoot again
      disabledText.destroy();
      this.warningSound.stop();
    },
    callbackScope: this,
  });
}
