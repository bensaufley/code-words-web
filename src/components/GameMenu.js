import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { playerShape } from '../helpers/prop-types';

import { Player, DraggablePlayer } from './Player';
import { PlayerSlot, DroppablePlayerSlot } from './PlayerSlot';

class GameMenu extends Component {
  static defaultProps = {
    activePlayerId: null
  }

  static propTypes = {
    players: PropTypes.arrayOf(playerShape).isRequired,
    gameId: PropTypes.string.isRequired,
    activePlayerId: PropTypes.string,
    session: PropTypes.shape({
      apiUser: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }).isRequired,
    hideMenu: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired
  }

  renderPlayerSlot(player, team, role) {
    const { activePlayerId, gameId, session: { apiUser: { id: currentUserId } } } = this.props,
          isUser = player && player.user && currentUserId === player.user.id,
          isActive = player && activePlayerId === player.id,
          props = { gameId, player, isUser, isActive, role, team };

    if (activePlayerId) return <PlayerSlot {...props} />;

    return <DroppablePlayerSlot {...props} editable />;
  }

  render() {
    const { players, activePlayerId } = this.props,
          undecideds = players.filter((p) => p.team === null),
          teamATransmitter = players.find((p) => p.team === 'a' && p.role === 'transmitter'),
          teamADecoder = players.find((p) => p.team === 'a' && p.role === 'decoder'),
          teamBTransmitter = players.find((p) => p.team === 'b' && p.role === 'transmitter'),
          teamBDecoder = players.find((p) => p.team === 'b' && p.role === 'decoder');

    return (
      <Sidebar animation="overlay" as={Menu} visible={this.props.menuOpen} vertical>
        <Menu.Item onClick={this.props.hideMenu}>
          Close Menu
          <Icon name="close" />
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item header>Teams</Menu.Item>
          {undecideds.length ? (
            <Menu.Menu>
              <Menu.Item header>Undecided</Menu.Item>
              <Menu.Item>
                {undecideds.map((player) => (activePlayerId ?
                  <Player key={player.id} {...player} /> :
                  <DraggablePlayer key={player.id} {...player} />)
                )}
              </Menu.Item>
            </Menu.Menu>
          ) : ''}
          <Menu.Menu>
            <Menu.Item header>Team A</Menu.Item>
            <Menu.Item>
              {this.renderPlayerSlot(teamATransmitter, 'a', 'transmitter')}
              {this.renderPlayerSlot(teamADecoder, 'a', 'decoder')}
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu>
            <Menu.Item header>Team B</Menu.Item>
            <Menu.Item>
              {this.renderPlayerSlot(teamBTransmitter, 'b', 'transmitter')}
              {this.renderPlayerSlot(teamBDecoder, 'b', 'decoder')}
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Sidebar>
    );
  }
}

export default DragDropContext(HTML5Backend)(GameMenu);
