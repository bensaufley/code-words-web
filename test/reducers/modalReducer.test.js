import { expect } from 'chai';
import { MODAL_SHOW, MODAL_HIDE } from '../../src/actions/modal';
import modalReducer from '../../src/reducers/modalReducer';

describe('(Reducer) modalReducer', () => {
  describe(MODAL_SHOW, () => {
    let initialState, action;

    before(() => {
      initialState = { content: '', shown: false };
      action = {
        type: MODAL_SHOW,
        payload: {
          message: 'Test message',
          type: 'notice'
        }
      };
    });

    it('sets shown to true', () => {
      let newState = modalReducer(initialState, action);

      expect(newState).not.to.equal(initialState);
      expect(newState.shown).to.be.true;
    });

    it('sets content to the passed value', () => {
      let newState = modalReducer(initialState, action);

      expect(newState.content).to.eq('Test message');
    });

    it('sets content to the passed value', () => {
      let newState = modalReducer(initialState, action);

      expect(newState.type).to.eq('notice');
    });
  });

  describe(MODAL_HIDE, () => {
    let initialState, action;

    before(() => {
      initialState = { content: '', shown: true };
      action = { type: MODAL_HIDE };
    });

    it('sets shown to false', () => {
      let newState = modalReducer(initialState, action);

      expect(newState).not.to.equal(initialState);
      expect(newState.shown).to.be.false;
    });

    it('sets content to a blank string', () => {
      let newState = modalReducer(initialState, action);

      expect(newState.content).to.eq('');
    });

    it('sets type to undefined', () => {
      let newState = modalReducer(initialState, action);

      expect(newState.type).to.be.undefined;
    });
  });

  context('other actions', () => {
    let initialState, action;

    before(() => {
      initialState = { content: 'Blah', type: 'notice', shown: true };
      action = { type: 'SOMETHING_ELSE' };
    });

    it('returns the current state', () => {
      let newState = modalReducer(initialState, action);

      expect(newState).to.equal(initialState);
      expect(newState).to.deep.equal(initialState);
    });
  });

  context('no initial state passed', () => {
    let action;

    before(() => {
      action = { type: 'SOMETHING_ELSE' };
    });

    it('returns the current state', () => {
      let newState = modalReducer(undefined, action);

      expect(newState).to.deep.equal({ content: '', shown: false });
    });
  });
});
