import UUID from 'uuid';
import Dummy from './dummy';
import GameDummy from './game';
import UserDummy from './user';

export default class PlayerDummy extends Dummy {
  static TRAITS = {
    team: function (team) { this.team = team === true ? ['a', 'b'][Math.round(Math.random())] : team; },
    role: function (role) { this.role = role === true ? ['transmitter', 'decoder'][Math.round(Math.random())] : role; }
  }

  constructor({ user, game } = {}) {
    super(arguments);
    game = game || new GameDummy();
    user = user || new UserDummy();
    this.id = UUID.v4();
    this.gameId = game.id;
    this.role = null;
    this.team = null;
    this.user = user;
    this.processTraits(arguments[0]);
  }

  serialize() {
    let { id, gameId, role, team, user } = this;
    return { id, gameId, role, team, user: user.serialize() };
  }
}
