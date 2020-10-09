import Logic
  from '../objects/logic';

Logic.initializeLogic('TEST', 2, -1);
Logic.checkGameStatus('T');

describe('Test suit for utility methods.', () => {
  it('Should get the current score', () => {
    expect(Logic.getScore()).toBe(2);
  });

  it('Should get the collected letters', () => {
    expect(Logic.getCollectedLetters()).toBe('T');
  });

  it('Should check when the game is Over', () => {
    Logic.checkGameStatus('a'); // 1
    Logic.checkGameStatus('a'); // 0
    Logic.checkGameStatus('a'); // game over
    expect(Logic.isGameOver()).toBe(true);
  });

  it('Should check when the game if the player wins', () => {
    Logic.initializeLogic('T');
    Logic.checkGameStatus('T');
    expect(Logic.isGameOver()).toBe(true);
  });
});
