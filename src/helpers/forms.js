import React from 'react';

export const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9.\-_]{7,24}$/,
      USERNAME_PATTERN_DESC = 'must begin with a letter, be 7-24 characters long, and consist of letters, numbers, periods, dashes and underscores.',
      PASSWORD_REGEX = /^.{7,50}$/i,
      PASSWORD_PATTERN_DESC = 'must be between 7 and fifty characters in length.';

export function renderField({ input, placeholder, type, meta: { touched, error } }) {
  let errorMessage = '';
  if (touched && error) errorMessage = <small className="error">{error}</small>;

  return (
    <div>
      <input
        {...input}
        className={errorMessage ? 'error' : ''}
        placeholder={placeholder}
        type={type}
        />
      {errorMessage}
    </div>
  );
}

export function validateUsername(values, errors) {
  if (!USERNAME_REGEX.test(values.username || '')) return { ...errors, username: `Username ${USERNAME_PATTERN_DESC}` };
  else return errors;
}

export function validatePassword(values, errors) {
  if (!PASSWORD_REGEX.test(values.password || '')) return { ...errors, password: `Password ${PASSWORD_PATTERN_DESC}` };
  else return errors;
}

export function validatePasswordConfirmation(values, errors) {
  if (values.password !== values.password_confirmation || '') return { ...errors, password_confirmation: 'Please make sure that password and confirmation match' };
  else return errors;
}

export function validateWith(...validators) {
  return (values) => {
    let errors = {};
    validators.forEach((validator) => {
      errors = validator(values, errors);
    });
    return errors;
  };
}
