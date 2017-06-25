import { JSDOM } from 'jsdom';

global.document = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

function noop() {
  return {};
}

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
