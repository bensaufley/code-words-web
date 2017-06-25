import { LOGGED_IN, LOGGED_OUT } from '../actions/session';

let initialState = {
  apiToken: null,
  apiUser: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        apiToken: action.payload.token,
        apiUser: action.payload.user
      }
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
