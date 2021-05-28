import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import configVariables from '../config/env';
import APIROUTES from '../config/constants/api';
import { LOGIN, SIGN_OUT, SET_CURRENT_USER } from './types';
// import { setError } from './error';

const { API_BASE_URI } = configVariables;

export const loginUser = (email, password) => (dispatch) => {
  const payload = {
    email,
    password,
  };
  return axios
    .post(`${API_BASE_URI}${APIROUTES.LOGIN}`, payload)
    .then((res) => {
      const { data } = res.data;
      setAuthToken(data.token);
      localStorage.setItem('token', data.token);
      const decodedToken = jwt_decode(data.token);
      dispatch(setCurrentUser(decodedToken));
      return decodedToken;
    })
    .catch((error) => {
      throw error.response.data.message || 'Unable to login, check your input!';
    });
};

export const registerUser = (payload) => (dispatch) => {
  return axios
    .post(`${API_BASE_URI}${APIROUTES.REGISTER}`, payload)
    .then((res) => {
      const { data } = res.data;

      // setAuthToken(data.token);
      // localStorage.setItem('token', data.token)
      // const decodedToken = jwt_decode(data.token);
      // dispatch(setCurrentUser(decodedToken));
      return data;
    })
    .catch((error) => {
      throw error.response.data.message || error.response.data.errors;
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
