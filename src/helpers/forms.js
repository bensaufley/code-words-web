export const USERNAME_REGEX = /^[a-z][a-z\d\-.]{5,22}[a-z\d]$/i,
      USERNAME_PATTERN_DESC = 'must be composed of letters, numbers, dashes, and periods, begin with a letter, and end with a letter or number.',
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
