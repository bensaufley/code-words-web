import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { LOADING_START, LOADING_END } from '../../src/actions/loading';
import { MODAL_SHOW } from '../../src/actions/modal';
import { DispatchStub } from '../support/dispatch-helper';

import { GAME_CREATED, /*GAME_TRANSMIT, GAME_DECODE, GAMES_INDEXED, GAME_UPDATED,*/ createGame } from '../../src/actions/games';

describe('(actions) games', () => {
  describe('createGame', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it(`triggers ${LOADING_START}`, () => {
      let stub = new DispatchStub();
      sandbox.stub(axios, 'post').callsFake(() => Promise.resolve());
      return createGame('token')(stub.dispatch).then(() => {
        expect(stub).to.have.receivedDispatch({ type: LOADING_START });
      });
    });

    context('with a failed AJAX call', () => {
      it(`triggers ${LOADING_END}`, () => {
        let stub = new DispatchStub();
        sandbox.stub(axios, 'post').callsFake(() => Promise.reject(new Error()));
        return createGame('token')(stub.dispatch).then(() => {
          expect(stub).to.have.receivedDispatch({ type: LOADING_END });
        });
      });

      it('creates a modal for AJAX failure', () => {
        let stub = new DispatchStub();
        sandbox.stub(axios, 'post').callsFake(() => Promise.reject(new Error('It borked')));
        return createGame('token')(stub.dispatch).then(() => {
          expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
        });
      });
    });

    context('with a successful AJAX call', () => {
      it(`triggers ${LOADING_END} on AJAX success`, () => {
        let stub = new DispatchStub();
        sandbox.stub(axios, 'post').callsFake(() => Promise.resolve());
        return createGame('token')(stub.dispatch).then(() => {
          expect(stub).to.have.receivedDispatch({ type: LOADING_END });
        });
      });

      it(`dispatches ${GAME_CREATED} with payload`, () => {
        let stub = new DispatchStub();
        sandbox.stub(axios, 'post').callsFake(() => Promise.resolve({ data: { game: { id: '98765' } } }));
        return createGame('token')(stub.dispatch).then(() => {
          expect(stub).to.have.receivedDispatch({ type: GAME_CREATED, payload: { game: { id: '98765' } } });
        });
      });
    });
  });
});
