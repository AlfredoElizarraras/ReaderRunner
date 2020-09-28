/* eslint-disable no-undef */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';
import Player from '../objects/player';
import * as gamePlayerOptions from '../config/gamePlayerOptions';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  loadAdventureGirl() {
    // stay
    Player.loadPlayer(
      this,
      gamePlayerOptions.playerStayKey,
      gamePlayerOptions.playerStayPath,
      gamePlayerOptions.playerStayNumberOfAssets,
    );

    // run
    Player.loadPlayer(
      this,
      gamePlayerOptions.playerRunKey,
      gamePlayerOptions.playerRunPath,
      gamePlayerOptions.playerRunNumberOfAssets,
    );
  }

  renderAdventureGirl() {
    this.playerStayKeyFrames = Player.createPlayerAnimations(
      this,
      gamePlayerOptions.playerStayKey,
      gamePlayerOptions.playerStayNumberOfAssets,
    );

    this.playerRunKeyFrames = Player.createPlayerAnimations(
      this,
      gamePlayerOptions.playerRunKey,
      gamePlayerOptions.playerRunNumberOfAssets,
    );

    this.player = Player.createPlayer(
      this,
      gamePlayerOptions.playerInitialXPosition,
      gamePlayerOptions.playerInitialYPosition,
      this.playerStayKeyFrames[0].key,
    );

    Player.addPhysicsToPlayer(
      this.player,
      gamePlayerOptions.playerYGravity,
      gamePlayerOptions.playerDepth,
      gamePlayerOptions.playerBounce,
      gamePlayerOptions.playerHaveColliderWorldBounds,
    );
  }

  loadDesert() {
    const desertPath = '../src/assets/desert/';
    this.load.image('bgDessert', `${desertPath}BG.png`);
    this.load.image('ground', `${desertPath}desertPlatform.png`);
  }

  renderDesert() {
    this.add.image(config.width / 2, config.height / 2 - 200, 'bgDessert');
    this.platformOne = this.add.tileSprite(
      50,
      config.height - 40,
      config.width * 2,
      93,
      'ground',
    );
    this.platformTwo = this.add.tileSprite(
      config.width + 1,
      config.height - 40,
      config.width * 2,
      93,
      'ground',
    );
    this.physics.add.existing(this.platformOne, true);
  }

  loadLetter() {
    this.load.image('letter', '../src/assets/letters/letterBox1.png');
  }

  createRandomLetter() {
    const lettersArray = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'X',
      'Y',
      'Z',
    ];
    return lettersArray[Phaser.Math.Between(0, 24)];
  }

  moveLetter() {
    const letterYMovement = Phaser.Math.Between(
      config.height - 130,
      config.height - 210,
    );
    this.moveObject(this.letterBox, -5, letterYMovement, -30, config.width);
    this.moveObject(this.text, -5, letterYMovement, -30, config.width);
    this.changeLetter(-30);
    Phaser.Display.Align.In.Center(this.text, this.letterBox);
  }

  renderScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
  }

  collectLetter() {
    if (this.currentLetter === this.text.text) {
      this.score += 20;
    } else {
      this.score -= 10;
    }
    this.moveLetter();
    this.scoreText.setText(`score: ${this.score}`);
  }

  renderLetter() {
    this.letterBox = this.add.sprite(
      config.width - 90,
      config.height - 130,
      'letter',
    );
    this.currentLetter = this.createRandomLetter();
    this.text = this.add.text(16, 16, this.currentLetter, {
      fontSize: '28px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.text, this.letterBox);
    this.physics.add.overlap(
      this.player,
      this.letterBox,
      this.collectLetter,
      null,
      this,
    );
  }

  setCollision(objectToCollideA, objectToCollideB) {
    this.physics.add.collider(objectToCollideA, objectToCollideB);
  }

  moveObject(
    objectToMove,
    xMovement,
    yMovement,
    xPositionToDisappear,
    xPositionToReappear,
  ) {
    if (objectToMove.x < xPositionToDisappear) {
      objectToMove.x = xPositionToReappear;
      objectToMove.y = yMovement;
    } else {
      objectToMove.x += xMovement;
    }
  }

  changeLetter(xPositionToChange) {
    if (this.letterBox.x < xPositionToChange) {
      this.text.text = this.createRandomLetter();
    }
  }

  playerRun() {
    this.moveObject(
      this.platformOne,
      -5,
      config.height - 40,
      -750,
      config.width,
    );
    this.moveObject(
      this.platformTwo,
      -5,
      config.height - 40,
      -750,
      config.width,
    );
    this.moveLetter();
  }

  preload() {
    this.loadAdventureGirl();
    this.loadDesert();
    this.loadLetter();
  }

  create() {
    this.renderDesert();
    this.renderAdventureGirl();
    this.renderScore();
    this.setCollision(this.player, this.platformOne);
    this.renderLetter();

    this.menuButton = new UiButton(
      this,
      680,
      50,
      'redButton',
      'greenButton',
      'Menu',
      'Title',
    );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown) {
      Player.jump(this.player, gamePlayerOptions.playerJumpForce);
    }
    if (this.cursors.right.isDown) {
      Player.playerRun(this.player, gamePlayerOptions.playerRunKey);
      this.playerRun();
    } else {
      Player.playerStay(this.player, gamePlayerOptions.playerStayKey);
    }
  }
}
/* eslint-enable no-undef */
