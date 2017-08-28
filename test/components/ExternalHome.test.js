import { expect } from '../test-setup';
import React from 'react';
import { shallow } from 'enzyme';

import ExternalHome from '../../src/components/ExternalHome';

describe('(component) ExternalHome', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ExternalHome />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
