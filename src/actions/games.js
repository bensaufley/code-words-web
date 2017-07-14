import axios from 'axios';

import { showModal } from './modal';

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

export function createGame(token) {
  return (dispatch) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios.post(`http://${process.env.REACT_APP_API_URL}/api/v1/games/`, null, config)
      .then(({ data }) => {
        dispatch({ type: GAME_CREATED, payload: data });
      })
      .catch((err) => {
        dispatch(showModal(err.message, 'error'));
      });
  };
}
