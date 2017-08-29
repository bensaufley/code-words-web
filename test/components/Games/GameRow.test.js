import { expect } from '../../test-setup';
import React from 'react';
import { shallow } from 'enzyme';

import GameDummy from '../../dummies/game';

import GameRow from '../../../src/components/Games/GameRow';

describe('(component) GameRow', () => {
  context('new game', () => {
    it('renders without exploding', () => {
      const game = new GameDummy({ players: 1 }).serialize(),
            wrapper = shallow(
              <GameRow
                {...game}
                currentUserId={game.players[0].user.id}
                deleteGameHandler={() => {}}
              />
            );

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('current game', () => {
    it('renders without exploding', () => {
      const game = new GameDummy({ started: true }).serialize(),
            activeUser = game.players.find((p) => p.id === game.activePlayerId).user,
            wrapper = shallow(
              <GameRow
                {...game}
                currentUserId={activeUser.id}
                deleteGameHandler={() => {}}
              />
            );

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('lost game', () => {
    it('renders without exploding', () => {
      const game = new GameDummy({ completed: true }).serialize(),
            winningTeam = game.turns[game.turns.length - 1].winner,
            winner = game.players.find((p) => p.team !== winningTeam).user,
            wrapper = shallow(
              <GameRow
                {...game}
                currentUserId={winner.id}
                deleteGameHandler={() => {}}
              />
            );

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('won game', () => {
    it('renders without exploding', () => {
      const game = new GameDummy({ completed: true }).serialize(),
            winningTeam = game.turns[game.turns.length - 1].winner,
            winner = game.players.find((p) => p.team === winningTeam).user,
            wrapper = shallow(
              <GameRow
                {...game}
                currentUserId={winner.id}
                deleteGameHandler={() => {}}
              />
            );

      expect(wrapper).to.have.lengthOf(1);
    });
  });
});
