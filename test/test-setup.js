import { JSDOM } from 'jsdom';
import chai, { Assertion } from 'chai';
import sinonChai from 'sinon-chai';
import { WebSocketStub as WebSocket } from './support/websocket-helper';
import { receivedDispatch } from './support/dispatch-helper';

chai.use(sinonChai);

Assertion.addMethod('receivedDispatch', receivedDispatch);

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = jsdom.window;
global.document = global.window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.WebSocket = WebSocket;

function noop() {
  return {};
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit();
});

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
