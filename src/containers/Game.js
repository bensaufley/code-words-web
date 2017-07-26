import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Loader, Menu, Sidebar } from 'semantic-ui-react';
import { redirectIfUnauthenticated } from '../helpers/auth';
import Tile from '../components/Tile';
import Player from '../components/Player';

import '../styles/Game.css';

export class Game extends Component {
  static propTypes = {
    activePlayerId: PropTypes.string,
    game: PropTypes.object,
    loading: PropTypes.bool,
    players: PropTypes.array,
    session: PropTypes.object
  }

  renderTeam(team, name) {
    if (team.length === 0) return null;
    let undecided = name === 'null',
        className = undecided ? 'undecided' : `team-${name}`;
    return (
      <div className={`team ${className}`} key={className}>
        <h3>{undecided ? 'Undecided' : `Team ${name.toUpperCase()}`}</h3>
        <div className="players">
          {team.map((player) => <Player key={player.id} {...player} />)}
        </div>
      </div>
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
      <section className="teams">
        <h2>Teams</h2>
        {['null', 'a', 'b'].map((team) => this.renderTeam(teams[team], team))}
      </section>
    );
  }

  render() {
    if (this.props.loading) return (<Loader active inline />);
    else if (!this.props.game) return (<Redirect to="/" />);

    let { game } = this.props;
    return (
      <div>
        <Sidebar animation='overlay' visible={true}>
          <Menu.Item>{this.renderTeams()}</Menu.Item>
        </Sidebar>
        <h1>Game {game.id}</h1>
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
