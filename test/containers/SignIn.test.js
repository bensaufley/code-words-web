import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import SignInContainer, { SignIn } from '../../src/containers/SignIn';

describe('(Container) SignIn', () => {
  it('renders without exploding', () => {
    const wrapper = wrapContainer()(SignInContainer);
    expect(findRenderedComponentWithType(wrapper, SignIn)).to.exist;
  });
});
