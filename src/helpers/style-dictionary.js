
export const ACOLOR = 'green';
export const BCOLOR = 'blue';
export const XCOLOR = 'red';
export const NULLCOLOR = 'grey';
export const TRANSMITTER_ICON = 'upload';
export const DECODER_ICON = 'download';
export const END_ICON = 'star';

export const iconForRole = (role) => (role === 'transmitter' ? TRANSMITTER_ICON : DECODER_ICON);

export const colorForTeam = (team) => (team === 'a' ? ACOLOR : BCOLOR);

export const colorForTile = (type) => {
  switch (type) {
    case 'a': return ACOLOR;
    case 'b': return BCOLOR;
    case 'x': return XCOLOR;
    default: return NULLCOLOR;
  }
};

export const iconForEvent = (event) => {
  switch (event) {
    case 'transmission': return TRANSMITTER_ICON;
    case 'decoding': return DECODER_ICON;
    case 'end': return END_ICON;
    default: return '';
  }
};
