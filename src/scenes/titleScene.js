/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  createButton(label, scene, number = 1) {
    this.gameButton = this.add.sprite(100, 200, 'redButton').setInteractive();
    this.centerButton(this.gameButton, number);

    this.gameText = this.add.text(0, 0, `${label}`, {
      fontSize: '20px',
      fill: '#fff',
    });

    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on(
      'pointerdown',
      () => {
        this.scene.start(`${scene}`);
      },
    );

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('greenButton');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('redButton');
    });
  }

  create() {
    this.gameButton = new UiButton(this, config.width / 2, 100, 'redButton', 'greenButton', 'Play', 'Game');
    this.leaderBoardButton = new UiButton(this, config.width / 2, 211, 'redButton', 'greenButton', 'Leader Board', 'LeaderBoard');
    this.settingsButton = new UiButton(this, config.width / 2, 322, 'redButton', 'greenButton', 'Settings', 'Options');
    this.creditsButton = new UiButton(this, config.width / 2, 433, 'redButton', 'greenButton', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
/* eslint-enable no-undef */
/* eslint-enable import/no-unresolved */
