import UUID from 'uuid';
import Faker from 'faker';
import Dummy from './dummy';

export default class UserDummy extends Dummy {
  constructor(params, ...rest) {
    super(params, ...rest);
    this.id = UUID.v4();
    this.username = Faker.internet.userName();
    this.processTraits(params);
  }

  serialize() {
    const { id, username } = this;
    return { id, username };
  }
}
