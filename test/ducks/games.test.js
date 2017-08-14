import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { MODAL_SHOW } from '../../src/ducks/modal';
import { DispatchStub } from '../support/dispatch-helper';
import GameDummy from '../dummies/game';

import { GAME_CREATED, /* GAME_TRANSMIT, GAME_DECODE, GAMES_INDEXED, GAME_UPDATED, */ createGame } from '../../src/ducks/games';

describe('(Ducks) games', () => {
  describe('reducer', () => {
    // TODO: Tests for gamesReducer
  });

  describe('actions', () => {
    describe('createGame', () => {
      let sandbox, callback;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        callback = createGame('token');
      });

      afterEach(() => {
        sandbox.restore();
      });

      context('with a failed AJAX call', () => {
        it('creates a modal for AJAX failure', () => {
          const stub = new DispatchStub();
          sandbox.stub(axios, 'post').callsFake(() => Promise.reject(new Error('It borked')));
          return callback()(stub.dispatch).then(() => {
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
        });
      });

      context('with a successful AJAX call', () => {
        it(`dispatches ${GAME_CREATED} with payload`, () => {
          const stub = new DispatchStub(),
                game = new GameDummy(1).serialize();
          sandbox.stub(axios, 'post').callsFake(() => Promise.resolve({ data: { game } }));
          return callback()(stub.dispatch).then(() => {
            expect(stub).to.have.receivedDispatch({ type: GAME_CREATED, payload: { game } });
          });
        });
      });
    });
  });
});
