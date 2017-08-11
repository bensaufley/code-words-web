import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from '../ducks/session';
import modal from '../ducks/modal';
import loading from '../ducks/loading';
import games from '../ducks/games';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  games,
  loading,
  modal,
  session
});
