import { expect } from 'chai';
import { findRenderedComponentWithType, findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import HomeContainer from '../../src/components/Home';
import GamesContainer from '../../src/components/Games';

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
      expect(findRenderedComponentWithType(wrapper, GamesContainer)).to.exist;
    });
  });
});
