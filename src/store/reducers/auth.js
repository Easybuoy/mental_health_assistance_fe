import {
  LOGIN,
  SET_CURRENT_USER,
  SIGN_OUT,
  SET_USER_SUBSCRIBED,
} from '../../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
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
    case SET_USER_SUBSCRIBED:
      return {
        ...state,
        user: {
          ...state.user,
          hasActiveSubscription: action.payload,
        },
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

export default authReducer;
