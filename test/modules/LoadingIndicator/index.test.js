import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import axios from 'axios';

import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { wrapContainer } from '../../support/container-helper';

import LoadingIndicatorContainer, { LoadingIndicator } from '../../../src/modules/LoadingIndicator';

describe('(Container) LoadingIndicator', () => {
  describe('component', () => {
    let sandbox, props;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      props = {
        loading: false,
        startLoading: sandbox.stub(),
        endLoading: sandbox.stub()
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('mounting', () => {
      it('sets axios request interceptor', () => {
        sandbox.stub(axios.interceptors.request, 'use');
        mount(<LoadingIndicator {...props} />);

        expect(axios.interceptors.request.use).to.have.been.calledOnce;
      });

      it('sets axios response interceptor', () => {
        sandbox.stub(axios.interceptors.response, 'use');
        mount(<LoadingIndicator {...props} />);

        expect(axios.interceptors.response.use).to.have.been.calledOnce;
      });

      it('intercepts axios requests with a call to startLoading', () => {
        mount(<LoadingIndicator {...props} />);

        return axios.get('http://bensaufley.com/').then(() => {
          expect(props.startLoading).to.have.been.called;
        });
      });

      it('intercepts axios responses with a call to endLoading', () => {
        mount(<LoadingIndicator {...props} />);

        return axios.get('http://bensaufley.com/').then(() => {
          expect(props.endLoading).to.have.been.called;
        });
      });

      it('intercepts failed axios responses with a call to endLoading', () => {
        mount(<LoadingIndicator {...props} />);

        return axios.get(null)
          .then(() => Promise.reject('Should not get here'))
          .catch((err) => {
            expect(err.message).not.to.eq('Should not get here');
            expect(props.endLoading).to.have.been.called;
          });
      });
    });

    describe('unmounting', () => {
      it('unsets axios request interceptor', () => {
        let loadingIndicator = mount(<LoadingIndicator {...props} />);
        sandbox.stub(axios.interceptors.request, 'eject');
        loadingIndicator.unmount();

        expect(axios.interceptors.request.eject).to.have.been.calledWith(sinon.match.number);
      });

      it('unsets axios response interceptor', () => {
        let loadingIndicator = mount(<LoadingIndicator {...props} />);
        sandbox.stub(axios.interceptors.response, 'eject');
        loadingIndicator.unmount();

        expect(axios.interceptors.response.eject).to.have.been.calledWith(sinon.match.number);
      });
    });
  });

  describe('container', () => {
    context('when not loading', () => {
      it('renders container without exploding', () => {
        const wrapper = wrapContainer()(LoadingIndicatorContainer);
        expect(findRenderedComponentWithType(wrapper, LoadingIndicator)).to.exist;
      });
    });

    context('when loading', () => {
      it('renders container without exploding', () => {
        const wrapper = wrapContainer({ initialState: { loading: true } })(LoadingIndicatorContainer);
        expect(findRenderedComponentWithType(wrapper, LoadingIndicator)).to.exist;
      });
    });
  });
});
