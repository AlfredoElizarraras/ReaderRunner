import playerStay0 from '../assets/adventureGirl/stay/adventureGirlStay0.png';
import playerStay1 from '../assets/adventureGirl/stay/adventureGirlStay1.png';
import playerStay2 from '../assets/adventureGirl/stay/adventureGirlStay2.png';
import playerStay3 from '../assets/adventureGirl/stay/adventureGirlStay3.png';
import playerStay4 from '../assets/adventureGirl/stay/adventureGirlStay4.png';
import playerStay5 from '../assets/adventureGirl/stay/adventureGirlStay5.png';
import playerStay6 from '../assets/adventureGirl/stay/adventureGirlStay6.png';
import playerStay7 from '../assets/adventureGirl/stay/adventureGirlStay7.png';
import playerStay8 from '../assets/adventureGirl/stay/adventureGirlStay8.png';
import playerStay9 from '../assets/adventureGirl/stay/adventureGirlStay9.png';

import playerRun0 from '../assets/adventureGirl/run/adventureGirlRun0.png';
import playerRun1 from '../assets/adventureGirl/run/adventureGirlRun1.png';
import playerRun2 from '../assets/adventureGirl/run/adventureGirlRun2.png';
import playerRun3 from '../assets/adventureGirl/run/adventureGirlRun3.png';
import playerRun4 from '../assets/adventureGirl/run/adventureGirlRun4.png';
import playerRun5 from '../assets/adventureGirl/run/adventureGirlRun5.png';
import playerRun6 from '../assets/adventureGirl/run/adventureGirlRun6.png';
import playerRun7 from '../assets/adventureGirl/run/adventureGirlRun7.png';

const Player = (() => {
  let running = false;
  let stand = true;

  const loadPlayer = (scene) => {
    scene.load.image('playerStay0', playerStay0);
    scene.load.image('playerStay1', playerStay1);
    scene.load.image('playerStay2', playerStay2);
    scene.load.image('playerStay3', playerStay3);
    scene.load.image('playerStay4', playerStay4);
    scene.load.image('playerStay5', playerStay5);
    scene.load.image('playerStay6', playerStay6);
    scene.load.image('playerStay7', playerStay7);
    scene.load.image('playerStay8', playerStay8);
    scene.load.image('playerStay9', playerStay9);

    scene.load.image('playerRun0', playerRun0);
    scene.load.image('playerRun1', playerRun1);
    scene.load.image('playerRun2', playerRun2);
    scene.load.image('playerRun3', playerRun3);
    scene.load.image('playerRun4', playerRun4);
    scene.load.image('playerRun5', playerRun5);
    scene.load.image('playerRun6', playerRun6);
    scene.load.image('playerRun7', playerRun7);
  };

  const createPlayerAnimations = (scene) => {
    //  return utils.createAnimation(scene, key, nAsset);
    scene.anims.create({
      key: 'playerStay',
      frames: [
        { key: 'playerStay0' },
        { key: 'playerStay1' },
        { key: 'playerStay2' },
        { key: 'playerStay3' },
        { key: 'playerStay4' },
        { key: 'playerStay5' },
        { key: 'playerStay6' },
        { key: 'playerStay7' },
        { key: 'playerStay8' },
        { key: 'playerStay9', duration: 50 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'playerRun',
      frames: [
        { key: 'playerRun0' },
        { key: 'playerRun1' },
        { key: 'playerRun2' },
        { key: 'playerRun3' },
        { key: 'playerRun4' },
        { key: 'playerRun5' },
        { key: 'playerRun6' },
        { key: 'playerRun7', duration: 50 },
      ],
      frameRate: 10,
      repeat: -1,
    });
  };

  const createPlayer = (scene, playerXPosition, playerYPosition, key) => scene.physics.add.sprite(
    playerXPosition,
    playerYPosition,
    key,
  );

  const addPhysicsToPlayer = (player, gravityY, depth, bounce, addCollider) => {
    player.setGravityY(gravityY);
    player.setDepth(depth);
    player.setBounce(bounce);
    player.setCollideWorldBounds(addCollider);
  };

  const jump = (player, jumpForce) => {
    if (player.body.touching.down) {
      player.setVelocityY(jumpForce);
      return true;
    }
    return false;
  };

  const playerRun = (player, key) => {
    if (!running) {
      player.anims.play(key);
      running = true;
    }
    stand = false;
  };

  const playerStay = (player, key) => {
    if (!stand) {
      player.anims.play(key);
      stand = true;
    }
    running = false;
  };

  return {
    loadPlayer,
    createPlayer,
    createPlayerAnimations,
    addPhysicsToPlayer,
    jump,
    playerRun,
    playerStay,
  };
})();

export default Player;
