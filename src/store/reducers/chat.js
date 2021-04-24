import { LOGIN, SET_CURRENT_USER, SIGN_OUT } from '../../actions/types';

const INITIAL_STATE = {
  messages: {},
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default chatReducer;
