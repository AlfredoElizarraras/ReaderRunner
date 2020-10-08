/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 560,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};
/* eslint-enable no-undef */
/* eslint-enable import/no-unresolved */
