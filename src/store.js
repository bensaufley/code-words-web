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
            apiUser: Cookies.getJSON('apiUser')
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

  const store = createStore(rootReducer, initialState, composedEnhancers);

  const isActiveUser = ({ players, game: { activePlayerId } }, userId) => {
    const player = players.find((p) => p.id === activePlayerId);
    return player && player.user.id === userId;
  };

  store.subscribe(() => {
    let title;
    try {
      const { games, session: { apiUser: { id: currentUserId } } } = store.getState(),
            count = Object.values(games || {}).filter((g) => isActiveUser(g, currentUserId)).length,
            badge = count > 0 ? ` (${count})` : '';

      title = `Code Words${badge}`;
    } catch (e) {
      title = 'Code Words';
    }

    document.title = title;
  });

  return store;
}

const store = generateStore(history);
export default store;
