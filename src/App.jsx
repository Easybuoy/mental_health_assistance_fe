import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Home from './pages/Home/Home';
import PATHS from './config/constants/paths'
import PrivateRoute from './modules/PrivateRoute/PrivateRoute';
import Chat from './pages/Chat/Chat';
import Call from './pages/Call/Call';
import { getUserId } from './store/selectors/auth';
import { SocketProvider } from './context/SocketProvider';

function App() {
  const userId = useSelector(getUserId)

  return (
    <SocketProvider id={userId}>
      <Route exact path={PATHS.LOGIN} component={Login} />
      <Route exact path={PATHS.REGISTER} component={Register} />
      <PrivateRoute exact path={PATHS.HOME} component={Home} />
      {/* <PrivateRoute exact path={PATHS.CHATS} component={Chat} /> */}
      <PrivateRoute exact path={PATHS.CHAT} component={Chat} />
      <PrivateRoute exact path={PATHS.CALL} component={Call} />
      {/* <Route path="*" component={NotFound} /> */}
    </SocketProvider>
  );
}

export default App;
