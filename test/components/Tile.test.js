import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TileDummy from '../dummies/tile';

import Tile from '../../src/components/Tile';

describe('(component) Tile', () => {
  it('renders without exploding', () => {
    const tile = new TileDummy().serialize(),
          wrapper = shallow(<Tile {...tile} index={Math.round(Math.random() * 25)} />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
