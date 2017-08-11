import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import modal from '../ducks/Modal';
import loading from '../ducks/LoadingIndicator';
import games from '../ducks/Games';

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  games,
  loading,
  modal,
  session
});
