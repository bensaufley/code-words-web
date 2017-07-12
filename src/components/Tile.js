import React, { Component } from 'react';

import '../styles/Tile.css';

export default class Tile extends Component {
  render() {
    return (
      <div className="tile">
        {this.props.word}
      </div>
    );
  }
}
