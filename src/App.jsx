import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import USERTYPES from './config/constants/usertype';
import {
  getUserId,
  getUserType,
  getIsAuthenticated,
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

function App() {
  const [routes, setRoutes] = useState(unAuthenticatedRoutes);
  const userId = useSelector(getUserId);
  const userType = useSelector(getUserType);
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === USERTYPES.PEER) {
        setRoutes(userRoutes);
      } else {
        setRoutes(therapistRoutes);
      }
    }
  }, [isAuthenticated]);
  // let routes = unAuthenticatedRoutes;
  // if (isAuthenticated) {
  //   if (userType === USERTYPES.PEER) {
  //     routes = userRoutes;
  //   } else {
  //     routes = therapistRoutes;
  //   }
  // }
  console.log(isAuthenticated, userType, routes)

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
