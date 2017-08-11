import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';

import { redirectIfAuthenticated } from '../../helpers/auth';

import { logIn } from '../../reducers/session';
import FormInputWithError from '../FormInputWithError';
import { USERNAME_REGEX, USERNAME_PATTERN_DESC, validateWith, validateUsername, validatePassword } from '../../helpers/forms';

import '../../styles/SignIn.css';

export const SignIn = (props) => {
  const { handleSubmit, invalid, submitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <Field
        component={FormInputWithError}
        type="text"
        name="username"
        pattern={USERNAME_REGEX}
        title={USERNAME_PATTERN_DESC}
        placeholder="Username"
      />
      <Field
        component={FormInputWithError}
        type="password"
        name="password"
        minLength={7}
        maxLength={50}
        placeholder="Password"
      />
      <Button type="submit" primary disabled={invalid || submitting}>Sign In</Button>
    </Form>
  );
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const SignInForm = reduxForm({
  form: 'signIn',
  onSubmit: ({ username, password }, dispatch) => { dispatch(logIn(username, password)); },
  validate: validateWith(validateUsername, validatePassword)
})(SignIn);

export default redirectIfAuthenticated(SignInForm);
