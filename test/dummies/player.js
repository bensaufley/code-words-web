import UUID from 'uuid';

export default class PlayerDummy {
  constructor({ user, game }) {
    this.id = UUID.v4();
    this.userId = user.id;
    this.gameId = game.id;
    this.role = null;
    this.team = null;
  }

  serialize() {
    let { id, userId, gameId, role, team } = this;
    return { id, userId, gameId, role, team };
  }
}
