import { expect } from 'chai';
import { wrapContainer } from '../support/container-helper';

import TransmitFormContainer from '../../src/components/TransmitForm';

describe('(Container) TransmitForm', () => {
  it('renders without exploding', () => {
    wrapContainer(undefined, undefined, true)(TransmitFormContainer, {
      isOpen: true,
      onClose: () => {}
    });

    expect(document.body.querySelector('.ui.small.modal.transition.visible.active')).to.exist;
    document.body.innerHTML = '';
  });
});
