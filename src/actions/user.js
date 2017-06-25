import axios from 'axios';
import { push } from 'react-router-redux';
import config from '../config';

import { showModal } from './modal';
import { loggedIn } from './session';

export function signUp(username, password) {
  return function(dispatch) {
    axios.post(`${config.apiUrl}/signup`, { username, password })
      .then(({ data: { token, user } }) => {
        return dispatch(loggedIn(token, user));
      })
      .then(() => {
        return Promise.all([
          dispatch(push('/')),
          dispatch(showModal('Welcome! You have successfully created an account.', 'success'))
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
