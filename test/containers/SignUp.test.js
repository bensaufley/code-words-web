import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import SignUpContainer, { SignUp } from '../../src/containers/SignUp';


describe('(Container) SignUp', () => {
  it('renders without exploding', () => {
    const wrapper = wrapContainer()(SignUpContainer);

    expect(findRenderedComponentWithType(wrapper, SignUp)).to.exist;
  });
});
