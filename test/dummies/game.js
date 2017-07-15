import UUID from 'uuid';
import Faker from 'faker';
import UserDummy from './user';
import PlayerDummy from './player';

export default class GameDummy {
  constructor(players = 4/*, started = false, completed = false*/) {
    this.id = UUID.v4();
    this.board = new Array(25).fill('').map(() => {
      return {
        revealed: false,
        type: 'redacted',
        word: Faker.hacker.noun()
      };
    });
    this.users = new Array(players).fill('').map(() => new UserDummy().serialize());
    this.players = this.users.map((u) => new PlayerDummy({ user: u, game: this }).serialize());
  }

  serialize() {
    return {
      game: {
        id: this.id,
        board: this.board,
        activePlayerId: null,
        completed: false,
        started: false
      },
      players: this.players,
      users: this.users
    };
  }
}
