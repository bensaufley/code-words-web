import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import FourOhFour from '../../../src/modules/FourOhFour';

describe('(component) FourOhFour', () => {
  it('renders without exploding', () => {
    let wrapper = shallow(<FourOhFour />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
