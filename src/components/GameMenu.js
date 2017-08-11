import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

import { gameShape, playerShape } from '../helpers/prop-types';

import Player from './Player';

const renderTeam = (team, name) => {
  if (team.length === 0) return null;
  const undecided = name === 'null',
        className = undecided ? 'undecided' : `team-${name}`;
  return (
    <Menu.Item key={className}>
      {undecided ? 'Undecided' : `Team ${name.toUpperCase()}`}
      <Menu.Menu>
        <Menu.Item>{team.map((player) => <Player key={player.id} {...player} />)}</Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  );
};

export default class GameMenu extends Component {
  static defaultProps = {
    activePlayerId: null
  }

  static propTypes = {
    game: gameShape.isRequired,
    players: PropTypes.arrayOf(playerShape).isRequired,
    activePlayerId: PropTypes.string,
    session: PropTypes.shape({
      apiUser: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }).isRequired,
    hideMenu: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired
  }

  renderTeams() {
    const { game, players, activePlayerId, session: { apiUser: { id: currentUserId } } } = this.props,
          teams = players.reduce((obj, player) => {
            const isUser = player.user.id === currentUserId;
            obj[`${player.team}`].push({
              ...player,
              isUser,
              editable: isUser && !game.started,
              isTurn: player.id === activePlayerId
            });
            return obj;
          }, { a: [], b: [], null: [] });

    return (
      <Menu.Menu>
        <Menu.Item header>Teams</Menu.Item>
        {['null', 'a', 'b'].map((team) => renderTeam(teams[team], team))}
      </Menu.Menu>
    );
  }

  render() {
    return (
      <Sidebar animation="overlay" as={Menu} visible={this.props.menuOpen} vertical>
        <Menu.Item onClick={this.props.hideMenu}>
          Close Menu
          <Icon name="close" />
        </Menu.Item>
        <Menu.Item>{this.renderTeams()}</Menu.Item>
      </Sidebar>
    );
  }
}
