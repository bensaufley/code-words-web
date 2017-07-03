import React from 'react';
import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import SignUp from '../../src/containers/SignUp';

const wrapper = wrapContainer()(<SignUp />);

describe('(Container) SignUp', () => {
  it('renders without exploding', () => {
    expect(findRenderedComponentWithType(wrapper, SignUp)).to.exist;
  });
});
