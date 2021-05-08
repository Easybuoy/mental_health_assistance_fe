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
  // console.log(callerSignal, 'callersign');
  const userId = useSelector(getUserId);

  useEffect(() => {
    if (!socket) return;

    if (initialCallAcccepted) {
      // acceptcall
      console.log('one two three');
      socket.emit('initAcceptCall', { to: caller });
    }
    socket.on('initCallAccepted', () => {
      setCanCAllNow(true);
      console.log('calling now');
    });

    if (canCalllNow) {
      console.log('firing');
      fireCall();
    }
  }, [socket, initialCallAcccepted, canCalllNow]);

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
        console.log('accepting,');
        // setCallerSignal(data.signal);
        // setTimeout(() => {
        console.log(data, 'datttttt=====');
        setCallerSignal(data.signal)
        // acceptCall(data.signal, data.from);
        setCanAcceptNow(true)
        // }, 1000);
        //   setReceivingCall(true);
        //   setCaller(data.from);
      });
    }

    if (canAcceptNow && !hasFinallyAccepted) {
      fireAcceptCall()
      setHasFinallyAccepted(true);
    }


    // if (callerSignal && !callAccepted) {
    //   acceptCall();
    // }
  }, [socket, callAccepted, canAcceptNow, hasFinallyAccepted]);

  const fireCall = () => {
    // setTimeout(() => {
      callPeer('60841c601052b0401617be6d');
    // }, 1500);
  };

  const fireAcceptCall = (signal, from) => {
    console.log('caller', caller)
    acceptCall(callerSignal, caller);
  }
  const initCall = () => {
    socket.emit('initCall', {
      userToCall: '60841c601052b0401617be6d',
      signal: {},
      from: userId,
    });
    // callPeer('60841c601052b0401617be6d')
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
    // setCallerPeer(peer);
    console.log('calling');
    peer.on('stream', (stream) => {
      console.log('call peer streaming', stream);
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
    console.log('--------', callerId);
    console.log(callerId, 'call', callerSignal);
    peer.on('signal', (data) => {
      console.log('accepting signal', data);
      socket.emit('acceptCall', { signal: data, to: callerId });
    });

    peer.on('stream', (stream) => {
      console.log('accept call streaming');
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    // dispatch(resetCallData());
  };

  let UserVideo;
  if (stream) {
    UserVideo = <video playsInline muted ref={userVideo} autoPlay />;
  }
  console.log(callAccepted, callEnded);

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
