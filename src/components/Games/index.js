import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Loader, Menu } from 'semantic-ui-react';

import { gameShape, userShape } from '../../helpers/prop-types';

import { createGame, deleteGame } from '../../ducks/games';
import GameRow from './GameRow';

export class Games extends Component {
  static defaultProps = {
    games: null
  };

  static propTypes = {
    games: PropTypes.arrayOf(gameShape),
    apiToken: PropTypes.string.isRequired,
    apiUser: userShape.isRequired,
    createGame: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired
  };

  renderGameList() {
    if (!this.props.games) return <Loader active inline="centered" />;

    const { apiToken, apiUser: { id: currentUserId }, deleteGame: deleteGameAction, games } = this.props;

    const deleteGameHandler = (gameId) => (e) => {
      e.preventDefault();

      if (confirm('Are you sure?')) deleteGameAction(apiToken, gameId);
    };

    return games.map((gameObj) => (
      <GameRow
        key={gameObj.id}
        {...gameObj}
        currentUserId={currentUserId}
        deleteGameHandler={deleteGameHandler(gameObj.id)}
      />
    ));
  }

  render() {
    const { apiToken, apiUser, createGame: createGameAction } = this.props;

    return (
      <div>
        <Button floated="right" primary icon type="button" onClick={() => createGameAction(apiToken)}>
          <Icon name="plus" />
          New Game
        </Button>
        <h1>{apiUser.username}’s Games</h1>
        <Menu vertical fluid>
          {this.renderGameList()}
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ games, session: { apiToken, apiUser } }) {
  const sortedGames = games ? Object.keys(games).map((k) => games[k]).sort((a, b) => {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }) : null;
  return { apiToken, apiUser, games: sortedGames };
}

const GamesContainer = connect(mapStateToProps, { createGame, deleteGame })(Games);

export default GamesContainer;
