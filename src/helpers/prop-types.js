import PropTypes from 'prop-types';

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

export const gameShape = PropTypes.shape({
  activePlayerId: PropTypes.string,
  board: PropTypes.arrayOf(PropTypes.shape({
    revealed: PropTypes.bool,
    type: PropTypes.string,
    word: PropTypes.string
  })),
  completed: PropTypes.bool,
  started: PropTypes.bool,
  turns: PropTypes.arrayOf(turnShape)
});
