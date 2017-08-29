import { expect } from '../../test-setup';
import { findRenderedComponentWithType, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Menu } from 'semantic-ui-react';

import { wrapContainer } from '../../support/container-helper';
import GameDummy from '../../dummies/game';
import UserDummy from '../../dummies/user';

import GamesContainer from '../../../src/components/Games';

describe('(Container) Games', () => {
  let user;

  beforeEach(() => {
    user = new UserDummy();
  });

  it('renders without exploding', () => {
    const initialState = {
      session: {
        apiToken: '12345',
        apiUser: user.serialize()
      }
    };
    const wrapper = wrapContainer({ initialState })(GamesContainer);

    expect(findRenderedComponentWithType(wrapper, Menu)).to.exist;
  });

  context('with games', () => {
    it('renders without exploding', () => {
      const newGame = new GameDummy({ withUser: user }),
            startedGame = new GameDummy({ started: true, withUser: user }),
            completedGame = new GameDummy({ completed: true, withUser: user }),
            initialState = {
              session: {
                apiToken: '12345',
                apiUser: user.serialize()
              },
              games: {
                [newGame.id]: newGame.serialize(),
                [startedGame.id]: startedGame.serialize(),
                [completedGame.id]: completedGame.serialize()
              }
            };
      const wrapper = wrapContainer({ initialState })(GamesContainer);

      expect(scryRenderedComponentsWithType(wrapper, Menu.Item)).to.have.lengthOf(3);
    });
  });
});
