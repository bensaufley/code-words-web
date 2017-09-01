import expect from '../../test-setup';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TileDummy from '../../dummies/tile';

import Tile from '../../../src/components/Game/Tile';

describe('(component) Tile', () => {
  context('non-decodable', () => {
    it('renders without exploding', () => {
      const tile = new TileDummy().serialize(),
            wrapper = shallow(<Tile {...tile} index={Math.round(Math.random() * 25)} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('decodable', () => {
    it('renders without exploding', () => {
      const tile = new TileDummy({ revealed: true }).serialize(),
            wrapper = shallow(<Tile {...tile} decodeAction={() => {}} index={Math.round(Math.random() * 25)} />);

      expect(wrapper).to.have.lengthOf(1);
    });

    it('triggers decodeAction on click', () => {
      const tile = new TileDummy().serialize(),
            decodeActionStub = sinon.stub(),
            index = Math.round(Math.random() * 25),
            wrapper = shallow(<Tile {...tile} decodeAction={decodeActionStub} index={index} />);

      wrapper.find('button').simulate('click');

      expect(decodeActionStub).to.have.been.calledWith({ tile: index });
    });
  });
});
