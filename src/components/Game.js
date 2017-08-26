import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Button, Icon, Loader, Menu, Modal, Segment } from 'semantic-ui-react';

import { playerShape, tileShape, turnShape, userShape } from '../helpers/prop-types';
import { redirectIfUnauthenticated } from '../helpers/auth';
import { colorForTeam, iconForRole } from '../helpers/style-dictionary';
import { rematchGame, takeTurn } from '../ducks/games';

import { Player } from './Player';
import TransmitForm from './TransmitForm';
import Tile from './Tile';
import GameMenu from './GameMenu';

import '../styles/Game.css';

export class Game extends Component {
  static defaultProps = {
    activePlayerId: null,
    board: [],
    completed: false,
    game: null,
    id: null,
    players: [],
    rematchId: null,
    turns: []
  }

  static propTypes = {
    activePlayerId: PropTypes.string,
    board: PropTypes.arrayOf(tileShape),
    completed: PropTypes.bool,
    decode: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    id: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    players: PropTypes.arrayOf(playerShape),
    push: PropTypes.func.isRequired,
    rematchId: PropTypes.string,
    rematchGame: PropTypes.func.isRequired,
    session: PropTypes.shape({
      apiUser: userShape.isRequired
    }).isRequired,
    turns: PropTypes.arrayOf(turnShape)
  }

  constructor(props) {
    super(props);

    this.toggleTransmitDialog = this.toggleTransmitDialog.bind(this);

    this.state = {
      completedDialogOpen: true,
      menuOpen: !props.activePlayerId,
      transmitDialogOpen: false
    };
  }

  componentWillReceiveProps({ id, activePlayerId }) {
    if (id && this.props.activePlayerId !== activePlayerId) {
      this.setState({ transmitDialogOpen: false });
    }
  }

  activePlayer() {
    const { activePlayerId, players } = this.props;
    return activePlayerId && players.find((p) => p.id === activePlayerId);
  }

  hideMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  toggleTransmitDialog() {
    this.setState({ transmitDialogOpen: !this.state.transmitDialogOpen });
  }

  renderTurnButton(player) {
    const { endTurn } = this.props,
          action = player.role === 'transmitter' ? this.toggleTransmitDialog : () => endTurn();

    return (
      <Menu.Item>
        <Button primary onClick={action}>
          <Icon name={iconForRole(player.role)} />
          {player.role === 'decoder' ? 'Finish Turn' : 'Transmit'}
        </Button>
      </Menu.Item>
    );
  }

  renderActivePlayerElement() {
    const { id, session } = this.props,
          activePlayer = this.activePlayer();

    if (!activePlayer) return null;

    const isUser = activePlayer.user.id === session.apiUser.id;

    return (
      <Menu.Menu position="right">
        {isUser ? this.renderTurnButton(activePlayer) : ''}
        <Menu.Item>
          {isUser ? <strong>Current{'\xa0'}Player:</strong> : 'Current\xa0Player:' }
          <Player {...activePlayer} gameId={id} isActive isUser={isUser} size="medium" />
        </Menu.Item>
      </Menu.Menu>
    );
  }

  renderCompletedModal() {
    const {
      id: gameId,
      completed,
      turns,
      players,
      push: pushAction,
      rematchId,
      rematchGame: rematchGameAction,
      session: { apiUser: { id: userId } }
    } = this.props;
    if (!completed) return null;
    const userPlayer = players.find((p) => p.user.id === userId),
          { winner } = turns[turns.length - 1],
          playerWon = userPlayer && userPlayer.team === winner,
          rematchCallback = rematchId ? () => pushAction(`/games/${rematchId}`) : () => rematchGameAction(gameId);

    return (
      <Modal
        dimmer="inverted"
        open={this.state.completedDialogOpen}
        closeIcon="close"
        onClose={() => this.setState({ completedDialogOpen: false })}
      >
        <Modal.Header>{playerWon ? 'You Won!' : 'You Lost!'}</Modal.Header>
        <Modal.Content>
          {playerWon ? `Great job Team ${winner.toUpperCase()}!` : 'Better luck next time!'}{'\xa0'}
          Return to the main menu to start a new game!
        </Modal.Content>
        <Modal.Actions>
          <Button primary={!rematchId} onClick={rematchCallback}>
            {rematchId ? 'Go to ' : <Icon name="repeat" />}
            Rematch
            {rematchId ? <Icon name="arrow right" /> : ''}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  renderCurrentTransmission() {
    const activePlayer = this.activePlayer();
    if (!activePlayer || activePlayer.role !== 'decoder') return null;
    const { turns } = this.props,
          transmissions = turns.filter((turn) => turn.event === 'transmission'),
          lastTurn = transmissions[transmissions.length - 1],
          team = activePlayer.team;

    return (
      <Menu.Item color={colorForTeam(team)}>
        Transmission:{'\xa0'}<strong>{lastTurn.word}</strong>, {lastTurn.number}{'\xa0'}word{lastTurn.number > 1 ? 's' : ''}
      </Menu.Item>
    );
  }

  render() {
    const { id, loading } = this.props;

    if (loading) return (<Segment><Loader active /><Menu><Menu.Item><Icon name="bars" />Menu</Menu.Item><Menu.Item header>Loading Game…</Menu.Item></Menu></Segment>);
    if (!id) return (<Redirect to="/" />);

    const { activePlayerId, board, players, session, turns } = this.props,
          menuParams = { activePlayerId, gameId: id, players, session, turns };

    const activePlayer = this.activePlayer(),
          decodeAction = activePlayer &&
            activePlayer.user.id === session.apiUser.id &&
            activePlayer.role === 'decoder' ?
              this.props.decode :
              null,
          transmitModal = activePlayer && activePlayer.role === 'transmitter' ?
            (<TransmitForm
              initialValues={{ gameId: id }}
              isOpen={this.state.transmitDialogOpen}
              onClose={this.toggleTransmitDialog}
            />) : '';

    return (
      <Segment>
        {transmitModal}
        {this.renderCompletedModal()}
        <GameMenu
          hideMenu={this.hideMenu.bind(this)}
          menuOpen={this.state.menuOpen}
          {...menuParams}
        />
        <Menu>
          <Menu.Item onClick={this.toggleMenu.bind(this)}>
            <Icon name="bars" />
            Menu
          </Menu.Item>
          {this.renderCurrentTransmission()}
          {this.renderActivePlayerElement()}
        </Menu>
        <div className="game">
          {board.map((tile, i) => <Tile key={tile.word} {...tile} index={i} decodeAction={decodeAction} />)}
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = ({ session, games }, { match: { params: { id } } }) => {
  if (!games) return { session, loading: true };
  const game = games[id],
        rematch = game &&
          game.completed &&
          Object.keys(games).map((k) => games[k])
            .sort(({ game: gameA }, { game: gameB }) => {
              if (gameA.updatedAt > gameB.updatedAt) return -1;
              if (gameB.updatedAt < gameA.updatedAt) return 1;
              return 0;
            })
            .find(({ updatedAt, players }) => {
              if (updatedAt > game.updatedAt) {
                return game.players.every((player) => (
                  players.some((p) => (
                    p.user.id === player.user.id &&
                    (p.team === player.team === 'a' ? 'b' : 'a') &&
                    (p.role === player.role === 'transmitter' ? 'decoder' : 'transmitter')
                  ))
                ));
              }
              return false;
            });
  return { session, loading: false, ...game, rematchId: rematch ? rematch.id : null };
};

const mapDispatchToProps = (dispatch, { match: { params: { id: gameId } } }) => bindActionCreators({
  decode: takeTurn(gameId, 'decode'),
  endTurn: takeTurn(gameId, 'end-turn'),
  push,
  rematchGame
}, dispatch);

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);

export default redirectIfUnauthenticated(GameContainer);
