import axios from 'axios';

import configVariables from '../config/env';
import APIROUTES from '../config/constants/api';

const { API_BASE_URI } = configVariables;

export const createTransaction = (payload) => (dispatch) => {
  return axios
    .post(`${API_BASE_URI}${APIROUTES.CREATE_PAYMENT}`, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error('Unable to create payment!');
    });
};
