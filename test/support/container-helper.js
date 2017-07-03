import React from 'react';
import { render, findDOMNode, unmountComponentAtNode } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

export function wrapContainer(providerProps = {}, routerProps = {}, appendToBody = false) {
  let initialState = Object.assign({
    session: {}
  }, providerProps.initialState || {});
  delete providerProps.initialState;

  return function(ContainerComponent, props = {}) {
    const history = createHistory(),
          store = createStore(
            ((state) => state),
            initialState,
            applyMiddleware(thunk, routerMiddleware(history))
          );
    let div = document.createElement('div'),
        wrapper = render(
      <Provider
        store={store}
        {...providerProps}
      >
        <ConnectedRouter
          history={history}
          {...routerProps}
        >
          <ContainerComponent
            {...props}
            id="wrapped-component"
            />
        </ConnectedRouter>
      </Provider>,
      div
    );

    if (appendToBody) document.body.appendChild(div);
    return wrapper;
  };
}

export function getWrappedComponent() {
  const wrappedComponentElement = document.body.querySelector('[data-reactroot]'),
        reactDOMElementKey = Object.keys(wrappedComponentElement).filter((k) => /react/.test(k))[0],
        reactDOMElement = wrappedComponentElement[reactDOMElementKey];
  return reactDOMElement._currentElement._owner._instance;
}

export function unmountContainer(container) {
  let parentNode = findDOMNode(container).parentNode;
  unmountComponentAtNode(parentNode);
  document.body.removeChild(parentNode);
}
