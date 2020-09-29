/* eslint-disable no-undef */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';
import Player from '../objects/player';
import Letter from '../objects/letter';
import * as gamePlayerOptions from '../config/gamePlayerOptions';
import * as gameLetterOptions from '../config/gameLetterOptions';

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

  renderScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
  }

  collectLetter() {
    Letter.moveLetter(
      gameLetterOptions.letterYMinimumPosition,
      gameLetterOptions.letterYMaximumPosition,
      gameLetterOptions.letterXVelocity * 10,
      gameLetterOptions.letterXReappearPosition,
      gamePlayerOptions.playerInitialXPosition,
    );
  }

  renderLetter() {
    this.letterBox = Letter.createLetterBox(
      this,
      gameLetterOptions.letterXStartPosition,
      gameLetterOptions.letterYStartPosition,
      gameLetterOptions.letterBoxKeyToRender,
      gameLetterOptions.letterGravityY,
    );
    this.physics.add.collider(
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

  preload() {
    this.loadAdventureGirl();
    this.loadDesert();
    Letter.loadLetter(
      this,
      gameLetterOptions.letterBoxKey,
      gameLetterOptions.letterBoxPath,
      gameLetterOptions.letterBoxNumberOfAssets,
    );
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
      Letter.moveLetter(
        gameLetterOptions.letterYMinimumPosition,
        gameLetterOptions.letterYMaximumPosition,
        gameLetterOptions.letterXVelocity,
        gameLetterOptions.letterXReappearPosition,
        gameLetterOptions.letterXDisappearPosition,
      );
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
    } else {
      Player.playerStay(this.player, gamePlayerOptions.playerStayKey);
    }
  }
}
/* eslint-enable no-undef */
