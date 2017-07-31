import { expect } from 'chai';
import { findRenderedComponentWithType, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { wrapContainer } from '../../support/container-helper';

import HomeContainer from '../../../src/modules/Home';
import Games from '../../../src/modules/Games';

describe('(Container) Home', () => {
  context('when unauthenticated', () => {
    it('renders without exploding', () => {
      const wrapper = wrapContainer()(HomeContainer);
      expect(findRenderedDOMComponentWithClass(wrapper, 'external-home')).to.exist;
    });
  });

  context('when authenticated', () => {
    it('renders without exploding', () => {
      const wrapper = wrapContainer({ initialState: { session: { apiToken: '12345', apiUser: { username: 'blah' } } } })(HomeContainer);
      expect(findRenderedComponentWithType(wrapper, Games)).to.exist;
    });
  });
});
