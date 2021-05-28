import { SET_THERAPISTS } from '../../actions/types';

const INITIAL_STATE = {
  therapists: [],
};

const peerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THERAPISTS:
      return {
        ...state,
        therapists: action.payload,
      };
    default:
      return state;
  }
};

export default peerReducer;
