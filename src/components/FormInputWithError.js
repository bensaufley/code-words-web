import React from 'react';
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
