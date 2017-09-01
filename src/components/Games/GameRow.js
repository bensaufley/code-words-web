import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { playerShape, turnShape } from '../../helpers/prop-types';

export default class GameRow extends Component {
  static defaultProps = {
    activePlayerId: null,
    turns: []
  };

  static propTypes = {
    activePlayerId: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string.isRequired,
    deleteGameHandler: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(playerShape).isRequired,
    turns: PropTypes.arrayOf(turnShape),
    updatedAt: PropTypes.instanceOf(moment).isRequired
  };

  getActivePlayer() {
    return this.props.players.find((p) => p.id === this.props.activePlayerId);
  }

  renderGameIcon() {
    const activePlayer = this.getActivePlayer();
    if (!activePlayer) return null;

    const { completed, currentUserId, players, turns } = this.props,
          icon = { color: 'grey', name: 'wait' };

    if (completed) {
      const userPlayer = players.find((p) => p.user.id === currentUserId);
      if (userPlayer.team === turns[turns.length - 1].winner) icon.name = 'trophy';
      else icon.name = 'bomb';
    } else if (activePlayer.user.id === currentUserId) {
      icon.color = 'orange';
      icon.name = 'star';
    }

    return <Icon {...icon} />;
  }

  renderGameText() {
    const { completed, currentUserId, players } = this.props,
          activePlayer = this.getActivePlayer(),
          gameText = `Game with ${players.filter((p) => p.user.id !== currentUserId).map((p) => p.user.username).join(', ') || 'nobody'}`;

    return !completed && activePlayer && activePlayer.user.id === currentUserId ?
      <span><strong>{gameText}</strong> (Your Turn)</span> :
      <span>{gameText}</span>;
  }

  renderDeleteButton() {
    const { activePlayerId, deleteGameHandler } = this.props;
    return activePlayerId ? '' : <Icon color="red" name="delete" title="Delete Game" onClick={deleteGameHandler} />;
  }

  render() {
    const { id, updatedAt } = this.props;

    return (
      <Menu.Item as={Link} key={id} to={`/games/${id}/`}>
        {this.renderGameIcon()}
        {this.renderGameText()}
        <small> updated {updatedAt.fromNow()}</small>
        {this.renderDeleteButton()}
      </Menu.Item>
    );
  }
}
