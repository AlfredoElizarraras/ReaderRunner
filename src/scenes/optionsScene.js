import "phaser";
import UiButton from '../objects/uiButton';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super("Options");
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, "Options", { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, "redTick");
    this.musicText = this.add.text(250, 190, "Music Enabled", { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, "redTick");
    this.soundText = this.add.text(250, 290, "Sound Enabled", { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on(
      "pointerdown",
      function () {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      }.bind(this)
    );

    this.soundButton.on(
      "pointerdown",
      function () {
        this.model.soundOn = !this.model.soundOn;
        this.updateAudio();
      }.bind(this)
    );

    this.menuButton = new UiButton(this, 400, 500, 'redButton', 'greenButton', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture("grayTick");
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture("redTick");
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture("grayTick");
    } else {
      this.soundButton.setTexture("redTick");
    }
  }
}
