import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Loader, Menu } from 'semantic-ui-react';

import { gameShape, userShape } from '../helpers/prop-types';

import { createGame } from '../ducks/games';

export const Games = (props) => {
  const { apiToken, apiUser, games } = props;

  const newGameClickHandler = (e) => {
    e.preventDefault();

    props.createGame(apiToken);
  };

  return (
    <div>
      <h1>{apiUser.username}’s Games</h1>
      <Menu vertical fluid>
        {!games || !Object.keys(games).length ? <Loader active inline /> : Object.keys(games).map((id) => {
          const { game, players } = games[id];
          return (
            <Menu.Item key={game.id}>
              <Link to={`/games/${game.id}/`}>
                Game with {players.filter((p) => p.user.id !== apiUser.id).map((p) => p.user.username).join(', ') || 'nobody'}
              </Link>
            </Menu.Item>
          );
        })}
        <Menu.Item fitted>
          <Button fluid primary icon type="button" onClick={newGameClickHandler.bind(this)}>
            <Icon name="plus" />
            New Game
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

Games.defaultProps = {
  games: {}
};

Games.propTypes = {
  games: PropTypes.objectOf(gameShape),
  apiToken: PropTypes.string.isRequired,
  apiUser: userShape.isRequired
};

function mapStateToProps({ games, session: { apiToken, apiUser } }) {
  return { apiToken, apiUser, games };
}

const GamesContainer = connect(mapStateToProps, { createGame })(Games);

export default GamesContainer;
