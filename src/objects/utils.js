/* eslint-disable no-alert */
import 'phaser';
import { setConfig, getConfig } from './data';

export const loadImageFolder = (
  scene,
  commonKey,
  commonPath,
  numberOfAssets,
) => {
  for (let i = 0; i < numberOfAssets; i += 1) {
    scene.load.image(`${commonKey}${i}`, `${commonPath}${i}.png`);
  }
};

export const createAnimation = (scene, commonKey, numberOfAssets) => {
  const keys = [];
  for (let i = 1; i < numberOfAssets; i += 1) {
    if (i === numberOfAssets - 1) {
      keys.push({ key: `${commonKey}${i}`, duration: 50 });
    } else {
      keys.push({ key: `${commonKey}${i}` });
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

export const setCollision = (scene, objectToCollideA, objectToCollideB) => {
  scene.physics.add.collider(objectToCollideA, objectToCollideB);
};

export const moveObjectLeftToRight = (
  objectToMove,
  xMovement,
  yMovement,
  xPositionToDisappear,
  xPositionToReappear,
) => {
  if (objectToMove.x < xPositionToDisappear) {
    objectToMove.x = xPositionToReappear;
    objectToMove.y = yMovement;
  } else {
    objectToMove.x += xMovement;
  }
};

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getUserName = () => {
  let username = null;
  const usernameDB = getConfig('username');
  if (usernameDB === null) {
    username = prompt('What is your name \n(max 8 chars): ');
    while (username.length > 8) {
      username = prompt('The username must be less than 8 chars: ');
    }
    setConfig('username', username);
  } else {
    username = usernameDB;
  }
  return username.toUpperCase();
};
/* eslint-enable no-alert */
