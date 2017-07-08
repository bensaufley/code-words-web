import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modalReducer';
import sessionReducer from './sessionReducer';
import loadingReducer from './loadingReducer';
import gamesReducer from './gamesReducer';

export default combineReducers({
  form: formReducer,
  games: gamesReducer,
  loading: loadingReducer,
  modal: modalReducer,
  routing: routerReducer,
  session: sessionReducer
});
