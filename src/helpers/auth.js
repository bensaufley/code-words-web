import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function  mapAuthStateToProps({ session: { apiToken } }) {
  return { apiToken };
}

export function redirectIfAuthenticated(Component) {
  return connect(mapAuthStateToProps)(({ apiToken, ...others }) => {
    return apiToken ? <Redirect to="/" /> : <Component {...others} />;
  });
}

export function redirectIfUnauthenticated(Component) {
  return connect(mapAuthStateToProps)(({ apiToken, ...others }) => {
    return apiToken ? <Component {...others} /> : <Redirect to="/" />;
  });
}
