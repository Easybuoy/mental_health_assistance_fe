import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { useSocket } from '../../context/SocketProvider';
import { getUserId } from '../../store/selectors/auth';
import {
  getCallAccepted,
  getCaller,
  getInitialCallAccept,
} from '../../store/selectors/call';
import { setAcceptCall, resetCallData } from '../../actions/call';
import PATHS from '../../config/constants/paths';

const Call = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { recepientId } = params;
  const { state } = location;
  const { addToast } = useToasts();

  const socket = useSocket();
  const [stream, setStream] = useState();
  const userVideo = useRef();
  const partnerVideo = useRef();
  // const [callAccepted, setCallAccepted] = useState(false);
  const callAccepted = useSelector(getCallAccepted);
  const initialCallAcccepted = useSelector(getInitialCallAccept);
  const caller = useSelector(getCaller);
  const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef();
  const [canCalllNow, setCanCAllNow] = useState(false);
  const [canAcceptNow, setCanAcceptNow] = useState(false);
  const [hasFinallyAccepted, setHasFinallyAccepted] = useState(false);
  // const [callerPeer, setCallerPeer] = useState();
  // const [receiverPeer, setReceiverPeer] = useState();
  // const callerSignal = state?.signal;

  const userId = useSelector(getUserId);

  useEffect(() => {
    if (!socket) return;

    if (initialCallAcccepted) {
      socket.emit('initAcceptCall', { to: caller });
    }
    socket.on('initCallAccepted', () => {
      setCanCAllNow(true);
    });

    if (canCalllNow) {
      fireCall();
    }

    socket.on('callDisconnected', () => {
      setCallEnded(true);
      cleanupEndedCall();
    });

    socket.on('callDeclined', () => {
      addToast('Call was declined', { appearance: 'error' });
      history.push(PATHS.HOME);
    });
  }, [socket, initialCallAcccepted, canCalllNow, callEnded]);

  const cleanupEndedCall = () => {
    if (!callEnded) {
      connectionRef.current.destroy();
      addToast('User ended call', { appearance: 'success' });
      dispatch(resetCallData());
      setTimeout(() => {
        history.push(PATHS.HOME);
      }, 100);
    }
  };
  useEffect(() => {
    if (!socket) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
      .catch(() => {
        addToast('Kindly allow access to the camera and microphone', {
          appearance: 'error',
        });
        history.push(PATHS.HOME);
      });

    if (!callAccepted) {
      socket.on('hey', (data) => {
        setCallerSignal(data.signal);
        setCanAcceptNow(true);
      });
    }

    if (canAcceptNow && !hasFinallyAccepted) {
      fireAcceptCall();
      setHasFinallyAccepted(true);
    }
  }, [socket, callAccepted, canAcceptNow, hasFinallyAccepted]);

  const fireCall = () => {
    callPeer(recepientId);
  };

  const fireAcceptCall = () => {
    acceptCall(callerSignal, caller);
  };
  const initCall = () => {
    socket.emit('initCall', {
      userToCall: recepientId,
      signal: {},
      from: userId,
    });
  };

  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: userId,
      });
    });
    peer.on('stream', (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', (signal) => {
      dispatch(setAcceptCall());
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const acceptCall = (callerSignal, callerId) => {
    // setCallAccepted(true);
    dispatch(setAcceptCall());
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('acceptCall', { signal: data, to: callerId });
    });

    peer.on('stream', (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    socket.emit('disconnectCall', { to: recepientId });
    addToast('Call ended', { appearance: 'success' });
    dispatch(resetCallData());
    history.push(PATHS.HOME);
  };

  let UserVideo;
  if (stream) {
    UserVideo = <video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <video playsInline ref={partnerVideo} autoPlay />;
  }

  return (
    <div className="call-containaer">
      {stream && UserVideo}

      {callAccepted && !callEnded ? <div>{PartnerVideo}</div> : null}

      <div className="callpeer">
        <button onClick={() => initCall()}>Call</button>
      </div>

      {/* {receivingCall && !callAccepted && (
        <div className="incoming-call">
          <h1>{caller} is Calling you</h1>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )} */}

      <button onClick={leaveCall}>End call</button>
    </div>
  );
};

export default Call;
