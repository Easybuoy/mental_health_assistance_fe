import { SET_PEERS } from '../../actions/types';

const INITIAL_STATE = {
  peers: [],
};

const peerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PEERS:
      return {
        ...state,
        peers: action.payload,
      };
    default:
      return state;
  }
};

export default peerReducer;
