import { expect } from 'chai';
import loadingReducer from '../../src/reducers/loadingReducer';
import { LOADING_START, LOADING_END } from '../../src/actions/loading';

describe('(Reducer) loadingReducer', () => {
  describe(LOADING_START, () => {
    it('returns false', () => {
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
        expect(loadingReducer(undefined,  { type: 'ANOTHER_ACTION' })).to.be.false;
      });
    });

    describe('with state', () => {
      it('returns the state', () => {
        expect(loadingReducer(true,  { type: 'ANOTHER_ACTION' })).to.be.true;
      });
    });
  });
});
