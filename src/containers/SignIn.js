import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { logIn } from '../actions/session';
import FormInputWithError from '../components/FormInputWithError';
import { USERNAME_REGEX, USERNAME_PATTERN_DESC, validateWith, validateUsername, validatePassword } from '../helpers/forms';

import '../styles/SignIn.css';

export class SignIn extends Component {
  render() {
    let { handleSubmit, invalid, submitting } = this.props;

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
  }
}

export default reduxForm({
  form: 'signIn',
  onSubmit: ({ username, password }, dispatch) => { dispatch(logIn(username, password)); },
  validate: validateWith(validateUsername, validatePassword)
})(SignIn);
