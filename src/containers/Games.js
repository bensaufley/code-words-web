import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        {!games || !Object.keys(games).length ? '' : Object.keys(games).map((id) => {
          let { game, players } = games[id];
          return (
            <li key={game.id}>
              <Link to={`/games/${game.id}/`}>
                Game {game.id} ({players.length} player{players.length > 1 ? 's' : ''})
              </Link>
            </li>
          );
        })}
        <li><button type='button' onClick={createGame.bind(this)}>New Game</button></li>
      </ul>
    </div>
  );
};

function mapStateToProps({ games, session: { apiToken, apiUser } }) {
  return { apiToken, apiUser, games };
}

export default connect(mapStateToProps, { createGame })(Games);
