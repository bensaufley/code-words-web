import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Icon, Loader, Menu, Segment } from 'semantic-ui-react';

import { gameShape, playerShape, userShape } from '../helpers/prop-types';
import { redirectIfUnauthenticated } from '../helpers/auth';

import { Player } from './Player';
import Tile from './Tile';
import GameMenu from './GameMenu';

import '../styles/Game.css';

export class Game extends Component {
  static defaultProps = {
    game: null,
    players: []
  }

  static propTypes = {
    game: gameShape,
    loading: PropTypes.bool.isRequired,
    players: PropTypes.arrayOf(playerShape),
    session: PropTypes.shape({
      apiUser: userShape.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: !!(props.game && !props.game.activePlayerId)
    };
  }

  hideMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { game, loading } = this.props;

    if (!loading && !game) return (<Redirect to="/" />);

    const { players, session } = this.props,
          menuParams = { game, players, session };

    if (loading) return (<Segment><Loader active /><Menu><Menu.Item><Icon name="bars" />Menu</Menu.Item><Menu.Item header>Loading Game…</Menu.Item></Menu></Segment>);

    const activePlayer = game && game.activePlayerId && players.find((p) => p.id === game.activePlayerId),
          isUser = game && game.activePlayerId && activePlayer.user.id === session.apiUser.id;
    let activePlayerElement = '';
    if (activePlayer) {
      activePlayerElement = (
        <Menu.Menu position="right">
          <Menu.Item>
            {isUser ? <strong>Current{'\xa0'}Player:</strong> : 'Current\xa0Player:' }
            <Player {...activePlayer} isActive isUser={isUser} size="medium" />
          </Menu.Item>
        </Menu.Menu>
      );
    }

    return (
      <Segment>
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
          {activePlayerElement}
        </Menu>
        <div className="game">
          {game.board.map((tile) => <Tile key={tile.word} {...tile} />)}
        </div>
      </Segment>
    );
  }
}

function mapStateToProps({ session, games }, { match: { params: { id } } }) {
  if (!games) return { session, loading: true };
  return { session, loading: false, ...games[id] };
}

const GameContainer = connect(mapStateToProps, {})(Game);

export default redirectIfUnauthenticated(GameContainer);
