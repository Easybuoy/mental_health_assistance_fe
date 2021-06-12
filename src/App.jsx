import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import USERTYPES from './config/constants/usertype';
import {
  getUserId,
  getUserType,
  getIsAuthenticated,
  getActiveSubscription,
} from './store/selectors/auth';
import { SocketProvider } from './context/SocketProvider';
import AcceptCall from './modules/Common/AcceptCall/AcceptCall';
import {
  userRoutes,
  therapistRoutes,
  unAuthenticatedRoutes,
} from './config/constants/routes';
import './App.scss';
import React from 'react';
import PATHS from './config/constants/paths';

function App() {
  const userId = useSelector(getUserId);
  const userType = useSelector(getUserType);
  const hasActiveSubscription = useSelector(getActiveSubscription);
  const isAuthenticated = useSelector(getIsAuthenticated);

  let updatedUserRoutes = [];
  if (hasActiveSubscription) {
    updatedUserRoutes = userRoutes.filter(
      (route) => route.props.path !== PATHS.THERAPISTS
    );
  } else {
    updatedUserRoutes = userRoutes.filter(
      (route) => route.props.path !== PATHS.MY_THERAPISTS
    );
  }

  let routes = unAuthenticatedRoutes;
  if (isAuthenticated) {
    if (userType === USERTYPES.PEER) {
      routes = userRoutes;
    } else {
      routes = therapistRoutes;
    }
  }

  return (
    <SocketProvider id={userId}>
      <AcceptCall />
      <Switch>
        {/* {routes.map((route, i) => (
          <React.Fragment key={i}>{route}</React.Fragment>
        ))} */}
        {routes.map((route, i) => route)}
      </Switch>
    </SocketProvider>
  );
}

export default App;
