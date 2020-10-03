/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import 'phaser';
import config from '../config/config';
import { getScores } from '../objects/data';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.scores = '';
    getScores().then((scores) => {
      this.creditsText = this.add.text(0, 0, 'Scores', {
        fontSize: '32px',
        fill: '#fff',
      });

      this.zone = this.add.zone(
        config.width / 2,
        config.height / 2,
        config.width,
        config.height,
      );

      Phaser.Display.Align.In.Center(this.creditsText, this.zone);
      for (let i = 0; i < scores.result.length; i += 1) {
        this.scores += `PLAYER: ${scores.result[i].user}, SCORE: ${scores.result[i].score}\n\n\n`;
      }
      this.madeByText = this.add.text(0, 0, this.scores, {
        fontSize: '26px',
        fill: '#fff',
      });

      Phaser.Display.Align.In.Center(this.madeByText, this.zone);

      this.madeByText.setY(config.height + 100);

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
        y: config.height * -1,
        ease: 'Power1',
        duration: 40000,
        delay: 1,
        onComplete: function () {
          this.madeByTween.destroy;
          this.scene.start('Title');
        }.bind(this),
      });
    });
  }
}
/* eslint-enable no-unused-expressions */
/* eslint-enable no-undef */
/* eslint-enable func-names */
