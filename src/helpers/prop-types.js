import PropTypes from 'prop-types';
import moment from 'moment';

export const turnShape = PropTypes.shape({
  revealed: PropTypes.bool,
  type: PropTypes.string,
  word: PropTypes.string
});

export const userShape = PropTypes.shape({
  id: PropTypes.string,
  username: PropTypes.string
});

export const playerShape = PropTypes.shape({
  id: PropTypes.string,
  role: PropTypes.oneOf(['decoder', 'transmitter']),
  team: PropTypes.oneOf(['a', 'b']),
  user: userShape
});

export const tileShape = PropTypes.shape({
  revealed: PropTypes.bool,
  type: PropTypes.string,
  word: PropTypes.string
});

export const gameShape = PropTypes.shape({
  id: PropTypes.string,
  updatedAt: PropTypes.instanceOf(moment),
  activePlayerId: PropTypes.string,
  board: PropTypes.arrayOf(tileShape),
  completed: PropTypes.bool,
  started: PropTypes.bool,
  turns: PropTypes.arrayOf(turnShape),
  players: PropTypes.arrayOf(playerShape)
});
