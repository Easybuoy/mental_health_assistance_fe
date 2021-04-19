import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import rootReducer from './reducers';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import PrivateRoute from './modules/PrivateRoute/PrivateRoute';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
