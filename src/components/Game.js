import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Icon, Loader, Menu, Segment } from 'semantic-ui-react';

import { gameShape, playerShape, userShape } from '../helpers/prop-types';
import { redirectIfUnauthenticated } from '../helpers/auth';

import Tile from './Tile';
import GameMenu from './GameMenu';

import '../styles/Game.css';

export class Game extends Component {
  static defaultProps = {
    activePlayerId: null,
    game: null,
    players: []
  }

  static propTypes = {
    activePlayerId: PropTypes.string,
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
      menuOpen: !props.activePlayerId
    };
  }

  headerDisplay() {
    if (this.props.game.completed) return 'Completed Game';
    if (this.props.game.started) return 'Game in Progress';
    return 'Unstarted Game';
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

    const { players, activePlayerId, session } = this.props,
          menuParams = { game, players, activePlayerId, session };
    return (
      <Segment>
        {loading ?
          <Loader active /> :
          <GameMenu
            hideMenu={this.hideMenu.bind(this)}
            menuOpen={this.state.menuOpen}
            {...menuParams}
          />
        }
        <Menu>
          <Menu.Item as={Link} to="/">
            <Icon name="chevron left" />
            All Games
          </Menu.Item>
          {loading ? '' : <Menu.Item header>
            {this.headerDisplay()}
          </Menu.Item>}
          {loading ? '' : <Menu.Menu position="right">
            <Menu.Item onClick={this.toggleMenu.bind(this)}>
              <Icon name="bars" />
                Menu
              </Menu.Item>
          </Menu.Menu>}
        </Menu>
        <div className="game">
          {loading ? '' : game.board.map((tile) => <Tile key={tile.word} {...tile} />)}
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
