import UUID from 'uuid';
import Faker from 'faker';

export default class UserDummy {
  constructor() {
    this.id = new UUID.v4();
    this.username = Faker.internet.userName();
  }

  serialize() {
    let { id, username } = this;
    return { id, username };
  }
}
