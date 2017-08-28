import { expect } from '../test-setup';
import loadingReducer, { LOADING_START, LOADING_END, startLoading, endLoading } from '../../src/ducks/loading';

describe('(Ducks) loadingReducer', () => {
  describe('reducer', () => {
    describe(LOADING_START, () => {
      it('returns true', () => {
        expect(loadingReducer(undefined, { type: LOADING_START })).to.be.true;
      });
    });

    describe(LOADING_END, () => {
      it('returns false', () => {
        expect(loadingReducer(undefined, { type: LOADING_END })).to.be.false;
      });
    });

    context('unrelated action', () => {
      describe('without state', () => {
        it('returns false', () => {
          expect(loadingReducer(undefined, { type: 'ANOTHER_ACTION' })).to.be.false;
        });
      });

      describe('with state', () => {
        it('returns the state', () => {
          expect(loadingReducer(true, { type: 'ANOTHER_ACTION' })).to.be.true;
        });
      });
    });
  });

  describe('actions', () => {
    describe('startLoading', () => {
      it(`returns an action with type ${LOADING_START}`, () => {
        expect(startLoading()).to.eql({ type: LOADING_START });
      });
    });

    describe('endLoading', () => {
      it(`returns an action with type ${LOADING_END}`, () => {
        expect(endLoading()).to.eql({ type: LOADING_END });
      });
    });
  });
});
