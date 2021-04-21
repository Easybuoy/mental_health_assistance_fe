import { Route } from 'react-router-dom';

import './App.scss';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Home from './pages/Home/Home';
import PATHS from './config/constants/paths'
import PrivateRoute from './modules/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Route exact path={PATHS.LOGIN} component={Login} />
      <Route exact path={PATHS.REGISTER} component={Register} />
      <PrivateRoute exact path={PATHS.HOME} component={Home} />
      {/* <Route path="*" component={NotFound} /> */}
    </>
  );
}

export default App;
