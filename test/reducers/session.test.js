import { expect } from 'chai';
import sinon from 'sinon';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { DispatchStub } from '../support/dispatch-helper';

import sessionReducer, { LOGGED_IN, LOGGED_OUT, loggedIn, loggedOut, logIn, logOut, signUp } from '../../src/reducers/session';
import { MODAL_SHOW } from '../../src/modules/Modal/ducks';

describe('(Ducks) session', () => {
  describe('reducer', () => {
    describe(LOGGED_IN, () => {
      it('returns state populated from payload', () => {
        let action = { type: LOGGED_IN, payload: { token: '98765', user: { username: 'flarg' } } };
        expect(sessionReducer({ apiToken: '12345', apiUser: { username: 'bloop' } }, action)).to.eql({ apiToken: '98765', apiUser: { username: 'flarg' } });
      });
    });

    describe (LOGGED_OUT, () => {
      it('resets to initial state', () => {
        expect(sessionReducer({ apiToken: '12345', apiUser: { username: 'bloop' } }, { type: LOGGED_OUT })).to.eql({ apiToken: null, apiUser: {} });
      });
    });

    describe('other actions', () => {
      context('with state passed', () => {
        it('returns passed state', () => {
          let initialState = { apiToken: 'blah', apiUser: { username: 'bloop' } };
          expect(sessionReducer(initialState, { type: 'ANOTHER_ACTION', payload: { foo: 'bar' } })).to.eql(initialState);
        });
      });

      context('without state passed', () => {
        it('returns default state', () => {
          expect(sessionReducer(undefined, { type: 'ANOTHER_ACTION', payload: { foo: 'bar' } })).to.eql({ apiToken: null, apiUser: {} });
        });
      });
    });
  });

  describe('actions', () => {
    describe('loggedIn', () => {
      let sandbox, token, expires;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        token = jwt.sign({ userId: '12345' }, 'super-secret', { expiresIn: '7 days' });
        expires = new Date(Math.floor(new Date().getTime()/1000) * 1000 + 7 * 24 * 60 * 60 * 1000);
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('creates cookies', () => {
        sandbox.stub(Cookies, 'set');

        loggedIn(token, { username: 'test-user' })(() => {});

        expect(Cookies.set).to.have.been.calledWith('apiToken', token, sinon.match({ expires }));
        expect(Cookies.set).to.have.been.calledWith('apiUser', { username: 'test-user' }, sinon.match({ expires }));
      });

      it(`returns action with type ${LOGGED_IN} and proper payload`, () => {
        let stub = new DispatchStub(),
            { dispatch } = stub;
        loggedIn(token, { username: 'test-user' })(dispatch);

        expect(stub).to.have.receivedDispatch({ type: LOGGED_IN, payload: { token, user: { username: 'test-user'} } });
      });
    });

    describe('loggedOut', () => {
      let sandbox;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('removes cookies', () => {
        sandbox.stub(Cookies, 'remove');

        loggedOut();

        expect(Cookies.remove).to.have.been.calledWith('apiToken');
        expect(Cookies.remove).to.have.been.calledWith('apiUser');
      });

      it(`returns action with type ${LOGGED_OUT}`, () => {
        let action = loggedOut();

        expect(action.type).to.eq(LOGGED_OUT);
      });
    });

    describe('logIn', () => {
      let sandbox;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
      });

      afterEach(() => {
        sandbox.restore();
      });

      context('successful', () => {
        let token, user;

        beforeEach(() => {
          token = jwt.sign({ userId: '12345' }, 'big-secret', { expiresIn: '7 days' });

          sandbox.stub(axios, 'post').callsFake((url, { username }) => {
            user = { username };
            return Promise.resolve({
              data: { token, user }
            });
          });
        });

        it('generates a request to REACT_APP_API_URL/login', () => {
          logIn('test-user', 'test-password')(sandbox.stub());

          expect(axios.post).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/login`, sinon.match({ username: 'test-user', password: 'test-password' }));
        });

        it('dispatches loggedIn event', () => {
          let stub = new DispatchStub(),
              { dispatch } = stub;

          return logIn('test-user', 'test-password')(dispatch).then(() => {
            expect(stub).to.have.receivedDispatch({ type: LOGGED_IN, payload: { token, user } });
          });
        });

        it('redirects and generates modal action', () => {
          let dispatch = sandbox.stub();

          return logIn('test-user', 'test-password')(dispatch).then(() => {
            expect(dispatch).to.have.been.calledWith({ type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['/'], method: 'push' } });
            expect(dispatch).to.have.been.calledWith({ type: MODAL_SHOW, payload: { message: 'You have successfully logged in.', type: 'success' } });
          });
        });
      });

      context('error', () => {
        it('emits the returned error message to Modal if present', () => {
          let dispatch = sandbox.stub();
          sandbox.stub(axios, 'post').callsFake(() => {
            return Promise.reject({ response: { data: { message: 'Invalid credentials' } }});
          });

          return logIn({ username: 'blah', password: '' })(dispatch).then(() => {
            expect(dispatch).to.have.been.calledWith({ type: MODAL_SHOW, payload: { message: 'Invalid credentials', type: 'error' } });
          });
        });

        it('emits Error.message to Modal if nothing returned from API', () => {
          let dispatch = sandbox.stub();
          sandbox.stub(axios, 'post').callsFake(() => {
            return Promise.reject(new Error('Something went wrong'));
          });

          return logIn({ username: 'blah', password: '' })(dispatch).then(() => {
            expect(dispatch).to.have.been.calledWith({ type: MODAL_SHOW, payload: { message: 'Something went wrong', type: 'error' } });
          });
        });
      });
    });

    describe('logOut', () => {
      it(`dispatches ${LOGGED_OUT} action`, () => {
        let dispatch = sinon.stub();
        logOut()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match.has('type', LOGGED_OUT));
      });

      it('redirects to root', () => {
        let dispatch = sinon.stub();
        logOut()(dispatch);

        expect(dispatch).to.have.been.calledWith(sinon.match({ type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['/'], method: 'push' } }));
      });
    });

    describe('signUp', () => {
      let sandbox;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
      });

      afterEach(() => {
        sandbox.restore();
      });

      context('successful', () => {
        let token, user;

        beforeEach(() => {
          token = jwt.sign({ userId: '12345' }, 'big-secret', { expiresIn: '7 days' });

          sandbox.stub(axios, 'post').callsFake((url, { username }) => {
            user = { username };
            return Promise.resolve({
              data: { token, user }
            });
          });
        });

        it('generates a request to REACT_APP_API_URL/signup', () => {
          signUp('test-user', 'test-password')(sandbox.stub());

          expect(axios.post).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/signup`, sinon.match({ username: 'test-user', password: 'test-password' }));
        });

        it('dispatches loggedIn event', () => {
          let stub = new DispatchStub(),
              { dispatch } = stub;

          return signUp('test-user', 'test-password')(dispatch).then(() => {
            expect(stub).to.have.receivedDispatch({ type: LOGGED_IN, payload: { token, user: { username: 'test-user' } } });
          });
        });

        it('redirects and generates modal action', () => {
          let dispatch = sandbox.stub();

          return signUp('test-user', 'test-password')(dispatch).then(() => {
            expect(dispatch).to.have.been.calledWith({ type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['/'], method: 'push' } });
            expect(dispatch).to.have.been.calledWith({ type: MODAL_SHOW, payload: { message: 'Welcome! You have successfully created an account.', type: 'success' } });
          });
        });
      });

      context('error', () => {
        it('emits the returned error message to Modal if present', () => {
          let dispatch = sandbox.stub();
          sandbox.stub(axios, 'post').callsFake(() => {
            return Promise.reject({ response: { data: { message: 'Invalid credentials' } }});
          });

          return signUp({ username: 'blah', password: '' })(dispatch).then(() => {
            expect(dispatch).to.have.been.calledWith({ type: MODAL_SHOW, payload: { message: 'Invalid credentials', type: 'error' } });
          });
        });

        it('emits Error.message to Modal if nothing returned from API', () => {
          let dispatch = sandbox.stub();
          sandbox.stub(axios, 'post').callsFake(() => {
            return Promise.reject(new Error('Something went wrong'));
          });

          return signUp({ username: 'blah', password: '' })(dispatch).then(() => {
            expect(dispatch).to.have.been.calledWith({ type: MODAL_SHOW, payload: { message: 'Something went wrong', type: 'error' } });
          });
        });
      });
    });
  });
});
