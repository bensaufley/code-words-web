import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modalReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  routing: routerReducer,
  modal: modalReducer,
  form: formReducer,
  session: sessionReducer
});
