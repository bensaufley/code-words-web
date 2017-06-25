import { expect } from 'chai';
import { MODAL_SHOW, MODAL_HIDE } from '../../src/actions/modal';
import modalReducer from '../../src/reducers/modalReducer';

describe('(Reducer) modalReducer', () => {
  describe(MODAL_SHOW, () => {
    const initialState = { content: '', shown: false };

    it('sets shown to true', () => {
      let newState = modalReducer(initialState, {
        type: MODAL_SHOW,
        payload: {
          message: 'Test message',
          type: 'notice'
        }
      });

      expect(newState.shown).to.be.true;
    });
  });
});
