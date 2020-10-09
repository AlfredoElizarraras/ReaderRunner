import * as utils from './utils';
import platform from '../assets/platform/platform0.png';

const Platform = (() => {
  let platformOne = null;
  let platformTwo = null;

  const loadPlatform = (scene) => {
    scene.load.image('platform0', platform);
  };

  const createPlatform = (scene, key, platformXPosition, platformYPosition,
    platformLenght, platformHeight) => {
    platformOne = scene.add.tileSprite(
      platformXPosition,
      platformYPosition,
      platformLenght,
      platformHeight,
      key,
    );

    platformTwo = scene.add.tileSprite(
      platformXPosition * 3,
      platformYPosition,
      platformLenght,
      platformHeight,
      key,
    );

    scene.physics.add.existing(platformOne, true);

    return platformOne;
  };

  const movePlatform = (xMove, yMove, positionToDisappear, positionToReappear) => {
    utils.moveObjectLeftToRight(
      platformOne,
      xMove,
      yMove,
      positionToDisappear,
      positionToReappear,
    );
    utils.moveObjectLeftToRight(
      platformTwo,
      xMove,
      yMove,
      positionToDisappear,
      positionToReappear,
    );
  };

  return {
    loadPlatform,
    createPlatform,
    movePlatform,
  };
})();

export default Platform;