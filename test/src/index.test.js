/* eslint-disable global-require */
import { expect } from '../test-setup';
import sinon from 'sinon';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import path from 'path';
import UserDummy from '../dummies/user';

describe('index.js', () => {
  let sandbox, root;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    sandbox.stub(Cookies, 'remove');
  });

  afterEach(() => {
    sandbox.restore();
    document.body.removeChild(root);
    const req = require.resolve(path.resolve(__dirname, '../../src/index'));
    delete require.cache[req];
  });

  context('without existing cookies', () => {
    it('renders without exploding', () => {
      sandbox.stub(Cookies, 'get').returns(null);
      sandbox.stub(Cookies, 'getJSON').returns(null);

      require('../../src/index.js');

      expect(Cookies.get).to.have.been.calledWith('apiToken');
      expect(Cookies.getJSON).to.have.been.calledWith('apiUser');
      expect(document.getElementById('root').textContent).not.to.be.empty;
    });
  });

  context('with existing cookies', () => {
    it('renders without exploding', () => {
      const user = new UserDummy().serialize(),
            exp = Math.floor(Date.now() / 1000) + (60 * 60),
            token = jwt.sign({ ...user, exp }, 'very-secret');
      sandbox.stub(Cookies, 'get').returns(token);
      sandbox.stub(Cookies, 'getJSON').returns(user);
      sandbox.stub(Cookies, 'set');

      require('../../src/index.js');

      expect(Cookies.get).to.have.been.calledWith('apiToken');
      expect(Cookies.getJSON).to.have.been.calledWith('apiUser');
      expect(Cookies.set).to.have.been.calledWith('apiToken', token, { expires: new Date(exp * 1000) });
      expect(Cookies.set).to.have.been.calledWith('apiUser', user, { expires: new Date(exp * 1000) });
      expect(document.getElementById('root').textContent).not.to.be.empty;
    });
  });
});
