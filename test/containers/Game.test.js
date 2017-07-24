import { expect } from 'chai';
import { Redirect } from 'react-router-dom';
import { findRenderedComponentWithType, findRenderedDOMComponentWithClass, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';
import GameDummy from '../dummies/game';
import Tile from '../../src/components/Tile';

import GameContainer from '../../src/containers/Game';

describe('(Container) Games', () => {
  describe('component', () => {
    // TODO: spec Game component
  });

  describe('container', () => {
    context('logged out', () => {
      it('renders a Redirect', () => {
        let wrapper = wrapContainer()(GameContainer);

        expect(findRenderedComponentWithType(wrapper, Redirect).props.to).to.eq('/');
      });
    });

    context('while logged in', () => {
      let initialState, ownProps;

      beforeEach(() => {
        initialState = { session: { apiToken: '12345', apiUser: { username: 'test-user' } } };
        ownProps = { match: { params: { id: '98765' } } };
      });

      context('without games', () => {
        it('renders a loading div', () => {
          let wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

          expect(findRenderedDOMComponentWithClass(wrapper, 'loader')).to.exist;
        });
      });

      context('without matching game', () => {
        it('renders a Redirect', () => {
          initialState.games = {};
          let wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

          expect(findRenderedComponentWithType(wrapper, Redirect).props.to).to.eq('/');
        });
      });

      context('with game', () => {
        it('renders without exploding', () => {
          let game = new GameDummy().serialize();
          game.game.id = '98765';
          initialState.games = { '98765': game };
          let wrapper = wrapContainer({ initialState })(GameContainer, ownProps);

          expect(scryRenderedComponentsWithType(wrapper, Tile)).to.exist.and.have.lengthOf(25);
        });
      });
    });
  });
});
