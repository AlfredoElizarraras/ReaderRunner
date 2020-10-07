/* eslint-disable no-undef */
import 'phaser';
import logo from '../assets/microverselogo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', logo);
  }

  create() {
    this.scene.start('Preloader');
  }
}
/* eslint-enable no-undef */
