import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../actions/auth';
import { getIsAuthenticated } from '../../store/selectors/auth';
import PATHS from '../../config/constants/paths';

import './Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const onSignOutClick = () => {
    dispatch(signOut());
  };

  return (
    <nav className="container navigation">
      <div className="logo">
        <Link to={PATHS.HOME}>MHA</Link>
      </div>

      {isAuthenticated ? (
        <div className="nav-links">
          <div className="links">
            <Link to={PATHS.PEERS}>Peer-peer</Link>
          </div>
          <div className="links">
            <Link to={PATHS.THERAPISTS}>Therapist</Link>
          </div>
          <div className="links">
            <Link to="/" onClick={onSignOutClick}>Signout</Link>
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <div className="links">
            <Link to={PATHS.LOGIN}>Sign in</Link>
          </div>
          <div className="links">
            <Link to={PATHS.REGISTER}>Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
