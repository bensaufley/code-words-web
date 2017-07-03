import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { signUp } from '../actions/user';
import { USERNAME_REGEX, USERNAME_PATTERN_DESC, renderField, validateWith, validateUsername, validatePassword, validatePasswordConfirmation } from '../helpers/forms';

import '../styles/SignUp.css';

export class SignUp extends Component {
  handleSubmit({ username, password }, dispatch) {
    dispatch(signUp(username, password));
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <h1>Sign Up</h1>
        <Field
          component={renderField}
          type="text"
          name="username"
          pattern={USERNAME_REGEX}
          title={USERNAME_PATTERN_DESC}
          placeholder="Username" />
        <Field
          component={renderField}
          type="password"
          name="password"
          minLength={7}
          maxLength={50}
          placeholder="Password" />
        <Field
          component={renderField}
          type="password"
          name="password_confirmation"
          minLength={7}
          maxLength={50}
          placeholder="Password Confirmation" />
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signUp',
  validate: validateWith(validateUsername, validatePassword, validatePasswordConfirmation)
})(SignUp);
