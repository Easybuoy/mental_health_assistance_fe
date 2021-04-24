import React from 'react';
import Background from '../../assets/images/background.jpg';
import './AuthLayout.scss';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="image">
        <img src={Background} />
      </div>

      <div className="content">{children}</div>
    </div>
  );
};

export default AuthLayout;
