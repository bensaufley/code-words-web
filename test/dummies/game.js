import UUID from 'uuid';
import Dummy from './dummy';
import UserDummy from './user';
import PlayerDummy from './player';
import TileDummy from './tile';
import TurnDummy from './turn';

export default class GameDummy extends Dummy {
  static TRAITS = {
    started(started) {
      this.started = started;
      if (started) {
        const teams = ['a', 'a', 'b', 'b'],
              roles = ['transmitter', 'decoder', 'transmitter', 'decoder'];
        this.players = this.players.map(({ user }, i) => new PlayerDummy({
          user,
          game: this,
          team: teams[i],
          role: roles[i]
        }));
        this.activePlayerId = this.players[Math.floor(Math.random() * 4)].id;
        this.turns = TurnDummy.generateIncompleteGame(this);
      }
    },
    completed(completed) {
      if (completed) {
        this.processTraits({ started: true });
        this.turns = TurnDummy.generateCompleteGame(this);
      }
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
    this.turns = [];
    this.processTraits(params);
  }

  serialize() {
    return {
      game: {
        ...this.attrs('id', 'board', 'activePlayerId', 'completed', 'started'),
        turns: this.turns.map((t) => t.serialize())
      },
      players: this.players.map((p) => p.serialize())
    };
  }
}
