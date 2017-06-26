import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { push, replace } from 'react-router-redux';

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
  return function(dispatch) {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password })
      .then(({ data: { token, user } }) => {
        return dispatch(loggedIn(token, user));
      })
      .then(() => {
        return Promise.all([
          dispatch(push('/')),
          dispatch(showModal('You have successfully logged in.', 'success'))
        ]);
      })
      .catch((err) => {
        let message;
        try { message = err.response.data.message; }
        catch (e) { message = err.message; }
        dispatch(showModal(message, 'error'));
      });
  };
}

export function logOut() {
  return function(dispatch) {
    dispatch(loggedOut());
    dispatch(replace('/'));
  };
}
