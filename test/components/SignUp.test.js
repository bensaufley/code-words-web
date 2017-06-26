import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignUp from '../../src/components/SignUp';

const wrapper = shallow(<SignUp />);

describe('(Component) SignUp', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.lengthOf(1);
  });
});
