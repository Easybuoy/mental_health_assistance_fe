import { combineReducers } from 'redux';
import authReducer from './auth';
import chatReducer from './chat';
import callReducer from './call';
import peerReducer from './peer';

export default combineReducers({
  auth: authReducer,
  chat: chatReducer,
  call: callReducer,
  peer: peerReducer,
});
