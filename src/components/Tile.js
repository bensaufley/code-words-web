import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Tile.css';

export default class Tile extends Component {
  static defaultProps = {
    type: 'redacted'
  }

  static propTypes = {
    revealed: PropTypes.bool.isRequired,
    word: PropTypes.string.isRequired,
    type: PropTypes.string
  }

  render() {
    const className = [
      this.props.revealed ? 'revealed' : '',
      this.props.type,
      'game-tile'
    ].join(' ');

    return (
      <div className={className}>
        {this.props.word}
      </div>
    );
  }
}
