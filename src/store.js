import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

export const history = createHistory();

export function generateStore(hist, init = {}) {
  const initialState = {
          session: {
            apiToken: Cookies.get('apiToken'),
            user: Cookies.getJSON('apiUser')
          },
          ...init
        },
        enhancers = [],
        middleware = [
          thunk,
          routerMiddleware(hist)
        ];

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') enhancers.push(devToolsExtension());
  }

  const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

  return createStore(rootReducer, initialState, composedEnhancers);
}

const store = generateStore(history);
export default store;
