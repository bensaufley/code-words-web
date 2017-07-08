import { expect } from 'chai';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import SignUpContainer from '../../src/containers/SignUp';

describe('(Container) SignUp', () => {
  it('renders without exploding', () => {
    const wrapper = wrapContainer()(SignUpContainer);
    expect(findRenderedDOMComponentWithTag(wrapper, 'form')).to.exist;
  });
});
