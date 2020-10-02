/* eslint-disable no-undef */
import 'phaser';
import { getUserName } from './utils';
import { saveScore } from './data';

const Logic = (() => {
  let word;
  let wordToCapture;
  let correctAnswerPoints;
  let incorrectAnswerPoints;
  let currentLetter;
  let score = 0;
  let gameOver;
  let collectedLetters = '';

  const initializeLogic = (wordToLearn, correctPoints, incorrectPoints) => {
    word = wordToLearn;
    wordToCapture = word.split('');
    correctAnswerPoints = correctPoints;
    incorrectAnswerPoints = incorrectPoints;
    [currentLetter] = wordToCapture;
    score = 0;
    gameOver = false;
    collectedLetters = '';
  };

  const checkGameStatus = (scene, collectedLetter, gameStatusObj) => {
    if (collectedLetter === currentLetter) {
      score += correctAnswerPoints;
      collectedLetters += collectedLetter;
      if (word === collectedLetters) {
        scene.time.delayedCall(1500, () => {
          const username = getUserName();
          gameStatusObj.text = `YOU WIN ${username}`;
          gameOver = true;
          saveScore(username, score).then((response) => {
            console.log(response);
            alert(response);
          });
        }, null, scene);
      } else {
        wordToCapture.splice(0, 1);
        [currentLetter] = wordToCapture;
      }
    } else if (score > 0) {
      score += incorrectAnswerPoints;
    } else {
      gameStatusObj.text = 'You lose';
      gameOver = true;
    }
  };

  const getScore = () => score;

  const isGameOver = () => gameOver;

  const getCollectedLetters = () => collectedLetters;

  return {
    initializeLogic,
    checkGameStatus,
    getCollectedLetters,
    getScore,
    isGameOver,
  };
})();

export default Logic;
/* eslint-enable no-undef */
