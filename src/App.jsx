import { Route } from 'react-router-dom';

import './App.scss';
import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import PrivateRoute from './modules/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
    </>
  );
}

export default App;
