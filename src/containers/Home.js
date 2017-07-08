import React from 'react';
import { connect } from 'react-redux';
import Games from './Games';
import ExternalHome from '../components/ExternalHome';

import '../styles/Home.css';

export const Home = (props) => {
  let { apiToken } = props;

  return apiToken ? <Games /> : <ExternalHome />;
};

function mapStateToProps({ session: { apiToken } }) {
  return { apiToken };
}

export default connect(mapStateToProps)(Home);
