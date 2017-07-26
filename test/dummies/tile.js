import Faker from 'faker';

export default class TileDummy {
  constructor({ revealed, type, word } = {}) {
    this.revealed = revealed || false;
    this.type = type || 'redacted';
    this.word = word || Faker.hacker.noun();
  }

  serialize() {
    return {
      revealed: this.revealed,
      type: this.type,
      word: this.word
    };
  }
}
