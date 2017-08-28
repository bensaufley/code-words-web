import { expect } from '../test-setup';
import sinon from 'sinon';
import axios from 'axios';
import GameDummy from '../dummies/game';
import { DispatchStub } from '../support/dispatch-helper';
import { mountContainer } from '../support/container-helper';

import { GAME_UPDATED } from '../../src/ducks/games';

import TransmitFormContainer, { onSubmit, validate } from '../../src/components/TransmitForm';

describe('(Container) TransmitForm', () => {
  let container, sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    container.unmount();
    document.body.innerHTML = '';
  });

  it('renders without exploding', () => {
    container = mountContainer()(TransmitFormContainer, {
      isOpen: true,
      onClose: () => {}
    });

    expect(document.body.querySelectorAll('.ui.small.modal.transition.visible.active')).to.have.lengthOf(1);
  });

  it('renders errors', () => {
    container = mountContainer({
      initialState: {
        form: {
          transmitForm: {
            anyTouched: true,
            fields: {
              number: { touched: true },
              word: { touched: true }
            },
            syncErrors: {
              word: 'Word is a required field.',
              number: 'Number is a required field'
            },
            values: {
              number: '',
              word: ''
            }
          }
        }
      }
    }, null, true)(TransmitFormContainer, {
      isOpen: true,
      onClose: () => {}
    });

    expect(document.body.querySelectorAll('.ui.input.error')).to.have.lengthOf(2);
  });

  describe('onSubmit', () => {
    it('dispatches takeTurn with transmit, gameId, and turn details', () => {
      const game = new GameDummy(),
            testData = { gameId: game.id, word: 'test', number: '2' },
            getState = () => ({ session: { apiToken: 'my-token' } }),
            stub = new DispatchStub(getState);
      sandbox.stub(axios, 'put').resolves({ data: game.serialize() });

      return onSubmit(testData, stub.dispatch)
        .then(() => {
          expect(axios.put).to.have.been.calledWith(
            `http://${process.env.REACT_APP_API_URL}/api/v1/game/${game.id}/transmit`,
            { word: 'test', number: 2 },
            { headers: { Authorization: 'Bearer my-token' } }
          );
          expect(stub).to.have.receivedDispatch({ type: GAME_UPDATED, payload: game.serialize() });
        });
    });
  });

  describe('validate', () => {
    it('returns an empty object when valid', () => {
      const values = { word: 'valid', number: 2 };

      expect(validate(values)).to.eql({});
    });

    it('returns an object with word error for a missing word', () => {
      const values = { word: '', number: 2 };

      expect(validate(values)).to.eql({ word: 'Word is a required field.' });
    });

    it('returns an object with number error for invalid word', () => {
      const values = { word: 'valid', number: -1 };

      expect(validate(values)).to.eql({ number: 'Pick an actual number.' });
    });

    it('returns an object with both errors for invalid word', () => {
      const values = { word: 'can\'t use multiple words', number: 9 };

      expect(validate(values)).to.eql({ word: 'Word must be a single word.', number: 'Pick an actual number.' });
    });
  });
});
