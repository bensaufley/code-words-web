import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import { playerShape } from '../helpers/prop-types';
import { iconForEvent, colorForTeam, colorForTile } from '../helpers/style-dictionary';

import { Player } from './Player';

class Turn extends Component {
  transmissionDetails() {
    const { word, number } = this.props;
    return (
      <Card.Description>
        <p>
          <strong>Word:</strong> “{word}”
          <br />
          <strong>Number:</strong> {number}
        </p>
      </Card.Description>
    );
  }

  decodingDetails() {
    const { correct, tile } = this.props,
          color = colorForTile(tile.type),
          icon = correct ? 'check' : 'x';
    return (
      <Card.Description>
        <div>
          <Label color={color}>
            <Icon name={icon} />
            {tile.word}
          </Label>
        </div>
      </Card.Description>
    );
  }

  endDetails() {
    const { winner } = this.props,
          color = colorForTeam(winner);

    return (
      <Card.Description color={color}>
        <p><strong>Team {winner.toUpperCase()}</strong></p>
      </Card.Description>
    );
  }

  render() {
    const { event, player, winner, timestamp } = this.props,
          icon = iconForEvent(event),
          color = colorForTeam(winner || player.team);

    return (
      <Card>
        <Card.Content>
          <Card.Header icon color={color}>
            <Icon name={icon} />
            {event}
          </Card.Header>
          <Card.Meta>
            <span className="date">{moment(timestamp).fromNow()}</span>
          </Card.Meta>
          {this[`${event}Details`]()}
        </Card.Content>
        {player ? <Card.Content extra><Player {...player} /></Card.Content> : ''}
      </Card>
    );
  }
}

Turn.defaultProps = {
  correct: false,
  player: {},
  number: null,
  tile: {},
  winner: null,
  word: null
};

Turn.propTypes = {
  correct: PropTypes.bool,
  event: PropTypes.string.isRequired,
  number: PropTypes.number,
  player: playerShape,
  tile: PropTypes.shape({
    revealed: PropTypes.bool,
    type: PropTypes.string,
    word: PropTypes.string
  }),
  timestamp: PropTypes.number.isRequired,
  winner: PropTypes.string,
  word: PropTypes.string
};

const mapStateToProps = (state, { gameId, playerId, tile: tileIndex, ...ownProps }) => {
  const game = state.games[gameId],
        player = playerId ? game.players.find((p) => p.id === playerId) : null,
        tile = tileIndex !== undefined ? game.board[tileIndex] : null;
  return { ...ownProps, player, tile };
};

export default connect(mapStateToProps)(Turn);
