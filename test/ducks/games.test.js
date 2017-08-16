import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { MODAL_SHOW } from '../../src/ducks/modal';
import { DispatchStub } from '../support/dispatch-helper';
import GameDummy from '../dummies/game';

import gamesReducer, {
  GAMES_INDEXED,
  GAME_CREATED,
  GAME_UPDATED,
  GAME_REMOVED,
  createGame,
  startGame,
  deleteGame,
  addPlayer,
  assignPlayer,
  removePlayer
} from '../../src/ducks/games';

describe('(Ducks) games', () => {
  describe('reducer', () => {
    describe(GAMES_INDEXED, () => {
      it('maps games to a collection with their ids as keys', () => {
        const game1 = new GameDummy().serialize(),
              game2 = new GameDummy().serialize(),
              game3 = new GameDummy().serialize(),
              game4 = new GameDummy().serialize(),
              games = [game1, game2, game3],
              action = { type: GAMES_INDEXED, payload: { games } },
              response = gamesReducer({ [game4.game.id]: game4 }, action),
              expectedResponse = {
                [game1.game.id]: game1,
                [game2.game.id]: game2,
                [game3.game.id]: game3
              };

        expect(response).to.eql(expectedResponse);
      });
    });

    describe(GAME_CREATED, () => {
      it('adds the game to the existing collection', () => {
        const game1 = new GameDummy().serialize(),
              game2 = new GameDummy().serialize(),
              game3 = new GameDummy().serialize(),
              existingState = { [game1.game.id]: game1, [game2.game.id]: game2 },
              action = { type: GAME_CREATED, payload: game3 },
              response = gamesReducer(existingState, action),
              expectedResponse = {
                [game1.game.id]: game1,
                [game2.game.id]: game2,
                [game3.game.id]: game3
              };

        expect(response).to.eql(expectedResponse);
      });
    });

    describe(GAME_UPDATED, () => {
      it('replaces the game in the existing collection', () => {
        const game1 = new GameDummy().serialize(),
              game2 = new GameDummy().serialize(),
              game3 = new GameDummy().serialize(),
              newGame3 = new GameDummy();
        newGame3.id = game3.game.id;

        const existingState = { [game1.game.id]: game1, [game2.game.id]: game2, [game3.game.id]: game3 },
              action = { type: GAME_UPDATED, payload: newGame3.serialize() },
              response = gamesReducer(existingState, action),
              expectedResponse = {
                [game1.game.id]: game1,
                [game2.game.id]: game2,
                [game3.game.id]: newGame3.serialize()
              };

        expect(response).to.eql(expectedResponse);
      });
    });

    describe(GAME_REMOVED, () => {
      it('removes the game from the collection', () => {
        const game1 = new GameDummy().serialize(),
              game2 = new GameDummy().serialize(),
              existingState = { [game1.game.id]: game1, [game2.game.id]: game2 },
              action = { type: GAME_REMOVED, payload: { gameId: game2.game.id } },
              response = gamesReducer(existingState, action),
              expectedResponse = {
                [game1.game.id]: game1
              };

        expect(response).to.eql(expectedResponse);
      });
    });

    describe('Unrelated actions', () => {
      it('returns the passed state', () => {
        const state = { testState: { looks: ['like', 'this'] } },
              response = gamesReducer(state, { type: 'UNRELATED_ACTION' });

        expect(response).to.eq(state);
      });
    });
  });

  describe('actions', () => {
    let sandbox;

    beforeEach(() => { sandbox = sinon.sandbox.create(); });
    afterEach(() => { sandbox.restore(); });

    describe('createGame', () => {
      let callback;

      beforeEach(() => {
        callback = createGame('token');
      });

      context('with a failed AJAX call', () => {
        it('creates a modal for AJAX failure', () => {
          const stub = new DispatchStub();
          sandbox.stub(axios, 'post').callsFake(() => Promise.reject(new Error('It borked')));
          return callback(stub.dispatch).then(() => {
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
        });
      });

      context('with a successful AJAX call', () => {
        it(`dispatches ${GAME_CREATED} with payload`, () => {
          const stub = new DispatchStub(),
                game = new GameDummy(1).serialize();
          sandbox.stub(axios, 'post').callsFake(() => Promise.resolve({ data: { game } }));
          return callback(stub.dispatch).then(() => {
            expect(stub).to.have.receivedDispatch({ type: GAME_CREATED, payload: { game } });
          });
        });
      });
    });

    describe('startGame', () => {
      let stub;

      beforeEach(() => {
        const getState = () => ({ session: { apiToken: '0984124' } });
        stub = new DispatchStub(getState);
      });

      it('handles error', () => {
        sandbox.stub(axios, 'post').rejects(new Error('It borked'));

        return startGame('76543')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
      });

      it(`dispatches ${GAME_UPDATED}`, () => {
        const payload = { testData: 'came through' };
        sandbox.stub(axios, 'post').resolves({ data: payload });

        return startGame('76543')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload });
          });
      });
    });

    describe('deleteGame', () => {
      let stub;

      beforeEach(() => {
        stub = new DispatchStub();
      });

      it('handles error', () => {
        sandbox.stub(axios, 'delete').rejects(new Error('It borked'));

        return deleteGame('asdfasdf', 'bsdfbsdf')(stub.dispatch)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
      });

      it(`dispatches ${GAME_REMOVED}`, () => {
        sandbox.stub(axios, 'delete').resolves();

        return deleteGame('asdfasdf', 'bsdfbsdf')(stub.dispatch)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: GAME_REMOVED, payload: { gameId: 'bsdfbsdf' } });
          });
      });
    });

    describe('addPlayer', () => {
      let stub;

      beforeEach(() => {
        const getState = () => ({ session: { apiToken: '12345' } });
        stub = new DispatchStub(getState);
      });

      it('handles error', () => {
        sandbox.stub(axios, 'post').rejects(new Error('It borked'));

        return addPlayer('asdfasdf', 'bsdfbsdf')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
      });

      it(`dispatches ${GAME_UPDATED}`, () => {
        const data = { testData: 'came through' };
        sandbox.stub(axios, 'post').resolves({ data });

        return addPlayer('asdfasdf', 'bsdfbsdf')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload: data });
          });
      });
    });

    describe('assignPlayer', () => {
      let stub, fakeState;

      beforeEach(() => {
        fakeState = {
          session: { apiToken: '76543' },
          games: {
            12345: {
              players: [
                { id: '34567', team: 'a', role: 'transmitter' },
                { id: '98765', team: null, role: null }
              ]
            }
          }
        };
        const getState = () => fakeState;
        stub = new DispatchStub(getState);
      });

      it('handles error when unassigning conflicting player', () => {
        sandbox.stub(axios, 'put').rejects(new Error('It borked'));

        return assignPlayer('12345', '98765', 'a', 'transmitter')(stub.dispatch, stub.getState)
          .then(() => {
            expect(axios.put).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/api/v1/game/12345/player/34567`);
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
      });

      it('handles error when assigning unassigned player', () => {
        fakeState.games[12345].players.splice(0, 1);
        sandbox.stub(axios, 'put').rejects(new Error('It borked'));

        return assignPlayer('12345', '98765', 'a', 'transmitter')(stub.dispatch, stub.getState)
          .then(() => {
            expect(axios.put).to.have.been.calledOnce;
            expect(axios.put).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/api/v1/game/12345/player/98765`);
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
      });

      it(`unassigns a conflicting player and dispatches ${GAME_UPDATED}`, () => {
        const data = { fakeData: 'comes through' };
        sandbox.stub(axios, 'put').resolves({ data });

        return assignPlayer('12345', '98765', 'a', 'transmitter')(stub.dispatch, stub.getState)
          .then(() => {
            expect(axios.put).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/api/v1/game/12345/player/34567`);
            expect(axios.put).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/api/v1/game/12345/player/98765`);
            expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload: data });
          });
      });

      it(`assigns when no conflicts and dispatches ${GAME_UPDATED}`, () => {
        fakeState.games[12345].players.splice(0, 1);
        const data = { fakeData: 'comes through' };
        sandbox.stub(axios, 'put').resolves({ data });

        return assignPlayer('12345', '98765', 'a', 'transmitter')(stub.dispatch, stub.getState)
          .then(() => {
            expect(axios.put).to.have.been.calledOnce;
            expect(axios.put).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/api/v1/game/12345/player/98765`);
            expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload: data });
          });
      });
    });

    describe('removePlayer', () => {
      let stub, fakeState;

      beforeEach(() => {
        fakeState = { session: { apiToken: '87654' } };
        const getState = () => fakeState;
        stub = new DispatchStub(getState);
      });

      it('handles error', () => {
        sandbox.stub(axios, 'delete').rejects(new Error('It borked'));

        return removePlayer('12345', '98765')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: MODAL_SHOW, payload: { message: 'It borked', type: 'error' } });
          });
      });

      it('dispatches a redirect to home if player is user', () => {
        sandbox.stub(axios, 'delete').resolves({});

        return removePlayer('12345', '98765')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/'] } });
          });
      });

      it(`dispatches ${GAME_UPDATED} for player that is not user`, () => {
        const data = { fakeData: 'came through' };
        sandbox.stub(axios, 'delete').resolves({ data });

        return removePlayer('12345', '98765')(stub.dispatch, stub.getState)
          .then(() => {
            expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload: data });
          });
      });
    });
  });
});
