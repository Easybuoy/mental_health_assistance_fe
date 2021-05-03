import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { useSocket } from '../../context/SocketProvider';
import { getUserId } from '../../store/selectors/auth';
import PATHS from '../../config/constants/paths';

const Call = () => {
  const params = useParams();
  const history = useHistory();
  const { recepientId } = params;
  const { addToast } = useToasts();

  const socket = useSocket();
  const [stream, setStream] = useState();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef();

  const userId = useSelector(getUserId);

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

    // callPeer(recepientId);

    socket.on('hey', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      console.log(data.signal, 'data.signal')
    });
  }, [socket]);

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
      setCallAccepted(true);

      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('acceptCall', { signal: data, to: caller });
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
        <button onClick={() => callPeer('60841c601052b0401617be6d')}>
          Call
        </button>
      </div>

      {receivingCall && !callAccepted && (
        <div className="incoming-call">
          <h1>{caller} is Calling you</h1>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}

      <button onClick={leaveCall}>End call</button>
    </div>
  );
};

export default Call;
