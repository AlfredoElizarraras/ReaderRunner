/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';
import { getScores } from '../objects/data';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.scores = '';
    this.menuButton = new UiButton(this, 400, 500, 'redButton', 'greenButton', 'Menu', 'Title');
    getScores().then((scores) => {
      this.zone = this.add.zone(
        config.width / 2,
        config.height / 2,
        config.width,
        config.height,
      );

      for (let i = 0; i < scores.result.length; i += 1) {
        this.scores += `PLAYER: ${scores.result[i].user}, SCORE: ${scores.result[i].score}\n`;
      }
      this.madeByText = this.add.text(0, 0, this.scores, {
        fontSize: '12px',
        fill: '#fff',
      });

      Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    });
  }
}
/* eslint-enable no-unused-expressions */
/* eslint-enable no-undef */
/* eslint-enable func-names */
