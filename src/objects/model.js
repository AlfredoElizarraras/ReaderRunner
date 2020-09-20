export default class Model {
  constructor() {
    this.isSoundOn = true;
    this.isMusicOn = true;
    this.isMusicPlaying = false;
  }

  set musicOn(value) {
    this.isMusicOn = value;
  }

  get musicOn() {
    return this.isMusicOn;
  }

  set soundOn(value) {
    this.isSoundOn = value;
  }

  get soundOn() {
    return this.isSoundOn;
  }

  set bgMusicPlaying(value) {
    this.isMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.isMusicPlaying;
  }
}