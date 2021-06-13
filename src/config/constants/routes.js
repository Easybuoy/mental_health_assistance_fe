import { Route } from 'react-router-dom';

import PATHS from '../../config/constants/paths';
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import PrivateRoute from '../../modules/PrivateRoute/PrivateRoute';
import Chat from '../../pages/Chat/Chat';
import Call from '../../pages/Call/Call';
import TermsPage from '../../pages/Terms/Terms';
import Peers from '../../pages/User/Peers/Peers';
import Therapists from '../../pages/User/Therapists/Therapists';
import TherapistHome from '../../pages/Therapists/Home/Home';
import MyTherapists from '../../pages/User/Therapists/MyTherapists';
import Profile from '../../pages/Profile/Profile';
import NotFoundPage from '../../pages/NotFound/NotFound';

const commonRoutes = [
  <Route exact path={PATHS.LOGIN} component={Login} />,
  <Route exact path={PATHS.REGISTER} component={Register} />,
  <Route exact path={PATHS.TERMS} component={TermsPage} />,
  <Route path="*" component={NotFoundPage} />,
];

export const unAuthenticatedRoutes = [
  <Route exact path={PATHS.HOME} component={Login} />,
  ...commonRoutes,
];

export const userRoutes = [
  <PrivateRoute exact path={PATHS.PEERS} component={Peers} />,
  <PrivateRoute exact path={PATHS.CHAT} component={Chat} />,
  <PrivateRoute exact path={PATHS.CALL} component={Call} />,
  <PrivateRoute exact path={PATHS.THERAPISTS} component={Therapists} />,
  <PrivateRoute exact path={PATHS.MY_THERAPISTS} component={MyTherapists} />,
  <PrivateRoute exact path={PATHS.HOME} component={Peers} />,
  <PrivateRoute exact path={PATHS.PROFILE} component={Profile} />,
  ...commonRoutes,
];

export const therapistRoutes = [
  <PrivateRoute exact path={PATHS.HOME} component={TherapistHome} />,
  <PrivateRoute exact path={PATHS.PATIENTS} component={TherapistHome} />,
  <PrivateRoute exact path={PATHS.PROFILE} component={Profile} />,
  ...commonRoutes,
];
