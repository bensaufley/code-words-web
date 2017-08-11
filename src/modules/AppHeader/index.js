import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import '../../styles/AppHeader.css';

import { logOut } from '../../reducers/session';

export class AppHeader extends Component {
  static propTypes = {
    session: PropTypes.shape({
      apiToken: PropTypes.string,
      apiUser: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string
      })
    }).isRequired,
    logOut: PropTypes.func.isRequired
  }

  logOut(e) {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to log out?')) return;
    this.props.logOut();
  }

  render() {
    let links;

    if (this.props.session.apiToken) {
      links = (
        <Menu.Menu position="right">
          <Menu.Item href="/" className="log-out" onClick={this.logOut.bind(this)}>Log Out</Menu.Item>
        </Menu.Menu>
      );
    } else {
      links = (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/sign-up/">Sign Up</Menu.Item>
          <Menu.Item as={NavLink} to="/sign-in/">Sign In</Menu.Item>
        </Menu.Menu>
      );
    }

    return (
      <Menu>
        <Menu.Item header as={NavLink} exact to="/">Code Words</Menu.Item>
        {links}
      </Menu>
    );
  }
}

function mapStateToProps({ session }) {
  return { session };
}

export default connect(mapStateToProps, { logOut }, null, { pure: false })(AppHeader);
