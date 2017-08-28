import { expect } from '../test-setup';
import sinon from 'sinon';
import createHistory from 'history/createMemoryHistory';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import UserDummy from '../dummies/user';
import GameDummy from '../dummies/game';
import { GAMES_INDEXED } from '../../src/ducks/games';

import { generateStore, updateTitle } from '../../src/store';

describe('generateStore', () => {
  let history, sandbox;

  beforeEach(() => {
    history = createHistory();
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('with defaults', () => {
    it('doesn\'t blow up', () => {
      const store = generateStore(history);

      expect(store).to.exist;
      expect(store).to.haveOwnProperty('dispatch');
      expect(store).to.haveOwnProperty('subscribe');
      expect(store).to.haveOwnProperty('getState');
      expect(store).to.haveOwnProperty('replaceReducer');
    });
  });

  context('with cookies', () => {
    it('doesn\'t blow up', () => {
      const user = new UserDummy().serialize(),
            exp = Math.floor(Date.now() / 1000) + (60 * 60),
            token = jwt.sign({ ...user, exp }, 'very-secret');
      sandbox.stub(Cookies, 'get').returns(token);
      sandbox.stub(Cookies, 'getJSON').returns(user);
      sandbox.stub(Cookies, 'set');

      const store = generateStore(history);

      expect(store).to.exist;
      expect(store.getState().session).to.have.keys({ apiToken: token, apiUser: user });
    });
  });

  context('changes', () => {
    let user, store;

    beforeEach(() => {
      user = new UserDummy();
      const exp = Math.floor(Date.now() / 1000) + (60 * 60),
            token = jwt.sign({ ...user, exp }, 'very-secret');
      sandbox.stub(Cookies, 'get').returns(token);
      sandbox.stub(Cookies, 'getJSON').returns(user.serialize());
      sandbox.stub(Cookies, 'set');
      store = generateStore(history);
    });

    it('adds a badge when games are updated to have user as activePlayer', () => {
      const game = new GameDummy({ started: true, completed: false });
      game.players.find((p) => p.id === game.activePlayerId).user = user;
      updateTitle(store)();

      expect(() => store.dispatch({
        type: GAMES_INDEXED,
        payload: { games: [game.serialize()] }
      })).to.alter(
        () => document.title, {
          from: 'Code Words',
          to: 'Code Words (1)'
        });

      game.activePlayerId = game.players.find((p) => p.user.id !== user.id).id;

      expect(() => store.dispatch({
        type: GAMES_INDEXED,
        payload: { games: [game.serialize()] }
      })).to.alter(
        () => document.title, {
          from: 'Code Words (1)',
          to: 'Code Words'
        });
    });
  });
});
