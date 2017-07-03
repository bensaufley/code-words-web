import React from 'react';
import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import Modal from '../../src/containers/Modal';

const wrapper = wrapContainer()(<Modal />);

describe('(Container) Modal', () => {
  it('renders without exploding', () => {
    expect(findRenderedComponentWithType(wrapper, Modal)).to.exist;
  });
});
