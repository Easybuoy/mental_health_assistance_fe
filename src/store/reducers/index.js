import { combineReducers } from 'redux';
import authReducer from './auth';
import chatReducer from './chat';
import callReducer from './call';
import peerReducer from './peer';
import therapistReducer from './therapist';
import subscriptionReducer from './subscription';

export default combineReducers({
  auth: authReducer,
  chat: chatReducer,
  call: callReducer,
  peer: peerReducer,
  therapist: therapistReducer,
  subscription: subscriptionReducer,
});
