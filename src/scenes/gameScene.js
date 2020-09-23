/* eslint-disable no-undef */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  loadAdventureGirl () {
    const adventureGirlStayPath = '../src/assets/adventureGirl/stay/';
    const adventureGirlRunPath = '../src/assets/adventureGirl/run/';

    // stay
    this.load.image('player0', `${adventureGirlStayPath}adventureGirlStay.png`);
    this.load.image('player1', `${adventureGirlStayPath}adventureGirlStay1.png`);
    this.load.image('player2', `${adventureGirlStayPath}adventureGirlStay2.png`);
    this.load.image('player3', `${adventureGirlStayPath}adventureGirlStay3.png`);
    this.load.image('player4', `${adventureGirlStayPath}adventureGirlStay4.png`);
    this.load.image('player5', `${adventureGirlStayPath}adventureGirlStay5.png`);
    this.load.image('player6', `${adventureGirlStayPath}adventureGirlStay6.png`);
    this.load.image('player7', `${adventureGirlStayPath}adventureGirlStay7.png`);
    this.load.image('player8', `${adventureGirlStayPath}adventureGirlStay8.png`);
    this.load.image('player9', `${adventureGirlStayPath}adventureGirlStay9.png`);

    // run
    this.load.image('playerRun0', `${adventureGirlRunPath}adventureGirlRun.png`);
    this.load.image('playerRun1', `${adventureGirlRunPath}adventureGirlRun1.png`);
    this.load.image('playerRun2', `${adventureGirlRunPath}adventureGirlRun2.png`);
    this.load.image('playerRun3', `${adventureGirlRunPath}adventureGirlRun3.png`);
    this.load.image('playerRun4', `${adventureGirlRunPath}adventureGirlRun4.png`);
    this.load.image('playerRun5', `${adventureGirlRunPath}adventureGirlRun5.png`);
    this.load.image('playerRun6', `${adventureGirlRunPath}adventureGirlRun6.png`);
    this.load.image('playerRun7', `${adventureGirlRunPath}adventureGirlRun7.png`);
  }

  renderAdventureGirl () {
    this.anims.create({
      key: "player",
      frames: [
        { key: "player0" },
        { key: "player1" },
        { key: "player2" },
        { key: "player3" },
        { key: "player4" },
        { key: "player5" },
        { key: "player6" },
        { key: "player7" },
        { key: "player8" },
        { key: "player9", duration: 50 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "playerRunning",
      frames: [
        { key: "playerRun0" },
        { key: "playerRun1" },
        { key: "playerRun2" },
        { key: "playerRun3" },
        { key: "playerRun4" },
        { key: "playerRun5" },
        { key: "playerRun6" },
        { key: "playerRun7", duration: 50 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // this.add.sprite(50, config.height - 130, "player0").play("playerRunning");
    this.player = this.physics.add.sprite(
      50,
      config.height - 200,
      "player0"
    );
    this.player.setGravityY(0);
    this.player.setDepth(2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  }

  loadDesert () {
    const desertPath = '../src/assets/desert/';
    this.load.image('bgDessert', `${desertPath}BG.png`);
    this.load.image('ground', `${desertPath}desertPlatform.png`);
  }

  renderDesert () {
    this.add.image(config.width / 2, config.height / 2 - 200, 'bgDessert');
    this.platforms = this.add.tileSprite(50, config.height - 50, config.width * 2, 93, 'ground')
    this.physics.add.existing(this.platforms, true);
  }

  loadLetter () {
    this.load.image('letter', '../src/assets/letters/letterBox1.png');
  }

  renderLetter() {
    this.letterBox = this.add.sprite(config.width - 90, config.height - 130, "letter");
    this.text = this.add.text(16, 16, 'S', {
      fontSize: "28px",
      fill: "#fff",
    });
    Phaser.Display.Align.In.Center(this.text, this.letterBox);
  }

  renderScore() {
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
  }

  setCollision(objectToCollideA, objectToCollideB) {
    this.physics.add.collider(objectToCollideA, objectToCollideB);
  }

  moveObject(objectToMove, xMovement, xPositionToDisapear) {
    if (objectToMove.x < xPositionToDisapear) {
      objectToMove.destroy();
    }
    else {
      objectToMove.x += xMovement;
    }
  }

  playerRun() {
    this.moveObject(this.platforms, -5, -750);
    this.moveObject(this.letterBox, -5, -750);
    this.moveObject(this.text, -5, -750);
  }

  jump() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(1200);
    }
  }

  preload() {
    this.loadAdventureGirl();
    this.loadDesert();
    this.loadLetter();
  }

  create() {
    this.renderDesert();
    this.renderAdventureGirl();
    this.renderLetter();
    this.renderScore();
    this.setCollision(this.player, this.platforms);

    this.menuButton = new UiButton(this, 680, 50, 'redButton', 'greenButton', 'Menu', 'Title');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.running = false;
    this.stand = false;
  }

  update() {
    this.jump();

    if (this.cursors.right.isDown) {
      this.playerRun();
      if (!this.running) {
        this.player.anims.play("playerRunning");
        this.running = true;
      }
      this.stand = false;
    } 
    else {
      if (!this.stand) {
        this.player.anims.play("player");
        this.stand = true;
      }
      this.running = false;
    }
  }
}
/* eslint-enable no-undef */
