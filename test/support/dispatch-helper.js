import { Assertion } from 'chai';

export class DispatchStub {
  constructor() {
    this.calls = [];
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(args) {
    if (typeof args === 'function') {
      args(this.dispatch);
    } else {
      this.calls.push(args);
    }
  }
}

export function receivedDispatch(expected) {
  new Assertion(this._obj).to.be.instanceof(DispatchStub);

  this.assert(
    this._obj.calls.some((args) => {
      try {
        new Assertion(args).to.eql(expected);
      } catch (e) {
        return false;
      }
      return true;
    }),
    'expected #{this} to have received dispatch with arguments #{exp} but got #{act}',
    'expected #{this} not to have received dispatch with arguments #{exp} but got #{act}',
    JSON.stringify(expected),
    JSON.stringify(this._obj.calls)
  );
}
