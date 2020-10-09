/* eslint-disable no-alert */
import { setConfig, getConfig } from './data';

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

export const sortScores = (scores) => {
  const scoresToSort = [...scores];
  const sortedScores = scoresToSort.sort((a, b) => b.score - a.score);
  return sortedScores.splice(0, 10);
};
/* eslint-enable no-alert */
