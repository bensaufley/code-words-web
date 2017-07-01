import React from 'react';
import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer, unmountContainer } from '../support/container-helper';

import AppHeader from '../../src/containers/AppHeader';

const wrapper = wrapContainer()(<AppHeader />);

describe('(Container) AppHeader', () => {
  it('renders without exploding', () => {
    expect(findRenderedComponentWithType(wrapper, AppHeader)).to.exist;
  });
});
