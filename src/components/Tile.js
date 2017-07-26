import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import '../styles/Tile.css';

export default class Tile extends Component {
  static propTypes = {
    revealed: PropTypes.bool.isRequired,
    word: PropTypes.string.isRequired,
    type: PropTypes.string
  }

  render() {
    return (
      <Grid.Column className="tile" textAlign='center' verticalAlign='middle'>
        {this.props.word}
      </Grid.Column>
    );
  }
}
