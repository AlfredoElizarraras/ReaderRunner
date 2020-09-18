import 'phaser';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('logo', '../src/assets/microverselogo.png');
  }
 
  create () {
    this.scene.start('Preloader');
  }
};