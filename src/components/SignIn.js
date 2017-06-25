import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { logIn } from '../actions/session';
import { USERNAME_REGEX, USERNAME_PATTERN_DESC, PASSWORD_REGEX, PASSWORD_PATTERN_DESC } from './SignUp';

import '../styles/SignIn.css';

class SignIn extends Component {
  handleSubmit(values, dispatch) {
    dispatch(logIn(values.username, values.password));
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
        <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>
    );
  }
}

function validate(values) {
  let errors = {};
  if (!USERNAME_REGEX.test(values.username || '')) errors.username = `Username ${USERNAME_PATTERN_DESC}`;
  if (!PASSWORD_REGEX.test(values.password || '')) errors.password = `Password ${PASSWORD_PATTERN_DESC}`;
  return errors;
};

export default reduxForm({
  form: 'signIn',
  validate
})(SignIn);
