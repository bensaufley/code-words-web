import { expect } from 'chai';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { Form } from 'semantic-ui-react';
import { wrapContainer, getWrappedComponent } from '../support/container-helper';

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
