import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import GameMenu from '../../../src/modules/GameMenu';
import GameDummy from '../../dummies/game';

describe('(Component) GameMenu', () => {
  context('closed', () => {
    it('renders without exploding', () => {
      let game = new GameDummy({ started: true }),
          wrapper = render(
        <GameMenu
          game={game.serialize()}
          players={game.players.map((p) => p.serialize())}
          activePlayerId={game.players[0].id}
          session={{ apiUser: { id: game.players[0].user.id } }}
          hideMenu={() => {}}
          menuOpen={false}
          />
      );

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('open', () => {
    it('renders without exploding', () => {
      let game = new GameDummy(),
          wrapper = render(
        <GameMenu
          game={game.serialize()}
          players={game.players.map((p) => p.serialize())}
          activePlayerId={game.players[0].id}
          session={{ apiUser: { id: game.players[0].id } }}
          hideMenu={() => {}}
          menuOpen={true}
          />
      );

      expect(wrapper).to.have.lengthOf(1);
    });
  });
});
