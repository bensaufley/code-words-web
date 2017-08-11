import { expect } from 'chai';
import { findRenderedComponentWithType, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Menu } from 'semantic-ui-react';
import { wrapContainer } from '../../support/container-helper';
import GameDummy from '../../dummies/game';

import GamesContainer from '../../../src/modules/Games';

describe('(Container) Games', () => {
  it('renders without exploding', () => {
    const initialState = {
      session: {
        apiToken: '12345',
        apiUser: { username: 'test-user' }
      }
    };
    const wrapper = wrapContainer({ initialState })(GamesContainer);

    expect(findRenderedComponentWithType(wrapper, Menu)).to.exist;
  });

  context('with games', () => {
    it('renders without exploding', () => {
      const newGame = new GameDummy(),
            startedGame = new GameDummy({ started: true }),
            completedGame = new GameDummy({ completed: true }),
            initialState = {
              session: {
                apiToken: '12345',
                apiUser: { username: 'test-user' }
              },
              games: {
                [newGame.id]: newGame.serialize(),
                [startedGame.id]: startedGame.serialize(),
                [completedGame.id]: completedGame.serialize()
              }
            };
      const wrapper = wrapContainer({ initialState })(GamesContainer);

      expect(scryRenderedComponentsWithType(wrapper, Menu.Item)).to.have.lengthOf(4);
    });
  });
});
