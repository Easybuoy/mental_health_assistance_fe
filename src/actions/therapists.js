import axios from 'axios';

import configVariables from '../config/env';
import APIROUTES from '../config/constants/api';
import { SET_THERAPISTS, SET_MY_THERAPISTS } from './types';

const { API_BASE_URI } = configVariables;
export const getTherapists = () => (dispatch) => {
  return axios
    .get(`${API_BASE_URI}${APIROUTES.GET_THERAPISTS}`)
    .then((res) => {
      const { data } = res.data;
      dispatch(setTherapists(data.therapists));
      return data.users;
    })
    .catch((error) => {
      throw error.response.data.message || 'Unable to get therapists!';
    });
};

export const getUserTherapists = () => (dispatch) => {
  return axios
    .get(`${API_BASE_URI}${APIROUTES.MY_THERAPIST}`)
    .then((res) => {
      const { data } = res.data;
      dispatch(setUserTherapists(data.therapists));
      return data;
    })
    .catch((error) => {
      throw error.response.data.message || 'Unable to get user therapists!';
    });
};

export const setTherapists = (payload) => {
  return {
    type: SET_THERAPISTS,
    payload,
  };
};

export const setUserTherapists = (payload) => {
  return {
    type: SET_MY_THERAPISTS,
    payload,
  };
};
