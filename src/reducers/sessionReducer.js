import { LOGGED_IN, LOGGED_OUT, WEBSOCKET_OPENED, WEBSOCKET_CLOSED } from '../actions/session';

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
