import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal';
import { Modal as SemanticModal } from 'semantic-ui-react';

import '../styles/Modal.css';

export class Modal extends Component {
  render() {
    if (!this.props.shown) return null;

    return (
      <SemanticModal basic size="small" onClose={this.props.closeModal} closeIcon="close" open={true}>
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
