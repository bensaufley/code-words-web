import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { playerShape, turnShape } from '../../helpers/prop-types';

const GameRow = ({
  activePlayerId,
  completed,
  currentUserId,
  deleteGameHandler,
  id,
  players,
  turns,
  updatedAt
}) => {
  const activePlayer = players.find((p) => p.id === activePlayerId);

  const renderGameIcon = () => {
    if (!activePlayer) return null;

    if (completed) {
      const userPlayer = players.find((p) => p.user.id === currentUserId);
      if (userPlayer.team === turns[turns.length - 1].winner) return <Icon color="grey" name="trophy" />;
      return <Icon color="grey" name="bomb" />;
    }
    if (activePlayer.user.id === currentUserId) return <Icon color="orange" name="star" />;
    return <Icon color="grey" name="wait" />;
  };

  const renderGameText = () => {
    const gameText = `Game with ${players.filter((p) => p.user.id !== currentUserId).map((p) => p.user.username).join(', ') || 'nobody'}`;

    return !completed && activePlayer && activePlayer.user.id === currentUserId ?
      <span><strong>{gameText}</strong> (Your Turn)</span> :
      <span>{gameText}</span>;
  };

  const deleteButton = activePlayerId ? '' : <Icon color="red" name="delete" title="Delete Game" onClick={deleteGameHandler} />;

  return (
    <Menu.Item as={Link} key={id} to={`/games/${id}/`}>
      {renderGameIcon()}
      {renderGameText()}
      <small> updated {updatedAt.fromNow()}</small>
      {deleteButton}
    </Menu.Item>
  );
};

GameRow.defaultProps = {
  activePlayerId: null,
  turns: []
};

GameRow.propTypes = {
  activePlayerId: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  currentUserId: PropTypes.string.isRequired,
  deleteGameHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired,
  turns: PropTypes.arrayOf(turnShape),
  updatedAt: PropTypes.instanceOf(moment).isRequired
};

export default GameRow;
