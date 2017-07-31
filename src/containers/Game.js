import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Loader } from 'semantic-ui-react';
import { redirectIfUnauthenticated } from '../helpers/auth';
import Tile from '../components/Tile';
import GameMenu from '../components/GameMenu';

import '../styles/Game.css';

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

  showMenu() {
    this.setState({ menuOpen: true });
  }

  hideMenu() {
    this.setState({ menuOpen: false });
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
          <h1>Game {game.id}</h1>
          <a onClick={this.showMenu.bind(this)}>Menu</a>
          <Grid columns={5} celled centered>
            {game.board.map((tile, i) => <Tile key={i} {...tile} />)}
          </Grid>
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
