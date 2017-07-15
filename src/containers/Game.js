import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { redirectIfUnauthenticated } from '../helpers/auth';
import Tile from '../components/Tile';

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
      <div className={`player player-${player.role}`} key={`${player.id}`}>
        {user.username}: {player.team ? `Team ${player.team}` : ''} {player.role ? `${player.role}` : ''} {pickTeam} {pickRole}
      </div>
    );
  }

  renderTeams() {
    let { players } = this.props,
        teams = players.reduce((t, player) => {
          (t[player.team] = t[player.team] || []).push(player);
          return t;
        }, {});

    return (
      <div className="teams">
        {Object.keys(teams).map((team) => {
          return (
            <div className={`team team-${team}`} key={`team-${team}`}>
              {teams[team].map((player) => this.renderPlayer(player))}
            </div>
          );
        })}
      </div>
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
