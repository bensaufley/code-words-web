import UUID from 'uuid';
import Dummy from './dummy';
import GameDummy from './game';
import UserDummy from './user';

export default class PlayerDummy extends Dummy {
  static TRAITS = {
    team(team) { this.team = team === true ? ['a', 'b'][Math.round(Math.random())] : team; },
    role(role) { this.role = role === true ? ['transmitter', 'decoder'][Math.round(Math.random())] : role; }
  }

  constructor(params = {}, ...rest) {
    const { user = new UserDummy(), game = new GameDummy() } = params;
    super(params, ...rest);
    this.id = UUID.v4();
    this.gameId = game.id;
    this.role = null;
    this.team = null;
    this.user = user;
    this.processTraits(params);
  }

  serialize() {
    const { id, gameId, role, team, user } = this;
    return { id, gameId, role, team, user: user.serialize() };
  }
}
