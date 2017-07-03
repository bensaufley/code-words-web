import React from 'react';
import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import jwt from 'jsonwebtoken';
import { wrapContainer, unmountContainer } from '../support/container-helper';

import AppHeader from '../../src/containers/AppHeader';

describe('(Container) AppHeader', () => {
  context('when logged out', () => {
    it('renders without exploding', () => {
      const wrapper = wrapContainer()(<AppHeader />);

      expect(findRenderedComponentWithType(wrapper, AppHeader)).to.exist;
    });
  });

  context('when logged in', () => {
    it('renders without exploding', () => {
      const apiToken = jwt.sign({ userId: '1234567' }, 'big secret', { expiresIn: '7 days' }),
            initialState = { session: { apiToken } };
      const wrapper = wrapContainer({ initialState })(<AppHeader />);

      expect(findRenderedComponentWithType(wrapper, AppHeader)).to.exist;
    });
  });
});
