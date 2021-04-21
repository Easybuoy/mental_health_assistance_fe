import React from 'react';
import { Link } from 'react-router-dom';

import './AuthBottom.scss';

const AuthBottom = ({ path, text, linkText }) => {
  return (
    <div className="auth-bottom">
      <span>
        {text}<Link to={path}>{linkText}</Link>
      </span>
    </div>
  );
};



export default AuthBottom;
