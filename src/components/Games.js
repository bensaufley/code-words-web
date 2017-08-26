import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Loader, Menu } from 'semantic-ui-react';

import { gameShape, userShape } from '../helpers/prop-types';

import { createGame, deleteGame } from '../ducks/games';

const activePlayerFor = (game) => {
  if (!game || !game.activePlayerId) return null;

  return game.players.find((p) => p.id === game.activePlayerId);
};

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

  renderGameIcon(game) {
    const activePlayer = activePlayerFor(game);
    if (!activePlayer) return null;
    const { apiUser: { id: currentUserId } } = this.props;

    if (game.completed) {
      const userPlayer = game.players.find((p) => p.user.id === currentUserId);
      if (userPlayer.team === game.turns[game.turns.length - 1].winner) return <Icon color="grey" name="trophy" />;
      return <Icon color="grey" name="bomb" />;
    }
    if (activePlayer.user.id === currentUserId) return <Icon color="orange" name="star" />;
    return <Icon color="grey" name="wait" />;
  }

  renderGameText(game) {
    const { apiUser: { id: currentUserId } } = this.props,
          gameText = `Game with ${game.players.filter((p) => p.user.id !== currentUserId).map((p) => p.user.username).join(', ') || 'nobody'}`,
          activePlayer = activePlayerFor(game);

    return !game.completed && activePlayer && activePlayer.user.id === currentUserId ?
      <span><strong>{gameText}</strong> (Your Turn)</span> :
      <span>{gameText}</span>;
  }

  render() {
    const { apiToken, apiUser, createGame: createGameAction, deleteGame: deleteGameAction, games } = this.props;

    const deleteGameHandler = (gameId) => (e) => {
      e.preventDefault();

      if (confirm('Are you sure?')) deleteGameAction(apiToken, gameId);
    };

    return (
      <div>
        <Button floated="right" primary icon type="button" onClick={() => createGameAction(apiToken)}>
          <Icon name="plus" />
          New Game
        </Button>
        <h1>{apiUser.username}’s Games</h1>
        <Menu vertical fluid>
          {!games ? <Loader active inline="centered" /> : games.map((gameObj) => {
            const { activePlayerId, id, updatedAt } = gameObj;
            return (
              <Menu.Item as={Link} key={id} to={`/games/${id}/`}>
                {this.renderGameIcon(gameObj)}
                {this.renderGameText(gameObj)}
                <small> updated {updatedAt.fromNow()}</small>
                {!activePlayerId ?
                  <Icon color="red" name="delete" title="Delete Game" onClick={deleteGameHandler(id)} />
                  : ''}
              </Menu.Item>
            );
          })}
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
