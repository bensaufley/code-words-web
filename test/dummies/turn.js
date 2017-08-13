import Faker from 'faker';

import Dummy from './dummy';

const shuffle = (a) => {
  const arr = [...a];
  for (let i = arr.length; i--;) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const tileTypes = () => {
  const types = [...new Array(7).fill('a'), ...new Array(7).fill('b'), ...new Array(9).fill(null), 'x'];
  types.push(['a', 'b'][Math.round(Math.random())]);
  return shuffle(types);
};

export default class TurnDummy extends Dummy {
  constructor(params = {}) {
    super(params);
    const type = params.type || ['transmission', 'decoding', 'end'][Math.floor(Math.random() * 3)];
    this.event = type;

    switch (type) {
      case 'transmission':
        this.playerId = params.player.id;
        this.word = Faker.hacker.noun();
        this.number = params.number || Math.round(Math.random() * 4);
        break;
      case 'decoding':
        this.playerId = params.player.id;
        this.tile = params.title || Math.floor(Math.random() * 25);
        this.correct = params.correct || Boolean(Math.round(Math.random()));
        break;
      case 'end':
        this.winner = params.winner || ['a', 'b'][Math.round(Math.random())];
        break;
      default:
        throw new Error('Unrecognized tile type');
    }
  }

  serialize() {
    return { ...this };
  }

  static generateCompleteGame(game) {
    const turns = [],
          transmitters = game.players.filter((p) => p.role === 'transmitter').reduce((obj, p) => ({ ...obj, [p.team]: p }), {}),
          decoders = game.players.filter((p) => p.role === 'decoder').reduce((obj, p) => ({ ...obj, [p.team]: p }), {}),
          types = tileTypes(),
          tiles = game.board.map((tile, i) => ({ ...tile, type: types[i] })),
          tilesLeft = () => (
            tiles.some((t) => t.type === 'a' && !t.revealed) &&
            tiles.some((t) => t.type === 'b' && !t.revealed) &&
            tiles.some((t) => t.type === 'x' && !t.revealed)
          ),
          findTileIndex = (team) => tiles.findIndex((t) => t.type === team && !t.revealed),
          findAnyOtherTileIndex = (team) => tiles.findIndex((t) => t.type !== team && !t.revealed);

    let activeTeam = tiles.filter((t) => t.type === 'a').length === 8 ? 'a' : 'b';

    while (tilesLeft()) {
      const activePlayer = transmitters[activeTeam];
      turns.push(new TurnDummy({ player: activePlayer, type: 'transmission' }));

      for (let i = Math.floor(Math.random() * 3); i--;) {
        const tile = findTileIndex(activeTeam);
        tiles[tile].revealed = true;
        turns.push(new TurnDummy({ player: decoders[activeTeam], tile, type: 'decoding' }));
        if (!tilesLeft()) break;
      }
      if (!tilesLeft()) break;

      const tile = findAnyOtherTileIndex(activeTeam);
      tiles[tile].revealed = true;
      turns.push(new TurnDummy({ player: decoders[activeTeam], tile, type: 'decoding' }));
      activeTeam = activeTeam === 'a' ? 'b' : 'a';
    }

    const lastTurn = turns[turns.length - 1],
          wonOrLost = tiles[lastTurn.tile].type === 'x' ? 'lost' : 'won',
          otherTeam = activeTeam === 'a' ? 'b' : 'a',
          winner = wonOrLost === 'lost' ? activeTeam : otherTeam;
    turns.push(new TurnDummy({ type: 'end', winner }));

    return turns;
  }

  static generateIncompleteGame(game) {
    const turns = TurnDummy.generateCompleteGame(game);
    return TurnDummy.generateCompleteGame(game).slice(0, turns.length - 1 - Math.round(Math.random() * 5));
  }
}
