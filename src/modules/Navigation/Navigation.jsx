import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../actions/auth';

import './Navigation.scss';
import Button from '../Common/Button/Button';

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onSignOutClick = () => {
    dispatch(signOut());
  };

  return (
    <nav className="container navigation">
      <div className="logo">
        <p>MHA</p>
      </div>

      {isAuthenticated ? (
        <div className="nav-links">
          <div className="links">
            <Button>Peer-peer</Button>
          </div>
          <div className="links">
            <Button>Therapist</Button>
          </div>
          <div className="links">
            <Button onClick={onSignOutClick}>Signout</Button>
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <div className="links">
            <Button>Sign in</Button>
          </div>
          <div className="links">
            <Button>Register</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
