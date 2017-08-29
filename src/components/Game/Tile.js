import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/Tile.css';

export default class Tile extends Component {
  static defaultProps = {
    decodeAction: null,
    type: 'redacted'
  }

  static propTypes = {
    decodeAction: PropTypes.func,
    index: PropTypes.number.isRequired,
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

    if (this.props.decodeAction) {
      const { decodeAction, index } = this.props;

      return (
        <button className={className} type="button" onClick={() => decodeAction({ tile: index })}>
          {this.props.word}
        </button>
      );
    }

    return (
      <div className={className}>
        {this.props.word}
      </div>
    );
  }
}
