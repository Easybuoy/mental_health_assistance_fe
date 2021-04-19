import { LOGIN } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false
};

const state = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };

    default:
      return state;
  }
};

export default state;