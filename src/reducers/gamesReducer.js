import { GAME_CREATED, /*GAME_TRANSMIT, GAME_DECODE,*/ GAMES_INDEXED, GAME_UPDATED } from '../actions/games';

export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case GAMES_INDEXED:
      return action.payload.games.reduce((obj, g) => {
        obj[g.game.id] = g;
        return obj;
      }, {});
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
