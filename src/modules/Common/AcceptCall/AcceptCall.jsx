import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
  getReceivingCall,
  getCaller,
  getCallerSignal,
  getInitialCallAccept,
  getIsCallDeclined,
} from '../../../store/selectors/call';
import {
  setInitialCallAccept,
  declineCall as declineCallAction,
} from '../../../actions/call';
import Button from '../Button/Button';
import CloseIcon from '../../../assets/svg/close.svg';
import { tl8, tl8Html } from '../../../utils/locale';

import './AcceptCall.scss';

const AcceptCall = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const receivingCall = useSelector(getReceivingCall);
  const caller = useSelector(getCaller);
  const callerSignal = useSelector(getCallerSignal);
  const callDeclined = useSelector(getIsCallDeclined);
  const initialCallAcccepted = useSelector(getInitialCallAccept);

  useEffect(() => {
    if (receivingCall) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [receivingCall]);
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
    <div className="accept-call-container">
      {receivingCall && !initialCallAcccepted && !callDeclined && (
        <div className="accept-call">
          <div className="close">
            <Link onClick={declineCall}>
              <img src={CloseIcon} alt="close icon" />
            </Link>
          </div>
          <h3 className="message">
            {tl8Html('call.accept_call.incoming', { name: caller })}
          </h3>

          <div className="call-action">
            <Button onClick={acceptCall}>
              {tl8('call.accept_call.accept')}
            </Button>
            <Button onClick={declineCall}>
              {tl8('call.accept_call.decline')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptCall;
