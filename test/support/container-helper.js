import React from 'react';
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-dom/test-utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';

export function wrapContainer(providerProps = {}, routerProps = {}) {
  let initialState = Object.assign({
        session: {}
      }, providerProps.initialState || {});
  delete providerProps.initialState;

  return function(containerComponent) {
    const history = createHistory();
    return renderIntoDocument(
      <Provider
        store={createStore(((state) => state), initialState)}
        {...providerProps}
      >
        <ConnectedRouter
          history={history}
          {...providerProps}
        >
          {containerComponent}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export function unmountContainer(container) {
  return unmountComponentAtNode(findDOMNode(container));
}
