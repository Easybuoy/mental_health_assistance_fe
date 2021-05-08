import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getReceivingCall,
  getCaller,
  getCallerSignal,
  getInitialCallAccept,
  getIsCallDeclined
} from '../../../store/selectors/call';
import { setInitialCallAccept, declineCall as declineCallAction } from '../../../actions/call';

const AcceptCall = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const receivingCall = useSelector(getReceivingCall);
  const caller = useSelector(getCaller);
  const callerSignal = useSelector(getCallerSignal);
  const callDeclined = useSelector(getIsCallDeclined);
  const initialCallAcccepted = useSelector(getInitialCallAccept);

  const acceptCall = () => {
    dispatch(setInitialCallAccept());
    history.push(`/call/${caller}`, {
      signal: callerSignal,
    });
  };

  const declineCall = () => {
    dispatch(declineCallAction());
  };

  return (
    <div>
      <div
        style={{ width: '200px', height: '200px', backgroundColor: 'red' }}
      ></div>
      {receivingCall && !initialCallAcccepted && !callDeclined && (
        <div className="incoming-call">
          <h1>{caller} is Calling you</h1>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={declineCall}>Decline</button>
        </div>
      )}
    </div>
  );
};

export default AcceptCall;
