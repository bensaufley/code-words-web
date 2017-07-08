import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { redirectIfAuthenticated } from '../helpers/auth';

import { logIn } from '../actions/session';
import FormInputWithError from '../components/FormInputWithError';
import { USERNAME_REGEX, USERNAME_PATTERN_DESC, validateWith, validateUsername, validatePassword } from '../helpers/forms';

import '../styles/SignIn.css';

export let SignIn = (props) => {
  let { handleSubmit, invalid, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
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
      <button type="submit" disabled={invalid || submitting}>Sign In</button>
    </form>
  );
};

let SignInForm = reduxForm({
  form: 'signIn',
  onSubmit: ({ username, password }, dispatch) => { dispatch(logIn(username, password)); },
  validate: validateWith(validateUsername, validatePassword)
})(SignIn);

export default redirectIfAuthenticated(SignInForm);
