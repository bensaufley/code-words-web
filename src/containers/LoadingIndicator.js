import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { startLoading, endLoading } from '../actions/loading';

import '../styles/LoadingIndicator.css';

export class LoadingIndicator extends Component {
  interceptHandler(callback) {
    return (data) => {
      callback();
      return data;
    };
  }

  interceptErrorHandler(error) {
    this.props.endLoading();
    return Promise.reject(error);
  }

  componentDidMount() {
    this.axiosRequestInterceptor = axios.interceptors.request.use(
      this.interceptHandler(this.props.startLoading),
      this.interceptErrorHandler.bind(this)
    );

    this.axiosResponseInterceptor = axios.interceptors.response.use(
      this.interceptHandler(this.props.endLoading),
      this.interceptErrorHandler.bind(this)
    );
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.axiosRequestInterceptor);
    axios.interceptors.response.eject(this.axiosResponseInterceptor);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading-indicator">Loading…</div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, { startLoading, endLoading })(LoadingIndicator);
