import expect from '../test-setup';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import SignInContainer from '../../src/components/SignIn';

describe('(Container) SignIn', () => {
  it('renders without exploding', () => {
    const wrapper = wrapContainer()(SignInContainer);
    expect(findRenderedDOMComponentWithTag(wrapper, 'form')).to.exist;
  });
});
