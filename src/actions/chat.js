import { SET_RECEPIENT_NAME, SET_MESSAGES, SET_MESSAGE } from './types';

export const setMessages = (payload) => {
  return {
    type: SET_MESSAGES,
    payload,
  };
};

export const setMessage = (payload) => {
  return {
    type: SET_MESSAGE,
    payload,
  };
};

export const setRecepientName = (payload) => {
  return {
    type: SET_RECEPIENT_NAME,
    payload,
  };
};
