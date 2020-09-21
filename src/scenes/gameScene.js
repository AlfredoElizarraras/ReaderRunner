/* eslint-disable no-undef */
import 'phaser';
import config from '../config/config';
import UiButton from '../objects/uiButton';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  loadAdventureGirl () {
    const adventureGirlStayPath = '../src/assets/adventureGirl/stay/';
    this.load.image('player0', `${adventureGirlStayPath}adventureGirlStay.png`);
    this.load.image('player1', `${adventureGirlStayPath}adventureGirlStay1.png`);
    this.load.image('player2', `${adventureGirlStayPath}adventureGirlStay2.png`);
    this.load.image('player3', `${adventureGirlStayPath}adventureGirlStay3.png`);
    this.load.image('player4', `${adventureGirlStayPath}adventureGirlStay4.png`);
    this.load.image('player5', `${adventureGirlStayPath}adventureGirlStay5.png`);
    this.load.image('player6', `${adventureGirlStayPath}adventureGirlStay6.png`);
    this.load.image('player7', `${adventureGirlStayPath}adventureGirlStay7.png`);
    this.load.image('player8', `${adventureGirlStayPath}adventureGirlStay8.png`);
    this.load.image('player9', `${adventureGirlStayPath}adventureGirlStay9.png`);
  }

  renderAdventureGirl () {
    this.anims.create({
      key: "player",
      frames: [
        { key: "player0" },
        { key: "player1" },
        { key: "player2" },
        { key: "player3" },
        { key: "player4" },
        { key: "player5" },
        { key: "player6" },
        { key: "player7" },
        { key: "player8" },
        { key: "player9", duration: 50 },
      ],
      frameRate: 8,
      repeat: -1,
    });

    this.add.sprite(50, config.height - 130, "player0").play("player");
  }

  loadDesert () {
    const desertPath = '../src/assets/desert/';
    this.load.image('bgDessert', `${desertPath}BG.png`);
    this.load.image('ground', `${desertPath}desertPlatform.png`);
  }

  renderDesert () {
    this.add.image(config.width / 2, config.height / 2 - 200, 'bgDessert');
    this.platforms = this.physics.add.staticGroup();
    for (let index = 0; index < 1000; index += 128) {
      this.platforms.create(index, config.height - 50, "ground");      
    }
  }

  loadLetter () {
    this.load.image('letter', '../src/assets/letters/letterBox1.png');
  }

  renderLetter() {
    this.letterBox = this.add.sprite(config.width - 90, config.height - 130, "letter");
    this.text = this.add.text(16, 16, 'S', {
      fontSize: "28px",
      fill: "#fff",
    });
    Phaser.Display.Align.In.Center(this.text, this.letterBox);
  }

  renderScore() {
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
  }

  preload() {
    this.loadAdventureGirl();
    this.loadDesert();
    this.loadLetter();
  }

  create() {
    this.renderDesert();
    this.renderAdventureGirl();
    this.renderLetter();
    this.renderScore();

    this.menuButton = new UiButton(this, 680, 50, 'redButton', 'greenButton', 'Menu', 'Title');
  }
}
/* eslint-enable no-undef */
