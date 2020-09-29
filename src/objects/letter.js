/* eslint-disable no-undef */
import * as utils from "./utils";

const Letter = (() => {
  let currentLetterInBox = null;
  let objLetterBox = null; 
  let objTextInBox = null;

  const loadLetter = (scene, key, path, numberOfAssets) => {
    utils.loadImageFolder(scene, key, path, numberOfAssets);
  };

  const createRandomLetter = () => {
    const lettersArray = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "X",
      "Y",
      "Z",
    ];
    return lettersArray[utils.randomNumber(0, 24)];
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
  
  const moveLetter = (minimumYMovement, maximumYMovement, xMovement, xPositionToReappear, xPositionToDisappear) => {
    let letterYMovement = utils.randomNumber(minimumYMovement, maximumYMovement);
    utils.moveObjectLeftToRight(
      objLetterBox,
      xMovement,
      letterYMovement,
      xPositionToDisappear,
      xPositionToReappear
    );
    utils.moveObjectLeftToRight(
      objTextInBox,
      xMovement,
      letterYMovement,
      xPositionToDisappear,
      xPositionToReappear
    );
    changeLetter(xPositionToDisappear);
    centerLetter();
    objLetterBox.setVelocityY(0);
  };

  const getCurrentLetterInBox = () => {
   return currentLetterInBox
  };

  return {
    loadLetter,
    createLetterBox,
    moveLetter,
    getCurrentLetterInBox,
  };
})();

export default Letter;
/* eslint-enable no-undef */
