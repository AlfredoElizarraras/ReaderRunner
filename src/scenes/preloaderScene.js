/* eslint-disable no-undef */
import 'phaser';
import redTick from '../assets/ui/redTick.png';
import grayTick from '../assets/ui/grayTick.png';
import redButton from '../assets/ui/redButton.png';
import greenButton from '../assets/ui/greenButton.png';
import audio from '../assets/audio/TownTheme.ogg';
import logo from '../assets/microverselogo.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  displayProgressBar() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on(
      'complete',
      () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      },
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  loadGameAssets() {
    // load assets needed in our game
    this.load.image('redTick', redTick);
    this.load.image('grayTick', grayTick);
    this.load.image('redButton', redButton);
    this.load.image('greenButton', greenButton);
    this.load.audio('bgMusic', [audio]);
    this.load.image('logo', logo);
    this.displayProgressBar();
  }

  preload() {
    this.displayProgressBar();
    this.loadGameAssets();
  }
}
/* eslint-enable no-undef */
