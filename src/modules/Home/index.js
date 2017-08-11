import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GamesContainer from '../Games';
import ExternalHome from '../ExternalHome';

import '../../styles/Home.css';

export const Home = (props) => {
  const { apiToken } = props;

  return apiToken ? <GamesContainer /> : <ExternalHome />;
};

Home.defaultProps = {
  apiToken: null
};

Home.propTypes = {
  apiToken: PropTypes.string
};

function mapStateToProps({ session: { apiToken } }) {
  return { apiToken };
}

export default connect(mapStateToProps)(Home);
