import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/Tile.css';

export default class Tile extends Component {
  static propTypes = {
    revealed: PropTypes.bool.isRequired,
    word: PropTypes.string.isRequired,
    type: PropTypes.string
  }

  render() {
    return (
      <div className="game-tile">
        {this.props.word}
      </div>
    );
  }
}
