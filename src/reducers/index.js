import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modalReducer';
import sessionReducer from './sessionReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  form: formReducer,
  loading: loadingReducer,
  modal: modalReducer,
  routing: routerReducer,
  session: sessionReducer
});
