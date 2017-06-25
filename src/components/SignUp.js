import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { signUp } from '../actions/user';

import '../styles/SignUp.css';

export const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9.\-_]{7,24}$/,
             USERNAME_PATTERN_DESC = 'must begin with a letter, be 7-24 characters long, and consist of letters, numbers, periods, dashes and underscores.',
             PASSWORD_REGEX = /^.{7,50}$/i,
             PASSWORD_PATTERN_DESC = 'must be between 7 and fifty characters in length.';

class SignUp extends Component {
  handleSubmit({ username, password }, dispatch) {
    dispatch(signUp(username, password));
  }

  renderField({
    input,
    placeholder,
    type,
    meta: {
      touched,
      error
    }
  }) {
    let errorMessage = '';
    if (touched && error) {
      errorMessage = (
        <small className="error">{error}</small>
      );
    }
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

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <h1>Sign Up</h1>
        <Field
          component={this.renderField}
          type="text"
          name="username"
          pattern={USERNAME_REGEX.toString().replace(/\//g, '')}
          title={USERNAME_PATTERN_DESC}
          placeholder="Username" />
        <Field
          component={this.renderField}
          type="password"
          name="password"
          minLength={7}
          maxLength={50}
          placeholder="Password" />
        <Field
          component={this.renderField}
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

function validate(values) {
  let errors = {};
  if (!USERNAME_REGEX.test(values.username || '')) errors.username = `Username ${USERNAME_PATTERN_DESC}`;
  if (!PASSWORD_REGEX.test(values.password || '')) errors.password = `Password ${PASSWORD_PATTERN_DESC}`;
  if (values.password !== values.password_confirmation || '') errors.password_confirmation = 'Please make sure that password and confirmation match';
  return errors;
};

SignUp = reduxForm({
  form: 'signUp',
  validate
})(SignUp);

export default SignUp;
