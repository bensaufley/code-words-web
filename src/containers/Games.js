import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Games = (props) => {
  let { apiUser, games } = props;

  return (
    <div>
      <h1>{apiUser.username}’s Games</h1>
      <ul>
        {!games || !games.length ? '' : games.map((game) => {
          return (
            <li key={game.id}><Link to={`/games/${game.id}/`}>Game {game.id}</Link></li>
          );
        })}
        <li><Link to="/games/new/">New Game</Link></li>
      </ul>
    </div>
  );
};

function mapStateToProps({ games, session: { apiUser } }) {
  return { apiUser, games };
}

export default connect(mapStateToProps)(Games);
