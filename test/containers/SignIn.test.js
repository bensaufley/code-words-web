import React from 'react';
import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer, unmountContainer } from '../support/container-helper';

import SignIn from '../../src/containers/SignIn';

const wrapper = wrapContainer()(<SignIn />);

describe('(Container) SignIn', () => {
  it('renders without exploding', () => {
    expect(findRenderedComponentWithType(wrapper, SignIn)).to.exist;
  });
});
