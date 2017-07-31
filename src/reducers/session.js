import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { showModal } from '../modules/Modal/ducks';
import { gameActions } from '../modules/Games/ducks';

const SIGNUP_URL = `http://${process.env.REACT_APP_API_URL}/signup`,
      LOGIN_URL = `http://${process.env.REACT_APP_API_URL}/login`,
      SIGNUP_SUCCESS_MESSAGE = 'Welcome! You have successfully created an account.',
      LOGIN_SUCCESS_MESSAGE = 'You have successfully logged in.';

export const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      WEBSOCKET_OPENED = 'WEBSOCKET_OPENED',
      WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';

let initialState = {
  apiToken: null,
  apiUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        apiToken: action.payload.token,
        apiUser: action.payload.user
      };
    case LOGGED_OUT:
      return initialState;
    case WEBSOCKET_OPENED:
      return {
        ...state,
        webSocket: action.payload.webSocket
      };
    case WEBSOCKET_CLOSED: {
      let { webSocket, ...others } = state;
      if (webSocket && webSocket.readyState === WebSocket.OPEN) webSocket.close();
      return { ...others };
    }
    default:
      return state;
  }
}

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
  let url = createUser ? SIGNUP_URL : LOGIN_URL,
      successMessage = createUser ? SIGNUP_SUCCESS_MESSAGE : LOGIN_SUCCESS_MESSAGE;

  return (dispatch) => {
    return axios.post(url, { username, password })
      .then(({ data: { token, user } }) => {
        dispatch(loggedIn(token, user));
      })
      .then(() => Promise.all([
        dispatch(push('/')),
        dispatch(showModal(successMessage, 'success'))
      ]))
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
