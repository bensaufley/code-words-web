import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppHeader from '../../src/containers/AppHeader';

const wrapper = shallow(<Provider store={createStore(() => {}, {})}><AppHeader /></Provider>);

describe('(Component) AppHeader', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.lengthOf(1);
  });
});
