import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { startLoading, endLoading } from './ducks';

import '../../styles/LoadingIndicator.css';

const interceptHandler = (callback) => (data) => {
  callback();
  return data;
};

export class LoadingIndicator extends Component {
  static propTypes = {
    endLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    startLoading: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.axiosRequestInterceptor = axios.interceptors.request.use(
      interceptHandler(this.props.startLoading),
      this.interceptErrorHandler.bind(this)
    );

    this.axiosResponseInterceptor = axios.interceptors.response.use(
      interceptHandler(this.props.endLoading),
      this.interceptErrorHandler.bind(this)
    );
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.axiosRequestInterceptor);
    axios.interceptors.response.eject(this.axiosResponseInterceptor);
  }

  interceptErrorHandler(error) {
    this.props.endLoading();
    return Promise.reject(error);
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
