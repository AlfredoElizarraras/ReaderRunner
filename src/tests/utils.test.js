import { sortScores, randomNumber } from '../objects/utils';

describe('Test suit for utility functions', () => {
  it('Should return a sorted array of objects based on the score', () => {
    const scores = [
      {
        username: 'test2',
        score: 5,
      },
      {
        username: 'test',
        score: 10,
      },
      {
        username: 'test2',
        score: 15,
      },
    ];

    const sortedScores = [
      {
        username: 'test2',
        score: 15,
      },
      {
        username: 'test',
        score: 10,
      },
      {
        username: 'test2',
        score: 5,
      },
    ];

    expect(sortScores(scores)).toStrictEqual(sortedScores);
  });

  it('Should return a random number between a min and max', () => {
    expect(randomNumber(5, 5)).toBe(5);
  });
});