import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { wrapContainer } from '../support/container-helper';

import AppHeaderContainer, { AppHeader } from '../../src/containers/AppHeader';

describe('(Container) AppHeader', () => {
  context('when logged out', () => {
    it('renders Container without exploding', () => {
      const wrapper = wrapContainer()(AppHeaderContainer);

      expect(findRenderedComponentWithType(wrapper, AppHeader)).to.exist;
    });
  });

  context('when logged in', () => {
    let sandbox, session, logOutStub, wrapper;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      session = { apiToken: jwt.sign({ userId: '1234567' }, 'big secret', { expiresIn: '7 days' }) };
      logOutStub = sinon.stub();
      wrapper = shallow(<AppHeader location={{}} session={session} logOut={logOutStub} />);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('renders Container without exploding', () => {
      const wrapper = wrapContainer({ initialState: { session } })(AppHeaderContainer);

      expect(findRenderedComponentWithType(wrapper, AppHeader)).to.exist;
    });

    it('confirms logout attempt before processing', () => {
      sandbox.stub(global.window, 'confirm');

      wrapper.find('.log-out').simulate('click', { preventDefault() {} });

      expect(global.window.confirm).to.have.been.calledWith('Are you sure you want to log out?');
    });

    it('does not call logOut if confirm is rejected', () => {
      sandbox.stub(global.window, 'confirm').returns(false);

      wrapper.find('.log-out').simulate('click', { preventDefault() {} });

      expect(logOutStub).not.to.have.been.called;
    });

    it('calls logOut if confirm is accepted', () => {
      sandbox.stub(global.window, 'confirm').returns(true);

      wrapper.find('.log-out').simulate('click', { preventDefault() {} });

      expect(logOutStub).to.have.been.called;
    });
  });
});
