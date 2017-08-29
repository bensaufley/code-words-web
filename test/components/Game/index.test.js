import { expect } from '../../test-setup';
import { Redirect } from 'react-router-dom';
import { findRenderedComponentWithType, findRenderedDOMComponentWithClass, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../../support/container-helper';
import GameDummy from '../../dummies/game';
import Tile from '../../../src/components/Game/Tile';

import GameContainer from '../../../src/components/Game';

describe('(Container) Games', () => {
  describe('component', () => {
    // TODO: spec Game component
  });

  describe('container', () => {
    context('logged out', () => {
      it('renders a Redirect', () => {
        const wrapper = wrapContainer()(GameContainer);

        expect(findRenderedComponentWithType(wrapper, Redirect).props.to).to.eq('/');
      });
    });

    context('while logged in', () => {
      let initialState, ownProps;

      beforeEach(() => {
        initialState = { session: { apiToken: '12345', apiUser: { id: '29841', username: 'test-user' } } };
        ownProps = { match: { params: { id: '98765' } } };
      });

      context('without games', () => {
        it('renders a loading div', () => {
          const wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

          expect(findRenderedDOMComponentWithClass(wrapper, 'loader')).to.exist;
        });
      });

      context('without matching game', () => {
        it('renders a Redirect', () => {
          initialState.games = {};
          const wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

          expect(findRenderedComponentWithType(wrapper, Redirect).props.to).to.eq('/');
        });
      });

      context('with game', () => {
        context('in a new state', () => {
          it('renders without exploding', () => {
            const game = new GameDummy().serialize();
            game.id = '98765';
            game.players[0].user.id = '29841';
            initialState.games = { 98765: game };
            const wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

            expect(scryRenderedComponentsWithType(wrapper, Tile)).have.lengthOf(25);
          });
        });

        context('started', () => {
          it('renders without exploding', () => {
            const game = new GameDummy({ started: true }).serialize();
            game.id = '98765';
            game.players[0].user.id = '29841';
            initialState.games = { 98765: game };
            const wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

            expect(scryRenderedComponentsWithType(wrapper, Tile)).have.lengthOf(25);
          });
        });

        context('after complete', () => {
          it('renders without exploding', () => {
            const game = new GameDummy({ completed: true }).serialize();
            game.id = '98765';
            game.players[0].user.id = '29841';
            initialState.games = { 98765: game };
            // console.log(initialState.games[98765]);
            const wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

            expect(scryRenderedComponentsWithType(wrapper, Tile)).have.lengthOf(25);
          });
        });
      });
    });
  });
});
