import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Icon, Loader, Menu } from 'semantic-ui-react';
import { redirectIfUnauthenticated } from '../../helpers/auth';
import Tile from '../Tile';
import GameMenu from '../GameMenu';

import '../../styles/Game.css';

export class Game extends Component {
  static propTypes = {
    activePlayerId: PropTypes.string,
    game: PropTypes.object,
    loading: PropTypes.bool,
    players: PropTypes.array,
    session: PropTypes.object
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
    return 'New Game';
  }

  hideMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    if (this.props.loading) return (<Loader active inline />);
    else if (!this.props.game) return (<Redirect to="/" />);

    let { game, players, activePlayerId, session } = this.props,
        menuParams = { game, players, activePlayerId, session };
    return (
      <div>
        <GameMenu
          hideMenu={this.hideMenu.bind(this)}
          menuOpen={this.state.menuOpen}
          {...menuParams}
          />
          <Menu>
            <Menu.Item header>
              {this.headerDisplay()}
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item onClick={this.toggleMenu.bind(this)}>
                <Icon name="bars" />
                Menu
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <div className="game">
            {game.board.map((tile, i) => <Tile key={i} {...tile} />)}
          </div>
      </div>
    );
  }
}

function mapStateToProps({ session, games }, { match: { params: { id }}}) {
  if (!games) return { loading: true };
  else return { session, ...games[id] };
}

let GameContainer = connect(mapStateToProps, {})(Game);

export default redirectIfUnauthenticated(GameContainer);
