import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SemanticModal } from 'semantic-ui-react';
import { closeModal } from '../ducks/modal';

import '../styles/Modal.css';

export class Modal extends Component {
  static defaultProps = {
    content: '',
    type: 'notice'
  }

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    content: PropTypes.string,
    shown: PropTypes.bool.isRequired,
    type: PropTypes.string
  }

  render() {
    if (!this.props.shown) return null;

    return (
      <SemanticModal basic size="small" onClose={this.props.closeModal} closeIcon="close" open>
        <SemanticModal.Content className={this.props.type}>
          <p>{this.props.content}</p>
        </SemanticModal.Content>
      </SemanticModal>
    );
  }
}

function mapStateToProps({ modal }) {
  return modal || {};
}

export default connect(mapStateToProps, { closeModal })(Modal);
