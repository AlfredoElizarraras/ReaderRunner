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
    this.platformOne = this.add.tileSprite(50, config.height - 40, config.width * 2, 93, 'ground')
    this.platformTwo = this.add.tileSprite(config.width + 1, config.height - 40, config.width * 2, 93, 'ground')
    this.physics.add.existing(this.platformOne, true);
  }

  loadLetter () {
    this.load.image('letter', '../src/assets/letters/letterBox1.png');
  }

  createRandomLetter() {
    let lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
                        'H', 'I', 'J', 'K', 'L', 'M', 'N',
                        'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                        'V', 'X', 'Y', 'Z'];
    return lettersArray[Phaser.Math.Between(0, 24)];
  }

  renderLetter() {
    this.letterBox = this.add.sprite(config.width - 90, config.height - 130, "letter");
    this.currentLetter = this.createRandomLetter();
    this.text = this.add.text(16, 16, this.currentLetter, {
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

  moveObject(objectToMove, xMovement, yMovement, xPositionToDisappear, xPositionToReappear) {
    if (objectToMove.x < xPositionToDisappear) {
      objectToMove.x = xPositionToReappear
      objectToMove.y = yMovement;
    }
    else {
      objectToMove.x += xMovement;
    }
  }

  changeLetter (xPositionToChange) {
    if (this.letterBox.x < xPositionToChange){
      this.text.text = this.createRandomLetter();
    }
  }

  playerRun() {
    let letterYMovement = Phaser.Math.Between(config.height - 130, config.height - 210);
    this.moveObject(this.platformOne, -2, config.height - 40, -750, config.width);
    this.moveObject(this.platformTwo, -2, config.height - 40, -750, config.width);
    this.moveObject(this.letterBox, -2, letterYMovement, -30, config.width);
    this.moveObject(this.text, -2, letterYMovement, -30, config.width);
    this.changeLetter(-30);
    Phaser.Display.Align.In.Center(this.text, this.letterBox);
  }

  jump() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(1500);
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
    this.setCollision(this.player, this.platformOne);

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
