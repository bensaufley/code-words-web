import { expect } from 'chai';
import sinon from 'sinon';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { LOGGED_IN, LOGGED_OUT, loggedIn, loggedOut, logIn, logOut, signUp } from '../../src/actions/session';

describe('(Actions) session', () => {
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

      let action = loggedIn(token, { username: 'test-user' });

      expect(Cookies.set).to.have.been.calledWith('apiToken', token, sinon.match({ expires }));
      expect(Cookies.set).to.have.been.calledWith('apiUser', { username: 'test-user' }, sinon.match({ expires }));
    });

    it(`returns action with type ${LOGGED_IN}`, () => {
      let action = loggedIn(token, { username: 'test-user' });

      expect(action.type).to.eq(LOGGED_IN);
    });

    it(`returns action with proper payload`, () => {
      let action = loggedIn(token, { username: 'test-user' });

      expect(action.payload).to.deep.eq({ token, user: { username: 'test-user' } });
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

      let action = loggedOut();

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

        sandbox.stub(axios, 'post').callsFake((url, { username, password }) => {
          user = { username };
          return Promise.resolve({
            data: { token, user }
          });
        });
      });

      it('generates a request to REACT_APP_API_URL/login', () => {
        let action = logIn('test-user', 'test-password')(sandbox.stub());

        expect(axios.post).to.have.been.calledWith(`${process.env.REACT_APP_API_URL}/login`, sinon.match({ username: 'test-user', password: 'test-password' }));
      });

      it('dispatches loggedIn event', () => {
        let dispatch = sandbox.stub();

        return logIn('test-user', 'test-password')(dispatch).then(() => {
          expect(dispatch).to.have.been.calledWith(sinon.match.has('type', LOGGED_IN));
        });
      });
    });
  });

  describe('logOut', () => {

  });

  describe('signUp', () => {

  });
});
