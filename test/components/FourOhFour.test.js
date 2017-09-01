import expect from '../test-setup';
import React from 'react';
import { shallow } from 'enzyme';

import FourOhFour from '../../src/components/FourOhFour';

describe('(component) FourOhFour', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<FourOhFour />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
