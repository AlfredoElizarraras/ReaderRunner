/* eslint-disable no-undef */
import * as utils from './utils';

const Letter = (() => {
  let currentLetterInBox = null;
  let objLetterBox = null;
  let objTextInBox = null;
  let lettersArray = null;

  const loadLetter = (scene, key, path, numberOfAssets) => {
    utils.loadImageFolder(scene, key, path, numberOfAssets);
  };

  const loadWordToCollect = (word) => {
    if (word !== null || word !== '') {
      word += word + word;
      let wordArray = word.split('');
      lettersArray = [];
      for (let i = 0; i < wordArray.length; i += 1) {
        for (let j = 0; j < 3; j += 1)
          lettersArray.push(wordArray[i]);
      }
    }
  };

  const createRandomLetter = () => {
    let randNum = utils.randomNumber(0, lettersArray.length - 1);
    return lettersArray[randNum];
  };

  const centerLetter = () => {
    Phaser.Display.Align.In.Center(objTextInBox, objLetterBox);
  };

  const createLetterBox = (scene, letterXPosition, letterYPosition, key, letterGravityY) => {
    currentLetterInBox = createRandomLetter();
    objLetterBox = scene.physics.add.sprite(letterXPosition, letterYPosition, key);
    objLetterBox.setGravityY(letterGravityY);
    objTextInBox = scene.add.text(16, 16, currentLetterInBox, {
      fontSize: '28px',
      fill: '#fff',
    });
    centerLetter();
    return objLetterBox;
  };

  const changeLetter = (xPositionToChange) => {
    if (objTextInBox.x < xPositionToChange) {
      currentLetterInBox = createRandomLetter();
      objTextInBox.text = currentLetterInBox;
    }
  };

  const moveLetter = (minYMovement, maxYMovement, xMove, xPosToReappear, xPosToDisappear) => {
    const letterYMovement = utils.randomNumber(minYMovement, maxYMovement);
    utils.moveObjectLeftToRight(
      objLetterBox,
      xMove,
      letterYMovement,
      xPosToDisappear,
      xPosToReappear,
    );
    utils.moveObjectLeftToRight(
      objTextInBox,
      xMove,
      letterYMovement,
      xPosToDisappear,
      xPosToReappear,
    );
    changeLetter(xPosToDisappear);
    centerLetter();
    objLetterBox.setVelocityY(0);
  };

  const getCurrentLetterInBox = () => currentLetterInBox;

  return {
    loadLetter,
    loadWordToCollect,
    createLetterBox,
    moveLetter,
    getCurrentLetterInBox,
  };
})();

export default Letter;
/* eslint-enable no-undef */
