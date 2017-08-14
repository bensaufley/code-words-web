import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Loader, Menu } from 'semantic-ui-react';

import { gameShape, userShape } from '../helpers/prop-types';

import { createGame, deleteGame } from '../ducks/games';

export const Games = (props) => {
  const { apiToken, apiUser, createGame: createGameAction, deleteGame: deleteGameAction, games } = props;

  const deleteGameHandler = (gameId) => (e) => {
    e.preventDefault();

    if (confirm('Are you sure?')) deleteGameAction(apiToken, gameId);
  };

  return (
    <div>
      <Button floated="right" primary icon type="button" onClick={createGameAction(apiToken)}>
        <Icon name="plus" />
        New Game
      </Button>
      <h1>{apiUser.username}’s Games</h1>
      <Menu vertical fluid>
        {!games ? <Loader active inline="centered" /> : Object.keys(games).map((id) => {
          const { game, players } = games[id];
          return (
            <Menu.Item as={Link} key={game.id} to={`/games/${game.id}/`}>
              Game with {players.filter((p) => p.user.id !== apiUser.id).map((p) => p.user.username).join(', ') || 'nobody'}
              {!game.activePlayerId ?
                <Icon name="delete" title="Delete Game" onClick={deleteGameHandler(game.id)} />
                : ''}
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

Games.defaultProps = {
  games: null
};

Games.propTypes = {
  games: PropTypes.objectOf(gameShape),
  apiToken: PropTypes.string.isRequired,
  apiUser: userShape.isRequired,
  createGame: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
};

function mapStateToProps({ games, session: { apiToken, apiUser } }) {
  return { apiToken, apiUser, games };
}

const GamesContainer = connect(mapStateToProps, { createGame, deleteGame })(Games);

export default GamesContainer;
