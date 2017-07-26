import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { redirectIfAuthenticated } from '../helpers/auth';
import { Form, Button } from 'semantic-ui-react';

import { signUp } from '../actions/session';
import FormInputWithError from '../components/FormInputWithError';
import { USERNAME_REGEX, USERNAME_PATTERN_DESC, validateWith, validateUsername, validatePassword, validatePasswordConfirmation } from '../helpers/forms';

import '../styles/SignUp.css';

export let SignUp = (props) => {
  let { handleSubmit, invalid, submitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <Field
        component={FormInputWithError}
        type="text"
        name="username"
        pattern={USERNAME_REGEX}
        title={USERNAME_PATTERN_DESC}
        placeholder="Username" />
      <Field
        component={FormInputWithError}
        type="password"
        name="password"
        minLength={7}
        maxLength={50}
        placeholder="Password" />
      <Field
        component={FormInputWithError}
        type="password"
        name="password_confirmation"
        minLength={7}
        maxLength={50}
        placeholder="Password Confirmation" />
      <Button primary type="submit" disabled={invalid || submitting}>Sign Up</Button>
    </Form>
  );
};

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

let SignUpForm = reduxForm({
  form: 'signUp',
  onSubmit: ({ username, password }, dispatch) => { dispatch(signUp(username, password)); },
  validate: validateWith(validateUsername, validatePassword, validatePasswordConfirmation)
})(SignUp);

export default redirectIfAuthenticated(SignUpForm);
