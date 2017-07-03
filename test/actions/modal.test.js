import { expect } from 'chai';
import { MODAL_SHOW, MODAL_HIDE, showModal, closeModal } from '../../src/actions/modal';

describe('(Actions) modal', () => {
  describe('showModal action creator', () => {
    it('returns an action of type MODAL_SHOW', () => {
      let action = showModal('Test message');

      expect(action.type).to.eq(MODAL_SHOW);
    });

    it('returns the provided message', () => {
      let action = showModal('Test message');

      expect(action.payload.message).to.eq('Test message');
    });

    it('defaults to a type of notice', () => {
      let action = showModal('Test message');

      expect(action.payload.type).to.eq('notice');
    });

    it('passes along type if given', () => {
      let action = showModal('Test message', 'error');

      expect(action.payload.type).to.eq('error');
    });
  });

  describe('closeModal action creator', () => {
    it('returns an action of type MODAL_SHOW', () => {
      let action = closeModal();

      expect(action.type).to.eq(MODAL_HIDE);
    });

    it('returns an empty payload', () => {
      let action = closeModal();

      expect(action.payload).to.deep.eq({});
    });
  });
});
