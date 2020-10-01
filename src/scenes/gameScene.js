/* eslint-disable no-undef */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';
import Player from '../objects/player';
import Letter from '../objects/letter';
import Platform from '../objects/platform';
import * as gamePlayerOptions from '../config/gamePlayerOptions';
import * as gameLetterOptions from '../config/gameLetterOptions';
import * as gamePlatformOptions from '../config/gamePlatformOptions';
import { setCollision } from '../objects/utils';

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
    this.load.image('bgDessert', '../src/assets/BG.png');
    Platform.loadPlatform(
      this,
      gamePlatformOptions.platformKey,
      gamePlatformOptions.platformPath,
      gamePlatformOptions.platformNumberOfAssets,
    );
  }

  renderDesert() {
    this.bg = this.add.image(config.width / 2, config.height / 2 - 200, 'bgDessert');
    this.platform = Platform.createPlatform(
      this,
      gamePlatformOptions.platformKeyToRender,
      gamePlatformOptions.platformXStartPosition,
      gamePlatformOptions.platformYStartPosition,
      gamePlatformOptions.platformLength,
      gamePlatformOptions.platformHeight,
    );
  }

  renderScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
    this.collectedLetters = this.add.text(16, 50, '', {
      fontSize: '32px',
      fill: '#006400',
    });
  }

  collectLetter(player, letter) {
    letter.disableBody(true, true);
    let currentLetter = Letter.getCurrentLetterInBox();
    if (this.currentLetter === currentLetter){
      this.score += this.correctAnswerPoints;
      this.collectedLetters.text += currentLetter;
      if (this.word === this.collectedLetters.text) {
        this.gameOver = true;
        let username = prompt('What is your name: ');
        this.gameStatus = this.add.text(0, config.height / 2 - 100, `You WIN: ${username}`, {
          fontSize: '75px',
          fill: '#000000',
        });
      }
      else {
        this.wordToCapture.splice(0, 1);
        this.currentLetter = this.wordToCapture[0];
      }
    }
    else {
      if (this.score > 0) {
        this.gameStatus = null;
        this.score += this.incorrectAnswerPoints;
      }
      else {
        this.gameStatus = this.add.text(config.width / 2, config.height /2, 'You Lose', {
          fontSize: '50px',
          fill: '#e4002a',
        });
        Phaser.Display.Align.In.Center(this.gameStatus, this.bg);
        this.gameOver = true;
      }
    }
    this.scoreText.text = `score: ${this.score}`;
    letter.enableBody(
      true,
      gameLetterOptions.letterYMinimumPosition, 
      gameLetterOptions.letterXReappearPosition,
      true,
      true
    );
    Letter.moveLetter(
      gameLetterOptions.letterYMinimumPosition,
      gameLetterOptions.letterYMaximumPosition,
      gameLetterOptions.letterXVelocity,
      gameLetterOptions.letterXReappearPosition,
      gameLetterOptions.letterXDisappearPosition,
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
    this.physics.add.overlap(
      this.player,
      this.letterBox,
      this.collectLetter,
      null,
      this,
    );
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
    this.word = 'SAM';
    this.correctAnswerPoints = 2;
    this.incorrectAnswerPoints = -1;
    Letter.loadWordToCollect(this.word);
    this.wordToCapture = this.word.split('');
    this.currentLetter = this.wordToCapture[0];
    this.gameOver = false;
  }

  create() {
    this.renderDesert();
    this.renderAdventureGirl();
    this.renderScore();
    setCollision(this, this.player, this.platform);
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
    if (this.gameOver) {
      Player.playerStay(this.player, gamePlayerOptions.playerStayKey);
      return;
    }
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
      Platform.movePlatform(
        gamePlatformOptions.platformXMovement,
        gamePlatformOptions.platformYMovement,
        gamePlatformOptions.platformXPositionToDisappear,
        gamePlatformOptions.platformXPositionToReappear,
      );
    } else {
      Player.playerStay(this.player, gamePlayerOptions.playerStayKey);
    }
  }
}
/* eslint-enable no-undef */
