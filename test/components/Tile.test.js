import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Tile from '../../src/components/Tile';

describe('(component) Tile', () => {
  it('renders without exploding', () => {
    let wrapper = shallow(<Tile />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
