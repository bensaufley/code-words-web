import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Sidebar } from 'semantic-ui-react';
import { wrapContainer } from '../support/container-helper';
import GameMenu from '../../src/components/GameMenu';
import GameDummy from '../dummies/game';

describe('(Component) GameMenu', () => {
  context('before game has started', () => {
    let game, props, initialState;

    beforeEach(() => {
      game = new GameDummy();
      const { id: gameId, ...gameProps } = game.serialize();
      props = {
        ...gameProps,
        gameId,
        session: { apiUser: { id: game.players[0].user.id } },
        hideMenu: () => {},
        menuOpen: false
      };
      initialState = {
        games: {
          [game.id]: game.serialize()
        }
      };
    });

    context('closed', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer({ initialState })(GameMenu, props);

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });

    context('open', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer({ initialState })(GameMenu, { ...props, menuOpen: true });

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });
  });

  context('after game has started', () => {
    let game, props, initialState;

    beforeEach(() => {
      game = new GameDummy({ started: true });
      const { activePlayerId, id: gameId, players, turns } = game;
      props = {
        activePlayerId,
        gameId,
        players,
        session: { apiUser: { id: game.players[0].user.id } },
        turns,
        hideMenu: () => {},
        menuOpen: false
      };
      initialState = {
        games: {
          [game.id]: game.serialize()
        }
      };
    });

    context('closed', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer({ initialState })(GameMenu, props);

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });

    context('open', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer({ initialState })(GameMenu, { ...props, menuOpen: true });

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });
  });
});