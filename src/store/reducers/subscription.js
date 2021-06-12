import { SET_SUBSCRIPTIONS } from '../../actions/types';

const INITIAL_STATE = {
  subscriptions: [],
};

const subscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
      };
    default:
      return state;
  }
};

export default subscriptionReducer;
