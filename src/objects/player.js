import * as utils from './utils';

const Player = (() => {
  let running = false;
  let stand = true;

  const loadPlayer = (scene, key, path, numberOfAssets) => {
    utils.loadImageFolder(scene, key, path, numberOfAssets);
  };

  const createPlayerAnimations = (scene, key, nAsset) => utils.createAnimation(scene, key, nAsset);

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