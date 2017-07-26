import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Loader } from 'semantic-ui-react';

import { createGame } from '../actions/games';

export const Games = (props) => {
  let { apiToken, apiUser, games } = props;

  let createGame = (e) => {
    e.preventDefault();

    props.createGame(apiToken);
  };

  return (
    <div>
      <h1>{apiUser.username}’s Games</h1>
      <ul>
        {!games || !Object.keys(games).length ? <Loader active inline /> : Object.keys(games).map((id) => {
          let { game, players } = games[id];
          return (
            <li key={game.id}>
              <Link to={`/games/${game.id}/`}>
                Game {game.id} ({players.length} player{players.length > 1 ? 's' : ''})
              </Link>
            </li>
          );
        })}
      </ul>
      <Button primary icon type='button' onClick={createGame.bind(this)}>
        <Icon name="plus" />
        New Game
      </Button>
    </div>
  );
};

Games.propTypes = {
  games: PropTypes.array,
  apiToken: PropTypes.string.isRequired,
  apiUser: PropTypes.object.isRequired
};

function mapStateToProps({ games, session: { apiToken, apiUser } }) {
  return { apiToken, apiUser, games };
}

export default connect(mapStateToProps, { createGame })(Games);
