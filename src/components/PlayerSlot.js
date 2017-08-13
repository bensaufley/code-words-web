import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';

import { PLAYER_CARD, assignPlayer } from '../ducks/games';
import { playerShape } from '../helpers/prop-types';

import { Player, DraggablePlayer } from './Player';

export class PlayerSlot extends Component {
  static defaultProps = {
    player: null,
    canDrop: false,
    connectDropTarget: (el) => el,
    editable: false,
    isActive: false,
    isOver: false,
    isUser: false
  }

  static propTypes = {
    player: playerShape,
    canDrop: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    editable: PropTypes.bool,
    isActive: PropTypes.bool,
    isOver: PropTypes.bool,
    isUser: PropTypes.bool,
    team: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }

  render() {
    const { canDrop, connectDropTarget, editable, isActive, isOver, isUser, role, team, player } = this.props,
          className = [
            player ? '' : 'empty',
            isActive ? 'active' : '',
            isUser ? 'current-user' : '',
            team ? `team-${team}` : '',
            isOver ? 'over' : '',
            canDrop ? 'droppable' : ''
          ].join(' ');

    let playerElement;

    if (player) {
      if (editable) {
        playerElement = <DraggablePlayer {...player} />;
      } else {
        playerElement = <Player {...player} />;
      }
    } else {
      const icon = role === 'transmitter' ? 'upload' : 'download';
      playerElement = (
        <Label color="grey">
          <Icon name={icon} />
          (Empty)
          <Label.Detail>{role}</Label.Detail>
        </Label>
      );
    }

    return connectDropTarget(
      <div
        className={className}
      >
        {playerElement}
      </div>
    );
  }
}

const mapStateToProps = (_, ownProps) => ownProps;

export const DroppablePlayerSlot = connect(mapStateToProps, { assignPlayer })(
  DropTarget(PLAYER_CARD, {
    canDrop: (props, monitor) => {
      const sourceSubject = monitor.getItem(),
            playerId = props.player && props.player.id;

      return sourceSubject.id !== playerId && monitor.isOver();
    },
    drop: (props, monitor) => {
      const { team, role, gameId } = props,
            playerId = monitor.getItem().id;
      props.assignPlayer(gameId, playerId, team, role);
    }
  }, (con, monitor) => ({
    connectDropTarget: con.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))(PlayerSlot)
);
