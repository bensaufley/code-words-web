export const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9.\-_]{7,24}$/,
      USERNAME_PATTERN_DESC = 'must begin with a letter, be 7-24 characters long, and consist of letters, numbers, periods, dashes and underscores.',
      PASSWORD_REGEX = /^.{7,50}$/i,
      PASSWORD_PATTERN_DESC = 'must be between 7 and fifty characters in length.';

const regExValidator = (key, regex, error) => (values, errors) => {
  if (!regex.test(values[key] || '')) return { ...errors, [key]: error };
  return errors;
};

export const validateUsername = regExValidator('username', USERNAME_REGEX, `Username ${USERNAME_PATTERN_DESC}`);
export const validatePassword = regExValidator('password', PASSWORD_REGEX, `Password ${PASSWORD_PATTERN_DESC}`);

export function validatePasswordConfirmation(values, errors) {
  if (values.password !== values.password_confirmation || '') return { ...errors, password_confirmation: 'Please make sure that password and confirmation match' };
  return errors;
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
