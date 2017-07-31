import UUID from 'uuid';
import Faker from 'faker';
import Dummy from './dummy';

export default class UserDummy extends Dummy {
  constructor() {
    super(arguments);
    this.id = UUID.v4();
    this.username = Faker.internet.userName();
    this.processTraits(arguments[0]);
  }

  serialize() {
    let { id, username } = this;
    return { id, username };
  }
}
