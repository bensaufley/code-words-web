import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Container, Segment } from 'semantic-ui-react';

import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

import './styles/semantic/semantic.min.css';
import './styles/index.css';

import AppHeaderContainer from './components/AppHeader';
import HomeContainer from './components/Home';
import SignUpContainer from './components/SignUp';
import SignInContainer from './components/SignIn';
import GameContainer from './components/Game';
import ModalContainer from './components/Modal';
import FourOhFour from './components/FourOhFour';
import LoadingIndicatorContainer from './components/LoadingIndicator';
import { loggedIn } from './ducks/session';

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="page-container">
        <AppHeaderContainer />
        <Container as="main">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/sign-up/" component={SignUpContainer} />
            <Route path="/sign-in/" component={SignInContainer} />
            <Route path="/games/:id([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/" component={GameContainer} />
            <Route component={FourOhFour} />
          </Switch>
        </Container>
        <Segment as="footer" className="page-footer">
          Copyright ©{new Date().getFullYear()} <a href="http://bensaufley.com">Ben Saufley</a>
        </Segment>
        <ModalContainer />
        <LoadingIndicatorContainer />
      </div>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'), () => {
  const apiToken = Cookies.get('apiToken'),
        apiUser = Cookies.getJSON('apiUser');
  if (apiToken && apiUser) {
    store.dispatch(loggedIn(apiToken, apiUser));
  } else {
    Cookies.remove('apiToken');
    Cookies.remove('apiUser');
  }
});
registerServiceWorker();
