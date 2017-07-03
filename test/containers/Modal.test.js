import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../support/container-helper';

import ModalContainer, { Modal } from '../../src/containers/Modal';

describe('(Container) Modal', () => {
  it('renders without exploding', () => {
    const wrapper = wrapContainer()(ModalContainer);

    expect(findRenderedComponentWithType(wrapper, Modal)).to.exist;
  });
});
