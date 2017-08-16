import React from 'react';
import { render as reactRender, findDOMNode, unmountComponentAtNode } from 'react-dom';
import { render as enzymeRender } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import { generateStore } from '../../src/store';

const renderContainerWith = (render) => (providerProps = {}, routerProps = {}, appendToBody = false) => {
  const { initialState, ...pProps } = providerProps,
        state = Object.assign({
          session: {}
        }, initialState || {});

  return (ContainerComponent, containerProps = {}) => {
    const history = createHistory(),
          store = generateStore(history, state),
          div = document.createElement('div'),
          wrapper = render(
            <Provider
              store={store}
              {...pProps}
            >
              <ConnectedRouter
                history={history}
                {...routerProps}
              >
                <ContainerComponent
                  {...containerProps}
                  id="wrapped-component"
                />
              </ConnectedRouter>
            </Provider>,
            div
          );

    if (appendToBody) document.body.appendChild(div);
    return wrapper;
  };
};

export const wrapContainer = renderContainerWith(reactRender);

export const renderContainer = renderContainerWith(enzymeRender);

export function getWrappedComponent() {
  const wrappedComponentElement = document.body.querySelector('[data-reactroot]'),
        reactDOMElementKey = Object.keys(wrappedComponentElement).filter((k) => /react/.test(k))[0],
        reactDOMElement = wrappedComponentElement[reactDOMElementKey];
  return reactDOMElement._currentElement._owner._instance;
}

export function unmountContainer(container) {
  const parentNode = findDOMNode(container).parentNode;
  unmountComponentAtNode(parentNode);
  document.body.removeChild(parentNode);
}
