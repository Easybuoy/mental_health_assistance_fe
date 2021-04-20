import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { LOGIN, SIGN_OUT, SET_CURRENT_USER } from './types';
// import { setError } from './error';

export const loginUser = (email, password) => (dispatch) => {
  console.log('fired');
  const payload = {
    email,
    password,
  };
  return axios
    .post('/api/auth/login', payload)
    .then((res) => {
      const { data } = res.data;
      setAuthToken(data.token);
      localStorage.setItem('token', data.token)
      const decodedToken = jwt_decode(data.token);
      dispatch(setCurrentUser(decodedToken));
      return decodedToken;
    })
    .catch((error) => {
      throw error.response.data.message;
    });
};

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const signOut = (payload) => {
  // Remove token from localstorage
  localStorage.removeItem('token');

  return {
    type: SIGN_OUT,
    payload,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
