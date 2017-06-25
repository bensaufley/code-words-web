import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import AppHeader from './components/AppHeader';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Modal from './components/Modal';

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <AppHeader />
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
        </main>
        <footer>
          Copyright ©{new Date().getFullYear()} <a href="http://bensaufley.com">Ben Saufley</a>
        </footer>
        <Modal />
      </div>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
