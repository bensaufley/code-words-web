import React, { Component } from 'react';

import '../styles/Player.css';

export default class Player extends Component {
  buttonOrText(text, type, val) {
    let { editable } = this.props,
        lcType = type.toLowerCase();
    if (editable) {
      return (
        <button type="button" className={`pick-${lcType}`}>{text || `Pick ${type}`}</button>
      );
    } else {
      return (
        <div className={`${lcType} ${lcType}-${val}`}>{text}</div>
      );
    }
  }

  role() {
    let roleText,
        { role } = this.props;
    if (role) roleText = role.substr(0,1).toUpperCase() + role.substr(1);
    return this.buttonOrText(roleText, 'Role', role);
  }


  team() {
    let teamText,
        { team } = this.props;
    if (team) team = `Team ${team.toUpperCase()}`;
    return this.buttonOrText(teamText, 'Team', team);
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
