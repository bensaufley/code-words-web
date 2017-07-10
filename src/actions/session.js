import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { showModal } from './modal';
import { gameActions } from './games';

export const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      WEBSOCKET_OPENED = 'WEBSOCKET_OPENED',
      WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';

export function loggedIn(token, user) {
  return (dispatch) => {
    let expires = new Date(jwtDecode(token).exp * 1000);
    Cookies.set('apiToken', token, { expires });
    Cookies.set('apiUser', user, { expires });

    dispatch({
      type: LOGGED_IN,
      payload: { token, user }
    });

    dispatch(openWebSocket(token));
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
    url = `http://${process.env.REACT_APP_API_URL}/signup`;
    successMessage = 'Welcome! You have successfully created an account.';
  } else {
    url = `http://${process.env.REACT_APP_API_URL}/login`;
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

export function openWebSocket(token) {
  return (dispatch) => {
    let webSocketUrl = `ws://${process.env.REACT_APP_API_URL}/api/v1/?access_token=${token}`,
        webSocket = new WebSocket(webSocketUrl);

    webSocket.onopen = () => {
      dispatch({
        type: WEBSOCKET_OPENED,
        payload: { webSocket }
      });
    };

    webSocket.onmessage = ({ data }) => {
      try {
        let { event: type, payload } = JSON.parse(data);
        if (type && gameActions.includes(type)) {
          dispatch({ type, payload });
        } else {
          throw new Error(`Unrecognized action of type '${type}' with payload:`, payload);
        }
      } catch (e) {
        console.log(e);
      }
    };

    webSocket.onclose = (e) => {
      if (e !== 1000) {
        let reconnectInterval = setInterval(() => {
          if (webSocket.readyState === WebSocket.CLOSED) {
            webSocket = new WebSocket(webSocketUrl);
          } else {
            clearInterval(reconnectInterval);
          }
        }, 1000);
      } else {
        dispatch({ type: WEBSOCKET_CLOSED });
      }
    };
  };
}

export function closeWebSocket() {
  return { type: WEBSOCKET_CLOSED };
}
