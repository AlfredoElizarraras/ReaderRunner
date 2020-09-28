import 'phaser';

export const loadImageFolder = (scene, commonKey, commonPath, numberOfAssets) => {
  for (let i = 0; i < numberOfAssets; i += 1) {
    scene.load.image(`${commonKey}${i}`, `${commonPath}${i}.png`);
  }
};

export const createAnimation = (scene, commonKey, numberOfAssets) => {
  let keys = [];
  for (let i = 1; i < numberOfAssets; i += 1) {
    if (i === numberOfAssets - 1) {
      keys.push({key: `${commonKey}${i}`, duration: 50});
    }
    else {
      keys.push({key: `${commonKey}${i}`});
    }
  }
  scene.anims.create({
    key: commonKey,
    frames: keys,
    frameRate: 10,
    repeat: -1,
  });
  return keys;
};