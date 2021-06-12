import { SET_THERAPISTS, SET_MY_THERAPISTS } from '../../actions/types';

const INITIAL_STATE = {
  therapists: [],
  userTherapists: [],
};

const peerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THERAPISTS:
      return {
        ...state,
        therapists: action.payload,
      };
    case SET_MY_THERAPISTS:
      return {
        ...state,
        userTherapists: action.payload,
      };
    default:
      return state;
  }
};

export default peerReducer;
