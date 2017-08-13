/* eslint-disable no-console */
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import { showModal } from './modal';
import { gameActions } from './games';

const SIGNUP_URL = `http://${process.env.REACT_APP_API_URL}/signup`,
      LOGIN_URL = `http://${process.env.REACT_APP_API_URL}/login`,
      SIGNUP_SUCCESS_MESSAGE = 'Welcome! You have successfully created an account.',
      LOGIN_SUCCESS_MESSAGE = 'You have successfully logged in.';

export const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      WEBSOCKET_OPENED = 'WEBSOCKET_OPENED',
      WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';

const initialState = {
  apiToken: null,
  apiUser: {}
};

export default function (state = initialState, action) {
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
      const { webSocket, ...others } = state;
      if (webSocket && webSocket.readyState === WebSocket.OPEN) webSocket.close();
      return { ...others };
    }
    default:
      return state;
  }
}

export function openWebSocket(token) {
  return (dispatch) => {
    const webSocketUrl = `ws://${process.env.REACT_APP_API_URL}/api/v1/?access_token=${token}`;
    let initializeWebSocket,
        webSocket = new WebSocket(webSocketUrl);

    const webSocketOnOpenCallback = () => {
      dispatch({
        type: WEBSOCKET_OPENED,
        payload: { webSocket }
      });
    };

    const webSocketOnMessageCallback = ({ data }) => {
      try {
        const { event: type, payload } = JSON.parse(data);
        if (type && gameActions.includes(type)) {
          dispatch({ type, payload });
        } else {
          throw new Error(`Unrecognized action of type '${type}' with payload:`, payload);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const webSocketOnCloseCallback = (e) => {
      if (e !== 1000) {
        const reconnectInterval = setInterval(() => {
          if (webSocket.readyState === WebSocket.CLOSED) {
            webSocket = initializeWebSocket();
          } else {
            clearInterval(reconnectInterval);
          }
        }, 1000);
      } else {
        dispatch({ type: WEBSOCKET_CLOSED });
      }
    };

    initializeWebSocket = () => {
      const ws = new WebSocket(webSocketUrl);
      ws.onopen = webSocketOnOpenCallback;
      ws.onmessage = webSocketOnMessageCallback;
      ws.onclose = webSocketOnCloseCallback;
      return ws;
    };

    webSocket = initializeWebSocket();
  };
}

export function closeWebSocket() {
  return { type: WEBSOCKET_CLOSED };
}

export function loggedIn(token, user) {
  return (dispatch) => {
    const expires = new Date(jwtDecode(token).exp * 1000);
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

function createSessionCallback(username, password, createUser = false) {
  const url = createUser ? SIGNUP_URL : LOGIN_URL,
        successMessage = createUser ? SIGNUP_SUCCESS_MESSAGE : LOGIN_SUCCESS_MESSAGE;

  return (dispatch) => axios.post(url, { username, password })
      .then(({ data: { token, user } }) => {
        dispatch(loggedIn(token, user));
      })
      .then(() => Promise.all([
        dispatch(push('/')),
        dispatch(showModal(successMessage, 'success'))
      ]))
      .catch((err) => {
        let message;
        try { message = err.response.data.message; } catch (_) { message = err.message; }
        dispatch(showModal(message, 'error'));
      });
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
