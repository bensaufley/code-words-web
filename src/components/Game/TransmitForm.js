import React from 'react';
import PropTypes from 'prop-types';
import { Form as SemanticForm, Icon, Input, Message, Modal } from 'semantic-ui-react';
import { Form, Field, reduxForm } from 'redux-form';

import { takeTurn } from '../../ducks/games';
import { TRANSMITTER_ICON } from '../../helpers/style-dictionary';

const formInput = (props) => {
  const {
    autoCapitalize,
    autoCorrect,
    input,
    max,
    meta: { touched, invalid, error },
    min,
    placeholder,
    type,
    width
  } = props;

  return (
    <SemanticForm.Field width={width}>
      <Input
        {...input}
        placeholder={placeholder}
        error={touched && invalid}
        type={type}
        min={min}
        max={max}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
      <Message error content={error} visible={touched && invalid} />
    </SemanticForm.Field>
  );
};

formInput.defaultProps = {
  autoCapitalize: null,
  autoCorrect: null,
  max: null,
  meta: { touched: false, invalid: false },
  min: null,
  placeholder: '',
  props: {},
  type: 'text',
  width: null
};

formInput.propTypes = {
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  placeholder: PropTypes.string,
  max: PropTypes.number,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool
  }),
  min: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.number
};

const TransmitForm = (props) => {
  const { handleSubmit, invalid, isOpen, onClose, submitting } = props;

  return (
    <Modal dimmer="inverted" open={isOpen} onClose={onClose} size="small" closeIcon="close">
      <Modal.Header>Transmit</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <SemanticForm as="div">
            <SemanticForm.Group>
              <Field name="word" component={formInput} width={8} placeholder="Word" autoCorrect="off" autoCapitalize="none" />
              <Field name="number" component={formInput} width={4} placeholder="Number" type="number" min={1} max={8} />
              <SemanticForm.Button primary fluid disabled={invalid || submitting} width={4} type="submit">
                <Icon name={TRANSMITTER_ICON} />
                Transmit
              </SemanticForm.Button>
            </SemanticForm.Group>
          </SemanticForm>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

TransmitForm.defaultProps = {
  invalid: true,
  submitting: false
};

TransmitForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

export const validate = (values) => {
  const errors = {};
  if (!values.word) errors.word = 'Word is a required field.';
  else if (!/^[a-z\-']+$/i.test(values.word)) errors.word = 'Word must be a single word.';

  if (!values.number) errors.number = 'Number is a required field.';
  else if (Number(values.number) < 1 || Number(values.number) > 8) errors.number = 'Pick an actual number.';

  return errors;
};

export const onSubmit = ({ gameId, word, number }, dispatch) => dispatch(takeTurn(gameId, 'transmit')({ word, number: Number(number) }));

export default reduxForm({
  form: 'transmitForm',
  onSubmit,
  validate
})(TransmitForm);
