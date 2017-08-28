import { expect } from '../test-setup';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Card } from 'semantic-ui-react';
import { wrapContainer } from '../support/container-helper';
import GameDummy from '../dummies/game';

import TurnContainer from '../../src/components/Turn';

describe('(Container) Turn', () => {
  let game, initialState;

  beforeEach(() => {
    game = new GameDummy({ completed: true });
    initialState = {
      games: {
        [game.id]: game.serialize()
      }
    };
  });

  it('renders transmission without exploding', () => {
    const turn = game.turns.find((t) => t.event === 'transmission'),
          wrapper = wrapContainer({ initialState })(TurnContainer, { gameId: game.id, ...turn });
    expect(findRenderedComponentWithType(wrapper, Card)).to.exist;
  });

  it('renders decoding without exploding', () => {
    const turn = game.turns.find((t) => t.event === 'decoding'),
          wrapper = wrapContainer({ initialState })(TurnContainer, { gameId: game.id, ...turn });
    expect(findRenderedComponentWithType(wrapper, Card)).to.exist;
  });

  it('renders end without exploding', () => {
    const turn = game.turns.find((t) => t.event === 'end'),
          wrapper = wrapContainer({ initialState })(TurnContainer, { gameId: game.id, ...turn });
    expect(findRenderedComponentWithType(wrapper, Card)).to.exist;
  });
});
