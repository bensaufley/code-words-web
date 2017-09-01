import expect from '../test-setup';
import React from 'react';
import { render } from 'enzyme';

import FormInputWithError from '../../src/components/FormInputWithError';

describe('(Component) FormInputWithError', () => {
  const input = { name: 'test-input' };

  context('without error', () => {
    it('renders without exploding', () => {
      const wrapper = render(<FormInputWithError input={input} type="text" meta={{}} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('with error', () => {
    it('renders without exploding', () => {
      const wrapper = render(<FormInputWithError input={input} type="text" meta={{ touched: true, error: 'Bad!' }} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });
});
