import { expect } from 'chai';
import { LOADING_START, LOADING_END, startLoading, endLoading } from '../../src/actions/loading';

describe('(Actions) loading', () => {
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
