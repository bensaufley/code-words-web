import expect from '../../test-setup';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { wrapContainer } from '../../support/container-helper';
import PlayerDummy from '../../dummies/player';

import { PlayerSlot } from '../../../src/components/Game/PlayerSlot';

describe('(Container) PlayerSlot', () => {
  it('renders without exploding', () => {
    const player = new PlayerDummy(),
          wrapper = wrapContainer()(PlayerSlot, { player, team: 'a', role: 'decoder' });
    expect(findRenderedDOMComponentWithClass(wrapper, 'player-label-container')).to.exist;
  });
});
