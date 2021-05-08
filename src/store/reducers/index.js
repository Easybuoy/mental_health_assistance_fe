import { combineReducers } from 'redux';
import authReducer from './auth';
import chatReducer from './chat';
import callReducer from './call';

export default combineReducers({
  auth: authReducer,
  chat: chatReducer,
  call: callReducer,
});
