import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { redirectIfUnauthenticated } from '../helpers/auth';
import Tile from '../components/Tile';
import Player from '../components/Player';

import '../styles/Game.css';

export class Game extends Component {
  renderPlayer(player) {
    let user = this.props.users.find((u) => u.id === player.userId),
        currentUserId = this.props.session.apiUser.id,
        pickTeam = '',
        pickRole = '';

    if (!this.props.game.started && user.id === currentUserId) {
      pickTeam = 'Team A : Team B';
      pickRole = 'Transmitter : Decoder';
    }

    return (
      <div className={`player player-${player.role}`} key={player.id}>
        {user.username}: {player.team ? `Team ${player.team}` : ''} {player.role ? `${player.role}` : ''} {pickTeam} {pickRole}
      </div>
    );
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
    if (this.props.loading) return (<div>Loading…</div>);
    else if (!this.props.game) return (<Redirect to="/" />);

    let { game } = this.props;
    return (
      <div>
        <h1>Game {game.id}</h1>
        {this.renderTeams()}
        <div className="game-board">
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
