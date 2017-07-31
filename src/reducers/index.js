import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import modal from '../modules/Modal/ducks';
import loading from '../modules/LoadingIndicator/ducks';
import games from '../modules/Games/ducks';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  games,
  loading,
  modal,
  session
});
