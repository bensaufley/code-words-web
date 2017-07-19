import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ExternalHome from '../../src/components/ExternalHome';

describe('(component) ExternalHome', () => {
  it('renders without exploding', () => {
    let wrapper = shallow(<ExternalHome />);

    expect(wrapper).to.have.lengthOf(1);
  });
});
