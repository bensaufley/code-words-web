import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

export default function FormInputWithError({ input, placeholder, type, meta: { touched, error } }) {
  const errorMessage = touched && error ? (<small className="error">{error}</small>) : null,
        inputId = input.id || input.name.toLowerCase().replace(/[^a-z]+/gi, '-').replace(/(^-|-$)/g, '');

  return (
    <Form.Field error={!!errorMessage}>
      <label htmlFor={inputId}>{placeholder}</label>
      <input
        {...input}
        id={inputId}
        label={placeholder}
        type={type}
      />
      {errorMessage}
    </Form.Field>
  );
}

FormInputWithError.defaultProps = {
  placeholder: '',
  meta: {
    error: null,
    touched: false
  }
};

FormInputWithError.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool
  }).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired
};
