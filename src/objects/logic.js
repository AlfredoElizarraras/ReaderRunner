const Logic = (() => {
  let word;
  let wordToCapture;
  let correctAnswerPoints;
  let incorrectAnswerPoints;
  let currentLetter;
  let score = 0;
  let gameOver;
  let collectedLetters = '';
  let isWinner;

  const initializeLogic = (wordToLearn, correctPoints, incorrectPoints) => {
    word = wordToLearn;
    wordToCapture = word.split('');
    correctAnswerPoints = correctPoints;
    incorrectAnswerPoints = incorrectPoints;
    [currentLetter] = wordToCapture;
    score = 0;
    gameOver = false;
    isWinner = null;
    collectedLetters = '';
  };

  const checkGameStatus = (collectedLetter) => {
    if (collectedLetter === currentLetter) {
      score += correctAnswerPoints;
      collectedLetters += collectedLetter;
      if (word === collectedLetters) {
        isWinner = true;
        gameOver = true;
      } else {
        wordToCapture.splice(0, 1);
        [currentLetter] = wordToCapture;
      }
    } else if (score > 0) {
      score += incorrectAnswerPoints;
    } else {
      isWinner = false;
      gameOver = true;
    }
  };

  const getScore = () => score;

  const isGameOver = () => gameOver;

  const getCollectedLetters = () => collectedLetters;

  const playerWon = () => isWinner;

  return {
    initializeLogic,
    checkGameStatus,
    getCollectedLetters,
    getScore,
    isGameOver,
    playerWon,
  };
})();

export default Logic;
