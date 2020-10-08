/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import 'phaser';
import UiButton from '../objects/uiButton';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'redTick');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();

    this.musicButton.on(
      'pointerdown',
      () => {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      },
    );

    this.menuButton = new UiButton(this, 400, 500, 'redButton', 'greenButton', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('grayTick');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('redTick');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
}
/* eslint-enable no-undef */
/* eslint-enable import/no-unresolved */
