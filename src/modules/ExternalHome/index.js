import React from 'react';
import { Link } from 'react-router-dom';

const ExternalHome = () => {
  return (
    <div className="external-home">
      <h1>Welcome to Code Words</h1>
      <p>Please <Link to="/sign-up/">Sign Up</Link> or <Link to="/sign-in/">Sign In</Link> to get started.</p>
    </div>
  );
};

export default ExternalHome;
