import { expect } from 'chai';
import { findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';
import GameDummy from '../dummies/game';

import GamesContainer from '../../src/containers/Games';

describe('(Container) Games', () => {
  it('renders without exploding', () => {
    let initialState = {
      session: {
        apiToken: '12345',
        apiUser: { username: 'test-user' }
      }
    };
    const wrapper = wrapContainer({ initialState })(GamesContainer);

    expect(findRenderedDOMComponentWithTag(wrapper, 'ul')).to.exist;
  });

  context('with games', () => {
    it('renders without exploding', () => {
      let initialState = {
        session: {
          apiToken: '12345',
          apiUser: { username: 'test-user' }
        },
        games: [
          new GameDummy().serialize(),
          new GameDummy().serialize()
        ]
      };
      const wrapper = wrapContainer({ initialState })(GamesContainer);

      expect(scryRenderedDOMComponentsWithTag(wrapper, 'li')).to.have.lengthOf(3);
    });
  });
});
