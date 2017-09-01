import expect from '../../test-setup';
import React from 'react';
import { shallow } from 'enzyme';
import PlayerDummy from '../../dummies/player';

import { Player } from '../../../src/components/Game/Player';

describe('(component) Player', () => {
  context('before game - editable', () => {
    it('renders without exploding', () => {
      const player = new PlayerDummy().serialize(),
            wrapper = shallow(<Player {...player} isUser />);

      expect(wrapper).to.have.lengthOf(1);
    });

    context('with role and team', () => {
      it('renders without exploding', () => {
        const player = new PlayerDummy().serialize();
        player.team = 'a';
        player.role = 'transmitter';
        const wrapper = shallow(<Player {...player} isUser />);

        expect(wrapper).to.have.lengthOf(1);
      });
    });
  });

  context('during/after game - not editable', () => {
    it('renders without exploding', () => {
      const player = new PlayerDummy().serialize();
      player.team = 'a';
      player.role = 'transmitter';
      const wrapper = shallow(<Player {...player} isUser={false} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });
});
