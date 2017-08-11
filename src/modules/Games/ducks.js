import axios from 'axios';
import { push } from 'react-router-redux';

import { showModal } from '../Modal/ducks';

export const GAME_CREATED = 'GAME_CREATED',
      GAME_TRANSMIT = 'GAME_TRANSMIT',
      GAME_DECODE = 'GAME_DECODE',
      GAMES_INDEXED = 'GAMES_INDEXED',
      GAME_UPDATED = 'GAME_UPDATED';

export const gameActions = [
  GAME_CREATED,
  GAME_TRANSMIT,
  GAME_DECODE,
  GAMES_INDEXED,
  GAME_UPDATED
];

export default function gamesReducer(state = null, action) {
  switch (action.type) {
    case GAMES_INDEXED:
      return action.payload.games.reduce((games, g) => ({ ...games, [g.game.id]: g }), {});
    case GAME_CREATED:
    case GAME_UPDATED:
      return {
        ...state,
        [action.payload.game.id]: action.payload
      };
    default:
      return state;
  }
}

export function createGame(token) {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios.post(`http://${process.env.REACT_APP_API_URL}/api/v1/games/`, null, config)
      .then(({ data }) => {
        dispatch({ type: GAME_CREATED, payload: data });
        dispatch(push(`/games/${data.game.id}/`));
      })
      .catch((err) => {
        dispatch(showModal(err.message, 'error'));
      });
  };
}
