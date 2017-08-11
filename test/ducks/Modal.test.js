import { expect } from 'chai';
import modalReducer, { MODAL_SHOW, MODAL_HIDE, showModal, closeModal } from '../../src/ducks/modal';

describe('(Ducks) modalReducer', () => {
  describe('reducer', () => {
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
        const newState = modalReducer(initialState, action);

        expect(newState).not.to.equal(initialState);
        expect(newState.shown).to.be.true;
      });

      it('sets content to the passed value', () => {
        const newState = modalReducer(initialState, action);

        expect(newState.content).to.eq('Test message');
      });

      it('sets content to the passed value', () => {
        const newState = modalReducer(initialState, action);

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
        const newState = modalReducer(initialState, action);

        expect(newState).not.to.equal(initialState);
        expect(newState.shown).to.be.false;
      });

      it('sets content to a blank string', () => {
        const newState = modalReducer(initialState, action);

        expect(newState.content).to.eq('');
      });

      it('sets type to undefined', () => {
        const newState = modalReducer(initialState, action);

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
        const newState = modalReducer(initialState, action);

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
        const newState = modalReducer(undefined, action);

        expect(newState).to.deep.equal({ content: '', shown: false });
      });
    });
  });

  describe('actions', () => {
    describe('(Actions) modal', () => {
      describe('showModal action creator', () => {
        it('returns an action of type MODAL_SHOW', () => {
          const action = showModal('Test message');

          expect(action.type).to.eq(MODAL_SHOW);
        });

        it('returns the provided message', () => {
          const action = showModal('Test message');

          expect(action.payload.message).to.eq('Test message');
        });

        it('defaults to a type of notice', () => {
          const action = showModal('Test message');

          expect(action.payload.type).to.eq('notice');
        });

        it('passes along type if given', () => {
          const action = showModal('Test message', 'error');

          expect(action.payload.type).to.eq('error');
        });
      });

      describe('closeModal action creator', () => {
        it('returns an action of type MODAL_SHOW', () => {
          const action = closeModal();

          expect(action.type).to.eq(MODAL_HIDE);
        });

        it('returns an empty payload', () => {
          const action = closeModal();

          expect(action.payload).to.deep.eq({});
        });
      });
    });
  });
});
