import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { gameShape, playerShape } from '../helpers/prop-types';

import AddPlayerForm from './AddPlayerForm';
import { DraggablePlayer } from './Player';
import Turn from './Turn';
import { PlayerSlot, DroppablePlayerSlot } from './PlayerSlot';

class GameMenu extends Component {
  static defaultProps = {
    activePlayerId: null
  }

  static propTypes = {
    players: PropTypes.arrayOf(playerShape).isRequired,
    game: gameShape.isRequired,
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
    const { activePlayerId, game: { id: gameId }, session: { apiUser: { id: currentUserId } } } = this.props,
          isUser = player && player.user && currentUserId === player.user.id,
          isActive = player && activePlayerId === player.id,
          props = { gameId, player, isUser, isActive, role, team };

    if (activePlayerId) return <PlayerSlot {...props} />;

    return <DroppablePlayerSlot {...props} editable />;
  }

  renderUndecideds() {
    const { players } = this.props,
          undecideds = players.filter((p) => p.team === null);

    if (!undecideds.length) return null;

    return (
      <Menu.Menu>
        <Menu.Item header>Undecided</Menu.Item>
        <Menu.Item>
          {undecideds.map((player) => <DraggablePlayer key={player.id} {...player} />)}
        </Menu.Item>
      </Menu.Menu>
    );
  }

  renderAddPlayerButton() {
    if (this.props.players.length === 4) return null;

    return (
      <Menu.Menu>
        <Menu.Item>Add Player</Menu.Item>
        <Menu.Item><AddPlayerForm gameId={this.props.game.id} /></Menu.Item>
      </Menu.Menu>
    );
  }

  renderTeam(team) {
    const { players } = this.props,
          transmitter = players.find((p) => p.team === team && p.role === 'transmitter'),
          decoder = players.find((p) => p.team === team && p.role === 'decoder');

    return (
      <Menu.Menu>
        <Menu.Item color={team === 'a' ? 'green' : 'blue'}>Team {team.toUpperCase()}</Menu.Item>
        <Menu.Item>
          {this.renderPlayerSlot(transmitter, team, 'transmitter')}
          {this.renderPlayerSlot(decoder, team, 'decoder')}
        </Menu.Item>
      </Menu.Menu>
    );
  }

  renderTurns() {
    const { game: { id: gameId, turns } } = this.props;
    if (!turns.length) return null;

    /* eslint-disable react/no-array-index-key */
    return (
      <Menu.Menu>
        <Menu.Item header>Turns</Menu.Item>
        {turns.map((turn, i) => <Turn {...turn} gameId={gameId} key={i} />)}
      </Menu.Menu>
    );
    /* eslint-enable react/no-array-index-key */
  }

  render() {
    return (
      <Sidebar animation="overlay" as={Menu} visible={this.props.menuOpen} vertical>
        <Menu.Item onClick={this.props.hideMenu}>
          Close Menu
          <Icon name="close" />
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item header>Teams</Menu.Item>
          {this.renderUndecideds()}
          {this.renderAddPlayerButton()}
          {this.renderTeam('a')}
          {this.renderTeam('b')}
        </Menu.Menu>
        {this.renderTurns()}
      </Sidebar>
    );
  }
}

export default DragDropContext(HTML5Backend)(GameMenu);
