import axios from 'axios';

import configVariables from '../config/env';
import APIROUTES from '../config/constants/api';
import { SET_SUBSCRIPTIONS, SUBSCRIBE } from './types';
import { refreshUserToken } from './auth';

const { API_BASE_URI } = configVariables;
// export const setTransaction = (email, password) => (dispatch) => {
//   const payload = {
//     email,
//     password,
//   };
//   return axios
//     .post(`${API_BASE_URI}${APIROUTES.LOGIN}`, payload)
//     .then((res) => {
//       const { data } = res.data;
//       setAuthToken(data.token);
//       localStorage.setItem('token', data.token);
//       const decodedToken = jwt_decode(data.token);
//       dispatch(setCurrentUser(decodedToken));
//       return decodedToken;
//     })
//     .catch((error) => {
//       throw error.response.data.message || 'Unable to login, check your input!';
//     });
// };

export const subscribeTherapist = (userId, therapistUserId) => (dispatch) => {
  const payload = {
    userId,
    therapistUserId,
  };

  return axios
    .post(`${API_BASE_URI}${APIROUTES.SUBSCRIBE}`, payload)
    .then(async (res) => {
      await dispatch(refreshUserToken());
      dispatch(getSubscriptions());
      return res;
    })
    .catch((error) => {
      throw (
        error.response.data.message || 'Unable to subscribe, try again later!'
      );
    });
};

export const getSubscriptions = () => (dispatch) => {
  return axios
    .get(`${API_BASE_URI}${APIROUTES.USER_SUBSCRIPTIONS}`)
    .then((res) => {
      const { data } = res.data;
      dispatch(setSubscriptions(data.subscriptions));
      return data;
    })
    .catch((error) => {
      throw (
        error.response.data.message ||
        'Unable to get subscriptions, try again later!'
      );
    });
};

export const subscribe = (payload) => {
  return {
    type: SUBSCRIBE,
    payload,
  };
};

export const setSubscriptions = (payload) => {
  return {
    type: SET_SUBSCRIPTIONS,
    payload,
  };
};
