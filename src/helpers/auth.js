import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function  mapAuthStateToProps({ session: { apiToken } }) {
  return { apiToken };
}

export function redirectIfAuthenticated(Component) {
  return connect(mapAuthStateToProps)((props) => {
    return props.apiToken ? <Redirect to="/" /> : <Component {...props} />;
  });
}

export function redirectIfUnauthenticated(Component) {
  return connect(mapAuthStateToProps)((props) => {
    return props.apiToken ? <Component {...props} /> : <Redirect to="/" />;
  });
}
