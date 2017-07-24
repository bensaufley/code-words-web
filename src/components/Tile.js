import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import '../styles/Tile.css';

export default class Tile extends Component {
  render() {
    return (
      <Grid.Column className="tile" textAlign='center' verticalAlign='middle' mobile={5} tablet={1}>
        {this.props.word}
      </Grid.Column>
    );
  }
}
