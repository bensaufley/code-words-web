import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal';

import '../styles/Modal.css';

export class Modal extends Component {
  render() {
    if (!this.props.shown) return null;

    return (
      <div className="modal-overlay" onClick={this.props.closeModal}>
        <div className={`modal ${this.props.type}`} onClick={(e) => e.stopPropagation()}>
          <a className="modal-close" onClick={this.props.closeModal}>&times;</a>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ modal }) {
  return modal || {};
}

export default connect(mapStateToProps, { closeModal })(Modal);
