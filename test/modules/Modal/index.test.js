import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../../support/container-helper';

import ModalContainer, { Modal } from '../../../src/modules/Modal';

describe('(Container) Modal', () => {
  context('inactive', () => {
    it('renders container without exploding', () => {
      const wrapper = wrapContainer()(ModalContainer);

      expect(findRenderedComponentWithType(wrapper, Modal)).to.exist;
    });
  });

  context('active', () => {
    let initialState;
    beforeEach(() => {
      initialState = {
        modal: {
          shown: true,
          message: 'This is a test message',
          type: 'success'
        }
      };
    });

    it('renders container without exploding', () => {
      const wrapper = wrapContainer({ initialState })(ModalContainer);

      expect(findRenderedComponentWithType(wrapper, Modal)).to.exist;
    });
  });
});
