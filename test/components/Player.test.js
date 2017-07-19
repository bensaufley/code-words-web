import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PlayerDummy from '../dummies/player';

import Player from '../../src/components/Player';

describe('(component) Player', () => {
  context('before game - editable', () => {
    it('renders without exploding', () => {
      let player = new PlayerDummy().serialize(),
          wrapper = shallow(<Player {...player} editable={true} isUser={true} />);

      expect(wrapper).to.have.lengthOf(1);
    });

    context('with role and team', () => {
      it('renders without exploding', () => {
        let player = new PlayerDummy().serialize();
        player.team = 'a';
        player.role = 'transmitter';
        let wrapper = shallow(<Player {...player} editable={true} isUser={true} />);

        expect(wrapper).to.have.lengthOf(1);
      });
    });
  });

  context('during/after game - not editable', () => {
    it('renders without exploding', () => {
      let player = new PlayerDummy().serialize();
      player.team = 'a';
      player.role = 'transmitter';
      let wrapper = shallow(<Player {...player} editable={false} isUser={false} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });
});
