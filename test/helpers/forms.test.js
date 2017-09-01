import expect from '../test-setup';
import sinon from 'sinon';

import {
  USERNAME_PATTERN_DESC,
  PASSWORD_PATTERN_DESC,
  validateUsername,
  validatePassword,
  validatePasswordConfirmation,
  validateWith
} from '../../src/helpers/forms';

describe('forms helper', () => {
  describe('validateUsername', () => {
    it('accepts a valid username', () => {
      const values = { username: 'asdf.bsdf' },
            errors = {};
      expect(validateUsername(values, errors)).to.eql(errors);
    });

    it('rejects an invalidvalid username', () => {
      const values = { username: 'as' },
            errors = {};
      expect(validateUsername(values, errors)).to.eql({ username: `Username ${USERNAME_PATTERN_DESC}` });
    });

    it('returns other error values', () => {
      const values = { username: 'as' },
            errors = { thing: 'blah' };
      expect(validateUsername(values, errors)).to.eql({ thing: 'blah', username: `Username ${USERNAME_PATTERN_DESC}` });
    });
  });

  describe('validatePassword', () => {
    it('accepts a valid username', () => {
      const values = { password: 'asdf.bsdf' },
            errors = {};
      expect(validatePassword(values, errors)).to.eql(errors);
    });

    it('rejects an invalidvalid password', () => {
      const values = { password: 'as' },
            errors = {};
      expect(validatePassword(values, errors)).to.eql({ password: `Password ${PASSWORD_PATTERN_DESC}` });
    });

    it('returns other error values', () => {
      const values = { password: 'as' },
            errors = { thing: 'blah' };
      expect(validatePassword(values, errors)).to.eql({ thing: 'blah', password: `Password ${PASSWORD_PATTERN_DESC}` });
    });
  });

  describe('validatePasswordConfirmation', () => {
    it('accepts passwords that match', () => {
      const values = { password: 'asdfasdf', password_confirmation: 'asdfasdf' },
            errors = {};

      expect(validatePasswordConfirmation(values, errors)).to.eql(errors);
    });

    it('accepts invalid passwords as long as they match', () => {
      const values = { password: 'asd', password_confirmation: 'asd' },
            errors = {};

      expect(validatePasswordConfirmation(values, errors)).to.eql(errors);
    });

    it('rejects passwords that don\'t match', () => {
      const values = { password: 'wertyuiou', password_confirmation: 'asdfasdf' },
            errors = {};

      expect(validatePasswordConfirmation(values, errors)).to.eql({ password_confirmation: 'Please make sure that password and confirmation match' });
    });

    it('rejects a blank confirmation if password is present', () => {
      const values = { password: 'wertyuiou', password_confirmation: '' },
            errors = {};

      expect(validatePasswordConfirmation(values, errors)).to.eql({ password_confirmation: 'Please make sure that password and confirmation match' });
    });

    it('does not add an error if both are blank', () => {
      const values = { password: '', password_confirmation: '' },
            errors = {};

      expect(validatePasswordConfirmation(values, errors)).to.eql(errors);
    });

    it('returns an error if password is blank but confirmation isn\'t', () => {
      const values = { password: '', password_confirmation: 'asdfasdf' },
            errors = { };

      expect(validatePasswordConfirmation(values, errors)).to.eql({ password_confirmation: 'Please make sure that password and confirmation match' });
    });

    it('returns other error values', () => {
      const values = { password: 'as', password_confirmation: 'asdfasdf' },
            errors = { thing: 'blah' };

      expect(validatePasswordConfirmation(values, errors)).to.eql({ thing: 'blah', password_confirmation: 'Please make sure that password and confirmation match' });
    });
  });

  describe('validateWith', () => {
    it('iterates through passed validators and returns errors', () => {
      const validatorOne = sinon.stub().callsFake((_, errs) => ({ ...errs, thing: 'bloop' })),
            validatorTwo = sinon.stub().callsFake((_, errs) => ({ ...errs, otherThing: 'flarg' }));

      expect(validateWith(validatorOne, validatorTwo)({ test: 'value' })).to.eql({ thing: 'bloop', otherThing: 'flarg' });
      expect(validatorOne).to.have.been.calledWith({ test: 'value' }, {});
      expect(validatorTwo).to.have.been.calledWith({ test: 'value' }, { thing: 'bloop' });
    });
  });
});
