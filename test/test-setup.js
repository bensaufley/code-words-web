import { JSDOM } from 'jsdom';
import chai, { Assertion } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { WebSocketStub as WebSocket } from './support/websocket-helper';
import { receivedDispatch } from './support/dispatch-helper';
import polyfillRaf from './support/request-animation-frame-polyfill';
import getClientEnvironment from '../config/env';

process.env.NODE_ENV = 'test';

getClientEnvironment('');

chai.use(sinonChai);

Assertion.addMethod('receivedDispatch', receivedDispatch);

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = jsdom.window;
global.document = global.window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.WebSocket = WebSocket;
polyfillRaf();

function noop() {
  return {};
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit();
});

let consoleError = console.error;
sinon.stub(console, 'error').callsFake((warning, ...rest) => {
  if (warning && warning.indexOf('Warning: Failed prop type:') >= 0) {
    throw new Error(warning);
  } else {
    consoleError(warning, ...rest);
  }
});

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
