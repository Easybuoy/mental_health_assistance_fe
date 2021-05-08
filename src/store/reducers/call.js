import {
  SET_CALL_RECEIVING_DATA,
  SET_ACCEPT_CALL,
  RESET_CALL_DATA,
  SET_CALL_RECEIVING,
  SET_INITIAL_CALL_ACCEPT,
} from '../../actions/types';

const INITIAL_STATE = {
  caller: '',
  receivingCall: false,
  callerSignal: {},
  callAccepted: false,
  initialCallAccept: false,
};

const callReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INITIAL_CALL_ACCEPT:
      return {
        ...state,
        initialCallAccept: true,
      };
    case SET_CALL_RECEIVING:
      return {
        ...state,
        receivingCall: true,
        caller: action.payload.from,
      };
    case SET_CALL_RECEIVING_DATA:
      return {
        ...state,
        receivingCall: true,
        caller: action.payload.from,
        callerSignal: action.payload.signal,
      };
    case SET_ACCEPT_CALL:
      return {
        ...state,
        callAccepted: true,
      };
    // case RESET_CALL_DATA:
    // return {
    //   INITIAL_STATE,
    // };
    default:
      return state;
  }
};

export default callReducer;
