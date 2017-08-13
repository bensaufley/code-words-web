import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react';
import { DragSource } from 'react-dnd';

import { PLAYER_CARD } from '../ducks/games';
import { userShape } from '../helpers/prop-types';

import '../styles/Player.css';

export class Player extends Component {
  static defaultProps = {
    connectDragSource: (el) => el,
    team: null,
    role: null,
    isUser: false
  }

  static propTypes = {
    connectDragSource: PropTypes.func,
    id: PropTypes.string.isRequired,
    user: userShape.isRequired,
    team: PropTypes.string,
    role: PropTypes.string,
    isUser: PropTypes.bool
  }

  // actions() {
  //   if (!this.props.editable) return null;

  //   return (
  //     <Card.Content extra>
  //       <Button.Group fluid size="tiny">
  //         <Button color="blue">Pick Team</Button>
  //         <Button color="green">Pick Role</Button>
  //       </Button.Group>
  //     </Card.Content>
  //   );
  // }

  render() {
    const { connectDragSource, id, team, role, user: { username }, isUser } = this.props,
          className = ['player', team, role, isUser ? 'current-user' : ''].filter(Boolean).join(' ');

    let color = 'grey',
        icon = 'question';

    if (team) {
      color = team === 'a' ? 'green' : 'blue';
    }

    if (role) {
      icon = role === 'transmitter' ? 'upload' : 'download';
    }

    return (
      <Label
        className={className}
        id={`player-${id}`}
        ref={(instance) => connectDragSource(findDOMNode(instance))}
        color={color}
      >
        <Icon name={icon} />
        {username}
        {role ? <Label.Detail>{role}</Label.Detail> : ''}
      </Label>
    );
  }
}

export const DraggablePlayer = DragSource(PLAYER_CARD, {
  beginDrag: (playerProps) => ({ id: playerProps.id })
}, (connect) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
}))(Player);
