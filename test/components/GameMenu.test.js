import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Sidebar } from 'semantic-ui-react';
import { wrapContainer } from '../support/container-helper';
import GameMenu from '../../src/components/GameMenu';
import GameDummy from '../dummies/game';

describe('(Component) GameMenu', () => {
  context('before game has started', () => {
    let game, props;

    beforeEach(() => {
      game = new GameDummy();
      props = {
        gameId: game.id,
        players: game.players.map((p) => p.serialize()),
        activePlayerId: null,
        session: { apiUser: { id: game.players[0].user.id } },
        hideMenu: () => {},
        menuOpen: false
      };
    });

    context('closed', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer()(GameMenu, props);

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });

    context('open', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer()(GameMenu, props);

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });
  });

  context('after game has started', () => {
    let game, props;

    beforeEach(() => {
      game = new GameDummy({ started: true });
      props = {
        gameId: game.id,
        players: game.players.map((p) => p.serialize()),
        activePlayerId: game.players[0].id,
        session: { apiUser: { id: game.players[0].user.id } },
        hideMenu: () => {},
        menuOpen: false
      };
    });

    context('closed', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer()(GameMenu, props);

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });

    context('open', () => {
      it('renders without exploding', () => {
        const wrapper = wrapContainer()(GameMenu, props);

        expect(findRenderedComponentWithType(wrapper, Sidebar)).to.exist;
      });
    });
  });
});
