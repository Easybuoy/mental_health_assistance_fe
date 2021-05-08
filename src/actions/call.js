import {
  SET_CALL_RECEIVING_DATA,
  SET_ACCEPT_CALL,
  RESET_CALL_DATA,
  SET_INITIAL_CALL_ACCEPT,
  SET_CALL_RECEIVING,
  DECLINE_CALL,
} from './types';

export const setInitialCallAccept = () => {
  return {
    type: SET_INITIAL_CALL_ACCEPT,
  };
};

export const setReceivingCall = (payload) => {
  return {
    type: SET_CALL_RECEIVING,
    payload,
  };
};

export const setReceivingCallData = (payload) => {
  return {
    type: SET_CALL_RECEIVING_DATA,
    payload,
  };
};

export const setAcceptCall = (payload) => {
  return {
    type: SET_ACCEPT_CALL,
    payload,
  };
};

export const resetCallData = (payload) => {
  return {
    type: RESET_CALL_DATA,
    payload,
  };
};

export const declineCall = () => {
  return {
    type: DECLINE_CALL,
  };
};
