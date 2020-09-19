import 'phaser';
import config from '../config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
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
      function (pointer) {
        this.scene.start(`${scene}`);
      }.bind(this)
    );

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('greenButton');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('redButton');
    });
  }

  create() {
    // Game
    this.createButton('Play', 'Game', 1.5);
    this.createButton('Leader Board', 'Game', 0.5);
    this.createButton('Settings', 'Options', -0.5);
    this.createButton('Credits', 'Credits', -1.5);

    this.model = this.sys.game.globals.model;
    1
	
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
