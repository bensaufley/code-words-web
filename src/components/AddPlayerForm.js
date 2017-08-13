import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Icon } from 'semantic-ui-react';

const AddPlayerForm = (props) => {
  const { gameId, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <input type="hidden" name="gameId" value={gameId} />
      <Form.Group>
        <Form.Field width={12}>
          <Field
            component="input"
            id="new-player-username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field width={4}>
          <Button icon fluid primary type="submit" >
            <Icon name="add user" />
          </Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

AddPlayerForm.propTypes = {
  gameId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'addPlayer',
  handleSubmit: () => {}
})(AddPlayerForm);
