import UUID from 'uuid';
import Dummy from './dummy';
import UserDummy from './user';
import PlayerDummy from './player';
import TileDummy from './tile';

export default class GameDummy extends Dummy {
  static TRAITS = {
    started(started) {
      this.started = started;
      if (started) {
        const teams = ['a', 'a', 'b', 'b'],
              roles = ['decoder', 'decoder', 'transmitter', 'transmitter'];
        this.players = this.players.map(({ user }) => new PlayerDummy({
          user,
          game: this,
          team: teams.splice(Math.floor(Math.random() * teams.length), 1)[0],
          role: roles.splice(Math.floor(Math.random() * roles.length), 1)[0]
        }));
        this.activePlayerId = this.players[Math.floor(Math.random() * 4)].id;
      }
    },
    completed(completed) {
      if (completed) this.processTraits({ started: true });
      this.completed = completed;
    }
  }

  constructor(params = {}, ...rest) {
    const { players = 4 } = params;
    super(params, ...rest);
    this.id = UUID.v4();
    this.board = new Array(25).fill('').map(() => new TileDummy().serialize());
    const users = new Array(players).fill('').map(() => new UserDummy());
    this.players = users.map((u) => new PlayerDummy({ user: u, game: this }));
    this.activePlayerId = null;
    this.completed = false;
    this.started = false;
    this.processTraits(params);
  }

  serialize() {
    return {
      game: this.attrs('id', 'board', 'activePlayerId', 'completed', 'started'),
      players: this.players.map((p) => p.serialize())
    };
  }
}
