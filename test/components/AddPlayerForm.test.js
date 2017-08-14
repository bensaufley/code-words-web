import { expect } from 'chai';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import AddPlayerFormContainer from '../../src/components/AddPlayerForm';

describe('(Container) AddPlayerForm', () => {
  it('renders without exploding', () => {
    const wrapper = wrapContainer()(AddPlayerFormContainer);
    expect(findRenderedDOMComponentWithTag(wrapper, 'form')).to.exist;
  });
});
