import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ToastProvider } from 'react-toast-notifications';

import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { extendLocale } from './utils/locale';
import localePhrases from './config/locales/en.json';
import { setCurrentUser, signOut } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Navigation from './modules/Navigation/Navigation';
import Footer from './modules/Footer/Footer';
import { ConnectivityListener } from './modules/Common/Connection/ConnectivityListener';

extendLocale(localePhrases);

if (localStorage.token && localStorage.token !== 'undefined') {
  const { token } = localStorage;

  // Set Auth TOken
  setAuthToken(token);

  // Decode token
  const decodedToken = jwt_decode(token);

  // Set current user
  store.dispatch(setCurrentUser(decodedToken));

  // Check expired token
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    // Logout user
    store.dispatch(signOut());
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={3000}
          // components={{ Toast: Snack }}
          // placement="bottom-center"
        >
          <ConnectivityListener />
          <Navigation />
            <App />
          <Footer />
        </ToastProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
