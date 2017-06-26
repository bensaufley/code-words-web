import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Modal from '../../src/containers/Modal';

const wrapper = shallow(<Provider store={createStore(() => {}, {})}><Modal /></Provider>);

describe('(Component) Modal', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.lengthOf(1);
  });
});
