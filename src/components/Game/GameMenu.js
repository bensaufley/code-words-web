import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';

import { playerShape, turnShape } from '../../helpers/prop-types';
import { startGame } from '../../ducks/games';

import AddPlayerForm from './AddPlayerForm';
import { DraggablePlayer } from './Player';
import Turn from './Turn';
import { PlayerSlot, DroppablePlayerSlot } from './PlayerSlot';

class GameMenu extends Component {
  static defaultProps = {
    activePlayerId: null
  }

  static propTypes = {
    activePlayerId: PropTypes.string,
    gameId: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(playerShape).isRequired,
    session: PropTypes.shape({
      apiUser: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }).isRequired,
    hideMenu: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired,
    turns: PropTypes.arrayOf(turnShape).isRequired
  }

  startable() {
    const { players } = this.props;
    return players.length === 4 && players.filter((p) => p.team === null).length === 0;
  }

  renderPlayerSlot(player, team, role) {
    const { activePlayerId, gameId, session: { apiUser: { id: currentUserId } } } = this.props,
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
          {undecideds.map((player) => <div key={player.id}><DraggablePlayer {...player} /></div>)}
        </Menu.Item>
      </Menu.Menu>
    );
  }

  renderAddPlayerButton() {
    if (this.props.players.length === 4) return null;

    return (
      <Menu.Menu>
        <Menu.Item>Add Player</Menu.Item>
        <Menu.Item><AddPlayerForm initialValues={{ gameId: this.props.gameId }} /></Menu.Item>
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
    const { gameId, turns } = this.props;
    if (!turns || !turns.length) return null;

    /* eslint-disable react/no-array-index-key */
    return (
      <Menu.Menu>
        <Menu.Item header>Turns</Menu.Item>
        {turns.slice(0).reverse().map((turn, i) => <Menu.Item key={i}><Turn {...turn} gameId={gameId} /></Menu.Item>)}
      </Menu.Menu>
    );
    /* eslint-enable react/no-array-index-key */
  }

  render() {
    const { activePlayerId, hideMenu, gameId, menuOpen, startGame: startGameAction } = this.props;

    return (
      <Sidebar animation="overlay" as={Menu} visible={menuOpen} vertical>
        <Menu.Item onClick={hideMenu}>
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
        {activePlayerId ?
          '' :
          <Menu.Item>
            <Button primary icon fluid disabled={!this.startable()} onClick={() => startGameAction(gameId)}>
              <Icon name="check" />
              Start Game
            </Button>
          </Menu.Item>
        }
        {this.renderTurns()}
      </Sidebar>
    );
  }
}

export default connect(null, { startGame })(DragDropContext(HTML5Backend)(GameMenu));
