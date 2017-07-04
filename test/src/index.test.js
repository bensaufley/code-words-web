import { expect } from 'chai';

describe('index.js', () => {
  it('renders without exploding', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    return new Promise((resolve, reject) => {
      import('../../src/index.js').then(resolve).catch(reject);
    }).then(() => {
      expect(document.body.querySelector('#root').textContent).not.to.be.empty;
    });
  });
});
