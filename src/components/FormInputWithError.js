import React from 'react';

export default function FormInputWithError({ input, placeholder, type, meta: { touched, error } }) {
  let errorMessage = touched && error ? (<small className="error">{error}</small>) : null;

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
