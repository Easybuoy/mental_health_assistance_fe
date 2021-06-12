import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { tl8 } from '../../utils/locale';
import { signOut } from '../../actions/auth';
import {
  getIsAuthenticated,
  getUserType,
  getActiveSubscription,
} from '../../store/selectors/auth';
import PATHS from '../../config/constants/paths';
import USERTYPES from '../../config/constants/usertype';
import {
  unauthenticatedRoutes,
  therapistsRoutes,
  userRoutes,
} from '../../config/constants/navRoutes';
import './Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const hasActiveSubscription = useSelector(getActiveSubscription);
  const userType = useSelector(getUserType);

  let updatedUserRoutes = [];
  if (hasActiveSubscription) {
    updatedUserRoutes = userRoutes.filter(
      (route) => route.path !== PATHS.THERAPISTS
    );
  } else {
    updatedUserRoutes = userRoutes.filter(
      (route) => route.path !== PATHS.MY_THERAPISTS
    );
  }

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
          <>
            {userType === USERTYPES.THERAPISTS ? (
              <>
                {therapistsRoutes.map((route) => (
                  <div key={route.path} className="links">
                    <Link to={route.path}>{tl8(route.translation)}</Link>
                  </div>
                ))}
              </>
            ) : (
              <>
                {userRoutes.map((route) => (
                  <div key={route.path} className="links">
                    <Link to={route.path}>{tl8(route.translation)}</Link>
                  </div>
                ))}
              </>
            )}
            <div className="links">
              <Link to="/" onClick={onSignOutClick}>
                {tl8('navigation.logout')}
              </Link>
            </div>
          </>
        </div>
      ) : (
        <div className="nav-links">
          {unauthenticatedRoutes.map((route) => (
            <div key={route.path} className="links">
              <Link to={route.path}>{tl8(route.translation)}</Link>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
