import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

export default function FormInputWithError({ input, placeholder, type, meta: { touched, error } }) {
  let errorMessage = touched && error ? (<small className="error">{error}</small>) : null;

  return (
    <Form.Field error={!!errorMessage}>
      <label>{placeholder}</label>
      <input
        {...input}
        label={placeholder}
        type={type}
        />
      {errorMessage}
    </Form.Field>
  );
}

FormInputWithError.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired
};
