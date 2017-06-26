import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignIn from '../../src/components/SignIn';

const wrapper = shallow(<SignIn />);

describe('(Component) SignIn', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.lengthOf(1);
  });
});
