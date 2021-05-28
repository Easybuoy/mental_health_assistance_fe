import axios from 'axios';

import configVariables from '../config/env';
import APIROUTES from '../config/constants/api';
import { SET_PEERS } from './types';

const { API_BASE_URI } = configVariables;
export const getPeers = () => (dispatch) => {
  return axios
    .get(`${API_BASE_URI}${APIROUTES.GET_PEERS}`)
    .then((res) => {
      const { data } = res.data;
      dispatch(setPeers(data.users));
      return data.users;
    })
    .catch((error) => {
      throw error.response.data.message || 'Unable to get peers!';
    });
};

export const setPeers = (payload) => {
  return {
    type: SET_PEERS,
    payload,
  };
};
