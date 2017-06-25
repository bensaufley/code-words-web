import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Home from '../../src/components/Home';

const wrapper = shallow(<Home />);

describe('(Component) Home', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1);
  });
});
