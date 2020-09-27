import 'phaser';

export const loadImageFolder = (scene, commonKey, commonPath, numberOfAssets) => {
  for (let i = 0; i < numberOfAssets; i += 1) {
    scene.load.image(`${commonKey}${i}`, `${commonPath}${i}.png`);
  }
};
