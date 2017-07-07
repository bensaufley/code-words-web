import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { startLoading, endLoading } from '../actions/loading';

export class LoadingIndicator extends Component {
  componentDidMount() {
    this.axiosRequestInterceptor = axios.interceptors.request.use((config) => {
      this.props.startLoading();
      return config;
    },
    /* istanbul ignore next */
    (error) => {
      this.props.endLoading();
      return Promise.reject(error);
    });
    this.axiosResponseInterceptor = axios.interceptors.response.use((response) => {
      this.props.endLoading();
      return response;
    },
    (error) => {
      this.props.endLoading();
      return Promise.reject(error);
    });
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
