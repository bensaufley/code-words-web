import { expect } from 'chai';
import { MODAL_SHOW, MODAL_HIDE, showModal, closeModal } from '../../src/actions/modal';

describe('(Actions) modal', () => {
  describe('showModal action creator', () => {
    it('returns an action of type MODAL_SHOW', () => {
      let action = showModal('Test message');

      expect(action.type).to.eq(MODAL_SHOW);
    });
  });
});
