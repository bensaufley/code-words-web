import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';

import FormInputWithError from '../../src/components/FormInputWithError';

describe('(Component) FormInputWithError', () => {
  context('without error', () => {
    it('renders without exploding', () => {
      let wrapper = render(<FormInputWithError meta={{}} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });

  context('with error', () => {
    it('renders without exploding', () => {
      let wrapper = render(<FormInputWithError meta={{ touched: true, error: 'Bad!' }} />);

      expect(wrapper).to.have.lengthOf(1);
    });
  });
});
