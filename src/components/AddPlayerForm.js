import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Icon } from 'semantic-ui-react';

import { addPlayer } from '../ducks/games';

const AddPlayerForm = (props) => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
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
          <Button icon fluid type="submit" >
            <Icon name="add user" />
          </Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

AddPlayerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'addPlayer',
  onSubmit: (attrs, dispatch) => dispatch(addPlayer(attrs.gameId, attrs.username))
})(AddPlayerForm);
