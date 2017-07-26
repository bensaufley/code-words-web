import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import '../styles/AppHeader.css';

import { logOut } from '../actions/session';

export class AppHeader extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
  }

  logOut(e) {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to log out?')) return;
    this.props.logOut();
  }

  loggedInLinks() {
    return (
      <Menu.Menu position="right">
        <Menu.Item href="/" className="log-out" onClick={this.logOut.bind(this)}>Log Out</Menu.Item>
      </Menu.Menu>
    );
  }

  loggedOutLinks() {
    return (
      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to="/sign-up/">Sign Up</Menu.Item>
        <Menu.Item as={NavLink} to="/sign-in/">Sign In</Menu.Item>
      </Menu.Menu>
    );
  }

  render() {
    return (
      <Menu>
        <Menu.Item header as={NavLink} to="/">Code Words</Menu.Item>
        {this.props.session.apiToken ? this.loggedInLinks() : this.loggedOutLinks()}
      </Menu>
    );
  }
}

function mapStateToProps({ session, routing: { location } }) {
  return {
    session,
    location
  };
}

export default connect(mapStateToProps, { logOut })(AppHeader);
