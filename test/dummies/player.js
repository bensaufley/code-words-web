import UUID from 'uuid';
import GameDummy from './game';
import UserDummy from './user';

export default class PlayerDummy {
  constructor({ user, game } = {}) {
    game = game || new GameDummy();
    user = user || new UserDummy();
    this.id = UUID.v4();
    this.gameId = game.id;
    this.role = null;
    this.team = null;
    this.user = user;
  }

  serialize() {
    let { id, gameId, role, team, user } = this;
    return { id, gameId, role, team, user: user.serialize() };
  }
}
