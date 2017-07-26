import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { startLoading, endLoading } from '../actions/loading';

import '../styles/LoadingIndicator.css';

export class LoadingIndicator extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

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
    return (
      <Dimmer page active={this.props.loading}>
        <Loader active={this.props.loading} />
      </Dimmer>
    );
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, { startLoading, endLoading })(LoadingIndicator);
