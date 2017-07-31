import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Loader, Menu } from 'semantic-ui-react';

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
      <Menu vertical fluid>
        {!games || !Object.keys(games).length ? <Loader active inline /> : Object.keys(games).map((id) => {
          let { game, players } = games[id];
          return (
            <Menu.Item key={game.id}>
              <Link to={`/games/${game.id}/`}>
                Game with {players.filter((p) => p.user.id !== apiUser.id).map((p) => p.user.username).join(', ') || 'nobody'}
              </Link>
            </Menu.Item>
          );
        })}
        <Menu.Item fitted>
          <Button fluid primary icon type='button' onClick={createGame.bind(this)}>
            <Icon name="plus" />
            New Game
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

Games.propTypes = {
  games: PropTypes.object,
  apiToken: PropTypes.string.isRequired,
  apiUser: PropTypes.object.isRequired
};

function mapStateToProps({ games, session: { apiToken, apiUser } }) {
  return { apiToken, apiUser, games };
}

export default connect(mapStateToProps, { createGame })(Games);
