import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/AppHeader.css';

import { logOut } from '../actions/session';

export class AppHeader extends Component {
  logOut(e) {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to log out?')) return;
    this.props.logOut();
  }

  loggedInLinks() {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <a href="/" className="log-out" onClick={this.logOut.bind(this)}>Log Out</a>
      </nav>
    );
  }

  loggedOutLinks() {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/sign-in">Sign In</NavLink>
      </nav>
    );
  }

  render() {
    return (
      <header className="page-header">
        <h2>Code Words</h2>
        {this.props.session.apiToken ? this.loggedInLinks() : this.loggedOutLinks()}
      </header>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    session
  };
}

export default connect(mapStateToProps, { logOut })(AppHeader);
