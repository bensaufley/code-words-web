import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';

import { userShape } from '../../helpers/prop-types';

import '../../styles/Player.css';

export default class Player extends Component {
  static defaultProps = {
    editable: false,
    team: null,
    role: null,
    isUser: false
  }

  static propTypes = {
    user: userShape.isRequired,
    editable: PropTypes.bool,
    team: PropTypes.string,
    role: PropTypes.string,
    isUser: PropTypes.bool
  }

  actions() {
    if (!this.props.editable) return null;

    return (
      <Card.Content extra>
        <Button.Group fluid size="tiny">
          <Button color="blue">Pick Team</Button>
          <Button color="green">Pick Role</Button>
        </Button.Group>
      </Card.Content>
    );
  }

  render() {
    const { team, role, user: { username }, isUser } = this.props,
          className = ['player', team, role, isUser ? 'current-user' : ''].filter(Boolean).join(' ');

    return (
      <Card className={className}>
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Meta>
            {team ? `Team ${team.toUpperCase()}` : 'No Team Selected'}
            —
            {role ? role.substr(0, 1).toUpperCase() + role.substr(1) : 'No Role Selected'}
          </Card.Meta>
        </Card.Content>
        {this.actions()}
      </Card>
    );
  }
}
