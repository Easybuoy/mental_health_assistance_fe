import {
  SET_MESSAGE,
  SET_MESSAGES,
  SET_RECEPIENT_NAME,
} from '../../actions/types';

const INITIAL_STATE = {
  messages: [],
  name: '',
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SET_RECEPIENT_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
