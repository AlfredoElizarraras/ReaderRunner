/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import 'phaser';
import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.madeByText = this.add.text(0, 0, 'Created By: Oscar Alfredo Gómez Elizarrarás', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    this.madeByText.setY(600);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: this.destroy,
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}
/* eslint-enable no-unused-expressions */
/* eslint-enable no-undef */
/* eslint-enable func-names */
