import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getReceivingCall,
  getCaller,
  getCallAccepted,
  getCallerSignal,
  getInitialCallAccept,
} from '../../../store/selectors/call';

import { setInitialCallAccept } from '../../../actions/call';

const AcceptCall = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const receivingCall = useSelector(getReceivingCall);
  const caller = useSelector(getCaller);
  const callAccepted = useSelector(getCallAccepted);
  const callerSignal = useSelector(getCallerSignal);
  const initialCallAcccepted = useSelector(getInitialCallAccept);

  const acceptCall = () => {
    dispatch(setInitialCallAccept());
    history.push(`/call/${caller}`, {
      signal: callerSignal,
    });
  };
  return (
    <div>
      <div
        style={{ width: '200px', height: '200px', backgroundColor: 'red' }}
      ></div>
      {receivingCall && !initialCallAcccepted && (
        <div className="incoming-call">
          <h1>{caller} is Calling you</h1>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
};

export default AcceptCall;
