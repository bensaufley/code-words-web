import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

export default function FormInputWithError({
  autocomplete,
  autocapitalize,
  input,
  placeholder,
  type,
  meta: { touched, error }
}) {
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
        autoComplete={autocomplete}
        autoCapitalize={autocapitalize}
      />
      {errorMessage}
    </Form.Field>
  );
}

FormInputWithError.defaultProps = {
  autocomplete: null,
  autocapitalize: null,
  placeholder: '',
  meta: {
    error: null,
    touched: false
  }
};

FormInputWithError.propTypes = {
  autocomplete: PropTypes.string,
  autocapitalize: PropTypes.string,
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
