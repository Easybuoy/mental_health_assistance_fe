import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../store/selectors/auth';
import PATHS from '../../config/constants/paths';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={PATHS.LOGIN} />
      }
    />
  );
};

export default PrivateRoute;
