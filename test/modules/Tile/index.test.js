import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TileDummy from '../../dummies/tile';

import Tile from '../../../src/modules/Tile';

describe('(component) Tile', () => {
  it('renders without exploding', () => {
    let tile = new TileDummy().serialize(),
        wrapper = shallow(<Tile {...tile} />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
