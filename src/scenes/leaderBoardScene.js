import Phaser from 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';
import { getScores } from '../objects/data';
import { sortScores } from '../objects/utils';

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

      const sortedScores = sortScores(scores.result);

      for (let i = 0; i < sortedScores.length; i += 1) {
        this.scores += `Place ${i + 1}: `;
        this.scores += `PLAYER: ${sortedScores[i].user}`;
        this.scores += `, SCORE: ${sortedScores[i].score}\n`;
      }
      this.madeByText = this.add.text(0, 0, this.scores, {
        fontSize: '12px',
        fill: '#fff',
      });

      Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    });
  }
}
