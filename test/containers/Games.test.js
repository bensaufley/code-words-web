import { expect } from 'chai';
import { findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

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
          { id: '510924' },
          { id: '812470' }
        ]
      };
      const wrapper = wrapContainer({ initialState })(GamesContainer);

      expect(scryRenderedDOMComponentsWithTag(wrapper, 'li')).to.have.lengthOf(3);
    });
  });
});
