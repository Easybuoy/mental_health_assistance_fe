import { Route } from 'react-router-dom';

import PATHS from '../../config/constants/paths';
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import Home from '../../pages/Home/Home';
import PrivateRoute from '../../modules/PrivateRoute/PrivateRoute';
import Chat from '../../pages/Chat/Chat';
import Call from '../../pages/Call/Call';
import TermsPage from '../../pages/Terms/Terms';
import Peers from '../../pages/Peers/Peers';
import NotFoundPage from '../../pages/NotFound/NotFound';

const commonRoutes = [
  <Route exact path={PATHS.LOGIN} component={Login} />,
  <Route exact path={PATHS.REGISTER} component={Register} />,
  <Route exact path={PATHS.TERMS} component={TermsPage} />,
  <Route exact path={PATHS.HOME} component={Home} />,
  <Route component={NotFoundPage} />,
];

export const unAuthenticatedRoutes = [
  ...commonRoutes,
];

export const userRoutes = [
  <PrivateRoute exact path={PATHS.PEERS} component={Peers} />,
  <PrivateRoute exact path={PATHS.CHAT} component={Chat} />,
  <PrivateRoute exact path={PATHS.CALL} component={Call} />,
  ...commonRoutes,
];

export const therapistRoutes = [
  ...commonRoutes,
];
