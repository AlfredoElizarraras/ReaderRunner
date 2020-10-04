import Letter from '../objects/letter';

describe('Test suit for letter module methods', () => {
  it('Should get the current Letter in box.', () => {
    Letter.loadWordToCollect('A');
    expect(Letter.getCurrentLetterInBox()).toBe('A');
  });
});