import React, { Component } from 'react';

import '../styles/Player.css';

export default class Player extends Component {

  role() {
    let { role, editable } = this.props;
    if (role) role = role.substr(0,1).toUpperCase() + role.substr(1);
    if (editable) {
      return (
        <button type="button" className="pick-role">{role || 'Pick Role'}</button>
      );
    } else {
      return (<div className={`role role-${role}`}>{role}</div>);
    }
  }


  team() {
    let { team, editable } = this.props;
    if (team) team = `Team ${team.toUpperCase()}`;
    if (editable) {
      return (
        <button type="button" className="pick-team">{team || 'Pick Team'}</button>
      );
    } else {
      return (<div className={`team team-${team}`}>{team}</div>);
    }
  }

  render() {
    let { team, role, user: { username }, isUser } = this.props,
        className = ['player', team, role, isUser ? 'current-user' : ''].filter(Boolean).join(' ');

    return (
      <div className={className}>
        <strong className="username">{username}</strong>
        {this.team()}
        {this.role()}
      </div>
    );
  }
}
