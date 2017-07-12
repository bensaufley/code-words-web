import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import AppHeader from './containers/AppHeader';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Game from './containers/Game';
import Modal from './containers/Modal';
import FourOhFour from './components/FourOhFour';
import LoadingIndicator from './containers/LoadingIndicator';
import { loggedIn } from './actions/session';

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="page-container">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign-up/" component={SignUp} />
            <Route path="/sign-in/" component={SignIn} />
            <Route path="/games/:id([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/" component={Game} />
            <Route component={FourOhFour} />
          </Switch>
        </main>
        <footer className="page-footer">
          Copyright ©{new Date().getFullYear()} <a href="http://bensaufley.com">Ben Saufley</a>
        </footer>
        <Modal />
        <LoadingIndicator />
      </div>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'), () => {
  let apiToken = Cookies.get('apiToken'),
      apiUser = Cookies.getJSON('apiUser');
  if (apiToken && apiUser) {
    store.dispatch(loggedIn(apiToken, apiUser));
  } else {
    Cookies.remove('apiToken');
    Cookies.remove('apiUser');
  }
});
registerServiceWorker();
