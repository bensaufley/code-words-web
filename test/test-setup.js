import { JSDOM } from 'jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

console.log("ENV IS:", process.env.NODE_ENV);

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = jsdom.window;
global.document = global.window.document;
global.navigator = {
  userAgent: 'node.js'
};

function noop() {
  return {};
}

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
