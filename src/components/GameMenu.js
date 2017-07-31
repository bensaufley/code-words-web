import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from '../components/Player';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';


export default class GameMenu extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    activePlayerId: PropTypes.string,
    session: PropTypes.shape({
      apiUser: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }),
    hideMenu: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired
  }

  renderTeam(team, name) {
    if (team.length === 0) return null;
    let undecided = name === 'null',
        className = undecided ? 'undecided' : `team-${name}`;
    return (
      <Menu.Item key={className}>
        {undecided ? 'Undecided' : `Team ${name.toUpperCase()}`}
        <Menu.Menu>
          <Menu.Item>{team.map((player) => <Player key={player.id} {...player} />)}</Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }

  renderTeams() {
    const { game, players, activePlayerId, session: { apiUser: { id: currentUserId }} } = this.props,
          teams = players.reduce((obj, player) => {
            let isUser = player.user.id === currentUserId;
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
        {['null', 'a', 'b'].map((team) => this.renderTeam(teams[team], team))}
      </Menu.Menu>
    );
  }

  render() {
    return (
      <Sidebar animation='overlay' as={Menu} visible={this.props.menuOpen} vertical>
        <Menu.Item onClick={this.props.hideMenu}>
          Close Menu
          <Icon name="close" />
        </Menu.Item>
        <Menu.Item>{this.renderTeams()}</Menu.Item>
      </Sidebar>
    );
  }
}
