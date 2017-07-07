import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { showModal } from './modal';

export const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT';

export function loggedIn(token, user) {
  let expires = new Date(jwtDecode(token).exp * 1000);
  Cookies.set('apiToken', token, { expires });
  Cookies.set('apiUser', user, { expires });

  return {
    type: LOGGED_IN,
    payload: { token, user }
  };
}

export function loggedOut() {
  Cookies.remove('apiToken');
  Cookies.remove('apiUser');

  return {
    type: LOGGED_OUT,
    payload: {}
  };
}

export function logIn(username, password) {
  return createSessionCallback(username, password);
}

export function logOut() {
  return (dispatch) => {
    dispatch(loggedOut());
    dispatch(push('/'));
  };
}

export function signUp(username, password) {
  return createSessionCallback(username, password, true);
}

function createSessionCallback(username, password, createUser = false) {
  let url, successMessage;
  if (createUser) {
    url = `${process.env.REACT_APP_API_URL}/signup`;
    successMessage = 'Welcome! You have successfully created an account.';
  } else {
    url = `${process.env.REACT_APP_API_URL}/login`;
    successMessage = 'You have successfully logged in.';
  }

  return (dispatch) => {
    return axios.post(url, { username, password })
      .then(({ data: { token, user } }) => {
        return dispatch(loggedIn(token, user));
      })
      .then(() => {
        return Promise.all([
          dispatch(push('/')),
          dispatch(showModal(successMessage, 'success'))
        ]);
      })
      .catch((err) => {
        let message;
        try { message = err.response.data.message; }
        catch (_) { message = err.message; }
        dispatch(showModal(message, 'error'));
      });
  };
}
