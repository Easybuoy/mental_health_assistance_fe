import { LOGIN, SET_CURRENT_USER, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

const state = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length > 0,
        user: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default state;
