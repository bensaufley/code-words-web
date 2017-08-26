import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';

import { DispatchStub } from '../support/dispatch-helper';
import GameDummy from '../dummies/game';
import { wrapContainer } from '../support/container-helper';
import { GAME_UPDATED } from '../../src/ducks/games';

import AddPlayerFormContainer, { onSubmit } from '../../src/components/AddPlayerForm';

describe('(Container) AddPlayerForm', () => {
  let sandbox;

  beforeEach(() => { sandbox = sinon.sandbox.create(); });
  afterEach(() => { sandbox.restore(); });

  it('renders without exploding', () => {
    const wrapper = wrapContainer()(AddPlayerFormContainer);
    expect(findRenderedDOMComponentWithTag(wrapper, 'form')).to.exist;
  });

  it('dispatches addPlayer', () => {
    const stub = new DispatchStub(() => ({ session: { apiToken: 'my-token' } })),
          game = new GameDummy();
    sandbox.stub(axios, 'post').resolves({ data: game.serialize() });

    return onSubmit({ username: 'my-user', gameId: game.id }, stub.dispatch).then(() => {
      expect(axios.post).to.have.been.calledWith(`http://${process.env.REACT_APP_API_URL}/api/v1/game/${game.id}/players/`, { username: 'my-user' }, { headers: { Authorization: 'Bearer my-token' } });
      expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload: game.serialize() });
    });
  });
});
