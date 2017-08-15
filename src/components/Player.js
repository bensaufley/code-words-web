import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import { DragSource } from 'react-dnd';

import { PLAYER_CARD, removePlayer } from '../ducks/games';
import { userShape } from '../helpers/prop-types';
import { colorForTeam, iconForRole } from '../helpers/style-dictionary';

import '../styles/Player.css';

export class Player extends Component {
  static defaultProps = {
    connectDragSource: (el) => el,
    editable: false,
    isActive: false,
    team: null,
    removePlayer: () => {},
    role: null,
    isUser: false
  }

  static propTypes = {
    connectDragSource: PropTypes.func,
    editable: PropTypes.bool,
    gameId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    user: userShape.isRequired,
    team: PropTypes.string,
    removePlayer: PropTypes.func,
    role: PropTypes.string,
    isUser: PropTypes.bool
  }

  removePlayer() {
    const { gameId, id, removePlayer: removePlayerAction } = this.props;

    if (confirm('Are you sure?')) removePlayerAction(gameId, id);
  }

  render() {
    const { connectDragSource, editable, id, isActive, isUser, role, team, user: { username } } = this.props,
          className = [
            'player',
            'fluid',
            team,
            role,
            editable ? 'draggable' : '',
            isUser ? 'current-user' : ''
          ].filter(Boolean).join(' ');

    let color = 'grey',
        icon = 'question';

    if (team) color = colorForTeam(team);
    if (role) icon = iconForRole(role);

    return (
      <Label
        basic={!isActive}
        className={className}
        id={`player-${id}`}
        ref={(instance) => connectDragSource(findDOMNode(instance))}
        color={color}
      >
        <Icon name={icon} />
        {isUser ? <Icon name="user" /> : ''}
        {username}
        {role ? <Label.Detail>{role}</Label.Detail> : ''}
        {editable ? <Icon name="delete" onClick={this.removePlayer.bind(this)} /> : ''}
      </Label>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

export const DraggablePlayer = connect(mapStateToProps, { removePlayer })(DragSource(PLAYER_CARD, {
  beginDrag: (playerProps) => ({ id: playerProps.id })
}, (con) => ({
  connectDragSource: con.dragSource(),
  connectDragPreview: con.dragPreview(),
  editable: true
}))(Player));
