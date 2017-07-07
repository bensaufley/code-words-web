import { expect } from 'chai';

import { LOGGED_IN, LOGGED_OUT } from '../../src/actions/session';
import sessionReducer from '../../src/reducers/sessionReducer';

describe('sessionReducer', () => {
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
